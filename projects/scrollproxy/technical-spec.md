---
id: DOC-034
created: 2026-04-11
updated: 2026-04-19
type: knowledge
domain: personal
status: active
informs: [DOC-001]
---

# ScrollProxy — Technical Spec

**Working name:** ScrollProxy
**Owner:** Andrew Donato
**Purpose:** A personal CLI tool that logs into X on your behalf, scrolls your home feed for N minutes, extracts what was there, and writes a structured summary to a destination of your choice (local markdown file for v1, Notion later).
**Scope:** Personal tool. Single user. Runs locally. No multi-user, no auth server, no distribution.

-----

## 1. Goals

1. Replace passive scrolling with a deterministic "go read my feed for me" command.
1. Produce output that answers four questions every run:
   - What were the dominant themes in my feed right now?
   - Who posted something genuinely worth my attention?
   - What's new vs. stuff I've already seen in past runs?
   - What, if anything, should I actually click into and read myself?
1. Build cumulative memory across runs so the tool gets smarter about what to surface.
1. Ship a working v1 in a single weekend.

## 2. Non-goals (v1)

- No multiple platforms. X only.
- No GUI. CLI only.
- No cloud hosting. Runs on Andrew's Mac.
- No posting, replying, liking, or any write actions on X. Read-only.
- No credential storage. Session persistence via Chrome user data dir only.
- No Notion/Obsidian integration in v1 — local markdown output only. Hooks designed so v2 can add them without refactor.

## 2b. X API "Owned Reads" Update (April 2026)

**As of April 20, 2026**, X announced dramatically cheaper API pricing for reading your own data:

- **$0.001 per request** for owned reads (your own posts, bookmarks, followers, likes, lists, etc.)
- Key endpoints now available cheaply:
  - `GET /2/users/{id}/owned_lists` — fetch your curated lists
  - `GET /2/users/{id}/followed_lists` — lists you follow
  - `GET /2/users/{id}/list_memberships` — lists you're on
  - `GET /2/users/{id}/bookmarks` — your saved posts
  - `GET /2/users/{id}/liked_tweets` — your likes
  - `GET /2/users/{id}/tweets` — your own posts
  - `GET /2/users/{id}/mentions` — mentions of you

**What this changes for ScrollProxy:**

The original spec used Playwright browser automation to scroll the feed and scrape the DOM. That approach is fragile (selectors break when X changes the DOM), slow, risky (bot detection), and doesn't return structured data.

The X API approach is:
1. **Curate X lists** of accounts you care about (AI frontier, builders, sales leaders, etc.)
2. **Pull posts from those lists via API** → structured JSON with full metadata (text, author, engagement metrics, timestamps)
3. **Feed to Claude** for summarization
4. **Output** structured markdown summary

**Cost estimate:** ~100 requests/day × $0.001 = **$0.10/day, ~$3/month.** Negligible.

**Note:** Write endpoints went up ($0.015/post, $0.20 for URLs) and API likes/follows/quote-posts were removed for self-serve tiers. None of this affects ScrollProxy since it's read-only.

**Reference:** Robert Scoble's Aligned News (alignednews.com) uses a similar architecture — 63 curated X lists, 100K+ accounts, XPlugin pulls posts into a Weaviate vector database, Claude-like agent synthesizes signal. ScrollProxy is the personal-scale version of this pattern.

## 3. Stack (Revised)

| Layer | Choice | Reason |
|-------|--------|--------|
| Language | TypeScript (Node 20+) | Matches DonatoSkills conventions |
| X Data Access | X API v2 (Owned Reads) | Structured JSON, $0.001/request, no scraping fragility |
| ~~Browser automation~~ | ~~Playwright~~ | **Removed** — X API replaces DOM scraping entirely |
| LLM | Anthropic Claude API (claude-sonnet-4-6) | Andrew already has keys + prompt patterns |
| Config | `config.yaml` at project root | Hand-editable, no env gymnastics for a personal tool |
| Output (v1) | Local markdown files in `~/scrollproxy/runs/` | Zero dependencies, trivially portable |
| State/memory | `~/scrollproxy/state/` — JSON files | Dedup cache, seen-post hashes, rolling themes |
| Package manager | pnpm | Andrew's default |
| Runtime entry | `pnpm start` or `pnpm scroll -- --minutes 10` | Simple CLI |

## 4. High-level architecture

```
┌─────────────┐   ┌──────────────┐   ┌─────────────┐   ┌──────────────┐   ┌──────────┐
│  CLI entry  │──▶│ Scroller     │──▶│ Extractor   │──▶│ Summarizer   │──▶│ Writer   │
│  (index.ts) │   │ (Playwright) │   │ (DOM parse) │   │ (Claude API) │   │ (md/...) │
└─────────────┘   └──────────────┘   └─────────────┘   └──────────────┘   └──────────┘
                                            │                  ▲
                                            ▼                  │
                                      ┌───────────┐             │
                                      │  State    │─────────────┘
                                      │  (dedup,  │
                                      │  history) │
                                      └───────────┘
```

Each box is its own module with a clean interface so components can be swapped. In particular, `Writer` must be an interface with pluggable implementations (`MarkdownWriter` in v1, `NotionWriter` later).

## 5. Project structure

```
scrollproxy/
├── src/
│   ├── index.ts                 # CLI entry, arg parsing, orchestration
│   ├── config.ts                # Config loader + schema (zod)
│   ├── scroller/
│   │   ├── browser.ts           # Playwright context setup, persistent profile
│   │   ├── xScroller.ts         # X-specific scroll loop
│   │   └── scrollStrategy.ts    # Timing, jitter, pause logic
│   ├── extractor/
│   │   ├── xExtractor.ts        # DOM selectors + extraction for X
│   │   └── types.ts             # ExtractedPost shape
│   ├── summarizer/
│   │   ├── claudeClient.ts      # Anthropic API wrapper
│   │   ├── prompts.ts           # All prompts in one file
│   │   └── schema.ts            # Zod schema for Claude's JSON output
│   ├── state/
│   │   ├── seenPosts.ts         # Dedup by post ID hash
│   │   └── rollingThemes.ts     # Last N runs of themes for "new vs known"
│   ├── writers/
│   │   ├── writer.ts            # Writer interface
│   │   └── markdownWriter.ts    # v1 implementation
│   └── utils/
│       ├── logger.ts
│       └── time.ts
├── config.yaml
├── package.json
├── tsconfig.json
└── README.md
```

## 6. Configuration

`config.yaml` at repo root. Loaded once at startup, validated with zod.

```yaml
scroll:
  minutes: 10                    # default run length
  maxPosts: 400                  # hard cap on extracted posts per run
  scrollPauseMs: [1200, 2800]    # random pause range between scrolls
  idleTimeoutMs: 8000            # bail if no new content loads for this long

browser:
  userDataDir: ~/scrollproxy/chrome-profile
  headless: false                # false for v1 so you can see it working
  viewport: { width: 1280, height: 900 }

anthropic:
  model: claude-sonnet-4-6
  maxTokens: 4000

output:
  writer: markdown               # markdown | notion (v2)
  markdown:
    dir: ~/scrollproxy/runs
    filenameFormat: "{YYYY}-{MM}-{DD}-{HHmm}.md"

interests:                       # free-form, fed into the prompt
  - AI product strategy
  - distribution and indie dev
  - sales enablement
  - sports betting analytics
```

## 7. CLI interface

```bash
pnpm scroll                            # uses config defaults
pnpm scroll -- --minutes 5             # override run length
pnpm scroll -- --dry-run               # scroll and extract but don't call Claude
pnpm scroll -- --replay <run-id>       # re-summarize a previous run's raw data
pnpm login                             # opens browser for one-time X login
```

`login` is important. First run should be a dedicated command that launches Chrome with the persistent profile, navigates to x.com, waits for the user to log in manually, and then exits. After that, the profile stays logged in across all future runs.

## 8. Scroller module

**File:** `src/scroller/xScroller.ts`

Responsibilities:

1. Launch Playwright with a persistent context pointed at `config.browser.userDataDir`.
1. Navigate to `https://x.com/home`.
1. Wait for the timeline to render (selector: `[data-testid="primaryColumn"]`).
1. Loop: scroll down by ~1 viewport, wait `random(scrollPauseMs[0], scrollPauseMs[1])`, extract any new posts in the DOM, dedupe against in-run seen set.
1. Stop when **any** of these is true:
   - Configured minutes elapsed
   - `maxPosts` reached
   - No new posts appear for `idleTimeoutMs`
1. Return `ExtractedPost[]`.

Important details:

- Use `page.mouse.wheel()` rather than `window.scrollBy()` — more natural and less likely to trip bot detection.
- Jitter every scroll distance slightly (`random(600, 1000)` px).
- Every ~30 scrolls, insert a longer pause (`random(3000, 6000)` ms) to mimic human reading behavior.
- Catch and log any navigation errors but do not crash the run — always return whatever was collected so far.

## 9. Extractor module

**File:** `src/extractor/xExtractor.ts`

For each post in the DOM (selector: `article[data-testid="tweet"]`), extract:

```ts
interface ExtractedPost {
  id: string;              // from the status URL, e.g. "1234567890"
  url: string;             // full https://x.com/user/status/id
  author: {
    handle: string;        // "@username"
    displayName: string;
  };
  text: string;            // full post text, concatenated if multi-span
  timestamp: string;       // ISO from the <time> element
  metrics: {
    replies: number | null;
    reposts: number | null;
    likes: number | null;
    views: number | null;
  };
  media: {
    hasImages: boolean;
    hasVideo: boolean;
    altTexts: string[];    // for accessibility text on images
  };
  isRepost: boolean;
  isReply: boolean;
  quotedPost: { handle: string; text: string } | null;
  extractedAt: string;     // ISO
}
```

Rules:

- Skip ads (look for "Ad" or "Promoted" indicators).
- Skip "Who to follow" and other non-post modules.
- Parse metric strings like "1.2K" → 1200.
- If a selector fails, log a warning and skip that post — never throw.
- Selectors live in one constants file (`xExtractor.ts` top) so they're easy to fix when X changes the DOM.

## 10. State / dedup

**File:** `src/state/seenPosts.ts`

- On disk: `~/scrollproxy/state/seen.json` — a rolling set of the last 10,000 post IDs with timestamps.
- On run: load into a Set, filter extracted posts against it, write back the union capped at 10k (FIFO eviction).
- Extracted-but-already-seen posts are passed to the summarizer as a separate bucket so Claude can note "you've already been shown this take 3 times this week."

**File:** `src/state/rollingThemes.ts`

- Stores the top themes from the last 10 runs as `{ runId, date, themes: string[] }`.
- Fed into the summarizer prompt so it can say "this theme is new" vs. "this has been bubbling for days."

## 11. Summarizer module

**File:** `src/summarizer/claudeClient.ts`

Wraps `@anthropic-ai/sdk`. Reads `ANTHROPIC_API_KEY` from env. Single function:

```ts
async function summarizeFeed(input: {
  posts: ExtractedPost[];
  alreadySeen: ExtractedPost[];
  rollingThemes: RollingTheme[];
  interests: string[];
  runMinutes: number;
}): Promise<FeedSummary>
```

**Prompt structure** (`src/summarizer/prompts.ts`):

System prompt frames Claude as "a ruthlessly useful feed analyst for Andrew. Your job is not to summarize everything — it's to tell him what's actually worth his attention and what he can safely ignore. Bias toward signal. If the feed is mostly noise, say so."

User prompt includes:

- Andrew's declared interests (from config)
- A list of themes from the last N runs ("here's what's been bubbling")
- The full extracted post list as JSON (text + author + metrics, media stripped for token budget)
- The "already seen" list as a compact array of IDs + one-line recaps
- Instructions to respond in strict JSON matching the schema below

**Output schema** (`src/summarizer/schema.ts`, enforced with zod):

```ts
interface FeedSummary {
  runMeta: {
    totalPosts: number;
    newPosts: number;
    repeatPosts: number;
    dominantVoicesCount: number;
  };
  themes: Array<{
    name: string;                // e.g. "AI agent infrastructure"
    summary: string;             // 2-3 sentences
    isNew: boolean;              // vs. rolling themes
    representativeHandles: string[];
    exampleQuote: string;        // one short quote, attributed
    signalStrength: 1 | 2 | 3 | 4 | 5;
  }>;
  worthClicking: Array<{
    url: string;
    author: string;
    oneLiner: string;            // why Andrew should care
    relevanceToInterests: string[];
  }>;
  voicesToWatch: Array<{
    handle: string;
    why: string;                 // "3 high-signal posts this run on distribution"
  }>;
  skip: {
    summary: string;             // "The rest was hot takes on X and recycled memes"
    noisePercent: number;        // rough estimate
  };
  overallVerdict: string;        // 1-2 sentences: was this feed worth it?
}
```

Force JSON output by ending the prompt with "Respond with ONLY a JSON object matching the schema. No preamble, no markdown fences." Strip any stray fences before parsing. Validate with zod — on validation failure, retry once with the error message appended.

## 12. Writer module

**File:** `src/writers/writer.ts`

```ts
interface Writer {
  write(summary: FeedSummary, rawPosts: ExtractedPost[], runId: string): Promise<string>;
  // returns path or URL of what was written
}
```

**v1: `MarkdownWriter`**

Writes two files per run:

1. `~/scrollproxy/runs/2026-04-11-1430.md` — the human-readable summary
1. `~/scrollproxy/runs/raw/2026-04-11-1430.json` — raw extracted posts for replay/debugging

Markdown template:

```md
# Feed Scroll — {date} ({runMinutes} min)

**Verdict:** {overallVerdict}
**Stats:** {totalPosts} posts ({newPosts} new, {repeatPosts} repeats) · Noise ~{noisePercent}%

## Themes
### {theme.name} {isNew ? "new" : ""} — signal {signalStrength}/5
{theme.summary}
> "{exampleQuote}" — {attribution}
Voices: {representativeHandles}

## Worth clicking ({count})
- [{author}]({url}) — {oneLiner}

## Voices to watch
- **{handle}** — {why}

## Skipped
{skip.summary}
```

## 13. Orchestration (`index.ts`)

```
1. Parse CLI args
2. Load + validate config
3. Load state (seen posts, rolling themes)
4. Launch browser, run scroller → ExtractedPost[]
5. Split into new vs alreadySeen using state
6. If --dry-run, write raw JSON and exit
7. Call summarizer
8. Call writer → get output path
9. Update state (seen posts, rolling themes)
10. Print output path + overallVerdict to console
11. Close browser
```

Wrap the whole thing in try/catch. On any failure after extraction, still write the raw JSON so no scroll effort is wasted.

## 14. Error handling rules

- **Selector failures:** log + skip that post, never throw.
- **Browser crash:** catch, save whatever was collected, exit non-zero.
- **Claude API error:** retry once with backoff, then fall back to writing raw JSON + a stub markdown file noting the summarizer failed.
- **Config invalid:** fail fast with a clear message. No defaults-magic.
- **First run with no login:** detect by checking for a login prompt selector, print "run `pnpm login` first" and exit.

## 15. Testing

Personal tool, so light touch:

- One unit test per extractor helper (metric parsing, timestamp parsing).
- One integration test that loads a saved HTML fixture of an X timeline and runs the extractor against it.
- No end-to-end tests against live X — those are just manual runs.

Save a couple of HTML fixtures to `test/fixtures/` the first time the extractor works so regressions are catchable.

## 16. Build phases

**Phase 1 (weekend 1) — "it works once":**

- Project scaffold, config loader, CLI
- `pnpm login` command
- Scroller + extractor, writes raw JSON only
- No Claude call yet — just verify extraction quality against a real 10-minute scroll

**Phase 2 (weekend 2) — "it's actually useful":**

- Claude summarizer with the full schema
- Markdown writer
- Dedup + rolling themes state
- First real daily run

**Phase 3 (later, as desired):**

- Notion writer
- Second platform (likely LinkedIn or Reddit — both are DOM-scrapeable and far less hostile than Instagram/TikTok)
- Vision fallback when DOM selectors break
- Scheduled runs (cron / launchd)
- Cross-run trend detection ("X topic has been climbing 4 days running")

## 17. Open questions before coding

1. **Anthropic key location** — env var, 1Password CLI, or plain file? Default to `ANTHROPIC_API_KEY` env unless you say otherwise.
1. **Interests list** — the list in the config example is a guess. Replace before the first real run since it shapes Claude's signal/noise judgment.
1. **Run frequency intent** — is this a "once a day, morning coffee" tool or "punch it whenever I feel the urge to open X" tool? Affects how aggressive the dedup should be.
1. **Repeat-post philosophy** — should a post you've already seen once ever be re-surfaced if it's now gone viral? (Recommend: yes, with a "trending since last run" flag.)

## 18. Success criteria

Within two weeks of first real use, Andrew should be able to say:

- "I have not opened the X app on my phone in 7 days."
- "I haven't missed anything I would have wanted to see."
- "The daily markdown file has surfaced at least one thing I actually clicked through and was glad I did."

If those three are true, v1 shipped. Everything else is polish.
