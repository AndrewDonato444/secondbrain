---
id: DOC-042
created: 2026-04-13
updated: 2026-04-13
type: knowledge
domain: personal
status: active
depends-on: [PERSON-002]
informs: [DOC-001]
---

# Sales Edge Solutions — Overview

**What:** GTM infrastructure and outbound automation for Ryan's recruiting firm, Sales Edge Consulting.
**Andrew's role:** Building the outbound machine — tools, sequences, strategy. Pro bono for a friend.

---

## Current Stack

### Lead Sourcing — Apollo
- Contact database and lead search
- ICP-based filtering (companies hiring salespeople, scaling orgs)
- Export leads for outreach sequences

### Email Outreach — Instantly
- Cold email sequences
- Multi-step follow-up automation
- Deliverability management (warmup, rotation)

### LinkedIn Outreach — AutoLinkedIn (Andrew's build)
- **Repo:** github.com/AndrewDonato444/AutoLinkedIn
- **Stack:** TypeScript, Anthropic SDK, Gojiberry API
- Custom-built automation layer on top of Gojiberry AI
- Scraping Dog integration for direct LinkedIn profile scraping (actual profile data, not web search snippets — powers hyper-contextual messaging)
- 14 automations including:
  - Daily lead scanning and ICP-based discovery
  - Lead enrichment with intent signals
  - AI-generated personalized connection requests and messages
  - Campaign health monitoring and performance analytics
  - Message style optimization (learns from what gets replies)
  - ICP refinement (improves targeting over time)
  - Morning briefing and weekly performance reports
  - Lead quality feedback loop
- Full spec: `projects/sales-edge-solutions/gojiberry-outreach-spec.md`

---

## Outbound Flow

```
Apollo (find leads)
    │
    ├──▶ Instantly (email sequences)
    │
    └──▶ AutoLinkedIn (LinkedIn outreach)
              │
              ├── Gojiberry API (execution layer)
              ├── Claude (personalization + strategy)
              └── Feedback loops (optimize over time)
```

Same ICP, two channels. Prospects get touched via email AND LinkedIn.

---

## Running To-Do

- [ ] Deploy AutoLinkedIn for Ryan's LinkedIn account
- [ ] Define Sales Edge ICP in AutoLinkedIn config (companies hiring salespeople, 20-500 employees, US-based, recently funded)
- [ ] Review Ryan's LinkedIn profile — needs to look sharp before running automated outreach
- [ ] Run first campaign (50 leads), review messages together before scaling
- [ ] Set up weekly optimization cadence (review analytics, refine ICP, adjust message style)
- [ ] Evaluate Gojiberry Pro ($99/mo) after free trial based on cost-per-meeting

---

## Metrics to Track

| Metric | Target | Channel |
|--------|--------|---------|
| Email open rate | 40%+ | Instantly |
| Email reply rate | 5-10% | Instantly |
| LinkedIn accept rate | 30%+ | AutoLinkedIn |
| LinkedIn reply rate | 10-15% | AutoLinkedIn |
| Meetings booked | 4-6/week | Combined |
| Cost per meeting | < $25 | Combined |

---

## Cost

| Tool | Cost/Month |
|------|-----------|
| Apollo | TBD (Ryan's account) |
| Instantly | TBD (Ryan's account) |
| Gojiberry Pro | $99 |
| Claude Pro | $20 (if Ryan needs his own) |
