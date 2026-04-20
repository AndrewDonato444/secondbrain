# Andrew Donato — Living Profile

> This document is the seed of the Second Brain. Everything the system does — intake processing, connection-making, proactive surfacing — reads from this profile to understand what matters and why. This document should evolve as Andrew's life, projects, and priorities change.

Last updated: 2026-04-17

---

## Identity

- **Name:** Andrew Donato
- **Location:** East Northport, Long Island, NY
- **Email:** adonatony@gmail.com
- **Family:** Wife Liza (together ~10 years), daughter Ellie (age 6)

---

## Professional Life

### Day Job: VP of Commercial Sales, TrackForce

TrackForce builds physical security operations software — scheduling guards, managing certifications, training/enablement, back-office billing and invoicing. Andrew leads a team of ~10 sales reps across the US and Canada.

**Daily work includes:**
- Working with reps to close deals and manage pipeline
- Customer relationships and escalations
- Listening to recorded calls and coaching reps
- Forecasting and reporting to leadership
- CRM hygiene and data integrity
- Cross-functional work with RevOps, marketing, and other departments

**What he wants to improve at work:**
- Automated coaching: Dreams of getting a Gong API key to apply coaching frameworks to call transcripts instead of manually reviewing calls. This is a real automation opportunity if/when access opens up.
- General efficiency — anything that reduces repetitive management overhead.

**Relationship with the job:** He's good at it, he's done it a long time, it's not particularly hard. But it's a W-2 and he's aware of the fragility of depending on companies that "change their plan every single day." This is a job he does well while building toward something else.

**Key relationship:** Boss is Doug Dockery — also a friend and fellow builder. Doug built SAR (Sovereign Agent Runtime), a persistent AI agent with sensor fusion, memory distillation, and proactive outreach. They share a builder mindset. See `resources/people/doug-dockery.md`.

### Career Trajectory

Andrew is actively looking for a new role in a frontier/AI-adjacent industry where he can learn more and flex the skills he's been building. Long-term, the goal is self-employment.

**The $15k/month number:** This is what Andrew needs to cover mortgage, bills, savings, credit cards. That's the escape velocity figure — once side projects reliably hit that, the W-2 becomes optional.

**Debt situation:** ~$100k in debt he wants to eliminate. This is a real constraint and motivator.

**Core belief:** Product and sales are converging. The distinction between "building" and "selling" is collapsing, and Andrew is positioning himself at that intersection.

---

## Active Projects

### Modern Signal Advisory ⭐ (Primary Focus)
- **What:** Four-product intelligence platform for luxury real estate agents — Signal Report (market intelligence), Signal Studio (content generation), Signal Forecast (property scoring), and Signal Voice (voice/tone filtering). Agent-branded output; MSA stays invisible to the end client.
- **Thesis:** The most prepared advisor wins. MSA equips brokers with data, voice, and analysis layers so they become advisors to high-net-worth clients rather than just salespeople.
- **Tech:** Next.js, PostgreSQL, Supabase, Drizzle ORM, Claude API, real estate data APIs, Vercel. Mobile-first PWA for Signal Forecast.
- **Business model:** Subscription tiers (~$1,000/month target), referral program with tier acceleration. Stripe integration deferred.
- **Status:** Live at modernsignaladvisory.com, approaching beta. Working out kinks.
- **Repo:** github.com/AndrewDonato444/market-intelligence-report
- **Andrew's role:** De facto CTO — he built the entire platform
- **Why it matters:** This is the furthest-along project and the one most likely to become a real business. It combines Andrew's sales expertise with his growing technical skills. Full product details in `projects/modern-signal-advisory/product-overview.md`.

### Sales Edge Solutions (Helping a Friend)
- **What:** Full outbound automation infrastructure for Ryan's recruiting firm, Sales Edge Consulting
- **Tools:** Apollo (lead sourcing), Instantly (email sequences), AutoLinkedIn (Andrew's custom Claude + Gojiberry AI build for LinkedIn outreach — 14 automations including ICP discovery, lead enrichment, AI message generation, campaign analytics, and feedback loops)
- **Repo:** github.com/AndrewDonato444/AutoLinkedIn
- **Status:** Active. AutoLinkedIn built and shipped. Deploying for Ryan next.
- **Why it matters:** Real-world GTM work, keeps outbound skills sharp, helps a friend, and AutoLinkedIn is a showcase of Andrew's ability to build production automation tools. Full overview in `projects/sales-edge-solutions/overview.md`

### Narrative (On Shelf)
- **What:** A fresh take on online career presence — mynarrative.io
- **Status:** Built and deployed but sitting on the shelf
- **Why it matters:** A "lesson learned" project — the experience fed into everything that came after

### Manager Forge (On Shelf)
- **What:** Online asynchronous training program and community for first-time sales managers
- **Status:** On shelf due to time constraints
- **Why it matters:** This sits at the intersection of Andrew's deep sales management experience and his desire to build educational products. Could be revived when bandwidth allows.

### Facts Unlocked — AI Video Channels (Active Side Project)
- **What:** Autonomous content factory running 4 themed channels (baby facts, money, AI, viral) across YouTube/Instagram/TikTok. 3 posts/day per channel. Full pipeline: AI content planning → Remotion video generation → Cloudinary upload → Zernio scheduling → analytics feedback loop that self-optimizes using engagement density scoring.
- **Tech:** Remotion (React video), ElevenLabs/Grok/Gemini TTS, AI image generation, Cloudinary, Zernio API, custom analytics loop with 2:1 exploit/explore ratio.
- **Status:** Active, pipeline works end-to-end including the self-optimization loop. Views are modest but growing.
- **Monetization:** YouTube Shorts revenue share, longform ad revenue, Instagram bonuses, TikTok Creator Fund.
- **Repo:** github.com/AndrewDonato444/facts-unlocked (shares repo with SDD framework)
- **Why it matters:** A genuine passive income channel if views scale. Also a showcase of Andrew's ability to build complex, self-optimizing automation systems. The analytics feedback loop pattern (measure → score → suppress → decompose → generate briefs) could apply to other projects. Full spec in `projects/facts-unlocked/pipeline-spec.md`.

### Building Out Loud — Walk Series (Active, Expanding Cross-Platform)
- **What:** Morning walk videos, 3-4x/week. Andrew shares things he's learning that can help other people — no pitching products, no forced AI angles, just useful insights.
- **Positioning:** "Things I'm learning that might help you."
- **Content pillars:** Things I learned the hard way, tools that actually changed how I work, how to think about [X], what I'm watching
- **Channels:** LinkedIn (primary, 3 episodes posted Apr 9/12/13), TikTok `@building_out_loud` (new 2026-04-17), YouTube `@building_out_loud` (new 2026-04-17). IG deliberately skipped.
- **Status:** 7 ready-to-record episodes in the queue plus idea backlog. Full episode list in `projects/building-out-loud/episodes/episode master.md`
- **Distribution pivot:** The Facts Unlocked pipeline is being repositioned to serve BOL content (walk video → transcribe → pull sharpest moments → hook variants → cross-post). See `projects/facts-unlocked/pivot-distribution-multiplier.md`
- **Why it matters:** Personal brand building, career positioning, genuine audience building by helping people. Not a pitch vehicle — Andrew pivoted the series away from product pitching to pure value. Full series details in `projects/building-out-loud/series-overview.md`

### ScrollProxy (Active)
- **What:** CLI tool that pulls posts from Andrew's curated X lists via the X API v2 Owned Reads endpoints and has Claude summarize what's actually worth reading. Replaces doom scrolling with a structured markdown summary.
- **Stack:** TypeScript, X API v2 (OAuth 2.0 User Context + PKCE), Claude API. No browser, no DOM scraping.
- **Status:** Live. Producing runs every ~6 hours into `projects/scrollproxy/runs/`. Second Brain processes each run into a reading queue, themes tracker, voices registry, and daily cross-brain surfacings file.
- **Code repo:** `~/AutoScroller/` (package name `scrollproxy`)
- **Curated lists:** AI Frontier, GTM Convergence, Broad/Serendipity. Mapping to interest pulses in `projects/scrollproxy/list-curation.md`.
- **Migration history:** Pre-April-2026 used Playwright + DOM scraping; retired when X shipped Owned Reads pricing. Full history in `projects/scrollproxy/migration-2026-04-x-api.md`. Tech spec: `projects/scrollproxy/technical-spec.md`. Morning processing prompt: `projects/scrollproxy/morning-routine-prompt.md`.

### urcooked.ai (Idea — Not Yet Built)
- **What:** Fun viral web tool. Enter your job and daily tasks, get a "cooked score" for how replaceable you are by AI, plus advice on how to un-cook yourself.
- **Status:** Concept doc written. Weekend build. See `projects/urcooked-ai/concept.md`

### Misc / Exploration
- Andrew regularly picks up interesting projects — redoing websites, building tools, experimenting with new approaches
- Pattern: build something, learn from it, apply those lessons to the next thing
- "All the failures have kind of led me to what I think is probably the best thing right now"

---

## Skills & Tools

**Technical:**
- Self-taught agentic coding over the past year (Cursor, Claude, Claude Cowork)
- Can deploy tools and full platforms relatively fast
- Comfortable with: web development, API integrations, automation pipelines, LLM-based tooling
- **SDD (Spec-Driven Development):** Andrew's custom dev framework — spec-first, TDD, compound learning, overnight autonomous builds. Works with Cursor and Claude Code. Repo: AndrewDonato444/facts-unlocked. Details in `resources/tools/sdd-framework.md`

**Professional:**
- 17+ years in B2B SaaS sales leadership
- Career arc: Sales Manager → Director → Head of Sales → SVP → SVP/GM → VP (current)
- Grew ARR $12M→$30M at Emburse, $6M→$13M at Blumira, triple-digit YoY bookings growth
- Multiple Presidents Club honors (Emburse 2019, 2020, 2021)
- P&L management experience (Emburse GM role)
- GTM buildouts: channel/VAR programs, MSP strategies, partner sales, direct enterprise
- Fractional/contract leadership experience (Board Intelligence, ExpenseAnywhere)
- Domains: spend management, cybersecurity, edtech, HR tech, board governance, physical security
- Full resume in `areas/career/resume.md`

---

## Information Diet & Sources

| Source | Type | Frequency | Reliability |
|--------|------|-----------|-------------|
| X (Twitter) | AI/coding news, GitHub repos, hot takes | Daily, heavy | Hit or miss — needs filtering |
| YouTube | Tutorials, deep dives, tech content | Regular | Varies by channel |
| Friends (texts) | Recommendations, interesting links, humor | Ongoing | High trust, personal relevance |
| Sit Deck | Daily news briefing | Daily (sometimes skipped) | Curated, decent |
| Podcasts | Diverse viewpoints, current events | Regular | Varies |
| Vibe Bot | Office conversation transcripts | Passive/continuous | High — raw data |
| Work (Gong, calls) | Sales call recordings, customer conversations | Daily | High — primary source for coaching |

**The bookmark graveyard problem:** Andrew saves things and never looks at them again. The Second Brain needs to solve this by processing intake immediately — not just storing links but extracting why they matter and connecting them to active projects/interests.

---

## Interests & Worldview

**Core interests:**
- AI/LLM frontier — where things are going, what's possible next
- The convergence of product and sales
- Entrepreneurship and escaping W-2 dependence
- Building tools that make people (including himself) more effective
- New York Mets
- Current events and politics (leans conservative — fiscally conservative, non-interventionist, pragmatic rather than ideological; actively seeks diverse viewpoints)

**What motivates him:**
- Providing for his family
- Independence and self-reliance
- The craft of building things that work
- Helping friends succeed
- Learning by doing — every project teaches something for the next one

**What frustrates him:**
- Monolithic, rigid organization systems (Notion)
- Tools that require you to conform to them instead of adapting to you
- Corporate instability and dependence on employer decisions
- Wasted time on things that should be automated
- Bookmarking things and never seeing them again

---

## What the Second Brain Should Do For Andrew

1. **Intake without friction:** Accept anything — links, voice notes, texts, transcripts — and figure out what it is and why it matters
2. **Connect dots:** "This GitHub repo you saved connects to the MSA platform because..."
3. **Know his projects:** Every piece of information should be evaluated against active projects and interests
4. **Surface proactively:** Don't wait to be asked — "You haven't looked at this yet, but it's relevant to Manager Forge"
5. **Help him escape:** Track progress toward the $15k/month goal, surface opportunities, connect side-project work to income potential
6. **Improve his work:** When Gong access comes, automate coaching. Until then, help with rep management, forecasting prep, etc.
7. **Reflect him back:** Like the vibe bot interview feedback — help Andrew see his own patterns, strengths, and blind spots
8. **Evolve:** This profile and the whole system should get smarter over time as Andrew uses it
