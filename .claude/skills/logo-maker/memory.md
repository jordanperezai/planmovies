# memory.md — logo-maker

> **Cap:** 20 active entries per section. Oldest `last-confirmed` evicted at #21.
> **Cadence tags:** hot (7d) | tactical (30d) | stable (60d) | frozen (historical fact)
> Built from Sessions 13–16. ~25 directions tried. Concept locked 2026-05-29.

## The Spec (current, as of 2026-05-29)

- **Brand:** Ember `#E53908` (NOT #d9480f — see COLOR principle) + cream `#f3f1ec` + near-black `#07080a`. Cinematic, dark, warm. NOT nostalgic, precious, or startup-bubbly.
- **The mark:** Five chunky rounded-top TABS in a wide low band (~6:1) — reads as seats AND people-from-behind. `<symbol id="seatRow">` viewBox `0 0 216 36`; per-tab W=40, gap=4, corner-radius r=12, total height 36 (rounded-RECT top, NOT a tall semicircle). 5 tabs EVERYWHERE (hero, nav, favicon) — one mark scaled. All `fill="var(--gold)"` (token name kept, value is ember).
- **Wordmark:** lowercase `planmovies`, Poppins 800. "plan" cream (near-black on white), "movies" ember. NEVER uppercase. NEVER Clash Display.
- **Slogan:** "Get the row together." — sits under the wordmark in the lockup.
- **Position:** the mark lives in a group chat; the moment BEFORE the movie. The row FILLS as the crew joins.

## Validated Principles

- **CONCEPT LOCKED 2026-05-29 ("OMG this is it!"): five rounded arches in a row.** Reads as seats AND people-from-behind simultaneously. Monochrome ember, all same height, lowercase `planmovies` wordmark. Holds 16px→storefront. Source: ChatGPT image-gen → traced to SVG after ~25 total directions tried. cadence: hot. last-confirmed: 2026-05-29
- **COLOR (corrected Session 17): Ember `#E53908`, NOT `#d9480f`.** The brand sheet's printed LABEL said "#D9480F" but ChatGPT never rendered that hex — the actual sheet PIXELS sample to #e53908 (brighter, redder). Jordan's eye caught it ("I still see the wrong color"). LESSON: trace the reference PIXELS, not its color label. Ramp: base #e53908, warm #fb5316, cool #c9582f, dim #b32c06, bright #ff6326, glow rgba(229,57,8,*). cadence: hot. last-confirmed: 2026-05-29
- **THE FILL SYSTEM (Session 17): the hero mark fills with live RSVPs; the LOGO stays constant.** On the landing the 5 tabs fill ember as people RSVP. **Open seats = ember OUTLINE (`--gold-cool` stroke), filled = solid ember.** A dim-ember FILL (#6e3a26) FAILED — measured 2.19:1 on bg + only 2.14:1 vs filled (caught by `/critique`); two solid ember tones can't be both visible AND distinct from filled. Outline was the Logo Rangers' original call (I overrode it, critique vindicated them). A "N of 5 seats saved" caption (`#row-status`) teaches the mechanic — the mark alone read as a battery. Honest edges: 0 = all-outline + "be the first" (NOT a fake filled seat-1), >5 = "the row is set · N going". Capped at 5 = MILESTONE; true count in text. EVERYWHERE the mark is identity (favicon, nav, app icon, share) it stays SOLID 5 ember (constant = iconic, Haviv). `renderHeroRow(total)` hooked into `updateLandingHeadcount`. **S20 UPDATE: open-seat outline is now GREY (#6b7078, 4.02:1 on near-black), NOT ember.** Ember exclusively = a filled seat = a person; the grey→ember stroke transition reads as the row lighting up. Grey SOLID was considered and rejected: a grey solid visible on bg sits only ~1.5:1 from filled ember (color-only), losing the hollow-vs-solid SHAPE cue that survives 16px and greyscale. Outline keeps the shape; grey changes only the hue. cadence: hot. last-confirmed: 2026-05-30
- **Reserve ember for the MARK + "movies" + the CTA — color is punctuation, not wallpaper.** Session 17 the landing had ~5 elements in the same ember band ("too much orange" — Jordan's gut + `/critique` P1). Fix: title + countdown → cream, credit + social line + caption → neutral, background glow calmed. The CTA must own the saturated ember (it's the action). cadence: hot. last-confirmed: 2026-05-30
- **SVG width:auto in a flex nav = bug.** An inline `<svg viewBox="0 0 216 36">` with `height:Npx; width:auto` falls back to the viewBox's 216px width, hogging ~150px and shoving siblings off-screen. Always give nav/inline SVGs an EXPLICIT width. (The `.hero-mark` was fine — it had explicit width.) cadence: tactical. last-confirmed: 2026-05-30
- **LEFT-ALIGNED lockup wins (panel 9/11: 5/6 designers + 4/5 family).** A row reads left-to-right; left-aligning the whole hero (lockup + poster + text + countdown on one spine) creates a "theater rows / seating" depth illusion (asymmetry = depth) — a feature, on-brand, matches the nav + group-chat context. Jordan spotted the illusion himself. Centered reads "poster/flyer"; left reads "product." **S20 REFINEMENT: alignment is context-dependent.** Nav + lockup stay LEFT (product). The LANDING HERO is now CENTERED — Jordan's read: centered = "you're seated mid-theater, dead center of the screen," and that feeling wins over the convention on the hero specifically. Nav and hero don't have to match. cadence: hot. last-confirmed: 2026-05-30
- **100dvh landing gotcha:** the poster carousel is `flex:1` to absorb slack and fit the frame. Wrapping landing content in a sub-container BREAKS that unless the wrapper also gets `flex:1; min-height:0`. Use `justify-content: safe center` so the top lockup is never clipped on short viewports (it top-aligns instead of clipping both ends). cadence: tactical. last-confirmed: 2026-05-29
- **All arches SAME HEIGHT. Distinguish "you" by COLOR ONLY — not by making the center taller.** A taller center = middle finger. Tested and confirmed. cadence: hot. last-confirmed: 2026-05-29
- **GEOMETRY CORRECTED 2026-05-29: the mark is a WIDE LOW BAND (~6:1) of chunky rounded-top tabs, not a tall row of skinny fingers.** The first wire-in (viewBox 154×88, narrow Q-curve fingers) read wrong vs the ChatGPT brand sheet ("does not look like it should"). Re-traced from the sheet PIXELS: per-tab total/width ≈ 0.9, corner-radius/width ≈ 0.28–0.30, gap/width ≈ 0.1; top is a rounded-RECT (flat-ish crown + r≈12 corners) — a pure ellipse domes too much, a tight r reads boxy. cadence: hot. last-confirmed: 2026-05-29
- **Surface system (Session 17): 5 tabs EVERYWHERE — one mark, scaled.** Hero/landing = 5-tab band LEFT-aligned above wordmark + slogan (left spine). Nav = 5-tab `#seatRow` left of the wordmark (CSS height 13px → ~78px wide). Favicon = 5 solid-ember tabs on a dark tile (data-URI w/ transform; verified 5 tabs HOLD at 16px, don't smear). The Session-16 3-tab glyph (`seatRow3`) was REMOVED — Bierut: "one mark scaled, not two pretending to be one." cadence: hot. last-confirmed: 2026-05-29
- **No browser extension → ground-truth a mark with headless Chrome.** `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=out.png file://…`, then PIL/ImageMagick to crop + pixel-profile MINE vs the reference (arch width, gap, dome rise, straight height). This is how the geometry was locked, not by eyeballing the SVG source. cadence: tactical. last-confirmed: 2026-05-29
- **Jordan decides by feeling and pastes the proof.** Screenshots the 1-2 that "make me feel something" — develop what he pastes; don't argue against ranger/data logic. cadence: stable. last-confirmed: 2026-05-29
- **Image-gen (ChatGPT/Imagen) is how to unlock the feeling; SVG is how you ship it.** After ~25 SVG boards, a ChatGPT render cracked the concept in one shot. The pipeline: image-gen to find/feel → trace to SVG to ship. Never the reverse. cadence: hot. last-confirmed: 2026-05-29
- **After 3 misses, STOP generating boards.** Get a positive reference first. The hunt that found the 5-arch mark: build a reference board of real logos that make you feel something — that's the "yes" anchor. cadence: stable. last-confirmed: 2026-05-29
- **Build the size + white-chip tests into every board.** Hero (84-220px) / 24px nav dark / 22px on WHITE chip / nav lockup / favicon tile. cadence: frozen. last-confirmed: 2026-05-29
- **Marks/favicons hardcode colors — no CSS vars.** `var(--gold)` in production SVG → `#e53908` in favicon data-URI (favicons have no :root). cadence: frozen. last-confirmed: 2026-05-29
- **After wiring a brand change, Codex must verify two things: (1) CSS rules that force-override the new case/style, (2) undefined tokens that the new lockup references.** Both bit us: `text-transform:uppercase` in `.nav-brand` silently uppercased the lowercase wordmark; `--cream` was referenced but never defined → invisible text. cadence: hot. last-confirmed: 2026-05-29
- **The production mark is SVG + raster, not one or the other.** SVG = favicon/nav (crisp, scales, 1KB). Raster = app icon / og:image (required by spec, carries the lit/dimensional feeling). cadence: stable. last-confirmed: 2026-05-29
- **Negative-space cuts = TRUE transparency (mask / fill-rule:evenodd), never a bg-color fill.** On a white chat bubble a bg-colored "hole" inverts to a dark gash. (LEARNINGS #10.) cadence: frozen. last-confirmed: 2026-05-28
- **A single bold figure-ground shape beats additive icons at small size.** Five arches over three seats over one armchair — simpler wins small. cadence: stable. last-confirmed: 2026-05-28

## Dead Directions

- **ALL SVG pictogram marks tried (~20+ total) without a positive reference.** Seats, tickets, chat-bubbles, abstract gestures, people/feeling marks, letterform tricks, image-gen rounds 1–4. None delivered until the reference board + ChatGPT brand sheet (round 5). last-confirmed: 2026-05-29
- **The three-seat armchair row (boards 8–9, with arms + cushions).** Superseded by the 5-arch row. Armchair arms caused the taller-center-seat "middle finger" problem. The simpler arch is cleaner, iconic, and more readable small. last-confirmed: 2026-05-29
- **Taller center arch to indicate "you."** Looks like a middle finger at full size. Killed same session it was tried. Distinguish "you" by color only. last-confirmed: 2026-05-29
- **The TICKET as primary mark.** Reads transactional/cold; 3 boards left Jordan flat. last-confirmed: 2026-05-28
- **The watch-party bubble (chat bubble + screen + crowd).** "Hated it" in the nav lockup; a clip-art genre. last-confirmed: 2026-05-28
- **Fully-abstract marks (crescent, bloom, halo, aperture ring, sweep).** "All of these suck." last-confirmed: 2026-05-28
- **Play-button-in-the-O / screen-O wordmark.** Letterboxd owns the O-as-play; screen-O was our live placeholder, rejected on feeling. last-confirmed: 2026-05-28
- **PM monogram.** Spells the brand twice; generic. last-confirmed: 2026-05-28
- **Cold behavior-device diagrams (filling row, lock-in bracket).** "Clever but cold." last-confirmed: 2026-05-28
- **`#d9480f` as the ember (Session 16's value).** Wrong — read off the brand sheet's text LABEL, not its pixels; the real rendered color is #e53908. Superseded Session 17. last-confirmed: 2026-05-29
- **3-tab favicon/nav glyph (`seatRow3`) + stacked-CENTERED hero lockup.** Superseded Session 17: unified to 5 tabs everywhere, hero lockup is LEFT-aligned. The 3-tab created a verified favicon-≠-mark inconsistency (Bierut caught it). last-confirmed: 2026-05-29
- **Pure gold (#c9a84c or even #d4af37) as the sole brand color.** Gold is the open lane in the category (nobody owns it), but it reads "luxury/awards," not "movie night with your people." Jordan consistently reached for red/ember when asked to feel something. Ember was unanimous on feeling (even if the design team voted gold on differentiation). last-confirmed: 2026-05-29

## Voice Calibration

- Energized by breadth (wants many at once). Rejects fast and bluntly — take it at face value.
- Build a live switcher/lab; let him drive color/variant selection instead of guessing.
- Past 3 misses, generating IS the stall. Stop; build a reference board of real logos he loves.
- The image-gen render is what moved him every time, not the flat SVG board. Lead with the feeling; follow with the technical trace.

## Distillation Log

| Date | What changed | Source |
|---|---|---|
| 2026-05-28 | Created, seeded, and consolidated. ~20 directions tried + all rejected. Meta-conclusion locked. | Sessions 14–15 |
| 2026-05-29 | Rewritten. Concept locked (5-arch row). Color finalized (ember #D9480F). Superseded 3-seat/gold entries evicted. Over-cap consolidated from 31→14 validated + 10 dead. | Session 16 |
| 2026-05-29 | Session 17: geometry re-traced to chunky tabs; color corrected #d9480f→#e53908 (label≠pixels); fill system + left-align locked via Logo+Family panel; 5 tabs unified everywhere (seatRow3 removed). | Session 17 |
