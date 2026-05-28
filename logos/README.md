# Logo explorations

Open any file in a browser. Session 2026-05-28. The brand is dark + gold + cinematic, "get the row together / we're all seeing it together," and must NOT feel nostalgic, precious, or played-out.

Listed in the order we explored them.

| File | What it is | Status |
|---|---|---|
| `logo-preview.html` | First three-seat mark, inline in the wordmark (PLAN ▢▢▢ MOVIES) | ❌ rejected — "doesn't look like a logo" |
| `logo-explore.html` | Round 1: 4 marks (held seat, ticket, PM monogram, pin) | explore |
| `logo-explore-2.html` | Round 2: 4 marks (marquee, chat+play, two seats, ticket+check) | explore |
| `logo-board.html` | All 12 marks on one board (8 + 4 experimental) | explore |
| `logo-A.html` | Direction A: single seat with play cut (negative space), 3 cut sizes | ❌ rejected — single seat = "one person"; cut reads as defect |
| `logo-row.html` | "The row": 2-3 filled seats, bench glyph, light-bg + app-tile tests | explore |
| `logo-row2.html` | Character ladder: scalloped seat-backs + armrests | ❌ rejected — scallops read as "fingers/crown" |
| `logo-bench.html` | The bench refined into a two-seat loveseat | ❌ rejected — reads as a couch |
| `logo-seats.html` | Three seats, two-tone (cream/gold/cream) — faithful to the ChatGPT reference | ❌ reads as three blocks, not seats |
| `logo-genz.html` | Type-led lane: lowercase wordmark, play-in-O, dots, stacked | ❌ rejected — "played out, done before" |
| `logo-own.html` | Own-the-behavior: the row that fills, lock-in bracket, underline row | ❌ rejected — "clever but cold, doesn't resonate" |

## What we proved doesn't work (don't repeat)
- **Literal cinema objects** (seat, ticket, marquee, reel) → nostalgic / precious.
- **Type-led tropes** (lowercase wordmark, play-in-O, three dots) → played out; Letterboxd/Spotify own them.
- **Clever behavior-devices** (filling row, brackets) → cold, no emotional warmth.

The gap in all of these: clever, not *felt*. "We're all seeing it together" is emotional, and a hand-coded SVG mark hasn't carried that warmth. Next step is image-gen (Imagen / Midjourney / ChatGPT) for marks with real craft, then convert the winner to production SVG.

## Constraints for the final mark
- Inline SVG, no raster. Gold `#c9a84c`, cream `#e8e6e1`, near-black `#07080a`.
- Must read at 16px favicon + group-chat thumbnail. Negative cuts = true transparency (mask / evenodd), never a filled bg color.
- Ship inside a dark "app tile" so it never depends on the background.
- A single mark rarely spans 16–64px → simplified small glyph + fuller large logo as one system.

See full reasoning in `rangers/visual/sessions/visual-03-logo-direction.md` and `rangers/product/sessions/product-09-logo-direction-A.md`.
