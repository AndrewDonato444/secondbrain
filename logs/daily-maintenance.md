# Second Brain — Daily Maintenance Log

> Automated daily health checks. Appended by the maintenance agent.

---
## Daily Maintenance — 2026-04-20

### Summary
3 knowledge graph issues require attention: DOC-047 is missing from the registry (file exists at `projects/andrewdonato-com/writing/queue.md`), the `upcoming.md` frontmatter still carries `id: DOC-029` despite being registered as DOC-011, and ART-009 references superseded DOC-029 instead of DOC-011. Six published artifacts are flagged as potentially stale because DOC-010 (series-overview, a living document) was updated 2026-04-17 after all were published — likely routine and low-urgency.

### Findings

**Knowledge Graph:** 3 issues
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) exists as a real file and is referenced by 5 artifacts + 5 source files, but is **missing from the knowledge graph registry**
- `projects/building-out-loud/episodes/episode master.md` has `id: DOC-029` in frontmatter but is registered as **DOC-011** in the graph (ID mismatch from the DOC-029 → DOC-011 merge)
- ART-009 in artifact registry references **superseded DOC-029** as source doc — should reference DOC-011

**Inbox:** 0 unprocessed items older than 2 days
Clean

**Artifact Staleness:** 6 potentially stale artifacts
All 6 are published BOL episode outlines whose shared source DOC-010 (`projects/building-out-loud/series-overview.md`) was updated 2026-04-17 after their publish dates. DOC-010 is a living planning doc — these flags are likely low-urgency but surfaced per protocol.
- ART-001 (published 2026-04-09) — DOC-010 updated after
- ART-002 (published 2026-04-12) — DOC-010 and DOC-011 updated after
- ART-003 (published 2026-04-13) — DOC-010 updated after
- ART-004 (published 2026-04-14) — DOC-010 and DOC-011 updated after
- ART-006 (published 2026-04-15) — DOC-010 and DOC-011 updated after
- ART-009 (published 2026-04-16) — DOC-010 updated after

**Profile Freshness:** Current (last updated 2026-04-17, 3 days ago)

**Stale Documents:** 0 documents not updated in 30+ days
Clean (entire brain was built in April 2026 — nothing is old enough to trigger this check yet)

---
## Daily Maintenance — 2026-04-20 (run 2 — post-BOL content session)

### Summary
Same 3 knowledge graph issues persist from run 1 (not yet resolved). Notable: `upcoming.md` and `series-overview.md` have uncommitted changes from a content session — new "The Move" pillar added with 3+ episode outlines. One stray inline note (`"I'm also noticing some bleed here."`) was left in `upcoming.md` at line 10 and should be removed before next commit.

### Findings

**Knowledge Graph:** 3 issues (unchanged from run 1)
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) exists and is referenced by 5 artifacts + 5 source files, but is **missing from the knowledge graph registry**
- `projects/building-out-loud/episodes/episode master.md` frontmatter carries `id: DOC-029` but is registered as **DOC-011** in the graph (ID mismatch from the DOC-029 → DOC-011 merge)
- ART-009 in artifact registry references **superseded DOC-029** as source doc — should reference DOC-011

**Inbox:** 0 unprocessed items older than 2 days
Clean

**Artifact Staleness:** 6 potentially stale artifacts (unchanged from run 1)
All 6 are published BOL episode outlines; shared source DOC-010 (`series-overview.md`) updated 2026-04-17 after all publish dates. Low-urgency — living planning doc.
- ART-001 (published 2026-04-09) — DOC-010 updated after
- ART-002 (published 2026-04-12) — DOC-010 and DOC-011 updated after
- ART-003 (published 2026-04-13) — DOC-010 updated after
- ART-004 (published 2026-04-14) — DOC-010 and DOC-011 updated after
- ART-006 (published 2026-04-15) — DOC-010 and DOC-011 updated after
- ART-009 (published 2026-04-16) — DOC-010 updated after

**Profile Freshness:** Current (last updated 2026-04-17, 3 days ago)

**Stale Documents:** 0 documents not updated in 30+ days
Clean

**Uncommitted Changes (observation):**
- `projects/building-out-loud/series-overview.md` — new "The Move" pillar added (section 5)
- `projects/building-out-loud/episodes/episode master.md` — 3+ new "The Move" episode outlines added; **stray note at line 10** (`"I'm also noticing some bleed here."`) should be removed before commit

---
## Daily Maintenance — 2026-04-21

### Summary
7 knowledge graph issues: the 3 recurring issues from prior runs (DOC-047 missing from registry, DOC-029/DOC-011 ID mismatch in episode master, ART-009 referencing superseded DOC-029) plus 4 newly surfaced missing files — DOC-056 through DOC-059 are registered in the graph but no corresponding episode files exist on disk. Stray note in episode master.md flagged yesterday appears resolved. Artifact staleness (6 items) is unchanged — all from living source docs, low-urgency.

### Findings

**Knowledge Graph:** 7 issues (3 recurring, 4 new)

*Recurring:*
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) exists on disk, is referenced by 6 artifacts (ART-005 through ART-012) and multiple source files, but is **not registered in the knowledge graph**
- `projects/building-out-loud/episodes/episode master.md` frontmatter carries `id: DOC-029` but is registered as **DOC-011** in the graph — ID mismatch from the merge, never reconciled
- ART-009 in artifact registry cites **superseded DOC-029** as source doc — should reference DOC-011

*New (files missing from disk):*
- DOC-056: `projects/building-out-loud/episodes/ep-005-wispr-flow.md` — registered, file does not exist
- DOC-057: `projects/building-out-loud/episodes/ep-002-sales-product-convergence.md` — registered, file does not exist
- DOC-058: `projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md` — registered, file does not exist
- DOC-059: `projects/building-out-loud/episodes/ep-008-doom-scrolling.md` — registered, file does not exist

**Inbox:** 0 unprocessed items older than 2 days
Clean (all 15 inbox items are `status: processed`)

**Artifact Staleness:** 6 potentially stale artifacts (unchanged from prior runs)
All 6 published BOL episode outlines share source DOC-010 (`series-overview.md`, updated 2026-04-17) and/or DOC-011 (`episode master.md`, updated 2026-04-20), both updated after their respective publish dates. Low-urgency — these are living planning documents; the episode content itself hasn't changed.
- ART-001 (published 2026-04-09) — DOC-010 updated 2026-04-17, DOC-001 updated 2026-04-17
- ART-002 (published 2026-04-12) — DOC-010 updated 2026-04-17, DOC-011 updated 2026-04-20
- ART-003 (published 2026-04-13) — DOC-010 updated 2026-04-17
- ART-004 (published 2026-04-14) — DOC-010 updated 2026-04-17, DOC-011 updated 2026-04-20
- ART-006 (published 2026-04-15) — DOC-010 updated 2026-04-17, DOC-011 updated 2026-04-20
- ART-009 (published 2026-04-16) — DOC-010 updated 2026-04-17, DOC-011 updated 2026-04-20

**Profile Freshness:** Current (last updated 2026-04-17, 4 days ago)

**Stale Documents:** 0 documents not updated in 30+ days
Clean (entire brain built April 2026 — nothing old enough to trigger this check yet)

---
## Daily Maintenance — 2026-04-22

### Summary
Knowledge graph has 5 issues: 4 missing BOL episode files (DOC-056–059) and DOC-047 unregistered. 6 published episode-outline artifacts are flagged as potentially stale because DOC-010 (series-overview) was updated 2026-04-21 after their publish dates. Inbox clean; profile current; no stale documents.

### Findings
**Knowledge Graph:** 5 issues
- DOC-056 path missing: `projects/building-out-loud/episodes/ep-005-wispr-flow.md`
- DOC-057 path missing: `projects/building-out-loud/episodes/ep-002-sales-product-convergence.md`
- DOC-058 path missing: `projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md`
- DOC-059 path missing: `projects/building-out-loud/episodes/ep-008-doom-scrolling.md`
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) exists but is absent from the Document Registry

**Inbox:** 0 unprocessed items older than 2 days
Clean (all 16 inbox items are status: processed or have been given DOC IDs)

**Artifact Staleness:** 6 potentially stale artifacts
- ART-001 (Ep 1, pub 2026-04-09) — source DOC-010 updated 2026-04-21, DOC-001 updated 2026-04-17
- ART-002 (Ep 2, pub 2026-04-12) — source DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-21
- ART-003 (Ep 3, pub 2026-04-13) — source DOC-010 updated 2026-04-21
- ART-004 (Ep 4, pub 2026-04-14) — source DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-21
- ART-006 (Ep 6, pub 2026-04-15) — source DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-21
- ART-009 (Ep 9, pub 2026-04-16) — source DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-21
Note: All are already-published episode outlines. The trigger is DOC-010 (series-overview) being updated yesterday. Likely minor additions rather than invalidating changes — low urgency.

**Profile Freshness:** Current (last updated 2026-04-17, 5 days ago)

**Stale Documents:** 0 documents not updated in 30+ days
Clean (entire brain built April 2026 — nothing old enough to trigger this check yet)

---
## Daily Maintenance — 2026-04-23

### Summary
5 knowledge graph issues persist (all recurring, unchanged from 2026-04-21): 4 registered BOL episode files still missing from disk (DOC-056–059), DOC-047 still unregistered in the graph. ART-013 ("You're Not Behind") added to artifact registry since yesterday, also cites unregistered DOC-047 — now 9 artifacts reference it. 6 published artifact-stale flags unchanged — all traceable to living planning docs (DOC-010/DOC-011), low urgency. Inbox clean; profile current at 6 days (within 7-day threshold); no stale docs.

### Findings

**Knowledge Graph:** 5 issues (all recurring, none resolved since 2026-04-21)
- DOC-056: `projects/building-out-loud/episodes/ep-005-wispr-flow.md` — registered in graph, file does not exist on disk
- DOC-057: `projects/building-out-loud/episodes/ep-002-sales-product-convergence.md` — registered in graph, file does not exist on disk
- DOC-058: `projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md` — registered in graph, file does not exist on disk
- DOC-059: `projects/building-out-loud/episodes/ep-008-doom-scrolling.md` — registered in graph, file does not exist on disk
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) — file exists and is now cited by 9 artifacts (ART-005 through ART-013), but absent from the Document Registry

**Inbox:** 0 unprocessed items older than 2 days
Clean

**Artifact Staleness:** 6 potentially stale artifacts (unchanged)
Source docs DOC-010 (`series-overview.md`) and DOC-011 (`episode master.md`) both updated 2026-04-21, after all publish dates. Low urgency — living planning docs; episode content itself unchanged.
- ART-001 (pub 2026-04-09) — DOC-010 updated after, DOC-001 updated after
- ART-002 (pub 2026-04-12) — DOC-010 and DOC-011 updated after
- ART-003 (pub 2026-04-13) — DOC-010 updated after
- ART-004 (pub 2026-04-14) — DOC-010 and DOC-011 updated after
- ART-006 (pub 2026-04-15) — DOC-010 and DOC-011 updated after
- ART-009 (pub 2026-04-16) — DOC-010 and DOC-011 updated after

**Profile Freshness:** Current (last updated 2026-04-17, 6 days ago)

**Stale Documents:** 0 documents not updated in 30+ days
Clean (entire brain built April 2026 — nothing old enough to trigger this check yet)

---
## Daily Maintenance — 2026-04-24

### Summary
8 knowledge graph issues: 4 registered episode files are missing on disk, and 4 files with IDs (DOC-047, DOC-071, DOC-072, PERSON-007) exist but are absent from the Document Registry table. 6 published artifacts are flagged stale because DOC-010 (series-overview) was updated 2026-04-21 and DOC-011 (episode master) updated 2026-04-23 — both after the artifacts' publish dates.

### Findings
**Knowledge Graph:** 8 issues
- DOC-056 registered but file missing: `projects/building-out-loud/episodes/ep-005-wispr-flow.md`
- DOC-057 registered but file missing: `projects/building-out-loud/episodes/ep-002-sales-product-convergence.md`
- DOC-058 registered but file missing: `projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md`
- DOC-059 registered but file missing: `projects/building-out-loud/episodes/ep-008-doom-scrolling.md`
- DOC-047 (`projects/andrewdonato-com/writing/queue.md`) — file exists with ID but not in Document Registry table
- DOC-071 (`projects/msp-sales/PM-CONTEXT.md`) — file exists with ID but not in Document Registry table
- DOC-072 (`escape-plan.md`) — file exists with ID but not in Document Registry table
- PERSON-007 (`resources/people/russ-gregory.md`) — file exists with ID but not in Document Registry table

**Inbox:** 0 unprocessed items older than 2 days
Clean (3 items with `status: active` remain in inbox/ — DOC-038, DOC-044, DOC-070 — processed but not moved out)

**Artifact Staleness:** 6 potentially stale artifacts
- ART-001 (published 2026-04-09): DOC-010 updated 2026-04-21 after publish
- ART-002 (published 2026-04-12): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23 — both after publish
- ART-003 (published 2026-04-13): DOC-010 updated 2026-04-21 after publish
- ART-004 (published 2026-04-14): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23 — both after publish
- ART-006 (published 2026-04-15): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23 — both after publish
- ART-009 (published 2026-04-16): DOC-010 updated 2026-04-21 after publish
Note: DOC-010 and DOC-011 are living documents updated frequently; these may be routine/low-urgency.

**Profile Freshness:** Current (last updated 2026-04-17 — 7 days, at threshold but not over)

**Stale Documents:** 0 documents not updated in 30+ days
Clean

---
## Daily Maintenance — 2026-04-25

### Summary
3 IDs referenced in graph relationships lack registry entries; 4 episode files registered but missing from disk; 6 published artifacts have source docs updated after publish; profile is now 8 days old and over the 7-day flag threshold.

### Findings
**Knowledge Graph:** 7 issues

Missing files (registered but not on disk):
- DOC-056: projects/building-out-loud/episodes/ep-005-wispr-flow.md
- DOC-057: projects/building-out-loud/episodes/ep-002-sales-product-convergence.md
- DOC-058: projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md
- DOC-059: projects/building-out-loud/episodes/ep-008-doom-scrolling.md

IDs in relationships but not in Document Registry:
- DOC-071 (MSP Sales project) — referenced but not registered
- DOC-072 (Escape Plan tracker) — referenced but not registered
- PERSON-007 (Russ Gregory) — referenced but not registered

Note: DOC-047 is referenced as source in ART-005 through ART-014 in the artifact registry, but does not appear anywhere in the knowledge graph. The files it points to exist (andrewdonato.com writing posts) but the doc has no graph entry.

**Inbox:** 0 unprocessed items older than 2 days
Clean

**Artifact Staleness:** 6 potentially stale artifacts
Published artifacts where source docs were updated after publish date:
- ART-001 (2026-04-09): DOC-010 updated 2026-04-21
- ART-002 (2026-04-12): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-003 (2026-04-13): DOC-010 updated 2026-04-21
- ART-004 (2026-04-14): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-006 (2026-04-15): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-009 (2026-04-16): DOC-010 updated 2026-04-21
Context: DOC-010 and DOC-011 are the BOL series overview and episode master — updates are additive (new episodes). The published artifacts themselves are LinkedIn posts that don't need re-derivation, but the source docs have evolved.

**Profile Freshness:** Needs review (last updated 2026-04-17 — 8 days, over threshold)

**Stale Documents:** 0 documents not updated in 30+ days
Clean

---
## Daily Maintenance — 2026-04-26

### Summary
Same backlog as yesterday plus one new contradiction: episode master.md frontmatter declares id DOC-029 (a superseded ID) when the registry maps it to DOC-011. DOC-047 still missing from registry despite being source for ART-005..ART-014; profile is now 9 days old (threshold 7).

### Findings
**Knowledge Graph:** 9 issues

Missing files (registered but not on disk):
- DOC-056: projects/building-out-loud/episodes/ep-005-wispr-flow.md
- DOC-057: projects/building-out-loud/episodes/ep-002-sales-product-convergence.md
- DOC-058: projects/building-out-loud/episodes/ep-006-dont-be-afraid-be-ready.md
- DOC-059: projects/building-out-loud/episodes/ep-008-doom-scrolling.md

IDs declared in files / referenced in relationships but missing from Document Registry:
- DOC-047 (projects/andrewdonato-com/writing/queue.md) — file declares this ID; registry has no entry, despite ART-005..ART-014 all citing DOC-047 as source
- DOC-071 (projects/msp-sales/PM-CONTEXT.md) — file declares this ID; only appears in Relationships table
- DOC-072 (escape-plan.md) — file declares this ID; only appears in Relationships table
- PERSON-007 (resources/people/russ-gregory.md) — file declares this ID; only appears in Relationships table

Frontmatter contradiction:
- projects/building-out-loud/episodes/episode master.md frontmatter has `id: DOC-029`, but the registry lists this path as DOC-011 and marks DOC-029 as superseded (merged into DOC-011). The file's ID needs to be corrected to DOC-011.

**Inbox:** 0 unprocessed items older than 2 days
Clean (no files carry `status: unprocessed`; the three remaining `status: active` inbox files — 2026-04-12, 2026-04-14, 2026-04-21 — appear to be intentional knowledge docs living in inbox/ rather than awaiting processing)

**Artifact Staleness:** 6 potentially stale artifacts
Published artifacts where source docs were updated after publish date (unchanged from 2026-04-25):
- ART-001 (2026-04-09): DOC-010 updated 2026-04-21, DOC-001 updated 2026-04-17
- ART-002 (2026-04-12): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-003 (2026-04-13): DOC-010 updated 2026-04-21
- ART-004 (2026-04-14): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-006 (2026-04-15): DOC-010 updated 2026-04-21, DOC-011 updated 2026-04-23
- ART-009 (2026-04-16): DOC-010 updated 2026-04-21 (also references DOC-029, which is superseded — should be DOC-011)
Context: DOC-010 and DOC-011 are the BOL series overview and episode master; updates are additive (new episodes). Published artifacts themselves are LinkedIn posts already out the door — flagging is informational, no re-derivation needed.

**Profile Freshness:** Needs review (last updated 2026-04-17 — 9 days, over threshold)

**Stale Documents:** 0 documents not updated in 30+ days
Clean
