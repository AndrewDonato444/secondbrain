# Knowledge Graph

> Tracks relationships between all documents in the Second Brain. Updated whenever documents are created or modified. Read this before editing any document to understand what might be affected downstream.

Last updated: 2026-04-10

---

## Document Registry

| ID | Path | Domain | Type | Status |
|----|------|--------|------|--------|
| DOC-001 | profile.md | personal | knowledge | active |
| DOC-002 | schema.md | personal | knowledge | active |
| DOC-003 | projects/modern-signal-advisory/product-overview.md | msa | knowledge | active |
| DOC-004 | projects/modern-signal-advisory/sales-strategy.md | msa | knowledge | active |
| DOC-005 | projects/modern-signal-advisory/advisor-strategy-spec.md | msa | knowledge | active |
| DOC-006 | projects/modern-signal-advisory/advisor-strategy-pattern.md | msa | knowledge | active |
| DOC-007 | projects/modern-signal-advisory/claude-managed-agents-opportunity.md | msa | knowledge | active |
| DOC-008 | projects/modern-signal-advisory/managed-agents-opportunity.md | msa | knowledge | active |
| DOC-009 | projects/facts-unlocked/pipeline-spec.md | facts-unlocked | knowledge | active |
| DOC-010 | projects/linkedin-walk-series/series-overview.md | building-out-loud | knowledge | active |
| DOC-011 | projects/linkedin-walk-series/episodes/week-1.md | building-out-loud | artifact | active |
| DOC-012 | projects/building-out-loud/overview.md | building-out-loud | knowledge | active |
| DOC-013 | projects/andrewdonato-com/spec.md | building-out-loud | knowledge | active |
| DOC-014 | areas/career/resume.md | career | knowledge | active |
| DOC-015 | areas/career/elise-ai-opportunity.md | career | knowledge | active |
| DOC-016 | areas/career/coram-ai-opportunity.md | career | knowledge | active |
| DOC-017 | areas/career/elise-ai-natalie-call-notes.md | career | knowledge | active |
| DOC-018 | resources/tools/sdd-framework.md | ai-frontier | reference | active |
| DOC-019 | resources/frameworks/high-ticket-sales-four-emotional-states.md | msa | reference | active |
| DOC-020 | resources/tools/markitdown-microsoft.md | ai-frontier | reference | active |
| DOC-021 | resources/tools/markitdown-file-converter.md | ai-frontier | reference | active |
| DOC-022 | resources/tools/voxcpm2-tts-voice-cloning.md | facts-unlocked | reference | active |
| DOC-023 | resources/tools/bloom-screen-recorder.md | ai-frontier | reference | active |
| DOC-024 | resources/tools/graphify-knowledge-graphs.md | ai-frontier | reference | active |
| DOC-025 | interests/ai-frontier/claude-managed-agents.md | ai-frontier | knowledge | active |
| DOC-026 | interests/ai-frontier/bloom-ai-screen-recording.md | ai-frontier | knowledge | active |
| DOC-027 | interests/ai-frontier/graphify-knowledge-graphs.md | ai-frontier | knowledge | active |
| PERSON-001 | resources/people/natalie-ngo.md | career | person | active |
| PERSON-002 | resources/people/ryan-sales-edge.md | personal | person | active |

---

## Relationships

| Source | Relationship | Target | Notes |
|--------|-------------|--------|-------|
| DOC-003 | informs | DOC-004 | Product overview informs sales strategy |
| DOC-004 | depends-on | DOC-019 | Sales strategy applies the four emotional states framework |
| DOC-004 | extends | DOC-003 | Sales strategy extends product overview with go-to-market |
| DOC-005 | depends-on | DOC-003 | Advisor strategy spec requires product context |
| DOC-005 | extends | DOC-007 | Advisor spec extends managed agents opportunity |
| DOC-006 | extends | DOC-005 | Advisor pattern is a practical application of the spec |
| DOC-006 | depends-on | DOC-007 | References managed agents opportunity |
| DOC-007 | depends-on | DOC-003 | Managed agents opportunity evaluated against product overview |
| DOC-007 | depends-on | DOC-018 | References SDD framework for build approach |
| DOC-007 | informs | DOC-027 | Connects to graphify for codebase analysis |
| DOC-008 | depends-on | DOC-003 | Also evaluates managed agents against product overview |
| DOC-008 | depends-on | DOC-018 | Also references SDD framework |
| DOC-007 | contradicts | DOC-008 | **DUPLICATE CONTENT** — Two files covering same topic. Should be merged/one superseded. |
| DOC-009 | depends-on | DOC-018 | Pipeline uses SDD framework for development |
| DOC-009 | informs | DOC-001 | Pipeline spec feeds profile's project description |
| DOC-010 | depends-on | DOC-001 | Series overview draws from profile |
| DOC-010 | depends-on | DOC-014 | Series positioning draws from resume/career history |
| DOC-010 | informs | DOC-003 | Series mentions MSA as primary project |
| DOC-011 | derived-from | DOC-010 | Week 1 episodes derived from series overview |
| DOC-012 | extends | DOC-010 | Building Out Loud overview extends the series concept |
| DOC-012 | informs | DOC-003 | References MSA |
| DOC-013 | depends-on | DOC-010 | Site spec depends on series overview for content |
| DOC-013 | depends-on | DOC-003 | Site showcases MSA |
| DOC-013 | depends-on | DOC-001 | Site reflects profile |
| DOC-014 | depends-on | DOC-001 | Resume draws from profile |
| DOC-014 | informs | DOC-015 | Resume context relevant to EliseAI opportunity |
| DOC-014 | informs | DOC-016 | Resume context relevant to Coram opportunity |
| DOC-015 | informs | DOC-016 | EliseAI and Coram are compared alternatives |
| DOC-016 | informs | DOC-015 | Coram and EliseAI are compared alternatives |
| DOC-015 | informs | DOC-003 | EliseAI has direct real estate overlap with MSA |
| DOC-017 | extends | DOC-015 | Call notes extend the EliseAI opportunity file |
| DOC-017 | informs | DOC-019 | Call notes reference high-ticket sales framework |
| DOC-017 | informs | DOC-009 | Call notes reference Facts Unlocked analytics loop pattern |
| DOC-018 | informs | DOC-003 | SDD framework used to build MSA |
| DOC-018 | informs | DOC-009 | SDD framework used to build Facts Unlocked |
| DOC-019 | informs | DOC-004 | Framework applied in MSA sales strategy |
| DOC-020 | informs | DOC-002 | MarkItDown relevant to brain intake processing |
| DOC-020 | informs | DOC-003 | MarkItDown could enhance MSA document processing |
| DOC-020 | informs | DOC-024 | MarkItDown pairs with Graphify |
| DOC-020 | contradicts | DOC-021 | **DUPLICATE CONTENT** — Two MarkItDown files. Should be merged. |
| DOC-022 | informs | DOC-009 | VoxCPM2 could replace ElevenLabs in Facts Unlocked pipeline |
| DOC-022 | informs | DOC-003 | VoxCPM2 potentially useful for MSA voice features |
| DOC-023 | informs | DOC-009 | Bloom relevant to video pipeline thinking |
| DOC-023 | informs | DOC-018 | Bloom could complement SDD for dev workflows |
| DOC-024 | informs | DOC-002 | Graphify relevant to brain's knowledge organization |
| DOC-024 | informs | DOC-018 | Graphify pairs with SDD for codebase analysis |
| DOC-024 | informs | DOC-003 | Graphify could help with MSA codebase onboarding |
| DOC-025 | informs | DOC-007 | Interest-level managed agents doc informs MSA opportunity |
| DOC-025 | informs | DOC-009 | Managed agents relevant to Facts Unlocked pipeline |
| DOC-026 | informs | DOC-023 | Interest-level Bloom doc connects to tools-level doc |
| DOC-027 | informs | DOC-024 | Interest-level Graphify doc connects to tools-level doc |
| PERSON-001 | extends | DOC-015 | Natalie is a contact from EliseAI opportunity |
| PERSON-001 | extends | DOC-017 | Call notes document the interaction with Natalie |

---

## Flagged Issues

1. **DOC-007 / DOC-008 — Duplicate managed agents opportunity files.** `claude-managed-agents-opportunity.md` and `managed-agents-opportunity.md` cover the same topic. Should merge into one and mark the other as superseded.
2. **DOC-020 / DOC-021 — Duplicate MarkItDown files.** `markitdown-microsoft.md` and `markitdown-file-converter.md` cover the same tool. Should merge into one.

---

## Relationship Types

| Type | Meaning | Action When Source Changes |
|------|---------|--------------------------|
| `depends-on` | A requires B to be accurate | If B changes, A likely needs updating |
| `extends` | A adds detail to B | If B changes fundamentally, review A |
| `informs` | A provides context for B | If A changes, B *may* benefit from review |
| `contradicts` | A conflicts with B | **Flag to Andrew immediately** for resolution |
| `supersedes` | A replaces B | Mark B as `status: superseded` |
| `derived-from` | Artifact generated from knowledge | If source changes, artifact is stale |
