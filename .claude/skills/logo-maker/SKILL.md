---
name: logo-maker
description: "Generate logo/brand-mark boards that get sharper every round. Loads what's been tried and killed, produces distinct in-feel directions as testable inline SVG, never decides for the human, and records the reaction so the next board starts smarter."
model: opus
triggers:
  - "logo"
  - "brand mark"
  - "make a logo"
  - "logo board"
  - "logo directions"
  - "/logo-maker"
user-invocable: true
---

# logo-maker — boards that compound

The job is not "draw a logo." The job is to run a tightening loop: each board rules out territory and the next one starts from what survived. Memory is the whole point. A board that ignores `memory.md` repeats a board we already rejected.

## Step 0 — Load memory (mandatory, before drawing anything)

Read `memory.md` in this skill folder. Internalize:
- **Dead directions** = closed roads. Do NOT re-propose them. If you think a dead direction deserves another look, say so explicitly and cite new evidence — don't sneak it back in.
- **Validated principles** = what survived. Apply them by default.
- **Voice calibration** = how this human reacts. What energizes him, what he rejects on sight, the words he uses.

Also read `references/inspiration.md` in this skill folder (the proven feeling-marks, the palette, the tone anchor, what to study vs avoid), `rangers/logo/memory.md` (the Logo Rangers' validated principles + dead directions — same hunt, different layer), and the latest `logos/README.md` plus the most recent `logos/logo-board-*.html` so the new board is numbered correctly and doesn't duplicate live concepts.

If `memory.md` doesn't exist yet, proceed, then create it in the wrap-up step from whatever this session proved.

## Step 1 — Pin the feel and the territory (don't re-litigate)

State, in 3-4 bullets, the **feel** (palette, mood, wordmark, what it must NOT be) and the **territory** (the subject matter the human keeps returning to). Pull these from memory, not from scratch. If the human has named a tone anchor file (e.g. a board he keeps pointing back to), that file IS the spec — match it.

Confirm the **surfaces** the mark must survive: favicon (16px), nav glyph (~20px), group-chat unfurl (on a WHITE bubble), OS app icon (tile), large hero logo. A mark that only works at one size isn't done.

## Step 2 — Generate DISTINCT directions (not variations, not mash-ups)

Default board: **8 marks, each a genuinely different concept** inside the agreed territory and feel.

Two failure modes to avoid, both learned the hard way:
- **Variations of one idea** dressed as eight. If six marks are the same silhouette restyled, that's one direction, not six.
- **Combining the marks he liked.** When the human flags two marks, that's evidence of the *territory* he wants, not a request to fuse them. Give him new distinct concepts in that territory unless he explicitly says "combine."

Each mark is **inline SVG**, drawn gold-on-transparent. Group related concepts under labeled lanes so the board reads as a map, not a pile.

## Step 3 — Build the tests INTO the board (non-negotiable)

Every mark on the board renders at, side by side:
- **84px hero** (on the dark card)
- **24px on dark** (nav reality)
- **22px on a white chip** (the chat-unfurl / light-bubble test)
- **nav lockup** (mark + wordmark at real nav size)

Mechanical rules, enforced, no exceptions:
- **The shipped mark is SVG.** Image-gen (ChatGPT/Midjourney) is allowed ONLY to explore a feeling fast; it never ships. The production logo is inline SVG so it scales, recolors, and stays crisp as favicon/nav/unfurl. If image-gen surfaces the winning idea, trace it into clean SVG before it touches `index.html`.
- Negative-space cuts = **true transparency** (`mask` or `fill-rule:evenodd`). Never a background-color fill. (A filled "hole" inverts to a dark gash on a white unfurl — looks like a bug.)
- Production marks **hardcode colors** (`#c9a84c`, `#07080a`, `#e8e6e1`). Favicons and unfurls have no access to CSS `:root`.
- Plan a **glyph + logo system**: a simplified small glyph for ≤24px, a fuller mark for ≥40px. One mark rarely spans 16-64px.
- Carry meaning in **solid/positive form** where possible; thin internal cuts die first at small size and for aging eyes.

Save as `logos/logo-board-N.html` (next number in sequence). Open it for the human.

## Step 3.5 — Anti-thrash: don't generate forever

This hunt hit 17 boards with no winner. Generating more is not progress — it's a stall. Enforce a circuit-breaker:

- **Kill on recognition before taste.** First question on any mark is "what is this?" at 16px and on white. Anything unrecognizable is dead regardless of how it looks at hero size. Only survivors get the taste question.
- **After ~3 boards with no keeper, STOP.** More boards won't help. Do one of:
  1. **Get a positive reference.** Ask the human for 2-3 existing logos (any industry) they wish were theirs, and what specifically hits. The whole search had been defined by "no"s with zero "yes" anchors — that's why it thrashed.
  2. **Run `/logo-rangers`** (`rangers/logo/`). Six real identity designers (Haviv, Scher, Hische, Draplin, Leader; Bierut verifies) attack the decision from distinct lenses. Use it to choose between live directions or diagnose why nothing lands — not to generate more options.
- **One direction at a time, to done.** When a direction shows life (the human flags it), stop widening and go deep on that one. Develop it; don't reset to a fresh concept.

## Step 4 — Present, don't decide

Lay out the lanes. Give your honest read (which is strongest and why) as a *read*, not a verdict. The human picks. Capture his exact reaction — the words matter for memory.

## Step 5 — On a pick: wire the system

When a mark is chosen, install it as a system, not a one-off:
- nav glyph (replace whatever's live)
- favicon (data-URI SVG, hardcoded colors)
- hero/landing lockup
- app-tile / og:image consideration (flag if it needs a raster export)

Re-read the target section of `index.html` before editing. Verify it renders at each surface before reporting done.

## Step 6 — Update memory (this is what makes the next board better)

Append to `memory.md`:
- **New dead direction?** What was rejected and the human's actual reason, with date.
- **New validated principle?** What survived and why.
- **Voice calibration shift?** New words, new patterns in how he reacts.
- **Cap:** 20 entries per section. Evict oldest `last-confirmed` at 21.

If a finding applies beyond logos (e.g. a typography or color truth), note it for `MEMORY.md` or the relevant ranger. If a board surfaced a repeatable mistake, run `/learn`.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I don't need to read memory, I remember the brief" | You will re-propose a killed direction. That's how we burned 13 boards. Read it. |
| "Eight restyles of the bench is a board" | That's one direction. He asked for distinct concepts. Eight silhouettes of the same thing is the thing he rejected. |
| "He liked these two, I'll combine them" | He said the opposite once already. Liked marks map the territory; they're not a remix brief. |
| "It looks fine at hero size" | Favicon and white-unfurl are where marks die. If the board doesn't test 16-24px on white, the board is incomplete. |
| "A bg-colored fill reads as a hole" | Only on the exact background you tested. On a white bubble it's a dark gash. Use true transparency. |
| "We picked a mark, we're done" | A mark isn't a system. Glyph + logo + favicon + tile, or it's not shipped. |
| "I'll generate a few more boards to find it" | 17 boards found nothing. Past 3 misses, generating IS the stall. Get a positive reference or run `/logo-rangers`. |
| "Image-gen made the best one, let's ship the PNG" | Raster doesn't ship. Trace the winning idea into SVG (hardcoded colors, true-transparency cuts) first. |
| "The human flagged two he likes, I'll fuse them" | Liked marks map the territory, not a combine brief. Go deep on ONE, don't mash. |
