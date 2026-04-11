---
created: 2026-04-08
updated: 2026-04-08
source_intake: inbox/2026-04-08-markitdown-microsoft.md
connections:
  - "[Second Brain Schema](../../schema.md)"
  - "[Graphify Knowledge Graphs](./graphify-knowledge-graphs.md)"
  - "[MSA Product Overview](../../projects/modern-signal-advisory/product-overview.md)"
  - "[Facts Unlocked Pipeline](../../projects/facts-unlocked/pipeline-spec.md)"
relevance: [second-brain, modern-signal-advisory, ai-frontier]
---

# MarkItDown — Microsoft's Universal File-to-Markdown Converter

github.com/microsoft/markitdown | 93.8k stars | v0.1.5 (Feb 2026) | MIT

Python utility that converts virtually any file format into LLM-optimized Markdown. Prioritizes preserving document structure (headings, lists, tables, links) over visual fidelity. No temp files — stream-based processing.

## Supported Formats
PDF, Word, PowerPoint, Excel, images (EXIF/OCR), audio (transcription), HTML, CSV, JSON, XML, ZIP archives, YouTube URLs, EPubs

## Key Features
- Plugin architecture (opt-in) — OCR plugin uses LLM Vision for PDFs and Office docs
- Optional dependencies — install only what you need (`pip install markitdown[pdf]`)
- LLM integration — OpenAI-compatible client for image descriptions
- Azure Document Intelligence support for advanced PDF extraction
- CLI (`markitdown doc.pdf -o output.md`) or Python API
- Docker support

## Why This Matters to Andrew

**Second Brain — this is an intake supercharger.** Right now the brain accepts links, text, and thoughts. MarkItDown would let it accept *any file* — PDFs, PowerPoints, Word docs, Excel files, audio recordings — and convert them to markdown that slots right into the folder structure. Someone emails Andrew a PDF report? Run it through MarkItDown, process the markdown through the intake system, done.

**YouTube transcript alternative.** We tested youtube-transcript-api for pulling video transcripts, but MarkItDown also handles YouTube URLs natively. Could be a fallback or replacement.

**Pairs with Graphify.** MarkItDown converts files to markdown → Graphify builds knowledge graphs from markdown (and code, and other files). Together they could form a pipeline: raw files → markdown → knowledge graph → queryable intelligence.

**MSA potential.** MSA ingests real estate data from various sources. If any of those sources deliver PDFs, Excel files, or other documents, MarkItDown could be part of the data ingestion pipeline — converting raw source documents to structured markdown before the AI agents process them.

**Facts Unlocked.** Less directly relevant, but if Andrew ever wants to analyze competitor content or research materials in bulk, MarkItDown could convert a folder of mixed-format files into a unified markdown corpus for analysis.

## Technical Notes
- Python 3.10+, MIT license
- 93.8k stars — this is a major project with massive community support
- Stream-based (no temp files) means it's efficient for pipeline use
- Plugin system allows extending without forking
