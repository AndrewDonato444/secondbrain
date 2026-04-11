---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-claude-managed-agents.md
connections:
  - "[MSA Product Overview](./product-overview.md)"
  - "[MSA Sales Strategy](./sales-strategy.md)"
  - "[SDD Framework](../../resources/tools/sdd-framework.md)"
relevance: [modern-signal-advisory, ai-frontier]
---

# Claude Managed Agents → MSA Opportunity

Announced April 8, 2026. This could fundamentally change how MSA's agent pipeline works.

## What MSA Does Now

MSA runs multiple specialized AI agents to produce intelligence reports:
- Data Collector agent
- Insight Generator agent  
- Competitive Analyst agent
- (plus others for Signal Studio, Signal Voice, Signal Forecast)

All of this orchestration — spawning agents, managing context between them, error handling, retrying failures, synthesizing outputs — is custom code Andrew built and maintains.

## What Managed Agents Changes

Anthropic is now offering production infrastructure that handles:
- **Secure sandboxing** — no more managing agent execution environments
- **Long-running sessions** — agents persist through disconnections, run autonomously for hours
- **Multi-agent coordination (research preview)** — agents can spin up and direct other agents to parallelize complex work
- **Self-evaluation** — agents iterate until success criteria are met (up to 10-point improvement in task success)
- **Built-in tracing** — end-to-end execution tracing in Claude Console
- **Scoped permissions** — identity management for system access

## Why This Is Huge for MSA

1. **The orchestration layer could be offloaded.** Instead of Andrew maintaining custom agent orchestration code, MSA could use Managed Agents to handle the Data Collector → Insight Generator → Competitive Analyst pipeline. Anthropic handles the infra, MSA focuses on the prompts and business logic.

2. **Multi-agent coordination is exactly MSA's architecture.** MSA's report generation is multiple specialized agents working in parallel and synthesizing. That's the core use case for multi-agent coordination.

3. **Self-evaluation improves report quality.** If the Insight Generator can self-evaluate and iterate before passing to the next stage, report quality goes up without additional code.

4. **Long-running sessions enable richer reports.** Agents that can run for hours without dropping means MSA could generate deeper, more thorough intelligence reports — more data sources, more analysis passes, more synthesis.

5. **Reduced maintenance burden.** Andrew is a one-person CTO. Every piece of infrastructure he doesn't have to maintain is time he can spend on the product itself.

6. **Signal Forecast could get faster.** The sub-90-second target for property scoring might benefit from agents that are already warm and persistent vs. cold-starting each request.

## Immediate Actions

- ~~**Request access to multi-agent coordination research preview**~~ — DONE (applied April 8, 2026)
- **Read the full docs at platform.claude.com/docs** — understand pricing, limitations, API surface
- **Evaluate migration path** — which MSA agents could move to Managed Agents first? Signal Report's pipeline is the obvious candidate.
- **Pricing analysis** — need to understand cost implications vs. current approach before committing

## Risk / Watch Out For

- Pricing not yet disclosed — could be expensive at scale
- Research preview means multi-agent coordination isn't production-ready yet
- Vendor dependency deepens — MSA already depends on Claude API, this makes it more so
- Need to understand latency implications for Signal Forecast's sub-90-second target
