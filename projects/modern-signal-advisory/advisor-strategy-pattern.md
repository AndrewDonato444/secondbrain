---
created: 2026-04-09
updated: 2026-04-09
source_intake: inbox/2026-04-09-claude-advisor-strategy.md
connections:
  - claude-managed-agents-opportunity.md
  - product-overview.md
relevance:
  - modern-signal-advisory
  - ai-frontier
  - finances (cost reduction)
---

# Claude Advisor Strategy — MSA Cost Optimization Play

**Source:** @claudeai tweet, April 9, 2026 (2.9M views)

## The Pattern

Pair Opus as an **advisor** (on-demand, reviews context, sends strategic advice) with Sonnet or Haiku as the **executor** (runs every turn, handles routine work). Both share the same context window. Result: near Opus-level intelligence at a fraction of the cost.

## Architecture
```
Main Loop: Executor (Sonnet) — runs every turn
    ↓ Tool call (on-demand)
    → Advisor (Opus) — reviews shared context, sends advice
    ↓
Shared Context: conversation + tools + files
```

## Why This Matters for MSA

This directly combines with the Managed Agents opportunity filed yesterday.

**Current MSA cost problem:** Running Opus on every API call for four products (Signal Report, Studio, Forecast, Voice) at scale would be expensive. At $1,000/month subscription pricing, Claude API costs need to stay manageable per customer.

**The advisor strategy solves this:**
- **Signal Report:** Sonnet handles data gathering, formatting, routine analysis. Opus advises on the high-level market narrative and strategic insights — the part that makes the report feel like it came from a senior analyst.
- **Signal Studio:** Haiku handles first-draft content generation. Opus advises on voice/tone calibration and strategic framing — the part that makes it sound like the broker.
- **Signal Forecast:** Sonnet runs property scoring calculations. Opus advises on edge cases and market context that affect scoring.
- **Signal Voice:** This might stay Opus-heavy since voice calibration is nuanced, but even here, Sonnet could handle the filtering pass with Opus reviewing.

**Cost implication:** Could cut API costs by 60-80% while maintaining output quality. This changes the unit economics of MSA significantly.

**Combined with Managed Agents:** Use Managed Agents for orchestration infrastructure + Advisor Strategy for cost optimization within each agent. That's the full stack.

## Action Items

- [ ] Map which MSA operations need Opus-level reasoning vs. Sonnet-level execution
- [ ] Prototype advisor pattern on Signal Report generation — hardest product, biggest potential savings
- [ ] Calculate projected API cost per customer under advisor strategy vs. current approach
