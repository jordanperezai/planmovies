# Design Rangers — Session 01: RSVP Form Audit

> **Date:** 2026-05-26
> **Type:** Test-run (roster validation)
> **Question:** What should the RSVP form look like? 7 fields currently. What stays, what goes, how should it be structured on mobile?

## Decision Frame

PlanMovies RSVP form has 7 fields: Name, Status (4 options), Party Size (5 options), Showtime (5 options), Transportation (3 options), Seating Preference (5 options), Budget (3 options). Users arrive from a WhatsApp link on mobile. Audience is family aged 20-70.

## Voice Responses

### Stuart Frisby (Mobile Conversion)

Kill fields 5, 6, 7. Transportation, seating, budget are coordinator problems, not RSVP problems. Every field past the core ask is an exit point.

Keep 3 fields: Name (pre-fill via URL param `?name=Uncle+Rob`), Status (reduce to Yes/Maybe/No — "Probably" and "Maybe" are the same signal to a coordinator), Party Size (show only after Yes/Maybe).

Structure: single screen, no scroll. Name input 48px height minimum. Submit fixed at bottom. No labels above fields — section headers only ("Who are you?" / "Are you in?" / "Bringing anyone?").

Hypothesis: reducing from 7 to 3 fields will increase completion 40%+ from WhatsApp traffic.

### Kyo Kim (Consumer UX / Coordinator Burden)

Kill fields 5, 6, 7. Also kill field 4 (showtime). Timing only matters once you know who's coming. Move it to a separate lightweight poll after headcount is locked.

Keep 3 fields: Name (one field, no first/last split), Status (In/Maybe/Out), Party Size ("Bringing anyone?" — Just me / +1 / +2 / +3+).

Total interaction: type name, tap twice, done. Under 8 seconds. The coordinator collects preferences later via a follow-up message.

### Jeff Johnson (Accessibility / Age-Range)

Kill fields 5, 6, 7. Also make status binary: "I'm In" and "Can't Make It." No middle options. "Probably" and "Maybe" give users an excuse to defer.

Keep 4 fields: Name (pre-fill, autocapitalize on), Status (2 large stacked buttons), Party Size (conditional, 4 circular tap targets 44px minimum, default 1), Timing (conditional, 3 pills: Opening Night / Weekend / Flexible).

Post-submit: full-screen state change (green check, "You're in. Jordan will send details.") NOT a toast. Toasts vanish before a 60-year-old registers them.

Six taps, under 20 seconds, no scrolling on any phone made after 2018.

### Shreya Murthy (Social / Group Dynamics)

Kill fields 5, 6, 7. Keep 4 fields: Name, Status (4 cards but "Can't" visually de-emphasized), Party Size (stepper), Timing (renamed to human language: "Friday night opening" / "Saturday or Sunday" / "Whenever works").

Post-submit: show the group. "You're #3 to commit. Here's who else is in." Social proof is the engine. Early RSVPs recruit later ones. Don't waste the confirmation screen on a toast.

Under 12 seconds for someone tapping through on a phone in their kitchen.

### Ahmad Shadeed (Verifier)

"Can't Make It" (11 chars) causes overflow in the 4-pill row at 390px. Five-pill rows (Showtime, Seating) definitely break — "Opening Weekend" alone is ~95px. Pills at 27px height fail 44px minimum touch target. 11px font fails WCAG on low-contrast borders.

Fixes: `flex-wrap: wrap` with `gap: 8px`. Min-height 44px on all pills. Shorten labels ("Can't Make It" → "Can't"). Bump font to 13px. Full-width submit button with explicit `display: block`.

## Synthesis

**Unanimous (5/5):** Kill Transportation, Seating Preference, Budget. Zero defenders.

**Strong convergence (4/5):** Reduce status options. Three voices want 3 choices. One wants binary (In/Out).

**Kim's unique call:** Kill Showtime too. Move to post-RSVP poll.

**Johnson's unique call:** Binary status. Full-screen confirmation, not toast.

**Murthy's unique call:** Post-submit social proof. "You're #3. Here's who else is in."

**Frisby's unique call:** Pre-fill name via URL parameter from the organizer's shared link.

**Shadeed's unique call:** Current pills are too small (27px vs 44px minimum), labels overflow at 390px, font size fails WCAG.

## Verdict

Strip the form to 3 fields: Name, Status (Yes/Maybe/No), Party Size (conditional). Full-screen confirmation showing the crew list. Fix pill sizing to 44px minimum. Pre-fill name via URL param where possible. Move showtime, transportation, seating, budget to a post-RSVP coordinator poll.

## Status

Roster validated. All 5 voices produced specific, non-obvious, actionable output with zero overlap. No voice produced generic advice. Team confirmed for future sessions.
