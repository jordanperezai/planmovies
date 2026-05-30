# Logo 04 — Lockup alignment + the row-fills system

> Session 17 | 2026-05-29 | Two panels: Logo Rangers (6 designers) + Family personas (5 users) + 3 anonymous peer reviewers
> Decision: left vs centered lockup; ship/cut/concerns on the fill system (mark's seats fill ember as people RSVP)
> Run via the `logo-family-panel` workflow (11 independent agents, neutral prompts, then peer review w/ forced dissent). Raw output archived in the task transcript.

## Verdict (what was decided + shipped)

- **Alignment → LEFT.** 9 of 11 (designers 5/6, family 4/5). Whole hero left-aligned on one spine. Shipped.
- **Fill system → SHIP as a live meter, NOT as the logo.** The hero mark fills with real RSVPs; the mark stays solid-5-ember everywhere it's identity. Shipped.
- **Color corrected** #d9480f → **#e53908** (the sheet's label was wrong; its pixels are #e53908).
- **Favicon + nav unified to 5 tabs** (the 3-tab glyph was a verified inconsistency). Shipped.

## Tallies
- Logo alignment: left 5, centered 1 (Draplin). Logo fill: concerns 5, ship 1 (Scher).
- Family alignment: left 4, centered 1 (Carmen). Family understood the fill: **5/5**. Family RSVP: yes 3, maybe 2.

## Why LEFT (the strongest reasoning)
- The mark IS a row; rows read left-to-right. Centering turns it into "a decorative cluster floating in space" (Haviv). Left gives a vertical spine the wordmark + tagline hang off (Scher), matches the left-aligned nav + group-chat context, and the fill grows from a fixed left edge like a progress bar.
- Family, unprompted: "reads like a normal text, my eye knows where to start." Jordan independently noticed left-aligned reads as "movie rows" (asymmetry = depth = theater seating).
- Dissent (kept): Draplin + Carmen wanted centered (poster/flyer symmetry; calmer for older eyes). Peer-review forced dissent argued the share card is a poster (centers) — but the actual og:image is the movie poster, not the lockup, so that argument is moot for the mark.

## Why fill = meter, not logo (unanimous design caution, family-loved)
- A logo must be constant to become iconic; a mostly-gray logo as the first impression "reads broken/dead" (Haviv). So: mark stays solid-5-ember everywhere it's identity; the FILL lives on the hero where it's captioned and clearly a status.
- Open seats: gray reads "disabled/broken" → use a warm dim-ember (`--seat-open #6e3a26`) that reads "waiting." Start at seat 1 (organizer always lit) so it's never all-dead.
- Cap-at-5 would lie once a crew exceeds 5 → 5 tabs = a MILESTONE; the true uncapped count lives in the existing text ("N going").
- Family confirmed it creates real join-FOMO: "like saving seats at church, made me want to text everyone to hurry up" (Carmen); "mild FOMO, which is the point" (Marco). 5/5 understood it (some a beat late without the caption).

## What only the verifier (Bierut) caught — by opening the code
1. Favicon + nav were **3-tab** while the mark is **5-tab** → a real inconsistency. Tested: 5 tabs hold at 16px, so unified to 5 everywhere.
2. The "open seat" gray had drifted across 3 values → one `--seat-open` token.
3. Cap-at-5 → milestone + text (above).

## Peer-review meta-lesson
5 of 6 designers reasoned from the mockups, not the shipped code; only the verifier opened `index.html`. Consensus felt authoritative but several "discoveries" (cap-at-5, gray-vs-outline) were the artifact's own captions handed around. Tests/consensus ≠ verification. (Mirrors CLAUDE.md Pattern #4 "documentation as behavior" and #10 "trust delegated output.")

## Family-surfaced fixes (beyond the logo — for later)
- Carmen/Ray: the date + "A Steven Spielberg Film" are too small/dim; needs a louder "you're in, <name>" confirmation after RSVP.
- Lisa: name the theater + city + that it's free up front (trust).
- Sofia: put crew faces IN the seats → screenshot-worthy.
