---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-graphify-knowledge-graphs.md
connections:
  - ../../resources/tools/sdd-framework.md
  - bloom-ai-screen-recording.md
relevance:
  - ai-frontier
  - second-brain-system
  - modern-signal-advisory (codebase onboarding)
  - sales-product-convergence
---

# Graphify — Turn Any Folder Into a Queryable Knowledge Graph

**Repo:** https://github.com/safishamsi/graphify
**Stars:** 9.7k | **License:** MIT | **Language:** Python

## What It Is

A Claude Code / Codex skill that reads a folder of code, docs, papers, and images, then builds a knowledge graph out of it. Type `/graphify` and it extracts structure, relationships, and concepts — then gives you an interactive visualization, a JSON graph for querying, and an audit report showing god nodes, surprising connections, and suggested questions.

Born from Karpathy's LLM wiki / `/raw` folder workflow idea — this is one of the tools people are building on top of that pattern.

## How It Works

Two-pass architecture:
1. **Deterministic pass:** Tree-sitter AST parsing across 19 languages — extracts classes, functions, imports, call graphs. No LLM needed, runs locally.
2. **Semantic pass:** Parallel Claude subagents extract concepts from docs, PDFs, images. Relationships get classified as EXTRACTED (high confidence), INFERRED (with confidence score), or AMBIGUOUS (flagged for human review).

Results merge into a NetworkX graph → Leiden community detection → exports as interactive HTML (vis.js), JSON, Obsidian vault, Neo4j, or GraphML.

**Token efficiency:** 71.5x fewer tokens per query vs. reading raw files on the Karpathy repos benchmark. Persistent across sessions with SHA256 caching.

## Key Capabilities

- Handles code + docs + papers + images (multimodal)
- Honest about confidence: extracted vs. inferred vs. ambiguous
- Git hooks for auto-rebuild on commits/branch switches
- Watch mode for real-time incremental updates
- Exports to Obsidian, Neo4j, SVG, MCP server
- Zero telemetry

## Why This Matters to Andrew

**Direct Second Brain connection:** Andrew said it himself — "relates to what we do here." Graphify is solving the same problem the Second Brain solves but for code and technical knowledge: take a pile of mixed-format information, extract the structure, surface connections you didn't see, make it queryable. The difference is Graphify uses graph topology (Leiden clustering) while the Second Brain uses profile-driven relevance scoring. These approaches could complement each other.

**MSA codebase tool:** As MSA grows, graphifying the repo could be a fast way to onboard collaborators or even onboard Andrew back into code he hasn't touched in a while. The 71x token reduction means Claude can reason about the full architecture without blowing context.

**The Karpathy ecosystem:** This is part of a growing wave of tools emerging from Karpathy's LLM wiki concept. Worth tracking this space — the "make everything AI-queryable" pattern keeps showing up (Bloom for video, Graphify for code/docs, the Second Brain for personal knowledge).

**SDD connection:** Graphify's two-pass approach (deterministic extraction → semantic analysis) rhymes with SDD's spec-first philosophy. Both are about creating structured representations before doing the creative work.

**Potential experiment:** Run `/graphify` on the MSA repo and see what structure it reveals. Could surface architectural patterns or debt that aren't obvious from reading individual files.
