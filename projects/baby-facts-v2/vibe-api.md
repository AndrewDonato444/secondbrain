# Vibe API Reference

Vibe is a local OpenAI-compatible transcription server. Internally the project is called **Sona** (from the openapi title). Whisper-shape API.

- **Base URL:** `http://127.0.0.1:52625`
- **Interactive docs:** `http://127.0.0.1:52625/docs`
- **OpenAPI spec:** `http://127.0.0.1:52625/openapi.json`

## Request shape (the important one)

`POST /v1/audio/transcriptions` — **multipart/form-data**, takes an audio **file** (not a URL). So for a TikTok/IG video URL, download + extract audio first (yt-dlp + ffmpeg → `.mp3` or `.wav`).

### Key form fields

| Field | Type | Notes |
|---|---|---|
| `file` | binary | **required** — audio file upload |
| `model` | string | model name (e.g. `whisper-large-v3`) |
| `language` | string | e.g. `en` — skip to auto-detect |
| `detect_language` | bool | auto-detect vs. pin |
| `word_timestamps` | **bool** | **critical for our caption pipeline** — set `true` |
| `stable_timestamps` | bool | more stable word-level timing |
| `response_format` | string | likely supports `json`, `verbose_json`, `srt`, `vtt`, `text` (Whisper convention) — `verbose_json` is what gives the word timings back |
| `enhance_audio` | bool | preprocess audio before transcription |
| `vad_model` | string | voice-activity-detection model |
| `diarize_model` | string | speaker separation (probably irrelevant for single-speaker clips) |
| `temperature` | float | sampling temperature |
| `beam_size` | int | beam search width |
| `best_of` | int | candidate count |
| `n_threads` | int | CPU threads |
| `translate` | bool | translate to English instead of transcribing in source language |
| `prompt` | string | optional context prompt |
| `stream` | bool | stream response |
| `max_segment_len` | int | max segment length |
| `max_text_ctx` | int | text context window |
| `sampling_strategy` | string | decoding strategy |

### Default response shape (schema-declared)

```json
{ "text": "..." }
```

The schema only types `text`, but `response_format=verbose_json` + `word_timestamps=true` should return Whisper's richer shape (`segments[]` with `words[]` each having `start`, `end`, `word`). **Confirm by test** before wiring captions.

## Operational endpoints

| Endpoint | Purpose |
|---|---|
| `GET /health` | Always 200 — liveness |
| `GET /ready` | 200 if model loaded, 503 otherwise — **gate transcription calls behind this** |
| `GET /v1/models` | List loaded models |
| `POST /v1/models/load` | Body: `{ "path": "..." }` — load a model before first transcription |
| `DELETE /v1/models` | Unload the current model |

## Pipeline usage pattern

```
1. GET /ready
   └─ if 503 → POST /v1/models/load with a known model path
2. POST /v1/audio/transcriptions
   multipart: file=@audio.mp3
              model=<name>
              word_timestamps=true
              response_format=verbose_json
              language=en
3. Parse response → full transcript + word-level timings for captions
```

## To-do before production use

- Confirm `response_format=verbose_json` actually returns `segments[].words[]` structure (test with a small clip).
- Capture the default model path Vibe wants loaded — probably `/v1/models` GET will reveal it once something is loaded.
- Decide language pin strategy: `language=en` (fast, no detect overhead) vs `detect_language=true` (handles the rare foreign-language source clip).
