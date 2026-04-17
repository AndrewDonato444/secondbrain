# Prompt: Process New ScrollProxy Runs

Give this to your Second Brain agent (or save as a reusable command/skill it can invoke on each second-brain pass). Adjust paths and output file names to match your vault conventions.

---

## Instructions

You are processing output from ScrollProxy — a tool that scrolls Andrew's X feed every 6 hours and writes a ruthless editorial summary. Your job is to turn each new run into usable knowledge in his vault.

### 1. Find new runs

Look in: `~/SecondBrain/projects/scrollproxy/runs/`

Each subdirectory is one run, named with an ISO-like timestamp (e.g. `2026-04-17T12-07-42Z`). Each run contains:
- `summary.md` — human-readable editorial summary (themes, worth-clicking, voices, noise)
- `summary.json` — structured version of the same
- `raw.json` — every extracted post (archive, use for deep-dives only)

Track which runs you've processed in: `~/SecondBrain/projects/scrollproxy/.processed.json`

Format:
```json
{
  "processed": ["2026-04-17T12-07-42Z", "2026-04-17T18-00-00Z"]
}
```

If the file doesn't exist, create it. On each pass, process only runs NOT already in that list.

### 2. For each new run, do the following

**a. Extract the "worth clicking" items into Andrew's reading queue.**

Append to `~/SecondBrain/projects/scrollproxy/reading-queue.md`:
```markdown
## {run timestamp, human readable}

- [ ] [@handle](url) — the one-liner justification from the summary
- [ ] [@handle](url) — ...
```

Don't re-add items that are already in the queue (match by URL).

**b. Update the rolling themes tracker.**

Append/update `~/SecondBrain/projects/scrollproxy/themes.md`:
- Each row is a theme with a `first seen`, `last seen`, and `times seen` count
- If a theme from this run matches an existing theme (exact match or close paraphrase), increment the count and update `last seen`
- If new, add a row

**c. Update the voices-to-watch registry.**

Append/update `~/SecondBrain/projects/scrollproxy/voices.md`:
- One entry per @handle called out in the "Voices" section
- Include the justification from the run. If the same handle appears again later with a different justification, append the new note with a date.

**d. If the verdict is "noise", skip steps a-c and just log the timestamp + verdict in `~/SecondBrain/projects/scrollproxy/noise-runs.md`.** Noisy runs don't pollute the queue.

### 3. Mark the run processed

Add its timestamp to `.processed.json`.

### 4. Report what you did

Output a short summary at the end:
```
Processed 2 runs:
  - 2026-04-17T12-07-42Z (mixed, 10 new reading items)
  - 2026-04-17T18-00-00Z (signal, 6 new reading items, 2 new voices)

Total unprocessed before this run: 2
Reading queue now has 47 unchecked items.
```

---

## Boundaries

- **Read only** from `~/SecondBrain/projects/scrollproxy/runs/`. Never modify ScrollProxy's output files.
- **Don't fetch URLs.** Andrew clicks through himself — that's the point of the queue.
- **Don't summarize the summaries.** The summary IS the curation. Your job is to route it into the right vault files, not to re-editorialize.
- **Respect Andrew's interests.** If you notice the ScrollProxy summaries drifting away from his stated interests (AI product strategy, distribution/indie dev, sales enablement, sports betting analytics) over multiple runs, flag it in `~/SecondBrain/projects/scrollproxy/observations.md` rather than silently filtering.
