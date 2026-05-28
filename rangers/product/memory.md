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

- **Scroll to crew avatars before the form, not to the form itself.** Context: Shadeed verified 5/5 session 09: crew was 400px above the viewport after auto-scroll. User sees a phone input before seeing who's going. Fix: scroll to `crew-list-family`, block:start. cadence: stable. last-confirmed: 2026-05-28
- **Side panels on mobile = perceived navigation break.** Context: 3/3 family personas rejected the side-panel idea. Tia Rosa: "I'd press home button." Marco: "Side panels on mobile are annoying." Sofia: "Don't hide the reason behind the ask." Scroll is the only safe navigation on mobile for this audience. cadence: stable. last-confirmed: 2026-05-28
- **Separate tabs break the rhetorical argument.** Context: 3/3 personas preferred merge over tabs. The Movie tab separates "sell me" from "ask me." The three-act structure (movie → reality break → evidence) only works on one scroll. cadence: stable. last-confirmed: 2026-05-28
- **Sofia's rule: sell me, then ask me.** Context: session 11 personas. Sofia won't fill out a form until she knows why she should care. One-line movie pitch between countdown and form. Never the full press kit before the form — that pushed the form to screen 6. cadence: stable. last-confirmed: 2026-05-28

## Dead Directions

- **Phone auth as the default RSVP gate.** Why: 3/3 personas — Tia Rosa can't complete OTP, Marco is annoyed, Sofia doesn't trust it. RSVP = name only. Phone is post-RSVP optional. Do not re-gate. last-confirmed: 2026-05-28
- **Full movie press kit (poster + cast + filmmaker quotes + trailers) before the RSVP form.** Why: Pushes the form to screen 6. Tia Rosa never reaches it. Sofia needs a one-line pitch, not a press kit. Keep movie details below the form. last-confirmed: 2026-05-28
- **Post-RSVP screen showing phone + status + photo + crew list all at once.** Why: Overloads a celebration moment with 7 action areas. Confirmed by Codex review as P1 UX issue. Collapsed behind "Set up your profile" button. last-confirmed: 2026-05-28

## Validated Principles (session 12 additions)

- **Carousel dots as social proof beats carousel dots as indicators.** Context: When people are going, replacing abstract dots with their faces on the landing page is more emotionally compelling and tells you WHO is going before you even tap in. Crew avatars on landing with Director badge. cadence: stable. last-confirmed: 2026-05-28
- **Run Codex adversarial review before every deploy.** Context: Session 12 found 2 XSS P0s + 9 other issues. A 10-minute adversarial pass prevents production security issues. The ROI is asymmetric. cadence: stable. last-confirmed: 2026-05-28

## Validated Principles (session 09 / logo additions)

- **The group-chat share card (og:image + title), not the favicon, does the trust and recruiting work at the paste moment.** Context: Frisby + Kim independently, session 09. The favicon is a ~16px corner element apps may not render; family taps because of the sender + the preview content, not the logo (confirmed by Tía Rosa, Marco, Ray: "the logo makes zero difference"). Highest-leverage branding work is a dynamic, crew-forward og:image that updates per event ("Jordan set this up · 4 going"). cadence: stable. last-confirmed: 2026-05-28

## Dead Directions (session 09 / logo)

- **Single-seat logo (Direction A: one cinema seat with a play cut).** Why: reads as "one person / solo / lonely," the opposite of the "your people / together" pitch (Murthy + Marco + Sofia + Ray, + Fernando in visual-03). The negative-space play cut reads as a notch/glitch/defect/chess-rook at 16-20px and for aging eyes (Johnson, Shadeed). The convergent fix is "the row": 2-3 bold seats as one filled silhouette, no cutout. last-confirmed: 2026-05-28

## Distillation Log

| Date | Entries reviewed | Promoted | Archived |
|---|---|---|---|
| 2026-05-26 | Initial creation from sessions 01 + 02 | 0 | 0 |
| 2026-05-26 | Session 03 additions | 4 new principles, 1 dead direction | 0 |
| 2026-05-27 | Session 04 additions | 2 new principles, 2 new dead directions | 0 |
| 2026-05-28 | Session 09+11 additions | 4 new principles, 2 new dead directions | 0 |
| 2026-05-28 | Session 09 logo + family panel | 1 new principle, 1 dead direction | 0 |
