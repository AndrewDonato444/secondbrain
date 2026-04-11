# Second Brain — Claude Code Rules

> This is Andrew Donato's personal knowledge system. Everything here is profile-driven — `profile.md` is the seed that drives all intake processing, connection-making, and proactive surfacing.

---

## Before Doing Anything

1. **Read `profile.md`** — understand Andrew's active projects, goals, interests, and what matters right now
2. **Read `schema.md`** — understand the organizational rules and folder structure
3. **Check `.brain/knowledge-graph.md`** — understand document relationships before editing or creating

---

## Core Rules

### Document IDs
Every document in the system gets a unique ID in its frontmatter:
- `DOC-xxx` — knowledge documents, project files, resources, intake
- `ART-xxx` — derived artifacts (LinkedIn posts, pitch materials, emails, presentations)
- `PERSON-xxx` — people/contact entries

To assign a new ID: check `.brain/knowledge-graph.md` for the highest existing number in that prefix, increment by 1.

### Knowledge Graph
When creating or editing any document:
1. Assign an ID if it doesn't have one
2. Add/update the entry in `.brain/knowledge-graph.md`
3. Determine relationship types to other documents:
   - `depends-on` — A requires B to be understood/accurate
   - `extends` — A adds detail or applies B in a specific context
   - `informs` — A provides useful context for B (not a hard dependency)
   - `contradicts` — A conflicts with B (**flag this to Andrew explicitly**)
   - `supersedes` — A replaces B (mark B as `status: superseded`)
   - `derived-from` — artifact was generated/adapted from a knowledge doc
4. Maintain bidirectional links — if A depends-on B, B's entry should reference A
5. When editing an existing document, check the graph for downstream documents that might be affected

### Enhanced Frontmatter
All files use this frontmatter standard:

```yaml
---
id: DOC-001
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: knowledge | artifact | reference | log | person
domain: msa | trackforce | career | facts-unlocked | building-out-loud | personal | ai-frontier | finances
source_intake: inbox/YYYY-MM-DD-short-description.md
audience: personal | linkedin | msa-clients | trackforce-leadership | employers | public
depends-on: []
extends: []
informs: []
status: active | stale | superseded
synced-to: []
---
```

Not every field is required on every file. Use what's relevant. At minimum: `id`, `created`, `updated`, `type`, `status`.

### Audience Awareness
Andrew creates content for 5 audiences. When deriving artifacts, read `.brain/audience-profiles.md` for inclusion/exclusion rules:
- **LinkedIn/Public** — building in public, sales-AI convergence
- **MSA Clients** — intelligence advantage, ROI
- **Employers/Recruiters** — track record, AI fluency
- **TrackForce Leadership** — pipeline, performance, AI wins
- **Personal/Private** — full picture, unfiltered

### Artifact Registry
When producing any deliverable (LinkedIn post, email, presentation, pitch material):
1. Create with `type: artifact` and `derived-from` in frontmatter
2. Register in `.brain/artifact-registry.md`
3. Add to knowledge graph with `derived-from` relationship

### Sync Tracking
When pushing brain content to external systems (Notion, Gmail, Apollo, etc.):
1. Log in `.brain/sync-log.md` with date, doc ID, target system, operation, external URL
2. Update the document's `synced-to` field

### Contradiction & Staleness
- If you detect contradicting information between documents, **tell Andrew immediately** — don't silently resolve it
- If a document's source information has changed, flag it as potentially stale
- If a document is replaced by newer information, mark it `status: superseded` and add `superseded-by` to its frontmatter

---

## Folder Structure

```
Second Brain/
├── profile.md              # Living profile — THE most important file
├── schema.md               # Organization rules and conventions
├── CLAUDE.md               # This file — Claude Code project rules
├── .brain/                 # System metadata & indexes
│   ├── knowledge-graph.md  # Document relationships
│   ├── audience-profiles.md # Audience derivation rules
│   ├── artifact-registry.md # Produced content tracking
│   ├── sync-log.md         # External system sync history
│   └── templates/          # Reusable templates
├── inbox/                  # Raw intake before processing
├── projects/               # Active and shelved projects
├── areas/                  # Ongoing life areas (no end date)
├── interests/              # Topics Andrew follows
├── resources/              # Processed reference material
├── logs/                   # System activity
└── skills/                 # Claude Code skills
```

---

## What NOT to Do

- Don't just save links — process and connect them (read the intake skill)
- Don't create empty folders — structure follows content
- Don't backfill metadata on files you aren't actively working with
- Don't force connections that don't exist — be honest about uncertainty
- Don't organize for organization's sake — file things where they'll be *useful*
- Don't add friction — if something doesn't fit neatly, inbox it and move on
