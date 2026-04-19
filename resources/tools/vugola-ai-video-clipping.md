---
id: DOC-052
created: 2026-04-16
updated: 2026-04-16
type: reference
domain: ai-frontier
audience: personal
informs: [DOC-009, DOC-010, DOC-001]
status: active
---

# Vugola AI — Video Clipping & Distribution Platform

**URL:** https://www.vugolaai.com
**Docs:** https://www.vugolaai.com/docs

---

## What It Is

AI-powered video marketing platform that transforms long-form video into short-form clips optimized for social media. Upload a video (2 min – 3 hours), get back multiple clips with AI-generated titles, virality scores, and auto-captions — then schedule them across 8 platforms.

---

## Key Features

- **Video Clipping:** Long-form → multiple short clips with AI virality scoring (0–1 scale)
- **Caption Generation:** Auto-captions in multiple styles (minimalist, highlighted, scaled, boxed), customizable colors (hex)
- **Multi-Platform Distribution:** X, Instagram, TikTok, YouTube, Facebook, LinkedIn, Threads, Bluesky
- **Aspect Ratios:** 9:16, 16:9, 1:1
- **Async Processing:** Jobs run in background, email notification on completion
- **MCP Server:** `vugola-mcp` on npm — works with Claude Code, Claude Desktop, Cursor, Cline. 7 tools for clipping, downloading, scheduling directly from AI workflows.

---

## API

- **Base URL:** `https://www.vugolaai.com/api/v1`
- **Auth:** Bearer token (prefix `vug_sk_`)
- **Rate Limits:** 5 clipping requests/min, 3 concurrent jobs max
- **Credits:** 1 credit = 1 minute of source video (`max(1, ceil(video_minutes))`)
- **Download Links:** Presigned, valid ~1 hour

---

## Pricing

Three paid tiers: Starter, Creator, Agency. Starter limits scheduling to 10 posts/month.

---

## Why This Matters for Andrew

### Facts Unlocked (DOC-009)
- Currently uses Remotion for video generation. Vugola doesn't replace that, but if Andrew ever creates longer-form content and needs to clip it down, this automates the repurposing step.
- The multi-platform scheduling (8 platforms) could simplify or replace the current Zernio scheduling pipeline.

### Building Out Loud (DOC-010)
- **This is the killer use case.** Andrew records morning walk videos for LinkedIn. Those videos could be uploaded to Vugola, auto-clipped into shorter highlights, captioned, and cross-posted to X, Threads, TikTok, Instagram — multiplying reach from one walk recording.
- Virality scoring helps pick which clips to post where.

### MCP Integration
- The MCP server means this could be wired directly into Claude Code workflows. Record → upload → clip → schedule, all from the terminal.
