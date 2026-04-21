# Mia — Baby A

**Slug:** `baby-a`
**Canonical reference:** `characters/mia.png`

## Identity

- **Name:** Mia
- **Age:** 28–30
- **Role:** New mom, ~6 months postpartum
- **Vibe:** Tired-but-capable. Warm, genuine smile. Zero influencer polish. "I got this" energy with a side of "please send coffee."
- **Signature sign-off:** `"Wild, right?"` — ends every Mia video. Algorithm anchor + viewer recognition.

## Physical

- White, European descent
- Medium brown hair, long, usually pulled into a loose messy bun or low ponytail with strands framing the face
- Green-hazel eyes
- Natural skin — minimal/no makeup, small freckles, real texture (no airbrushing, no Instagram filter)
- Average build, slightly slouchy posture (the slouch is part of the brand — she's tired)

## Wardrobe baseline

- Oversized, worn-in crewneck sweatshirts (tan, beige, cream, sage, heather gray) — slightly stained/rumpled is on-brand
- Dark leggings or loose lounge pants
- Bare feet, cozy socks, or fuzzy slippers
- Occasionally a loose tee or henley under the sweatshirt
- Never: anything crisp, new, or "put together"

## Setting baseline

Cozy-messy living room or nursery. Warm neutral palette (beige, cream, camel) with pops of color from baby toys. Recurring props:

- Baby bottle (with formula/milk)
- Scattered toys — sensory playmat, rattles, teethers, stuffed animals
- Parenting books (*New Mom's Guide* and similar)
- Muslin swaddle blanket, draped on couch arm
- Wooden rocking chair with a plush elephant
- Gray/taupe couch, linen curtains, filtered window light
- Coffee mug (always cold by the time she drinks it)

## Aesthetic baseline

- **Lighting:** soft natural window light, slightly overcast feel
- **Color grade:** warm, slight film-grain, muted saturation
- **Format:** 9:16 (TikTok/Reels/Shorts), shallow depth of field
- **Framing:** medium close-up, eye-level, she's usually sitting on the floor or low on a couch
- **Mood:** documentary realism, not studio shoot

## Canonical reference portrait prompt

> Candid film-style portrait of a 29-year-old white woman, medium-brown hair in a loose messy bun with strands framing her face, green-hazel eyes, natural skin with faint freckles and no makeup, small genuine smile. She's wearing an oversized worn-in tan crewneck sweatshirt and dark leggings, sitting cross-legged on a carpet in a cozy-messy living room. Baby toys scattered around her (sensory playmat, rattles, stuffed elephant on a wooden rocking chair in the background), a parenting book on a wooden coffee table, gray linen couch behind her. Soft natural window light from the right, film grain, warm muted color grade, shallow depth of field, 9:16 vertical. Documentary realism, not influencer content.

## Per-video scene prompt template

```
{canonical_reference_image} + "{scene_description}, same woman, same outfit style (oversized sweatshirt, leggings), same home setting (cozy-messy living room with baby toys), same film-grain warm-muted aesthetic, 9:16 vertical, natural window light."
```

Where `{scene_description}` is derived from the video's transcript — e.g. "holding a baby bottle up to the camera, slightly amused expression" or "sitting on the floor folding tiny onesies in a laundry basket."

## Voice pairings

ElevenLabs voice IDs — see [voices.md](../voices.md) for full profile descriptions and sample text.

| Slug | Voice ID | Vibe |
|---|---|---|
| `mia-1-warm` | `HZdYuhrxzJcfkCFqzj3H` | Baseline — friend over coffee |
| `mia-2-knowing` | `vXQ5GLohM2GgYV98k5wZ` | Dry, wry, already knows the punchline |
| `mia-3-tired` | `9E9uYiVlogRqAcf7b04q` | 3 AM feed, running on fumes |

Rotation: round-robin across Mia's paired voices per video. All read as female, late-20s/early-30s, warm and natural — never overly polished or broadcast-y.
