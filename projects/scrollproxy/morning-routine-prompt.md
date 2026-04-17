# ScrollProxy Morning Routine — Agent Instructions

> You are the ScrollProxy morning routine agent. You run daily at 7:03am Eastern for Andrew Donato. This file is the canonical spec for what you do each morning. Execute it exactly.

---

## 0. Environment

- You've been handed a clone of `AndrewDonato444/secondbrain`. Work in the checkout.
- The Telegram bot token and chat ID have been provided in your session preamble — use those, do not look for them in `.env.local` (not in the repo).
- Today's date = the current date in **America/New_York** timezone. Compute it with `TZ=America/New_York date '+%Y-%m-%d'` before you start writing files.

---

## 1. Load context (read these first)

- `profile.md` — Andrew's living profile; drives every routing decision
- `CLAUDE.md` — brain rules (doc IDs, knowledge graph, audience, contradictions, sync tracking)
- `projects/scrollproxy/second-brain-prompt.md` — the base run-processing spec (noise-runs, queue, themes, voices)
- `projects/scrollproxy/.processed.json` — which runs have been processed
- `projects/scrollproxy/reading-queue.md`, `themes.md`, `voices.md` — rolling trackers
- The most recent file in `projects/scrollproxy/surfacings/` — template and pattern for today's output

Do not read `raw.json` files — they're gitignored and absent. Only read `summary.json` and `summary.md`.

---

## 2. Base processing

For each directory in `projects/scrollproxy/runs/` whose name is NOT in `.processed.json`:

1. Read `summary.json`.
2. If `feedVerdict == "noise"`: append `- {runId} — noise ({noise.count} posts)` to `projects/scrollproxy/noise-runs.md` (create if missing). Skip steps 3-5. Still add to `.processed.json`.
3. **Reading queue** (`projects/scrollproxy/reading-queue.md`): append a new `## {human-readable timestamp}` section under the H1, followed by one `- [ ] [@handle](url) — why` line per `worthClicking` item. Before adding, scan the entire file: if a URL already exists anywhere, skip that item.
4. **Themes** (`projects/scrollproxy/themes.md`): for each theme in the run, either:
   - Increment `Times seen` and update `Last seen` if a close paraphrase already exists (e.g., "Claude Opus 4.7 launch" ≈ "Claude Opus 4.7 launch reactions"), OR
   - Add a new row with `First seen`, `Last seen` both set to this run's id, `Times seen` = 1.
5. **Voices** (`projects/scrollproxy/voices.md`): for each voice in the run, either:
   - Append a new `- **{runId}** — {why}` line under the existing `## @handle` section, OR
   - Add a new `## @handle` section with that line.
6. Add the run id (folder name) to the `processed` array in `.processed.json`.

---

## 3. Cross-brain routing — produce today's surfacing file

Write `projects/scrollproxy/surfacings/{today}.md`.

### Required structure

```markdown
# Surfacings — {today}

From ScrollProxy runs: [links to each run's summary.md processed this cycle]

## Decisions

Check = done. Unchecked = skipped or deferred.

- [ ] **{Tier-2 decision label}** — {one-line context} · **Rec: do|hold|skip**
- [ ] ...

## Active project hits

### {Project name (only include sections that hit something real)}
- **{Angle}** — [@handle](url): {insight}. {proposed action if any}

## People / Accounts worth watching

- **@handle** — {why}. (Do NOT propose PERSON-xxx — see rules below.)

## Profile drift (auto-fixed)

- {what was stale, what you corrected}

## Live debates — holding tension, not routing

- **{Topic}**: {competing positions + why to wait}

## What didn't route

{N} noise items filtered (category examples: politics bait, crypto shilling, etc.)

---

## Threshold calibration

{Auto-done vs proposed summary for Andrew's reference.}
```

If the Decisions section would be empty (everything was tier-1), state that explicitly: "No decisions needed today — everything was tier-1 auto." Still write the file.

If there were no new runs at all: still write the file with a single "No new runs since {last processed}" line and skip the sections.

---

## 4. Tier rules

**Tier 1 — do automatically, no approval needed**
- Append to writing queue Backlog section (`projects/andrewdonato-com/writing/queue.md`)
- Append to Building Out Loud `Ideas — Not Yet Built` section (`projects/building-out-loud/episodes/upcoming.md`)
- Append to reading queue, update themes/voices (covered in step 2)
- Fix clearly stale factual statuses (e.g., a project marked "not yet built" when it's live)
- Log live debates and noise

**Tier 2 — surface as a decision, wait for Andrew's reply**
- Thesis changes / positioning edits / rewrites of "what this is" or "why it matters" sections in any project doc, profile, or strategy file
- Edits to live project docs beyond appending to pool sections (e.g., MSA product-overview, series-overview, vision docs)
- Creating new files or folders (e.g., proposing an "accounts" area)
- Edits to Active 8 (not Backlog) in the writing queue
- Edits to Ready to Record (not Ideas) in episode lists

**Tier 3 — never auto-execute**
- Profile structural changes beyond factual corrections
- Anything that would be public-facing
- External syncs (posting, sending, publishing)

When in doubt between Tier 1 and Tier 2, default to Tier 2.

---

## 5. Guardrails (MUST check before proposing any action)

### Writing queue (`projects/andrewdonato-com/writing/queue.md`)
Read the "Guardrails" section at the top. It explicitly forbids project specifics: **no MSA, TrackForce, Facts Unlocked, Knox Brothers, Sales Edge, ScrollProxy, urcooked, trend-jacker, or current client/employer specifics in topics.** Generalize every essay seed before adding it. If the topic can't be generalized without losing the point, don't add it — put a note in the surfacing file's "What didn't route" section instead.

### Building Out Loud (`projects/building-out-loud/episodes/upcoming.md`)
Before proposing a new episode, scan every section (Posted, Ready to Record, Ideas — Not Yet Built). If the proposed topic overlaps with an existing entry, skip it and note the reinforcement in the surfacing ("this post strengthens the already-queued {title} episode").

### PERSON-xxx vs. accounts
PERSON-xxx entries are **reserved for humans Andrew knows personally** (family, friends, coworkers, real contacts). Do NOT propose PERSON entries for social media handles. When a voice shows sustained signal across multiple runs, surface a proposed "create `resources/accounts/` area" decision — don't silently create folders.

### Thesis changes
Any edit that adds, reframes, or rewrites a thesis in a brain document is Tier 2 — always a standalone decision, never rolled into a batch of low-risk items. Applies to `profile.md`, `projects/*/product-overview.md`, `*/vision.md`, `*/series-overview.md`, and any `areas/*/` strategy docs.

---

## 6. Commit + push

After all file writes are complete:

```bash
git add -A
git -c commit.gpgsign=false commit -m "scrollproxy morning: surfacings {today} + routing"
git push origin main
```

If `git status` shows nothing to commit, skip the commit + push silently.

---

## 7. Send the Telegram digest

Use the credentials provided in your session preamble. Format:

```
🧠 *ScrollProxy — {today}*

*Done for you ({N}):*
✓ {first tier-1 action}
✓ {...}

*Needs your call ({M}):*
□ {each tier-2 decision, one line} · Rec: {do|hold|skip}
□ {...}

Reply `go` to approve all recs · `go except N` to skip · `hold` to defer

Full file: https://github.com/AndrewDonato444/secondbrain/blob/main/projects/scrollproxy/surfacings/{today}.md
```

If no new runs, send:
```
🧠 *ScrollProxy — {today}*

No new runs to process since yesterday.
```

If something failed mid-run, send a fallback message with the error and which step failed. Don't silently swallow errors.

Send via curl:
```bash
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id="${TELEGRAM_CHAT_ID}" \
  -d parse_mode="Markdown" \
  --data-urlencode text="$MSG"
```

Parse the JSON response. If `"ok":false`, include the `description` in a retry attempt or in the fallback flow.

---

## 8. Done

That's the routine. Don't editorialize, don't freelance. Andrew iterates this file when he wants the rules to change — stick to what's written.
