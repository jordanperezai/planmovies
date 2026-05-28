# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 9)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 9 complete. Full product vision session. No code changes. Research, brainstorming, and product design only. planmovies.com unchanged (commit 3b47371).

**What was produced (session 9):**
- Partiful audit: 22 screenshots + web app, 12 feature categories mapped (`research/2026-05-27-02-partiful-audit.md`)
- Atom Tickets audit: $178M raised, acquired by Fever, social features stripped (`research/2026-05-27-04-atom-tickets-audit.md`)
- Reddit demand research: market validated, 8-25 person group underserved (`research/2026-05-27-03-reddit-demand.md`)
- Complete product feature map: 79 features, 12 categories (`research/2026-05-27-05-product-feature-map.md`)
- Full ranger vision session: 93 new features proposed, 15 "magic" features (`rangers/product/sessions/product-08-complete-product-vision.md`)
- Auth + profile system designed by rangers (phone auth before RSVP, Supabase Auth + Twilio Verify, no A2P needed)
- Core product concepts: Named Crew, One Movie Identity, Three-Beat Cadence Engine, Auto-Theme from Poster

**Current live state:**
- planmovies.com fully live, last commit 3b47371
- 2 people RSVPed: Jordan, Sarai Perez
- Stripe Payment Link active: `https://buy.stripe.com/bJe00jdykaNS4Tj8D23F600`
- Payment section hidden until RSVP (shows after "I'm Going" submission)
- Organizer view: planmovies.com?org=1 (no auth, obscurity only)

## Immediate Next Actions

**Build (no blockers, start immediately):**
1. **Phone auth RSVP flow** — Supabase Auth + Twilio Verify. Phone + Name → SMS code → RSVP. No A2P registration needed.
2. **Custom OG image** — 1200x630 landscape. Current portrait poster is center-cropped in iMessage/WhatsApp. Broken.
3. **Profile photos** — Upload after RSVP confirmation. Photos sort first in avatar row. Jordan's photo goes up first.
4. **Activity feed** — Automated events ("Sarai RSVPed!") + organizer manual posts. Crew page, chronological.
5. **Share prompt** — Post-RSVP: "Bring someone else?" with WhatsApp/iMessage buttons.
6. **Film-frame countdown** — Always visible on landing + crew page. Cinematic style.
7. **Crew one-line status** — Each crew member sets a one-liner ("Can't wait", "Bringing snacks").
8. **"What to Know" primer** — Short section for skeptics (Lisa, Carmen). Surface best Movie tab content.
9. **Organizer manual-add** — Add Carmen/Ray from dashboard. Claim flow for later verification.
10. **Send planmovies.com to family** — 16 days until June 12.

## Key Decisions (Session 9)

- **Auth model:** Phone auth before RSVP. Supabase Auth + Twilio Verify. No A2P 10DLC needed.
- **Named Crew:** Persistent social object across events. "The Perez Family Movie Club." Core product concept.
- **One Movie Identity:** Profile feature where user picks one movie to represent them. Poster = identity.
- **No public discovery:** Features 9.1-9.6 dropped for now. Security complexity with strangers deferred.
- **No in-app chat:** WhatsApp owns real-time. PlanMovies generates messages, organizer sends them.
- **No A2P needed:** Twilio Verify handles OTP on pre-registered channels. All crew communication goes through organizer's WhatsApp/iMessage.
- **Movie is the theme:** No template selector. Auto-Theme from Poster extracts palette from TMDB poster art.

## Goals

**Now (before sending to family):**
- Phone auth + profiles (photos in avatar row)
- Fix OG image (landscape 1200x630)
- Activity feed + share prompt
- Film-frame countdown
- "What to Know" primer for skeptics

**After family send:**
- Anticipation phase (content unlock calendar, milestone markers)
- Organizer payment tracker + nudge generator
- Post-event: photo album, crew rating, morning-after recap
- Named Crew page (persistent across events)
- Crew Picks voting + clone event
- Ticket delivery as designed artifact
- Movie Night Kit timeline
- Event creation wizard (TMDB search → date → theater → price → share)
- Founding Crew badge for Disclosure Day attendees

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional.
2. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
3. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
4. Don't show payment status on family crew list. Payment tracking is organizer-only. Ticket icon for everyone.
5. Don't hardcode content one-off. Use data arrays + render functions.
6. Don't commit .env. It is gitignored. Never force-add it.
7. Don't randomize headlines. They are ranked by impact. Order is intentional.
8. Don't build in-app chat. PlanMovies generates messages for WhatsApp/iMessage. Don't compete with messaging apps.
9. Don't add a theme/template selector for events. The movie poster IS the theme. Auto-extract, don't ask.
10. Don't build public discovery yet. Security complexity with strangers joining crews is unresolved.

## Reference Docs (Session 9)

| Doc | What |
|---|---|
| `research/2026-05-27-02-partiful-audit.md` | Full Partiful feature audit |
| `research/2026-05-27-03-reddit-demand.md` | Reddit demand signals + market validation |
| `research/2026-05-27-04-atom-tickets-audit.md` | Atom Tickets competitive audit |
| `research/2026-05-27-05-product-feature-map.md` | Complete 79-feature product map |
| `rangers/product/sessions/product-08-complete-product-vision.md` | Full ranger vision session (487 lines) |
