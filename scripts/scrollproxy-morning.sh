#!/bin/bash
# ScrollProxy morning routine — runs daily at 7:03am ET via launchd.
# Calls Claude Code headless with morning-routine-prompt.md as the spec.
# Full local filesystem + network access; no CCR sandbox limits.

set -uo pipefail

BRAIN_DIR="$HOME/SecondBrain"
LOG_DIR="$BRAIN_DIR/logs/scrollproxy-morning"
mkdir -p "$LOG_DIR"

TODAY=$(TZ=America/New_York date '+%Y-%m-%d')
LOG="$LOG_DIR/$TODAY.log"
TS=$(date '+%Y-%m-%d %H:%M:%S %Z')

echo "" >> "$LOG"
echo "=== ScrollProxy morning routine starting $TS ===" >> "$LOG"

cd "$BRAIN_DIR" || { echo "[FAIL] cd $BRAIN_DIR failed" >> "$LOG"; exit 1; }

# Load Telegram creds into env
if [ ! -f "$BRAIN_DIR/.env.local" ]; then
  echo "[FAIL] .env.local missing — cannot send Telegram" >> "$LOG"
  exit 1
fi
set -a
# shellcheck disable=SC1091
source "$BRAIN_DIR/.env.local"
set +a

# Locate claude binary (homebrew default, fall back to PATH)
CLAUDE_BIN=$(command -v claude || echo /opt/homebrew/bin/claude)
if [ ! -x "$CLAUDE_BIN" ]; then
  echo "[FAIL] claude CLI not found at $CLAUDE_BIN" >> "$LOG"
  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      -d chat_id="${TELEGRAM_CHAT_ID}" \
      --data-urlencode text="⚠️ ScrollProxy morning routine failed: claude CLI not found" \
      >/dev/null || true
  fi
  exit 1
fi

# Prompt for claude — short wrapper that delegates to the versioned routine spec
PROMPT="You are running the ScrollProxy morning routine for Andrew Donato.

You are running locally on Andrew's Mac. Your working directory is the Second Brain repo root (~/SecondBrain). The environment variables TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are already exported in your shell — use them directly for the Telegram digest.

Read projects/scrollproxy/morning-routine-prompt.md and execute the routine exactly as specified. Today's date (compute with \`TZ=America/New_York date '+%Y-%m-%d'\`) is your canonical date for the surfacing file path.

If any step fails, send a Telegram message explaining which step broke and the error."

echo "[INFO] Invoking claude CLI" >> "$LOG"
"$CLAUDE_BIN" \
  --permission-mode bypassPermissions \
  --allowed-tools "Bash,Read,Write,Edit,Glob,Grep" \
  -p "$PROMPT" \
  >> "$LOG" 2>&1

EXIT_CODE=$?
echo "=== Finished $(date '+%H:%M:%S %Z') with exit $EXIT_CODE ===" >> "$LOG"

# Fallback Telegram if claude itself failed
if [ $EXIT_CODE -ne 0 ] && [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    --data-urlencode text="⚠️ ScrollProxy morning routine exited $EXIT_CODE. Check $LOG" \
    >/dev/null || true
fi

exit $EXIT_CODE
