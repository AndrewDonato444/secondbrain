---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-markitdown-microsoft.md
connections:
  - ../../interests/ai-frontier/graphify-knowledge-graphs.md
  - ../../interests/ai-frontier/bloom-ai-screen-recording.md
  - ../../projects/modern-signal-advisory/claude-managed-agents-opportunity.md
relevance:
  - second-brain-system
  - modern-signal-advisory
  - ai-frontier
  - facts-unlocked
---

# MarkItDown — Universal File → Markdown for LLMs

**Repo:** https://github.com/microsoft/markitdown
**Stars:** 93.8k | **License:** MIT | **Language:** Python

## What It Is

Microsoft's tool for converting any file format into Markdown optimized for LLM consumption. Handles PDF, PPTX, DOCX, XLSX, images (OCR), audio (transcription), HTML, CSV, JSON, XML, ZIP, YouTube URLs, EPubs. Plugin architecture for extensions. Stream-based, no temp files.

93.8k stars means this is becoming infrastructure — the de facto way to feed documents to LLMs.

## Why This Matters

### Second Brain Connection (Andrew flagged this)

The Second Brain intake system currently handles links, thoughts, and text. But Andrew's information diet includes PDFs, slide decks, spreadsheets, audio, and more. MarkItDown could be the universal preprocessor — anything Andrew throws at the system gets converted to Markdown first, then the intake skill processes it as usual. This solves the "accept anything" requirement from the schema without building custom parsers for every format.

Potential pipeline:
```
Any file → MarkItDown → Markdown → Second Brain intake skill → processed & filed
```

### MSA Connection

Signal Report generation pulls data from multiple sources and formats. MarkItDown could standardize incoming data (market reports as PDFs, competitor decks, property listings) into a common Markdown format before Claude processes it. Cleaner input = better output.

### Graphify Connection

Graphify already handles docs and PDFs, but MarkItDown's approach is complementary — where Graphify builds a knowledge graph, MarkItDown just gives you clean text. Use MarkItDown for content extraction, Graphify for structural understanding.

### The Pattern

This fits the same "make everything AI-queryable" wave from the Karpathy ecosystem:
- **Bloom** → video recordings AI-queryable
- **Graphify** → code/docs → knowledge graphs
- **MarkItDown** → any file format → LLM-ready text
- **Second Brain** → personal knowledge → connected, filed, actionable

MarkItDown is the universal adapter in this stack.

## Practical Next Steps

- [ ] Install MarkItDown in the Second Brain pipeline as a preprocessing step
- [ ] Test with real-world inputs: a PDF Andrew wants to capture, a deck from a prospect, a voice memo transcript
- [ ] Evaluate whether this replaces or complements the current WebFetch approach for articles/links
