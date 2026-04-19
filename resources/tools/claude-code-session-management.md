---
id: DOC-051
created: 2026-04-16
updated: 2026-04-16
type: reference
domain: ai-frontier
source_intake: x-post-thariq-trq212-2026-04-15
audience: personal
depends-on: []
extends: []
informs: [DOC-018, DOC-001]
status: active
---

# Claude Code: Session Management & 1M Context Best Practices

**Source:** Thariq (@trq212, Anthropic), April 15, 2026 — X post / Anthropic blog

---

## Why It Matters

With the 1M token context window in Claude Code, how you handle sessions, context, and compaction directly impacts results, cost, and reliability. Poor management leads to **context rot** — performance degrades as attention spreads across more tokens and irrelevant history distracts the model.

---

## Core Concepts

- **Context Window:** Everything the model "sees" — system prompt, conversation history, every tool call + output, every file read.
- **Context Rot:** Larger context = diluted attention + distraction from old/irrelevant content.
- **Compaction (`/compact`):** Auto or manual summarization of history into a shorter description so work continues in fresh context. It's lossy — the model decides what matters. You can steer it with instructions (e.g., `/compact focus on the auth refactor, drop the test debugging`).
  - The model is at its **weakest** during compaction because of rot — proactively compact with forward-looking hints.

---

## Every Turn = Branching Decision Point

After Claude finishes a response, choose one:

| Action | What It Does |
|--------|-------------|
| **Continue** | Same session — use only if all current context is still load-bearing |
| **/rewind** (double-Esc) | Jump back to any prior message; later messages dropped. Best for corrections |
| **/clear** | Start fresh session with a brief you write — you control exactly what carries forward |
| **/compact** | Model summarizes history; continue on top of the summary |
| **Subagents** | Delegate work; subagent gets its own clean 1M context and returns only the final synthesized result |

---

## Practical Rules of Thumb

- **New task → New session (`/clear`).** 1M context supports long-running single tasks (e.g., full-stack app from scratch), but start fresh for truly new work.
- **Related tasks → Sometimes keep context** (e.g., write docs for a feature you just built) to avoid re-reading files, but weigh cost vs. freshness.
- **Rewind > "fix it" messages:** Instead of "that didn't work, try X," rewind to the point before the failed attempt and re-prompt with new learnings. Preserves early useful context (file reads) and drops failed branches.
- **Compact vs. Clear:**
  - Compact: Low effort, Claude picks what mattered.
  - Clear: More effort, but you decide → cleaner, more reliable.
- **Bad compacts** happen when the model can't predict your next direction (e.g., long debugging session → sudden switch to unrelated warning). Fix: Proactively compact or use `/clear` with a clear handoff brief.
- **Subagents shine** when a task generates lots of disposable intermediate output (codebase searches, verification, doc writing). Mental test: "Will I need the tool outputs again, or just the conclusion?"

---

## Quick Decision Table

| Situation | Tool | Why |
|-----------|------|-----|
| Same task, context still relevant | Continue | No need to rebuild anything |
| Claude went down wrong path | /rewind | Keep useful early context, drop failed attempt |
| Session bloated mid-task | /compact + hint | Low effort; steer what to keep |
| Genuinely new task | /clear | Zero rot; you control handoff |
| Next step will generate high intermediate noise | Subagent | Only final result returns to parent |

---

## Bonus

Use `/usage` to track session habits and see how they affect costs and performance.

---

## Andrew's Takeaways

- **Rewind over "fix it"** is the biggest behavioral change — stop stacking failed attempts into context.
- **Proactive compaction with hints** prevents the worst-case scenario (model compacts without knowing your next move).
- **Subagents for research/verification** — use them liberally since intermediate search noise is the #1 context bloater.
- Directly applicable to SDD workflow: long build sessions benefit from strategic `/compact` between phases (spec → test → implement).
