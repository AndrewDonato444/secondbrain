// Step 3.5: Write personalized cold email sequences
// Uses OpenAI-compatible API (Haiku) to generate personalized openers
// Then slots them into the 4-email sequence template
//
// Input: verified lead objects with enrichment data
// Output: lead objects with email_1..email_4 fields ready for Instantly

const https = require('https');

// ─── 4-Email Sequence Templates ───────────────────────────────
// Playbook rules: <120 words each, no jargon, conversational,
// one CTA per email, reference something specific about them

const TEMPLATES = {
  email_1: {
    // Day 0: Main intro — specific reference + pain + value + CTA
    delay_days: 0,
    subject: '{{subject_line}}',
    body: `Hi {{first_name}},

{{opener}}

Most first-time sales managers I talk to say the hardest part isn't the deals — it's figuring out how to coach a team when you were just closing deals yourself a few weeks ago.

I built a 6-week program called Manager Forge that gives new sales managers a step-by-step playbook for running 1:1s, building team trust, and actually hitting quota through your reps instead of doing it all yourself.

Worth a 15-minute chat to see if it fits?

Best,
Andrew`,
  },

  email_2: {
    // Day 3-4: New angle, same pain. Add insight.
    delay_days: 3,
    subject: 'Re: {{subject_line}}',
    body: `Hi {{first_name}},

Quick follow-up — one thing I keep hearing from new sales managers: the jump from "top rep" to "leader" is way harder than anyone warns you about.

The reps who used to be your peers now report to you. Forecasting feels like guessing. And nobody handed you a playbook.

Manager Forge covers exactly that gap — frameworks for your first 90 days that actually work in the real world, not just theory.

Happy to walk you through it if you're curious.

Andrew`,
  },

  email_3: {
    // Day 7-8: Case study result, one sentence.
    delay_days: 7,
    subject: 'Re: {{subject_line}}',
    body: `Hi {{first_name}},

One more thought — a new sales manager I worked with went from missing quota by 15% to exceeding it within 6 weeks, mostly by fixing how he ran pipeline reviews and 1:1s.

Small changes, big difference. Manager Forge teaches the specific frameworks that made that happen.

If that sounds relevant, I'd love to share more.

Andrew`,
  },

  email_4: {
    // Day 12-14: Breakup email. Last check-in, no pressure.
    delay_days: 14,
    subject: 'Re: {{subject_line}}',
    body: `Hi {{first_name}},

Last note from me — I know your inbox is slammed, especially when you're new to managing.

If the timing isn't right, totally get it. But if building a high-performing team is on your mind, Manager Forge is here whenever you're ready.

Either way, wishing you a great start in the new role.

Andrew`,
  },
};

// ─── Haiku Prompt for Personalized Openers ────────────────────

const OPENER_SYSTEM_PROMPT = `You write personalized cold email openers for a sales management training program called Manager Forge.

RULES:
- ONE sentence only, under 20 words
- Reference something SPECIFIC: their name + company, or role transition, or company context
- Warm and human — like a smart person texting, not a marketer
- Never use jargon (leverage, synergize, cutting-edge, etc.)
- Never use fake urgency
- Congrats-style opener preferred when they recently got promoted

OUTPUT: Return ONLY the opener sentence. Nothing else. No quotes.`;

const OPENER_USER_PROMPT = `Write a personalized opener for this lead:
- Name: {{first_name}} {{last_name}}
- Title: {{job_title}}
- Company: {{company_name}}
- Industry: {{company_industry}}
- Company size: {{company_size}}
- Started role: {{job_start_date}}`;

const SUBJECT_SYSTEM_PROMPT = `You write subject lines for cold emails to new sales managers.

RULES:
- 3-7 words ONLY
- Lowercase (no title case)
- No spam trigger words (free, limited, act now, guaranteed)
- Curiosity or relevance based
- Reference their company or role if possible
- Never use brackets or emojis

OUTPUT: Return ONLY the subject line. Nothing else. No quotes.`;

const SUBJECT_USER_PROMPT = `Write a subject line for a cold email to:
- Name: {{first_name}} {{last_name}}
- Title: {{job_title}} at {{company_name}}
- Industry: {{company_industry}}
- Recently promoted to management`;

// ─── API Call to Haiku ────────────────────────────────────────

function callHaiku(config, systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'claude-haiku-4-5-20250414',
      max_tokens: 100,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.content && parsed.content[0]) {
            resolve(parsed.content[0].text.trim());
          } else if (parsed.error) {
            reject(new Error(`Anthropic API: ${parsed.error.message}`));
          } else {
            reject(new Error(`Unexpected response: ${body.slice(0, 200)}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// ─── Template Interpolation ───────────────────────────────────

function interpolate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] || `[${key}]`);
}

// ─── Main: Write Emails for a Lead ───────────────────────────

async function writeEmails(config, lead) {
  const vars = {
    first_name: lead.first_name || lead.full_name?.split(' ')[0] || 'there',
    last_name: lead.last_name || lead.full_name?.split(' ').slice(1).join(' ') || '',
    job_title: lead.job_title || 'Sales Manager',
    company_name: lead.company_name || 'your company',
    company_industry: lead.company_industry || 'technology',
    company_size: lead.company_size || 'unknown',
    job_start_date: lead.job_start_date || 'recently',
  };

  // Generate personalized opener + subject via Haiku
  const openerPrompt = interpolate(OPENER_USER_PROMPT, vars);
  const subjectPrompt = interpolate(SUBJECT_USER_PROMPT, vars);

  let opener, subject_line;

  try {
    opener = await callHaiku(config, OPENER_SYSTEM_PROMPT, openerPrompt);
  } catch (e) {
    console.log(`    ⚠️  Opener generation failed: ${e.message}`);
    opener = `Congrats on the ${vars.job_title} role at ${vars.company_name} — exciting move.`;
  }

  try {
    subject_line = await callHaiku(config, SUBJECT_SYSTEM_PROMPT, subjectPrompt);
  } catch (e) {
    console.log(`    ⚠️  Subject generation failed: ${e.message}`);
    subject_line = `the jump to managing at ${vars.company_name}`;
  }

  const allVars = { ...vars, opener, subject_line };

  // Build all 4 emails
  const emails = {};
  for (const [key, template] of Object.entries(TEMPLATES)) {
    emails[key] = {
      subject: interpolate(template.subject, allVars),
      body: interpolate(template.body, allVars),
      delay_days: template.delay_days,
    };
  }

  return {
    ...lead,
    opener,
    subject_line,
    emails,
  };
}

// ─── Batch: Write Emails for Multiple Leads ──────────────────

async function writeEmailsBatch(config, leads, delayMs = 5000) {
  const results = [];

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`  [${i + 1}/${leads.length}] Writing emails for ${lead.full_name || lead.first_name}...`);

    const result = await writeEmails(config, lead);
    results.push(result);

    console.log(`    → Subject: "${result.subject_line}"`);
    console.log(`    → Opener: "${result.opener}"`);

    // Rate limit between leads (2 API calls per lead, so extra cautious)
    if (i < leads.length - 1) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  return results;
}

module.exports = { writeEmails, writeEmailsBatch, TEMPLATES };
