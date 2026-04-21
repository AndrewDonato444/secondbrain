# Content Parser Task — Status

**Task Created:** February 15, 2026  
**Status:** 🟡 DESIGN PHASE → SETUP IN PROGRESS  
**Owner:** DonatoBot (agent) | Andrew (project owner)

---

## ⏸️ CHECKPOINT: We Are Here

**What's Done:**
- ✅ Task folder created (SYSTEM-PROMPT, REFERENCE, STATUS)
- ✅ gog CLI installed (v0.11.0) on Andrew's Mac
- ✅ Research complete on parsing approach

**What's Next (Requires Andrew at Computer):**
- ⏸️ **RUN THIS:** `gog auth add you@gmail.com --services drive,docs`
  - Opens browser → Click "Approve" on Google OAuth screen
  - Stores token securely
  - Takes ~30 seconds
  - One-time setup (then works forever)
  
**After Auth is Done:**
- Build Content Parser script (Node.js)
- Test on Module 01
- Batch all 12 modules

**Pinned For:** Next time Andrew is at computer

---

## Current Phase: Task Definition ✅

- ✅ System prompt created (scope, rules, examples, workflow)
- ✅ Reference guide written (structure, formatting, parsing rules)
- ✅ Output format defined (Google Drive folder structure, naming conventions)
- ✅ Acceptance criteria documented

**Deliverables:** SYSTEM-PROMPT.md, REFERENCE.md, STATUS.md (this file)

---

## Next Phase: Implementation (TODO)

### Phase 1: Parser Script Development
- [ ] Build Node.js script that:
  - Reads LEARNER-PACK.md file
  - Parses markdown structure (markdown-it)
  - Splits into individual document units
  - Converts to Google Docs format (Google Docs API)
  - Uploads to Google Drive (gog CLI)
  - Organizes into folder structure
  
**Estimated time:** 3-4 hours  
**Owner:** DonatoBot (will build as separate sub-task)

### Phase 2: Test on One Module
- [ ] Parse Module 01 LEARNER-PACK.md
- [ ] Create 25 Google Docs (10 worksheets + 4 assessments + 5 role-plays + 5 prompts)
- [ ] Verify formatting is correct
- [ ] Verify folder structure in Google Drive
- [ ] Get Andrew's feedback

**Estimated time:** 1 hour (testing + verification)

### Phase 3: Batch Process All 12 Modules
- [ ] Run parser on remaining 11 LEARNER-PACK.md files
- [ ] Verify all 276-300 documents created correctly
- [ ] Share Google Drive folder with course team
- [ ] Create index document (map of all docs)

**Estimated time:** 30 min (mostly automated)

### Phase 4: Ongoing Maintenance
- [ ] Set up watcher for LEARNER-PACK.md file changes
- [ ] Auto-update Google Docs when source markdown changes
- [ ] Track version history
- [ ] Document any tweaks needed per module

**Estimated time:** 2-3 hours (setup)

---

## Implementation Task Checklist

When ready to build, create a sub-task:
- [ ] Sub-Task: "Build Content Parser Script"
  - [ ] Research markdown-it + Google Docs API integration
  - [ ] Set up Google Docs API credentials
  - [ ] Build parser logic
  - [ ] Build splitter logic
  - [ ] Build uploader logic (gog CLI)
  - [ ] Test on Module 01
  - [ ] Refine based on output
  - [ ] Document usage

---

## Files in This Task Folder

```
Content-Parser/
├── SYSTEM-PROMPT.md (task definition for specialized agent)
├── REFERENCE.md (parsing rules, structure, examples)
└── STATUS.md (this file — tracking progress)
```

---

## Key Metrics

Once implemented, we'll track:
- **Total documents created:** 276-300 (23-25 per module × 12 modules)
- **Parse time per module:** ~2-5 min
- **Total automation time (all 12):** ~30 min
- **Formatting accuracy:** 100% (no manual fixes needed)
- **Google Drive organization:** 12 folders, sub-organized by document type

---

## Decision Points

**Q: Do we want sub-folders (worksheets/ assessments/ etc.) or flat structure?**  
A: Sub-folders recommended (cleaner, easier to find documents during course delivery)

**Q: Should we also parse and split MODULE-SCRIPT.md files?**  
A: Start with LEARNER-PACK only; MODULE-SCRIPT is less fragmented for distribution

**Q: Auto-sync when markdown files change?**  
A: Yes, eventually (Phase 4), but not for initial run

**Q: Share settings (public, domain, specific people)?**  
A: TBD — Andrew to decide on drive sharing permissions

---

## Related Tasks

- **Curriculum Design** (Module 1-12 content creation) — COMPLETE ✅
- **Content Parser** (this task) — IN PROGRESS 🟡
- **Course Platform Setup** (future — where docs will be used)
- **Video Production** (future — script to video conversion)
- **Learning Management System** (future — LMS integration)

---

## Next Step

When ready to proceed to implementation:
1. Get Andrew's approval on task definition & folder structure
2. Create sub-task for "Build Content Parser Script"
3. Implement parser + test on Module 01
4. Verify output quality
5. Batch process remaining 11 modules

**Estimated total time:** 6-8 hours (1 day of focused work)

---

**Last Updated:** February 15, 2026  
**Next Review:** After implementation phase begins
