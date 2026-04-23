# Senior Leader Outbound — "Evaluate Your Managers"

> Captured 2026-04-22 from a shower epiphany. Separate GTM motion from the Building Out Loud top-of-funnel — this one goes over managers' heads to the people who own the budget for their development.

---

## The Insight

CROs and SVPs of Sales don't have time to develop their frontline managers. Getting those managers to develop their reps is already a full-time stress. The "who develops the managers?" question is a real gap — and it's the person two levels up who feels the cost of it, not the manager themselves.

**The move:** Don't sell Manager Forge to managers. Sell it to the people who are frustrated their managers aren't ready for the AI shift — and offer to take that problem off their plate.

---

## The Offer Shape

Two-step entry, low-commitment front door:

1. **Manager Evaluation** — Andrew evaluates the leader's manager bench. Output is a short written read on each manager: where they are on AI fluency, coaching maturity, pipeline rigor, hiring judgment. Framed as diagnostic, not pitch.
2. **Program recommendation** — Based on the eval, some managers are recommended into Manager Forge cohort. Others get other guidance (stay put, different development path, etc.). The eval has value even if nobody enrolls.

**Why it works:** The eval is the wedge. CROs don't buy programs from strangers — they buy diagnostics from people who sound like they've sat in the seat. Andrew has. Once the eval is delivered, enrollment is a natural next step, not a cold pitch.

**Ideal ICP:** VP Sales / SVP Sales / CRO at Series B–D SaaS, 3–8 managers on the bench, already feeling the AI pressure but don't have a clear answer. Not enterprise (procurement nightmare), not seed-stage (no manager layer yet).

---

## Distribution Stack

Already owned — no new tooling:

- **GojiBerry Auto** (`projects/gojiberry-auto/`) — full automation suite, not just scripts. Includes ICP lead discovery, Apollo enrichment, message generation, campaign health monitoring, daily lead scans, and performance analytics. Shared tool between this play and Sales Edge Consulting.
- **Instantly** (email, Andrew has account). Runs the email side of the sequence.
- **Apollo** — already integrated into gojiberry-auto via `src/contacts/apollo-enricher.ts`.
- **Spec reference:** `projects/sales-edge-solutions/gojiberry-outreach-spec.md` — the original outreach spec (Sales Edge context). Same shape applies here, different ICP and offer.

**What to reuse from the repo for this play:**
- `src/automations/icp-lead-discovery.ts` — point at the senior-sales-leader ICP (CRO/SVP, Series B–D SaaS, 3–8 managers)
- `src/automations/icp-refinement.ts` — tighten the ICP after the first 20–30 intro calls
- `src/automations/message-generation.ts` — generate the LI + email sequences from the skeleton below
- `src/automations/campaign-health-monitor.ts` + `campaign-performance-analytics.ts` — watch reply rates, book rates, and offer calibration
- `src/contacts/apollo-enricher.ts` — enrich the list once ICP is set

The repo is shared — Sales Edge plays and the Manager Forge senior-leader play both pull from it. Any fixes or enrichments benefit both.

### Architecture note — no Anthropic API key needed

The repo as cloned calls `@anthropic-ai/sdk` directly, which would bill against an Anthropic API key. For this play we flip that: **the LLM work runs inside a Claude Code scheduled task, so the invoking agent (this Claude) does the reasoning — web search, ICP refinement, message generation — and calls the deterministic bits (GojiBerry, Apollo, ScrapingDog, Instantly) as tools.** No SDK calls, no Anthropic billing for this pipeline.

**Required keys (runtime):**
```
GOJIBERRY_API_KEY=     # LinkedIn automation
APOLLO_API_KEY=        # primary enrichment
SCRAPINGDOG_API_KEY=   # fallback when Apollo misses (already in SecondBrain/.env.local)
# Instantly — account login, no programmatic key needed in this repo
```

**Removed:** `ANTHROPIC_API_KEY` — any code path that instantiates the Anthropic SDK should be replaced with a scheduled-task handoff (the agent does the generation, writes results to `data/`, and the deterministic scripts pick them up).

This matters because it turns the whole senior-leader outbound pipeline into a near-zero marginal-cost operation — only the third-party API credits (Apollo, ScrapingDog, GojiBerry subscription) apply.

### Host machine

Runs on the same always-on machine as the Sales Edge outreach jobs — **not this laptop**. A laptop that sleeps mid-sequence drops day-4 follow-ups and kills cadence. The repo already ships `scripts/launchd/` + `setup-overnight.sh` for local launchd scheduling.

Play isolation on the shared host:
- Separate launchd labels per play, staggered cron times (don't burn Apollo credits for both plays in the same hour)
- Separate data subdirs: `data/plays/sales-edge/` and `data/plays/manager-forge/` for contact stores, enrichment logs, campaign state
- Separate ICP configs so `icp-lead-discovery` doesn't cross-pollinate
- Open question: same LinkedIn account for both plays, or separate? Probably separate — Sales Edge is Ryan's persona, Manager Forge is Andrew's.

---

## Sequence Skeleton (First Draft)

Email 1 + LI connect request fire same day:

- **LI connect note:** "Hey {first} — saw you're running sales at {company}. Building a program for managers dealing with the AI shift, wanted to see how you're thinking about it."
- **Email 1:** One paragraph. "You probably don't have time to develop your managers. I built something that does it for you. Before pitching it, I offer a free read on your manager bench — where each one is on AI fluency, coaching maturity, pipeline rigor. Takes a 20-min call + a questionnaire. Worth 20 minutes?"
- **Email 2 (day 4):** Social proof / credibility — the "I'm a VP of Sales who builds the AI systems myself" angle. Link to a BOL episode that shows the thinking.
- **Email 3 (day 8):** Reframe — "If now's not the right time, here's what I'd watch for in your managers over the next quarter." Give value, drop off gracefully.
- **LI DM (day 2, if connected):** Shorter version of email 1. Different phrasing so it doesn't feel copy-pasted.

---

## Near-Term Action

Andrew's stated next step: **start holding intro calls** with senior sales leaders. Not wait for the full sequence to be built — just start conversations to pressure-test the offer.

Minimum viable version:
1. Pull a list of 20–30 CRO/SVP targets from Apollo (Series B–D SaaS, NYC/remote).
2. Send personal notes (not automated) to the first batch. Book intro calls.
3. Run 5–10 of those calls. Listen for: does the "evaluate your managers" framing land? What do they push back on? What do they wish you'd said differently?
4. **Then** build the automated sequence using GojiBerry + Instantly, calibrated to what the intro calls taught you.

Don't automate before you've heard the objections live. Automated rejection is still rejection.

---

## Open Questions

- **Should the eval be free or priced?** Free gets volume and data. Priced ($500?) filters for real intent and signals quality. Probably free for the first 5–10, then flip to priced once you know what the eval product looks like.
- **What's the eval deliverable format?** Written report? Live debrief? Both? Needs to be something that takes <90 min per manager to produce or the math doesn't work.
- **Does this compete with the BOL funnel or complement it?** Probably complement — BOL reaches managers directly, this reaches the people who buy for managers. Two different motions, two different audiences, same product at the end.
- **Enrollment path** — does a CRO-referred manager enroll as a standard cohort seat, or as a "company pack" with multiple seats at a discount? Probably company pack (3+ seats = 15% off) once the motion warms up.

---

## Why This Isn't A Thesis Change

This doesn't change what Manager Forge is. The product, positioning, pricing, and cohort model are locked and don't move. This is a new top-of-funnel channel — a way to get to the same product through a different buyer. Worth noting because thesis changes require explicit approval; this one does not.
