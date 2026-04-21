// Step 2: Find emails via Hunter.io waterfall
// 1. Try Hunter Email Finder (name + domain)
// 2. Fall back to domain search (get pattern) + construct email
// 3. Last resort: pattern guessing

const https = require('https');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

// Method 1: Direct email finder
async function hunterEmailFinder(config, firstName, lastName, domain) {
  const url = `${config.hunter.baseUrl}/email-finder?` +
    `domain=${encodeURIComponent(domain)}` +
    `&first_name=${encodeURIComponent(firstName)}` +
    `&last_name=${encodeURIComponent(lastName)}` +
    `&api_key=${config.hunter.apiKey}`;

  const result = await httpGet(url);
  const data = result.data || {};

  if (data.email && data.score >= 70) {
    return {
      email: data.email,
      source: 'hunter_finder',
      confidence: data.score,
    };
  }
  return null;
}

// Method 2: Domain search to find pattern
async function hunterDomainSearch(config, domain) {
  const url = `${config.hunter.baseUrl}/domain-search?` +
    `domain=${encodeURIComponent(domain)}` +
    `&api_key=${config.hunter.apiKey}`;

  const result = await httpGet(url);
  const data = result.data || {};

  return {
    pattern: data.pattern || null,
    emails: (data.emails || []).map(e => ({
      email: e.value,
      name: `${e.first_name || ''} ${e.last_name || ''}`.trim(),
    })),
  };
}

// Method 3: Pattern-based guessing
function guessEmail(firstName, lastName, domain, pattern) {
  const f = firstName.toLowerCase();
  const l = lastName.toLowerCase();

  if (pattern) {
    return pattern
      .replace('{first}', f)
      .replace('{last}', l)
      .replace('{f}', f[0])
      .replace('{l}', l[0])
      + '@' + domain;
  }

  // Common patterns in order of frequency
  const guesses = [
    `${f}.${l}@${domain}`,         // 36%
    `${f}@${domain}`,              // 25%
    `${f}${l}@${domain}`,          // 15%
    `${f[0]}${l}@${domain}`,       // 10%
  ];

  return guesses[0]; // return most common as primary guess
}

// Main waterfall: try methods in sequence
async function findEmail(config, person) {
  const { first_name, last_name, company_domain } = person;

  if (!company_domain || !first_name || !last_name) {
    return { email: null, source: 'skipped', confidence: 0 };
  }

  const domain = company_domain
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');

  // Check if PDL already gave us an email
  if (person.pdl_emails && person.pdl_emails.length > 0) {
    return {
      email: person.pdl_emails[0],
      source: 'pdl',
      confidence: 80,
    };
  }

  // Method 1: Hunter Email Finder
  try {
    const found = await hunterEmailFinder(config, first_name, last_name, domain);
    if (found) return found;
  } catch (e) {
    console.log(`  Hunter finder error for ${first_name} ${last_name}: ${e.message}`);
  }

  await delay(config.pipeline.minDelayMs);

  // Method 2: Hunter Domain Search + pattern
  try {
    const domainData = await hunterDomainSearch(config, domain);
    if (domainData.pattern) {
      const email = guessEmail(first_name, last_name, domain, domainData.pattern);
      return {
        email,
        source: 'hunter_pattern',
        confidence: 70,
      };
    }
  } catch (e) {
    console.log(`  Hunter domain search error for ${domain}: ${e.message}`);
  }

  // Method 3: Pattern guessing (free fallback)
  const guessed = guessEmail(first_name, last_name, domain, null);
  return {
    email: guessed,
    source: 'pattern_guess',
    confidence: 40,
  };
}

module.exports = { findEmail, hunterEmailFinder, hunterDomainSearch, guessEmail };
