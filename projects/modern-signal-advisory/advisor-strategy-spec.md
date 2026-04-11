---
id: DOC-005
created: 2026-04-10
updated: 2026-04-10
type: knowledge
domain: msa
source_intake: inbox/2026-04-09-claude-advisor-strategy.md
audience: personal
depends-on: [DOC-003]
extends: [DOC-007]
status: active
synced-to: []
---

# MSA Advisor Strategy Spec

## Context

Anthropic released the **advisor tool** as a beta API feature (beta header: `advisor-tool-2026-03-01`). It's a built-in server-side tool — not something you build yourself. You add it to your `tools` array, set Sonnet (or Haiku) as the executor and Opus as the advisor, and the executor decides when to consult Opus on its own. The advisor sees the full conversation transcript automatically. Everything happens inside a single API request — no extra round trips, no custom orchestration.

**Source:** https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool

This spec describes how to apply this pattern to MSA's four-product pipeline to get near-Opus intelligence at Sonnet cost.

---

## The Pattern

```
┌─────────────────────────────────────────────┐
│                  EXECUTOR                    │
│              Sonnet (or Haiku)               │
│           Runs every turn / loop             │
│                                              │
│  • Data collection                           │
│  • Formatting & templating                   │
│  • Routine content generation                │
│  • Voice filtering passes                    │
│  • Property data lookups                     │
│  • Structured output assembly                │
│                                              │
│         ┌──── Tool Call ────┐                │
│         │                   ▼                │
│         │           ┌──────────────┐         │
│         │           │   ADVISOR    │         │
│         │           │    Opus      │         │
│         │           │  On-demand   │         │
│         │           └──────┬───────┘         │
│         │                  │                 │
│         │         Sends advice back          │
│         │         (reviews shared context)   │
│         └──────────────────┘                 │
│                                              │
│  ┌─────────────────────────────┐             │
│  │      SHARED CONTEXT         │             │
│  │  Conversation + tools +     │             │
│  │  files + accumulated data   │             │
│  └─────────────────────────────┘             │
└─────────────────────────────────────────────┘
```

**Key mechanic:** The advisor isn't running constantly. The executor calls it like any other tool — but this one is server-side and takes no input. Anthropic forwards the full transcript to Opus automatically, Opus sends back concise advice (typically 400-700 tokens), and the executor continues. All within a single API request.

---

## How This Maps to MSA's Four Products

### Signal Report (Market Intelligence)

This is the biggest win. Signal Reports involve data collection, analysis, insight generation, competitive positioning, and narrative writing — very different cognitive loads.

| Task | Model | Why |
|------|-------|-----|
| Fetch transaction data from APIs | Haiku | Mechanical. Just format the request, parse the response. |
| Clean / normalize market data | Sonnet | Light reasoning about data quality, deduplication. |
| Generate market narrative sections | Sonnet | Competent writer, handles structured content well. |
| **Identify non-obvious market insights** | **Opus (advisor)** | This is where the report goes from "data summary" to "intelligence." Opus sees patterns Sonnet misses. |
| **Competitive positioning analysis** | **Opus (advisor)** | Requires synthesizing multiple data points into strategic recommendations. The high-value thinking. |
| **Final quality review** | **Opus (advisor)** | One pass at the end: "Is this report actually good? Does it read like a $1,000/month product?" |
| Format into final deliverable | Sonnet | Template assembly, PDF layout. Mechanical. |

**Escalation trigger for executor:** Before generating the insight and competitive analysis sections, the executor calls the advisor with the full accumulated data context and asks: "Given this market data, what are the 3-5 non-obvious insights a luxury broker would actually find valuable? What competitive dynamics are at play?" The advisor responds, and the executor weaves those insights into the report.

---

### Signal Studio (Content Generation)

Content generation is mostly Sonnet-grade work, but the *strategy* behind the content benefits from Opus.

| Task | Model | Why |
|------|-------|-----|
| Generate social posts from report data | Sonnet | Good at structured content generation. |
| Apply voice profile filtering | Sonnet | Pattern matching against a voice template. |
| **Content strategy per persona** | **Opus (advisor)** | "For a buyer persona who's a tech executive relocating from SF to Miami, what angle actually resonates?" This is strategic thinking. |
| **Quality gate: does this sound human?** | **Opus (advisor)** | Quick check — "Would a real luxury broker post this? Is it too generic?" |

**Escalation trigger:** Before generating a content batch, executor calls advisor with the persona definition and asks for a strategic angle. After generation, executor calls advisor for a human-quality check.

---

### Signal Forecast (Property Scoring)

Mostly mechanical — this is the product that needs Opus the *least*.

| Task | Model | Why |
|------|-------|-----|
| Fetch property data | Haiku | API call, parse response. |
| Run 5-factor scoring model | Sonnet | Structured analysis against defined criteria. |
| Generate Signal Ratings | Sonnet | Apply scoring rules, output ratings. |
| Generate advisory brief | Sonnet | Short narrative output from structured data. |
| **Edge case: unusual property or thin data** | **Opus (advisor)** | When the data is sparse or the property doesn't fit clean categories, Opus decides how to handle it gracefully rather than producing a bad score. |

**Escalation trigger:** Only when the executor detects data quality issues (missing comps, unusual property type, conflicting signals). Most forecasts never need Opus.

---

### Signal Voice (Voice Filtering)

This is a cross-cutting concern — it runs on outputs from the other products.

| Task | Model | Why |
|------|-------|-----|
| Apply voice profile to content | Sonnet | Pattern matching and rewriting. Sonnet handles this well. |
| **Voice profile creation / calibration** | **Opus (advisor)** | When onboarding a new agent and building their voice profile from samples, Opus does the nuanced analysis of tone, vocabulary, sentence structure. This happens once, not on every request. |
| **"Does this still sound like them?" audit** | **Opus (advisor)** | Periodic check, not every pass. Maybe every 10th generation or on a schedule. |

**Escalation trigger:** Voice profile creation (one-time, high-stakes), and periodic quality audits (not every generation).

---

## Implementation Approach

**Big simplification from the official docs:** The advisor tool is a built-in server-side tool. You don't build a custom tool, don't manage a second API call, and don't pass context manually. Anthropic handles all of it inside a single `/v1/messages` request. The executor decides when to call the advisor on its own, like any other tool.

### Step 1: Add the Advisor Tool to Your API Calls

It's one object in the `tools` array. That's it.

```typescript
// Add to your existing Claude API call for any MSA pipeline step
const tools = [
  // The advisor — this is the entire setup
  {
    type: "advisor_20260301",
    name: "advisor",
    model: "claude-opus-4-6",
    max_uses: 3,  // cap per request — adjust per product
  },
  // Your existing MSA tools (data fetching, etc.)
  {
    name: "fetch_market_data",
    description: "Fetch transaction data for a market area",
    input_schema: { /* ... your existing schema ... */ }
  },
  // ... other tools
];

const response = await anthropic.beta.messages.create({
  model: "claude-sonnet-4-6",        // Sonnet is the executor
  max_tokens: 4096,
  betas: ["advisor-tool-2026-03-01"], // Required beta header
  tools: tools,
  system: SYSTEM_PROMPT,              // See Step 2
  messages: messages,
});
```

**Key details:**
- `model` at the top level is your executor (Sonnet). The `model` inside the advisor tool is Opus.
- `max_uses` caps advisor calls per request. Set this per product (see cost controls below).
- The beta header `advisor-tool-2026-03-01` is required.
- Valid pairs: Haiku→Opus, Sonnet→Opus, Opus→Opus. The advisor must be ≥ the executor.

### Step 2: System Prompt — Tell the Executor When to Consult

The executor decides when to call the advisor based on your system prompt. This is where you encode MSA-specific escalation logic.

**Recommended system prompt prefix for MSA (prepend to your existing system prompts):**

```text
You have access to an `advisor` tool backed by a stronger reviewer model. It takes NO parameters — when you call advisor(), your entire conversation history is automatically forwarded. The advisor sees the task, every tool call you've made, every result you've seen.

Call advisor BEFORE substantive work — before writing report sections, before generating content, before committing to an analysis. If the task requires data gathering first (fetching market data, pulling comps, loading voice profiles), do that first, then call advisor. Data gathering is not substantive work. Writing insights, competitive analysis, and content strategy ARE.

Also call advisor:
- When you believe the task is complete — for a final quality check before delivering to the broker.
- When data is sparse, conflicting, or unusual — the advisor handles edge cases better.
- When generating insights or competitive positioning — this is where the advisor adds the most value.

The advisor should respond in under 100 words and use enumerated steps, not explanations.

Give the advice serious weight. If you follow a step and it fails empirically, adapt. If you have data pointing one way and the advisor points another, surface the conflict in one more advisor call.
```

### Step 3: Context Is Automatic

This is the biggest simplification. **You don't pass context to the advisor.** When the executor calls the advisor:

1. Executor emits a `server_tool_use` block with `name: "advisor"` and empty `input`
2. Anthropic runs Opus server-side, passing the executor's **full transcript** — system prompt, all tool definitions, all prior turns, all tool results
3. Opus's advice returns as an `advisor_tool_result` block
4. Executor continues, informed by the advice

All within a single API request. No extra round trips on your side. The advisor sees everything the executor has seen — market data fetched, voice profiles loaded, previous outputs generated.

### Step 4: Handle the Response

The response includes advisor blocks interleaved with normal content:

```json
{
  "role": "assistant",
  "content": [
    { "type": "text", "text": "I've gathered the market data. Let me consult the advisor on insights." },
    { "type": "server_tool_use", "id": "srvtoolu_abc123", "name": "advisor", "input": {} },
    {
      "type": "advisor_tool_result",
      "tool_use_id": "srvtoolu_abc123",
      "content": {
        "type": "advisor_result",
        "text": "1. The 18% YoY price decline in waterfront properties masks a flight to newer construction. 2. Three listings from the same developer suggest distressed inventory..."
      }
    },
    { "type": "text", "text": "Based on this analysis, here are the key market insights..." }
  ]
}
```

**Critical for multi-turn:** Pass the full assistant content (including `advisor_tool_result` blocks) back to the API on subsequent turns. If you strip them out, the API returns a `400` error.

### Step 5: Cost Controls

**Per-request cap** — use `max_uses` on the tool definition:

```typescript
// Different caps per product pipeline
const ADVISOR_CONFIG = {
  signal_report:   { max_uses: 3 },  // insight, competitive, final QA
  signal_studio:   { max_uses: 2 },  // strategy, quality gate
  signal_forecast: { max_uses: 1 },  // edge cases only
  signal_voice:    { max_uses: 1 },  // profile creation or audit
};
```

When `max_uses` is hit, further advisor calls return `error_code: "max_uses_exceeded"` and the executor continues without advice. The request doesn't fail.

**Conversation-level cap** — there's no built-in one. Track advisor calls client-side. When you hit your budget, remove the advisor tool from `tools` AND strip all `advisor_tool_result` blocks from message history.

**Cost tracking** — advisor tokens are reported separately in `usage.iterations[]`:

```json
{
  "usage": {
    "input_tokens": 412,
    "output_tokens": 531,
    "iterations": [
      { "type": "message", "input_tokens": 412, "output_tokens": 89 },
      { "type": "advisor_message", "model": "claude-opus-4-6", "input_tokens": 823, "output_tokens": 1612 },
      { "type": "message", "input_tokens": 1348, "output_tokens": 442 }
    ]
  }
}
```

Top-level `usage` is executor-only. Advisor tokens are in iterations with `type: "advisor_message"` and billed at Opus rates. Build logging around this.

### Step 6: Enable Caching for Long Pipelines

For Signal Report (which will likely have 3+ advisor calls per conversation), enable advisor-side prompt caching:

```typescript
{
  type: "advisor_20260301",
  name: "advisor",
  model: "claude-opus-4-6",
  max_uses: 3,
  caching: { type: "ephemeral", ttl: "5m" },  // or "1h" for longer pipelines
}
```

This caches the advisor's transcript between calls so each subsequent call only pays for the new tokens. Breaks even at ~3 calls, saves more after that. Don't enable for Signal Forecast (usually 0-1 advisor calls).

**Important:** If you're using extended thinking, set `clear_thinking` to `keep: "all"` — otherwise the advisor's cached context shifts each turn and you lose the cache savings.

### Step 7: Combine with Other Tools

The advisor composes naturally with your existing MSA tools in the same `tools` array:

```typescript
const tools = [
  { type: "advisor_20260301", name: "advisor", model: "claude-opus-4-6", max_uses: 3 },
  { name: "fetch_market_data", description: "...", input_schema: { /* ... */ } },
  { name: "fetch_property_comps", description: "...", input_schema: { /* ... */ } },
  { name: "load_voice_profile", description: "...", input_schema: { /* ... */ } },
  { name: "generate_pdf_report", description: "...", input_schema: { /* ... */ } },
];
```

The executor can fetch data, consult the advisor, then generate the report — all in the same turn. The advisor's plan informs which tools the executor reaches for next.

### Effort Setting Optimization

For maximum cost savings on non-critical pipelines, pair Sonnet at **medium effort** with Opus advisor:

```typescript
// Signal Forecast — cost-optimized, advisor only for edge cases
const response = await anthropic.beta.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 4096,
  betas: ["advisor-tool-2026-03-01"],
  effort: "medium",  // cheaper Sonnet execution
  tools: [
    { type: "advisor_20260301", name: "advisor", model: "claude-opus-4-6", max_uses: 1 },
    // ... forecast tools
  ],
  messages: messages,
});
```

For Signal Report (quality matters most), keep executor at default effort.

---

## Cost Model

### How Billing Works

This is important: the advisor tool doesn't make separate API requests. It runs inside a single `/v1/messages` call, but billing splits by model:

- **Executor tokens** (Sonnet) — all the data fetching, narrative writing, formatting. Billed at Sonnet rates. This is the bulk of the output.
- **Advisor tokens** (Opus) — typically 400-700 text tokens per call, ~1,400-1,800 total including thinking. Billed at Opus rates. This is the small, high-value slice.

The cost savings come from Opus NOT generating your full final output. Opus gives a plan or insight (short), Sonnet writes the actual report (long) at its lower rate.

### Estimated Savings by Product

**Signal Report (biggest impact):**
- Before: all Opus for every step → expensive
- After: Sonnet does 80% of the work, Opus called 2-3 times for insights + competitive + QA
- Advisor output per call: ~500-700 tokens at Opus rates
- Report output: ~3,000-5,000 tokens at Sonnet rates
- Enable advisor caching (`ttl: "5m"`) — breaks even at 3 calls, saves on subsequent ones

**Signal Forecast (most savings):**
- Most forecasts: Sonnet only, 0 advisor calls
- Edge cases: 1 advisor call
- Could run Sonnet at medium effort for additional savings

**Signal Studio:**
- 1-2 advisor calls per content batch (strategy + quality gate)
- Content generation itself all at Sonnet rates

**Signal Voice:**
- Profile creation: 1 advisor call (one-time, high-value)
- Runtime filtering: Sonnet only

### Where NOT to Cut

- Voice profile creation — one-time, quality matters enormously, this is what makes content sound like the broker
- Final quality review on Signal Reports — this is the difference between a $1,000/month product and a free tool
- Competitive positioning analysis — this is the insight layer that brokers are actually paying for

---

## How This Connects to Managed Agents

The advisor strategy and the managed agents infrastructure (from the April 8 announcement) are complementary:

- **Managed agents** handle orchestration, error recovery, long-running sessions, and multi-agent coordination
- **Advisor strategy** is a specific pattern you run *within* that infrastructure — it's about which model does what

You could combine them: a managed Sonnet executor agent that delegates sub-tasks to other managed agents (Research Agent, Content Agent, etc.), all of which share context and can escalate to an Opus advisor tool when they hit complex decisions.

This is the play: managed agents reduce your custom orchestration code, advisor strategy reduces your API spend, and together they let you run a multi-agent pipeline that's both cheaper and more maintainable than what you have now.

---

## Rollout Plan

### Phase 1: Signal Report Only
- Implement the advisor tool on Signal Report pipeline
- Current pipeline: all calls go to the same model
- New pipeline: Sonnet handles data + narrative, Opus handles insights + competitive + QA
- A/B test: run 10 reports each way, compare quality and cost
- Measure: cost per report, broker satisfaction (if you have feedback loops), output quality (manual review)

### Phase 2: Extend to Signal Studio
- Add advisor escalation for content strategy and quality gating
- Lower stakes than Signal Report — good place to test how aggressive you can be with Sonnet-only

### Phase 3: Signal Forecast + Signal Voice
- Forecast: implement edge-case-only escalation
- Voice: use Opus for profile creation, Sonnet for runtime filtering
- These should be mostly cost savings with minimal quality risk

### Phase 4: Combine with Managed Agents
- Migrate the advisor-strategy pipeline onto managed agents infrastructure
- Replace custom orchestration code with Anthropic's coordination layer
- This is the big architectural win — less code to maintain, better reliability

---

## Open Questions for the MSA Agent

1. **What model is MSA currently using for each pipeline step?** Need to know the baseline before optimizing.
2. **What does the current orchestration code look like?** How many custom agent coordination files would the managed agents infrastructure replace?
3. **Is there already cost tracking per API call?** If not, add that first — can't optimize what you can't measure.
4. **What's the current per-report API cost?** Need a baseline number to measure savings against.
5. **Are there quality metrics for reports?** Any broker feedback or satisfaction data that could serve as a quality benchmark for A/B testing?
