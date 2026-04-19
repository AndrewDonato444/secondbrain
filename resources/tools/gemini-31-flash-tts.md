---
id: DOC-049
created: 2026-04-16
updated: 2026-04-16
type: reference
domain: ai-frontier
source_intake: null
audience: personal
depends-on: []
extends: []
informs: [DOC-022, DOC-009]
status: active
---

# Gemini 3.1 Flash TTS — Google's Expressive AI Speech Model

**Announced:** 2026-04-15
**Source:** https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-tts/
**Available via:** Gemini API, Google AI Studio, Vertex AI, Google Vids (Workspace)

## What It Is

Google's next-gen text-to-speech model. The headline feature: **200+ audio tags** that let you steer vocal style, pace, and delivery by embedding natural language commands directly in the text input. Think of it as "prompt-driven TTS" — you describe how you want it said, not just what to say.

## Key Capabilities

1. **Audio Tags (200+):** Inline directives for granular control over delivery — pace, emotion, emphasis, style. This is the differentiator vs. most TTS models that give you a voice and a script with limited control.
2. **70+ Languages:** High-fidelity speech with style/pacing/accent control across major markets.
3. **Native Multi-Speaker Dialogue:** Handles multiple speakers in a single generation — natural conversational flow without stitching separate voice outputs. Built for podcasts, scripts, assistant interfaces.
4. **SynthID Watermarking:** All output is watermarked for AI-generated content detection. Imperceptible but detectable.
5. **Benchmark Performance:** Elo 1,211 on Artificial Analysis TTS leaderboard (blind human preference).

## Why This Matters

### vs. VoxCPM2 (DOC-022) — Different Tradeoffs

| | Gemini 3.1 Flash TTS | VoxCPM2 |
|---|---|---|
| **Cost** | API pricing (usage-based) | Free (Apache-2.0, self-hosted) |
| **Control** | 200+ audio tags, prompt-driven | Voice design from description, style control |
| **Voice Cloning** | Not mentioned | Yes, from short audio clips |
| **Multi-Speaker** | Native, single generation | Not a highlighted feature |
| **Languages** | 70+ | 30 |
| **Infrastructure** | Cloud API (zero infra) | Self-hosted, ~8GB VRAM |
| **Quality Signal** | Elo 1,211 leaderboard | 1.84% WER, 75.3% similarity |
| **Watermarking** | SynthID built-in | None |

**Bottom line:** Gemini Flash TTS wins on convenience, language breadth, and multi-speaker. VoxCPM2 wins on cost (free), voice cloning, and infrastructure independence. They're complementary — Gemini for quick multi-speaker content, VoxCPM2 for owned voices at scale.

### Facts Unlocked Pipeline (DOC-009)

The multi-speaker dialogue feature is interesting for podcast-style content or conversational explainers. At 12+ daily generations, API costs matter — but the audio tag control could mean fewer re-generations to get the right delivery. Worth benchmarking cost-per-generation vs. current ElevenLabs/Gemini TTS setup.

The 70+ language support also lowers the barrier if Facts Unlocked ever goes multilingual.

### Broader Signal

Google embedding TTS directly into Workspace (Google Vids) means AI-generated voiceovers are becoming a default business tool, not a novelty. The audio tag approach — treating voice direction like a prompt — is the interaction pattern that will win. This validates the "AI voice as a composable layer" thesis that both VoxCPM2 and this model point toward.
