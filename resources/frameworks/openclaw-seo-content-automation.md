---
id: DOC-032
created: 2026-04-11
updated: 2026-04-11
type: reference
domain: ai-frontier
source_intake: /Users/andrewsrobotmachine/Downloads/OpenClaw_SEO_Guide_Professional.docx.pdf
audience: personal
depends-on: []
extends: []
informs: [DOC-009, DOC-003, DOC-001]
status: active
---

# SEO Content Automation — Complete System Guide

Adapted from the OpenClaw SEO Content Automation guide (51-page PDF). A playbook for building a fully autonomous SEO content pipeline. The system discovers trending topics, validates keywords, writes SEO-optimized articles, and publishes to WordPress — all autonomously for ~$2-5/day in API costs.

**Original source:** OpenClaw-focused guide. Adapted here for use with **Claude Code** — the prompts, scoring systems, and pipeline architecture are tool-agnostic. Where the guide says "create an OpenClaw task," substitute a Claude Code scheduled task or skill. MCP servers (fetch, filesystem) work identically.

## Why This Matters

This is a complete content automation system that parallels the Facts Unlocked pipeline pattern (DOC-009) but for written SEO content instead of video. The same core architecture applies: autonomous discovery → scoring → creation → publishing → self-optimization feedback loop.

Could be applied to:
- MSA blog content (luxury real estate SEO)
- andrewdonato.com thought leadership
- Any niche blog as a passive income channel
- Building Out Loud content repurposing

## Claude Code Implementation Notes

- **Scheduled Tasks**: Use Claude Code's `/schedule` skill or `mcp__scheduled-tasks__create_scheduled_task` to set up recurring runs (trend discovery every 6h, keyword research daily, content creation daily, publishing daily)
- **Master Orchestrator**: Can be implemented as a single scheduled task that reads system_state.json and decides which phase to run, or as separate scheduled tasks per phase
- **MCP Servers**: The `fetch` MCP server handles all API calls (Brave Search, Reddit, WordPress REST API). The `filesystem` MCP handles file read/write for state, configs, and articles
- **WebSearch/WebFetch tools**: Native Claude Code tools can substitute for Brave Search API calls if preferred
- **Skills**: Could wrap each phase as a Claude Code skill for on-demand execution

## System Architecture

**4-Phase Pipeline + Master Orchestrator:**

1. **Trend Discovery** (every 6 hours) — Searches Brave Search API + Reddit + NewsAPI for trending topics in configured niches. Scores topics on freshness, engagement, and multi-source validation. Outputs ranked topic list with keywords and content angles.

2. **Keyword Research & Validation** (daily) — Expands top topics into 15-20 keyword variations. Validates with Brave Search (volume proxy, competition via allintitle, related searches) and Reddit (post count, engagement). Scores each keyword 0-150, classifies as EXCELLENT (120+), GOOD (90-119), MEDIUM (70-89), or SKIP.

3. **Content Creation** (daily, 1-2 articles) — Deep competitor analysis of top 3 ranking articles. Gathers supporting data (stats, quotes, examples). Writes 1,500-2,500 word articles designed to beat current #1 result. Includes FAQ schema markup, internal link markers, SEO optimization checklist.

4. **Publishing Automation** (daily) — Final SEO/quality check, resolves internal links, converts markdown to HTML, publishes via WordPress REST API, submits to Google Search Console for indexing, generates social media snippets (Twitter, LinkedIn, Reddit).

**Master Orchestrator** — Ties all phases together with priority-based decision logic, state management (system_state.json), daily quotas, error handling, cost monitoring, and weekly performance reporting.

## Prerequisites (All Free Tiers)

- **Brave Search API** — 2,000 queries/month free (or use Claude Code's native WebSearch tool)
- **Reddit API** — Script app (client credentials flow)
- **WordPress/Ghost/Medium** — Application password for REST API
- **Claude Code** — With MCP server access (fetch, filesystem) and scheduled tasks capability
- Optional: NewsAPI (100 free requests/day), Google Search Console

## Key Scoring Systems

**Trend Score** (Phase 1): Brave freshness (0-100) + Reddit engagement (normalized 0-100) + News recency (0-100) + multi-source bonus (+25)

**Keyword Validation Score** (Phase 2, max 150): Search volume (max 40) + related searches (max 20) + competition level (max 30) + Reddit post count (max 20) + Reddit engagement bonus (max 10) + allintitle score (max 30)

**Content Strategy Selection** (Phase 2): comprehensive_guide, quick_tutorial, comparison_review, beginner_friendly, advanced_deep_dive, case_study, updated_2025 — chosen based on competitor landscape and Reddit demand signals.

## Advanced Strategies

1. **Topic Clusters** — Pillar article (3,000-4,000 words) + 5-10 supporting articles with internal linking
2. **Competitive Displacement** — Target outdated 2022-2023 articles with fresh "Updated for 2025" versions
3. **FAQ Snippet Optimization** — Target Google featured snippets with structured FAQ schema
4. **Multi-Format Repurposing** — Auto-generate Twitter threads, LinkedIn carousels, YouTube scripts, email newsletters from articles
5. **Backlink Outreach Automation** — Weekly prompt finds link opportunities and generates personalized outreach emails
6. **Performance-Based Optimization** — Monthly re-analysis of underperforming articles with automated update plans

## Performance Benchmarks

- Good: Validation scores avg 100+, articles ranking page 2-3 within 1 week, cost $0.15-0.30/article
- Excellent: Validation scores avg 120+, articles ranking page 1-2 within 2 weeks, cost <$0.20/article, organic traffic growing 20%+ monthly

## Claimed Results

- 47 trending topics discovered per week
- $0.18 per article in API costs
- Articles ranking on page 2 within 48 hours
- Zero manual work after initial setup

## Connection to Existing Work

The engagement density scoring pattern and self-optimization loop in this system is structurally identical to what Andrew built for Facts Unlocked (DOC-009). The key difference is the medium (written SEO content vs. short-form video) and the monetization model (organic traffic → ad revenue/affiliate vs. YouTube/TikTok creator fund).

This could also feed the MSA content strategy — luxury real estate keywords through this pipeline could drive organic traffic to modernsignaladvisory.com.
