#!/usr/bin/env node
// Manager-Forge Lead Pipeline
// Usage: node run.js [--batch=50] [--campaign=CAMPAIGN_ID] [--dry-run]
//
// Waterfall: PDL → Hunter → DeBounce → Instantly
// Respects rate limits: 5s between API calls
// Deduplicates against master-leads.csv

const { loadConfig } = require('./config');
const { queryPdl } = require('./steps/01-find-people');
const { findEmail } = require('./steps/02-find-email');
const { verifyEmail } = require('./steps/03-verify-email');
const { writeEmailsBatch } = require('./steps/03.5-write-emails');
const { pushToInstantly } = require('./steps/04-push-instantly');
const {
  loadMasterCsv, getExistingKeys, isDuplicate,
  appendLeads, updateLead,
} = require('./master-csv');
const crypto = require('crypto');

// Parse CLI args
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, val] = arg.replace(/^--/, '').split('=');
  acc[key] = val || true;
  return acc;
}, {});

const BATCH_SIZE = parseInt(args.batch) || 50;
const CAMPAIGN_ID = args.campaign || null;
const DRY_RUN = args['dry-run'] || false;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateLeadId() {
  return 'lead_' + crypto.randomBytes(6).toString('hex');
}

async function run() {
  console.log('═══════════════════════════════════════════');
  console.log('  Manager-Forge Lead Pipeline');
  console.log(`  ${new Date().toISOString()}`);
  console.log(`  Batch: ${BATCH_SIZE} | Campaign: ${CAMPAIGN_ID || 'none'} | Dry run: ${DRY_RUN}`);
  console.log('═══════════════════════════════════════════\n');

  const config = loadConfig();
  const stats = {
    pdl_found: 0,
    pdl_total: 0,
    duplicates: 0,
    emails_found: 0,
    emails_verified: 0,
    safe: 0,
    risky: 0,
    invalid: 0,
    pushed: 0,
    errors: 0,
    credits: { pdl: 0, hunter: 0, debounce: 0 },
  };

  // --- Step 1: Find people via PDL ---
  console.log('📡 Step 1: Querying PDL for new sales managers...');
  let people;
  try {
    const result = await queryPdl(config, BATCH_SIZE);
    people = result.people;
    stats.pdl_total = result.total;
    stats.pdl_found = people.length;
    stats.credits.pdl = people.length; // ~1 credit per record
    console.log(`  Found ${people.length} people (${result.total.toLocaleString()} total matching)\n`);
  } catch (e) {
    console.error(`  ❌ PDL query failed: ${e.message}`);
    return;
  }

  // --- Step 2: Dedup against master CSV ---
  console.log('🔍 Step 2: Deduplicating against master leads...');
  const existingLeads = loadMasterCsv(config.pipeline.masterCsvPath);
  const existingKeys = getExistingKeys(existingLeads);
  console.log(`  Master CSV has ${existingLeads.length} existing leads`);

  const newPeople = people.filter(p => {
    if (isDuplicate(p, existingKeys)) {
      stats.duplicates++;
      return false;
    }
    return true;
  });
  console.log(`  New: ${newPeople.length} | Duplicates skipped: ${stats.duplicates}\n`);

  if (newPeople.length === 0) {
    console.log('✅ No new leads to process. Done!');
    printStats(stats);
    return;
  }

  // --- Step 3: Find emails (Hunter waterfall) ---
  console.log('📧 Step 3: Finding emails via Hunter waterfall...');
  const leadsWithEmail = [];

  for (let i = 0; i < newPeople.length; i++) {
    const person = newPeople[i];
    console.log(`  [${i + 1}/${newPeople.length}] ${person.full_name} @ ${person.company_domain}`);

    if (DRY_RUN) {
      leadsWithEmail.push({ ...person, email: 'dry-run@test.com', email_source: 'dry_run' });
      continue;
    }

    const emailResult = await findEmail(config, person);
    if (emailResult.email) {
      stats.emails_found++;
      stats.credits.hunter++;
      console.log(`    → ${emailResult.email} (${emailResult.source}, ${emailResult.confidence}% confidence)`);
      leadsWithEmail.push({
        ...person,
        email: emailResult.email,
        email_source: emailResult.source,
      });
    } else {
      console.log(`    → No email found`);
      leadsWithEmail.push({
        ...person,
        email: null,
        email_source: 'not_found',
      });
    }

    // Rate limit: 5s between API calls
    if (i < newPeople.length - 1) {
      await delay(config.pipeline.minDelayMs);
    }
  }
  console.log();

  // --- Step 4: Verify emails (DeBounce) ---
  console.log('✅ Step 4: Verifying emails via DeBounce...');
  const verifiedLeads = [];

  for (let i = 0; i < leadsWithEmail.length; i++) {
    const lead = leadsWithEmail[i];
    if (!lead.email) {
      stats.invalid++;
      verifiedLeads.push({ ...lead, email_verified: 'no_email', verification_result: 'SKIPPED' });
      continue;
    }

    if (DRY_RUN) {
      verifiedLeads.push({ ...lead, email_verified: 'dry_run', verification_result: 'SAFE' });
      stats.safe++;
      continue;
    }

    console.log(`  [${i + 1}/${leadsWithEmail.length}] ${lead.email}`);
    const vResult = await verifyEmail(config, lead.email);
    stats.emails_verified++;
    stats.credits.debounce++;

    if (vResult.result === 'SAFE') stats.safe++;
    else if (vResult.result === 'RISKY') stats.risky++;
    else stats.invalid++;

    console.log(`    → ${vResult.result} (${vResult.reason || 'n/a'})`);

    verifiedLeads.push({
      ...lead,
      email_verified: vResult.result,
      verification_result: vResult.reason || vResult.result,
    });

    if (i < leadsWithEmail.length - 1) {
      await delay(config.pipeline.minDelayMs);
    }
  }
  console.log();

  // --- Step 4.5: Write personalized email sequences ---
  const sendableForEmails = verifiedLeads.filter(l =>
    l.email && (l.email_verified === 'SAFE' || l.email_verified === 'RISKY')
  );
  console.log(`✍️  Step 4.5: Writing personalized emails for ${sendableForEmails.length} sendable leads...`);

  let leadsWithEmails = [];
  if (sendableForEmails.length > 0 && !DRY_RUN) {
    try {
      // Load Anthropic API key from environment variable
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (!anthropicKey) {
        console.log('  ⚠️  ANTHROPIC_API_KEY not set — using fallback openers');
        console.log('  Run: source ~/.openclaw/workspace/.env');
      }
      leadsWithEmails = await writeEmailsBatch(
        { anthropicApiKey: anthropicKey },
        sendableForEmails,
        config.pipeline.minDelayMs
      );
      console.log(`  ✅ Generated 4-email sequences for ${leadsWithEmails.length} leads\n`);
    } catch (e) {
      console.log(`  ❌ Email writing failed: ${e.message} — leads saved without emails\n`);
    }
  } else if (DRY_RUN) {
    console.log('  ⏸️  Dry run — skipping email generation\n');
  } else {
    console.log('  ⏸️  No sendable leads — skipping email generation\n');
  }

  // --- Step 5: Save to master CSV ---
  console.log('💾 Step 5: Saving to master CSV...');
  const csvLeads = verifiedLeads.map(lead => ({
    lead_id: generateLeadId(),
    date_added: new Date().toISOString().split('T')[0],
    full_name: lead.full_name,
    first_name: lead.first_name,
    last_name: lead.last_name,
    job_title: lead.job_title,
    job_start_date: lead.job_start_date,
    company_name: lead.company_name,
    company_domain: lead.company_domain,
    company_size: lead.company_size,
    company_industry: lead.company_industry,
    location: lead.location,
    linkedin_url: lead.linkedin_url,
    email: lead.email || '',
    email_source: lead.email_source || '',
    email_verified: lead.email_verified || '',
    verification_result: lead.verification_result || '',
    pushed_to_instantly: 'no',
    campaign_id: '',
    lead_score: scoreLead(lead),
    notes: '',
  }));

  if (!DRY_RUN) {
    appendLeads(config.pipeline.masterCsvPath, csvLeads);
  }
  console.log(`  Saved ${csvLeads.length} leads to master CSV\n`);

  // --- Step 6: Push sendable leads to Instantly ---
  // Merge email sequences into sendable leads if available
  const emailMap = new Map();
  for (const l of leadsWithEmails) {
    const key = l.email || l.linkedin_url;
    if (key) emailMap.set(key, l);
  }

  const sendable = csvLeads.filter(l =>
    l.email && (l.email_verified === 'SAFE' || l.email_verified === 'RISKY')
  );
  console.log(`📤 Step 6: ${sendable.length} sendable leads ready for Instantly`);

  if (sendable.length > 0 && CAMPAIGN_ID && !DRY_RUN) {
    // Attach email personalization to leads before pushing
    const enrichedSendable = sendable.map(lead => {
      const emailData = emailMap.get(lead.email);
      if (emailData?.emails) {
        return { ...lead, personalization: emailData.emails, opener: emailData.opener, subject_line: emailData.subject_line };
      }
      return lead;
    });

    const pushResult = await pushToInstantly(config, enrichedSendable, CAMPAIGN_ID);
    stats.pushed = pushResult.pushed;

    // Update master CSV with push status
    for (const lead of sendable) {
      updateLead(config.pipeline.masterCsvPath, lead.lead_id, {
        pushed_to_instantly: 'yes',
        campaign_id: CAMPAIGN_ID,
      });
    }
  } else if (!CAMPAIGN_ID) {
    console.log('  ⏸️  No campaign ID provided — leads saved but not pushed');
    console.log('  Run with --campaign=YOUR_CAMPAIGN_ID to push to Instantly');
  }
  console.log();

  // --- Report ---
  printStats(stats);
}

function scoreLead(lead) {
  let score = 0;

  // Job start date recency (max 30 points)
  if (lead.job_start_date) {
    const start = new Date(lead.job_start_date);
    const daysAgo = (Date.now() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (daysAgo < 30) score += 30;
    else if (daysAgo < 60) score += 20;
    else if (daysAgo < 90) score += 10;
  }

  // Company size sweet spot (max 20 points)
  const size = lead.company_size || '';
  if (size.includes('51-200') || size.includes('201-500')) score += 20;
  else if (size.includes('11-50') || size.includes('501-1000')) score += 10;

  // Industry match (max 20 points)
  const industry = (lead.company_industry || '').toLowerCase();
  if (industry.includes('software') || industry.includes('saas') || industry.includes('technology')) {
    score += 20;
  } else if (industry.includes('internet') || industry.includes('computer')) {
    score += 15;
  }

  // Email quality (max 20 points)
  if (lead.email_verified === 'SAFE') score += 20;
  else if (lead.email_verified === 'RISKY') score += 10;

  // Has email at all (max 10 points)
  if (lead.email) score += 10;

  return Math.min(score, 100);
}

function printStats(stats) {
  console.log('═══════════════════════════════════════════');
  console.log('  Pipeline Report');
  console.log('═══════════════════════════════════════════');
  console.log(`  PDL: ${stats.pdl_found} pulled (${stats.pdl_total.toLocaleString()} total available)`);
  console.log(`  Duplicates skipped: ${stats.duplicates}`);
  console.log(`  Emails found: ${stats.emails_found}`);
  console.log(`  Verified: ${stats.emails_verified} (Safe: ${stats.safe} | Risky: ${stats.risky} | Invalid: ${stats.invalid})`);
  console.log(`  Pushed to Instantly: ${stats.pushed}`);
  console.log(`  Credits used: PDL ~${stats.credits.pdl} | Hunter ~${stats.credits.hunter} | DeBounce ~${stats.credits.debounce}`);
  console.log('═══════════════════════════════════════════');
}

// Run it
run().catch(e => {
  console.error('❌ Pipeline error:', e);
  process.exit(1);
});
