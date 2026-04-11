---
captured: 2026-04-08
source: article
url: https://claude.com/blog/claude-managed-agents
status: processed
tags: [claude-api, managed-agents, multi-agent, orchestration, anthropic, msa-relevant]
---

# Claude Managed Agents — Production Agent Infrastructure

Andrew shared with note: "I want to explore it for the work we are doing for modern signal advisory. This could be huge if we can optimize the orchestration of our agents."

**Raw link:** https://claude.com/blog/claude-managed-agents

## What It Is

Announced April 8, 2026. Cloud-hosted APIs from Anthropic for building and deploying production agents without managing infrastructure. Handles secure sandboxing, authentication, tool execution, orchestration, context management, and error recovery.

## Key Details
- **Long-running sessions:** Agents persist through disconnections, can run autonomously
- **Multi-agent coordination:** Research preview — agents can delegate work to other agents
- **Self-evaluation:** Agents iterate until success criteria are met
- **Performance:** Up to 10-point improvement in task success rates on structured file generation vs standard prompting loops, larger gains on harder problems
- **Tracing:** End-to-end execution tracing built into Claude Console
- **Availability:** Public beta now, multi-agent coordination in research preview (request access)

## Adopters
- Notion: parallel task execution agents for code/content
- Rakuten: enterprise agents across departments, one week per agent deployment
- Asana: AI Teammates as collaborative agents
- Vibecode: 10x faster prompt-to-app
- Sentry: debugging + patch generation
