# Template: LinkedIn Post

> Derive a LinkedIn post from one or more knowledge documents. Uses the "Building Out Loud" voice.

## Frontmatter

```yaml
---
id: ART-xxx
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: artifact
domain: building-out-loud
audience: linkedin
derived-from: [DOC-xxx]
status: draft
synced-to: []
---
```

## Structure

**Hook (first line — this is what shows before "see more"):**
- One punchy sentence that creates curiosity or tension
- Should work standalone in a feed scroll
- Examples: "I built an AI system that [surprising thing]." / "Nobody talks about [contrarian take]."

**Body (3-5 short paragraphs):**
- First-person, conversational
- Short paragraphs (1-3 sentences each)
- One idea per paragraph
- Include a concrete detail, number, or example — not vague platitudes
- Reference what Andrew is actually building/doing — this is Building Out Loud, not thought leadership from the sidelines

**Close (final line):**
- End with a question, a hot take, or a call to share perspective
- Examples: "What's your version of this?" / "Am I wrong?" / "The real question is..."

## Content Pillars (pick one)

1. **Building in public** — Real progress on MSA, Facts Unlocked, Second Brain, or other projects. Show the messy middle, not just wins.
2. **Sales leadership takes** — Contrarian or overlooked truths from 17+ years. Not generic advice.
3. **AI x sales convergence** — Where product and selling merge. Tools, patterns, predictions.
4. **Tools & discoveries** — Things worth sharing that Andrew has actually used.

## Derivation Rules

- Read the source knowledge document(s)
- Extract the 1-2 most LinkedIn-worthy insights
- Rewrite in Building Out Loud voice (see audience-profiles.md)
- Apply LinkedIn exclusion rules: no salary/debt, no company internals, no private career search details
- Keep under 1,300 characters (LinkedIn's sweet spot before engagement drops)

## After Creating

1. Register in `.brain/artifact-registry.md`
2. Add to `.brain/knowledge-graph.md` with `derived-from` relationship
3. When published, update status to `published` and add `linkedin` to `synced-to`
