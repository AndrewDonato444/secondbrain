---
id: DOC-062
created: 2026-04-18
updated: 2026-04-18
type: knowledge
domain: ai-frontier
status: active
---

# AI Frontier — Pulse

> Andrew's working thesis on where AI is going, what's noise, and which capability shifts actually change the operator surface area. ScrollProxy reads this to decide what's worth surfacing each morning.

---

## Thesis

The frontier is moving from *capability* to *deployment surface*. Foundation models are converging fast enough that "which model" is no longer a moat for most products — what matters now is how the capability gets packaged, who controls the prompt that calls it, and whose proprietary context it has. Coding got solved first because git gave every coding tool the same shared substrate. Knowledge work is fragmenting because there's no equivalent — every tool sees a tiny slice of you. The next durable category isn't "AI that does your job"; it's "AI that finally remembers everything you've done."

The other shift worth holding tight: production is collapsing toward zero marginal cost — code, design, video, copy, slides. Distribution and judgment are not. Anyone betting their moat on production capability is going to lose it inside 18 months.

---

## What I'm watching

- **Anthropic's product cadence** — Opus 4.7 (Apr 2026), Claude Design (Apr 2026), Mythos / Project Glasswing (long-running agent platform). The pattern: collapse a workflow into a conversation, ship it inside the existing Claude surface.
- **Agent platforms with persistence + sensor fusion** — SAR (Doug Dockery's build), Glasswing, anything moving past stateless chat into "presence."
- **The knowledge layer** — whoever builds the cross-tool context substrate that git is for code wins the next category. Notion, Glean, Mem, custom builds, MCP itself.
- **Model trust regression debates** — benchmark credibility is collapsing in real time (FakePsyho, Simon Willison takes). Worth tracking how operators recalibrate.
- **Vertical disruption thesis** (PeterDiamandis) — LLM companies systematically eating vertical SaaS to fund compute. If true, niche-specific data becomes the only durable moat.
- **Voices:** @kimmonismus, @bcherny, @simonw, @theo, @businessbarista, @aakashgupta, @PeterDiamandis, @gregisenberg, @zebriez, @andrewchen, @GergelyOrosz.

---

## What would change my mind

- A foundation model gap reopens that lasts >6 months and clearly compounds (would invalidate the convergence thesis).
- An open-source model from a non-frontier-lab actually catches Claude/GPT on agentic + tool-use benchmarks under real workloads.
- Knowledge-layer winners turn out to be the existing tool incumbents (Notion, Microsoft, Google) rather than new entrants.
- Distribution moats prove portable to AI-native challengers faster than I expect (pure speed-to-distribution beats incumbent UX trust).

---

## Open questions

- Is "managed agents" a real category or a feature of every existing product?
- What does sales-AI look like once the sycophancy default gets fixed (Greg Isenberg gap)?
- Is the $300/mo enterprise ceiling (GergelyOrosz) the real settling point or a temporary subsidy artifact?
- Does the operator-grade AI ever get good at "help me with my job" without the shared substrate landing first, or is the substrate a hard prerequisite?

---

## Recent shifts

- **2026-04-23** — OpenAI Workspace Agents launched: Codex-hosted agents embedded in Slack, handling recurring tasks autonomously. This is the "deployment surface > model capability" thesis playing out live — OpenAI is competing on where the agent lives (inside tools you already use), not on which model is smartest. Simultaneously, ChatGPT for Clinicians shipped free with GPT-5.4 — the first time a frontier lab has given away a vertical-specific product. The vertical disruption thesis (PeterDiamandis: LLM companies eating vertical SaaS to fund compute) just got a concrete data point. Both moves confirm the pattern: the frontier is moving from capability to deployment surface.
- **2026-04-22** — Claude Code pricing fumble: Anthropic removed Claude Code from the Pro plan, community backlash was immediate, revert within 24 hours. First empirical data point on AI tooling willingness-to-pay: the $20 on-ramp IS the product for power users; removing it kills the funnel, not conversions. simonw's warning holds — Codex will close fast if Anthropic fumbles the pricing layer. Confirmed as an A/B test accidentally rolled out globally.
- **2026-04-19** — X announced (effective 2026-04-20) dramatically cheaper "owned reads" API pricing — $0.001/request for your own posts, lists, bookmarks, likes, mentions. Collapses the cost of personal-knowledge tools built on top of social platforms (ScrollProxy is the obvious local case; Aligned News is the architectural reference). Bigger frame: platforms that previously made user-data extraction prohibitively expensive are starting to price for it, which makes the "personal vector DB over your own consumption" pattern economically viable for individuals — not just well-funded products. Worth watching whether other platforms follow.
- **2026-04-18** — Claude Design shipped (productizing Opus 4.7's digital creation). Confirms the "compress the whole workflow into a conversation" pattern Anthropic is running. Adds weight to the "production layer collapses, strategy layer holds" thesis.
- **2026-04-17** — Started taking the knowledge-layer framing (businessbarista) seriously enough to lift it into MSA's product overview. Coding-vs-knowledge-work substrate gap is now load-bearing in how I think about the next product wave.
- **2026-04-16** — Opus 4.7 launched. Confirmed Anthropic's lead on instruction following + long context. Not a category-defining jump, but the cadence is the story.

---

## Connected motions

- [LinkedIn Convergence queue](../../projects/linkedin-convergence/queue.md) — convergence posts often translate frontier shifts into GTM observations
- [Building Out Loud](../../projects/building-out-loud/series-overview.md) — "What I'm Watching" pillar pulls directly from this pulse
- [Modern Signal Advisory](../../projects/modern-signal-advisory/product-overview.md) — MSA's moat thesis (distribution + niche data) is a direct application of this pulse
- [Sales-Product Convergence pulse](../sales-product-convergence/pulse.md) — adjacent interest; AI frontier shifts are the *cause* of much of what convergence interest tracks
