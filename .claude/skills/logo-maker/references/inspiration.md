# Inspiration & References — logo-maker

> What "good" looks like for the PlanMovies mark, the proven feeling-marks, the palette, and what to study vs avoid. Load this with `memory.md` before generating a board.

## The feeling we're chasing

The mark is not a label for "movies." It's the feeling of **the moment before the movie**: the group thread lighting up, your spot saved, everyone going together. Warm, soft, social, confident. A thing you'd be happy to see land in your group chat.

The acceptance test is literal: **does it make Jordan feel something?** Clean and clever lose to warm and felt every time.

## The two proven feeling-marks (paste-tested by Jordan, board 6 reaction)

These are the only marks that have made him feel something across 14 boards. Start any new board from these, not from scratch.

### 1. "The Plan" — chat bubble + play
The product in one glyph: the chat bubble = the plan, the play = the movie. PlanMovies, literally.
```svg
<!-- gold bubble, play as a TRUE hole (mask), tail bottom-left -->
<mask id="p"><rect width="100" height="100" fill="#fff"/><polygon points="43,33 43,53 61,43" fill="#000"/></mask>
<g mask="url(#p)" fill="#c9a84c"><rect x="16" y="20" width="68" height="46" rx="15"/><polygon points="30,60 30,82 49,64"/></g>
```
Warmth comes from the rounded bubble. The play MUST be true transparency (or a positive cream triangle), never a near-black fill — it inverts on a white unfurl.

### 2. "Your Seat" — plush armchair
Soft, cozy, inviting. Reads comfort and belonging, not the thin/lonely theater seat the rangers killed. Plushness (big radii, arm bumps, a cushion) is what carries the warmth.
```svg
<g fill="#c9a84c">
  <rect x="30" y="22" width="40" height="42" rx="13"/>
  <rect x="19" y="42" width="15" height="34" rx="7"/><rect x="66" y="42" width="15" height="34" rx="7"/>
  <rect x="26" y="54" width="48" height="22" rx="9"/>
  <rect x="27" y="74" width="8" height="13" rx="2"/><rect x="65" y="74" width="8" height="13" rx="2"/>
</g>
```

## Palette (hardcode in every mark — favicons/unfurls have no :root)

| Token | Hex | Use |
|---|---|---|
| gold | `#c9a84c` | the mark |
| gold-mid | `#b89a52` | secondary layer in multi-element marks |
| gold-dim | `#9c8243` | back layer / depth |
| cream | `#e8e6e1` | positive accent (e.g. cream play in a gold bubble) |
| near-black | `#07080a` | true page background; what a cut "shows through" to |

Wordmark: "Plan" in cream + "Movies" in gold. Type candidates: **Inter Black 900** (tight tracking, younger, punchier — Jordan leaned here) vs **Barlow Condensed** (cinematic, the `logo-board.html` original). Resolve type AFTER the mark wins.

## Tone anchor

`logos/logo-board.html` is the mood spec — dark cards, gold marks, the clean board layout. When Jordan says "go back to the feel," he means this file.

## Study (warmth + social, not to copy)

- Soft, rounded, single-object app glyphs that feel friendly at a glance (think warm messaging/social marks): the lesson is *roundness + one bold object = warmth*.
- Premium dark + gold treatments in film/event branding: the lesson is *restraint + one metallic accent on near-black = "event," not "startup."*

## Avoid (others own these; Jordan called them played-out)

- **Letterboxd** owns the three-dot / circles motif.
- **Spotify** owns the play-button-as-identity and waveform.
- **Fandango / generic ticketing** own the literal ticket stub — and it reads cold/transactional anyway (see `memory.md` dead directions).
- Marquees, film reels, clapperboards → nostalgic/precious.

## Where the full history lives

- `logos/README.md` — every board explored + why each was killed.
- `logos/CODEX-PLAN.md` — Codex's 8-direction plan + decision protocol.
- `rangers/visual/sessions/visual-03-logo-direction.md` and `rangers/product/sessions/product-09-logo-direction-A.md` — the two ranger panels.
