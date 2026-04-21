---
id: DOC-069
created: 2026-04-21
updated: 2026-04-21
type: reference
domain: ai-frontier
source_intake: inbox/2026-04-21-scratch-ai-tiktok-slideshow-playbook.md  # DOC-070
audience: personal
depends-on: []
extends: []
informs: [DOC-009, DOC-010, DOC-052, DOC-055]
status: active
---

# TikTok Slideshow Playbook — Faceless Consumer App Marketing

Source: short-form video from the founder of **Scratch AI** (golf app). Claim: 20K+ downloads in the first two weeks driven mostly by faceless TikTok slideshows.

## The Playbook (as stated)

1. **Format**: TikTok slideshow (static images, no face, no voiceover required).
2. **Ideation**: Prompt ChatGPT for listicle topics in the app's niche.
   - Pattern: *"5 best ways to \_\_\_"*, *"5 easiest ways to \_\_\_"*, *"Top 5 \_\_\_ mistakes"*, etc.
3. **Structure**: 5–7 slides. Each slide is one item from the list. **Final slide is a CTA** pointing to the app (handle, QR, search term).
4. **Cost**: ~10–20 minutes per slideshow to produce.
5. **Volume**: **5–7 slideshows per day.** Volume is the whole game — most flop, a few spike to hundreds of thousands of views.
6. **Location-independent**: fully online, no filming, no presence needed.

## Why This Actually Works (implicit)

- TikTok's slideshow surface has its own algo and a lower production floor than video — lists are the native format.
- Faceless = no personal brand tax, and you can run it across many niches / many apps from one operator.
- CTA-on-last-slide pattern mirrors the same move podcasters/creators make; TT users who swipe to the end are high-intent.
- ChatGPT-prompted list generation means the creative bottleneck is image rendering + upload cadence, not ideation.

---

## Automation Blueprint with Tools We Already Have

This pipeline maps cleanly onto skills/MCPs already in this environment. The human-in-the-loop step is **review before publish** — per existing rule, TT API-published posts get dampened reach, so we always push as a **draft** and Andrew publishes from phone.

### Pipeline

```
niche/project
    │
    ▼
┌───────────────────────┐
│  1. Ideation          │  Claude Code (native, no API call)
│     listicle prompts  │  → n titles in "5 best X" / "5 easiest X" form
└───────────────────────┘
    │
    ▼
┌───────────────────────┐
│  2. Slide copy        │  text-writer skill (or inline)
│     hook → 5 items    │  → JSON: {hook, slides[5-6], cta}
│     → CTA             │
└───────────────────────┘
    │
    ▼
┌───────────────────────┐
│  3. Slide rendering   │  image-gen skill (Nano Banana / Gemini)
│     consistent style  │  → one image per slide, niche-locked style
│     per niche         │
└───────────────────────┘
    │
    ▼
┌───────────────────────┐
│  4. Draft push        │  social-media skill → Zernio
│     TikTok DRAFT      │  platform: tiktok, status: draft
│     (never publish)   │  caption: hook + hashtags
└───────────────────────┘
    │
    ▼
┌───────────────────────┐
│  5. Andrew reviews    │  Phone → TikTok app → publish natively
│     + publishes from  │  (avoids API-dampened reach)
│     phone             │
└───────────────────────┘
    │
    ▼
┌───────────────────────┐
│  6. Daily cadence     │  scheduled-tasks MCP / /schedule skill
│     1 run/day = 5-7   │  Fires morning; Andrew publishes through
│     drafts queued     │  the day at natural gaps
└───────────────────────┘
```

### Skill / Tool Map

| Step | Tool |
|------|------|
| Ideation | Claude Code (native LLM, no extra call) |
| Copywriting | `text-writer` skill |
| Image rendering | `image-gen` skill (Nano Banana) |
| Batch orchestration | `content-engine` skill |
| Platform push (draft) | `social-media` skill → Zernio |
| Scheduling | `scheduled-tasks` MCP or `/schedule` skill |

### Constraints Already Known

- **Platform default**: TikTok, YouTube Shorts, LinkedIn. **Instagram is opt-in only** — do not auto-queue IG unless Andrew flags it for a given niche.
- **Never auto-publish to TikTok via API** — reach gets dampened. Zernio draft → manual publish from phone.
- **Format**: TT slideshows accept JPEG/PNG. No HEVC concern here (that was for TT *video*), but keep assets standard 1080×1920 portrait.
- **Zernio = product name** (Late.dev is stale).

---

## Where This Fits in Andrew's Stack

This is a **future-phase** playbook — specifically for when Andrew has a **product/app to sell** and needs low-cost awareness at scale. It is **not** a thought-leadership or personal-brand tactic. Apply it to the thing being *sold*, not to Andrew's voice.

### Hard boundaries

- **Never on LinkedIn.** LI is thought-leadership territory — convergence lane, long-form thinking-out-loud. Slideshow-style "5 easiest ways to X" awareness content would break the voice and the positioning. Not now, not ever, regardless of what product eventually gets sold.
- **Instagram stays opt-in** (existing rule).
- **TikTok drafts only** — Andrew publishes from phone to avoid API-dampened reach (existing rule).

### Where it does fit

- **A future Andrew-owned consumer app / product** — the actual target of this playbook. When that product exists, wire the pipeline for that specific app's niche.
- **Facts Unlocked (parenting facts)** — plausible fit once there's something to sell beyond the content itself (book, course, app). Until then, current Baby Facts video lane is already doing the awareness job.
- **Building Out Loud** — **not** a fit. BOL is thought-leadership; slideshow listicles would repackage episodes (violates existing rule) and dilute voice.
- **MSA / TrackForce / LinkedIn convergence / andrewdonato-com** — all skipped. Wrong audience, wrong voice, wrong surface.

**Highest-leverage moment**: *don't* wire this now. Park it until there's a concrete thing to sell. Revisit when a product/app enters the roadmap.

### Naming note

The existing `projects/linkedin-convergence/` folder distributes across TikTok too. If the project scope keeps broadening, the folder name may deserve a rename (e.g. `convergence-content`). Flagging, not acting — rename is a decision for Andrew.

---

## Open Questions

- Does TT slideshow still outperform short video in 2026, or is the Scratch AI number a 2025 artifact? Worth sampling 10 current slideshow posts in a target niche before committing cadence.
- What's the right style lock per niche so rendered slides look like one creator's body of work, not 7 one-offs? Needs a `style.md` per niche before batching.
- Can we measure dampening from API drafts that are *published from phone immediately* vs. drafts that sit for hours? Not obvious.

## Next Actions

**Parked.** Don't wire this until there's a product/app to sell. When that happens:

1. Confirm the target product and its niche (not Andrew's personal brand).
2. Lock a style sheet (1 page) for that niche — colors, type, layout — before first batch.
3. Draft a `content-engine` run config: 1 run/day, 5 drafts out, TikTok + YT Shorts (never LI, IG opt-in only).
4. Scheduled task: morning → generate → draft to Zernio → Andrew publishes from phone.
5. Track two weeks of views before committing cadence.
