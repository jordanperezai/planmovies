---
target: landing page (index.html)
total_score: 30
p0_count: 1
p1_count: 3
timestamp: 2026-05-30T02-39-05Z
slug: index-html-landing
---
# Critique — Landing page (index.html) — Session 17

## Design Health Score: 30/40 (Good)
1 Visibility 3 | 2 Match-real-world 3 | 3 User-control 3 | 4 Consistency 3 | 5 Error-prevention 3 | 6 Recognition 3 | 7 Flexibility 3 | 8 Aesthetic/minimalist 3 | 9 Error-recovery 2 | 10 Help/docs 4

## Anti-patterns: borderline. Detector clean (0). Tells: mark reads as battery/progress; initials-avatars look like seed data; vertical rhythm too even. Saved by the bespoke sprocket-hole countdown.

## Strengths
- Sprocket-hole countdown frame (bespoke, on-brand).
- IA complete on one mobile screen (what/who/when/where/action).
- Mobile engineering: sticky CTA, dvh, safe-area, reduced-motion, escape hatch.

## Priority issues
- [P0] Fill mark lowest-contrast on page: open seats #6e3a26 = 2.19:1 on bg, filled-vs-open 2.14:1 (VERIFIED). Doesn't self-explain (reads battery). Fix: open seats -> ember OUTLINE (fixes contrast + state-diff; two solid ember tones can't do both), bind a "X of 5 seats saved" label.
- [P1] Fill logic lies: renderHeroRow(Math.max(1,...)) shows 1 filled at 0 RSVPs; caps at 5 while text says "12 going." Fix: zero -> all-outline + "be the first"; >5 -> mark full, text carries count.
- [P1] Ember monochrome wash: title/wordmark/countdown/headcount/CTA all same ember; CTA stands out only as a pill; 3 elements glow. Fix: reserve full #e53908 + glow for CTA + live status only; pull countdown/headcount to gold-warm/cream; strip hero-mark drop-shadow.
- [P1] "What is Disclosure Day?" tap target ~30px, abuts CTA. Fix: min-height 44px, +padding, +16px gap.
- [P2] Pre-hydration blank: '--' countdown + empty headcount, no fallback. Fix: seed countdown (Jun 12 fixed), fallback copy in headcount div.
- [P2] "DIRECTOR" badge + initials avatars: misreads as film credit; placeholder look. Fix: rename "HOST"; real photos, initials fallback.

## Persona red flags
- Jordan: reads as movie ad before invite; no "who sent me this"; CTA below the fold.
- Riley: zero-state + 5-cap make the meter read fake.
- Casey: sticky CTA opacity:0 on landing (only mid-page CTA); carousel arrows in swipe path.

## Verification note
Director's "half-built left spine" (.landing-subtitle/.landing-crew-strip centered) = FALSE POSITIVE: dead CSS rules not in rendered landing; spine confirmed clean by screenshot. Contrast numbers independently verified.
