# Design Rangers — Session 02: Landing Page Audit

> **Date:** 2026-05-26
> **Question:** What should change on the mobile landing page for maximum conversion from WhatsApp links?

## Unanimous Findings

- Too much above the CTA. Poster-to-button distance is the biggest conversion risk.
- Sub-11px text invisible to 45+ audience. All minimum sizes bumped to 11px.
- Tertiary contrast (#5a5850 on #07080a) fails WCAG AA at 2.8:1. Fixed to #7a7870.

## Key Decisions

| Finding | Source | Action |
|---|---|---|
| Four competing animations stutter on older phones | Frisby | Killed breathing, shimmer, starfield. Kept CTA glow only. |
| Headcount hidden below 3 is backwards | Murthy + Kim | Now shows "Jordan is going. Join them." from RSVP #1. |
| 9px text unreadable for 60+ | Johnson | All text bumped to 11px minimum. |
| Tertiary contrast fails WCAG | Johnson + Shadeed | #5a5850 → #7a7870 |
| No safe-area-inset on sticky CTA | Shadeed | Added env(safe-area-inset-bottom) |
| Countdown boxes break at 320px | Shadeed | Added flex-wrap to container |
| CTA button text too small | Johnson | 12px → 14px |

## Disagreements (unresolved, human decides)

- **Reassurance line:** Frisby says keep (conversion), Murthy says kill (signals distrust). Kept for now.
- **News banner:** Kim says move post-RSVP. Kept below CTA for now.
- **Countdown:** Kim says move to dashboard. Kept on landing for now.
- **Director credit:** Frisby says kill above fold. Kept but bumped to 11px and gold contrast.

## Unique Catches

- Frisby: pre-fill name via URL param (not implemented yet, future)
- Kim: countdown is coordinator enthusiasm, not participant motivation
- Johnson: rotating headlines force 4-second read window, working memory issue for aging users
- Murthy: family RSVPs to a person, not a page. Host name is the social proof.
- Shadeed: news banner calc(100%+48px) clips with parent overflow:hidden on iOS Safari
