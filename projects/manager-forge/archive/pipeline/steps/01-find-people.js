// Step 1: Query PDL for new sales managers matching our ICP
// Returns enriched person records

const https = require('https');

function buildPdlQuery(icpQuery) {
  // Calculate date 90 days ago
  const d = new Date();
  d.setDate(d.getDate() - 90);
  const startDate = d.toISOString().split('T')[0];

  return {
    query: {
      bool: {
        must: [
          { term: { job_title_role: icpQuery.titleRole } },
          { term: { job_title_levels: icpQuery.titleLevel } },
          { range: { job_start_date: { gte: startDate } } },
          { term: { location_country: icpQuery.country } },
        ],
        must_not: icpQuery.excludeLevels.map(level => ({
          term: { job_title_levels: level }
        })),
      },
    },
    size: 50, // will be overridden by batchSize
  };
}

function queryPdl(config, batchSize) {
  return new Promise((resolve, reject) => {
    const query = buildPdlQuery(config.icpQuery);
    query.size = batchSize || config.pipeline.batchSize;

    const postData = JSON.stringify(query);

    const options = {
      hostname: 'api.peopledatalabs.com',
      path: '/v5/person/search',
      method: 'POST',
      headers: {
        'X-Api-Key': config.pdl.apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.status === 200) {
            const people = (data.data || []).map(normalizePdlPerson);
            resolve({ total: data.total, people });
          } else {
            reject(new Error(`PDL error: ${data.error?.message || body}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function normalizePdlPerson(p) {
  return {
    full_name: titleCase(p.full_name || ''),
    first_name: titleCase(p.first_name || ''),
    last_name: titleCase(p.last_name || ''),
    job_title: p.job_title || '',
    job_start_date: p.job_start_date || '',
    company_name: p.job_company_name || '',
    company_domain: p.job_company_website || '',
    company_size: p.job_company_size || '',
    company_industry: p.job_company_industry || '',
    location: p.location_name || p.location_locality || '',
    linkedin_url: p.linkedin_url || '',
    // PDL sometimes has emails
    pdl_emails: extractPdlEmails(p),
  };
}

function extractPdlEmails(p) {
  const emails = p.emails;
  if (!emails || !Array.isArray(emails)) return [];
  return emails
    .filter(e => typeof e === 'object' && e.address)
    .map(e => e.address);
}

function titleCase(s) {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

module.exports = { queryPdl, buildPdlQuery };
