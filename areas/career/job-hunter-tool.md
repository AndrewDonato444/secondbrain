---
id: DOC-037
created: 2026-04-12
updated: 2026-04-12
type: reference
domain: career
status: active
informs: [DOC-014, DOC-001]
---

# Career-Ops (JobHunter)

**Location:** `~/JobHunter`
**Source:** [github.com/santifer/career-ops](https://github.com/santifer/career-ops) (open-source, MIT)
**Stack:** Node.js, Playwright, Go (dashboard TUI), Claude Code skills

## What It Does

AI-powered job search pipeline that runs as a Claude Code skill. Paste a job URL or description and it:

- Evaluates fit against Andrew's CV with A-F scoring (10 weighted dimensions)
- Generates tailored ATS-optimized PDF CVs per job description
- Scans 45+ company career pages automatically (Greenhouse, Ashby, Lever)
- Batch processes multiple offers in parallel
- Tracks everything in a single markdown-based pipeline
- Builds a STAR+R interview story bank across evaluations

## Key Files

| File | Purpose |
|------|---------|
| `cv.md` | Andrew's canonical CV |
| `config/profile.yml` | Targeting preferences, salary range, deal-breakers |
| `modes/_profile.md` | Andrew's customizations (never overwritten by updates) |
| `portals.yml` | Companies and search queries to scan |
| `data/applications.md` | Application tracker |
| `data/pipeline.md` | Inbox of pending URLs to evaluate |
| `reports/` | Evaluation reports |
| `interview-prep/story-bank.md` | Accumulated STAR+R stories |

## How to Use

Run Claude Code from `~/JobHunter` directory. Main commands:

- Paste a job URL → full auto-pipeline
- `/career-ops scan` → scan portals for new offers
- `/career-ops batch` → batch evaluate multiple offers
- `/career-ops tracker` → view application status
- `/career-ops pdf` → generate tailored CV

## Connection to Second Brain

Career opportunities and interview prep that come out of JobHunter get filed in `areas/career/interviews/`. The tool handles the pipeline; the brain handles the knowledge and prep.
