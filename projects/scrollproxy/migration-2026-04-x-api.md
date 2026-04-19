---
id: DOC-067
created: 2026-04-19
updated: 2026-04-19
type: knowledge
domain: ai-frontier
status: active
depends-on: [DOC-034]
---

# ScrollProxy — Migration to X API Owned Reads (April 2026)

> One-time migration plan. X drops "Owned Reads" pricing on **2026-04-20** ($0.001/req). This doc lives until the migration is shipped, then gets archived. The technical-spec body (§4–§16) gets rewritten as part of Phase 3 below.

---

## Why now

The current Playwright-based scroller works but is fragile (DOM selectors break when X ships UI changes), risky (bot detection), slow (10-min scroll loops), and produces unstructured data (the extractor has to reverse-engineer post metadata from the DOM). The X API owned-reads endpoints replace all of that with structured JSON for ~$3/month at current run cadence. There is no remaining argument for keeping the Playwright path.

## What we keep, what we throw away

**Keep (no changes):**
- `src/summarizer/` — Claude client, prompts, output schema. The summarizer doesn't care where posts came from.
- `src/state/` — seen-posts dedup, rolling themes. Works on post IDs, not extraction method.
- `src/writers/` — markdown writer, raw JSON writer. Output format unchanged.
- `runs/` directory layout, `.processed.json`, all downstream brain processing (`second-brain-prompt.md`, morning routine prompt, surfacings, voices.md, themes.md, reading-queue.md).
- launchd cron schedule (every ~6h).

**Throw away:**
- `src/scroller/` (browser.ts, xScroller.ts, scrollStrategy.ts) — entire directory.
- `src/extractor/` — DOM-based extraction (the `ExtractedPost` interface stays as the *internal* shape; only the producer changes).
- Playwright dependency in `package.json`.
- Chrome persistent profile + `pnpm login` command + `chrome-profile/` directory.
- Anti-bot jitter, scroll pause logic, idle timeout.

**Add:**
- `src/sources/xListSource.ts` — fetches posts from configured X lists via API.
- `src/sources/xApiClient.ts` — thin wrapper around X v2 API with bearer token auth, retry, rate-limit handling.
- `src/sources/xListAdapter.ts` — maps API response → existing `ExtractedPost` shape so the summarizer and state layers don't change.
- `pnpm xlists:list` — one-time setup script to fetch and display owned/followed lists so you can pick which to ingest.
- Config additions in `config.yaml`:

```yaml
x:
  bearerToken: ${X_BEARER_TOKEN}        # from .env.local
  baseUrl: https://api.x.com/2
  lists:
    - id: "1234567890"
      name: "AI frontier"
      tag: "ai-frontier"
    - id: "..."
      name: "GTM operators"
      tag: "convergence"
    - id: "..."
      name: "Broad / serendipity"
      tag: "broad"
  postsPerListPerRun: 100               # caps per-list pull
  includeBookmarks: true                # also fetch /2/users/{id}/bookmarks
  includeLikedTweets: false             # noisy, off by default
```

## List curation — the one strategy decision

The home feed had algorithmic discovery. Explicit lists won't surprise you. The mitigation is to keep **one broad list** curated from `voices.md` (~30–50 high-signal handles across topics) so serendipity doesn't disappear. Themed lists (AI frontier, convergence, etc.) handle the targeted reads.

Recommended starting set:
1. **AI frontier** — voices.md handles tagged with frontier/model/agent topics
2. **GTM operators** — voices.md handles for sales/product/marketing convergence
3. **Builders / indie** — distribution + product strategy voices
4. **Broad / serendipity** — top ~40 highest-signal handles regardless of topic

Mets and current-events lists wait until those pulses are filled in.

## Endpoints used

- `GET /2/lists/{id}/tweets` — primary. Pull recent posts from each configured list.
- `GET /2/users/{id}/bookmarks` — secondary. Surface saved posts you haven't yet processed (treats your own bookmarks as a high-trust signal layer).
- `GET /2/users/{id}/owned_lists` and `GET /2/users/{id}/followed_lists` — used only by the `xlists:list` setup script.

Skip for now: `liked_tweets` (too noisy), `mentions` (different use case — could be a future "watch my mentions" run mode), `tweets` (your own posts, not relevant for feed-replacement).

## Authentication

- One-time setup: X developer account, create an app, generate a **user-context bearer token** with read scopes for the owned-reads endpoints.
- Store in `.env.local` as `X_BEARER_TOKEN`.
- Token is per-user, doesn't expire on a normal cadence; if it does rotate, the run logs the auth failure clearly and exits non-zero.

## Cutover approach: parallel for one cycle, then hard switch

Recommend running both Playwright and API versions for **one full cycle** (one ~6h period, both writing to `runs/` with distinguishable run IDs like `2026-04-23T14-02-00Z-api` and `-playwright`), then compare summaries:

- Did the API version surface anything substantively different?
- Were any voices/themes the Playwright version caught completely missed by the API lists? (If yes, that's a list-curation gap to fix before retiring Playwright.)
- Were summaries comparable in usefulness?

After one cycle of comparison, **hard switch**: remove Playwright code, delete the `chrome-profile/` directory, update `package.json`, ship.

Old `runs/` directory stays as historical archive. Add a one-line note in `second-brain-prompt.md` saying "runs prior to 2026-04-2X were produced by the Playwright pipeline; they are valid and processable by the same routine."

## Phased plan for the week

### Phase 1 — Setup + source layer (Mon-Tue, 2026-04-20 / 21)
1. Get/confirm X developer account; create app; generate user bearer token; add to `.env.local`.
2. Build `src/sources/xApiClient.ts` (auth, retry, rate-limit handling).
3. Build `pnpm xlists:list` script. Run it. Pick 3–4 lists to start (or create them in X first if they don't exist yet — list creation is owned-write, may have a small cost).
4. Update `config.yaml` with the chosen list IDs.
5. Build `src/sources/xListSource.ts` + `xListAdapter.ts`. Validate against a single list returning to a fixture file.

### Phase 2 — Cutover (Wed 2026-04-22)
1. Wire `xListSource` into `index.ts` as an alternate source. Add a CLI flag `--source playwright|x-api` for the parallel run.
2. Run both versions in the same 6h window. Both write to `runs/` with disambiguated IDs.
3. Compare summaries side-by-side. Either approve the cutover or fix list-curation gaps and re-run.

### Phase 3 — Cleanup + spec rewrite (Thu-Fri 2026-04-23 / 24)
1. Once cutover is approved: delete `src/scroller/` and `src/extractor/`, remove Playwright from `package.json`, delete `chrome-profile/`.
2. Rewrite `technical-spec.md` §4–§16 to match the new architecture. §2b becomes part of the main narrative; the historical Playwright sections move to a brief "How v1 worked (April 2026)" archive section at the bottom.
3. Update `profile.md` ScrollProxy entry — current wording ("logs into X, scrolls the feed") becomes stale. New wording reflects API-based curated-list pulls.
4. Update knowledge graph: DOC-034's domain stays the same; this migration doc gets marked `status: superseded` once shipped, with `superseded-by: DOC-034` (since the spec it pointed at has been rewritten).
5. Optional: drop a one-line note in `voices.md` reflecting that voice tracking now feeds list curation, not just retrospective surfacing.

## Risks / things to watch

- **List quality is the real determinant of output quality.** The summarizer is only as good as the input feed. If the lists are too narrow, you lose serendipity; too broad, you lose signal. Plan to iterate the lists for the first week post-cutover.
- **API tier requirements.** Confirm at app creation whether owned-reads on Basic tier covers all five endpoints used. If not, factor the tier cost into the operating budget (still likely <$15/mo even on Pro).
- **Bookmarks dedup.** Bookmarks endpoint can return posts you've already seen via list pulls. State dedup handles this, but the summarizer should be told "this came from your bookmarks" so it can weight the signal.
- **Rate limits during the parallel run.** Two versions running simultaneously doubles request volume for that window. Stay under tier limits or stagger by 30 min.
- **Your own posts in lists.** If any list includes your own handle, you'll get your own posts back in the summary. Filter at the adapter layer.

## Open questions for Andrew before Phase 1 starts

1. Do you already have an X developer account? (If not, that's the first hour of Phase 1 — apply, wait for approval, etc.)
2. Are there X lists you already curate and want to seed from, or are we creating them fresh?
3. Bookmark inclusion — yes by default? Your bookmarks are a high-trust signal but also a long, slow-decaying queue. Could be useful or noisy depending on how you use bookmarks.
4. Comfortable with the "one parallel cycle, then hard cutover" approach, or want to run parallel longer?

---

## Status tracking

- [ ] Phase 1 — Setup + source layer
- [ ] Phase 2 — Cutover (parallel run + comparison)
- [ ] Phase 3 — Cleanup + spec rewrite
- [ ] DOC-034 spec body rewritten
- [ ] profile.md ScrollProxy entry updated
- [ ] This migration doc archived (status: superseded)
