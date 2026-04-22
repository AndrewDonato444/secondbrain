---
feature: Informative Telegram Digest
domain: scrollproxy
source: projects/scrollproxy/morning-routine-prompt.md
tests: []
components: []
design_refs: []
status: stub
created: 2026-04-22
updated: 2026-04-22
---

# Feature: Informative Telegram Digest

The morning Telegram digest should surface *what happened in the world* before it lists what the agent did. The current format leads with procedural counts (N done, M pending) that tell Andrew nothing about the actual signal — the debates, voices, and themes that drove those actions.

**Source file:** `projects/scrollproxy/morning-routine-prompt.md` — Section 7 only.

---

## Feature: Informative Telegram Digest

### Scenario: Standard morning with signal and pending decisions

Given the morning routine has processed new runs
And the surfacing file contains active project hits, interest pulse hits, and live debates
And there are tier-2 decisions pending
When the Telegram digest is sent
Then the message opens with a "Worth your coffee" block
And that block contains 4-6 of the strongest signal items from active project hits and interest pulse hits
And each signal item includes voice attribution (e.g. @simonw) and a one-line why-it-matters
And the message includes a "Tensions" block listing each live debate as a one-line question
And the procedural summary (Done N / Your call M) appears AFTER the signal content, compressed to one line each
And the full surfacing file link appears at the bottom
And the total message length does not exceed 4096 characters

### Scenario: Clean day — signal present but no tier-2 decisions needed

Given the morning routine has processed new runs
And the surfacing file contains active project hits or pulse hits
But no tier-2 decisions are pending
When the Telegram digest is sent
Then the "Worth your coffee" block is present
And the "Your call" line reads "Your call (0): all clear"
And the done count is still included

### Scenario: Quiet day — only noise, no meaningful signal

Given the morning routine has processed new runs
And all runs returned noise or low-signal items
And no active project hits or pulse hits were generated
When the Telegram digest is sent
Then the "Worth your coffee" block is replaced with a single line: "Quiet day — nothing routed."
And the noise count is included in the procedural line
And the message is kept short (no filler sections)

### Scenario: No new runs since last cycle

Given no new run directories exist that aren't in .processed.json
When the Telegram digest is sent
Then the message reads only:
  "🧠 ScrollProxy — {date}\n\nNo new runs since last cycle."
And no "Worth your coffee" or "Tensions" blocks are included

### Scenario: Re-run on same calendar day

Given today's surfacing file already exists
And new runs were processed in this re-run
When the Telegram digest is sent
Then the digest includes only signal from the new runs processed in this re-run
And the message header notes the re-run time: "ScrollProxy — {date} (re-run {HH:MM ET})"

### Scenario: Routine failed mid-way

Given the routine encountered an error during processing
When the fallback Telegram message is sent
Then the message leads with the step that failed and the error
And the message does NOT attempt to include signal or tensions
And the full log file path is referenced

### Scenario: Signal block would exceed Telegram character limit

Given the surfacing file contains many signal items and long debate descriptions
When the digest is being composed
Then the agent trims the "Worth your coffee" block to the top 4 items only
And truncates each item to fit within the 4096 character ceiling
And never truncates the "Your call" block (decisions are higher priority than signal)

---

## Message Format Mockup

### Standard day

```
🧠 *ScrollProxy — 2026-04-22*

*Worth your coffee:*
• Anthropic yanked Claude Code from Pro plan, backlash, reverted in <24h.
  simonw: "strategically incoherent." PLG lesson: cheapest tier IS
  the product for power users. (@simonw)
• PM → builder is converging. LinkedIn/Anthropic/Rippling now require
  PMs to ship prototypes. Extends your thesis into product itself.
  (@aakashgupta)

*Tensions:*
• Claude Code pricing — intentional test or internal fumble?
• $60B for a code editor — strategic infra or peak bubble?

Done (9): 4 runs · 20 queue · 2 BOL · 1 convergence · 1 writing
Your call (1): 3 pending from 4/20

[Full surfacing →](https://github.com/AndrewDonato444/secondbrain/blob/main/projects/scrollproxy/surfacings/2026-04-22.md)
```

### Quiet day

```
🧠 *ScrollProxy — 2026-04-22*

Quiet day — nothing routed.

Done: 2 runs processed · 47 noise filtered
Your call (0): all clear

[Full surfacing →](...)
```

### No new runs

```
🧠 *ScrollProxy — 2026-04-22*

No new runs since last cycle.
```

---

## Constraints

- Total message ≤ 4096 characters (Telegram hard limit)
- "Worth your coffee" block: 4-6 items max, each ≤ 2 lines
- Every signal item requires voice attribution
- "Tensions" block: 1 line per debate, question framing only
- Procedural counts compress to a single line using `·` separator
- Signal and tensions come BEFORE procedural counts — always

---

## Learnings

<!-- Filled in post-implementation via /compound -->
