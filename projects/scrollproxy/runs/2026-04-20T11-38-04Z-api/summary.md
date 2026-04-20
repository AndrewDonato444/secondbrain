# ScrollProxy — 2026-04-20 11:38 UTC

**Verdict**: mixed · **New**: 116 · **Seen**: 3 · **Model**: claude-sonnet-4-6

## Themes

- Opus 4.7 token cost discovery
- Claude Code internals & orchestration
- agentic coding tools (Codex, Grok Build)
- Claude Design vs Figma
- model competition (GPT-5.5, DeepSeek fundraise)
- AI adoption at work (Gallup 50%)
- agent infrastructure & memory

## Trends

### Emerging

- agentic coding tools (Codex, Grok Build) — first seen current

- AI adoption at work (Gallup 50%) — first seen current

- Claude Code internals & orchestration — first seen current

- model competition (GPT-5.5, DeepSeek fundraise) — first seen current

- Opus 4.7 token cost discovery — first seen current


### Fading

- AI model switching & positioning — last seen 2026-04-18T11-54-54Z, 4 runs ago

- Claude Code agentic pitfalls — last seen 2026-04-18T11-54-54Z, 4 runs ago

- compute scarcity & data center pushback — last seen 2026-04-18T11-54-54Z, 4 runs ago

- Opus 4.7 benchmarks & reception — last seen 2026-04-18T11-54-54Z, 4 runs ago

- Stripe agent payments — last seen 2026-04-18T11-54-54Z, 4 runs ago


## Worth clicking

1. [@simonw](https://x.com/simonw/status/2046029612820594962) — Simon Willison found Opus 4.7 uses 1.46x tokens for text and up to 3x for images vs 4.6 at the same per-token price — a real hidden cost anyone building on the API needs to know about.
2. [@simonw](https://x.com/simonw/status/2046065935786938378) — Important correction to the above: the 3x image cost only applies to high-res images, not standard ones, so the actual pricing impact depends heavily on your use case.
3. [@RoundtableSpace](https://x.com/RoundtableSpace/status/2046004667063366073) — Concrete user report of Opus 4.7 confidently sticking to wrong answers and forcing a rollback to 4.6 — relevant for anyone deciding whether to trust 4.7 in production agents.
4. [@RoundtableSpace](https://x.com/RoundtableSpace/status/2046019766511653298) — Claude Code reverse-engineered into a visual map of 512K lines and 1,900 files — useful for anyone trying to understand or extend the agent loop and tooling.
5. [@RoundtableSpace](https://x.com/RoundtableSpace/status/2045989567556190285) — Claude Code can now run free against open models (GLM 5.1, Gemma 4) — lowers the floor for indie devs experimenting with agentic coding without paying Anthropic.
6. [@kimmonismus](https://x.com/kimmonismus/status/2045990493884977368) — NSA is using Anthropic's Mythos Preview despite labeling Anthropic a 'supply chain risk' — a telling data point on government AI adoption and vendor trust tensions.
7. [@emollick](https://x.com/emollick/status/2046053467941163055) — Mollick argues o1-preview was the second most important LLM release ever and OpenAI gave away a massive strategic advantage by publishing it — good framing for thinking about openness vs. moat.
8. [@DataChaz](https://x.com/DataChaz/status/2045524286287269902) — Anthropic published a 33-page official guide on Claude Skills — actual blueprint worth reading if you're building Claude-native products.
9. [@signulll](https://x.com/signulll/status/2045928596884029496) — Sharp one-liner that captured 81K views: in the AI era, any roadmap beyond 30 days is dead weight — directly relevant to AI product strategy.

## Voices

- **@simonw** — Doing actual empirical work on Opus 4.7 token costs with a real tool — the kind of grounded analysis that cuts through hype.
- **@signulll** — Consistently sharp on distribution, product strategy, and agent-native thinking; the 30-day roadmap post and the 'systems must be reinvented for agents' thread are both on-point for the operator's interests.
- **@emollick** — Thoughtful on AI industry dynamics and strategic decisions by labs — the o1-preview framing is the kind of perspective useful for product positioning.

## Noise

52 posts skimmed as noise — @aakashgupta bulk-posting off-topic trivia (tennis longevity, NASA splashdown, Nolan film, Wolf of Wall Street, Ariana Grande), @RoundtableSpace crypto pump posts (AAVE exploit, Polymarket trading bots, 'GM CT' engagement bait), travel diary and motivational quote filler (@kimmonismus China flight, @DataChaz pressure quotes).

---

Raw posts: `~/SecondBrain/projects/scrollproxy/runs/2026-04-20T11-38-04Z-api/raw.json`

Summary JSON: `~/SecondBrain/projects/scrollproxy/runs/2026-04-20T11-38-04Z-api/summary.json`
