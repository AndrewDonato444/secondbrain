---
id: DOC-034
created: 2026-04-11
updated: 2026-04-20
type: knowledge
domain: personal
status: active
informs: [DOC-001]
---

# ScrollProxy — Technical Spec

**Working name:** ScrollProxy
**Owner:** Andrew Donato
**Purpose:** A personal CLI tool that pulls posts from Andrew's curated X lists via the X API v2 Owned Reads endpoints, feeds them to Claude, and writes a structured summary to a destination of your choice (local markdown file for v1, Notion optional).
**Scope:** Personal tool. Single user. Runs locally. No multi-user, no auth server, no distribution.
**Code repo:** `~/AutoScroller/` (package name `scrollproxy`). Runtime data: `~/scrollproxy/`. Docs: `~/SecondBrain/projects/scrollproxy/`.

---

## 1. Goals

1. Replace passive scrolling with a deterministic "go read my feed for me" command.
2. Produce output that answers four questions every run:
   - What were the dominant themes in my feed right now?
   - Who posted something genuinely worth my attention?
   - What's new vs. stuff I've already seen in past runs?
   - What, if anything, should I actually click into and read myself?
3. Build cumulative memory across runs so the tool gets smarter about what to surface.
4. Stay cheap: operating cost under $5/month at steady state.

## 2. Non-goals (v1)

- No multiple platforms. X only.
- No GUI. CLI only.
- No cloud hosting. Runs on Andrew's Mac.
- No posting, replying, liking, or any write actions on X. Read-only.
- No multi-user. The OAuth bootstrap binds one X account to one developer app; that's it.
- No Notion/Obsidian integration required — local markdown output is first-class. Notion is a secondary writer if enabled.

## 3. Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Language | TypeScript (Node 20+) | Matches DonatoSkills conventions |
| X Data Access | X API v2 (Owned Reads endpoints) | $0.001/request, structured JSON, no scraping fragility |
| Auth | OAuth 2.0 User Context + PKCE | User access token rotates via `offline.access` refresh token |
| LLM | Anthropic Claude API (claude-sonnet-4-6) | Andrew already has keys + prompt patterns |
| Config | `config.yaml` at `~/scrollproxy/` | Hand-editable, no env gymnastics for a personal tool |
| Output (v1) | Local markdown files in `~/SecondBrain/projects/scrollproxy/runs/` | Commits directly to the brain repo alongside surfacings |
| State/memory | `~/scrollproxy/state/` — JSON files | Dedup cache by post ID, rolling themes across runs |
| Package manager | pnpm | Andrew's default |
| Runtime entry | `pnpm scroll` (default) or `pnpm scroll --dry-run` | One verb, one mode flag |

Operating cost at steady state (AI Frontier + GTM Convergence + Broad list at default `postsPerRun`, 4 runs/day): ~30k post reads/month. At Owned Reads pricing ($0.001/resource), that's **~$30/month in API reads** plus one Claude summarizer call per run (small). Under $5/month is achievable with careful `postsPerRun` tuning; $30/month is the realistic current-config number.

## 4. High-level architecture

```
┌─────────────┐   ┌────────────────┐   ┌──────────────┐   ┌─────────────┐   ┌──────────┐
│  CLI entry  │──▶│ X API source   │──▶│ List adapter │──▶│ Summarizer  │──▶│ Writer   │
│ (index.ts)  │   │ (parallel list │   │ (→ Extracted │   │ (Claude)    │   │ (md/...) │
│             │   │  + bookmarks)  │   │   Post[])    │   │             │   │          │
└─────────────┘   └────────────────┘   └──────────────┘   └─────────────┘   └──────────┘
                          │                    │                  ▲
                          ▼                    ▼                  │
                    ┌───────────┐        ┌──────────┐             │
                    │ API client│        │ State    │─────────────┘
                    │ (auth +   │        │ (dedup,  │
                    │  retry)   │        │  themes) │
                    └───────────┘        └──────────┘
```

Each box is its own module with a clean interface so components can be swapped. `Writer` is an interface with pluggable implementations (`markdownWriter` is the primary; `createNotionWriter` is optional). The API client, source, and adapter are the only X-API-aware modules — everything downstream operates on the source-agnostic `ExtractedPost[]` shape.

## 5. Project structure

```
AutoScroller/                                 # code repo (package name: scrollproxy)
├── src/
│   ├── index.ts                              # CLI shim — injects 'scroll' verb
│   ├── cli/
│   │   ├── index.ts                          # CLI dispatcher (scroll, replay)
│   │   ├── args.ts                           # Arg parser + --help
│   │   ├── scroll.ts                         # handleScroll — the main pipeline
│   │   └── replay.ts                         # handleReplay — re-summarize stored raw.json
│   ├── sources/
│   │   ├── xApiClient.ts                     # Auth + 401/429/5xx handling + refresh coalescing
│   │   ├── xListSource.ts                    # Parallel list pulls + optional bookmarks
│   │   └── xListAdapter.ts                   # X API v2 response → ExtractedPost
│   ├── config/
│   │   ├── schema.ts                         # Zod schema
│   │   ├── load.ts                           # File + CLI-flag config loading
│   │   └── defaults.ts
│   ├── state/
│   │   ├── dedup-cache.ts                    # Post-ID dedup, capped FIFO
│   │   └── rolling-themes.ts                 # Last-N-runs themes store
│   ├── summarizer/
│   │   └── summarizer.ts                     # Claude client + prompts + zod-validated output
│   ├── trends/
│   │   └── trend-detector.ts                 # Deterministic persistent/emerging/fading themes
│   ├── writer/
│   │   ├── writer.ts                         # Writer interface + runWriters orchestration
│   │   ├── markdown.ts                       # summary.md renderer
│   │   ├── notion.ts                         # Optional Notion writer
│   │   └── raw-json.ts                       # raw.json serialization + run IDs
│   ├── types/
│   │   └── post.ts                           # ExtractedPost + supporting interfaces
│   ├── lib/
│   │   ├── expandHomeDir.ts                  # ~-path expansion
│   │   └── repoRoot.ts                       # Resolve .env.local relative to repo root
│   ├── xAuth.ts                              # One-shot OAuth 2.0 PKCE bootstrap
│   ├── xRefresh.ts                           # Refresh-token rotation
│   ├── xExplore.ts                           # Endpoint-probe harness (dev tool)
│   └── xTestSource.ts                        # End-to-end source-layer validation harness
├── tests/
│   ├── foundation/                           # Core module tests
│   └── expansion/                            # Feature-level tests (trend detector, x-api-hardening, retire-playwright)
├── .specs/
│   └── features/                             # SDD feature specs
├── .env.local                                # OAuth credentials (gitignored)
└── package.json
```

## 6. Configuration

`config.yaml` lives at `~/scrollproxy/config.yaml`. Loaded once at startup, validated with zod.

```yaml
interests:
  - AI product strategy
  - distribution and indie dev
  - sales enablement

output:
  dir: ~/SecondBrain/projects/scrollproxy/runs   # run dirs commit to the brain
  state: ~/scrollproxy/state
  destinations: [markdown]                       # optionally add: notion

claude:
  model: claude-sonnet-4-6
  apiKey: sk-ant-…                                # inline is fine for a personal tool

x:
  baseUrl: https://api.x.com/2
  lists:
    - { id: "2046177478658461928", name: "AI Frontier",      tag: "ai-frontier",  postsPerRun: 50 }
    - { id: "2046179139355312577", name: "GTM Convergence",  tag: "convergence",  postsPerRun: 50 }
    - { id: "2046175185003286902", name: "Broad",            tag: "broad",        postsPerRun: 25 }
  bookmarks:
    enabled: false
    postsPerRun: 25
```

**Auth credentials** live separately in `~/AutoScroller/.env.local` (gitignored), populated by `pnpm x:auth`:

```
X_CLIENT_ID=…
X_CLIENT_SECRET=…
X_BEARER_TOKEN=…          # access token, rotates every ~2h
X_REFRESH_TOKEN=…         # rotates on each refresh
X_TOKEN_EXPIRES_AT=…      # ISO 8601
```

## 7. CLI interface

```bash
pnpm scroll                     # default — pull all configured lists, summarize, write
pnpm scroll --dry-run           # pull but don't write/summarize; prints per-list counts
pnpm scroll --config <path>     # override default config path
pnpm replay <run-id>            # re-summarize a stored raw.json from a past run

pnpm x:auth                     # one-time OAuth 2.0 PKCE bootstrap (run once per machine)
pnpm x:refresh                  # rotate access token via stored refresh_token
pnpm x:explore                  # endpoint-probe harness (dev diagnostic)
pnpm x:test-source              # end-to-end source-layer validation (no writes)
```

The `pnpm scroll` invocation is intentionally flag-minimal: the tool does one thing (`pull → adapt → summarize → write`), and the only optional knob is `--dry-run`. Configuration lives in `config.yaml`, not CLI flags.

## 8. Source layer (`src/sources/`)

Three focused modules, consumed only by `handleScroll`:

**`xApiClient.ts`** — the single HTTP chokepoint for X API calls. Responsibilities:

- Load the user access token from `.env.local` on first call; cache in memory for the run.
- Proactively refresh when the token is within 2 minutes of expiry (singleflight: concurrent callers coalesce into one refresh call so X's refresh-token rotation doesn't strand any request).
- On 401, refresh + retry once (same singleflight mechanism).
- On 429, respect `Retry-After` and `x-rate-limit-reset` headers.
- On 5xx, exponential backoff up to `MAX_RETRIES = 3`.

**`xListSource.ts`** — orchestrator. Reads `config.x.lists`, calls `GET /2/lists/{id}/tweets` for each list in parallel, optionally pulls `GET /2/users/{id}/bookmarks`. Returns a structured `XSourceResult` with per-list diagnostics so individual list failures don't kill the run.

**`xListAdapter.ts`** — maps the X API v2 response envelope (`data[]` + `includes.users[]` + `includes.media[]` + `includes.tweets[]`) into `ExtractedPost[]`. Resolves retweets by looking up the referenced tweet in `includes.tweets` and attributing authorship to the original poster (retweeter becomes `repostedBy`). Quoted tweets are V2-deferred.

All three are covered by `tests/expansion/x-api-hardening.test.ts` and `tests/expansion/retire-playwright.test.ts` with regression guards against production-invocation traps (refresh race, cwd-relative env paths, retweet attribution).

## 9. `ExtractedPost` — the canonical shape

**File:** `src/types/post.ts`

```ts
interface ExtractedPost {
  id: string;              // from the X API post id
  url: string;             // full https://x.com/user/status/id
  author: { handle: string; displayName: string; verified: boolean };
  text: string;
  postedAt: string | null; // ISO
  metrics: {
    replies: number | null;
    reposts: number | null;
    likes: number | null;
    views: number | null;
  };
  media: Array<{ type: 'image' | 'video' | 'gif'; url: string }>;
  isRepost: boolean;
  repostedBy: string | null;
  quoted: ExtractedPost | null;      // V2-deferred — always null from x-api adapter
  extractedAt: string;
  tickIndex: number;                  // position-in-batch; no scroll-tick meaning post-retirement
  sourceTag?: string;                 // list lane tag — e.g. "ai-frontier"
}
```

`sourceTag` carries the curated list's lane name through the pipeline. The summarizer can route by lens if desired; the writer can group by lens in future renderings.

## 10. State / dedup

**`src/state/dedup-cache.ts`**

- On disk: `~/scrollproxy/state/seen.json` — rolling set of the last 10,000 post IDs.
- On run: load → filter extracted posts into `newPosts` + `seenPosts` → write back capped at 10k (FIFO eviction).
- Already-seen posts still pass to the summarizer as a separate bucket so Claude can note "you've already been shown this take three times this week."

**`src/state/rolling-themes.ts`**

- Stores the top themes from the last 10 runs as `{ runId, endedAt, themes: string[] }`.
- Fed to the summarizer prompt so it can note "this theme is new" vs. "this has been bubbling for days."
- The `src/trends/trend-detector.ts` module consumes this deterministically (no API call) to render the `## Trends` section with persistent / emerging / fading categories.

## 11. Summarizer module

**File:** `src/summarizer/summarizer.ts`

Wraps `@anthropic-ai/sdk`. Single exported function `summarizeRun(input: SummarizerInput): Promise<SummarizerResult>`.

**Prompt philosophy:** Claude is framed as "a ruthlessly useful feed analyst for Andrew. Your job is not to summarize everything — it's to tell him what's actually worth his attention and what he can safely ignore. Bias toward signal. If the feed is mostly noise, say so."

**User prompt includes:** declared interests (from config), themes from the last N runs, the full extracted post list as JSON (text + author + metrics; media stripped), already-seen IDs with one-line recaps, and instructions to respond in strict JSON matching the output schema.

**Output schema** (`RunSummary`, zod-validated): `runMeta`, `themes[]` (name, summary, signalStrength 1-5, isNew, representative handles, example quote), `worthClicking[]`, `voices[]`, `noise`, `feedVerdict`. On zod validation failure, retry once with the error message appended before falling back to writing a `summary.error.json` stub.

## 12. Writer module

**File:** `src/writer/writer.ts`

```ts
interface Writer {
  readonly id: string;
  write(summary: RunSummary, context: WriteContext): Promise<WriteReceipt>;
}
```

**`markdownWriter`** (always enabled) writes `summary.md` to the run directory. `createNotionWriter(...)` is an optional second writer. Both run through `runWriters()` which collects receipts and surfaces failures without stopping the pipeline; as long as the markdown writer succeeds, the run is considered successful overall.

Each run produces three files in `~/SecondBrain/projects/scrollproxy/runs/{runId}/`:

1. `raw.json` — full adapted posts + run metadata + per-list pull diagnostics
2. `summary.json` — the validated `RunSummary` from Claude plus trend detection
3. `summary.md` — rendered for the operator

## 13. Orchestration (`handleScroll` in `src/cli/scroll.ts`)

```
 1. Parse CLI args (only --dry-run and --config are accepted).
 2. Load + validate config (zod rejects unknown fields in strict mode).
 3. Early-exit if config.x.lists is empty AND bookmarks.enabled is false.
 4. Generate a run ID from startedAt timestamp.
 5. pullFromXApi(config.x) — parallel list pulls + optional bookmarks.
 6. If every list errored and posts.length === 0: print errors, exit 1.
 7. If --dry-run: print summary line with "(dry-run)" marker, exit 0.
 8. writeRawJsonAndUpdateCache() — writes raw.json, splits new vs seen.
 9. runSummarizerAndWriters() — Claude call, trend detection, run writers.
10. Print summary line (ticks, posts, new/seen, themes, worth-clicking count, output paths).
11. Exit 0 if markdown writer succeeded; exit 1 otherwise.
```

No browser to close, no screenshot directory to clean up. Total wall time is typically 600ms for the pull + 15-30s for the Claude summarizer call.

## 14. Error handling rules

- **401 on X API:** one coalesced refresh + retry. If it still fails, throw (surface to user with token-refresh guidance).
- **429:** wait `Retry-After` or `x-rate-limit-reset`, retry up to `MAX_RETRIES`.
- **5xx:** exponential backoff, retry up to `MAX_RETRIES`. After that, throw with response body.
- **Partial list failure:** one list's error doesn't kill the run — the `ListPull` captures the error; if at least one list returned posts, summarize and write.
- **All lists errored:** print each error + exit 1 without running summarizer.
- **Claude API error:** retry once with backoff, then fall back to writing `raw.json` + `summary.error.json`.
- **Config invalid:** fail fast with zod's field-name message. No defaults-magic.
- **Missing / empty `config.x`:** print setup instructions pointer, exit 1.
- **Missing access token:** direct the operator to `pnpm x:auth`.

## 15. Testing

Personal tool, so light touch — but the test coverage is real:

- Unit tests for every module under `tests/foundation/` (dedup, rolling-themes, summarizer, markdown writer, raw-json writer, cli-entry, config-loader, replay, project-scaffold).
- Expansion tests under `tests/expansion/` for features that touch multiple modules (trend-detector, notion-writer, writer-interface, x-api-hardening, retire-playwright).
- 230 passing tests + 4 skipped as of the Playwright retirement (2026-04-20).
- No live-X e2e tests — `pnpm x:test-source` is the manual validation harness.

## 16. Build phases (historical record)

- **Phase 1 (April 2026):** X API migration — OAuth bootstrap, source layer, CLI wiring, list curation. Shipped `cf477ad`.
- **Phase 2 (April 2026):** Production hardening — retweet attribution, refresh race fix, cwd-relative env resolution. SDD feature, shipped `91eb3d9`.
- **Phase 3 (April 2026):** Playwright retirement — deletion of the DOM-scraping source layer, CLI simplification, type relocation, schema softening. SDD feature, shipped `67ee868`. Code-review follow-up `9825e5e` strengthened tests and removed the `VisionStats` shim.

## 17. Success criteria

Within two weeks of first real use, Andrew should be able to say:

- "I have not opened the X app on my phone in 7 days."
- "I haven't missed anything I would have wanted to see."
- "The daily markdown file has surfaced at least one thing I actually clicked through and was glad I did."

If those three are true, the tool earns its keep. Everything else is polish.

## 18. Appendix — Historical architecture (retired 2026-04-20)

Prior to April 2026, ScrollProxy used Playwright to launch Chrome via CDP, log into X with a persistent user-data-dir profile, scroll `x.com/home` with jittered mouse-wheel ticks for a configurable duration (`scroll.minutes`), extract posts by DOM selectors (`article[data-testid="tweet"]`), and optionally fall back to Claude Vision when selector failure ratios crossed a threshold. That implementation was retired when X announced the Owned Reads pricing update (effective 2026-04-20) making API-based reads economically viable for a personal tool. The migration is documented end-to-end in `projects/scrollproxy/migration-2026-04-x-api.md` (DOC-067), and the feature specs for the hardening + retirement work live in `~/AutoScroller/.specs/features/expansion/{x-api-hardening,retire-playwright}.feature.md`.

The historical code (scroller, DOM extractor, vision fallback, login flow) is available in git history at AutoScroller commits prior to `67ee868`. Nothing currently runs it.
