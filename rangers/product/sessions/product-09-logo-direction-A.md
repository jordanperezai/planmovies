# Product Rangers + Family · Session 09 · Logo Direction A

**Date:** 2026-05-28
**Question:** Should PlanMovies adopt "Direction A" (single gold cinema-seat silhouette with a play-triangle cut out, negative space, #c9a84c on #07080a) as its logo? Plus a family-panel gut-reaction test.
**Artifact:** `logo-A.html` (seat = rounded-rect body + two overlapping armrests; play = #07080a polygon cut; shown at S/M/L cut, 96/40/24/20/16px, true-black swatches).

## Verdict: NO — do not ship Direction A as drawn. Near-unanimous, two independent reasons.

### The two killers (both panels, independently)
1. **Meaning: a single seat reads as "one person / solo / lonely," the opposite of the "your people / together" pitch.** Murthy, Marco, Sofia, Ray (and Fernando in visual session 03). This is the loudest signal.
2. **Mechanic: the negative-space play cut does not read at small size** — reads as a notch/glitch/defect/chess-rook. Johnson (aging eyes), Shadeed (geometry), Marco, Sofia, Ray, Tía Rosa.

### Two hard technical bugs (Shadeed, verified in file)
- **The cut is filled `#07080a`, not transparent.** It only looks like a hole on a true-black background. On a white/gray chat-bubble unfurl it inverts into a visible dark gash = looks like a rendering bug. Fix: real transparency via `<mask>` or `fill-rule="evenodd"`.
- **No single mark spans 16-64px.** At 16px the armrests collapse to <3px slivers and the cut tapers to nothing. Need a dedicated simplified small glyph + a fuller logo for 40px+.

### Strategic redirect (Frisby + Kim, independently): the logo is low-leverage
- The group-chat paste is carried by the **og:image share card** (currently the TMDB poster) + title/description, NOT the favicon. The favicon is a ~16px corner element messaging apps may not even render. Tía Rosa, Marco, Ray all said the logo makes zero difference to whether they tap — the *sender* (family) does.
- Highest-leverage branding work = a **dynamic, crew-forward og:image** ("Jordan set this up · 4 going") that updates per event, since the product is becoming a persistent crew across events. A new favicon is not the lever.

### What the fix looks like (convergent across both panels)
"**The row**" — 2-3 bold cinema seats as ONE connected filled silhouette, no cutout. Satisfies the unsolved brief from visual session 03: a single bold shape that says *together* and survives 16px (filled, no fragile negative cut). Sofia and Murthy both reached for this independently. Keep dark + gold + cinematic (Marco and Sofia both endorsed the palette/lane).

---

## Full responses

### Stuart Frisby (mobile conversion)
"This isn't where the leverage is." Funnel = link unfurl card (90% of tap decision) → first 3s of landing → RSVP friction. A logo moves none of these for a warm family link. Intent of A (signal "permanent cinema product, not one event") is strategically correct but pays off zero in this funnel. Helps: reads as "movies" instantly. Hurts: negative-space play-in-seat is two shapes competing in 16px and collapses; gold-on-near-black muddies at 16px on a WHITE chat background; messaging apps crop icons to circle/rounded-square on light bg — dark mark needs its own dark chip or it disappears. **Adopt A as a 5-minute decision with a self-contained dark chip + verified 16px-on-white render; put real hours into the unfurl card + RSVP flow. The card is the testable lever, not the logo. Confidence: high.**

### Kyo Kim (coordinator burden)
Checked the file: current favicon is already a gold ring+play; A is a refinement, not a new direction. The share card uses `og:image` = the TMDB poster, NOT the logo — so the logo does ~0 work at the paste moment that matters. Single seat = "a seat," singular/passive; undersells the 1:many coordination that is PlanMovies' only differentiator vs a Fandango link. A is a 1:1 metaphor in a 1:many product (his own framing trap, and the design walks into it). Leverage = dynamic per-event og:image + crew-forward copy ("8 of your crew are in"). **Deprioritize Direction A. Keep the existing gold play-ring favicon. Brief any future mark as "a crew you join," not "a seat." Build the dynamic crew-forward share card. Confidence: high.**

### Jeff Johnson (accessibility / aging)
Concept fine; mechanic wrong for this audience at these sizes. Aging eye: reduced acuity (smallest detail ~doubles by 65), reduced contrast sensitivity (attacks thin mid-frequency internal edges — exactly what defines the negative cut), senile miosis + lens yellowing (dulls/browns the #c9a84c gold specifically). Negative-space asks the hardest cognitive op (re-segment a thin internal dark wedge as *meaning*, not as damage) in the worst conditions (tiny, JPEG/WebP-compressed chat thumbnail, dulled gold). "A small internal dark wedge on a solid shape reads as a defect before it reads as a symbol." Size thresholds: 16px favicon — cutout gone, reads as a gold lump; 20px nav — unreliable; 40px — coin-flip for older eyes. Needs 32-40px min to decode, 56-64px comfortable. **Switch to a POSITIVE/filled play mark (meaning carried by solid form, not absence); split into a simplified small-size glyph + full logo; reserve any negative-space version for ≥40px. Bump gold lightness ~10-15% for small variants. Test cold on someone 65+ with no caption. Confidence: high.**

### Shreya Murthy (social / share moment)
Read file + prior session. At 40px next to a link, a single gold seat reads as *an app*, not *an event my family is doing* — trust comes from the human content above (title, date, a face, "who's in"), never the logo; a polished abstract icon signals "downloaded SaaS" to a multigenerational family. The real flaw is meaning: a single seat = one person, semiotically the OPPOSITE of the product whose one differentiator is togetherness. "The mark should never argue against the pitch." If choosing an icon, choose one that reads plural at 40px: 2-3 bold seats (single-object-simple AND says together — the unsolved brief). Names her own blindspot: biases to party energy, so she's NOT saying louder — gold-on-black restraint is right; just make it say "together." **Don't ship a single seat. Test a 2-3 seat cluster at 16/20/40px; fix the og unfurl card first. Confidence: medium-high.**

### Ahmad Shadeed (verifier — read logo-A.html)
Computed cut bounding boxes (viewBox/100 × N): at 16px M cut = 3.04×3.84px, S = 2.24×2.88px, L = 3.68×4.80px; at 20px M = 3.8×4.8px. A triangle only has full height on its left base; the apex blurs into the gold body after antialiasing/1px-snap. At 16px the cut reads as a fuzzy left notch, not a play triangle; S vanishes; L survives as a notch but consumes ~52% of the seat's vertical span and stops reading as "seat + play," becomes "blob with a bite." Seat silhouette: three same-color overlapping rects render seamless at 96px (no seams), BUT at 16px the armrests are 17 units → 2.7px slivers + rx8 → read as noise; the seat gestalt collapses before the cut does. Colors hardcoded, no var() in the SVG — renders standalone correctly. **THE CUT IS THE TRAP: it's filled #07080a, not transparent — only reads as a hole on a #07080a surface; on a light chat-bubble unfurl it inverts into a visible dark gash (looks like a bug). Fix mandatory: true transparency via mask/evenodd.** **Reject as shipped. Fixes first: (1) cut = true transparency; (2) dedicated simplified 16/20px variant (drop armrests / solid seat). M cut + transparency is fine at ≥40px; 20px borderline (L only); 16px fails. Confidence: high.**

### Family panel (gut reaction, mark described literally, no label)
- **Tía Rosa (68, low-tech, Spanish-first):** "¿una sillita? ¿una caja? ... una letra rota." Can't tell what it is. Nervous — no face, no "Jordan," got burned by a bad link before. Can't see the notch at all, just "una manchita dorada." LESS likely to tap. Wants a face + "Tía, somos nosotros al cine."
- **Marco (35, pragmatic):** First read = "play button," not chair; seat takes a second; "nobody studies a 20px icon." Looks legit/premium, NOT AI-template. But single seat = solo/lonely, says "your spot," not "our spot." Logo won't sell him; taps because it's family. "Not embarrassing, which is most of the battle."
- **Sofia (24, taste-native):** Cringe-leaning. Gold blob; "play button does NOT read"; cutout reads as a gap/glitch. Single seat = "sad-coded," lonely chair in an empty theater. Dark+gold lane is right (would screenshot the palette). **Her fix: drop the cutout, make it a row / 2-3 seats so it says "us."**
- **Uncle Ray (55, casual):** Reads as "a chess piece, like a rook." Doesn't say movies. One seat = one person. Logo makes zero difference to tapping — "you could've put a smiley face there and I'd still tap it."

## Cross-layer triage
- Product memory: new dead direction (single-seat logo) + validated principle (og:image share card is the leverage, not the favicon).
- Visual memory: add transparency-not-color-fill rule + single-mark-can't-span-16-64px (need small glyph + full logo); single-seat+cutout dead direction.
