---
id: DOC-040
created: 2026-04-13
updated: 2026-04-13
type: knowledge
domain: personal
status: active
depends-on: [DOC-039, PERSON-002]
informs: [DOC-001]
---

# Sales Edge + Gojiberry Outreach Spec

**Goal:** Add an automated LinkedIn outreach channel for Sales Edge Consulting using Claude + Gojiberry AI MCP, running alongside the existing Apollo + Instantly email stack.

**Who:** Andrew (setup + strategy) / Ryan (LinkedIn account + approvals)
**Cost:** $99/mo Gojiberry Pro + Ryan's existing Claude Pro ($20/mo)
**Timeline:** Test on free trial first, go live if results are there

---

## 1. Current State

Ryan's outbound today:
- **Lead sourcing:** Apollo
- **Email sequences:** Instantly
- **LinkedIn:** Manual (if at all)
- **Channel:** Email only

The problem: single-channel outreach. Prospects who don't respond to email get nothing else. LinkedIn is untouched or done manually, which doesn't scale.

## 2. Target State

```
                    ┌──────────────┐
                    │   Claude AI  │
                    │  (claude.ai) │
                    └──────┬───────┘
                           │
                    MCP connector
                           │
                    ┌──────▼───────┐
                    │  Gojiberry   │
                    │  (execution) │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        Lead Discovery   Enrichment   Campaign
        (intent signals) (profiles)   (LinkedIn messages)
```

**Multi-channel flow:**
- Apollo + Instantly handle email sequences (no change)
- Claude + Gojiberry handle LinkedIn outreach (new)
- Same ICP, same leads, two channels touching them

## 3. Sales Edge ICP (for Claude prompts)

Ryan's ideal clients for Sales Edge Consulting (recruiting firm):

- **Who:** Founders, VPs of Sales, CROs, Heads of Revenue at B2B companies
- **Signal:** Actively hiring salespeople (posting sales roles on LinkedIn/job boards)
- **Signal:** Recently raised funding (Series A-C — scaling teams)
- **Signal:** Posting about sales hiring challenges, team scaling, or recruiting pain
- **Signal:** Engaging with sales recruiting content on LinkedIn
- **Company size:** 20-500 employees (big enough to need help, small enough to not have internal recruiting locked down)
- **Geography:** US-based

This ICP definition gets pasted into Claude as the starting prompt. Claude + Gojiberry use the 30+ intent signals to find people matching this profile.

## 4. Setup Steps

### Phase 1: Account Setup (Andrew)

1. Sign up for Gojiberry free trial at gojiberry.ai
2. Get API key from Settings → API
3. Open claude.ai (web browser, NOT desktop app)
4. Go to profile → Settings → Connectors tab
5. Scroll to bottom → "Add custom connector"
6. Name: "Gojiberry AI"
7. URL: `https://mcp.gojiberry.ai`
8. Click Connect → paste API key when prompted
9. Test: open a new chat, click + button → Connectors → toggle Gojiberry on
10. Send test prompt: "Give me a full overview of my account"

**Open question:** Does Ryan need his own Gojiberry account, or can Andrew set it up and Ryan just connects his LinkedIn? Test this during signup.

### Phase 2: Connect Ryan's LinkedIn

1. In Gojiberry dashboard, link Ryan's LinkedIn account
2. Ryan may need to authorize the connection himself (likely OAuth flow)
3. Verify the sender account shows up in Gojiberry
4. Pro plan supports 2 LinkedIn senders — Ryan's is one, Andrew's could be the second if needed

### Phase 3: First Campaign (Andrew builds, Ryan approves)

1. Open new Claude chat with Gojiberry enabled
2. Define ICP:

```
Find high-intent leads matching this profile:
- Founders, VPs of Sales, CROs at B2B companies in the US
- Company size 20-500 employees
- Showing signals: actively hiring salespeople, recently raised funding,
  or posting about sales team scaling challenges
- Prioritize companies with 3+ open sales roles
```

3. Review the leads Claude surfaces
4. Ask Claude to enrich each profile:

```
For each of these leads, enrich their profile and generate a personalized
LinkedIn connection request based on their recent activity, what they're
hiring for, and why Sales Edge Consulting could help.
```

5. Review messages with Ryan before sending
6. Launch campaign in Gojiberry

### Phase 4: Optimize (Ongoing)

Weekly check-in prompts to run in Claude:

- "Analyze my campaigns from the last 7 days. What worked, what didn't, and why?"
- "Which messages got the highest reply rates? What do they have in common?"
- "Find 50 new high-intent leads similar to the ones that replied last week"
- "Show me leads that engaged but didn't reply — draft follow-up messages"

## 5. Message Framework

LinkedIn messages for Sales Edge should follow this structure:

**Connection request (300 char limit):**
- Reference something specific (their hiring post, a role they listed, company news)
- One line on what Sales Edge does
- No hard sell — just open the door

**Example:**
> "Saw you're scaling the sales team at [Company] — [X] roles open right now. I run a recruiting firm that specializes in placing B2B salespeople. Would love to connect."

**Follow-up after connection (if no reply in 3-5 days):**
- Reference the original context again
- Ask a question, don't pitch
- "What's been the biggest challenge filling those roles?"

**Key principles:**
- Short. LinkedIn isn't email — keep it under 3 sentences
- Specific. Reference real things about their company/hiring
- Question-driven. End with something they want to answer
- No "I'd love to pick your brain" or "synergy" language

## 6. Metrics to Track

| Metric | Target | Why |
|--------|--------|-----|
| Connection accept rate | 30%+ | Signals message relevance |
| Reply rate | 10-15% | Industry average is 2-5% for cold — we should beat it with intent signals |
| Meetings booked | 2-4/week | The number that matters |
| Cost per meeting | < $25 | $99/mo ÷ meetings booked |

## 7. Risks

- **LinkedIn limits:** LinkedIn has daily connection request limits (~100/week). Gojiberry should handle throttling, but verify
- **Account flags:** Overly aggressive automation can get LinkedIn accounts restricted. Start slow (20-30 requests/day), ramp up
- **Message quality:** AI-generated messages can sound generic if the intent signals are weak. Always review first batch manually before trusting at scale
- **Ryan's LinkedIn profile:** Needs to look legit and professional before running outreach. If his profile is bare, fix that first

## 8. Phases Summary

| Phase | What | Who | When |
|-------|------|-----|------|
| 1 | Sign up Gojiberry, connect MCP | Andrew | This week |
| 2 | Link Ryan's LinkedIn | Andrew + Ryan | After Phase 1 |
| 3 | First campaign (50 leads) | Andrew builds, Ryan approves | Week 2 |
| 4 | Review results, optimize | Both | Ongoing weekly |

## 9. Decision Point

After the free trial / first 2 weeks:
- If connection accept rate > 25% and we're booking meetings → go to paid ($99/mo)
- If results are flat → evaluate whether it's the tool or the messaging before spending
- Compare cost-per-meeting vs Apollo + Instantly channel
