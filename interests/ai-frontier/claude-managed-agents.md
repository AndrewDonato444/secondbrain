---
id: DOC-025
created: 2026-04-08
updated: 2026-04-11
type: knowledge
domain: ai-frontier
source_intake: inbox/2026-04-08-claude-managed-agents.md
audience: personal
informs: [DOC-007, DOC-009, DOC-031]
status: active
synced-to: []
---

# Claude Managed Agents — Anthropic's Production Agent Platform

Announced April 8, 2026. Public beta. Multi-agent coordination in research preview.

## What It Is

Suite of composable APIs for building and deploying cloud-hosted agents. Anthropic handles sandboxing, auth, tool execution, orchestration, context management, and error recovery.

## Key Capabilities
- Long-running sessions (hours, persist through disconnections)
- Multi-agent coordination (agents spawn and direct other agents)
- Self-evaluation with iterative improvement
- Built-in tracing and analytics in Claude Console
- Scoped permissions and identity management

## Early Adopters
Notion (parallel task execution), Rakuten (enterprise agents, 1 week per deployment), Asana (AI Teammates), Vibecode (10x faster prompt-to-app), Sentry (debugging + patching)

## Broader Implications
- This is Anthropic's play for the "agents as infrastructure" layer
- Competitors will follow — OpenAI, Google will likely announce similar
- The pattern of "let the platform handle orchestration" means agent builders can focus on domain logic, not plumbing
- One week per agent deployment (Rakuten) suggests this dramatically lowers the barrier

## Relevance Beyond MSA
- **Facts Unlocked:** The content pipeline's PLAN → CREATE → UPLOAD → SCHEDULE loop could potentially run as managed agents with better error recovery and persistence
- **Second Brain:** The proactive surfacing layer we want to build could be a long-running managed agent that periodically sweeps the brain and generates insights
- **Job search:** This is frontier AI infrastructure — understanding it deeply makes Andrew more valuable in AI-adjacent roles

## Pricing (confirmed April 2026)
- Standard Claude API token rates (same as normal usage)
- $0.08 per session-hour for active runtime
- Web search: $10 per 1,000 searches
- Typical 10-minute session: a few cents
- Heavy usage: well under $100/month

## The 4 Building Blocks
1. **Agent** — instructions, model choice, available tools (the "job description")
2. **Environment** — pre-loaded workspace with software and tools (the "laptop setup")
3. **Session** — running conversation with persistent memory, can run for hours
4. **Events** — messages in/out, status updates, approval requests

## Permission System
- **Auto-run** — agent handles everything automatically
- **Approval required** — agent pauses before taking action
- Mixable per action type (e.g., auto for reads, approval for sends)

## Docs & Resources
- Full technical docs at platform.claude.com/docs (need to review)
- Non-technical deployment guide: return-my-time.kit.com/2872b904f5
- Business playbook for selling agent services: [DOC-031](../../resources/frameworks/managed-agents-service-business.md)
