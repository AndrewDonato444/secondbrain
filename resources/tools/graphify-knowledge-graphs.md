---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-graphify-knowledge-graphs.md
connections:
  - "[Second Brain Schema](../../schema.md)"
  - "[SDD Framework](./sdd-framework.md)"
  - "[MSA Product Overview](../../projects/modern-signal-advisory/product-overview.md)"
relevance: [second-brain, ai-frontier, modern-signal-advisory]
---

# Graphify — Knowledge Graphs from Mixed Media

github.com/safishamsi/graphify | 10.3k stars | v0.3.12 (April 2026)

Transforms folders of code, docs, papers, and images into interactive knowledge graphs. Uses AST parsing for code structure + Claude subagents for semantic analysis → merges into a NetworkX graph with community detection.

## Why This Matters to Andrew

**Second Brain — this is directly relevant.** Andrew and I talked about Karpathy's LLM wiki pattern and Andrew flagged this as people building on that idea. Graphify takes a different approach — instead of a flat wiki, it builds a *graph* of relationships with confidence-scored connections. The key insight: 71.5x fewer tokens per query vs reading raw files, because the graph precomputes the relationships.

**Potential application to Second Brain:** As the Second Brain grows, we could periodically run Graphify against the whole folder to visualize connections, find clusters we're missing, and identify "god nodes" (concepts that connect to everything). This could power the "proactive surfacing" layer — instead of just checking new intake against the profile, check it against the actual graph of connections.

**MSA codebase:** Could be useful for understanding and documenting the MSA codebase itself — especially as it grows. Run Graphify against the repo and get an interactive map of how everything connects.

**SDD Framework:** The compound learning system in SDD captures patterns in a learnings directory. Graphify could visualize how those learnings connect across projects.

## Tech Notes
- Python 3.10+, MIT license
- Works with Claude Code, Codex, OpenCode, OpenClaw, Factory Droid
- Auto-sync with watch mode and git hooks
- No external infra needed (no Neo4j etc.)
