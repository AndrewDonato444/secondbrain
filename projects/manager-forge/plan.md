# Manager Forge — Launch Plan

**Goal:** Cohort 1 live by July 13, 2026. 8–12 seats at $995 founding cohort pricing.
**Today:** 2026-04-21 (12 weeks to launch)

---

## Timeline at a Glance

| Phase | Dates | Duration | Output |
|---|---|---|---|
| 0. Content Audit | Apr 21 – May 5 | 2 weeks | Module verdicts, gap map |
| 1. Program Architecture | May 5 – May 19 | 2 weeks | 6-week cohort outline, pricing lock |
| 2. Brand + Platform | May 5 – May 19 | 2 weeks (parallel) | Brand system, tech stack decision |
| 3. Curriculum Build | May 19 – Jun 15 | 4 weeks | Session decks, worksheets, async pre-work |
| 4. Pre-Sell | Jun 15 – Jul 13 | 4 weeks | Landing page live, 8–12 seats filled |
| 5. Cohort 1 Delivery | Jul 13 – Aug 24 | 6 weeks | Program runs, testimonials collected |

---

## Phase 0: Content Audit (Apr 21 – May 5)

**Goal:** Full understanding of what's on the boat before we build anything new.

### What We Do

Read every module in `managerforgeOLD/tasks/Curriculum-Design/modules/` and render a verdict on each.

**Classification system:**
- ✅ **Foundations** — Evergreen, quality is high, fits as async companion content. Keep as-is or light edit.
- 🔧 **Revise** — Solid core, but needs AI layer woven in. The material is good; the lens is missing.
- ❌ **Retire** — Doesn't fit the program or the audience. Archive, don't adapt.
- 🔨 **Cannibalize** — Has good exercises/worksheets but the module framing is wrong. Pull the parts.

**Module inventory to audit (all 13):**
- Module 1: Emotional Leadership Playbook
- Module 2: Managing Up Without Micromanaging Down
- Module 3: Difficult Conversation Choreography
- Module 4: Manager Identity Shift
- Module 5: Operating Rhythm
- Module 6: Effective 1:1s
- Module 7: Pipeline Review & Forecasting
- Module 8: Coaching Reps to Results
- Module 9: Hiring & Team Building
- Module 10: Motivation & Culture
- Module 11: Time Management & Scaling
- Module 12: Long-Term Leadership Growth
- Module 13: The AI Manager ← expand this significantly

**Gap analysis:** After audit, map what's missing for the AI spine. Expected gaps:
- Leading a team that uses AI tools (not just using AI yourself)
- Evaluating AI-generated output (deal analysis, forecasts, coaching suggestions)
- How your management job changes when reps have AI co-pilots
- AI workflow design for your team (what to automate vs. what to own)
- Prompt literacy as a manager skill

**Output:** `projects/manager-forge/content-audit.md`

---

## Phase 1: Program Architecture (May 5 – May 19)

**Goal:** Lock the 6-week cohort structure. Every session named, scoped, sequenced.

### What We Decide

**Cohort format:**
- 6 live sessions, one per week (90 min each)
- 1 community/accountability call midpoint (45 min)
- Async pre-work before each session (30–45 min reading/exercise)
- Slack or Circle channel for async discussion

**Session arc (draft — refined after audit):**

| Week | Session | Theme |
|---|---|---|
| 1 | The New Manager OS | What's actually changed. AI isn't a tool you use; it's a context you operate in. |
| 2 | Leading a Team with AI | Your reps have co-pilots now. What does that change about coaching, accountability, and 1:1s? |
| 3 | Pipeline & Forecasting in the AI Age | How AI changes deal analysis, forecast calls, and the signals you watch. |
| 4 | Coaching at Scale | Using AI to analyze more, coach better, and get out of the manual review trap. |
| 5 | Culture, Trust, and Performance | What motivation and accountability look like when AI is in the room. |
| 6 | Your AI-Enabled Operating Rhythm | Building the system. Week-by-week cadence. The playbook you take home. |

**Pricing lock:** Set in Phase 1 based on content density + value assessment from audit.
- Floor: $795 (founding cohort, low friction)
- Target: $995 (sweet spot without testimonials)
- If curriculum is exceptionally strong post-audit: $1,295

**Output:** `projects/manager-forge/program-architecture.md`

---

## Phase 2: Brand + Platform (May 5 – May 19)

**Goal:** Know what we're building on before we build anything.

### Brand Architecture

**Name:** Keep "Manager Forge." It's strong, it fits, it doesn't need to change.

**Positioning line (working):** "The operating system for the AI-enabled sales manager."

**Voice:** Same as BOL — direct, conversational, "I've been in your seat." No corporate fluff, no generic frameworks.

**Template system to build:**
- Session slide deck template (clean, minimal, reusable per session)
- Worksheet template (printable/fillable, consistent branding)
- Email templates (welcome, pre-session, post-session, follow-up)
- LinkedIn content templates (for pre-sell and enrollment)

**Output:** `projects/manager-forge/brand-system.md`

### Platform Decision

**What the MVP actually needs:**

| Need | Options | Lean |
|---|---|---|
| Live sessions | Zoom / Riverside | Zoom (simplest) |
| Community | Circle / Slack / Skool | Skool (community + content in one, $99/mo) |
| Payment/enrollment | Stripe direct / Maven / Kajabi | Stripe direct (no platform fee) |
| Content hub | Skool / Notion public / Kajabi | Skool (if community is there anyway) |
| Async video | Loom / YouTube unlisted / Vimeo | Loom for pre-work, YouTube unlisted for modules |

**Minimum viable stack for Cohort 1:**
- Zoom (live sessions) + Skool (community + resources + enrollment page) + Stripe (payment)
- Total ~$100–150/mo. No per-seat fees. Clean.
- Alternative: Maven.com (all-in-one for cohorts, handles everything, ~10% rev share). Higher fee but zero setup friction.

**Decision to make in Phase 2:** Skool/Stripe/Zoom stack vs. Maven. Tradeoff is control vs. speed-to-launch.

**Output:** `projects/manager-forge/platform-decision.md`

---

## Phase 3: Curriculum Build (May 19 – Jun 15)

**Goal:** 6 session decks, 6 async pre-work packages, 6 worksheets. Cohort-ready.

### What Gets Built

For each of the 6 sessions:
- **Slide deck** (30–40 slides, built in template)
- **Pre-work package** (reading + 1 exercise, ~30 min, draws from Foundations library)
- **Worksheet** (session-specific, printable, actionable)
- **Facilitator notes** (Andrew's own speaker notes, real examples)

The AI spine sessions are net-new. Sessions that pull from revised old modules get a rewrite pass.

Foundations library (async companion content):
- Pull the 6–8 best old modules after audit
- Light edit, re-skin to brand
- Host in Skool as bonus library

**Output:** `projects/manager-forge/curriculum/` (session-by-session folders)

---

## Phase 4: Pre-Sell (Jun 15 – Jul 13)

**Goal:** 8–12 seats filled before Cohort 1 starts.

### Channels

**Cold outreach:** Reactivate the existing pipeline. Update ICP targeting from "first-time sales managers" to "sales managers actively navigating AI change." Refresh the email angles to lead with the AI angle. Run the pipeline against the 3,741 leads already in PDL.

**BOL (organic top of funnel):** Thread 4–6 episodes around Manager Forge themes in the 6 weeks before enrollment opens. No pitching — pure value. At enrollment open, mention it once with context. Topics: "How I think about coaching reps who use AI," "The thing that changes when your rep has a co-pilot," etc.

**LinkedIn outreach:** Personal DMs to VP-and-below sales leaders in the existing network. Warm is better than cold here.

**Landing page:**
- Rebuild, don't fix the old Replit page
- One-pager: problem, stack model explained, session arc, who it's for, founding cohort pricing, enrollment CTA
- Stripe integration

**Output:** `projects/manager-forge/presell/` (landing page, email sequences, BOL episode list)

---

## Phase 5: Cohort 1 Delivery (Jul 13 – Aug 24)

**Goal:** Run a great program. Collect proof.

- 6 weekly live sessions
- Active community facilitation
- Testimonials gathered mid-way and end
- Session recordings → Foundations library for Cohort 2
- Cohort 1 retro → update architecture before Cohort 2 opens

---

## Open Questions (Decide in Phase 1 or 2)

- [ ] Platform: Skool/Stripe/Zoom stack or Maven?
- [ ] Final pricing: $795 / $995 / $1,295?
- [ ] Cohort size: cap at 12 or leave open?
- [ ] Live session day/time (depends on Andrew's calendar)
- [ ] Do we offer a payment plan for the founding cohort?
- [ ] Domain: managerforge.com or keep on existing domain?
