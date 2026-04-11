---
captured: 2026-04-09
source: x-post
url: https://x.com/claudeai
status: processed
tags: [claude-api, opus, sonnet, haiku, advisor-pattern, multi-agent, cost-optimization, msa-relevant]
---

# Claude Advisor Strategy — Opus as Advisor, Sonnet/Haiku as Executor

Andrew shared a screenshot of @claudeai tweet (April 9, 2026, 2.9M views, 31k likes).

**The pattern:**
- **Executor** (Sonnet) runs the main loop, executes every turn
- **Advisor** (Opus) gets called on-demand via tool call
- Both share context (conversation + tools + files)
- Advisor reads the shared context and sends advice back to the Executor
- Result: near Opus-level intelligence at a fraction of the cost
