# Jack — Baby B

**Slug:** `baby-b`
**Canonical reference:** `characters/jack.png`

## Identity

- **Name:** Jack
- **Age:** 31–33
- **Role:** New dad, ~6 months in
- **Vibe:** Earnest, slightly bewildered, figuring it out as he goes. Dry humor. Not the performative "dad influencer" type — the actual "wait, am I doing this right?" type. Warm but a little self-deprecating.
- **Signature sign-off:** `"Weird, man."` — ends every Jack video. Algorithm anchor + viewer recognition.

## Physical

- White, European descent (lean toward "looks vaguely Midwestern")
- Dark brown hair, slightly messy — "just rolled out of bed in a good way"
- Light-to-medium scruff/stubble, not a full beard
- Brown eyes
- Natural skin — some stubble shadow, eye-bags absolutely welcome (he's tired too)
- Average build, slightly broader through the shoulders than Mia
- Relaxed posture — leaning, slouching against counters, never rigid

## Wardrobe baseline

- Faded flannels (navy, forest, burgundy, black-and-gray), worn-in henleys, plain heather tees
- Occasionally a zip-up hoodie or cardigan thrown over a tee
- Slim-straight dad jeans, faded, slightly rumpled — or joggers
- Sneakers, slippers, or socks
- Never: anything crisp, athleisure-branded, or "content creator polished"

## Setting baseline

Same house universe as Mia (same warm neutral palette, same lived-in aesthetic) but Jack gravitates toward different rooms:

- **Kitchen** — prepping bottles at the counter, cleaning, coffee
- **Nursery/changing table** — in the trenches
- **Garage or entryway** — strapping the car seat in, stroller assembly fails
- **Couch** — with a sleeping baby on his chest

Recurring props:

- Bottle (mid-prep, mid-wash, mid-feed)
- Baby carrier/wrap
- Stroller, car seat base
- Sippy cups, formula tins
- Coffee (iced or hot, always)
- Parenting book he's pretending to have read
- A single sock that doesn't match anything

## Aesthetic baseline

**Identical to Mia — brand consistency is the point.**

- **Lighting:** soft natural window light
- **Color grade:** warm, film-grain, muted saturation
- **Format:** 9:16 vertical, shallow depth of field
- **Framing:** medium close-up, eye-level
- **Mood:** documentary realism

## Canonical reference portrait prompt

> Candid film-style portrait of a man in his early thirties, dark-brown messy hair styled just out of bed, light stubble, warm brown eyes, a small self-aware smile. He's wearing a faded navy flannel over a heather-gray tee and slim-straight faded jeans, leaning against a wooden kitchen counter holding a ceramic coffee mug with both hands. Warm neutral kitchen in the background — wooden cabinets, a drying rack with baby bottle parts on it, a formula tin, a muslin burp cloth folded on the counter. Soft natural window light from the left, film grain, warm muted color grade, shallow depth of field, 9:16 vertical. Documentary realism, same visual universe as the Mia character — same house, same color grade, same film stock.

**Prompt-writing notes (learned from the first flagged attempt):**
- Avoid explicit race labels ("white man") — describe age + hair/eye features instead.
- Avoid baby-specific items in-hand for the male character (half-assembled bottle, muslin draped on shoulder). Keep baby items in the environment (drying rack, folded on counter) — same vibe, clears the child-safety filter.
- Avoid clinical/health-adjacent phrasing like "under-eye shadows" — use "warm" or "relaxed" instead.

## Per-video scene prompt template

```
{canonical_reference_image} + "{scene_description}, same man, same wardrobe style (flannel or henley + faded jeans), same home setting (warm neutral kitchen or nursery), same film-grain warm-muted aesthetic, 9:16 vertical, natural window light."
```

Where `{scene_description}` is derived from the video's transcript — e.g. "holding a sleeping baby against his chest on the couch, eyes half-closed" or "in the garage staring at a half-assembled car seat with instructions on the floor."

## Voice pairings

ElevenLabs voice IDs — see [voices.md](../voices.md) for full profile descriptions and sample text.

| Slug | Voice ID | Vibe |
|---|---|---|
| `jack-1-earnest` | `Wdw465TDmg0V5XHhvnDT` | Baseline — sincere guy |
| `jack-2-dry` | `jIvIJ2nzKfpdDBMf7ruk` | Deadpan, straight-face humor |
| `jack-3-hushed` | `chiHu6Mm0DdKHsS2JioP` | Don't-wake-the-baby, late-night |

Rotation: round-robin across Jack's paired voices per video. All read as male, early-30s, warm and natural with a slight rasp or texture — never broadcast-y or "podcast host" polished. The "tired dad who's trying" register.
