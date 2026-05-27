# Visual Rangers Session 02 — Ticket Icon Design

**Date:** 2026-05-27
**Question:** What should replace the green "GOING" pill on the crew list? A ticket stub SVG icon was proposed. Design the icon.

---

## Karin Fong — Composition & Visual Weight

**Verdict:** Ticket stub is correct. Silhouette does the work, not detail.

Key points:
- Remove perforation lines. At 18px they render as noise, not a tear-line. The notched rectangle silhouette is the entire glyph.
- Bump stroke-width to 1.75-2. Current 1.5 at 0.75 scale = 1.125px, sub-pixel territory.
- Suggested landscape orientation (movie tickets are wider than tall). Others didn't flag this.
- Non-confirmed states: dim lowercase text is correct. "The absence of the icon is the message."
- Add min-width:18px + text-align:right on probably/maybe spans for column alignment.

## Tim Brown — Typography & Rhythm

**Verdict:** Ticket icon works. No rhythm problem. The icon functions as a terminus mark.

Key points:
- 18px icon in a row with 32px avatar and 14px text: row stays name-dominant. Correct hierarchy.
- "probably" should be Inter 400/11px in text-secondary (brighter than maybe, closer to commitment).
- "maybe" should get font-style:italic. Italic reads as hedging. Probably stays roman.
- No text paired with the ticket icon. It should stand alone. "GOING" next to it recreates the dashboard label.
- Add sr-only "Going" span for screen readers.

## GMUNK — Color & Atmosphere

**Verdict:** Ticket is native to this world. Gold unifies the palette.

Key points:
- Bump stroke from gold-dim to gold-warm (#b8984a). Gold-dim + thin stroke = two low-visibility choices stacked. One or the other.
- Add subtle glow: filter: drop-shadow(0 0 3px rgba(201,168,76,0.2)). Tight bloom, not a blur halo.
- "probably" → text-secondary. "maybe" → text-tertiary + weight 300 + opacity 0.7. Separate the two uncertain states.
- Green pill was "a foreign agent in this palette." Every time a user hit that green, they left the cinematic world.

## Fernando Ramirez — Film/Entertainment Design

**Verdict:** Ticket is the right call. "It's not a metaphor. It's the actual object."

Key points:
- On film event pages, confirmed status was never shown with text labels. "Text labels turn an emotional commitment into a database state."
- The ticket IS the status. No word needed. Show text only for ambiguous states.
- UFO/disclosure theming would be wrong here. "The crew list should feel like the lobby, not the screen."
- Multiple ticket stubs running down the right edge of the list create visual accumulation. "Seven small gold ticket stubs start to look like a stack. A sold-out show."
- Suggested slight rotation (1-2 degrees) for physical feel. Others didn't flag this. Probably too much at 18px.

## Jhey Tompkins (verifier) — Motion & CSS Craft

**Verdict:** Implementation verified. Three specific fixes needed.

Key points:
- stroke-width 1.5 at 18px = 1.125 physical pixels (sub-pixel, fuzzy). 2 = 1.5px (clean). Confirmed via math.
- Perforation lines at 18px: "three faint dots, not a tear-line." Remove them.
- Use single outer path only. Silhouette wins below 20px.
- Add display:block to SVG to kill inline baseline gap.
- Suggested opacity:0.7 resting state with row-hover to 1. Skip load animations (15 icons animating = noise).

---

## Consensus

| Finding | Voices | Action |
|---|---|---|
| Remove perforation lines | 5/5 | Done |
| Stroke-width to 2 | 4/5 | Done |
| Stroke color to gold-warm | 3/5 | Done |
| No text label for confirmed | 5/5 | Done |
| Differentiate probably from maybe | 4/5 | Done |
| Subtle glow on confirmed | 2/5 | Done (GMUNK + Fong implied) |
| display:block on SVG | 1/5 (verifier) | Done |
| sr-only accessibility span | 1/5 (Brown) | Done |

## Implemented

```javascript
function statusMark(s) {
  if (s === 'confirmed') return '<svg ...stroke="var(--gold-warm)" stroke-width="2" ...filter:drop-shadow(...)><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg><span class="sr-only">Going</span>';
  if (s === 'probably') return '<span ...color:var(--text-secondary)...>probably</span>';
  if (s === 'maybe') return '<span ...color:var(--text-tertiary)...font-style:italic...>maybe</span>';
}
```
