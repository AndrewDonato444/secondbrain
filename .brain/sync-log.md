# Sync Log

> Records when brain content is pushed to or pulled from external systems. Prevents drift between the brain (source of truth for strategy/knowledge) and external tools.

---

## Log

| Date | Doc ID | Document | Target System | Operation | External URL/ID | Notes |
|------|--------|----------|---------------|-----------|-----------------|-------|
| 2026-04-18 | DOC-011 | BOL Ep 9 "You don't need to learn to code" | r2 | published | bol/2026-04-18-ep9-saturday.mp4 | 281MB video uploaded to R2 bucket |
| 2026-04-18 | DOC-011 | BOL Ep 9 "You don't need to learn to code" | youtube | scheduled | Late.Dev post 69e384951710bfea7bc2b7d5 | Andrew Donato YT · Apr 22 9am ET · pinned first comment attached (Claude/ChatGPT prompt) |
| 2026-04-18 | DOC-011 | BOL Ep 9 "You don't need to learn to code" | tiktok | scheduled | Late.Dev post 69e384951710bfea7bc2b7d5 | Andrew TikTok · Apr 22 9am ET · TikTok-custom caption |

<!--
Target Systems: notion | gmail | google-calendar | apollo | canva | gamma | vercel | linkedin | youtube | tiktok | instagram | github
Operations: created | updated | published | synced | pulled
-->

---

## Sync Rules

- Always log when brain content is pushed to an external system
- Update the source document's `synced-to` field in frontmatter
- If source knowledge has been updated since the last sync, flag the external version as potentially stale
- The brain is the source of truth for strategy and knowledge; external systems are the source of truth for status and engagement metrics
