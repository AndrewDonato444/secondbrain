// Master CSV — single source of truth for all leads
// Handles read, write, and dedup checks

const fs = require('fs');
const path = require('path');

const CSV_HEADERS = [
  'lead_id', 'date_added', 'full_name', 'first_name', 'last_name',
  'job_title', 'job_start_date', 'company_name', 'company_domain',
  'company_size', 'company_industry', 'location', 'linkedin_url',
  'email', 'email_source', 'email_verified', 'verification_result',
  'pushed_to_instantly', 'campaign_id', 'lead_score', 'notes'
];

function escapeCsvField(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

function loadMasterCsv(csvPath) {
  if (!fs.existsSync(csvPath)) {
    // Create with headers
    fs.writeFileSync(csvPath, CSV_HEADERS.join(',') + '\n');
    return [];
  }
  const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
  if (lines.length <= 1) return []; // headers only
  
  return lines.slice(1).map(line => {
    const fields = parseCsvLine(line);
    const obj = {};
    CSV_HEADERS.forEach((h, i) => { obj[h] = fields[i] || ''; });
    return obj;
  });
}

function getExistingKeys(leads) {
  const keys = new Set();
  for (const lead of leads) {
    // Dedup by LinkedIn URL (primary) or email+company (fallback)
    if (lead.linkedin_url) {
      keys.add(normalizeLinkedIn(lead.linkedin_url));
    }
    if (lead.email && lead.company_domain) {
      keys.add(`${lead.email.toLowerCase()}|${lead.company_domain.toLowerCase()}`);
    }
  }
  return keys;
}

function normalizeLinkedIn(url) {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .toLowerCase();
}

function isDuplicate(person, existingKeys) {
  if (person.linkedin_url) {
    const key = normalizeLinkedIn(person.linkedin_url);
    if (existingKeys.has(key)) return true;
  }
  if (person.email && person.company_domain) {
    const key = `${person.email.toLowerCase()}|${person.company_domain.toLowerCase()}`;
    if (existingKeys.has(key)) return true;
  }
  return false;
}

function appendLeads(csvPath, leads) {
  const lines = leads.map(lead => {
    return CSV_HEADERS.map(h => escapeCsvField(lead[h])).join(',');
  });
  fs.appendFileSync(csvPath, lines.join('\n') + '\n');
}

function updateLead(csvPath, leadId, updates) {
  const allLeads = loadMasterCsv(csvPath);
  const idx = allLeads.findIndex(l => l.lead_id === leadId);
  if (idx === -1) return false;
  Object.assign(allLeads[idx], updates);
  
  const content = CSV_HEADERS.join(',') + '\n' +
    allLeads.map(lead => CSV_HEADERS.map(h => escapeCsvField(lead[h])).join(',')).join('\n') + '\n';
  fs.writeFileSync(csvPath, content);
  return true;
}

module.exports = {
  CSV_HEADERS,
  loadMasterCsv,
  getExistingKeys,
  normalizeLinkedIn,
  isDuplicate,
  appendLeads,
  updateLead,
};
