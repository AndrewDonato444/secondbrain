#!/usr/bin/env python3
"""
Baby Facts V2 — Video Production Pipeline

Hybrid skill: this script handles deterministic plumbing. Claude handles
scene-prompt generation (creative) and hook writing (creative). See SKILL.md.

Two subcommands:
    transcribe --url <URL>
        Downloads audio and transcribes via Vibe. Prints transcript to stdout.

    produce --transcript <TEXT|@file> --scene-prompt <TEXT>
            [--character baby-a|baby-b] [--voice <slug>]
            [--source-url <URL>]
        Runs the full production pipeline. Prints bundle path, R2 URL, and
        Zernio draft ID on success.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
import uuid
from datetime import datetime
from pathlib import Path

import requests
from dotenv import load_dotenv

# ---- paths ---------------------------------------------------------------

SKILL_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SKILL_DIR.parent                   # projects/baby-facts-v2/
CHARACTERS_DIR = PROJECT_DIR / "characters"
VIDEOS_DIR = PROJECT_DIR / "videos"
STATE_FILE = SKILL_DIR / "state.json"

# .env.local lives at SecondBrain/.env.local
SECONDBRAIN_ROOT = PROJECT_DIR.parent.parent     # projects/baby-facts-v2 -> projects -> SecondBrain
load_dotenv(SECONDBRAIN_ROOT / ".env.local")

VIBE_URL = os.environ.get("VIBE_API_URL", "http://127.0.0.1:52625")
HEDRA_API_KEY = os.environ.get("HEDRA_API_KEY")
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")

R2_ACCOUNT_ID = os.environ.get("R2_ACCOUNT_ID")
R2_ACCESS_KEY_ID = os.environ.get("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.environ.get("R2_SECRET_ACCESS_KEY")
R2_BUCKET = os.environ.get("R2_BUCKET_NAME", "factsunlocked")
R2_PUBLIC_URL = os.environ.get("R2_PUBLIC_URL", "").rstrip("/")

ZERNIO_API_KEY = os.environ.get("ZERNIO_API_KEY")
ZERNIO_PROFILE_ID = os.environ.get("ZERNIO_PROFILE_ID")
ZERNIO_CHANNEL_ID_TIKTOK = os.environ.get("ZERNIO_CHANNEL_ID_TIKTOK")

# ---- character / voice registry ------------------------------------------

CHARACTERS = {
    "baby-a": {
        "name": "Mia",
        "canon": CHARACTERS_DIR / "mia.png",
        "spec": CHARACTERS_DIR / "mia.md",
        "voices": ["mia-1-warm", "mia-2-knowing", "mia-3-tired"],
    },
    "baby-b": {
        "name": "Jack",
        "canon": CHARACTERS_DIR / "jack.png",
        "spec": CHARACTERS_DIR / "jack.md",
        "voices": ["jack-1-earnest", "jack-2-dry", "jack-3-hushed"],
    },
}

VOICE_IDS = {
    "mia-1-warm":    "HZdYuhrxzJcfkCFqzj3H",
    "mia-2-knowing": "vXQ5GLohM2GgYV98k5wZ",
    "mia-3-tired":   "9E9uYiVlogRqAcf7b04q",
    "jack-1-earnest": "Wdw465TDmg0V5XHhvnDT",
    "jack-2-dry":     "jIvIJ2nzKfpdDBMf7ruk",
    "jack-3-hushed":  "chiHu6Mm0DdKHsS2JioP",
}

# ---- helpers -------------------------------------------------------------

def log(msg: str) -> None:
    print(f"[baby-facts] {msg}", file=sys.stderr, flush=True)


def slugify(text: str, max_len: int = 40) -> str:
    s = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    s = re.sub(r"[\s_-]+", "-", s)
    return s[:max_len].strip("-") or "video"


def run(cmd: list[str], **kwargs) -> subprocess.CompletedProcess:
    log(f"$ {' '.join(cmd)}")
    return subprocess.run(cmd, check=True, **kwargs)


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"last_character": None, "voice_index": {"baby-a": -1, "baby-b": -1}}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


def next_rotation(state: dict, character_override: str | None, voice_override: str | None) -> tuple[str, str]:
    """Pick the character + voice for this run. Mutates state (caller saves on success)."""
    if character_override:
        character = character_override
    else:
        # Alternate characters on each run
        character = "baby-b" if state.get("last_character") == "baby-a" else "baby-a"

    if voice_override:
        voice_slug = voice_override
    else:
        voices = CHARACTERS[character]["voices"]
        idx = (state["voice_index"].get(character, -1) + 1) % len(voices)
        state["voice_index"][character] = idx
        voice_slug = voices[idx]

    state["last_character"] = character
    return character, voice_slug


# ---- transcription (Vibe / Sona) -----------------------------------------

def vibe_ready() -> bool:
    try:
        r = requests.get(f"{VIBE_URL}/ready", timeout=5)
        return r.status_code == 200
    except requests.RequestException:
        return False


def download_audio(url: str, out_dir: Path) -> Path:
    """Use yt-dlp to fetch audio-only track as mp3."""
    out_template = str(out_dir / "source.%(ext)s")
    run([
        "yt-dlp",
        "-x", "--audio-format", "mp3",
        "-o", out_template,
        url,
    ])
    mp3 = out_dir / "source.mp3"
    if not mp3.exists():
        # yt-dlp may produce .m4a when extracting fails; try to find it
        candidates = list(out_dir.glob("source.*"))
        raise FileNotFoundError(f"Expected source.mp3, found: {candidates}")
    return mp3


def transcribe_audio(audio_path: Path) -> str:
    if not vibe_ready():
        raise RuntimeError(
            f"Vibe not ready at {VIBE_URL}. Start the Vibe/Sona app or call "
            f"POST /v1/models/load first."
        )
    with open(audio_path, "rb") as f:
        files = {"file": (audio_path.name, f, "application/octet-stream")}
        data = {
            "language": "en",
            "response_format": "json",
        }
        r = requests.post(
            f"{VIBE_URL}/v1/audio/transcriptions",
            files=files,
            data=data,
            timeout=600,
        )
    r.raise_for_status()
    return r.json().get("text", "").strip()


def cmd_transcribe(args: argparse.Namespace) -> None:
    tmp_dir = Path("/tmp") / f"baby-facts-{uuid.uuid4().hex[:8]}"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    audio = download_audio(args.url, tmp_dir)
    transcript = transcribe_audio(audio)
    print(transcript)


# ---- Hedra -------------------------------------------------------------

HEDRA_BASE = "https://api.hedra.com/web-app/public"

# Model UUIDs (from GET /models)
NANO_BANANA_I2I = "c32ec32d-9f90-4557-b463-f412ef0e51f0"  # image-to-image, requires start_frame
CHARACTER_3     = "d1dd37a3-e39a-4854-a298-6510289f9cf2"  # lip-synced talking avatar, audio-driven


def hedra_headers() -> dict:
    return {"X-API-Key": HEDRA_API_KEY}




def hedra_upload_asset(path: Path, asset_type: str) -> str:
    """
    Two-step asset flow:
      1. POST /assets  (JSON body) → returns asset_id
      2. POST /assets/{id}/upload  (multipart file) → uploads bytes
    Returns asset_id.
    asset_type: "image" | "audio"
    """
    # step 1 — create
    r = requests.post(
        f"{HEDRA_BASE}/assets",
        headers={**hedra_headers(), "Content-Type": "application/json"},
        json={"name": path.stem, "type": asset_type},
        timeout=30,
    )
    r.raise_for_status()
    asset_id = r.json()["id"]

    # step 2 — upload bytes
    with open(path, "rb") as f:
        files = {"file": (path.name, f)}
        r2 = requests.post(
            f"{HEDRA_BASE}/assets/{asset_id}/upload",
            headers=hedra_headers(),
            files=files,
            timeout=300,
        )
    if not r2.ok:
        log(f"Hedra upload step failed: {r2.status_code} {r2.text}")
        r2.raise_for_status()
    return asset_id


def hedra_fetch_asset_url(asset_id: str, asset_type: str) -> str:
    """Retrieve a generated asset's CDN URL via GET /assets?type=...&ids=..."""
    r = requests.get(
        f"{HEDRA_BASE}/assets",
        headers=hedra_headers(),
        params={"type": asset_type, "ids": asset_id},
        timeout=30,
    )
    r.raise_for_status()
    items = r.json()
    if not items:
        raise RuntimeError(f"Asset {asset_id} not found in listing")
    url = items[0].get("asset", {}).get("url")
    if not url:
        raise RuntimeError(f"Asset {asset_id} has no asset.url: {items[0]}")
    return url


def hedra_poll_generation(gen_id: str, out_path: Path, asset_type: str, max_polls: int = 360) -> Path:
    """Poll a generation until complete, then retrieve + download the asset."""
    for _ in range(max_polls):
        time.sleep(5)
        s = requests.get(f"{HEDRA_BASE}/generations/{gen_id}/status",
                         headers=hedra_headers(), timeout=30)
        if not s.ok:
            log(f"poll {gen_id}: {s.status_code} {s.text[:200]}")
            s.raise_for_status()
        body = s.json()
        status = body.get("status")
        if status == "complete":
            asset_id = body["asset_id"]
            cdn_url = hedra_fetch_asset_url(asset_id, asset_type)
            dl = requests.get(cdn_url, timeout=300)
            dl.raise_for_status()
            out_path.write_bytes(dl.content)
            return out_path
        if status in ("failed", "error"):
            raise RuntimeError(f"Generation {gen_id} failed: {body}")
    raise TimeoutError(f"Generation {gen_id} timed out")


def hedra_generate_starter_image(canon_image_path: Path, scene_prompt: str, out_path: Path) -> Path:
    """Nano Banana I2I: canonical reference + scene prompt → starter image. Flat payload."""
    canon_id = hedra_upload_asset(canon_image_path, "image")
    payload = {
        "type": "image",
        "ai_model_id": NANO_BANANA_I2I,
        "start_keyframe_id": canon_id,
        "text_prompt": scene_prompt,
        "aspect_ratio": "9:16",
    }
    r = requests.post(f"{HEDRA_BASE}/generations",
                      headers={**hedra_headers(), "Content-Type": "application/json"},
                      json=payload, timeout=60)
    if not r.ok:
        log(f"Hedra image gen POST failed: {r.status_code} {r.text}")
        r.raise_for_status()
    gen_id = r.json()["id"]
    return hedra_poll_generation(gen_id, out_path, asset_type="image", max_polls=120)


# ---- ElevenLabs: TTS -----------------------------------------------------

ELEVEN_BASE = "https://api.elevenlabs.io/v1"

def elevenlabs_tts(voice_id: str, text: str, out_path: Path) -> Path:
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
    }
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.75,
            "style": 0.3,
            "use_speaker_boost": True,
        },
    }
    r = requests.post(f"{ELEVEN_BASE}/text-to-speech/{voice_id}",
                      headers=headers, json=payload, timeout=120)
    r.raise_for_status()
    out_path.write_bytes(r.content)
    return out_path


# ---- Hedra Character-3: audio-driven lip-synced talking avatar ---------

def hedra_generate_video(starter_image_path: Path, audio_path: Path, text: str, out_path: Path) -> Path:
    """
    Hedra Character-3: starter image + audio → lip-synced talking-avatar video.
    Duration auto-sizes to the audio length. `text` is passed as an optional
    scene/motion hint only (not used for mouth sync — the audio drives that).
    """
    image_id = hedra_upload_asset(starter_image_path, "image")
    audio_id = hedra_upload_asset(audio_path, "audio")

    payload = {
        "type": "video",
        "ai_model_id": CHARACTER_3,
        "start_keyframe_id": image_id,
        "audio_id": audio_id,
        "generated_video_inputs": {
            "text_prompt": text[:500],
            "ai_model_id": CHARACTER_3,
            "resolution": "720p",
            "aspect_ratio": "9:16",
        },
    }
    r = requests.post(f"{HEDRA_BASE}/generations",
                      headers={**hedra_headers(), "Content-Type": "application/json"},
                      json=payload, timeout=60)
    if not r.ok:
        log(f"Hedra video gen POST failed: {r.status_code} {r.text}")
        r.raise_for_status()
    gen_id = r.json()["id"]
    return hedra_poll_generation(gen_id, out_path, asset_type="video", max_polls=360)


# ---- ffmpeg transcode to H.264 ------------------------------------------

def transcode_h264(src: Path, dst: Path, audio_override: Path | None = None) -> Path:
    """
    Transcode to H.264 + AAC for TikTok. If audio_override is provided, force
    that audio track onto the output regardless of what the source has — this
    guards against a model silently producing a silent video.
    """
    cmd = ["ffmpeg", "-y", "-i", str(src)]
    if audio_override is not None:
        cmd += ["-i", str(audio_override), "-map", "0:v:0", "-map", "1:a:0"]
    cmd += [
        "-c:v", "libx264", "-preset", "medium", "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        "-movflags", "+faststart",
        str(dst),
    ]
    run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return dst


# ---- R2 upload ----------------------------------------------------------

def upload_to_r2(path: Path, key: str) -> str:
    import boto3  # lazy-import so --help works without boto3
    s3 = boto3.client(
        "s3",
        endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=R2_ACCESS_KEY_ID,
        aws_secret_access_key=R2_SECRET_ACCESS_KEY,
        region_name="auto",
    )
    s3.upload_file(str(path), R2_BUCKET, key, ExtraArgs={"ContentType": "video/mp4"})
    return f"{R2_PUBLIC_URL}/{key}"


# ---- Zernio: push as TikTok draft --------------------------------------

ZERNIO_BASE = "https://getlate.dev/api/v1"

def zernio_draft_tiktok(video_url: str, caption: str) -> str:
    headers = {
        "Authorization": f"Bearer {ZERNIO_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "profileId": ZERNIO_PROFILE_ID,
        "content": caption,
        "status": "draft",
        "platforms": [{
            "platform": "tiktok",
            "accountId": ZERNIO_CHANNEL_ID_TIKTOK,
        }],
        "mediaItems": [{"type": "video", "url": video_url}],
    }
    r = requests.post(f"{ZERNIO_BASE}/posts", headers=headers,
                      json=payload, timeout=60)
    if not r.ok:
        log(f"Zernio draft push failed: {r.status_code} {r.text}")
        raise RuntimeError(f"Zernio error: {r.text}")
    return r.json().get("id") or r.json().get("_id") or "unknown"


# ---- produce ------------------------------------------------------------

def resolve_transcript(arg: str) -> str:
    if arg.startswith("@"):
        return Path(arg[1:]).read_text().strip()
    return arg.strip()


def cmd_produce(args: argparse.Namespace) -> None:
    transcript = resolve_transcript(args.transcript)
    if not transcript:
        raise ValueError("Empty transcript")

    scene_prompt = args.scene_prompt.strip()
    if not scene_prompt:
        raise ValueError("Empty scene prompt")

    state = load_state()
    character, voice_slug = next_rotation(state, args.character, args.voice)
    char = CHARACTERS[character]
    voice_id = VOICE_IDS[voice_slug]

    # bundle folder
    today = datetime.now().strftime("%Y-%m-%d")
    slug = f"{today}-{slugify(transcript[:60])}"
    bundle = VIDEOS_DIR / slug
    bundle.mkdir(parents=True, exist_ok=True)

    # persist inputs immediately so a failed run leaves debuggable state
    (bundle / "transcript.txt").write_text(transcript)
    (bundle / "scene_prompt.txt").write_text(scene_prompt)

    log(f"character={character} ({char['name']}), voice={voice_slug}, bundle={bundle}")

    # 1. starter image
    log("generating starter image via Hedra/Nano Banana…")
    full_scene_prompt = (
        f"{scene_prompt} "
        f"Same person as the reference, same visual universe — warm neutral palette, "
        f"natural window light, film grain, muted saturation, shallow depth of field, "
        f"documentary realism, 9:16 vertical."
    )
    starter = bundle / "starter.png"
    hedra_generate_starter_image(char["canon"], full_scene_prompt, starter)

    # 2. TTS
    log(f"generating TTS via ElevenLabs voice={voice_slug}…")
    audio = bundle / "audio.mp3"
    elevenlabs_tts(voice_id, transcript, audio)

    # 3. video
    log("generating video via Hedra Character-3 (lip-sync)…")
    raw_video = bundle / "video_raw.mp4"
    hedra_generate_video(starter, audio, transcript, raw_video)

    # 4. transcode (force our TTS audio onto the final track — guard against silent outputs)
    log("transcoding to H.264 with forced audio mux…")
    final = bundle / "video.mp4"
    transcode_h264(raw_video, final, audio_override=audio)
    raw_video.unlink(missing_ok=True)

    # 5. upload
    log("uploading to R2…")
    r2_key = f"baby-facts-v2/{slug}.mp4"
    r2_url = upload_to_r2(final, r2_key)

    # 6. Zernio draft
    log("pushing Zernio TikTok draft…")
    # Placeholder caption — Claude will overwrite at publish time via hooks.md.
    draft_caption = transcript[:140]
    try:
        draft_id = zernio_draft_tiktok(r2_url, draft_caption)
    except Exception as e:
        log(f"Zernio push failed (R2 URL still valid): {e}")
        draft_id = f"FAILED: {e}"

    # 7. metadata
    metadata = {
        "slug": slug,
        "created": datetime.now().isoformat(),
        "character": character,
        "character_name": char["name"],
        "voice": voice_slug,
        "voice_id": voice_id,
        "source_url": args.source_url,
        "r2_key": r2_key,
        "r2_url": r2_url,
        "zernio_draft_id": draft_id,
    }
    (bundle / "metadata.json").write_text(json.dumps(metadata, indent=2))

    # 8. save rotation state only on success
    save_state(state)

    # summary to stdout (machine-readable JSON)
    print(json.dumps({
        "bundle": str(bundle),
        "video": str(final),
        "r2_url": r2_url,
        "zernio_draft_id": draft_id,
        "character": character,
        "voice": voice_slug,
    }, indent=2))


# ---- main ---------------------------------------------------------------

def main() -> None:
    p = argparse.ArgumentParser(prog="baby-facts-make")
    sub = p.add_subparsers(dest="cmd", required=True)

    t = sub.add_parser("transcribe", help="Download + transcribe a URL via Vibe")
    t.add_argument("--url", required=True)
    t.set_defaults(func=cmd_transcribe)

    r = sub.add_parser("produce", help="Run the full production pipeline")
    r.add_argument("--transcript", required=True,
                   help="Transcript text, or @path/to/file.txt")
    r.add_argument("--scene-prompt", required=True,
                   help="Scene description for Nano Banana (Claude generates this)")
    r.add_argument("--character", choices=["baby-a", "baby-b"],
                   help="Override rotation")
    r.add_argument("--voice", choices=list(VOICE_IDS.keys()),
                   help="Override voice rotation")
    r.add_argument("--source-url", default=None,
                   help="Original post URL (for metadata)")
    r.set_defaults(func=cmd_produce)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
