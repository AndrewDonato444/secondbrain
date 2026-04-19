---
id: DOC-054
created: 2026-04-16
updated: 2026-04-16
type: reference
domain: ai-frontier
audience: personal
informs: [DOC-009, DOC-010, DOC-001]
status: active
---

# HeyGen CLI + Hyperframes

---

## 1. HeyGen CLI

**Launched:** April 13, 2026
**Source:** https://x.com/heygen/status/2043725015506706900

Agent-first CLI that wraps HeyGen's full v3 API. Create, poll, and download avatar videos from the terminal. Every command returns structured JSON — built for scripts, CI pipelines, and autonomous agent workflows.

**Flow:** script → avatar creation → video → delivery, all from one command.

- OAuth auth, no API key setup needed
- Structured JSON output for piping into other tools
- GitHub: https://github.com/heygen-com

---

## 2. Hyperframes — Open-Source Video Rendering Framework

**Repo:** https://github.com/heygen-com/hyperframes (Apache 2.0)
**Docs:** https://hyperframes.heygen.com
**Stars:** 336

### What It Is

Write HTML → render video. An open-source framework that turns HTML markup into MP4s using Puppeteer + FFmpeg. AI-first design — the CLI runs non-interactively for agent workflows. Ships with built-in skills for Claude Code, Cursor, and Gemini CLI.

### Why It's Different from Remotion

| | Hyperframes | Remotion |
|---|---|---|
| **Language** | Plain HTML + data attributes | React components |
| **Learning curve** | Web dev basics | React required |
| **AI integration** | Built-in skills for Claude Code | No native AI integration |
| **Animation** | Bring your own (GSAP, Lottie, CSS, Three.js) | React-based |
| **Deterministic** | Yes — identical inputs = identical outputs | Yes |
| **Open source** | Apache 2.0 | BSL (restricted) |

### Package Ecosystem

| Package | Purpose |
|---------|---------|
| `hyperframes` CLI | Scaffolding, preview, linting, rendering |
| `@hyperframes/core` | Types, parsers, linter, runtime |
| `@hyperframes/engine` | Page-to-video via Puppeteer + FFmpeg |
| `@hyperframes/producer` | Full rendering pipeline |
| `@hyperframes/studio` | Browser-based editor |
| `@hyperframes/player` | Embeddable web component |
| `@hyperframes/shader-transitions` | WebGL transitions |

### Quick Start

```bash
npx skills add heygen-com/hyperframes   # install AI skills
npx hyperframes init my-video
cd my-video
npx hyperframes preview    # live reload
npx hyperframes render     # MP4 output
```

Requires Node.js >= 22 and FFmpeg.

### 50+ Pre-Built Blocks

Registry at hyperframes.heygen.com/catalog — shader transitions, social media overlays, data visualizations, cinematic effects.

---

## 3. Prompting Guide (Key Patterns)

**Source:** https://hyperframes.heygen.com/guides/prompting

### Two Prompt Shapes

1. **Cold Start** — describe from scratch: "Create a 10-second product intro with fade-in title over dark background"
2. **Warm Start** — transform existing content: "Summarize this PDF into a 45-second pitch video" (richer results because the agent works from real material)

### Vocabulary That Controls Output

**Timing:** fast (0.2s) = energy, medium (0.4s) = professional, slow (0.6s) = luxury, very slow (1-2s) = cinematic

**Caption Tones:**
- Hype: heavy weight, scale-pop, 72-96px
- Corporate: clean sans-serif, fade + slide, 56-72px
- Tutorial: monospace, typewriter, 48-64px
- Social: rounded playful, bounce, 56-80px

**Motion:** smooth (deceleration), snappy (decisive), bouncy (overshoot), springy (oscillate)

**Transitions by energy:** calm = blur crossfade, medium = push slide, high = zoom through / glitch

**Audio-reactive:** bass → scale/pulse, treble → glow, amplitude → opacity, mids → shape morph

### Critical Rules
- Plain HTML only — no React/Vue
- Register timelines on `window.__timelines`
- Video elements must be `muted`; audio in separate elements
- No `Math.random()` — seeded PRNG for determinism
- All timed elements need `class="clip"` + `data-start`, `data-duration`, `data-track-index`
- Lint before debugging: `npx hyperframes lint`

---

## Why This Matters for Andrew

### Facts Unlocked (DOC-009)
**This could replace or complement Remotion.** Hyperframes is simpler (HTML vs. React), has native AI agent support, deterministic rendering, and 50+ pre-built blocks. The Facts Unlocked pipeline currently uses Remotion for video generation — Hyperframes could reduce complexity significantly. The plain HTML approach means Claude Code can author videos more naturally than writing React components.

### Building Out Loud (DOC-010)
The HeyGen CLI could automate avatar-based video creation for supplemental content. Combined with Vugola (DOC-052) for clipping and distribution, this starts to look like a full automated content pipeline: write script → HeyGen CLI renders avatar video → Vugola clips and distributes.

### The Bigger Picture
HeyGen is building the "video as code" stack: CLI for avatar videos, Hyperframes for programmatic video rendering, both agent-first. This is the video equivalent of what happened with web development — going from GUI tools to code-driven pipelines.
