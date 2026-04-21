// Manager-Forge Lead Pipeline Configuration
// API keys loaded from environment variables
// Run: source ~/.openclaw/workspace/.env before executing pipeline

const path = require('path');

function loadConfig() {
  // Load API keys from environment variables
  const pdlApiKey = process.env.PDL_API_KEY;
  const hunterApiKey = process.env.HUNTER_API_KEY;
  const debounceApiKey = process.env.DEBOUNCE_API_KEY;
  const instantlyApiKey = process.env.INSTANTLY_API_KEY;

  // Validate required environment variables
  if (!pdlApiKey) {
    throw new Error('PDL_API_KEY not set. Run: source ~/.openclaw/workspace/.env');
  }
  if (!hunterApiKey) {
    throw new Error('HUNTER_API_KEY not set. Run: source ~/.openclaw/workspace/.env');
  }
  if (!debounceApiKey) {
    throw new Error('DEBOUNCE_API_KEY not set. Run: source ~/.openclaw/workspace/.env');
  }
  if (!instantlyApiKey) {
    throw new Error('INSTANTLY_API_KEY not set. Run: source ~/.openclaw/workspace/.env');
  }

  return {
    pdl: {
      apiKey: pdlApiKey,
      baseUrl: 'https://api.peopledatalabs.com/v5',
    },
    hunter: {
      apiKey: hunterApiKey,
      baseUrl: 'https://api.hunter.io/v2',
    },
    debounce: {
      apiKey: debounceApiKey,
      baseUrl: 'https://api.debounce.io/v1',
    },
    instantly: {
      apiKey: instantlyApiKey,
      baseUrl: 'https://api.instantly.ai/api/v1',
    },
    // Pipeline settings
    pipeline: {
      batchSize: 50,           // leads per run
      minDelayMs: 5000,        // 5s between API calls (per AGENTS.md)
      masterCsvPath: path.join(__dirname, 'master-leads.csv'),
      dailyReportPath: path.join(__dirname, 'reports'),
    },
    // PDL query defaults (matching our ICP)
    // LOCKED IN: 2026-02-19 — Tested, 3,741 matching leads
    icpQuery: {
      // SQL query for PDL Person Search API
      sql: `SELECT * FROM person 
        WHERE job_title_role='sales' 
        AND job_title_levels='manager' 
        AND job_title LIKE '%manager%'
        AND NOT job_title LIKE '%strategic%'
        AND NOT job_title LIKE '%partner%'
        AND NOT job_title LIKE '%director%'
        AND NOT job_title LIKE '%vice president%'
        AND NOT job_title LIKE '%vp%'
        AND job_start_date >= '{startDate}'
        AND location_country='united states' 
        AND job_company_industry IN ('internet', 'computer software', 'information technology and services', 'financial services', 'computer & network security')
        AND NOT job_title_levels IN ('director', 'vp', 'senior', 'cxo')
        AND job_company_employee_count >= 10
        AND job_company_employee_count <= 500`,
      // Dynamic: replace {startDate} with 12 months ago at runtime
      lookbackDays: 365,
      // Legacy fields (kept for reference)
      titleRole: 'sales',
      titleLevel: 'manager',
      excludeLevels: ['director', 'vp', 'senior', 'cxo'],
      country: 'united states',
      companySizeMin: 10,
      companySizeMax: 500,
      industries: ['internet', 'computer software', 'information technology and services', 'financial services', 'computer & network security'],
    },
  };
}

module.exports = { loadConfig };
