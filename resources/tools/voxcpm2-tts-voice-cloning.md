---
created: 2026-04-10
updated: 2026-04-10
source_intake: inbox/2026-04-10-voxcpm2-tts.md
connections:
  - ../../projects/facts-unlocked/pipeline-spec.md
  - ../../projects/modern-signal-advisory/product-overview.md
  - ../../interests/ai-frontier/bloom-ai-screen-recording.md
relevance:
  - facts-unlocked
  - modern-signal-advisory
  - ai-frontier
---

# VoxCPM2 — Open Source TTS with Voice Design & Cloning

**Repo:** https://github.com/OpenBMB/VoxCPM/
**Stars:** 8.4k | **License:** Apache-2.0 (commercial use OK) | **Language:** Python

## What It Is

A 2B parameter, tokenizer-free TTS model from OpenBMB. Trained on 2M+ hours of multilingual speech data. The standout features:

1. **Voice Design:** Describe a voice in natural language ("A young woman, gentle voice") and it synthesizes a matching voice with zero reference audio. No one else needs to exist — you just describe what you want.
2. **Controllable Voice Cloning:** Clone any voice from a short audio clip, with style control (emotion, pace, expression).
3. **30 languages** including 9 Chinese dialects. No language tags needed.
4. **48kHz studio-quality output** — native, not upsampled.
5. **Real-time streaming:** RTF ~0.3 on RTX 4090, ~0.13 with Nano-vLLM optimization.

## Architecture

Diffusion autoregressive paradigm operating in AudioVAE V2 latent space. Pipeline: LocEnc → TSLM → RALM → LocDec. Entirely continuous — no discrete tokenization step, which is the key to natural expressiveness.

## Benchmarks

- English: 1.84% WER, 75.3% similarity
- Chinese: 0.97% CER, 79.5% similarity
- ~8GB VRAM required

## Why This Matters

### Facts Unlocked — Direct Replacement Candidate

Facts Unlocked currently uses ElevenLabs/Grok/Gemini for TTS across 4 channels × 3 posts/day = 12 voice generations daily. VoxCPM2 is:
- **Free** (Apache-2.0) vs. ElevenLabs subscription costs
- **Self-hosted** — no API rate limits or vendor dependency
- **Voice Design** — could create unique character voices for each channel by description alone, no voice actor samples needed
- **Multilingual** — if Facts Unlocked ever expands to non-English content, it's already supported

The cost savings alone could be significant at 12+ generations/day. And the voice design feature means each channel (baby facts, money, AI, viral) could have a distinctive, owned voice identity.

### MSA — Signal Voice Potential

Signal Voice filters content through the broker's voice/tone. Voice cloning from a short audio sample of the broker speaking could give Signal Voice an actual audio dimension — not just written tone matching but actual voice synthesis for video content or audio briefings. This is speculative but the capability is there.

### The AI Voice Stack Is Going Open

This follows the pattern: first image gen went open (Stable Diffusion), then LLMs (Llama), now TTS/voice. VoxCPM2 at 2B parameters running on a single GPU with studio quality is the "Stable Diffusion moment" for voice. Worth tracking how this ecosystem evolves.

## Fine-Tuning

Supports both full fine-tuning (SFT) and LoRA. 5-10 minutes of audio is enough to adapt to a speaker, language, or domain. This is relevant for creating highly consistent channel voices for Facts Unlocked.
