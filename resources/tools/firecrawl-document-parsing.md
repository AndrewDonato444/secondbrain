---
id: DOC-048
created: 2026-04-15
updated: 2026-04-15
type: reference
domain: ai-frontier
source_intake: inbox/2026-04-15-firecrawl-document-parsing.md
status: active
informs: [DOC-002, DOC-003]
---

# Firecrawl — Document Parsing & Web Scraping

**URL:** firecrawl.dev
**Docs:** docs.firecrawl.dev/features/document-parsing
**What it does:** Converts documents and web pages to clean, structured markdown via API. Auto-detects file types, handles OCR for scanned PDFs, and outputs LLM-ready content.

## Supported Formats

- **PDF** — text extraction with layout preservation, OCR for scanned docs. Three modes: auto (fast + OCR fallback), fast (text-only), OCR (forced on all pages). 1 credit/page.
- **Excel** (.xlsx, .xls) — each worksheet → HTML table with sheet name headings
- **Word** (.docx, .doc, .odt, .rtf) — preserves headings, paragraphs, lists, tables, basic formatting
- **Web pages** — full web scraping + markdown conversion (Firecrawl's core product)

## How It Connects

**vs MarkItDown (DOC-020):** Similar purpose — both convert files to LLM-friendly markdown. MarkItDown is open source, local, Python. Firecrawl is a hosted API with web scraping built in. Firecrawl's edge: OCR modes for scanned PDFs, no local setup. MarkItDown's edge: free, no API calls, handles more formats (audio, YouTube, images).

**Second Brain intake:** Could complement MarkItDown as an API-based option. Useful when Andrew wants to process a URL that points to a PDF or document — Firecrawl handles the fetch + parse in one call.

**MSA:** Could be useful for ingesting market reports, property documents, or competitor collateral that arrives as PDFs or Word docs.

## Scraping Dog vs Firecrawl

Andrew already uses Scraping Dog for web scraping (LinkedIn profiles in AutoLinkedIn). Firecrawl adds document parsing on top of scraping. Could be complementary — Scraping Dog for LinkedIn/social, Firecrawl for documents and general web content.
