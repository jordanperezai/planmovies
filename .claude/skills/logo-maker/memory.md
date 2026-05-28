# memory.md — logo-maker

> **Cap:** 20 active entries per section. Oldest `last-confirmed` evicted at #21.
> **Cadence tags:** hot (7d) | tactical (30d) | stable (60d) | frozen (historical fact)
> Seeded 2026-05-28 from `rangers/visual/memory.md`, `logos/README.md`, and Session 13/14 logo work (13+ boards explored).

## The Feel (the spec to check every board against)

- **Dark + gold + cinematic.** Gold `#c9a84c`, cream `#e8e6e1`, near-black `#07080a`. Premium, warm, confident. Not nostalgic, not precious, not startup-bubbly.
- **Tone anchor:** `logos/logo-board.html`. When Jordan says "go back to the feel," this board is the spec. Clean dark cards, gold marks, wordmark = Plan (cream) + Movies (gold).
- **Position:** "get the row together / we're all seeing it together." The mark lives in a group chat; it's the moment BEFORE the movie.
- **Wordmark:** unresolved between Barlow Condensed (cinematic/credits) and Inter Black 900, tight tracking (punchy, reads younger). Jordan praised the Inter Black weight this session. Offer both, let him pick; don't assume.

## The Territory (what he keeps returning to)

- **Ticket and seats are the center of gravity.** He rejects fully-abstract marks ("all of these suck") and returns to the ticket + the seats every time. Stay concrete in this territory unless he explicitly opens it up.
- Positively flagged: **ticket + check** ("you're in / confirmed"), **two tickets** ("we all got in"), and earlier a **two-seat bench**. These map the territory — confirmation + togetherness + the physical ticket/seat — they are NOT a remix brief.

## Validated Principles

- **The TICKET is cold; warmth lives in the SEAT and the CHAT.** Context: Session 14 — after 3 ticket-heavy boards (4/5/6) Jordan said none of them moved him, then pasted the two marks that "make me feel something more": the plush held-seat (#1) and the chat-bubble-with-play "The Plan" (#6). A ticket reads as admission/transaction/barcode. The plush armchair reads comfort/belonging; the chat+play bubble reads "us making the plan to watch." Lead with feeling-objects, not transaction-objects. cadence: hot. last-confirmed: 2026-05-28
- **The chat-bubble-with-play ("The Plan") is the strongest single glyph found: it IS the product (plan = chat, movie = play) in one warm figure-ground shape.** Note the play cut MUST be true transparency, not a near-black fill (the original violated this). cadence: hot. last-confirmed: 2026-05-28
- **A single PLUSH seat (rounded back + arms + cushion + feet) reads warm/inviting, NOT lonely — distinct from the thin theater-seat the rangers killed.** Jordan's gut overrode the "single seat = lonely" ranger finding when the seat was plush and cozy. Plushness (big radii, arm bumps) carries the warmth; thin angular seats do not. cadence: hot. last-confirmed: 2026-05-28
- **"Does it make me feel something?" is Jordan's real acceptance test — above recognition and cleverness.** He rejects clever/clean marks that don't move him and keeps returning to the ones that do. When a board is technically strong but flat, that's the failure. cadence: stable. last-confirmed: 2026-05-28
- **Flat hand-coded SVG of a recognizable object CANNOT deliver the warmth Jordan wants — it reads "cliché and boring" no matter how it's refined.** Context: 15 SVG boards, all rejected; the chair, bubble+play, ticket, couch each landed flat. The marks that DID move him (and that started the project) were ChatGPT-generated raster images with rendered light/depth/craft. The right tool for the mark is image-gen (ChatGPT/Midjourney/Imagen); SVG's job is to convert the chosen image into production favicon/nav, NOT to originate the feeling. Stop generating SVG object-boards; write image-gen prompts instead. cadence: hot. last-confirmed: 2026-05-28
- **A seat mark must have NO legs/feet — tiny legs look broken at small size.** Jordan, board 7: liked the plush seat but "hate[s] the chair being a logo cuz of the tiny legs that look bad when small." If a seat/couch is used, it's a legless plush silhouette (back + arms + cushion only). cadence: stable. last-confirmed: 2026-05-28
- **Liked marks map the territory; they are not a "combine these" instruction.** Context: Session 14 — after he flagged ticket+check and two-tickets, I built a board fusing them; he corrected: "I didn't mean to combine what I liked, I wanted DIFFERENT DIRECTIONS but within the same feel." Give distinct concepts in the territory, never mash-ups, unless he says "combine." cadence: stable. last-confirmed: 2026-05-28
- **A board is a MAP of distinct concepts, not N restyles of one silhouette.** Context: Session 14 — eight variations of the bench / eight ticket restyles read as one direction and stall him. Each mark must be a genuinely different idea. cadence: stable. last-confirmed: 2026-05-28
- **Build the size + white-chip tests into every board.** Hero 84 / 24 dark / 22 on white / nav lockup, side by side. Concept appeal and small-size survival diverge hard; the white chip catches unfurl inversion before anyone falls in love. cadence: frozen. last-confirmed: 2026-05-28
- **Negative-space cuts = TRUE transparency (mask / fill-rule:evenodd), never a bg-color fill.** A filled "hole" only reads as a hole on the exact background tested; on a white chat bubble it inverts to a dark gash and looks like a rendering bug. (LEARNINGS #10.) cadence: frozen. last-confirmed: 2026-05-28
- **Marks/favicons hardcode colors — no CSS vars.** Favicon and group-chat unfurl render with no access to `:root`. Export every `var(--gold)` as `#c9a84c`, etc. cadence: frozen. last-confirmed: 2026-05-28
- **Ship a glyph + logo SYSTEM, not one mark.** No single mark survives 16-64px; pair a simplified small glyph (favicon/nav) with a fuller logo (≥40px). cadence: stable. last-confirmed: 2026-05-28
- **A single bold figure-ground shape beats additive icons.** Multi-element marks (dot-rings, bulbs, beams, stacked thin seats) collapse below ~24px. Four of five visual rangers favored figure/ground over additive. cadence: stable. last-confirmed: 2026-05-28
- **For the mixed/aging end of the audience, carry meaning in SOLID/positive form, not absence.** A small internal dark wedge reads as a defect before a symbol; reduced contrast sensitivity attacks thin internal edges hardest. cadence: stable. last-confirmed: 2026-05-28

## LEAD DIRECTION (2026-05-28): the wordmark IS the logo + the O is a screen

After ~16 pictogram attempts all failed (cliché or cold), pivoted to wordmark-as-logo. Set "PLANMOVIES" as a film title card, cream PLAN + gold MOVIES, in **Clash Display** (Fontshare, free, characterful). Wired into index.html nav + landing to test in context.
Then the breakthrough: **Jordan noticed the counter of the "O" in Clash Display reads as a little movie screen** — and liked it. This is the ownable detail the whole hunt was missing: a FedEx-style negative-space "aha" hiding in a letter you already type. NOT the killed "play-in-O" trope — a SCREEN in the O is subtler, warmer, unclaimed.
Plan: custom-draw only the O (true-hole screen counter), keep the rest clean Clash. Logo = the wordmark; favicon/app-glyph = the O alone. Options shown in `logos/logo-O-screen.html` (O1 4:3 / O2 16:9 / O3 subtle). Working theory: subtle O in the wordmark, bolder O as the standalone glyph.
Why this beats everything prior: it's the NAME (no pictogram to look amateur), it's ownable (nobody else's O hides a screen), it scales (O = icon), and Jordan found it himself = real signal, not a sell.

## Dead Directions

- **The TICKET as primary mark (single stub, confirmed ticket, paired tickets, ticket fan, admit-one stamp, the-stub-you-keep, ticket tiles).** Why: three full boards of ticket concepts (4, 5, 6) left Jordan flat — "I didn't like any of the ones we just did." The ticket reads transactional/cold; it doesn't carry the feeling. Don't re-pitch ticket-led marks. Boards 4-6, 2026-05-28. last-confirmed: 2026-05-28
- **The watch-party bubble (chat bubble containing a screen + a crew of heads), in every form — 3D glow render AND flat figure-ground.** Why: looked good in isolation but "hated it" in the nav/landing lockup. It's a clip-art genre (the watch-party icon) — polish can't save a tired idea, and a bubble reads "chat app in a movie costume." Killed in-context, 2026-05-28. last-confirmed: 2026-05-28
- **Fully-abstract marks (letterforms: aperture-P, monoline-P, "pm"; gestures: crescent, bloom, halo, aperture ring, sweep).** Why: Jordan — "all of these suck," wants to stay concrete, not abstract away from what the product is. Board 3, 2026-05-28. last-confirmed: 2026-05-28
- **Combining two liked marks into one (two-tickets + check fused).** Why: he wanted distinct directions in the same feel, not a synthesis. Board 5 over-rotated on this. 2026-05-28. last-confirmed: 2026-05-28
- **Single-seat mark with a negative-space play cut.** Why: meaning fails ("one person/lonely," contradicts "your people/together") AND the cut reads as a glitch/notch at 16-20px and for aging eyes. Both ranger panels + 4/4 family. 2026-05-28. last-confirmed: 2026-05-28
- **Inline three-seat mark wedged in the wordmark (PLAN ▢▢▢ MOVIES).** Why: at nav size it reads as three blobs / a separator, not a logo. Rejected on sight. 2026-05-28. last-confirmed: 2026-05-28
- **"PM" monogram as the brand mark.** Why: set in the wordmark's font it spells the brand twice; generic, "says nothing cinematic." Name is already short — a monogram earns its place only if the name is too long or the letters are custom-drawn. 2026-05-28. last-confirmed: 2026-05-28
- **Wordmark-integrated O=play as the PRIMARY identity.** Why: no standalone 1:1 glyph → can't serve favicon/app-icon/chat thumbnail (center-crops to garbage). Viable only as an in-app header lockup paired with a separate glyph. 2026-05-28. last-confirmed: 2026-05-28
- **Type-led tropes (lowercase wordmark, play-in-O, three dots).** Why: "played out, done before"; Letterboxd/Spotify own them. 2026-05-28. last-confirmed: 2026-05-28
- **Cold behavior-device diagrams (the row that fills, lock-in bracket, underline row).** Why: "clever but cold, doesn't resonate with the whole idea." 2026-05-28. last-confirmed: 2026-05-28
- **Scalloped seat-backs / character-styled seats.** Why: scallops read as "fingers/crown"; two-seat loveseat read as "a couch." 2026-05-28. last-confirmed: 2026-05-28

## Voice Calibration

- Energized by **breadth** ("oh wow, give me 4 more," "let's do 8 more"). Wants to react to many at once on one board (the `logo-board.html` format).
- Rejects fast and bluntly ("doesn't look like a logo," "all of these suck," "horrivle except the 0"). Take the rejection at face value; don't defend the board.
- Returns to a **tone anchor file** and a **territory** repeatedly — treat those as fixed and explore WITHIN them, don't keep widening the search.
- Corrects over-interpretation: when he flags marks he likes, he means "this territory," not "remix these."
- Pulled toward **meaning + togetherness**, but small-size survival keeps overruling pure-meaning picks. Surface both lenses when he's choosing.
- **He decides by feeling, then pastes the proof.** When stuck he screenshots the 1-2 marks that "make me feel something more" — those are the real finalists. Develop what he pastes; don't argue it against ranger logic (his gut overrode the "lonely seat" finding). The two he pasted at board 6: plush held-seat + chat-bubble-with-play.
- Has rejected ~14 boards without a finalist. The risk is thrash; once he flags a feeling-mark, STOP widening and go deep on that one.

## Distillation Log

| Date | What changed | Source |
|---|---|---|
| 2026-05-28 | Skill + memory created. Seeded from visual ranger memory, logos/README, and the board-3/4/5 reactions (abstract killed, no-combine rule, distinct-directions rule). | Session 14 |
