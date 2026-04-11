---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-bloom-screen-recorder-ai.md
connections:
  - ../resources/tools/sdd-framework.md
relevance:
  - ai-frontier
  - facts-unlocked (video pipeline thinking)
  - trackforce (coaching/call review)
---

# Bloom — Open Source Agentic Screen Recorder

**Repo:** https://github.com/video-db/bloom
**Stars:** 130 | **License:** MIT | **Latest:** v2.1.0 (March 2026)

## What It Is

An open-source, local-first Loom alternative built on Electron. The differentiator: recordings are designed to be AI-ready from the start. The workflow is Record → Query → Automate.

## Key Signal

- **Local-first + AI-ready:** Records locally (no vendor lock-in), then syncs to VideoDB for AI indexing. Transcripts, visual embeddings, and metadata all become searchable.
- **Agentic layer:** Built with API and agent framework integration in mind — recordings can be queried and automated programmatically.
- **Tech:** Electron 39, Node.js, SQLite locally, VideoDB SDK for cloud processing.
- **Features:** Screen + mic + system audio capture, camera overlay, multi-monitor, built-in transcription/subtitles, shareable links.

## Why This Matters

**The pattern to watch:** This is the "make recordings AI-queryable" play. The real value isn't the screen recorder — it's the intelligence layer on top. Record a sales demo, then have an AI pull every objection the prospect raised, every feature they responded to, every moment of hesitation.

**Gong connection:** This is conceptually what Andrew wants from Gong but can't get because of API restrictions. Bloom's approach (record → transcribe → index → query → automate) is the exact pipeline. If TrackForce won't give API access to Gong, a tool like this could theoretically capture call playbacks and make them queryable independently.

**Facts Unlocked connection:** The VideoDB SDK powering Bloom's cloud side could be interesting for video content indexing — understanding what's performing and why at a visual/audio level, not just metadata.

**Product thinking:** "Your recorder should not trap your data" is the same ethos Andrew applies to his own tools. Anti-lock-in, user-owns-their-data. Good design principle to carry into MSA and other products.
