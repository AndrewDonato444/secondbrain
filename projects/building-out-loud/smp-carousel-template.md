# Steal My Prompt — Carousel Template

> Reference for producing TikTok carousel packages. When asked "Next SMP: [prompt]", use this structure every time.

---

## Request format

"Next SMP: [prompt name or description]"

Produces: 6 slide texts + caption + pinned comment + title + 4 hashtag options.

---

## Slide structure

| # | Type | Purpose | Length |
|---|------|---------|--------|
| 1 | Hook | Pattern interrupt. Forces the swipe. No explanation. | 1 line |
| 2 | Problem | Name the friction. Short, punchy. Keep curiosity gap open. | 2–3 lines |
| 3 | The flip | One-line turn. What's different. Still no prompt yet. | 1 line |
| 4 | The prompt | The actual payload. ChatGPT/Claude screenshot. Prompt text verbatim. | Prompt only |
| 5 | What you get back | Example output shape — short list or 1-sentence description. ChatGPT/Claude screenshot. | 3–5 bullets |
| 6 | CTA | Save + one open question that drives comments. | 2 lines |

---

## Screenshot slides (4 + 5)

- **Slide 4:** Screenshot of real ChatGPT or Claude UI with the prompt typed in the input box.
- **Slide 5:** Screenshot of the actual AI response (first few questions/outputs). Crop to what's visually clean — not the full page.
- **No fake UIs.** If the screenshot isn't real, credibility dies.

---

## Visual system (locked — do not re-decide)

- **Background:** Warm cream paper texture — `bg-cream.png`. Reuse same file every episode.
- **Primary text:** `#1A1A1A` (warm black) on all text slides.
- **Accent color:** One only. Options: rust `#B85C3A` / dusty blue `#4A6B7C` / deep olive `#5C6B3F`.
- **Font:** Same font, two weights max (regular + bold).
- **Page counter:** Bottom-right, every slide. Format: `1/6`, `2/6`, etc.
- **Text position:** Consistent slide to slide. Don't move the anchor.

---

## Voice rules (short version)

- Fragments are fine. Dashes over commas. Real point lands in the back half.
- Never sanitize. No filler. No "it's worth noting." No stacked bullet takeaways at the end.
- No AI defaults: no "at the end of the day," no "here's the bottom line."
- Slide 1 is the whole game — if it doesn't pattern-interrupt in 1.5 seconds, rewrite it.

---

## Caption pattern

```
[Full prompt in plain text — copyable without OCR]

[One sentence of context or framing]

[Open question that invites a specific comment — not "thoughts?"]
```

---

## Pinned comment pattern

```
[2–3 variations on the core prompt — same pattern, different lens or intensity]

Each variation on its own line. Label optional.
```

---

## Title formula

Default shape: `[Contrarian statement about AI / what people do wrong]`

Best performers:
- "You're using ChatGPT backwards"
- "Stop asking ChatGPT questions. Do this instead."
- "The [X] prompt nobody uses"

Contains "ChatGPT" or "AI" for search discovery.

---

## Hashtags (standard set)

`#chatgpt #ai #aiprompts #promptengineering #claude #aitools`

Swap 1–2 if the prompt has a specific domain angle (e.g. `#sales`, `#leadership`, `#writing`).

---

## Post checklist

- [ ] Slide 1 pattern-interrupts in 1.5 seconds
- [ ] Slides 4 + 5 are real screenshots, not text-on-slide fakes
- [ ] Caption has full prompt in plain text for copy-paste
- [ ] Pinned comment has 2–3 variations
- [ ] Title contains "ChatGPT" or "AI"
- [ ] Pushed to TT as draft (Zernio or manual) → publish from phone (no API post — dampening)
- [ ] Move prompt from `## Steal My Prompt — Backlog` to `## Posted` in episode master.md
