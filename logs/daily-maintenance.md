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
