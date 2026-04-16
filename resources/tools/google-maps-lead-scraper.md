---
id: DOC-050
created: 2026-04-15
updated: 2026-04-15
type: reference
domain: personal
status: active
informs: [DOC-042, DOC-043, DOC-001]
---

# Google Maps Lead Scraper — Build Guide

**Cost:** $19/mo (RapidAPI Maps Data by alexanderxbx) + $5/mo VPS + Claude Code
**Output:** 40k-80k clean verified business emails per niche per run
**Build time:** One afternoon with Claude Code

## Architecture

1. **Maps Data API** (RapidAPI) → pulls business listings by keyword + zip code
2. **Python email scraper** → hits every website URL, pulls emails from HTML with regex
3. **Dedup + cleaning pipeline** → removes garbage, personals, dead sites, duplicates
4. **Flask dashboard** → point-and-click UI for running searches and exporting CSVs

## The Zip Code Strategy

US has ~32,000 active zip codes. Searching "plumber 10001" vs "plumber 10002" returns completely different results. Run a keyword across all zips = millions of listings instead of hundreds.

- 800k-1.2M raw listings per niche nationally
- 400k-700k unique after dedup
- 35-50% have scrapeable emails → 140k-200k verified emails
- After cleaning: 40k-80k ready-to-use leads

## Cost vs Alternatives

| Source | Cost/month | Cost/lead |
|--------|-----------|-----------|
| This system | $44 | $0.0004 |
| Apollo | $99-499 | $0.05-0.10 |
| ZoomInfo | $1,000+ | higher |
| List vendors | varies | $0.10-0.50 |

100-200x cost reduction. Data is fresher because you pulled it this week.

## Key Technical Details

- API: RapidAPI "maps data" by alexanderxbx ($3 or $19/mo plan)
- Email scraping: regex on raw HTML, NOT LLM-powered. Pattern: `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- Check /contact and /about pages if no email on homepage
- Skip generic emails (info@, hello@, support@) unless nothing else
- 10 concurrent threads for API, 20 for email scraping
- SQLite for storage, dedup on phone + website URL
- Exponential backoff on 429s
- Full national run: 12-24 hours. Email scraping: 10-20 hours.

## Connection to Sales Edge / Outbound-as-a-Service

**Does NOT replace Apollo.** Apollo gives you the person (VP of Sales, their direct email, their LinkedIn, intent signals, role filters). This scraper gives you the business (company email from the website, often generic or owner-level).

**Where it fits:**
- Second lead source for SMB/local business segment where the owner IS the decision maker
- Apollo for enterprise contacts with role/title targeting
- Maps scraper for volume plays in local/SMB niches (agencies, trades, professional services)
- Both feed into Instantly (email) + AutoLinkedIn (LinkedIn)

**For MSA (the obvious play):**
Luxury real estate brokers are local businesses. They have websites with their email on them. They're the owner/decision maker. Search "luxury real estate broker" + "real estate agent" across target zip codes → scrape emails → feed into Instantly + AutoLinkedIn selling MSA subscriptions. This is Andrew's own GTM for his own product using his own outbound stack. No Apollo needed.

**For outbound-as-a-service clients:**
- Clients targeting local businesses (HVAC, legal, real estate, agencies) → Maps scraper is the primary source
- Clients targeting enterprise contacts by title → Apollo stays primary
- Build the scraper once, configure per client niche + region
