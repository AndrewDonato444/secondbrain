// Step 3: Verify emails via DeBounce API
// Categorizes: SAFE / RISKY / INVALID (per playbook Phase 4)

const https = require('https');

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

async function verifyEmail(config, email) {
  if (!email) {
    return { verified: false, result: 'no_email', sendable: false };
  }

  const url = `${config.debounce.baseUrl}/?` +
    `api=${config.debounce.apiKey}` +
    `&email=${encodeURIComponent(email)}`;

  try {
    const data = await httpGet(url);
    const db = data.debounce || {};

    const code = String(db.code || '');
    const reason = (db.reason || '').toLowerCase();
    const sendTransactional = db.send_transactional;

    let category;
    let sendable;

    // Categorization per playbook
    if (code === '5' || reason.includes('safe to send') || sendTransactional === '1') {
      category = 'SAFE';
      sendable = true;
    } else if (reason.includes('accept') || reason.includes('role') || reason.includes('catch')) {
      category = 'RISKY';
      sendable = true; // sendable but with caution
    } else if (reason.includes('invalid') || reason.includes('disposable') || reason.includes('spam')) {
      category = 'INVALID';
      sendable = false;
    } else {
      category = 'UNKNOWN';
      sendable = false;
    }

    return {
      verified: true,
      result: category,
      reason: db.reason || '',
      code: code,
      sendable,
    };
  } catch (e) {
    console.log(`  DeBounce error for ${email}: ${e.message}`);
    return { verified: false, result: 'error', sendable: false };
  }
}

module.exports = { verifyEmail };
