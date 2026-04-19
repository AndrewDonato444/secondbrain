---
id: DOC-028
created: 2026-04-10
updated: 2026-04-10
type: knowledge
domain: personal
audience: personal
informs: [DOC-003, DOC-012]
status: active
synced-to: []
---

# Pre-Call Research Tool — Product Vision

> "This workflow alone could have been the main feature of a sales SaaS not even 1 year ago and now its just something anyone can run on Claude." — X post, April 10, 2026

That's the pitch and the risk in one sentence. The opportunity isn't the research itself — Claude can do that. The opportunity is that 95% of sales reps will never set up MCP servers, connect APIs, and write prompts. They want to paste a name and get a brief. That's the product.

---

## The Problem

Every sales rep knows they should research before a call. Almost none of them do it well. Here's what actually happens:

1. **The skip** — Rep doesn't research at all. Goes in cold. Asks questions the prospect expects them to already know. Prospect loses confidence.
2. **The Google scramble** — Rep spends 5-10 minutes Googling the company, skimming a LinkedIn profile, and arriving with surface-level context. "I see you're based in Chicago" energy.
3. **The overload** — Rep uses a tool that dumps 4 pages of company data. They skim it, retain nothing useful, and still don't know what to actually *say* on the call.

The gap isn't information — it's synthesis. Reps don't need more data. They need someone to tell them: "Here's what this company does, here's what probably keeps this person up at night, here's how to open the call, and here's the one question that will make you look like you did your homework."

That's what a good VP of Sales would tell a rep before a big call. This tool is that VP, available for every call, for every rep.

---

## The Product: SignalPrep

**One-liner:** Paste a company name or meeting link. Get a 60-second call brief that makes you the most prepared person on the call.

**Name rationale:** "Signal" connects to MSA's brand language. "Prep" is what it does. No ambiguity. If the MSA connection feels too tight, alternatives: CallReady, BriefMe, PrepSheet.

### What You Get

Input: company name, domain, LinkedIn URL, or calendar meeting link
Output: a single-page brief with 5 sections (takes 60 seconds to read)

#### The Brief

**1. Company Snapshot (10 seconds)**
- What they do (one sentence, no jargon)
- Size, funding stage, headcount range
- Industry and key market
- Recent news or changes (funding rounds, leadership changes, job postings that signal priorities)

**2. Who You're Talking To (15 seconds)**
- Name, title, how long they've been in the role
- Career trajectory (where they came from tells you what they value)
- Shared connections or background (same school, same previous employer, same city)
- LinkedIn activity signals (what they post about = what they care about)

**3. Likely Pain Points (15 seconds)**
- Based on their role + company stage + industry, here's what's probably keeping them up at night
- 3 bullet points, ranked by probability
- Each one phrased as a question the rep can ask to validate: "A lot of [role] at [stage] companies are dealing with [pain]. Is that on your radar?"

**4. Opening Play (10 seconds)**
- A suggested opening line that demonstrates prep without being creepy
- Example: "I noticed [company] just posted 6 new SDR roles — sounds like you're scaling the outbound motion. What's driving that?"
- NOT: "I saw you went to Michigan" (that's stalking, not research)

**5. The One Question (10 seconds)**
- A single high-leverage question tailored to this specific prospect
- Something that makes them think "this person gets it"
- Derived from the intersection of their company's signals and the rep's product category

#### The Anti-Brief

What the brief does NOT include:
- Stock price, revenue estimates, Wikipedia-level company history (noise)
- 4 pages of org chart (overwhelming)
- Verbatim LinkedIn bio (the rep can read that themselves)
- Competitor intel dump (save that for a different tool)

The whole thing should fit on a phone screen. If a rep can't absorb it while walking to the conference room, it's too long.

---

## How It Works (Architecture)

### The Simple Version (v1 — ship this)

```
User pastes company/person info
        ↓
Backend enriches via APIs:
  - Apollo (company data, people data, job postings)
  - Web search (recent news, press releases)
  - LinkedIn public data (career history, recent posts)
        ↓
Claude synthesizes into the 5-section brief
  - System prompt encodes "VP of Sales" coaching lens
  - Not a data dump — opinionated analysis
        ↓
Brief displayed in clean UI
  - Copy to clipboard
  - Share link
  - Download as PDF
```

### Data Sources (Priority Order)

The product must work without users having Apollo, Crustdata, or any paid enrichment tool. The data layer uses free/open sources that work for everyone. Paid enrichment is a future premium add-on, not a dependency.

1. **Company website** — Fetch and summarize the homepage, about page, careers page, leadership page. The careers page is underrated — what a company is hiring for tells you exactly what they're prioritizing. This is free, always available, and high signal.

2. **Web search** — For recent news, press releases, funding announcements, product launches, executive hires. Claude searches and extracts signal. Covers the "what's happened recently" gap that static data misses.

3. **LinkedIn (user-provided)** — User pastes a LinkedIn URL or name + company. We fetch the public profile page (no scraping behind auth). Career history, headline, recent posts if visible. If the profile is locked down, we work with what we have — the tool should degrade gracefully, not fail.

4. **Crunchbase / public databases** — Funding data, investor info, company stage. Free tier or public pages. Good for "Series B, raised $40M, investors include X" context.

5. **Job boards (Indeed, LinkedIn Jobs, company careers page)** — Active job postings tell you what the company is investing in RIGHT NOW. 10 new engineering roles = building. 5 new sales roles = scaling GTM. This is one of the highest-signal, most-overlooked data sources.

6. **SEC filings / press releases (public companies)** — If the company is public, earnings calls and 10-K filings are goldmines. Even for private companies, press releases on PR Newswire / BusinessWire are free.

**Future premium tier (not v1):** Apollo, Crunchbase Pro, ZoomInfo, or similar enrichment APIs for deeper data (direct phone, verified email, tech stack, org chart). This becomes a reason to upgrade, not a requirement to use the product.

### Tech Stack

- **Frontend:** Next.js + Tailwind (Andrew ships this fast)
- **Backend:** Next.js API routes or serverless functions
- **AI:** Claude API (Sonnet for speed, Opus advisor for quality on high-value lookups)
- **Data:** Apollo API (already have access), web search API
- **Auth:** Clerk or NextAuth (simple, fast)
- **Payments:** Stripe (simple subscription or credit-pack model)
- **Hosting:** Vercel (already using for MSA and other projects)
- **Database:** Supabase/PostgreSQL (user accounts, usage tracking, saved briefs)

### The System Prompt (This Is the Product)

The system prompt is where Andrew's 17 years of sales leadership becomes the moat. It's not "summarize this data." It's:

- Synthesize like a VP of Sales prepping a rep for a meeting
- Prioritize actionability over completeness
- Infer pain points from signals (job postings = priorities, funding = growth mode, layoffs = cost cutting)
- Generate opening lines that demonstrate prep without being weird
- The "One Question" should be genuinely insightful, not generic
- Keep everything tight — if it takes more than 60 seconds to read, cut it

This prompt is the difference between SignalPrep and a generic "company research" tool. Anyone can build the wrapper. The coaching lens is the moat.

---

## Monetization

### Pricing Model: Credit Packs + Optional Subscription

**Why not just subscription:** Sales reps have unpredictable research needs. Some weeks they have 20 calls, some weeks 3. Per-report pricing feels fair and lowers the commitment bar.

**Pricing tiers:**

| Plan | Price | Briefs | Per-Brief Cost | Target |
|------|-------|--------|----------------|--------|
| Free Trial | $0 | 5 briefs | — | Try before buy |
| Starter Pack | $19 | 10 briefs | $1.90 | Individual reps |
| Pro Pack | $39 | 30 briefs | $1.30 | Active reps |
| Team Monthly | $99/month | 100 briefs/month | $0.99 | Sales managers buying for team |
| Enterprise | Custom | Unlimited | — | Orgs with 20+ reps |

**Unit economics estimate:**
- Claude API cost per brief: ~$0.05-0.15 (Sonnet, moderate context)
- Web fetching/search cost: ~$0.02-0.05
- Total COGS per brief: ~$0.07-0.20 (no paid enrichment APIs = fat margins)
- Revenue per brief: $1.00-1.90
- **Gross margin: 85-95%**

Because the data sources are free (company websites, web search, public profiles, job boards), the unit economics are exceptional. No Apollo or Crunchbase API costs eating into margins.

### Revenue Path to Relevance

- 100 users × $39/month = $3,900/month
- 300 users × $39/month = $11,700/month
- 100 users on Team plan = $9,900/month

This isn't a $15k/month escape velocity play on its own (unless it really takes off), but it's a meaningful revenue stream that runs itself. Combined with MSA and Facts Unlocked, it contributes to the portfolio.

---

## Build Plan

### Week 1: Core Product (MVP)

**Day 1-2: Data Pipeline**
- Website fetcher (homepage, about, careers page, leadership page)
- Web search integration for recent news, funding, press releases
- LinkedIn public profile parser (from URL)
- Job postings aggregator (careers page + job board search)
- Raw data assembly function that collects everything for one company/person

**Day 3-4: The Brain**
- System prompt engineering — the VP of Sales coaching lens
- Claude API integration with the 5-section brief format
- Input parsing (handle company names, domains, LinkedIn URLs, meeting links)
- Output formatting (clean markdown → rendered HTML)

**Day 5: Frontend**
- Landing page with value prop
- Simple input form (paste and go)
- Brief display page (clean, mobile-friendly)
- Copy/share/download actions

**Day 6-7: Auth + Payments**
- Clerk auth (email + Google)
- Stripe integration (credit packs)
- Usage tracking (briefs generated, credits remaining)
- Free trial flow (5 briefs, no card required)

### Week 2: Polish + Launch

**Day 8-9: Quality**
- Test with real companies Andrew has actually sold to
- Tune the system prompt based on output quality
- Add error handling (company not found, person not in Apollo, etc.)
- Rate limiting and abuse prevention

**Day 10: Launch Prep**
- Deploy to Vercel
- Set up domain (signalprep.com or similar)
- Write launch post for LinkedIn (Building Out Loud content!)
- Record a demo video showing a real brief being generated

**Day 11: Ship It**
- Push live
- LinkedIn post
- Share with Ryan (Sales Edge — he'd use this immediately)
- Share with TrackForce team as a test

---

## Future (Only If Traction) — Don't Build These Yet

These are ideas to revisit ONLY if the core product gets paying users. Do not scope creep.

- **Calendar integration** — Connect Google Calendar, auto-generate briefs for all meetings each morning, deliver via email or Slack
- **CRM integration** — Pull meeting context from Salesforce/HubSpot, push brief notes back after the call
- **Team dashboard** — Manager view showing which reps are prepping and which aren't
- **Call follow-up** — After the call, paste the transcript and get a follow-up email draft that references what was discussed
- **Custom coaching lens** — Let sales managers configure what "good prep" looks like for their team (different industries, different sales motions)
- **API access** — Let other tools call SignalPrep as a service

---

## Why This Wins

1. **Speed** — 60-second brief vs. 10 minutes of Googling. The ROI math is trivial.
2. **Synthesis, not data** — Every other tool gives you information. This gives you a game plan.
3. **The coaching lens** — Built by someone who's reviewed thousands of sales calls and knows what reps actually need to hear before a meeting. Not built by an engineer who thinks reps need a 4-page dossier.
4. **Low maintenance** — No data to maintain. No content to update. Claude + APIs do the work. Andrew monitors usage and collects revenue.
5. **Building Out Loud content** — The build process itself becomes LinkedIn content. The product launch becomes a case study. The product sells the personal brand and the personal brand sells the product.

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| "Anyone can build this with Claude" | Medium | True, but 95% won't. The prompt engineering + UX + sales lens is the product. Also: most reps aren't technical enough to set up MCP. |
| Data quality without paid APIs | Medium | Free sources (website, news, job postings, public LinkedIn) cover 80% of what reps need. The synthesis is the value, not the raw data. Premium enrichment can be a paid add-on later. |
| LinkedIn data access | Medium | Only parse public profile pages from URLs users provide. No scraping behind auth. Degrade gracefully if profile is locked. |
| Competes with free Claude usage | Low | Competing with "do it yourself" is like a restaurant competing with home cooking. Convenience wins. |
| Scope creep into MSA | Low | SignalPrep is industry-agnostic. MSA is luxury real estate. Different products, different buyers. Share the "Signal" brand if useful, keep them separate otherwise. |
| Distraction from MSA | Medium | This is a 2-week build, not a 6-month platform. Ship it, let it run, go back to MSA. If it doesn't get traction in 30 days, shelf it. |

---

## Connection to Andrew's Ecosystem

- **Building Out Loud content** — Build it live on camera. Episode: "I'm turning a tweet into a product." The meta-narrative IS the marketing.
- **MSA** — Shares the "Signal" brand language. If SignalPrep works, it validates that "intelligence prep" is something people pay for — which is MSA's entire thesis.
- **TrackForce** — Andrew's own team can be the beta testers. Real feedback from real reps.
- **Sales Edge (Ryan)** — Ryan's recruiting firm does outbound. He'd use this for prospect research before recruiter calls.
- **Manager Forge** — If SignalPrep works, "how to prep for sales calls" becomes a module in the future Manager Forge curriculum.
- **Career positioning** — "I built a SaaS product in 2 weeks that's generating revenue" is a powerful interview talking point for AI-adjacent roles.
