# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-28 (Session 15)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 15 complete. The entire session was a logo hunt. The screen-O wordmark (PLANM[screen-O]VIES, Clash Display, cream+gold) shipped live to planmovies.com as commit `a7f2d94` and is the current logo. Jordan rejected it on feeling but said "keep it for now." ~20 total directions tried across all sessions; the meta-conclusion is parked: no static SVG mark delivers the emotional hit; the feeling lives in the brand world.

**Current state of planmovies.com (live, `a7f2d94`):**
- Screen-O wordmark in nav + landing. Clash Display. Favicon updated.
- Mobile horizontal-scroll fixed (`overflow-x:hidden` on `html`).
- All Session 13 audit fixes included.

**Logo state:**
- Screen-O is a PLACEHOLDER. Intentionally parked. Do NOT spend more sessions on this until after June 12.
- Logo Rangers team at `rangers/logo/`, 2 sessions logged.
- logo-maker skill at `.claude/skills/logo-maker/` with full memory + references.
- Full dead-ends map: `logos/README.md`, ranger sessions, skill memory.

## Immediate Next Actions

1. **TMDB API key** — Jordan: register at themoviedb.org → paste into `TMDB_API_KEY` constant (~line 4090). Unblocks One Movie / poster search.
2. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone. Unblocks phone OTP before RSVP.
3. **Send to family** — June 12 is 14 days out. Everything else is secondary.
4. **Commit wrap-up artifacts** — session log, updated HANDOFF, journal entry, memory updates.

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero, breathing room)
- ✅ Merged page built (session 12)
- ✅ Full impeccable pipeline
- ✅ Codex adversarial review
- ✅ Desktop responsive
- ✅ Audit pass (session 13) — fixes committed
- ✅ Logo placeholder live (screen-O, Clash Display)
- ✅ Mobile horizontal scroll fixed
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ Send to family — **14 days**

**After family send:**
- Logo: human brand designer, with the documented brief
- Dynamic crew-forward og:image share card
- Anticipation phase: content unlock calendar, milestone markers
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
12. Don't push the RSVP form below screen 3. Crew avatars + pitch before form.
13. Don't re-open the tabs vs. single-scroll debate. Three-act merge is validated and shipped.
14. Don't re-open the logo debate before June 12. Screen-O is the placeholder; it ships. Post-launch: human designer.
15. Don't keep generating logo boards past 3 misses. ~20 tried; the next board won't fix it.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Page DNA, spacing, typography rules, anti-patterns. Read before ANY UI work. |
| `.impeccable.md` | Design context + validated decisions. |
| `logos/README.md` | Logo exploration map — all boards, status, dead ends. |
| `rangers/logo/sessions/logo-01-wordmark-vs-symbol-and-the-O.md` | Session 01: screen-O decision |
| `rangers/logo/sessions/logo-02-fresh-concepts.md` | Session 02: 12 fresh concepts, all rejected |
| `.claude/skills/logo-maker/memory.md` | Full logo hunt memory: ~20 dead directions, meta-conclusion |
| `scripts/` | Node scripts for batch HTML/CSS restructuring. |
| `research/2026-05-27-05-product-feature-map.md` | 79-feature product map |
