---
id: DOC-039
created: 2026-04-13
updated: 2026-04-13
type: reference
domain: personal
status: active
informs: [PERSON-002, DOC-001]
---

# Gojiberry AI — Claude-Powered LinkedIn Outreach

**URL:** gojiberry.ai
**Affiliate link:** https://gojiberry.ai/?ref=andrewm7
**Cost:** Pro $99/mo (2 LinkedIn senders, unlimited campaigns, 30+ intent signals, free trial). Custom plan available for more accounts.
**What it does:** MCP connector that bridges Claude to LinkedIn for automated lead generation, enrichment, and outreach campaigns.

## How It Works

1. Connect Gojiberry as a custom MCP connector in Claude web (claude.ai → Settings → Connectors)
2. Link your LinkedIn account to Gojiberry
3. Claude finds high-intent leads via web signals → feeds them into Gojiberry → enriches profiles → generates personalized messages → launches campaigns

Claude handles the thinking (ICP matching, intent scoring, message personalization). Gojiberry handles the execution (LinkedIn connection, campaign orchestration).

## Setup (5 min)

1. Free Gojiberry account → get API key from Settings → API
2. In claude.ai (web only, not desktop app): Settings → Connectors → Add Custom → paste `https://mcp.gojiberry.ai`
3. Add API key when prompted
4. Enable per conversation via the + button → Connectors toggle

## What You Can Do

- **Find leads:** "Find 50 high-intent leads matching my ICP from the last 7 days"
- **Build lists:** "Build a list of warm leads based on recent intent signals"
- **Personalize outreach:** "Write a personalized LinkedIn message for this lead based on their intent signals"
- **Campaign reports:** "Analyze my campaigns from the last 7 days — what worked and why?"
- **Account overview:** "Give me pipeline status, top intent signals, and campaign performance"

All read AND write — Claude surfaces insights and can execute with a confirmation step.

## AutoLinkedIn (Andrew's Build)

**Repo:** github.com/AndrewDonato444/AutoLinkedIn
**Stack:** TypeScript, Anthropic SDK, Gojiberry API client
**Status:** Built and pushed (64 commits)

Andrew built a full automation layer on top of Gojiberry — not just the MCP connector, but a complete Claude-powered LinkedIn outreach system with:

**API Layer:**
- Custom Gojiberry API client (`gojiberry-client.ts`)
- Scraping Dog integration for direct LinkedIn profile scraping (replaces web search for enrichment — gets actual current profile data, not stale Google snippets)
- Rate limiter
- Error handling

**14 Automations:**
- `daily-lead-scan` — automated lead discovery
- `icp-lead-discovery` — find leads matching ICP
- `icp-refinement` — improve ICP definition over time
- `lead-enrichment` — enrich profiles with intent signals
- `message-generation` — AI-crafted personalized messages
- `message-style-optimization` — optimize message style based on results
- `warm-lead-list-builder` — build targeted warm lists
- `campaign-health-monitor` — monitor campaign health
- `campaign-performance-analytics` — analyze what's working
- `intent-type-breakdown` — break down intent signals
- `lead-quality-feedback-loop` — learn from results
- `morning-briefing` — daily pipeline summary
- `pipeline-overview-report` — full pipeline view
- `weekly-performance-report` — weekly analytics

**Scripts:** SDD build loop, overnight autonomous builds, nightly review, drift scanning

## Why This Matters for Sales Edge

Ryan's current outbound stack is Apollo + Instantly (email). This adds a LinkedIn outreach channel powered by Claude that could:
- Find recruiting leads (companies hiring sales teams, scaling orgs) via intent signals
- Personalize connection requests at scale based on real activity
- Run campaigns alongside the existing email sequences
- Give Ryan a multi-channel approach without manual LinkedIn grinding
