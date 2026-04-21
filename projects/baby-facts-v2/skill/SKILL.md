---
name: baby-facts-make
description: Produce a Baby Facts V2 video from either a transcript or a video URL. Runs the full Hedra character pipeline (starter image → ElevenLabs TTS → Hedra Seedance 2.0 video → R2 upload → Zernio TikTok draft) and hands back a bundle folder with the MP4, a hooks sidecar, and metadata. Use this skill when Andrew says "make a Baby Facts video," pastes a transcript with "run this through Baby Facts," or drops a TikTok/IG URL and asks to reproduce it.
---

# Baby Facts V2 — Video Production Skill

This skill produces one Baby Facts video end-to-end. Cadence is ~1 per day, so optimize for quality and debugability over throughput.

## Your role (Claude)

The Python script (`make_video.py`) handles all deterministic plumbing: audio download, Vibe transcription, Hedra/ElevenLabs API calls, transcode, R2 upload, Zernio draft push. **You** handle the three creative steps:

1. **Transcript compression (if needed)** — Hedra Seedance 2.0 caps at 15 seconds. Target ≤30 words of voiceover; hard cap ~38 words (sign-off included). If the input transcript is already under target, skip this step and pass through. If over, compress while preserving the core fact + surprise beat. Cut framing ("so basically," "let me tell you"), hedges, trailing CTAs, redundant setup. Match the character's register — Mia's trim stays warmer, Jack's drier. Always end on a complete sentence.

   **End with the character's signature sign-off** — fixed catchphrase that runs at the end of every video for that character. Creates algorithm-friendly pattern-match + viewer recognition.
   - **Mia:** `"Wild, right?"`
   - **Jack:** `"Weird, man."`

   Override only if a specific fact *really* demands something different — in that case flag it in the pre-production review so Andrew can approve the exception. Default behavior: always use the signature. It's part of the word budget — factor it in when compressing.
2. **Scene prompt generation** — From the (compressed) transcript, describe a single in-scene moment that the selected character would plausibly be in. Feed the character's visual universe (from `characters/{slug}.md`). Keep to 1–2 sentences, present tense, action + expression + location. No camera directions, no "same aesthetic" boilerplate — the script appends that.
3. **Hook artifact generation** — After the video produces, write a `hooks.md` into the bundle folder with three pieces (see Hook format below).

## Inputs

Single argument — auto-detected. User passes **one** of:

- **A video URL** — string starting with `http://` or `https://`. TikTok, Instagram Reel, YouTube Short all work (yt-dlp handles them). Download + transcribe via Vibe.
- **A transcript / script as text** — anything else that's short free-form text. Used directly, no transcription step.
- **A transcript file path** — argument starts with `@` (e.g. `@/tmp/transcript.txt`) → read the file.

### Detection rule (to avoid ambiguity)

1. Strip whitespace
2. Starts with `@` → treat as file path
3. Matches `^https?://` → treat as URL (transcribe step)
4. Otherwise → treat as raw transcript text

Do **not** try to detect URLs embedded within longer text. The argument must **be** a URL for URL-mode to trigger. This prevents a pasted fact like "Source: https://…, did you know…" from being misrouted.

### Optional overrides

- `--character baby-a|baby-b` — skip rotation, force character
- `--voice <slug>` — skip voice rotation, force a specific voice (e.g. `mia-2-knowing`)

Default behavior: rotate character and voice based on `state.json` in the skill dir.

## Steps (what you do when invoked)

1. **Parse input.** Detect URL vs transcript text vs transcript file path.
2. **Transcribe if needed.** If URL input: `.venv/bin/python make_video.py transcribe --url <URL>` → returns transcript to stdout. Otherwise use transcript directly.
3. **Compress to fit 15-sec video cap.** Count words in the transcript. If >30, compress to ≤30 words preserving the core fact and surprise beat. If ≤30, pass through. Show Andrew the compressed version in your update before proceeding so he can catch bad trims before the expensive API calls fire.
4. **Decide character + voice.** If user specified overrides, use them. Otherwise read `state.json` to know next in rotation — but don't mutate it yet, the script does that on successful run.
5. **Generate scene prompt.** Read `../characters/{slug}.md` for the character's setting/wardrobe baseline. Produce 1–2 sentences of the character in a plausible moment that fits the transcript's subject. Examples:
   - Transcript about night feeds → "Mia sits on the couch in the warm lamplight, bottle in one hand, looking slightly past the camera with a half-smile."
   - Transcript about car-seat struggles → "Jack leans against his garage workbench, holding a car-seat manual, eyebrow raised in mild defeat."
6. **Run production.** Call `.venv/bin/python make_video.py produce` with the **compressed** transcript, scene prompt, character, voice, source URL (if any). The script will:
   - Hit Hedra for starter image (canon reference + scene prompt)
   - Hit ElevenLabs for TTS
   - Hit Hedra Seedance 2.0 for lip-synced video
   - Transcode H.264
   - Upload to R2
   - Push Zernio TikTok draft
   - Create bundle at `../videos/YYYY-MM-DD-slug/`
   - Print bundle path, R2 URL, Zernio draft ID
7. **Generate hooks.** Read the compressed transcript, write `hooks.md` into the bundle folder (see Hook format below). The caption hook and suggested caption body can reference the original context (not just the compressed line), but the **visual hook** must describe what's actually said in the 15-sec video.
8. **Report to Andrew.** Output: bundle path, R2 URL, Zernio draft ID, and the three hook pieces inline so he can copy-paste at publish time.

## Hook format

`hooks.md` has three sections, nothing more:

```markdown
# Hooks — {slug}

## Visual hook (on-screen text overlay, first 1-2 sec)
3–7 words. Punchy. Pattern-interrupt. This is what appears on screen over the first beat of the video. Andrew adds this in TikTok's editor at publish time.

## Caption hook (first line of the post caption)
One line that pulls the thumb to stop scrolling. Question, contrarian framing, or surprising claim. ~15 words max.

## Suggested caption body
2–4 sentences expanding the hook into the post caption. Baby Facts voice — parent-to-parent, zero corporate tone, one specific detail from the transcript. End with a question or an invitation to engage. No hashtag stuffing.
```

**Voice rules for hooks:** match Andrew's established texture (see user_writing_voice memory). Conversational, metaphor-friendly, honest about the messy parts. No listicle clickbait ("5 things every mom needs to know") — that voice isn't the brand.

## What to never do

- Never API-publish the video (TikTok dampens API-posted content — always push as Zernio draft, Andrew publishes from phone)
- Never generate captions/subtitles as video overlays — we skip that step on purpose (TikTok's native caption tool handles it at publish)
- Never use the HEVC codec — always H.264 (the script handles this; don't override)
- Never invent voice IDs or character slugs — only `baby-a` / `baby-b`, only the six voice slugs in `../voices.md`
- Never skip `state.json` rotation update on a successful run (the script handles it)

## Failure modes to watch

- **Hedra image flagged** — if Nano Banana rejects the scene prompt, rewrite it more mundanely (remove any in-hand baby items, clinical phrasing, explicit race words — see `../characters/jack.md` learnings at bottom)
- **Vibe not ready** — `/ready` returns 503 if model isn't loaded. Script handles, but tell Andrew to start Vibe if it persists
- **Zernio draft fails** — fall back to printing the R2 URL so Andrew can upload manually. Don't retry to the point of duplicates — read `../../../CLAUDE.md` Zernio rules (never PUT, always GET first)
