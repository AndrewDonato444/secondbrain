# Baby Facts V2

A human-character video pipeline for the Baby Facts channel. Different philosophy from the existing Facts Unlocked pipeline (which uses Remotion + text/image animation).

V2 leans on **consistent AI-generated human characters** (Hedra Seedance 2.0 + Nano Banana) to produce videos that feel like real people talking to camera, not slideshow-format fact cards. The thesis: relatable parent-to-parent delivery outperforms faceless fact content in the parenting niche.

## Cadence

One video per day, or every other day, or as needed. Not a high-volume factory — a small number of quality videos. This is why we don't automate captions (see Pipeline note below).

## Pipeline

1. **Source** *(manual)* — Andrew finds a high-performing post on IG/TikTok and passes either a transcript or a video URL to the pipeline.
2. **Transcribe** — If URL: download audio (yt-dlp + ffmpeg) → Vibe (`http://127.0.0.1:52625`) → transcript. Word-level timestamps available but not needed since we skip Remotion captions.
3. **Character select** — Pick Mia or Jack (round-robin, or paired to the selected voice).
4. **Starter image** — Nano Banana via Hedra API: canonical character reference + scene prompt derived from transcript → starter image.
5. **Voice** — ElevenLabs TTS with a rotating voice from the selected character's pool → MP3.
6. **Video** — Hedra Seedance 2.0 API: starter image + audio → lip-synced MP4 (15-sec max).
7. **Hook artifact** *(LLM step)* — From the transcript, generate **two hooks** and save alongside the video:
   - `caption_hook` — text for the TikTok/IG post caption
   - `visual_hook` — short on-screen text overlay (3–7 words) Andrew will add manually in the first 1–2 seconds
   - Plus a short suggested post caption body
8. **Transcode** — H.264 (TikTok-safe, per HEVC-incompatibility note).
9. **Upload** — Cloudflare R2 bucket (`factsunlocked`) — public URL.
10. **Schedule as draft** — Push to Zernio as a TikTok draft (never API-published — TikTok dampens API-posted content). Andrew publishes from phone, adds TikTok's built-in captions + the visual hook + final post caption at publish time.

### Why no auto-captions

Remotion karaoke-style captions are finicky to sync cleanly, and at 1-video-per-day cadence it's faster for Andrew to use TikTok's native caption tool at publish time. Revisit later if volume grows or we find a clean captions API (Submagic, Captions.ai) worth wiring in.

## Output bundle

Each run produces a folder:

```
videos/YYYY-MM-DD-slug/
├── video.mp4             # final H.264 MP4 ready for upload
├── hooks.md              # caption_hook + visual_hook + suggested caption body
├── transcript.txt        # full transcript used
├── metadata.json         # character, voice, source URL, timestamps, R2 URL, Zernio draft ID
└── starter.png           # the Hedra/Nano Banana starter image (for reference/regen)
```

## Characters

- **Baby A — [Mia](characters/mia.md)** — New mom, cozy-messy living room aesthetic
- **Baby B — [Jack](characters/jack.md)** — New dad, same house universe, different rooms + male voice slots

Both characters share the same visual universe: warm neutral palette, natural window light, film grain, documentary realism. Brand consistency across rotation.

## Voices

Six voices total, 3 per character. See [voices.md](voices.md) for profiles and IDs.

## References

- [vibe-api.md](vibe-api.md) — local transcription API shape

## Environment

API keys live in `SecondBrain/.env.local`:

- `HEDRA_API_KEY` — image gen (Nano Banana) + video (Seedance 2.0)
- `ELEVENLABS_API_KEY` — TTS
- `VIBE_API_URL` — local transcription service
- `R2_*` — existing, Cloudflare R2 upload
- `ZERNIO_*` — existing, scheduler

## Status

Pipeline runner built as a Claude Code skill at [skill/](skill/). Hybrid design — Python handles plumbing, Claude handles scene-prompt + hook generation.

- [skill/SKILL.md](skill/SKILL.md) — skill definition, when to invoke, creative-step instructions
- [skill/make_video.py](skill/make_video.py) — deterministic pipeline (transcribe → Hedra/Nano Banana → ElevenLabs → Hedra/Seedance 2.0 → transcode → R2 → Zernio draft)
- [skill/setup.md](skill/setup.md) — per-machine bootstrap checklist (5-min)
- [skill/requirements.txt](skill/requirements.txt) — Python deps

### Portability

Everything except `.env.local` travels in git. On a new machine: clone → fill `.env.local` → `pip install -r skill/requirements.txt` → install `ffmpeg`/`yt-dlp` → start Vibe → symlink skill into `~/.claude/skills/` → go. See [skill/setup.md](skill/setup.md).

### First run

Waiting on a live run to validate the Hedra endpoint shapes (their API drifts). Script surfaces raw errors from Hedra so we can adjust on the fly. Paste a transcript or URL to `/baby-facts-make` and it'll run end-to-end.
