# Knowledge Graph

> Tracks relationships between all documents in the Second Brain. Updated whenever documents are created or modified. Read this before editing any document to understand what might be affected downstream.

Last updated: 2026-04-14

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
| DOC-008 | projects/modern-signal-advisory/managed-agents-opportunity.md | msa | knowledge | superseded |
| DOC-009 | projects/facts-unlocked/pipeline-spec.md | facts-unlocked | knowledge | active |
| DOC-010 | projects/building-out-loud/series-overview.md | building-out-loud | knowledge | active |
| DOC-011 | projects/building-out-loud/episodes/upcoming.md | building-out-loud | artifact | active |
| ~~DOC-012~~ | ~~merged into DOC-010~~ | — | — | superseded |
| DOC-013 | projects/andrewdonato-com/spec.md | building-out-loud | knowledge | active |
| DOC-014 | areas/career/resume.md | career | knowledge | active |
| DOC-015 | areas/career/interviews/elise-ai/opportunity.md | career | knowledge | active |
| DOC-016 | areas/career/interviews/coram-ai/opportunity.md | career | knowledge | active |
| DOC-017 | areas/career/interviews/elise-ai/natalie-call-notes.md | career | knowledge | active |
| DOC-018 | resources/tools/sdd-framework.md | ai-frontier | reference | active |
| DOC-019 | resources/frameworks/high-ticket-sales-four-emotional-states.md | msa | reference | active |
| DOC-020 | resources/tools/markitdown-microsoft.md | ai-frontier | reference | active |
| DOC-021 | resources/tools/markitdown-file-converter.md | ai-frontier | reference | superseded |
| DOC-022 | resources/tools/voxcpm2-tts-voice-cloning.md | facts-unlocked | reference | active |
| DOC-023 | resources/tools/bloom-screen-recorder.md | ai-frontier | reference | active |
| DOC-024 | resources/tools/graphify-knowledge-graphs.md | ai-frontier | reference | active |
| DOC-025 | interests/ai-frontier/claude-managed-agents.md | ai-frontier | knowledge | active |
| DOC-026 | interests/ai-frontier/bloom-ai-screen-recording.md | ai-frontier | knowledge | active |
| DOC-027 | interests/ai-frontier/graphify-knowledge-graphs.md | ai-frontier | knowledge | active |
| DOC-028 | projects/pre-call-research/vision.md | personal | knowledge | active |
| ~~DOC-029~~ | ~~merged into DOC-011~~ | — | — | superseded |
| PERSON-001 | areas/career/interviews/elise-ai/natalie-ngo.md | career | person | active |
| DOC-030 | areas/career/interviews/elise-ai/interview-prep-practical.md | career | knowledge | active |
| PERSON-002 | resources/people/ryan-sales-edge.md | personal | person | active |
| DOC-031 | resources/frameworks/managed-agents-service-business.md | ai-frontier | reference | active |
| DOC-032 | resources/frameworks/openclaw-seo-content-automation.md | ai-frontier | reference | active |
| PERSON-003 | resources/people/brian-knox.md | msa | person | active |
| PERSON-004 | resources/people/jason-knox.md | msa | person | active |
| DOC-033 | areas/finances/active-subscriptions.md | finances | knowledge | active |
| DOC-034 | projects/scrollproxy/technical-spec.md | personal | knowledge | active |
| DOC-035 | projects/urcooked-ai/concept.md | personal | knowledge | active |
| DOC-036 | interests/ai-frontier/anthropic-mythos-glasswing.md | ai-frontier | knowledge | active |
| DOC-037 | areas/career/job-hunter-tool.md | career | reference | active |
| DOC-039 | resources/tools/gojiberry-linkedin-outreach.md | personal | reference | active |
| DOC-041 | interests/ai-frontier/sar-sovereign-agent-runtime.md | ai-frontier | knowledge | active |
| PERSON-006 | resources/people/doug-dockery.md | trackforce | person | active |
| DOC-042 | projects/sales-edge-solutions/overview.md | personal | knowledge | active |
| DOC-043 | projects/outbound-as-a-service/concept.md | personal | knowledge | active |
| DOC-040 | projects/sales-edge-solutions/gojiberry-outreach-spec.md | personal | knowledge | active |
| PERSON-005 | resources/people/andrew-donato.md | personal | person | active |
| DOC-038 | inbox/2026-04-12-high-income-skills-irrelevant-ai.md | ai-frontier | knowledge | active |
| DOC-044 | inbox/2026-04-14-trend-jacking-affiliate-arbitrage.md | ai-frontier | knowledge | active |
| DOC-045 | projects/trend-jacker/vision.md | ai-frontier | knowledge | active |
| DOC-046 | areas/personal/private/book-for-ellie.md | personal | knowledge | active |
| DOC-048 | resources/tools/firecrawl-document-parsing.md | ai-frontier | reference | active |

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
| DOC-007 | supersedes | DOC-008 | DOC-008 marked superseded 2026-04-13 |
| DOC-009 | depends-on | DOC-018 | Pipeline uses SDD framework for development |
| DOC-009 | informs | DOC-001 | Pipeline spec feeds profile's project description |
| DOC-010 | depends-on | DOC-001 | Series overview draws from profile |
| DOC-010 | depends-on | DOC-014 | Series positioning draws from resume/career history |
| DOC-010 | informs | DOC-003 | Series mentions MSA as primary project |
| DOC-011 | derived-from | DOC-010 | Week 1 episodes derived from series overview |
| DOC-010 | informs | DOC-003 | Series overview references MSA |
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
| DOC-020 | supersedes | DOC-021 | DOC-021 marked superseded 2026-04-13 |
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
| DOC-028 | informs | DOC-003 | SignalPrep validates "intelligence prep" thesis shared with MSA |
| DOC-028 | informs | DOC-010 | SignalPrep build process = Building Out Loud content |
| DOC-011 | informs | DOC-028 | Episode 5 teases SignalPrep |
| DOC-011 | informs | DOC-009 | Episode 7 showcases Facts Unlocked pipeline |
| DOC-011 | informs | DOC-019 | Episode 6 applies high-ticket sales framework |
| PERSON-001 | extends | DOC-015 | Natalie is a contact from EliseAI opportunity |
| PERSON-001 | extends | DOC-017 | Call notes document the interaction with Natalie |
| DOC-030 | extends | DOC-015 | Practical exercise is part of EliseAI interview process |
| DOC-030 | depends-on | DOC-017 | Natalie call notes inform how to frame answers |
| DOC-030 | informs | DOC-019 | High-ticket framework applies to enterprise healthcare selling |
| DOC-030 | informs | DOC-009 | Analytics loop pattern parallels funnel diagnosis approach |
| DOC-031 | depends-on | DOC-025 | Service business playbook built on managed agents knowledge |
| DOC-031 | informs | DOC-001 | Directly relevant to $15k/month escape velocity goal |
| DOC-031 | informs | DOC-007 | Business model layer on top of MSA's managed agents opportunity |
| DOC-031 | informs | DOC-003 | MSA real estate clients = first managed agent service clients |
| DOC-031 | informs | DOC-010 | AI services business = Building Out Loud content |
| DOC-025 | informs | DOC-031 | Technical managed agents knowledge feeds the business playbook |
| DOC-032 | informs | DOC-009 | SEO automation pipeline mirrors Facts Unlocked's self-optimization loop pattern |
| DOC-032 | informs | DOC-003 | Could drive organic SEO traffic to MSA via luxury real estate keywords |
| DOC-032 | informs | DOC-001 | Potential passive income channel toward $15k/month goal |
| PERSON-003 | informs | DOC-003 | Brian is CEO of MSA; Knox Brothers is the origin client |
| PERSON-003 | informs | DOC-004 | Brian's broker perspective shapes MSA sales strategy |
| PERSON-003 | informs | DOC-005 | Brian's real estate expertise drives advisor strategy spec |
| PERSON-003 | informs | DOC-006 | Brian's day-to-day informs the advisor strategy pattern |
| PERSON-003 | informs | DOC-001 | Close friend (~10 years), core MSA team member |
| PERSON-004 | informs | DOC-003 | Jason is MSA officer; co-runs Knox Brothers |
| PERSON-004 | informs | DOC-001 | Core MSA team member |
| PERSON-003 | extends | PERSON-004 | Twin brothers, co-founders of Knox Brothers |
| PERSON-004 | extends | PERSON-003 | Twin brothers, co-founders of Knox Brothers |
| DOC-034 | informs | DOC-001 | ScrollProxy is a new personal project worth tracking in profile |
| DOC-034 | informs | DOC-010 | ScrollProxy build process = potential Building Out Loud content |
| DOC-035 | informs | DOC-001 | urcooked.ai is a new project idea |
| DOC-035 | informs | DOC-010 | Building urcooked.ai = Building Out Loud content |
| PERSON-005 | informs | DOC-001 | Andrew is the subject of the living profile |
| PERSON-005 | informs | DOC-003 | Andrew is de facto CTO of MSA |
| PERSON-005 | informs | DOC-009 | Andrew built the Facts Unlocked pipeline |
| PERSON-005 | informs | DOC-010 | Andrew is the host/creator of Building Out Loud |
| PERSON-005 | informs | DOC-014 | Andrew is the subject of the resume |
| PERSON-005 | extends | PERSON-003 | Andrew and Brian are co-founders/partners in MSA |
| PERSON-005 | extends | PERSON-002 | Andrew is helping Ryan with GTM for Sales Edge |
| DOC-041 | informs | DOC-001 | SAR validates persistent agent architecture thinking |
| DOC-041 | informs | DOC-025 | SAR is the most complete managed agent implementation Andrew has seen |
| DOC-041 | informs | DOC-010 | SAR = Building Out Loud episode material |
| PERSON-006 | informs | DOC-041 | Doug is the builder of SAR |
| PERSON-006 | informs | DOC-001 | Andrew's boss at TrackForce, friend, fellow builder |
| DOC-043 | depends-on | DOC-042 | Sales Edge is client #1 / proof of concept |
| DOC-043 | depends-on | DOC-039 | AutoLinkedIn/Gojiberry is the core tool |
| DOC-043 | depends-on | DOC-031 | Applies the managed agents service business playbook |
| DOC-043 | informs | DOC-001 | Direct path to $15k/month escape velocity |
| DOC-043 | informs | DOC-010 | "I accidentally built a business while helping a friend" = killer episode |
| DOC-038 | informs | DOC-001 | Validates Andrew's trajectory toward sovereign self-employment |
| DOC-038 | informs | DOC-010 | "Sovereign individual" framing = strong Building Out Loud episode lens |
| DOC-038 | informs | DOC-031 | One-person business model aligns with managed agents service business |
| DOC-044 | informs | DOC-043 | Trend-jacking is a parallel managed-agent shape to Outbound-as-a-Service |
| DOC-044 | informs | DOC-031 | Another application of the managed agents service business playbook |
| DOC-044 | informs | DOC-010 | "I built a trend-jacking agent" = Building Out Loud episode material |
| DOC-045 | depends-on | DOC-044 | Vision spec derived from intake note |
| DOC-045 | extends | DOC-032 | Content generation pipeline nearly identical to openclaw SEO automation |
| DOC-045 | extends | DOC-031 | Applies managed agents service business playbook to a B2C affiliate niche |
| DOC-045 | informs | DOC-010 | Build process = Building Out Loud content |
| DOC-045 | informs | DOC-001 | Potential income channel toward $15k/month escape velocity |

---

## Flagged Issues

*No open issues.*

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
