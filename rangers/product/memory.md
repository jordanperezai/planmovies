# Design Rangers Memory

> **Cap:** 20 active entries. Oldest `last-confirmed` evicted at #21.
> **Cadence tags:** hot (7d review) | tactical (30d) | stable (60d) | frozen (never, historical fact)

## Validated Principles

- **Every field/element either serves the immediate conversion or it's in the way.** Context: 5/5 voices killed transportation, seating, budget fields in session 01. 4/5 flagged excessive above-CTA elements in session 02. cadence: stable. last-confirmed: 2026-05-26
- **11px minimum font size on mobile. No exceptions.** Context: Johnson identified presbyopia as near-universal by age 45. 9px and 10px text is invisible to half the audience. Shadeed confirmed contrast failures on sub-11px text. cadence: stable. last-confirmed: 2026-05-26
- **Show people, not abstractions.** Context: Murthy and Kim independently said "Jordan is going. Join them." beats a hidden headcount or generic "Join the crew." Family RSVPs to a person, not a page. cadence: stable. last-confirmed: 2026-05-26
- **One animation earns focus. Multiple animations split it.** Context: Frisby flagged 4 competing animation layers (shimmer, glow, starfield, breathing) as attention-splitting and performance-degrading on older phones. cadence: tactical. last-confirmed: 2026-05-26
- **Post-submit is a recruiting tool, not a dead end.** Context: Murthy's core insight: "You're #3. Here's who else is in." The confirmation screen should show the growing crew because that's what converts the next person. cadence: stable. last-confirmed: 2026-05-26

## Dead Directions

- **Reassurance line ("No payment. No account.") on family-shared pages.** Why: Frisby said keep, Murthy said kill. Jordan sided with Murthy: in a family group chat context, trust is pre-established. The line signals "this might be sketchy" to people who weren't thinking that. last-confirmed: 2026-05-26
- **Scrolling news ticker as top-of-page element.** Why: 3/5 voices flagged it as confusing (looks like a news site, not an event page). The Aunt persona in the ad-hoc session almost swiped back. Replaced with post-RSVP "THIS IS REAL" headline cards. last-confirmed: 2026-05-26
- **Chunky 4-box countdown on landing.** Why: Kim said it's coordinator enthusiasm, not participant motivation. Replaced with inline "17d 10h until opening night" text. last-confirmed: 2026-05-26

## Voice Calibration

Jordan gravitates toward Murthy's social dynamics lens and Kim's coordinator-burden lens. Frisby's conversion instincts are strong but need override on small-n decisions (can't A/B test with 25 users). Johnson's accessibility catches are consistently actionable. Shadeed's CSS findings are always correct but sometimes over-detailed for the pace Jordan works at.

- **Coordinator dashboard metrics (payment %, readiness ring) are organizer anxiety, not participant motivation.** Context: 5/5 voices session 03. Family members who just RSVPed see "0% payment" and feel confusion, not momentum. Hide from family view entirely. cadence: stable. last-confirmed: 2026-05-26
- **The crew list IS the home page for participants.** Context: 5/5 voices session 03. "Aunt Lisa, Marco, your mom" is motivating. A percentage ring is not. Names beat metrics every time for small-n social events. cadence: stable. last-confirmed: 2026-05-26
- **The nudge loop belongs in-product, not in WhatsApp.** Context: Kim session 03. Jordan is manually checking who paid and nudging in group chat. The product should draft the WhatsApp message, Jordan sends it. Absorb the coordination labor. cadence: tactical. last-confirmed: 2026-05-26
- **Three beats over 17 days: list growing → seats/payment → anticipation.** Context: Murthy session 03. Days 1-5: social proof compounds as list grows. Days 6-12: logistics earn their place, framed as social (sit next to whoever). Days 13-17: countdown and lightweight prompts. A static page earns no re-opens. cadence: tactical. last-confirmed: 2026-05-26

## Dead Directions

- **Showing organizer tools (stats, seat map, payment tracker) to all family members.** Why: 5/5 voices session 03. Creates anxiety (0% payment) without giving participants anything actionable. Gate behind org param or role. last-confirmed: 2026-05-26

- **One long page beats split when the tonal shift IS the experience.** Context: Session 04, 3-2 vote. Frisby/Kim/Shadeed: the transition from "movie info" to "this is real" is the page's argument. Splitting it breaks the argument at its strongest joint. Every extra tap costs 40-60% dropoff for a family WhatsApp audience. cadence: stable. last-confirmed: 2026-05-27
- **Immersive content on the RSVP page is Jordan's call.** Context: Session 04. Lisa/Sofia/Marco flagged UAP headlines as conspiracy-adjacent. Jordan overruled: immersion converts. Do not re-suggest removing. cadence: frozen. last-confirmed: 2026-05-27

## Dead Directions

- **Splitting a page when the tonal transition is the rhetorical point.** Why: 3-2 ranger vote session 04. The transition from entertainment to evidence on The Movie page is intentional. Splitting would break the "this movie is based on real events" argument mid-scroll. last-confirmed: 2026-05-27
- **Hiding the nav during the RSVP form.** Why: Jordan's explicit call. The nav stays visible. last-confirmed: 2026-05-27

## Distillation Log

| Date | Entries reviewed | Promoted | Archived |
|---|---|---|---|
| 2026-05-26 | Initial creation from sessions 01 + 02 | 0 | 0 |
| 2026-05-26 | Session 03 additions | 4 new principles, 1 dead direction | 0 |
| 2026-05-27 | Session 04 additions | 2 new principles, 2 new dead directions | 0 |
