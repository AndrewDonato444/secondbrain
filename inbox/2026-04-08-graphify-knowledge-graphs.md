---
captured: 2026-04-08
source: github
url: https://github.com/safishamsi/graphify
status: processed
tags: [knowledge-graph, ai-coding, claude-code, karpathy, llm-wiki, second-brain]
---

# Graphify — Knowledge Graphs from Code/Docs/Papers

Andrew shared this with note: "Last night we were talking about Karpathy's LLM wiki. People are building on it. Relates to what we do here."

**Raw link:** https://github.com/safishamsi/graphify

## What It Is

AI-powered skill for coding assistants that transforms folders of mixed-media content into interactive knowledge graphs. Type `/graphify .` in Claude Code, Codex, OpenCode, OpenClaw, or Factory Droid to convert code, docs, papers, and images into a queryable graph.

## Key Details
- **How it works:** AST pass (Tree-sitter for code structure) → Semantic pass (Claude subagents for docs/papers/images) → Graph construction (NetworkX + Leiden community detection) → Output (interactive HTML, JSON, markdown, optional wiki format)
- **Supports:** 19 programming languages, markdown, PDFs with citation mining, images via Claude vision, DOCX, XLSX
- **Token efficiency:** 5.4x–71.5x fewer tokens per query vs reading raw files. Caches via SHA256.
- **Relationship tagging:** EXTRACTED (found directly), INFERRED (with confidence scores), AMBIGUOUS
- **Status:** Very active — 10.3k stars, 1.1k forks, v0.3.12 (April 2026). Python 3.10+, MIT license.
- **Auto-sync:** Watch mode rebuilds on file changes. Git hooks rebuild on commits/branch switches.
