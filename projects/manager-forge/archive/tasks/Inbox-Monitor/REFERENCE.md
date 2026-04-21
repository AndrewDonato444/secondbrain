# Inbox Monitor Task — Reference Docs

## Source
- **Cold Outreach Playbook, Phase 6:** `~/.openclaw/workspace/playbooks/cold-outreach.md`
- **Prompt:** Email Inbox Management Agent (adapted for Manager-Forge)

## Email Inboxes
- **andrew@** [outreach domain] — Primary contact email
- **hello@** [outreach domain] — Secondary contact email
- **team@** [outreach domain] — Tertiary contact email
- All 3 connected via Google Workspace with App Passwords

## 7 Reply Categories

| Category | Indicator | Action | Response |
|----------|-----------|--------|----------|
| INTERESTED | Positive, asks questions | Flag HOT, draft calendar, alert user | Send calendar link immediately |
| MAYBE LATER | "Not now", "In 3 months", interested but timing | Add to nurture, schedule follow-up | Acknowledge, set follow-up date |
| NOT INTERESTED | "Not a fit", "All set", dismissive | Remove from campaigns, add to DNC | Thank them politely |
| REFERRAL | "I know someone who...", recommend | Extract contact, draft warm intro | Send warm intro mentioning referrer |
| OUT OF OFFICE | Auto-reply, "Back on [date]" | Schedule follow-up 2 days after return | No response, auto-reschedule |
| UNSUBSCRIBE | "Remove me", "Unsubscribe" | Remove from ALL campaigns immediately | NO RESPONSE (legal requirement) |
| ANGRY | Aggressive, complaints, threats | Remove permanently, escalate to user | NO RESPONSE (escalate only) |

## Cron Schedule
- **Every 15 min (8am-6pm EST):** Check inboxes, categorize, flag hot leads
  - Cron: `*/15 8-18 * * *` (Monday-Friday)
- **Daily 6pm report:** Compile metrics and activity summary
  - Cron: `0 18 * * *`

## DNC Management
- **List location:** `pipeline/dnc-list.csv`
- **Columns:** email, reason (NOT_INTERESTED|UNSUBSCRIBE|ANGRY), date_added, campaign_source
- **Before each batch:** Filter outreach list against DNC
- **After each removal:** Update both CSV and Instantly suppression list

## Key Metrics to Track
- Open rate (target: >25%)
- Reply rate (target: >8%)
- INTERESTED ratio
- Days to first reply
- Bounce/complaint rate (<2%)

## Integration Points
- **Instantly API:** For removing/suppressing contacts
- **Google Workspace IMAP:** For checking inboxes
- **gog skill:** For Gmail API access (when needed)
- **Pipeline master CSV:** Update with reply data + outcome

## Response Drafting
- Haiku drafts responses (agent reviews before sending)
- User reviews all drafts before sending live
- Never auto-send responses (keep human in loop)
