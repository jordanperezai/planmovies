# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-28 (Session 11)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 11 complete. Massive design quality pass + architecture exploration.

**Current state of index.html (4300 lines, commit `7eb82d5`):**
- Crew page: poster hero, 24px breathing room, name-only RSVP form (no phone gate), "Got questions?" collapsible primer
- Typography: sentence case everywhere except brand/eyebrows. 252 tokenized font-size declarations.
- A11y: all form labels linked, aria-labels on inputs, `<main>` landmark, 14 lazy-loaded images
- One Movie Identity: profile tab built, TMDB search ready (needs API key)
- RSVP auth: phone is optional post-RSVP, not a gate
- planmovies-api Worker: `/api/og` live with real RSVP count

**Mockup (mockup-merged.html, untracked) — v4 hybrid:**
Three-act merged page. Approved direction, not yet built into index.html.
- Act 1: trailer hero → crew → countdown → one-line pitch → RSVP form
- Reality Break: "The movie is based on real events. These events are happening now."
- Act 2: Movie world (poster card, cast chips, filmmaker quotes, 2 trailers)
- Act 3: Evidence (timeline 1947→2026 + category toggle)
- Down the Rabbit Hole content library

## Immediate Next Actions

1. **Build the merged page** — implement mockup v4 into index.html. Kill The Movie tab. One scroll, three acts, timeline + category toggle.
2. **TMDB API key** — Jordan: register at themoviedb.org → paste into `TMDB_API_KEY` constant in index.html. One Movie Identity search becomes live.
3. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone. Phone auth OTP still blocked.
4. **Send to family** — 15 days until June 12. Everything else is secondary.

## Key Decisions (Session 11)

- **Poster hero → RSVP at screen 3.** Crew page confirmed: hero visual → crew → countdown → one-line pitch → form. Never push the form deeper.
- **RSVP = name only.** Phone is post-RSVP optional. "Get ticket updates via text." Tia Rosa shouldn't see a phone auth gate.
- **Tabs → one page.** 3/3 personas chose merge over separate tabs. "The Movie" becomes an anchor scroll link to the evidence section.
- **Three-act structure.** Movie sells. Reality Break pivots. Evidence (timeline) proves. Same content, right order.
- **Timeline + category toggle.** Chronological builds narrative weight. Category view (Presidents, Military, etc.) delivers pattern recognition. Both. Toggle between them.
- **Side panel rejected.** 3/3 personas: side panels on mobile = "I think I broke it." Scroll, not slide.
- **Page DNA codified in DESIGN.md.** Every future page follows: hero visual → social proof → primary action → context.

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero, breathing room)
- ✅ DESIGN.md and .impeccable.md updated
- ☐ Merged page built (mockup v4 ready, not implemented)
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ Send to family — **14 days**

**After family send:**
- Merged page: The Movie tab → inline timeline (mockup v4)
- Anticipation phase: content unlock calendar, milestone markers
- Organizer payment tracker + nudge generator
- Post-event: photo album, crew rating, morning-after recap (recap generator built, needs use)
- Named Crew page
- Founding Crew badge (Disclosure Day attendees)

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional.
2. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
3. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
4. Don't show payment status on family crew list. Payment tracking is organizer-only.
5. Don't hardcode content one-off. Use data arrays + render functions.
6. Don't commit .env. It is gitignored. Never force-add it.
7. Don't randomize headlines. They are ranked by impact. Order is intentional.
8. Don't build in-app chat. PlanMovies generates messages for WhatsApp/iMessage.
9. Don't add a theme/template selector. The movie poster IS the theme.
10. Don't build public discovery yet.
11. Don't apply mono font to non-data text. var(--mono) = countdown, prices, timestamps, phone/OTP, seats only.
12. Don't push the RSVP form below screen 3. Social proof (crew avatars) and pitch before form, never a full press kit before the form.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Page DNA, spacing, typography rules, anti-patterns. Read before ANY UI work. |
| `.impeccable.md` | Design context + validated decisions. |
| `mockup-merged.html` | v4 three-act hybrid mockup. The template for the merged page build. |
| `research/2026-05-27-05-product-feature-map.md` | 79-feature product map |
| `rangers/product/sessions/product-08-complete-product-vision.md` | Full ranger vision |
