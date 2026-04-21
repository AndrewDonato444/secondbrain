# Outreach Task — Reference Docs

## Source Playbooks
- **Cold Outreach Playbook:** `~/.openclaw/workspace/playbooks/cold-outreach.md` (Matt Ganzak / ScaleUP Media — full 9-phase system)
- **Lead Enrichment Playbook:** `~/.openclaw/workspace/memory/LEAD-ENRICHMENT-PLAYBOOK.md` (Clay workflow + multi-channel strategy)
- **ClawdBot System:** 45-day TAM coverage model, 2-email sequences (expanded to 4 per cold outreach playbook)

## Pipeline Code
- **Location:** `~/.openclaw/workspace/projects/Manager-Forge/pipeline/`
- **Entry point:** `node run.js --batch=50 [--campaign=CAMPAIGN_ID] [--dry-run]`
- **Steps:**
  - `steps/01-find-people.js` — PDL query
  - `steps/02-find-email.js` — Hunter.io lookup
  - `steps/03-verify-email.js` — DeBounce validation
  - `steps/03.5-write-emails.js` — Haiku email personalization
  - `steps/04-push-instantly.js` — Instantly.ai campaign push
- **Config:** `config.js` (loads API keys from `openclaw.json`)
- **Dedup:** `master-csv.js` + `master-leads.csv`

## ICP Definition (from Lead Enrichment Playbook)
```json
{
  "title": "Sales Manager",
  "seniority": "first-time (promoted from IC/rep)",
  "time_in_role": "<3 months",
  "location": "United States",
  "company_size": "10-1,000 employees",
  "exclude_titles": ["Director", "VP", "Senior", "CXO"],
  "pain_points": [
    "Coaching a team when you were just closing deals",
    "Running 1:1s for the first time",
    "Forecasting accurately with a new team",
    "Managing former peers",
    "Building trust as a new leader"
  ]
}
```

## Email Sequence Timing
| Email | Delay | Angle |
|-------|-------|-------|
| 1 | Day 0 | Personalized intro + pain + value |
| 2 | Day 3 | New angle, same pain |
| 3 | Day 7 | Case study result |
| 4 | Day 14 | Breakup, no pressure |

## Key Metrics to Track (from Playbook)
- Open rate target: >25%
- Reply rate target: >8%
- Bounce rate ceiling: <2%
- Daily send limit: 30-50 per account
- Cost per lead: ~$0.07 (PDL + Hunter + DeBounce + Haiku)

## API Docs
- **PDL:** https://docs.peopledatalabs.com/
- **Hunter:** https://hunter.io/api-documentation
- **DeBounce:** https://debounce.io/api
- **Instantly:** https://developer.instantly.ai/
- **Anthropic (Haiku):** https://docs.anthropic.com/
