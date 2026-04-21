// Step 4: Push verified leads to Instantly.ai campaign
// Uses Instantly API to add leads

const https = require('https');

function httpPost(url, data, apiKey) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${apiKey}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body }); }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function pushToInstantly(config, leads, campaignId) {
  if (!config.instantly.apiKey) {
    console.log('  ⚠️  Instantly API key not configured — skipping push');
    return { pushed: 0, skipped: leads.length };
  }

  if (!campaignId) {
    console.log('  ⚠️  No campaign ID provided — skipping push');
    return { pushed: 0, skipped: leads.length };
  }

  const instantlyLeads = leads.map(lead => {
    const custom = {
      job_title: lead.job_title,
      company_size: lead.company_size,
      industry: lead.company_industry,
      linkedin: lead.linkedin_url,
    };

    // If personalized emails were generated, pass them as custom variables
    // so Instantly can use {{opener}}, {{subject_line}} in campaign templates
    if (lead.opener) custom.opener = lead.opener;
    if (lead.subject_line) custom.subject_line = lead.subject_line;

    return {
      email: lead.email,
      first_name: lead.first_name,
      last_name: lead.last_name,
      company_name: lead.company_name,
      personalization: lead.opener || lead.notes || '',
      custom_variables: custom,
    };
  });

  try {
    const result = await httpPost(
      `${config.instantly.baseUrl}/lead/add`,
      {
        campaign_id: campaignId,
        skip_if_in_workspace: true,
        leads: instantlyLeads,
      },
      config.instantly.apiKey
    );

    const pushed = result.leads_uploaded || result.uploaded || leads.length;
    console.log(`  ✅ Pushed ${pushed} leads to Instantly campaign ${campaignId}`);
    return { pushed, skipped: 0, result };
  } catch (e) {
    console.log(`  ❌ Instantly push error: ${e.message}`);
    return { pushed: 0, skipped: leads.length, error: e.message };
  }
}

module.exports = { pushToInstantly };
