# Second Brain Schema

> This document defines how Andrew's Second Brain is organized. It's the rulebook that any AI processing intake should follow. It's deliberately lightweight — the system should be easy to throw things at, not a burden to maintain.

Last updated: 2026-04-10

---

## Design Principles

1. **Friction kills systems.** If it takes more than 10 seconds to capture something, it won't get captured. The system must accept raw, messy input and do the organizing itself.
2. **Everything connects to the profile.** Every piece of information should be evaluated against Andrew's active projects, goals, and interests. If it doesn't connect to anything, it goes in the inbox for later review — not thrown away.
3. **No empty folders.** Structure should emerge from actual content, not be imposed upfront. We start minimal and let the system grow organically.
4. **Files over databases.** Plain markdown. Portable. Readable by any tool. Obsidian-compatible if Andrew wants to use it, but not dependent on it.
5. **The profile is the brain.** `profile.md` is the most important file. It drives all intake processing, connection-making, and proactive surfacing. Keep it current.

---

## Folder Structure

```
Second Brain/
├── profile.md              # Living profile — the system reads this to understand Andrew
├── schema.md               # This file — how everything is organized
├── CLAUDE.md               # Claude Code project rules
├── .brain/                 # System metadata & indexes
│   ├── knowledge-graph.md  # Document relationships (IDs, connections, flags)
│   ├── audience-profiles.md # Audience derivation rules (5 audiences)
│   ├── artifact-registry.md # Produced content tracking
│   ├── sync-log.md         # External system sync history
│   └── templates/          # Reusable templates for content derivation
├── inbox/                  # Raw intake — links, notes, voice dumps, anything
│   └── (timestamped files land here before processing)
├── projects/               # Active and shelved projects
│   ├── modern-signal-advisory/
│   ├── sales-edge-solutions/
│   ├── manager-forge/
│   ├── narrative/
│   └── (new project folders as needed)
├── areas/                  # Ongoing life areas (not projects — no end date)
│   ├── trackforce/         # Day job stuff
│   ├── career/             # Job search, positioning, opportunities
│   ├── family/             # Home life, Ellie, Liza
│   ├── finances/           # Debt tracking, income goals, $15k/month progress
│   └── health/             # If/when relevant
├── interests/              # Main driver — each interest has a pulse.md (living thesis
│   │                         read by ScrollProxy and intake routing as a lens)
│   ├── ai-frontier/        # LLMs, agents, new models, tools
│   ├── sales-product-convergence/  # The wedge of Andrew's career trajectory
│   ├── entrepreneurship/   # Escape velocity ($15k/mo) + idea graveyard subfolder
│   │   └── ideas/          # Concept docs awaiting bandwidth (formerly fake "projects")
│   ├── mets/               # Let's Go Mets (skeleton pulse — needs Andrew's takes)
│   └── current-events/     # Politics/news (skeleton pulse — needs Andrew's takes)
├── resources/              # Processed reference material
│   ├── tools/              # Software, APIs, frameworks worth knowing about
│   ├── people/             # Contacts, influencers, people to watch
│   └── frameworks/         # Mental models, coaching frameworks, methodologies
├── skills/                 # Claude Code skills
└── logs/                   # System activity
    └── intake-log.md       # Record of what was processed and when
```

---

## File Conventions

### Intake Files (inbox/)
When raw content arrives, it gets saved as:
```
inbox/YYYY-MM-DD-short-description.md
```

Each intake file should have frontmatter:
```yaml
---
captured: 2026-04-07
source: x-post | youtube | friend-text | article | voice-note | email | other
url: (if applicable)
status: unprocessed | processed | archived
tags: []
---
```

### Processed Files (everywhere else)
After intake is processed, insights get filed into the appropriate folder with enhanced frontmatter:
```yaml
---
id: DOC-001                # Unique ID (DOC-xxx, ART-xxx, or PERSON-xxx)
created: 2026-04-07
updated: 2026-04-07
type: knowledge            # knowledge | artifact | reference | log | person
domain: msa                # msa | trackforce | career | facts-unlocked | building-out-loud | personal | ai-frontier | finances
source_intake: inbox/YYYY-MM-DD-short-description.md  # trace back to origin
audience: personal          # personal | linkedin | msa-clients | trackforce-leadership | employers | public
depends-on: []              # IDs of docs this requires
extends: []                 # IDs of docs this adds detail to
informs: []                 # IDs of docs this provides context for
status: active              # active | stale | superseded
synced-to: []               # external systems this has been pushed to
---
```

Not every field is required on every file. At minimum include: `id`, `created`, `updated`, `type`, `status`.

**ID scheme:**
- `DOC-xxx` — knowledge documents, project files, resources, intake
- `ART-xxx` — derived artifacts (LinkedIn posts, pitch materials, emails)
- `PERSON-xxx` — people/contact entries

To assign a new ID: check `.brain/knowledge-graph.md` for the highest existing number in that prefix, increment by 1.

### Cross-References
Use standard markdown links: `[related note](../path/to/file.md)`
Connections should be bidirectional when possible — if A links to B, B should link back to A.

---

## Intake Processing Rules

When Andrew throws something at the system, here's what should happen:

1. **Capture it** in `inbox/` with timestamp and source metadata
2. **Read `profile.md`** to understand current projects, goals, and interests
3. **Extract** the key information — what is this about? What's the signal?
4. **Connect** it to existing projects, areas, or interests. Be specific: "This relates to Modern Signal Advisory because..."
5. **File** processed insights into the appropriate folder(s)
6. **Update** the intake log
7. **Flag** anything that's high-priority or time-sensitive
8. **Surface** connections Andrew might not see: "This also relates to..."

### What "processing" means:
- A YouTube link → pull the transcript, identify the 2-3 most relevant segments for Andrew, explain why they matter, file the insights
- A GitHub repo → summarize what it does, assess relevance to active projects, note any techniques worth stealing
- A friend's text → capture the recommendation, figure out what it connects to, file it
- A voice note → transcribe, extract action items and insights, file them
- A random thought → capture it, connect it to what's already in the brain, see if it triggers anything

---

## Knowledge Graph & Relationships

The `.brain/knowledge-graph.md` file tracks all document relationships. When creating or editing documents:

1. Assign an ID if it doesn't have one
2. Add/update the entry in `.brain/knowledge-graph.md`
3. Determine relationship types:
   - `depends-on` — A requires B to be understood/accurate
   - `extends` — A adds detail or applies B in a specific context
   - `informs` — A provides useful context for B (not a hard dependency)
   - `contradicts` — A conflicts with B (**flag to Andrew**)
   - `supersedes` — A replaces B (mark B as `status: superseded`)
   - `derived-from` — artifact was generated from a knowledge doc
4. Maintain bidirectional links
5. When editing, check the graph for downstream documents that might be affected

## Audience Derivation

When creating content for a specific audience, read `.brain/audience-profiles.md` for inclusion/exclusion rules and tone guidance. Register derived artifacts in `.brain/artifact-registry.md`.

## External Sync

When pushing brain content to external systems (Notion, Gmail, Apollo, etc.), log in `.brain/sync-log.md` and update the document's `synced-to` field.

---

## Growth Rules

- New folders get created when a topic accumulates 3+ files — not before
- Projects move between `projects/` active and a `projects/_archive/` subfolder when shelved long enough
- The profile should be reviewed and updated at least monthly
- The schema itself can evolve — this is v1
