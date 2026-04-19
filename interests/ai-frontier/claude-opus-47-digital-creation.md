---
id: DOC-050
created: 2026-04-16
updated: 2026-04-16
type: knowledge
domain: ai-frontier
audience: personal
informs: [DOC-001, DOC-013, DOC-010, DOC-018]
status: active
---

# Claude Opus 4.7 — Launched April 16, 2026

**Source:** https://www.anthropic.com/news/claude-opus-4-7
**Status:** Live — available across all Claude products, API, Bedrock, Vertex AI, Microsoft Foundry

---

## What Shipped

Anthropic's new flagship generally available model. Positioned below the unreleased Mythos Preview but a significant step up from Opus 4.6.

### Key Upgrades

- **Software Engineering:** 13% improvement over Opus 4.6 on 93-task coding benchmarks. Solves tasks previous models couldn't. Better at long-running, complex tasks with strict instruction following.
- **Vision:** 98.5% visual-acuity benchmark vs. 54.5% for Opus 4.6. Supports up to 2,576px on the long edge (~3.75 megapixels) — 3x previous resolution. Reads dense screenshots, complex diagrams, chemical structures.
- **Digital Creation:** "More tasteful and creative" — produces higher-quality interfaces, slides, docs, dashboards. Production-ready design choices out of the box.
- **Instruction Following:** Substantially improved but stricter literal interpretation — prompts from older models may need adjustment.
- **Long-Context & Memory:** Better sustained reasoning over extended periods. Improved file-system-based memory across multi-session work.
- **New `xhigh` effort level:** Between high and max — finer control over reasoning vs. latency tradeoff.
- **Code Review:** 10%+ recall improvement with stable precision. New `/ultrareview` slash command in Claude Code.
- **Finance/Legal:** State-of-the-art on finance agent evals; 90.9% accuracy on BigLaw Bench.

### Pricing

Unchanged from Opus 4.6: **$5/M input tokens, $25/M output tokens.**

### Mythos Preview

Anthropic's most powerful model remains in limited release. More advanced cyber capabilities than Opus 4.7. New Cyber Verification Program for security researchers who want access.

---

## Market Impact (Pre-Launch)

The rumor alone moved markets before launch:
- Adobe, Wix, GoDaddy — stock declined
- Figma — ~6% drop

The market priced in category compression: if AI can produce professional websites and presentations from prompts, the design-tool category gets squeezed.

---

## Claude Design (Anthropic Labs) — Launched April 18, 2026

**Source:** https://www.anthropic.com/news/claude-design-anthropic-labs
**Access:** claude.ai/design (research preview, rolling out)

This is the product the market was reacting to. Anthropic shipped it as a standalone design tool under "Anthropic Labs."

### What It Does

Collaborative visual creation with Claude. Describe what you need → Claude generates it → refine through conversation, inline comments, direct edits, and custom adjustment controls.

### Capabilities
- **Inputs:** Text prompts, image uploads, documents (DOCX, PPTX, XLSX), codebase references, website element captures
- **Outputs:** Internal URLs, export to Canva, PDF, PPTX, or standalone HTML
- **Brand Integration:** Reads codebases and design files to auto-apply team design systems
- **Claude Code Handoff:** Packages designs into bundles for developer handoffs
- **Collaboration:** Org-scoped sharing with private, view-only, or edit access

### What People Are Using It For
Realistic prototypes, product wireframes, design explorations, pitch decks, marketing collateral, code-powered prototypes with voice/video/shaders/3D.

### Pricing
Included with Pro, Max, Team, and Enterprise subscriptions. Uses standard limits with optional extra usage.

---

## What This Means for Andrew

### Immediate
- **This is the model powering Claude Code right now.** The 13% coding improvement and better instruction following directly improve every build session — MSA, Facts Unlocked, AutoLinkedIn, all of it.
- **The vision upgrade is real.** 3x resolution means Claude can read dense screenshots, which matters for computer-use agents and any UI work.
- **`/ultrareview` in Claude Code** — new dedicated code review tool. Worth trying on MSA codebase.

### Claude Design
- **MSA pitch decks and one-pagers** — could generate client-facing materials directly from the product overview, auto-branded to Knox Brothers' design system.
- **andrewdonato.com (DOC-013)** — design iterations through conversation instead of code. Prototype layouts, export as HTML, hand off to Claude Code for implementation.
- **Building Out Loud** — the "Anthropic just spooked the design industry" episode now has the punchline: the product shipped 2 days later. Update the hook from "a rumor" to "it's live, here's what it does, and here's what it means for you."

### Building Out Loud
- The digital creation angle is fully validated — Claude Design is real and shipping.

### SDD Workflow (DOC-018)
- Better instruction following + long-context memory = SDD spec-first workflow should work more reliably. The model is better at holding specs in context and following them strictly during implementation.
- `xhigh` effort level could be useful for complex implement phases where you want deeper reasoning without max latency.
