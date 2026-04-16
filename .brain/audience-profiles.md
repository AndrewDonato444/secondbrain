# Audience Profiles & Derivation Rules

> When deriving artifacts from knowledge documents, use these profiles to determine what to include, exclude, and how to adjust tone. Read the source document(s) first, then filter through the target audience's lens.

---

## LinkedIn / Public

**Who:** LinkedIn connections, potential followers, industry peers, anyone who encounters Andrew's public content
**Focus:** Building in public, sales-AI convergence, thought leadership, tools & discoveries
**Tone:** Conversational, authentic, slightly provocative. First-person. Short paragraphs. End with a question or hot take.
**Brand voice:** "Building Out Loud" — things I'm learning that might help you
**Content pillars:** (from series-overview.md)
- Things I learned the hard way — sales lessons, management lessons, career lessons
- Tools that actually changed how I work — honest recs, not hype
- How to think about [X] — mental models, better questions, reframes
- What I'm watching — trends and shifts worth paying attention to

**What this is NOT:**
- Not a pitch for Andrew's projects (don't name MSA or specific products)
- Not an AI hype channel — AI comes up naturally when relevant, not as the thesis of every post
- Not "look how smart I am" — it's "here's something useful, maybe it helps you too"

**Include:**
- Personal stories and lessons learned
- Sales leadership insights from 17+ years
- Tools and techniques that genuinely changed how he works (Wispr Flow, etc.)
- Frameworks anyone can use (four emotional states, coaching decomposition, etc.)
- Current events explained simply (Mythos/Glasswing, etc.)
- Concrete numbers when they tell a story (ARR growth, team results)

**Exclude:**
- Specific project names (MSA, SignalPrep, Facts Unlocked) — not yet
- Salary, compensation details, debt situation
- TrackForce internal data, customer names, pipeline numbers
- Negative comments about current/past employers
- Private career search details (which companies, interview stages)
- Family details beyond what Andrew has publicly shared
- Pricing internals for MSA

---

## MSA Clients (Luxury Real Estate Brokers)

**Who:** High-end real estate agents/brokers who are potential or current MSA subscribers
**Focus:** Intelligence advantage, competitive differentiation, ROI, "most prepared advisor wins"
**Tone:** Professional but warm. Peer-to-peer, advisor-to-advisor. Confident without being salesy. Data-informed.
**Positioning:** MSA makes brokers look like the smartest person in the room

**Include:**
- Market data capabilities and what they reveal
- How Signal Report / Studio / Forecast / Voice work *for the broker*
- Competitive differentiation stories
- ROI framing — what $1k/month buys in terms of advantage
- Social proof when available
- The "advisor vs salesperson" narrative

**Exclude:**
- Technical architecture (Next.js, Supabase, Drizzle, etc.)
- Pricing internals, cost structure, margin details
- Product roadmap beyond current capabilities
- Andrew's personal brand or career context
- Anything about the referral tier mechanics (internal strategy)

---

## Employers / Recruiters

**Who:** Hiring managers, recruiters, HR at AI-adjacent companies Andrew is targeting
**Focus:** Track record at scale, AI fluency, leadership capability, builder mentality
**Tone:** Executive, results-oriented. Show don't tell. Metrics-forward.

**Include:**
- Revenue growth metrics ($12M→$30M Emburse, $6M→$13M Blumira, etc.)
- Team leadership scale and outcomes
- Presidents Club honors
- AI tool building as evidence of technical fluency (MSA platform, SDD framework, Facts Unlocked pipeline)
- GTM buildout experience (channel, MSP, partner, direct)
- P&L management experience
- Cross-functional leadership examples

**Exclude:**
- Side project revenue or monetization details
- Frustrations with current/past employers
- Debt situation or financial pressure
- The $15k/month escape velocity framing
- Negative framing of W-2 dependence
- Specific details about active job applications at other companies

---

## TrackForce Leadership

**Who:** Andrew's manager, VP/C-suite at TrackForce, RevOps, cross-functional peers
**Focus:** Pipeline execution, rep performance, process improvements, AI-driven efficiency gains
**Tone:** Direct, data-backed, operational. Action-oriented. Show results and next steps.

**Include:**
- Quota attainment and pipeline health
- Rep coaching patterns and improvements
- Process improvements that drive efficiency
- AI tools adopted for work (if applicable)
- Cross-functional collaboration outcomes
- Forecasting accuracy and methodology

**Exclude:**
- Career search activity
- Side projects (MSA, Facts Unlocked, Building Out Loud)
- Personal financial goals
- Opinions about company strategy changes
- Anything that signals "one foot out the door"

---

## Personal / Private

**Who:** Andrew only (and his Second Brain system)
**Focus:** Full picture — unfiltered assessment of everything
**Tone:** Honest, direct, no PR filter
**Include:** Everything — this is the default audience for all brain content
**Exclude:** Nothing

---

## How to Derive an Artifact

1. Read the source knowledge document(s)
2. Identify the target audience from the list above
3. Apply the **Include** filter — pull only what's relevant for this audience
4. Apply the **Exclude** filter — strip anything that shouldn't reach this audience
5. Transform the **Tone** — rewrite in the audience's expected voice
6. Add `type: artifact`, `audience: [target]`, and `derived-from: [source IDs]` to frontmatter
7. Register in `.brain/artifact-registry.md`
8. Add to `.brain/knowledge-graph.md` with `derived-from` relationship
