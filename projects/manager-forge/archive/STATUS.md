# Manager-Forge — Project Status

**Last Updated:** 2026-02-18

## Phase: Pre-Launch (Building Outreach Infrastructure)

### ✅ Done
- **Curriculum:** 12 modules complete (105K words video scripts + 85K words learner packs)
- **ICP:** Defined in `ICP.md` — first-time sales managers, B2C, $149/$499 tiers
- **Learner Pack Parser:** Built in `~/.openclaw/workspace/skills/learner-pack-parser/`
- **Domain + Email:** Purchased, Google Workspace (3 accounts), SPF/DKIM/DMARC configured
- **Instantly:** 3 accounts connected & warming (started Feb 18, ready ~March 4)
- **Landing Page v1:** Built in Replit (hunter green/sand palette)
- **Lead Pipeline:** Built & tested (`pipeline/run.js`) — PDL → Hunter → DeBounce → Instantly
- **API Keys:** PDL, Hunter, DeBounce, Instantly — all configured in openclaw.json
- **Cold Outreach Playbook:** Saved in `playbooks/cold-outreach.md`

### 🔧 In Progress
- Domain warmup (14 days, ~March 4 completion)

### 📋 To Do
- [ ] Write 2-email cold sequences tailored to ICP
- [ ] Create Instantly campaign (get campaign ID)
- [ ] Run pipeline with 50-100 lead batch
- [ ] Fix landing page (unicode bug, About section, Stripe, community links)
- [ ] Choose community platform (Circle.so or alternative)
- [ ] Generate UGC marketing videos (MakeUGC)
- [ ] Go live (~March 4)

### 📁 Key Files
| File | Purpose |
|------|---------|
| `ICP.md` | Ideal customer profile (full details + JSON) |
| `pipeline/run.js` | Lead generation pipeline (run with `node run.js --batch=50`) |
| `pipeline/master-leads.csv` | Single source of truth for all leads |
| `pipeline/config.js` | API keys + ICP query config |
| `pipeline/steps/01-find-people.js` | PDL search |
| `pipeline/steps/02-find-email.js` | Hunter waterfall |
| `pipeline/steps/03-verify-email.js` | DeBounce verification |
| `pipeline/steps/04-push-instantly.js` | Push to Instantly campaign |

### 💰 Pricing
- **Standard:** $149/mo (modules + community + weekly calls)
- **Platinum:** $499/mo (+ 1-2 coaching calls/month)

### 🎯 Launch Target
- **Date:** ~March 4, 2026 (when warmup completes)
- **Goal:** First 5-10 paying members to validate product-market fit
