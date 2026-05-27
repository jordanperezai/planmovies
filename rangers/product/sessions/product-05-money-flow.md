# Product Rangers Session 05 — Money Flow

**Date:** 2026-05-27
**Question:** How should the money flow work for group ticket purchasing? Three scenarios: A (everyone buys own), B (organizer buys block, collects after), C (everyone pays through site).

---

## Vote: 3-2 for Scenario B

| Ranger | Vote | Key Argument |
|---|---|---|
| Frisby | B | Payment on-site kills conversion for 12 family members. Manual tracker is the 80/20. |
| Kim | B | Crew list with visible payment status IS the nudge engine. One WhatsApp replaces five. |
| Johnson | A | Adding payment creates category crisis. Carmen thinks RSVP = ticket. Ray won't enter card. |
| Murthy | A | Payment between RSVP and confirmation cuts conversion 30-40%. Protect the social mechanic. |
| Shadeed | B | Payment Link already 90% built. togglePaid() exists. 5 lines of code. C needs backend that doesn't exist. |

## Unanimous (5/5)

- Kill Scenario C for this event. Too complex, needs backend, legal gray area.
- Crew list is the coordination engine regardless of payment approach.
- Stripe Payment Links are the ceiling. No Checkout Sessions, no webhooks.

## Key Disagreement

Team A (Johnson, Murthy): Each person buys their own on Regal. Keep site as coordination only.
Team B (Frisby, Kim, Shadeed): Jordan buys block, site tracks who paid back. Guaranteed seats together.

## Family Personas Verdict (run separately)

- Marco: pays in 90 seconds via any method
- Lisa: does NOT want payment status visible publicly. Fandango price proof converts her.
- Carmen: needs quantity selector (paying for herself + Sofia). Will Zelle and call to confirm.
- Sofia: can't pay. Carmen pays for both. Needs "parent is paying" state.
- Ray: won't type card into unknown site. Zelle from a text message is his path.

Persona recommendation: Collect via Venmo/Zelle text (A-style), show payment status only to organizer (not public).

## Final Synthesis

**Scenario B with private tracking and Stripe Payment Link.**

Jordan buys block on Fandango (up to 20 seats per transaction). Site collects via Stripe Payment Link (hosted on stripe.com, adjustable quantity) with Zelle fallback. Payment status visible only in organizer view. Ticket icon on crew list for everyone regardless of payment.

Two changes close every gap:
1. Adjustable quantity on Stripe Payment Link (Carmen pays for 2)
2. "Prefer Zelle? Text Jordan" fallback (Ray's path)

Trust solved by: showing real Fandango price + link to verify + "so the crew sits in the same row" explanation.

## Research Findings

- Tickets already on sale on Fandango (Thursday June 11 preview + Friday June 12)
- Fandango allows up to 20 seats per transaction
- Regal Secaucus ShowPlace 14: reserved recliner seating, no IMAX
- Group Sales not needed for groups under 20
- Regal Group Sales email: gsales@regmovies.com (phone unreachable)
- Stripe is live (not test mode). PlanMovies account active.
