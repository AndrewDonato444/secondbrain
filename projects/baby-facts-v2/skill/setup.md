# Baby Facts V2 — Per-Machine Setup

Bootstrap checklist. Takes about 5 minutes on a fresh machine.

## 1. System dependencies

```bash
# macOS
brew install ffmpeg yt-dlp python@3.11

# Linux (Debian/Ubuntu)
sudo apt install ffmpeg python3.11 python3-pip
pip install yt-dlp
```

## 2. Python dependencies

Homebrew Python is PEP 668-locked — use a venv inside the skill folder (this is already the canonical pattern):

```bash
cd ~/SecondBrain/projects/baby-facts-v2/skill
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

The skill invokes `.venv/bin/python` explicitly, so no activation step is needed at runtime. `.venv/` is gitignored by default (it doesn't travel in git — recreate it on each machine with the two commands above).

## 3. Environment variables

Open `~/SecondBrain/.env.local` and confirm these keys are present and populated:

```
HEDRA_API_KEY=...
ELEVENLABS_API_KEY=...
VIBE_API_URL=http://127.0.0.1:52625

R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=factsunlocked
R2_PUBLIC_URL=https://pub-....r2.dev

ZERNIO_API_KEY=...
ZERNIO_PROFILE_ID=...
ZERNIO_CHANNEL_ID_TIKTOK=...
```

On a clean machine, pull these from 1Password (or wherever you store secrets). `.env.local` is gitignored — it never travels in the repo.

## 4. Vibe / Sona (local transcription)

Vibe runs locally on port `52625`. Install from https://github.com/thewh1teagle/vibe (or however you installed it originally).

Before running a transcription, make sure Vibe is up:

```bash
curl -s http://127.0.0.1:52625/ready
# Expect: {"status":"ready"} (200)
# If 503: a model isn't loaded — open Vibe's UI to load one, or POST /v1/models/load
```

## 5. Install the skill into Claude Code

Claude Code discovers skills from `~/.claude/skills/`. The skill files themselves live in the repo (so they travel in git). Symlink:

```bash
mkdir -p ~/.claude/skills
ln -s ~/SecondBrain/projects/baby-facts-v2/skill ~/.claude/skills/baby-facts-make
```

Verify by running `/skills` in Claude Code — you should see `baby-facts-make` listed.

## 6. Sanity check

```bash
cd ~/SecondBrain/projects/baby-facts-v2/skill
.venv/bin/python make_video.py --help
```

Should print the CLI help without import errors. If it complains about missing env vars, re-check step 3.

## 7. First run

In Claude Code (at the SecondBrain repo root):

```
/baby-facts-make https://www.tiktok.com/@some-account/video/12345
```

Or with a transcript:

```
/baby-facts-make Did you know babies can hold their breath underwater until about six months old?
```

The first real run will flush out any Hedra endpoint drift (their API surface shifts occasionally). If something 4xx's, paste the error back and we'll adjust `make_video.py`.
