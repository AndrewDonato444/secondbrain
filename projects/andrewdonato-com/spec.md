---
created: 2026-04-09
updated: 2026-04-09
status: in-progress
connections:
  - "[Building Out Loud Series](../linkedin-walk-series/series-overview.md)"
  - "[Profile](../../profile.md)"
  - "[MSA Product Overview](../modern-signal-advisory/product-overview.md)"
relevance: [andrewdonato-com, linkedin-walk-series, career]
---

# andrewdonato.com — Site Spec

## Implementation Status

**Site is LIVE** at andrewdonato.com. Built in Next.js + Tailwind, deployed on Vercel.

| Area | Status | Notes |
|------|--------|-------|
| Home page | ✅ Done | Name, tagline, Now section, latest episode, recent feed, nav grid |
| Dark theme + design | ✅ Done | Dark bg, green accent, Inter/Caveat/Space Grotesk fonts |
| Sidebar nav | ✅ Done | Overview, Writing, Projects, Actions, Archive, About |
| Projects section | ✅ Done | 5 projects listed |
| Building Out Loud | ✅ Done | 1 episode live |
| Writing section | ✅ Scaffolded | Template ready, no posts yet (expected) |
| Resume page | ✅ Done | Linked from nav |
| About page | ✅ Done | In nav |
| Archive/Resources | ✅ Done | In nav |
| Email signup | ⬜ Not started | Need inline form on home + episode pages |
| Sidebar label fix | ⬜ Not started | "Actions" → "Building Out Loud" |

---

## One-Liner

Andrew Donato's home on the internet. A single place that ties together everything he's building, thinking about, and sharing — projects, writing, the Building Out Loud video series, and curated resources. The URL you put in your LinkedIn bio and never have to change.

---

## Philosophy

This is Andrew's hub — the one link that represents him online. It should feel like opening a smart person's well-organized notebook. Not a portfolio. Not a marketing page. Not a landing page for any single project. A **home base** — fast, scannable, dark, and quietly impressive.

Think: a personal dev docs site crossed with a curated reading list. The vibe is "this person knows what they're doing and shares it openly." No hero sections, no testimonials, no aggressive CTAs. Just substance.

The site grows with Andrew. Today it has projects and the start of a video series. In six months it might have writing, a newsletter archive, new ventures. The architecture should accommodate that without a redesign.

**Design constraint:** If it can't be represented as markdown with some light structure around it, it's too complicated.

---

## Design Direction

### Visual Language ✅ IMPLEMENTED
- **Dark/minimal tech.** Dark background, light text — live and looking clean
- Sans-serif body (Inter), Caveat for personality, Space Grotesk for labels/accents
- **Green accent** for links, active states, and interactive elements — keeping this as-is
- Text-first. Generous whitespace. Content breathes.

### Layout ✅ IMPLEMENTED
- Max-width content column, centered
- Persistent left sidebar on desktop with nav: Overview, Writing, Projects, Actions, Archive, About
- Footer: `Andrew Donato · 2026`

### Responsive
- Mobile-first. A lot of traffic will come from LinkedIn on phones.
- Sidebar collapses to top nav or hamburger on mobile
- All content pages should be fully readable on a phone with zero horizontal scroll

---

## Information Architecture

```
andrewdonato.com
├── /                            ← Home — who Andrew is + what's happening now
├── /projects                    ← What Andrew is building
│   ├── /projects/msa            ← Modern Signal Advisory
│   ├── /projects/second-brain   ← The Second Brain
│   ├── /projects/facts-unlocked ← AI Video Pipeline
│   ├── /projects/manager-forge  ← Manager Forge (on shelf)
│   └── /projects/narrative      ← Narrative (on shelf, origin story)
├── /building-out-loud           ← The video series hub
│   ├── /building-out-loud/[slug] ← Individual episode pages
│   └── (index = episode list)
├── /writing                     ← Long-form posts, essays, thinking (future-proofed)
│   └── /writing/[slug]          ← Individual posts
├── /resources                   ← Curated links, tools, reads
├── /resume                      ← Existing resume (carried over)
├── /about                       ← The full story
└── /rss                         ← RSS feed (episodes + writing)
```

**Why this structure:** Every top-level section is a category of *thing Andrew does*. Building Out Loud sits alongside Projects, Writing, and Resources as equals — not above them. New sections (a podcast, a course, a newsletter archive) slot in at the top level without disrupting anything.

---

## Page Specs

### Home (`/`) — ✅ MOSTLY IMPLEMENTED

The front door. Should immediately communicate: who Andrew is, what he's about, and what's happening right now.

**Content (top to bottom):**

1. ✅ **Name + positioning line** — "Andrew Donato" + "Sales leader. Builder. Figuring it out in public." — live and reads perfectly.

2. ✅ **"Now" section** — Three current focus items (MSA, Building Out Loud, building AI products). Live.

3. ✅ **Latest episode card** — Featured prominently with date, title, summary, "Read more →". Live.

4. ✅ **Recent content feed** — Mixed chronological list with type tags (EPISODE, PROJECT). Live.

5. ✅ **Archive stats** — 5 Projects, 1 Episode with "View all →". Live.

6. ✅ **Quick nav grid** — Projects, Building Out Loud, Writing, About cards at bottom. Live.

7. ⬜ **Email signup** — NOT YET IMPLEMENTED. Need a simple inline form. "I send a weekly email. No noise." One field, one button. Best placement: between the Recent section and the quick nav grid, or below the Now section.

**Still needs:**
- Sidebar label "Actions" → should be "Building Out Loud" for clarity
- Email signup form (see Mailing List section below)

---

### Building Out Loud — Index (`/building-out-loud`)

The hub for the LinkedIn video series. Has its own brief intro at top — what the series is, the format (morning walk videos, 60-90 seconds, raw and real), and the positioning line: *"What happens when a sales leader starts building."*

**Episode list:**
- Reverse-chronological
- Filterable by pillar (Building in Public / Sales Leadership / AI × Sales / Tools & Discoveries)
- Each row: date (monospace), title (link), pillar tag
- Grouped by week with a subtle divider: `Week 1 — April 9-11, 2026`
- Simple, dense, scannable — think changelog format

---

### Building Out Loud — Episode Page (`/building-out-loud/[slug]`)

One page per video episode. The deeper cut behind a 90-second walk video.

**Frontmatter / Metadata (rendered as a header block):**
```
Episode 3 · Friday, April 11, 2026
Pillar: AI × Sales
```

**Content sections:**

1. **Title** — the episode title from the outline (e.g., "The $14 million question")

2. **TL;DR** — 2-3 sentence summary of the episode's main point. For the person skimming.

3. **The Full Take** — A written expansion of the talking points. NOT a transcript — a cleaned-up, slightly deeper version of what Andrew said. ~300-600 words. Written in first person, conversational tone. This is the meat.

4. **Resources** — Bulleted list of links relevant to this episode:
   - Articles referenced
   - Tools mentioned
   - Related projects (links to `/projects/*`)
   - Related episodes (links to other `/building-out-loud/*`)

5. **The Question** — The closing question from the video, pulled out as a styled blockquote. Invites people to go comment on the LinkedIn post.

6. **LinkedIn link** — Direct link to the original video post.

**Rendering notes:**
- Markdown-rendered. The content can literally be authored as `.md` files.
- Pillar displayed as a colored tag/chip
- "Resources" section uses simple bullet links, nothing fancy
- Previous / Next episode navigation at the bottom

---

### Writing (`/writing`)

Long-form posts, essays, and thinking. This section may be empty at launch and that's fine — it's future-proofed so Andrew has a place for written content that isn't tied to a video episode.

**Use cases:**
- A deeper essay that grew out of a Building Out Loud episode
- A standalone piece on sales leadership, AI, or building
- Project retrospectives ("What I learned building MSA")
- Technical write-ups

**Index layout:** Same pattern as episodes — reverse-chronological, date + title + optional tag. No categories needed at launch; just a flat list.

**Post layout:** Title, date, body (markdown-rendered), related links at bottom. Simple.

**Why this exists separately from Building Out Loud:** Not everything Andrew writes will map to a video. Keeping them separate means the video series stays focused (short, punchy, walk-and-talk) and writing can be longer and more exploratory.

---

### Projects (`/projects`)

One card or section per project. Not deep dives — contextual summaries of what Andrew is building and has built, so anyone landing on the site can understand the full picture.

**Per project:**
- Project name
- One-liner description
- Status badge: `Active` / `Beta` / `On Shelf`
- 2-3 paragraph summary of what it is and why it exists
- Tech stack (rendered as inline tags)
- Link to the live site (if applicable)
- Related content — episodes and writing that reference this project (auto-populated or manually linked)

**Projects to include at launch:**
1. **Modern Signal Advisory** — the intelligence platform for luxury real estate
2. **The Second Brain** — the AI-powered knowledge system (this site's content engine)
3. **Facts Unlocked** — the autonomous AI video pipeline
4. **Manager Forge** — async sales manager training (on shelf, but referenced in content)
5. **Narrative** — the career presence platform (on shelf, but part of the origin story)

---

### Resources (`/resources`)

Curated collection of links, tools, articles, and frameworks that Andrew references across the site — in episodes, writing, and project pages. Think of it as a public-facing slice of the Second Brain.

**Organization:**
- Grouped by category: Tools, Articles, Frameworks, People
- Each entry: title, one-line description, link, and where it was referenced (episode, post, or project)
- Searchable / filterable (even just Cmd+F is fine for v1)

This page grows organically as content references new resources.

---

### About (`/about`)

The full story. First person. Not a resume (that's `/resume`).

**Content:**
- 3-4 paragraphs: Who Andrew is, the career trajectory (17 years B2B SaaS sales → VP → taught himself to build AI products), the convergence thesis ("product and sales are merging"), what he's doing about it
- Why this site exists — the hub for everything he's building and learning
- Mention of Building Out Loud, but as one thing he does, not the entire identity
- Links to: LinkedIn profile, GitHub, email
- Maybe a single photo (headshot, nothing staged)
- Tone: confident, open, not selling anything. "This is where I work in public."

---

## Tech Stack

### Recommended: Astro + Markdown

**Why Astro:**
- Static site generator with first-class markdown support
- Content Collections API means all content types (episodes, posts, projects) are just `.md` files in folders
- Zero JS shipped by default (fast on mobile from LinkedIn clicks)
- Dark theme is trivial with global CSS
- Deploys to Vercel in one command (Andrew already uses Vercel)
- If interactivity is needed later (search, filters), Astro islands let you drop in React components without rebuilding

**Alternative: Next.js (if Andrew prefers staying in one ecosystem)**
- He already knows Next.js from MSA
- MDX support via `next-mdx-remote` or `contentlayer`
- Heavier than needed for this use case but familiar

**Alternative: Plain HTML + Markdown pipeline**
- Eleventy (11ty) — even simpler than Astro, just markdown → HTML
- No framework knowledge needed

### Deployment
- **Vercel** (already has an account, already uses it for MSA)
- Custom domain: `andrewdonato.com`

### Content Authoring
- Episodes are markdown files in `/content/building-out-loud/`
- Writing/blog posts are markdown files in `/content/writing/`
- Projects are markdown files in `/content/projects/`
- Resources could be a single YAML or JSON file, or individual markdown files
- Frontmatter defines metadata per content type (see examples below)

### Example Episode Frontmatter

```yaml
---
title: "The $14 million question"
date: 2026-04-11
episode: 3
week: 1
pillar: "ai-sales"
slug: "the-14-million-question"
linkedin_url: "https://linkedin.com/posts/..."
summary: "One company saved $14M by having AI handle 1.5 million customer conversations. What that means for sales teams."
resources:
  - label: "EliseAI case study"
    url: "https://..."
  - label: "Modern Signal Advisory"
    url: "/projects/msa"
related_episodes:
  - "sales-leaders-should-build"
---
```

### Example Writing/Blog Frontmatter

```yaml
---
title: "What I learned building MSA from scratch"
date: 2026-04-20
slug: "what-i-learned-building-msa"
summary: "Nine months ago I didn't know how to code. Now I have a four-product SaaS platform. Here's the honest version."
tags:
  - building
  - msa
  - lessons
related_projects:
  - "msa"
---
```

---

## Content Pipeline

### Episodes (Building Out Loud)
1. Andrew records the walk video and posts to LinkedIn
2. Andrew (or the Second Brain) writes the episode markdown — talking points expanded into prose, resources linked, question pulled out
3. File dropped into `/content/building-out-loud/` with proper frontmatter
4. Git push → Vercel auto-deploys
5. LinkedIn post description updated with link: `More at andrewdonato.com/building-out-loud/[slug]`

### Writing/Blog Posts
1. Andrew writes the post as a markdown file (in Cursor, VS Code, Obsidian, whatever)
2. File dropped into `/content/writing/` with frontmatter
3. Git push → Vercel auto-deploys
4. Share link wherever — LinkedIn, email, etc.

### Future Automation (v2)
- Second Brain generates draft episode pages from the series outline + intake
- Second Brain suggests blog post topics based on accumulated knowledge
- Auto-extract LinkedIn post URLs via API and backlink
- Cross-linking: when a new post references a project, auto-add it to that project's "Related content" section

---

## Mailing List

**Goal:** Capture emails from site visitors. One list, fed from multiple touchpoints across the site.

### Implementation
- **Substack embed or custom form** — Substack provides an embeddable subscribe form. Drop it in three places:
  1. **Home page** — in the "Now" section area. Simple: "I send a weekly email. No noise." One email field, one button.
  2. **Episode pages** — at the bottom, after the content. "Liked this? I send a weekly email with the stuff that didn't make the video."
  3. **Blog posts** — at the bottom. "Want more like this? I write a weekly email."
- **Styling:** Override Substack's default embed styles to match the dark theme. If the embed is too rigid, use a custom form that posts to Substack's subscribe API endpoint (`https://[publication].substack.com/api/v1/free`).
- **No pop-ups. No modals. No gates.** The signup is there if you want it, invisible if you don't.

### Alternative: Buttondown or ConvertKit
If Substack's embed is too clunky to style, Buttondown is a better fit for developer-type sites — minimal, API-friendly, easy to dark-theme. ConvertKit if Andrew wants automation/sequences later.

### Content Strategy
- Weekly email recapping what Andrew built, wrote, and shared that week — episodes, blog posts, resources
- Low-volume, high-signal — matches the "no noise" ethos of the site

---

## Existing Resume Page

There's already a resume/CV page live on the current andrewdonato.com deployment. This needs to be **preserved and integrated**, not replaced.

### Plan
- Keep the resume at `/resume` (or wherever it currently lives)
- Add a nav link: subtle, maybe in the About page or in the sidebar under the main nav items
- Match it to the new dark theme if it doesn't already fit
- If the resume is a standalone HTML page or React component, port it into the new site's framework (Astro layout wrapper or Next.js page) so it shares the global nav and theme
- **Do not rebuild the resume** — carry over the existing content and structure, just re-skin to match

### Discovery needed
- What framework/format is the current resume page built in?
- Is it a single HTML file, a React component, or something else?
- Any other pages on the current deployment that should carry over?

---

## What's Out of Scope (v1)

- **Comments / discussion** — that happens on LinkedIn. The site is read-only.
- **Analytics beyond basics** — Vercel Analytics or a simple Plausible embed is fine. No GA.
- **Search** — browser Cmd+F is fine for v1. If the site grows past ~50 pages total, add pagefind or similar.
- **CMS / admin panel** — overkill. Markdown files in a repo.
- **AI features on the site itself** — this is a static companion, not a product.

---

## Launch Plan

### Phase 1: Launch the hub (target: April 11-13)
- Home page with "Now" section, latest content feed, email signup
- About page
- Projects page with all 5 projects (even if summaries are thin)
- Building Out Loud section with Episode 1
- Writing section (can be empty at launch — just needs the template ready)
- Resume page carried over from existing deployment
- Mailing list connected (Substack embed or Buttondown)
- Dark theme, mobile-responsive
- Deployed to Vercel on andrewdonato.com

### Phase 2: Build the rhythm (Weeks 2-4)
- New episode page for every Building Out Loud video
- First blog post or two in /writing
- Resources page starts accumulating
- Refine templates based on what feels right
- Add Previous/Next navigation within sections

### Phase 3: Quality of life (Month 2+)
- Pillar filtering on episode index
- RSS feed (episodes + writing combined)
- OG images auto-generated per page (for link previews)
- Second Brain auto-generates draft content
- Cross-referencing system (posts ↔ projects ↔ episodes) gets richer

---

## Success Criteria

This site is working if:
1. Andrew can publish any new content (episode, blog post, project update) in under 10 minutes — write markdown, push, done
2. When someone asks "what do you do?" Andrew can just send the URL
3. The site grows naturally as Andrew does more — new sections slot in without a redesign
4. It looks good enough that Andrew is proud to put it in his LinkedIn bio
5. Zero maintenance overhead — no CMS to manage, no databases, no auth
6. The mailing list grows organically from site visitors

---

## Open Questions

1. **Existing resume implementation** — What framework is the current resume built in? Need to inspect the live deployment to plan the port.
2. **Substack vs. Buttondown vs. ConvertKit** — Which email platform? Substack has built-in audience but clunky embeds. Buttondown is cleaner for dev sites. ConvertKit if sequences matter.
3. **Photo on About page** — Does Andrew want a headshot or keep it text-only?
4. **Episode numbering** — Sequential numbers (Episode 1, 2, 3...) or just dates? Numbers feel more "series-like."
5. **Pillar colors** — Should each content pillar have its own accent color for tags, or keep it monochrome?
6. **LinkedIn CTA** — Should each episode page have a prominent "Watch the video" button linking to LinkedIn, or keep it subtle?
