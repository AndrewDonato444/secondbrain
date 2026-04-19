---
id: DOC-060
created: 2026-04-18
updated: 2026-04-18
type: reference
domain: ai-frontier
audience: personal
depends-on: [DOC-050]
informs: [DOC-013, DOC-010, DOC-003]
status: active
---

# Claude Design — Anthropic Labs

**Source:** https://www.anthropic.com/news/claude-design-anthropic-labs
**Launched:** April 17, 2026 (research preview)
**Availability:** Included with Claude Pro, Max, Team, Enterprise (Enterprise orgs must enable in settings)
**Powered by:** Claude Opus 4.7

---

## What It Is

A conversational design tool inside Claude that produces polished visual work — mockups, prototypes, slides, pitch decks, marketing collateral — by describing what you want. Output is not flat images; it's real prototypes with voice, video, shaders, 3D, and a direct handoff to Claude Code for implementation.

This is the product the April-16 "Opus 4.7 builds websites from text" rumor was pointing at. The market reacted before it shipped (Figma -6%, Adobe/Wix/GoDaddy down on the rumor). Now the product exists.

---

## What It Does

### Inputs
- Natural-language prompts
- Image + document uploads (DOCX, PPTX, XLSX)
- Linked codebase — reads it directly for brand + component consistency
- Linked design files — automatically applies existing design system

### Iteration
- Inline comments on the canvas
- Direct text editing
- Custom adjustment sliders (tune specific dimensions of a design by dragging)
- Conversational refinement ("make this bolder, tighter, more editorial")

### Collaboration
- Organization-scoped sharing
- View / edit permissions
- Works like a Figma file — multiple people, same artifact

### Output / Handoff
- Shareable URL
- Folder structure
- Export to Canva
- Export to PDF, PPTX, standalone HTML
- **Packages the design for Claude Code to build** — full continuity from concept to code

---

## Who It's For

| Audience | Use case |
|----------|----------|
| Experienced designers | Explore multiple directions in parallel without time pressure |
| Non-designers (founders, PMs, marketers) | Produce shareable visual ideas without a designer or Figma license |
| Teams | Maintain brand consistency across projects automatically |

---

## Why It Matters

### The market reaction was correct
The April-16 rumor dropped Figma ~6% before any product existed. That wasn't a bet on the product being great — it was a bet on the *category* compressing. Claude Design confirms the thesis: the gap between "I have an idea" and "I have a working prototype" just collapsed.

### It's not a "prompt to website" toy
Similar tools (v0, Lovable, Bolt) ship code. Claude Design ships *design intent* — real design files, real collaboration, real handoff. It sits where Figma sits, not where v0 sits.

### Distribution is baked in
Every Claude Pro/Max/Team user got this overnight, for free. Anthropic just turned millions of existing subscribers into design-capable users without a single marketing dollar. That's the "distribution over production" thesis playing out in real time.

### The code handoff is the killer feature
"Rough idea to working prototype before anyone leaves the room" (Datadog). That's the loop Figma has been trying to close for years with DevMode. Anthropic closed it by owning both sides of the fence.

---

## Relevance to Andrew's Work

- **andrewdonato.com (DOC-013):** Claude Design can iterate the site faster than current workflow — especially for visual experiments
- **Building Out Loud (DOC-010):** This is a high-signal Watching episode — the rumor → ship → market-validation arc is perfect narrative
- **MSA (DOC-003):** Client-facing reports and pitch decks could be produced 10x faster — test it on the next luxury market intelligence report
- **Opus 4.7 thesis (DOC-050):** This is the productization of the "digital creation" capability that 4.7 added — good to track the thesis → product → adoption progression

---

## Open Questions

- How well does it actually handle brand consistency from a real codebase? Andrew should test on the MSA or andrewdonato.com repos.
- What's the ceiling on prototype complexity before it starts falling over?
- Does the Canva export preserve editability, or does it flatten?
- How does the code handoff handle existing component libraries vs. green-field?

---

## Try It Next

1. Open Claude Pro → enable Claude Design if not on already
2. Feed it the andrewdonato.com repo or the most recent MSA intelligence report
3. Ask it to redesign one piece end-to-end
4. Compare time-to-finished vs. the current workflow
5. If the gap is >2x, episode it
