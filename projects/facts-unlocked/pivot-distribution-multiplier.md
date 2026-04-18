---
id: DOC-055
created: 2026-04-16
updated: 2026-04-17
type: knowledge
domain: facts-unlocked
source_intake: Conversation with Claude 2026-04-16 — reframe of Facts Unlocked purpose
audience: personal
depends-on: [DOC-009, DOC-010]
informs: [DOC-001, DOC-052]
status: active
synced-to: []
---

# Facts Unlocked — Pivot Thesis: Distribution Multiplier for Building Out Loud

Notes from a 2026-04-16 conversation diagnosing why Facts Unlocked posts aren't getting traction and what to do about it.

## The Real Problem

"I build so much but nothing goes anywhere."

Pattern isn't completion — it's concentration. Six live surfaces (MSA, AutoLinkedIn, Facts Unlocked, Building Out Loud, Second Brain, misc) means each one gets ~1/6 the distribution attention a single project would. Building compounds in weeks; distribution compounds in months. So everything works and nothing breaks through.

## Why Facts Unlocked Posts Are Dog Shit

The pipeline is not the problem. The category is.

- AI-voiced fact videos across baby/money/AI/viral is the single most saturated lane in short-form
- In 2026, YouTube and Meta are **actively suppressing** no-face AI content — platform policy, not algorithmic accident
- The 2:1 exploit/explore analytics loop is brilliant engineering, but it's converging on the *least-bad* version of a dying format
- There is no ceiling to push through in this category

What got built is a distribution engine. What it's distributing is commodity.

## The Reframe

**The factory is not a video generator. It is a distribution multiplier with a feedback loop.**

The scarce input isn't content. It's a human signal — a real face, a real voice, a real POV. Andrew already produces that 3-4x/week for Building Out Loud. What's missing is amplification.

## The Pivot

Same pipeline, different input:

```
one walk video
  → transcribe
  → pull 3 sharpest 30-60s moments
  → generate hook variants
  → auto-caption
  → cross-post to YT Shorts / TikTok / Reels
  → analytics loop scores Andrew's hooks and clips (not synthetic ones)
  → feedback shapes how the next walk is structured
```

The feedback loop's value goes up dramatically when it's scoring real human content with real audience signal, not commodity facts with no signal.

## Blockers

**Status 2026-04-17: largely cleared.**

| Platform | Handle | Status |
|----------|--------|--------|
| TikTok | `@building_out_loud` | ✅ Created 2026-04-17 |
| YouTube | `@building_out_loud` | ✅ Created 2026-04-17 |
| Instagram | — | Skipped — Andrew opted out of IG |

Original note: "moderately annoying" — ~10 min per platform to spin up fresh. In practice took less. Only the pipeline-wiring work remains.

## Rename vs. Fresh Account

Considered renaming an existing Facts Unlocked account (baby-facts has 28 followers, up from 9 a week ago). Decision: **don't rename.**

- Inherited algorithmic signal is real — the platform has a prior on what that account is. An AI-facts account pivoting to "Andrew talks about building" will likely underperform for 2-4 weeks as the algo recalibrates
- Username cooldowns: TikTok 30 days, IG/YT 14 days — rename regret = locked for a cycle
- Audience mismatch: those 28 people followed baby facts, not Andrew. Expect immediate unfollows
- Old content would need to be unlisted/deleted or profile reads schizophrenic

Fresh accounts are ~10 min each and skip all of the above.

## Signal Worth Extracting Before Pivot

9 → 28 followers on baby-facts in a week is a 3x — there's a signal shift hiding in there. One or two specific posts probably drove most of that jump.

Before shutting down or archiving the synthetic channels, mine the analytics loop for:
- Which post(s) drove the spike
- What structural variables they shared (hook_type, video_length, voice_pace, text_overlay, background_type, music_energy, cta_style)

That pattern might transfer to Building Out Loud content, or it might be pure baby-niche. Won't know without looking. Either way, the learning transfers — the account doesn't.

## Status

**Committed and executing as of 2026-04-17.** TT and YT handles secured. IG dropped from scope.

**Architecture decision (2026-04-17):** Second Brain itself is the posting manager for BOL, not the FU pipeline. FU's video-synthesis infrastructure doesn't apply since BOL is human-created video. Brain handles: storage (R2) + scheduling (Zernio) + analytics loop.

**Live state as of 2026-04-18 ~12:30 ET:**
- ✅ R2 upload + auto-transcode working (`scripts/r2-upload-bol.js` — detects HEVC, re-encodes to H.264, uploads)
- ✅ Zernio API wired (key + all three channel IDs in `.env.local`)
- ✅ Ep 5 Wispr Flow **LIVE on YouTube**: https://youtube.com/shorts/fT5xwNJqDXY
- ⏳ Ep 5 Wispr Flow TT draft on phone (H.264 re-push after HEVC version failed — dead draft to be manually deleted in TT app)
- ✅ Ep 2 / 6 / 8 backfill batch pushed 2026-04-18 — TT drafts queued, YT scheduled Apr 19/20/21 9am ET
- ✅ TikTok-specific rules captured in memory: API dampening (always draft), HEVC incompatibility (always H.264), caption-stripped-in-draft (paste in-app)

**Scheduled queue (as of 2026-04-18):**

| Date (9am ET) | Episode | YT Zernio ID | TT Zernio ID |
|---|---|---|---|
| Apr 19 (Sun) | Ep 2 — Product/sales convergence | `69e37466cb89d5cac508a561` | `69e374631c3ae1c03b5160e9` |
| Apr 20 (Mon) | Ep 6 — Don't be afraid, be ready | `69e37469e290601d6c926d99` | `69e37466cb89d5cac508a586` |
| Apr 21 (Tue) | Ep 8 — Doom scrolling | `69e3746ce290601d6c926e8b` | `69e37469e290601d6c926dc2` |

Skipped for TT/YT: Ep 3 (too niche), Ep 4 (Mythos context problem). Ep 7 optional — defer.

**Still open:**
- Andrew to delete dead HEVC TT draft in TT app (the one that errors on tap)
- New Ep 9 being recorded 2026-04-18 — will enter pipeline when it lands in the drop folder
- Bios for TT + YT pending selection (options drafted in conversation)
- Analytics loop scheduled-task setup — defer until 2-3 episodes have 48h of data

**Synthetic channel wind-down:**
- `money-facts-unlocked` — **shutting down** to free compute (decided 2026-04-17)
- `ai-facts-unlocked`, `viral-facts-unlocked`, `baby-facts-unlocked` — TBD. Baby has the 9→28 follower momentum worth mining before shutdown; others leaning toward shutdown.

## Related Tools

- Vugola (DOC-052) — multi-platform video clipping and scheduling, could be the "pull 3 sharpest moments + cross-post" layer
- HeyGen CLI + Hyperframes (DOC-054) — another piece of the video-as-code stack
