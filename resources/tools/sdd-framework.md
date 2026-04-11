---
id: DOC-018
created: 2026-04-07
updated: 2026-04-10
type: reference
domain: ai-frontier
source_intake: GitHub repo AndrewDonato444/facts-unlocked (README)
audience: personal
informs: [DOC-003, DOC-007, DOC-009]
status: active
synced-to: []
---

# SDD: Spec-Driven Development Framework

Andrew's custom development framework. This is the harness he uses to build everything.

**Repo:** github.com/AndrewDonato444/facts-unlocked

## What It Is

An AI-assisted development framework combining spec-first design with compound learning. Works with both Cursor and Claude Code (configurable via CLI_PROVIDER).

## Core Concepts

- **Specification-first:** Behavioral specs (in user vocabulary) precede any code. Specs are scoped to "user patience levels" — practical, not academic.
- **Red-Green-Refactor TDD:** Each feature follows Spec → RED (failing tests) → GREEN (implementation) → Refactor → Drift Check → Compound Learning → Code Review → Commit.
- **User Personas:** Every feature is evaluated through persona perspectives before implementation.
- **Roadmap-Driven:** Features build incrementally from a centralized roadmap, enabling multi-day autonomous builds.
- **Overnight Autonomous Development:** The framework can run builds overnight, producing fresh PRs each morning.
- **Compound Learning:** The agent learns progressively across sessions, capturing patterns in a learnings directory.

## Key Directories

- `.specs/` — vision, roadmap, personas, feature specs (Gherkin), design system, learnings
- `scripts/` — build-loop-local.sh, overnight-autonomous.sh, nightly-review.sh, etc.
- `.claude/commands/` — Claude Code slash commands
- `.cursor/` — Cursor IDE rules, commands, hooks
- `DonatoSkills/` — Andrew's custom skills

## Why This Matters for the Second Brain

This framework is the tool that could be used to build the Second Brain's Layer 3 (the actual application — chat interface, API, scheduled jobs). When we're ready to build beyond Cowork sessions, SDD is the harness.

Also relevant: the compound learning system in SDD is philosophically aligned with the Second Brain concept — both are about knowledge that accumulates and compounds over time rather than being one-shot.
