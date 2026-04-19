---
id: DOC-035
created: 2026-04-12
updated: 2026-04-12
type: knowledge
domain: personal
status: active
informs: [DOC-001, DOC-010]
---

# urcooked.ai

## The Concept

A simple, fun web tool. You type in your job title and describe what you actually do day-to-day. It returns a "cooked score" — how likely AI is to disrupt your role — plus actionable advice on what to do about it.

**URL:** urcooked.ai

## How It Works

1. User enters their job title
2. User describes their actual daily tasks (free text)
3. Claude analyzes the tasks against AI capability trajectories
4. Returns:
   - A "cooked score" (0-100 or a tier like "lightly toasted" → "fully cooked")
   - Brief breakdown of which tasks are most at risk
   - 2-3 concrete things they can do to be less cooked
5. Shareable result card (drives virality)

## Why This Works

- **Viral mechanic:** People love sharing personality/assessment results. "I'm 73% cooked" is inherently shareable
- **The name is perfect:** Internet-native, funny, memorable, low-friction to share
- **Real value underneath the joke:** The advice layer makes it more than a gimmick
- **SEO/content magnet:** "Is [job title] going to be replaced by AI" is a massive search query category
- **Lead gen potential:** Collect emails for a "weekly AI job market update" or similar

## Tone

Funny but not cruel. The vibe is a friend who's being real with you, not a doomer. The advice should genuinely help — "you're cooked" is the hook, "here's how to un-cook yourself" is the value.

## Build Considerations

- Could be a single-page app — Next.js, one input form, one result screen
- Claude API on the backend for the analysis
- Shareable OG image generation for result cards
- No auth needed for v1 — just use it
- Could ship in a weekend
