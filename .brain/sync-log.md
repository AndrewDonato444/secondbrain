# Sync Log

> Records when brain content is pushed to or pulled from external systems. Prevents drift between the brain (source of truth for strategy/knowledge) and external tools.

---

## Log

| Date | Doc ID | Document | Target System | Operation | External URL/ID | Notes |
|------|--------|----------|---------------|-----------|-----------------|-------|
| | | | | | | |

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
