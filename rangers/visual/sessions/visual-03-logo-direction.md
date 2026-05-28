# Visual Rangers · Session 03 · Logo direction

**Date:** 2026-05-28
**Question:** Which of 12 logo directions for PlanMovies should we pursue (or none)?
**Context:** PlanMovies = social movie-planning app. Brand: "get the row together / your seat with your people." Dark + gold + cinematic, mobile-first. Mark must survive 16px favicon, ~20px nav, and a tiny group-chat link thumbnail. Single inline SVG, gold #c9a84c on near-black #07080a. Current logo (a gold clearance seal) is the Disclosure Day event skin, not in this set.
**Candidates:** 1 held seat · 2 ticket+play · 3 PM monogram · 4 pin+play · 5 marquee+bulbs+play · 6 chat bubble+play · 7 two seats · 8 ticket+check · 9 seat with play cut (neg-space) · 10 wordmark O=play (no standalone mark) · 11 projector beam+audience dots · 12 crew ring (one gold = you, play center). Board: `logo-board.html`.

## Tally

| Voice | 1st pick | Pairs with / fallback | Rejects hardest |
|---|---|---|---|
| Karin Fong (composition) | **#9** neg-space seat | #10 as logotype | #5, #11, #12 (composite/detail dies); #3 monogram |
| Tim Brown (typography) | **#10** O=play lockup | #9 as glyph | #3 monogram (hard, redundant); #5,#11,#12 |
| GMUNK (color/atmosphere) | **#9** neg-space seat | #12 as motif elsewhere | composites #4,#5,#6,#11; #3 |
| Fernando Ramirez (film feeling) | **#12** crew ring | #7 two seats | #1,#9 (single seat = one person); #2,#8 (transaction); #3 |
| Jhey Tompkins (verifier, read SVG) | **#4** pin+play | #2/#8 ticket | #5,#9,#11,#12 (sub-pixel detail); #10 (no favicon) |

## Where they converge
1. **Reject composites** that glue 2-3 objects: marquee (#5), projector beam (#11). Unanimous-ish: detail dies small.
2. **Reject PM monogram (#3)** — generic, "says nothing cinematic," spells the brand twice. Tim hardest.
3. **Figure/ground is the right mechanic.** Four of five (Karin, GMUNK, Tim, and Jhey on principle) favor negative-space / single-bold-shape over additive icons.
4. **#10 has no standalone mark** — disqualified as favicon/nav/thumbnail by construction; only viable as the in-app wordmark lockup. Unanimous.

## The decision point: meaning vs legibility
- **Meaning camp** (Karin, GMUNK, Fernando, Tim): want figure/ground + the play motif + "your people." Favor #9 (seat) and #12 (crew).
- **Legibility camp** (Jhey, verified against geometry): only single-bold-shape marks survive 16px. #4 pin and #2/#8 ticket are the only ones that hold as drawn — but those carry "logistics/transaction," the wrong story.

## Decisive independent finding (verifier)
Jhey read the actual SVG and refuted the premise behind the two concept-darlings **as currently drawn**:
- **#9** play cut is filled `--bg-card` (#12151b) on `--bg-deep` (#07080a) = near-zero contrast (invisible small), and the seat is 6 rects that merge at 20px. The negative-space idea is right; this execution doesn't deliver it. Cut must punch to TRUE black and the seat must be one bold silhouette.
- **#12** dots go sub-pixel below ~32px; the "you" gold-vs-cream distinction (r5.5 vs r4) is invisible at thumbnail size.
- **Export catch:** every `var(--gold)`/`var(--bg-*)` must be hardcoded to `#c9a84c`/`#07080a` for favicon/unfurl (no `:root` there). #2/#8 notch fills (#12151b) must become transparent or true black.
- Fernando's separate meaning critique: a SINGLE seat (#1, #9) = one person, the opposite of the brand.

## Synthesis / recommendation
**No mark is ship-ready.** The team endorses the *mechanic* (figure-ground, single bold shape, play motif) but no current drawing both (a) survives 16px and (b) says "together." The unsolved brief: a single bold shape that reads as *people together*, not one seat and not a fragile ring.

**Advised next step (stated by Karin, GMUNK, Fernando, Jhey independently):** render a focused round 3 as real inline SVG, hardcoded gold/true-black, at exact 16/20/40px on a phone — decide on screen, not on a swatch board. Round 3 finalists:
- **A. Redrawn #9** — one bold seat silhouette, play cut to true #07080a, thicker.
- **B. Redrawn #12** — 5-6 bold dots, "you" dot dominant (only-filled or much larger).
- **C. Control** — #4 pin or #8 ticket+check, the legibility benchmark to beat.

**Confidence:** High that no current mark is ready; high on the figure-ground principle; the object (seat vs crew vs control) is the open call for round 3.

## Blind spot nobody resolved
None reconciled "single seat = one person" (Fernando) with "only single bold shapes survive small" (Jhey). The shape that is simultaneously single+bold AND reads as *together* is the actual unsolved problem. That tension is the design brief for round 3.

---

## Full responses

### Karin Fong (composition & visual weight)
Top pick: **#9** negative-space seat-with-play — the only candidate that fuses cinema + go/plan into ONE shape rather than placing one object inside another. On dark, the cutout reads as light through the seat back; negative-space marks survive scaling because there's nothing small to lose. Strong second: **#10** (O=play) as the logotype/link-preview answer, paired with #9 as the glyph — "a real identity system, not one tired drawing doing every job." Rejects: #5/#11/#12 (detail dies, focal chaos, "reject hardest"); the "container holding a symbol" family #6/#2/#4/#8 (two ideas, no hierarchy, blob-with-a-speck); #1 (mute, "furniture") and #7 (two seats = one fat lump at 16px); #3 monogram ("competent, forgettable... the safe option you pick when you've given up"). Stated blindspot: wants motion; notes #9 is the rare static mark that implies motion. Caution: prototype #9 at literal 16/20px; if the cut triangle starves, thicken it and shrink the armrests until the play wins the focal fight. **Strongest: #9 as core mark+favicon, #10 as paired logotype. Confidence high on #9 as glyph, med-high on the pairing.**

### Tim Brown (typography & rhythm)
Named the jobs: the "PlanMovies" wordmark (Barlow Condensed 800, uppercase, 4px tracking) is the loud Arrangement element; the mark is a Calibration-scale glyph that must read as a sibling letterform, not an illustration glued on. Top pick: **#10**, promoted to primary lockup — the only genuinely type-integrated option; mark and wordmark are one object in one typeface. But it must be fixed typographically: the current full circle fattens the O and breaks Barlow's tall-narrow rhythm and turns to mush at 13px. Redraw the O as a condensed O with the play cut as negative space (no filled circle), gold in the triangle, tracked to 4px. Needs a standalone fallback → **#9** as the favicon/avatar glyph (figure/ground works like a letterform counter; survives small). #9 over #1 (no second meaning) and #7 (two blobs collapse). System = #10 wordmark + #9 glyph sharing the play-triangle motif. Rejects #3 monogram hard ("spelling the brand twice... adds nothing the wordmark doesn't already say louder"); #5/#11/#12 (detail/illustration, not glyph — keep #12 idea for an empty-state, not the mark); #2/#6/#8 (generic; ticket+play is the most common movie-app mark; checkmark belongs in RSVP UI); #4 (says location, wrong meaning). **Strongest: #10 primary lockup (play cut into condensed O) + #9 standalone glyph; reject other ten. Confidence medium — honest about possibly underweighting the warm "row together" emotion of #7/#12; test #10-redraw vs #9-only at thumbnail size.**

### GMUNK (color & atmosphere)
Top pick: **#9** — the only candidate that behaves like a light source instead of a sticker; on near-black the cut is where black punches through gold, reading as screen-glow through the seat back. "The Tron move: the accent earns its place by being the only emitter." Wins small by subtraction — solid mass + one hole, no internal linework to mud up. Runner-up: **#12** crew ring — the only mark that says the brand position out loud (your seat with your people); the "you" dot can run hotter as a real temperature hierarchy; risk: dots collapse to a fuzzy doughnut at 16px, needs ≤5-6 bold dots. Rejects: #10 (no standalone mark — disqualified by brief); #3 (generic flat plate); #2/#8 (transaction, perforation dies small); #4/#5/#6/#11 (composite clip-art, #5 and #11 worst — bulbs/beams turn to noise); #1/#7 (inert; described objects, not light sources). "Everything that glues multiple objects together loses small and reads generic. The two survivors do their work with a single emitting shape." **Strongest: #9 as the mark; #12 as a loading/community motif elsewhere. Prototype #9 at 16/20/32px, test the cut size. Confidence high on #9 direction, medium on exact cut geometry.**

### Fernando Ramirez (film/entertainment feeling)
Lens: what you feel walking out with your people, and does it still mean something 100 films later. Top pick: **#12** crew ring — the only mark carrying the actual brand position; the ring reads as a group, the one gold dot (you) makes it personal without naming a film, the center play says cinema without saying which. Durable across any movie; matches the Named Crew soul concept ("the mark should be the crew, not the venue"). Risk: 16px dot-mush and gold-on-gold "you" dot lost — mitigate with 5-7 dots, "you" dot larger or the only filled one; that's the kill condition, not the concept. Safe second: **#7** two seats — literal "your seat with your people," reads cleanly small, the named fallback if #12 fails 16px. Rejects: #1/#9 (single seat = one person, "the opposite of the brand," reject on meaning not craft); #2/#8 (transaction, ages badly as cinema goes digital; checkmark = utility); #3 (says nothing, hard reject); #4 (logistics, pre-loads as Google Maps); #5 (detail smears, nostalgia for one grand cinema not a group); #6 (reads as messaging app/YouTube comment); #10 (no standalone mark where it matters — keep as wordmark lockup); #11 (closest runner-up in spirit, but a beam is hard as confident gold geometry small, and #12 makes "you" explicit). Stated blindspot: designs for big canvases, holding to the small test — which is why #7 is a named fallback. **Strongest: #12 crew ring with one-gold-dot-is-you, #7 ready the instant 16px breaks it. Render #12 and #7 as real SVG at 20/16/40px on a phone and decide there. Confidence medium — high on concept, hinges on the favicon render.**

### Jhey Tompkins (verifier — read logo-board.html)
Collapses at 16-20px (cited geometry): **m5** worst — five r=2.6 bulbs go sub-pixel/merge, plus the antenna nub and play = four feature scales fighting in 20px. **m12** — eight dots ~0.8px, gaps close, the r5.5-vs-r4 "you" distinction invisible, gold-vs-cream gone, center play competes. **m11** — three r=3 audience dots merge into the triangle base; left with a triangle + dot = "nothing specific." **m9** — m1's six-rect seat (already busy) + a cut filled #12151b on #07080a (near-zero contrast, invisible small); "the neg-space gimmick is invisible small. Reject." **m1/m7** marginal — rects fuse to a blob; two seats become one lump. Hold up small (single/2-3 bold elements): **m4 (pin+play) strongest** — one teardrop path + one punched triangle, true #07080a-on-gold contrast, unmistakable at any size, "the cleanest geometry on the board." **m2/m8 (ticket) strong** — big rect + r=8 notches (survive) + play/check; caveat: notch fill is #12151b, will show a gray bite on a true-black favicon — switch to transparent/#07080a at export. **m3** square holds but "PM" depends on the Barlow webfont being loaded (it won't be for an OS icon/SVG favicon). **m6** holds (rect+tail+play, all bold). **#10 technical catch:** no standalone glyph — favicon/app-icon/chat-unfurl all need a square 1:1 mark; "PLANM⏵VIES" center-crops to garbage; relies on Barlow baseline that OS fallback breaks. Fine as in-app header lockup only. Export caveat (his own bias check): do NOT ship marks with `var(--gold)`/`var(--bg-*)` intact — favicon/unfurl have no `:root`; hardcode #c9a84c/#07080a, fix m2/m8 notch fills. **Strongest: m4 (pin+play) as standalone mark, optionally paired with the #10 wordmark for the in-app header. Confidence high on m4 small-size win and on the m5/m9/m11/m12 rejections (geometry unambiguous); medium on m10-as-companion (brand call).**

## Cross-layer triage
- Created `rangers/visual/memory.md` (first earned entries: validated principle on figure-ground + dead direction on inline three-seat / monogram).
- Skill note for `.claude/skills/impeccable` or design pipeline: marks/favicons must hardcode colors (no CSS vars) and negative cuts must punch to true page bg. (Skill picks up on next invocation.)
