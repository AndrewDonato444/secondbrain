---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-bloom-screen-recorder-ai.md
connections:
  - "[Facts Unlocked Pipeline](../../projects/facts-unlocked/pipeline-spec.md)"
  - "[TrackForce Coaching](../../areas/trackforce/)"
relevance: [ai-frontier, trackforce, facts-unlocked]
---

# Bloom — Open Source AI Screen Recorder

github.com/video-db/bloom | 136 stars | v2.1.0 (March 2026)

Open-source Loom alternative with an AI-first architecture. Record locally → upload to VideoDB → query transcripts and visual embeddings → let AI agents work with recordings via API.

## Why This Matters to Andrew

**TrackForce / Gong dream:** Bloom's "Record → Query → Automate" model is basically what Andrew wants to do with Gong call recordings — record sales calls, then let AI agents process them for coaching insights. If Gong API access remains elusive, Bloom + VideoDB could be an alternative path: reps record calls with Bloom, transcripts get indexed, Andrew's coaching framework gets applied automatically. Worth exploring if the Gong door stays closed.

**Vibe Bot complement:** Andrew already has a vibe bot recording office conversations. Bloom could add screen context to voice recordings — capturing what's on screen during calls, demos, or coding sessions.

**Facts Unlocked:** Less directly relevant, but the VideoDB API could be interesting for video analytics beyond what Zernio provides.

## Tech Notes
- Electron + Node.js, SQLite local, VideoDB cloud
- Claude Code integration available
- Local-first, open source, no vendor lock-in
