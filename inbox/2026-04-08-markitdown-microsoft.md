---
captured: 2026-04-08
source: github
url: https://github.com/microsoft/markitdown
status: processed
tags: [microsoft, markdown, file-conversion, llm-tooling, second-brain, document-processing]
---

# MarkItDown — Microsoft's Universal File-to-Markdown Converter

Andrew shared with note: "Interesting as we think about what we do here."

**Raw link:** https://github.com/microsoft/markitdown

## What It Is

Python utility from Microsoft that converts virtually any file format into LLM-optimized Markdown. PDF, PowerPoint, Word, Excel, images (EXIF/OCR), audio (transcription), HTML, CSV, JSON, XML, ZIP archives, YouTube URLs, EPubs.

## Key Details
- **Stars:** 93.8k — massive adoption
- **Philosophy:** Prioritizes preserving document structure as Markdown over high-fidelity conversion. Lightweight, token-efficient.
- **Tech:** Python 3.10+, plugin architecture, optional Azure Document Intelligence for advanced PDF processing. Stream-based processing (no temp files).
- **Usage:** CLI (`markitdown doc.pdf -o output.md`) or Python API (`MarkItDown().convert("file.pdf")`)
- **License:** MIT
- **Status:** v0.1.5 (Feb 2026), 305 commits, very active
