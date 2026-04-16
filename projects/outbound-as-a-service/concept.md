---
id: DOC-043
created: 2026-04-13
updated: 2026-04-13
type: knowledge
domain: personal
status: active
depends-on: [DOC-042, DOC-039, DOC-031]
informs: [DOC-001, DOC-010]
---

# Outbound-as-a-Service — Concept

## The Realization

Andrew built a full outbound automation stack for Sales Edge (Ryan's recruiting firm): Apollo for lead sourcing, Instantly for email sequences, AutoLinkedIn (custom Claude + Gojiberry build) for LinkedIn outreach with 14 automations and self-optimizing feedback loops.

This isn't just "helping a friend." This is a repeatable, productizable service for any B2B company.

## The Service

**What:** Done-for-you AI-powered outbound — multi-channel (email + LinkedIn), Claude-personalized messaging, self-optimizing feedback loops. Andrew sets it up, tunes it, and manages the optimization.

**For whom:** B2B companies that need outbound but don't have the technical chops or sales expertise to build and run it themselves. Startups, SMBs, agencies, recruiting firms, consultancies — anyone selling to other businesses.

**Why Andrew:** 17 years of B2B sales leadership + the ability to build production automation tools. The tech is the table stakes. Knowing what messages work, what ICP signals matter, how to read campaign data through a sales lens — that's the value.

## The Stack (Already Built)

| Layer | Tool | Role |
|-------|------|------|
| Lead sourcing | Apollo | Find leads matching client's ICP |
| Email outreach | Instantly | Multi-step email sequences, warmup, rotation |
| LinkedIn outreach | AutoLinkedIn | Claude-powered personalization, intent signals, campaign management |
| Intelligence | Claude API | ICP refinement, message optimization, lead scoring |

## Per-Client Playbook

1. **Onboard** — Define ICP, messaging, value prop, price point
2. **Configure** — Set up Apollo filters, Instantly sequences, AutoLinkedIn automations
3. **Launch** — First campaign (50 leads), review together
4. **Optimize** — Weekly: read feedback loops, refine ICP, adjust message style
5. **Scale** — Increase volume as signals improve
6. **Report** — Monthly performance report (meetings booked, cost per meeting, pipeline generated)

## Economics

| Item | Estimate |
|------|----------|
| Client fee | $2,000-5,000/month |
| Tool cost per client | ~$200/month (Apollo + Instantly + Gojiberry + Claude) |
| Margin | 90%+ |
| Time per client | ~5 hrs/week (setup heavy first month, then optimization) |
| Target | 3-5 clients = $10-25k/month |
| Escape velocity | 3 clients at $5k = $15k/month ← the number |

## The Moat

- Anyone can sign up for Apollo, Instantly, and Gojiberry
- Almost nobody can build custom Claude-powered automations with self-optimizing feedback loops on top
- Even fewer can combine that technical capability with 17 years of knowing what actually works in B2B sales
- The feedback loops get smarter over time — each client's system improves the longer it runs
- Andrew's sales expertise is embedded in the ICP definitions, message frameworks, and optimization decisions

## Connection to Managed Agents Playbook

This IS the managed agents service business from DOC-031, applied to outbound sales. The playbook predicted $2-5k/month per client for AI agent services. AutoLinkedIn is the first agent. Outbound is the first vertical.

Future verticals could include:
- Pre-call research automation (SignalPrep)
- Content generation pipelines (like Facts Unlocked but for clients)
- CRM intelligence and enrichment
- Sales coaching automation (when Gong access opens up)

## What Ryan Is

Ryan isn't just a friend Andrew is helping. He's the proof of concept. If Sales Edge books meetings from this stack, that's the case study that sells the next 4 clients.

## Open Question: Product vs Service vs Hybrid

**Not decided yet.** Three paths under consideration:

- **Product:** User inputs API keys, Andrew provides the orchestration + prompts + feedback loops. Scales infinitely but gives away the IP.
- **Service:** Andrew runs it for clients. $3-5k/month. High margin but trades time.
- **Hybrid (leaning toward):** One-time setup fee ($2-5k) to configure the full stack for their ICP + monthly optimization retainer ($500-1.5k) where Andrew runs the feedback loops, refines ICP, adjusts messaging. System lives in their infra, but the brain stays with Andrew.

Key insight: the value is in the judgment (what to change based on the data), not the code. That argues against pure product.

**Status:** Parked. Too many active projects. Revisit after Sales Edge proves the model.

## Next Steps

- [ ] Track Sales Edge results rigorously — meetings booked, reply rates, cost per meeting
- [ ] Document the setup process as a repeatable playbook
- [ ] Price the service: what does "I'll run your outbound for you" cost?
- [ ] Identify 2-3 potential clients (founders/small B2B teams who need outbound)
- [ ] Build a simple landing page or one-pager
- [ ] Consider whether this lives under MSA, a new brand, or Andrew's personal brand
