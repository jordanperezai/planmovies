# Visual Rangers — Session 01: Landing Page

> **Date:** 2026-05-26
> **Type:** Test-run (roster validation) + implementation
> **Question:** How do we make this landing page feel cinematic, not like a well-organized form?

## Voice Responses

### Karin Fong (Composition)
The poster should dominate. Title text competes with poster (both say DISCLOSURE DAY). Eye should travel: poster → date → button. Three beats. The mid-stack is mush: four elements in a row, all small, all muted. Compress tagline-to-button gap.

### Tim Brown (Typography)
Six elements at 11px mono is a flatline. Barlow Condensed loaded but unused. Three typographic jobs: Arrangement (title), Calibration (labels/pills), Setting (body). Promote tagline to 17px/400. Split 11px cluster into metadata (11px) and status (10px). CTA: 13px/700/2px tracking.

### GMUNK (Color/Atmosphere)
Gold everywhere is gold nowhere. Three registers: hot (#c9a84c) CTA only, warm (#b8984a) title/badges, cool (#8a7d5a) credit/wordmark. Pull muted blue (#2a3a5a) from poster as counterweight. Drop the grid. Layer starfield with depth falloff.

### Fernando Ramirez (Film/Entertainment)
The page fights the film's visual language. Poster is blue/cold/dread, page is gold/warm/prestige. Kill title duplication. The page presents information about the event rather than creating the feeling.

### Jhey Tompkins (Verifier)
Five CSS moves: re-enable shimmer on title, poster entrance via @starting-style, scale on CTA glow, text-shadow bleed on title, scroll-driven parallax on layers. "The raw material is 90% there."

## Implemented

| Change | Source |
|---|---|
| Title shrunk to supporting role (1.4-2rem, 700 weight, letter-spacing 2px) | Fong + Ramirez |
| Title shimmer re-enabled (8s ease-in-out) | Tompkins |
| Title text-shadow gold glow bleed | Tompkins |
| Three gold registers: hot CTA, warm title/seal, cool wordmark/credit | GMUNK |
| Blue atmospheric radial gradient behind poster area | GMUNK |
| Grid layer removed | GMUNK |
| Poster: border-radius 4px (was 10px), blue-tinted box-shadow | Fong |
| Poster entrance: @starting-style opacity/scale/blur transition | Tompkins |
| Tagline promoted to 17px/400 with 1.45 line-height | Brown |
| Barlow Condensed on OPENING NIGHT pill and RSVP OPEN | Brown |
| Status text (countdown, tickets) dropped to 10px | Brown |
| CTA button: 13px/700/2px tracking | Brown |
| Headcount text in cool gold | GMUNK |

## Sharp Disagreement

Ramirez wanted to kill gold entirely and shift to poster's blue palette. GMUNK wanted to bridge both (gold identity + blue counterweight). Decision: GMUNK's bridge. Gold is PlanMovies' identity across future events. Blue makes this page feel like this film.

## Roster Verdict

All 5 voices produced specific, non-obvious, actionable output. Zero overlap. Tensions produced better outcomes (Ramirez pushed, GMUNK bridged). Team validated.
