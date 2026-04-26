# Needs Review — Writing Queue

> Topics that hit the murky guardrail and need Andrew's eyes before publishing. The scheduled task documents skipped topics here.

---

## 2026-04-16 — BOL Ep 5 sync blocked (UPDATED 2026-04-18)

**Episode:** ART-006 — listed as "How replaceable are you? Here's the framework" (published Apr 15)
**Reason (updated):** ZERNIO_API_KEY is now in `.env.local` and Zernio returned data. New blocker: Zernio shows Apr 15 was "Don't be afraid, be ready" (Ep 6) — not "How replaceable are you?" The ART-006 registry entry may have a wrong title or wrong date. The "How replaceable are you?" episode either: (a) predates Zernio and has no URL in the system, or (b) hasn't been posted yet.
**Action needed:** Reconcile ART-006 registry entry. Is "How replaceable are you?" an episode that was actually posted? If yes, what date and what's the LinkedIn URL?
**Note:** "Don't be afraid, be ready" (Apr 15) now has a site file at `content/building-out-loud/dont-be-afraid-be-ready.md` with a confirmed Zernio URL.

---

## 2026-04-18 — BOL "Stop coaching to the average" needs episode body (RESOLVED 2026-04-20)

**Episode:** ART-009 — "Stop coaching to the average" (published Apr 16)
**LinkedIn URL:** https://www.linkedin.com/feed/update/urn:li:ugcPost:7450657551773229056/ (confirmed via Zernio)
**Resolved:** Site file created at `content/building-out-loud/stop-coaching-to-the-average.md` (PR #6). Body was derived from Zernio first comment + episode master talking points. Andrew should verify the Full Take body is accurate to the actual episode content.

---

## 2026-04-24 — BOL episodes 12–13 posted but not in artifact registry and not on site

**Episodes:** Ep 12 (Apr 22 — "AI gives you a perfect answer. You paste it. It looks like garbage. One bookmark fixes it."), Ep 13 (Apr 23 — "Before your next discovery call, ask AI to kill your deal.")
**Reason:** These episodes are listed as Posted in the episode master but have no entries in the artifact registry and no site files under `content/building-out-loud/`. Job B only syncs registry-tracked episodes, so these were skipped.
**Action needed:** Add ART entries for each episode in the artifact registry, then create site files (or re-run Job B). Bodies are in the episode master under the `<!-- POSTED 2026-04-22 -->` and `<!-- POSTED 2026-04-23 -->` comment sections.

---

## 2026-04-22 — BOL episodes 8–11 posted but not in artifact registry and not on site

**Episodes:** Ep 8 (Apr 18 — "You don't need to learn to code. You need a Saturday."), Ep 9 (Apr 19 — "A shoe company just became a data center company"), Ep 10 (Apr 20 — "Paste your last 5 closed-won deals"), Ep 11 (Apr 21 — "I built a prompt that makes ChatGPT write in my voice")
**Reason:** These episodes are listed as Posted in the episode master (`projects/building-out-loud/episodes/episode master.md`) but have no entries in the artifact registry and no site files under `content/building-out-loud/`. Job B only syncs registry-tracked episodes, so these were skipped.
**Action needed:** Add ART entries for each episode in the artifact registry, then re-run Job B (or manually create the site files) to get these episodes onto the site. Bodies are in the episode master file under the "Posted" section.

---

## 2026-04-18 — BOL ep-002 pre-Zernio episode needs LinkedIn URL

**Episode:** BOL-EP-002 — "Product people vs. sales people" (posted Apr 11 via LinkedIn native, pre-Zernio)
**Reason:** Episode was posted before Zernio integration. No LinkedIn URL in Zernio, none saved in the brain.
**Action needed:** Find the LinkedIn post URL manually and add it. Site file doesn't exist yet; episode body is in `projects/building-out-loud/episodes/ep-002-sales-product-convergence.md` once URL is available.
