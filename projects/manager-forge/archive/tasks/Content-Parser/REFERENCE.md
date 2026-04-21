# Content Parser Task — Reference Guide

## Overview
This task parses curriculum markdown files (specifically LEARNER-PACK.md) and splits them into individual Google Docs for course delivery.

## Input Files
All 12 LEARNER-PACK.md files located in:
```
projects/Manager-Forge/tasks/Curriculum-Design/modules/Module-{01-12}-[Name]/LEARNER-PACK.md
```

## LEARNER-PACK Structure (All 12 Modules Follow Same Pattern)

```markdown
# [Module Name] — Learner Pack

## Section A: Worksheets (10 total, 2 per sub-module)
### Sub-Module 1 Worksheets
- Worksheet 1-A: [Title]
- Worksheet 1-B: [Title]
### Sub-Module 2 Worksheets
- Worksheet 2-A: [Title]
- Worksheet 2-B: [Title]
... (repeats for all 5 sub-modules)

## Section B: Self-Assessment Tools (4 total)
- Assessment 1: [Name]
- Assessment 2: [Name]
- Assessment 3: [Name]
- Assessment 4: [Name]

## Section C: Role-Play Scenarios (5 total)
- Scenario 1: [Title]
- Scenario 2: [Title]
... (5 scenarios per module)

## Section D: Weekly Zoom Discussion Prompts (5 total)
- Prompt 1: [Title]
- Prompt 2: [Title]
... (5 prompts per module)
```

## Output Structure (Google Drive)

Each module gets a folder with this naming convention:

```
Manager-Forge Curriculum/
└── Module-01-Emotional-Leadership/
    ├── 01-Worksheets/
    │   ├── Worksheet-1-Safety-Foundation.docx
    │   ├── Worksheet-2-Safety-Gap.docx
    │   ├── Worksheet-3-Listening-Signals.docx
    │   └── ... (10 worksheets total)
    ├── 02-Assessments/
    │   ├── Assessment-1-Safety-Level-Check.docx
    │   ├── Assessment-2-Listening-Readiness.docx
    │   └── ... (4 assessments total)
    ├── 03-RolePlay-Scenarios/
    │   ├── RolePlay-1-Rep-Who-Is-Guarded.docx
    │   ├── RolePlay-2-Coaching-Performance-Gap.docx
    │   └── ... (5 role-plays total)
    └── 04-Discussion-Prompts/
        ├── ZoomPrompt-1-Current-1-1-Effectiveness.docx
        ├── ZoomPrompt-2-Listening-Gaps.docx
        └── ... (5 prompts total)
```

## Document Formatting Standards

Every document should have:

**Header:**
```
Manager-Forge Curriculum | [Module Name] | [Document Type]

[TITLE]
```

**Body:**
- Section headers in bold or heading style
- Instructions/objectives at top
- Content (exercises, questions, scenarios)
- Debrief/reflection questions (if applicable)

**Footer:**
```
Manager-Forge Curriculum | [Module Name] | [Document Type]
```

## Parsing Rules

### Worksheets
- **Count per module:** 10 (2 per sub-module)
- **Content:** Exercises, reflection prompts, activity instructions
- **Grouping:** Keep sub-module worksheets together (don't separate related worksheets)
- **Length:** 300-800 words each

### Assessments
- **Count per module:** 4-5 (usually 1 per pillar or 1 per major concept)
- **Content:** Diagnostic tools, scoring rubrics, reflection frameworks
- **Grouping:** Self-contained (each assessment stands alone)
- **Length:** 400-1000 words each

### Role-Play Scenarios
- **Count per module:** 5 (1 per sub-module)
- **Content:** Setup + context + task + debrief questions
- **Grouping:** NEVER separate a scenario from its debrief questions
- **Length:** 500-1200 words each (including all debrief content)

### Discussion Prompts
- **Count per module:** 5 (1 per sub-module, used in live Zoom cohorts)
- **Content:** Discussion starter + facilitator guidance + possible answers
- **Grouping:** Self-contained
- **Length:** 100-300 words each

## Implementation Approach

1. **Parse markdown** using `markdown-it` (Node.js library)
2. **Identify sections** by header structure (##, ###, ####)
3. **Extract subsections** by numbered/bulleted item
4. **Convert to Google Docs** via Google Docs API
5. **Upload to Drive** using `gog` CLI skill
6. **Organize** into folder structure
7. **Share** appropriately

## Tools Available

- **markdown-it** (npm package): Parse markdown structure
- **Google Docs API** (googleapis npm): Create/format documents
- **gog CLI** (ClawHub skill): Upload to Google Drive & organize
- **Node.js**: Build the automation script

## Example Files to Reference

Module 1 LEARNER-PACK (production example):
```
~/.openclaw/workspace/projects/Manager-Forge/tasks/Curriculum-Design/modules/Module-01-Emotional-Leadership/LEARNER-PACK.md
```

All 12 LEARNER-PACK files follow identical structure.

## Success Criteria

For each module parsed:
- ✅ 10 worksheets → individual Google Docs
- ✅ 4-5 assessments → individual Google Docs
- ✅ 5 role-plays → individual Google Docs (with debrief intact)
- ✅ 5 discussion prompts → individual Google Docs
- ✅ 23-25 total docs per module
- ✅ Organized in Drive by type (worksheets folder, assessments folder, etc.)
- ✅ Consistent naming convention
- ✅ Proper formatting (headers, tables, lists preserved)
- ✅ All 12 modules: ~276-300 total Google Docs created

## Next Phase: Automation

Once the parsing logic is proven on 1-2 modules, we can automate:
- Batch process all 12 modules
- Schedule automatic updates when LEARNER-PACK.md changes
- Maintain version history in Drive
- Auto-share with course facilitators

---

**Location:** `projects/Manager-Forge/tasks/Content-Parser/`  
**Status:** Task definition ready | Awaiting implementation
