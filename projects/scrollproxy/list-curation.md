---
id: DOC-068
created: 2026-04-19
updated: 2026-04-20
type: knowledge
domain: ai-frontier
status: active
depends-on: [DOC-067, DOC-034]
informs: [DOC-062, DOC-063, DOC-064]
---

# ScrollProxy — X List Curation

## Status (2026-04-20)

| List | Status | X List ID |
|------|--------|-----------|
| AI Frontier | ✅ Created | `2046177478658461928` |
| GTM Convergence | ✅ Created | `2046179139355312577` |
| Broad / Serendipity | 🟡 Placeholder — using pre-existing "Second brain accounts" list | `2046175185003286902` |
| Operators & Builders | ⏸ Deferred — voices.md too light on operator handles right now |
| Mets | ⏸ Deferred — pulse is skeleton |
| Current Events | ⏸ Deferred — pulse is skeleton |

List IDs wired into `~/scrollproxy/config.yaml` under `x.lists`. Tokens in `~/AutoScroller/.env.local`. Phase 2 cutover can now proceed once the source-layer code is built.


> The strategic deliverable of the X API migration. The new `GET /2/lists/{id}/tweets` call pulls only from explicit lists Andrew curates — there is no algorithmic home feed substitute. This file maps **what lists exist**, **who's in them**, and **which brain lens each one feeds**. Once Andrew approves and creates the lists in X, the migration's source layer is just config plumbing.

---

## The strategic shift

The Playwright version scrolled the algorithmic home feed — whoever X decided to show. That gave Andrew accidental serendipity (random handles, surprise topics) but also ad pollution, suggested-content noise, and unpredictable signal density. The API version is the inverse: 100% intentional, zero algorithmic surprise. That's a feature *if* the lists are curated well, and a bug *if* they're not.

The mitigation built into this design is the **Broad / Serendipity** list — top ~40 highest-signal handles across topics, ungrouped. That keeps cross-pollination alive without giving X's algorithm any input on what Andrew sees.

## The list map (4 themed + 1 broad + bookmarks layer)

### 1. AI Frontier
**Purpose:** Capability watch, model launches, Anthropic insiders, rigorous critics. Feeds the `interests/ai-frontier/pulse.md` lens directly.

**Initial members (from voices.md):**
- @alexalbert__ — Anthropic insider, model capability detail
- @bcherny — Anthropic product team, Claude Code internals
- @ClaudeDevs — official Anthropic dev account
- @gdb — Greg Brockman / OpenAI ground-level observations
- @simonw — rigorous empirical benchmarking
- @kimmonismus — practitioner-level model critiques
- @emollick — measured, evidence-based progress takes
- @RoundtableSpace — Arena leaderboard data
- @minchoi — vendor reliability failures with specifics
- @kloss_xyz — practical Claude Code + MCP usage data

**Tag in config:** `ai-frontier`

### 2. GTM Convergence
**Purpose:** Product strategy, distribution, AI-era go-to-market, the sales-product-marketing-RevOps boundary. Feeds the `interests/sales-product-convergence/pulse.md` lens and the `projects/linkedin-convergence/queue.md` source pool.

**Initial members:**
- @aakashgupta — AI product strategy + funding signals
- @businessbarista — enterprise knowledge layer thinking
- @gregisenberg — product opportunity gaps, agent-native dynamics
- @signulll — AI company positioning + product strategy
- @zebriez — AI-native transformation case studies
- @levie — agent-native enterprise shift, operator perspective
- @fuckgrowth — distribution strategy in the AI era
- @andrewchen — workflow time allocation, GTM patterns
- @jeff_weinstein — Stripe PM, agent payment infrastructure

**Tag in config:** `convergence`

### 3. Operators & Builders
**Purpose:** Indie operator and builder reality — what's actually working at the personal/small-team scale. Feeds `interests/entrepreneurship/pulse.md` and the convergence "Operator's Tell" archetype.

**Initial members (lighter than the others — voices.md is currently AI-frontier-heavy; this list will need active growth):**
- @GergelyOrosz — enterprise reality + power-user perspective
- @kloss_xyz — operator-level Claude Code workflows (also in ai-frontier; that's fine)
- @gregisenberg — operator angle on product gaps (also in convergence; fine)

**To watch for / actively recruit into this list (not yet in voices.md):** indie hackers, sovereign-individual voices, operators publishing real MRR/process data. Naval, Sahil, Pieter Levels, Tony Dinh, Marc Lou, etc. — names worth evaluating against voices.md's signal bar before adding.

**Tag in config:** `operators`

### 4. Broad / Serendipity
**Purpose:** Replaces the algorithmic home feed's cross-pollination function. Top ~40 highest-signal handles across all themes, ungrouped. ScrollProxy pulls fewer posts per cycle from this list (configurable cap) so it doesn't drown the themed lists, but its breadth catches things the themed lists would miss.

**Initial members:** All voices.md handles (current ~21), plus an ongoing "promote into this list when a handle hits 3+ on-target appearances in a quarter" rule.

**Tag in config:** `broad`

### 5. Bookmarks layer (not a list, but pulled the same way)
**Purpose:** Andrew's own bookmarks are a high-trust signal — anything he saved manually has already passed his filter. The summarizer should weight these higher and flag them as "you bookmarked this; here's a thread, did you want to do something with it?"

**Endpoint:** `GET /2/users/{id}/bookmarks`

**Default:** Include. Toggle in `config.yaml` if it gets too noisy.

---

## Lists deferred until pulses fill in

- **Mets** — `interests/mets/pulse.md` is a skeleton. Once Andrew fills in the Thesis + What I'm watching, we know which beat writers / players / accounts to seed a list with.
- **Current Events** — `interests/current-events/pulse.md` similar. Politically-balanced curation requires Andrew's actual source preferences before list-building.

These deliberately don't ship in v1 of the migration. Adding them later is a 5-minute config update once the underlying lists are built.

---

## Build approach

### Step 1 — Andrew confirms what already exists
**Open question:** Does Andrew already have curated X lists? If yes, list them here and we'll either reuse, rename, or merge with the proposed map above. If no, we create all four fresh.

### Step 2 — Create the lists in X
For each list in the map, create the X list (private, since these are personal curation tools). Capture the X list ID (`/2/lists/{id}` paths use this) and write it back into this doc + into `config.yaml`.

### Step 3 — Populate from voices.md
For each list, add the initial members above. ~21 voices total across the themed lists, with significant overlap (some voices belong in 2 lists — that's fine, X allows multi-list membership).

### Step 4 — Wire to config
`config.yaml` gets:

```yaml
x:
  bearerToken: ${X_BEARER_TOKEN}
  baseUrl: https://api.x.com/2
  lists:
    - id: "<id from step 2>"
      name: "AI Frontier"
      tag: "ai-frontier"
      postsPerRun: 100
    - id: "<id from step 2>"
      name: "GTM Convergence"
      tag: "convergence"
      postsPerRun: 100
    - id: "<id from step 2>"
      name: "Operators & Builders"
      tag: "operators"
      postsPerRun: 75
    - id: "<id from step 2>"
      name: "Broad / Serendipity"
      tag: "broad"
      postsPerRun: 50
  bookmarks:
    enabled: true
    postsPerRun: 25
```

### Step 5 — First pull, adapter validation
Pull from one list end-to-end, validate the API response → `ExtractedPost` adapter mapping is clean. This is the gate before Phase 2 cutover.

---

## Maintenance loop (post-migration)

The brain already has the right primitive for this — `voices.md` — and the morning routine already updates it from each ScrollProxy run. The new loop:

1. ScrollProxy run finds a new high-signal handle (current behavior — adds to voices.md)
2. Morning routine flags "new voice with N appearances in past M runs — consider adding to {list-name} list" as a Tier-2 surfacing decision
3. Andrew either approves (we add the handle to the relevant X list — could be automated via `POST /2/lists/{id}/members` if owned-write tier supports it cheaply, or manual in the X UI)
4. Next ScrollProxy run pulls from the updated list

Closes the loop: voices.md is no longer just retrospective; it actively feeds list curation, which feeds the next surfacing.

---

## Risks worth naming

- **Echo chamber risk.** Themed lists by design narrow what you see. The Broad list is the explicit mitigation — keep it healthy and weighted into the summarizer with full attention.
- **Stale list rot.** Handles go quiet, change topics, or drift in quality. Build a quarterly "list audit" reminder — sweep voices.md activity, pull anyone with no on-target appearance in 90 days.
- **Conservative-leaning current events list later.** When that list ships, the curation needs to actively span the spectrum — not just "diverse viewpoints" as an aspiration but specific handle-level balance. Worth surfacing as a Tier-2 decision when that list is built rather than auto-curating.

---

## What Andrew needs to do

1. **Answer:** Do you already have X lists, and if so, names/purposes? Determines whether we create fresh or merge.
2. **Review the proposed list map above** — kill, rename, or split any list before we create them in X.
3. **Review the initial member assignments** — anyone obviously misplaced or missing?
4. **Confirm:** ship without Mets and Current Events lists in v1 (they wait for pulse fill-in)?

Once those are answered, list creation in X is ~30 minutes and we're unblocked on Phase 1.
