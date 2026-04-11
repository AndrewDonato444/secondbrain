---
id: DOC-025
created: 2026-04-08
updated: 2026-04-10
type: knowledge
domain: ai-frontier
source_intake: inbox/2026-04-08-claude-managed-agents.md
audience: personal
informs: [DOC-007, DOC-009]
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

## Docs
Full technical docs at platform.claude.com/docs (need to review)
