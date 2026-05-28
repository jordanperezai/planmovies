# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-28 (Session 12)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 12 complete. Two-tab layout merged into single-scroll three-act page. Codex adversarial review ran. All 11 issues fixed. Deployed as `3e1e9af`.

**Current state of index.html (4697 lines, commit `3e1e9af`):**
- Single-scroll three-act page (no Movie tab). The Crew → movie world → reality break → evidence → rabbit hole.
- Timeline with 35+ curated nodes, 6 category toggle, 17 headlines, declassified files carousel (3 videos).
- Playable trailer hero (crew hero has play button → official trailer inline).
- Landing page: carousel dots replaced by crew avatars with Director badge.
- Desktop responsive: full-bleed hero, 720/800px content max-width.
- Design scores: heuristics 26/40, AI slop 3.5/10.
- Codex-hardened: XSS fixed, delegated event handlers, keyboard a11y.

## Immediate Next Actions

1. **TMDB API key** — Jordan: register at themoviedb.org → paste into `TMDB_API_KEY` constant in index.html (~line 4090). One Movie Identity search is live once this is in.
2. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone. Phone auth OTP still not configured.
3. **Send to family** — 15 days until June 12. Everything else is secondary.

## Key Decisions (Session 12)

- **Merged page shipped.** The Movie tab is gone. One scroll, three acts. Timeline + category toggle handles all 40+ quotes.
- **Carousel dots → crew avatars on landing.** The social proof is now the first thing you see after the poster. Director badge on Jordan.
- **Activity feed language.** "Joined the crew" not "RSVPed." Jordan gets "created the crew."
- **post-RSVP simplified.** Phone/status/photo behind "Set up your profile" button. Confirmation = just the celebration + share.
- **Desktop responsive.** Page now works at any viewport. Hero is full-bleed. Content is max-width 720/800px.
- **Codex adversarial review standard.** Ran it this session. Found 11 issues. All fixed. XSS, keyboard a11y, delegated handlers. Run it every session from now on.

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero, breathing room)
- ✅ DESIGN.md and .impeccable.md updated
- ✅ Merged page built (session 12)
- ✅ Full impeccable pipeline (critique, typeset, colorize, audit, adapt, polish)
- ✅ Codex adversarial review
- ✅ Desktop responsive
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ Send to family — **15 days**

**After family send:**
- Anticipation phase: content unlock calendar, milestone markers
- Organizer payment tracker + nudge generator
- Post-event: photo album, crew rating, morning-after recap
- Named Crew page + Founding Crew badge
- Platform: Stripe Connect Express, multi-organizer

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
12. Don't push the RSVP form below screen 3. Crew avatars + pitch before form. Never a press kit before the form.
13. Don't re-open the tabs vs. single-scroll debate. Three-act merge is validated, shipped, and Codex-hardened.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Page DNA, spacing, typography rules, anti-patterns. Read before ANY UI work. |
| `.impeccable.md` | Design context + validated decisions. |
| `scripts/` | Node scripts used for batch HTML/CSS restructuring. Reference before running similar changes. |
| `research/2026-05-27-05-product-feature-map.md` | 79-feature product map |
| `rangers/product/sessions/product-08-complete-product-vision.md` | Full ranger vision |
