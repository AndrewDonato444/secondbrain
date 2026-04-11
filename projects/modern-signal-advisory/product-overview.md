---
id: DOC-003
created: 2026-04-07
updated: 2026-04-10
type: knowledge
domain: msa
source_intake: GitHub repo AndrewDonato444/market-intelligence-report (.specs/vision.md)
audience: personal
informs: [DOC-004, DOC-005, DOC-007, DOC-008, DOC-010, DOC-013]
status: active
synced-to: []
---

# Modern Signal Advisory — Product Overview

Source: `.specs/vision.md` from the market-intelligence-report repo

## What It Is

A four-product intelligence platform for luxury real estate agents. MSA is the engine behind the scenes — reports are agent-branded, MSA doesn't show its face.

## The Four Products

### Signal Report (Market Intelligence)
Agents define their market, luxury tier, and target buyer personas. The system fetches transaction data, runs specialized AI agents (Data Collector, Insight Generator, Competitive Analyst, etc.), and produces magazine-quality market intelligence reports.

### Signal Studio (Content Generation)
Generates persona-specific social content from the intelligence data. All content is filtered through the agent's Voice Profile to ensure it sounds like *them*, not like AI.

### Signal Forecast (Property Scoring)
Standalone product — agents enter a property address and get a 5-factor scoring system, Signal Ratings, and advisory briefs. Sub-90-second delivery. Mobile-first PWA. This one works independently of the other products.

### Signal Voice (Voice Filtering)
The voice layer that ensures all outputs match the agent's authentic tone and communication style.

## Tech Stack
- Next.js
- PostgreSQL
- Claude API (for AI agents)
- Real estate data APIs
- Vercel deployment
- Supabase
- Drizzle ORM

## Business Model
- Subscription tiers gate features (reports/month, markets, kits)
- Admin overrides for flexibility
- Referral program: tier progression tied to successful agent conversions
- Optional "Powered by MSA" badge gives 2x tier acceleration

## Design Philosophy
- Premium UI/UX throughout — Framer Motion animations, contextual tooltips
- Voice-driven content filtering
- Agent-branded output — MSA stays invisible to the end client

## Deferred / Future
- Native apps
- Stripe integration
- White-label reselling
- Real-time alerts

## Status
Live at modernsignaladvisory.com. Approaching beta. Working out kinks.

## What This Means for the Brain
Now that we understand the actual product architecture, future intake can be evaluated against specific MSA components:
- Real estate data sources → Signal Report / Signal Forecast
- AI agent patterns, LLM techniques → all four products
- Content marketing strategies → Signal Studio
- Voice/tone AI → Signal Voice
- SaaS pricing, high-ticket sales → business model and go-to-market
- Mobile-first PWA patterns → Signal Forecast specifically
