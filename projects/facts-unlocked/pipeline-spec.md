---
id: DOC-009
created: 2026-04-07
updated: 2026-04-10
type: knowledge
domain: facts-unlocked
source_intake: Direct from Andrew — pipeline spec written for agent consumption
audience: personal
depends-on: [DOC-018]
status: active
synced-to: []
---

# Facts Unlocked — Pipeline Spec

An autonomous content factory that produces short-form fact videos across 4 themed channels, posts them to YouTube/Instagram/TikTok 3x/day each, measures performance, and self-optimizes using an analytics feedback loop.

## Channels

| Slug | Theme | Platforms |
|------|-------|-----------|
| baby-facts-unlocked | Pregnancy, newborns, development | TikTok + YouTube + Instagram |
| money-facts-unlocked | Finance, economics, wealth | YouTube + Instagram |
| ai-facts-unlocked | AI, future tech | YouTube + Instagram |
| viral-facts-unlocked | Trending topics | All |

Config lives in `DonatoSkills/projects.json` — each channel has its own Zernio account IDs, TTS voice, image style, content pillars, and tone rotation.

## The Loop

```
PLAN → CREATE → UPLOAD → SCHEDULE → PUBLISH → MEASURE → LEARN → repeat
```

### 1. Plan (Content Engine)
- Reads `projects.json` for channel config
- If analytics briefs exist, uses them (brief-driven mode — exploit winning patterns)
- Otherwise, plans from content pillars with tone rotation
- Outputs `calendar.json` with status tracking: `pending → creating → created → uploading → uploaded → scheduling → scheduled`
- Every item tagged with structural variables: `hook_type`, `video_length`, `voice_pace`, `text_overlay`, `background_type`, `music_energy`, `cta_style`

### 2. Create (Remotion Video)
- React-based video-as-code (Remotion framework)
- Each video is standalone: `videos/NNN-slug/src/Video.tsx`
- Structure: Hook scene (1-3s) → Body scenes (10-25s) → CTA scene (2-5s)
- Visual modes: text-only animations, AI-generated backgrounds (Gemini/OpenAI) with Ken Burns zoom/pan, or user assets
- TTS: ElevenLabs (primary), Grok, or Gemini — always re-encode as PCM WAV before Remotion
- Karaoke-style word-by-word captions synced to voiceover
- Output: MP4 at 1080x1920 (shorts) or 1920x1080 (longform)
- Image cache reuses generated images up to 5x to reduce API costs

### 3. Upload → Schedule (Social Media)
- Upload MP4 to Cloudinary → get public URL
- Schedule via Zernio REST API
- Critical rules: never use PUT to update posts (resets to draft), never use `publishNow` as fallback, always GET /posts first to dedup

### 4. Measure & Learn (Analytics Loop)
Runs every 48h, 5 phases:
- **Collect:** Pull metrics from Zernio (48-72h collection window)
- **Score:** `engagement_density = (shares×4 + saves×3 + comments×2 + likes×1) / impressions × 1000`
- **Suppress:** Flag variable values scoring <50% of average across 3+ cycles
- **Decompose:** Map winning posts back to their structural variables
- **Generate:** Create briefs with 2:1 exploit/explore split → feeds back to content engine

## Key Tech
- Remotion (React video framework)
- ElevenLabs / Grok / Gemini (TTS with fallback chain)
- Gemini / OpenAI / Grok (image generation with fallback chain)
- Cloudinary (media hosting)
- Zernio (scheduling/publishing API)
- Analytics feedback loop with engagement density scoring

## Monetization
YouTube Shorts revenue share + YouTube longform ad revenue (mid-rolls) + Instagram bonuses + TikTok Creator Fund. System optimizes for shares and saves (highest weighted metrics) because those drive algorithmic distribution.

## Repo
github.com/AndrewDonato444/facts-unlocked (shares repo with SDD framework)
