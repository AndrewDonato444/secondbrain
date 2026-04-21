# Manager-Forge — Ideal Customer Profile (ICP)

**Status:** In Progress (Interview started 2026-02-18)
**Last Updated:** 2026-02-18

---

## Target Learner Profile

*(Building out via interview — answers below)*

### Who Are They?

- Early-career sales manager (just promoted or 0-12 months in role)
- Someone who hit a roadblock creating a repeatable management system
- Was a successful individual contributor (rep) — now struggling with the transition to leading people
- Used to personal success as a rep; now has to create success *through* others
- Core value prop: Without a system like this, the only path to learning is failing — and the current macro environment doesn't leave room for failure, especially in leadership

### How Did They Become a Manager?

**Path 1 (Most Common):** Promoted from within
- Top-performing IC who showed leadership qualities → promoted to manage at the same company
- This is the dominant path right now — companies aren't taking risks on first-time external hires for management

**Path 2 (Less Common):** External hire as first-time manager
- Was a strong IC at Company A, got hired as a manager at Company B
- Much harder in current market — companies prefer promoting from within

**Path 3 (Less Common):** Team Lead / Senior AE track
- Was a team lead, senior AE, or in a coaching/onboarding role
- Natural next step into formal management
- Less common these days but still a path

### Industry / Vertical

**Primary (fastest adoption):** Tech / SaaS / Software companies (inside or outside sales)
**But broadly applicable to any sales floor:**
- Insurance
- Real estate
- Physical products
- Automotive
- Any industry where someone runs a sales team

Industry-agnostic in principle, but tech/SaaS will latch on first due to culture of learning & development


### Company Size & Type

- **Company size doesn't matter** — we're targeting the individual, not the company
- **Team size matters more** (but hard to measure from outside) — they're managing a sales team
- Small, mid-size, and large companies all fair game
- **Avoid:** Super enterprise (different buying dynamics, different management structures)
- We are NOT marketing to companies — we are marketing to individuals

### Pain Points & Triggers

**The macro pain:** Inbound is down, market is in transition, top of funnel has dried up or become very thin. Every deal matters more than ever, and there's no room for management mistakes.

**Specific day-to-day pains:**
1. **Driving consistent results** — ending the roller coaster (good month/bad month/good month/bad month)
2. **Pipeline anxiety** — where is pipeline going to come from? How to keep teams generating pipeline?
3. **Low pipeline coverage** — sitting at 1.5-2x when they need 4x (especially in software)
4. **Jumping in to close deals** — having to rescue deals for reps because every opportunity is precious
5. **Keeping teams motivated** — how to keep reps generating activity when inbound has dried up
6. **Quiet quitting / retention** — can I keep my top reps? Can I keep them happy and motivated?
7. **Getting deals to close** — deals in pipeline are stalling, reps struggling to advance them
8. **Data cleanliness** — can't trust what they see in the CRM, can't make decisions on bad data
9. **New hire onboarding** — how to ramp new reps fast without it consuming all their time
10. **Cross-functional alignment** — what's marketing doing? What's product doing? How to translate and leverage that?
11. **Rep compensation fairness** — making sure reps are being paid fairly, internal equity issues
12. **Preventing over-involvement** — stuck firefighting instead of coaching and leading strategically

### Where to Find Them (Signals & Channels)

**Primary channels:**
- **LinkedIn** (dominant — this is where they live)
- Reddit
- Instagram
- TikTok

**Content they consume:**
- All-In Podcast
- Personal development podcasts
- Many don't have time for podcasts at all
- LinkedIn content (posts, articles, comments)

**Signal types to monitor:**
- LinkedIn title changes ("promoted to Manager" / "Sales Manager" / "Team Lead")
- Posts about management struggles, leadership challenges, pipeline anxiety
- Comments on sales leadership content
- Activity in sales/management subreddits
- Job postings for first-time sales manager roles

### Demographics & Psychographics

- **Age:** Mid-20s to mid-30s (late 20s is the sweet spot)
- **Career stage:** 0-3 years in management, most under 1 year
- **Mindset:** Growth-oriented, willing to invest in themselves, hungry to succeed
- **Gap:** Lacking options for personal/professional development specific to their situation
- **Identity:** Still think of themselves as "a rep who manages" — haven't fully made the identity shift to leader yet

### Willingness to Pay

- **High willingness** — they're motivated, underserved, and know they need help
- **Budget source:** Mix of personal spend + company L&D stipends/learning budgets
- **This is personal development** — they're investing in their career, not buying a tool for their company

**Pricing Structure:**

| Tier | Price | What They Get |
|---|---|---|
| **Standard** | $99-149/mo | 12 modules + materials + community access + weekly live call + Q&A |
| **Platinum** | $499/mo | Everything in Standard + 1-2 one-on-one coaching calls/month with Andrew |

**Core value prop beyond modules:**
- Ongoing community (post questions, get answers, peer support)
- Weekly live calls
- A place to come BACK to — not a one-and-done course
- The "you don't have to fail your way to learning" shortcut

### Decision Maker vs. Buyer

- **They ARE the decision maker** — no approval needed
- This is professional development outside their specific company role
- Direct B2C sale — they see it, they want it, they buy it
- No procurement, no VP sign-off, no committee

---

## ICP JSON (for agent use)

```json
{
  "product": "Manager-Forge",
  "type": "B2C",
  "icp": {
    "title": "First-Time Sales Manager",
    "age_range": "25-35",
    "experience": "0-12 months in management role",
    "previous_role": ["Account Executive", "Senior AE", "Team Lead", "Top-performing IC"],
    "industries_primary": ["SaaS", "Software", "Tech"],
    "industries_secondary": ["Insurance", "Real Estate", "Automotive", "Physical Products", "Any sales floor"],
    "company_size": "SMB to large (avoid super enterprise)",
    "team_size": "Managing a sales team (size varies)",
    "paths_to_role": [
      "Promoted from IC at same company (most common)",
      "Hired externally as first-time manager (less common in current market)",
      "Team lead / Senior AE track (least common)"
    ],
    "pain_points": [
      "Driving consistent results (ending good/bad month roller coaster)",
      "Pipeline generation anxiety (inbound dried up)",
      "Low pipeline coverage (1.5-2x vs needed 4x)",
      "Jumping in to close deals for reps",
      "Keeping team motivated with thin top-of-funnel",
      "Quiet quitting / retaining top reps",
      "Deals stalling in pipeline",
      "Dirty CRM data / can't trust reporting",
      "Onboarding new hires efficiently",
      "Cross-functional alignment (marketing, product)",
      "Rep compensation fairness",
      "Stuck firefighting instead of coaching"
    ],
    "buying_triggers": [
      "Just promoted to first management role",
      "Hit a wall after a few months managing",
      "Lost a top rep unexpectedly",
      "Missed quota for first time as a manager",
      "Posting on LinkedIn about management struggles",
      "Searching for sales management resources"
    ],
    "channels": {
      "primary": "LinkedIn",
      "secondary": ["Reddit", "Instagram", "TikTok"],
      "content": ["All-In Podcast", "Personal development podcasts", "LinkedIn posts/articles"]
    },
    "pricing": {
      "standard": "$99-149/mo (modules + community + weekly live call)",
      "platinum": "$499/mo (standard + 1-2 coaching calls with Andrew)"
    },
    "decision_maker": "Self (no approval needed — personal professional development)",
    "budget_source": "Personal funds and/or company L&D stipend"
  }
}
```
