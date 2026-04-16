---
id: DOC-041
created: 2026-04-13
updated: 2026-04-13
type: knowledge
domain: ai-frontier
source_intake: inbox/2026-04-13-sar-sovereign-agent-runtime.md
status: active
informs: [DOC-001, DOC-025, DOC-010]
---

# SAR: Sovereign Agent Runtime

**Built by:** A friend of Andrew's (private system, not open source)
**What it is:** A persistent AI agent that runs continuously on dedicated hardware — not a chatbot you invoke, but a presence that's already running when you arrive.

## Core Concept

Every AI assistant today is stateless — open a chat, ask a question, session closes, it forgets you. SAR starts from a different premise: the agent should have continuous existence between conversations, persistent memory across sessions, and real-time awareness of the physical environment.

## Architecture

### Sense-Think-Act Loop
Runs every 10 seconds as a macOS LaunchAgent. Each cycle:
1. **Sense** — reads from 9 sensors (system health, weather, calendar, cameras, GPS location, flight status, ambient messages)
2. **Think** — triage classifier (cheap local model) decides: SLEEP, THINK, RESPOND, or ESCALATE
3. **Act** — if action needed, assembles full context and calls primary model (Claude Sonnet) for response

Escalation rules bypass triage for high-priority events (new message = always RESPOND, calendar event in 30 min = ESCALATE).

### Multi-Tier Model Stack
- **Local model** (Gemma/Qwen via Ollama): fast triage classification
- **Primary model** (Claude Sonnet): actual reasoning and responses
- **Fallback model**: redundancy if primary is down

### Memory System (3 tiers + narrative)
- **Working memory**: current conversation thread, discarded at session end
- **Episodic memory**: timestamped log of everything that happened (Postgres)
- **Semantic memory**: distilled facts extracted from experience, with confidence scores. Old facts marked superseded, not deleted
- **Arc memory**: running first-person narrative providing continuity across sessions

### QMD (Quantum Memory Distillation)
Nightly batch process — analogous to sleep consolidation. Processes undistilled episodic memories, extracts new semantic facts, supersedes outdated ones, updates the arc narrative. This is how short-term experience becomes long-term knowledge.

### Sensor Suite (9 sensors)
- System health (CPU, RAM, disk, load)
- Weather (30-min interval, alerts for extremes)
- Google Calendar (multiple accounts, 30-min escalation trigger)
- Nest cameras (WebRTC snapshots, vision model scene description)
- GPS location (via Overland tracker app, geofence awareness)
- Flight tracking (FlightAware AeroAPI, delay/gate/cancellation alerts)
- Ambient relay messages

Sensors run independently, failures are isolated — one broken sensor doesn't take down the others. Stale data is flagged but used (5-min-old weather > no weather).

### Durable Job Engine
Postgres-backed queue for async/scheduled work:
- **reach_out**: proactive contact with gating logic (reasonable hour? user home? no calendar conflict? 30 min since last exchange?)
- **location_update**: processes GPS data, tracks home/away status
- **scout**: background web research for reach-out conversations

### Hot Standby
Two machines. Primary runs everything. Standby is a full replica via Postgres streaming replication (sub-second lag). Manual promotion with single command — deliberate human confirmation to avoid split-brain.

## What Makes This Different

1. **Continuity without re-explaining** — agent already knows your situation from arc + semantic memory
2. **Environmental initiative** — notices things (flight delay, calendar conflict, long silence) and acts without being asked
3. **Work between conversations** — background research, periodic check-ins, monitoring via job engine
4. **Self-hosted** — no external dependency for core loop. Models via API, but orchestration/memory/scheduling on owned hardware

## Forward Path
- Native iOS/macOS apps (replace web relay, add push notifications)
- Deeper home automation integration
- Richer location awareness
- Voice input/output for ambient interaction
- Goal: "a nervous system for the household"

## Why This Matters to Andrew

This is the most complete implementation of a persistent agent architecture Andrew has seen. Several patterns are directly relevant:

- **Memory architecture** → Andrew's Second Brain uses a similar tiered approach (intake → processed knowledge → connections). SAR's QMD distillation process is essentially what the brain's intake processing does — turning raw events into durable knowledge
- **Managed agents opportunity** → SAR validates the "always-on agent" thesis. The reach_out job pattern (proactive contact with gating logic) is exactly what managed agent services could look like for MSA clients
- **Sensor fusion** → The idea of an agent that's aware of physical context (location, cameras, weather, calendar) goes way beyond what most people think of as "AI assistant"
- **Building Out Loud content** → "My friend built an AI that lives on a server in his house and knows where he is, what's on his calendar, and whether his flight is delayed — without him asking" is a killer episode
