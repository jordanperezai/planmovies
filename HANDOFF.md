# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-28 (Session 13)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 13 complete. Full audit pass on index.html (15.5/20 → all recommended fixes applied). Major logo exploration session: 13 HTML boards, 200+ concepts, 2 ranger sessions, no winner. Logo decision is the open thread.

**Current state of index.html (uncommitted, audit-fixed):**
- All P0/P1/P2 audit fixes applied: `--amber-dim` token, toast live region, heading semantics, nav aria-current, video keyboard access, Supabase non-blocking, scaleX progress bar, cached countdown selectors, 44px tap targets, 11px font floor, safe-area-inset nav, contrast tokens nudged.
- JS syntax verified clean (`node --check` passed).
- Everything from Session 12 still intact (3e1e9af base).

**Logo state:**
- `logos/` folder: 13 exploration boards + README with dead-ends map.
- Dead ends: literal cinema objects, type-led tropes, cold diagrams.
- Latest open board: `logos/logo-board-2.html` (12 fresh concepts).
- No mark selected. Jordan is pointing at directions.

## Immediate Next Actions

1. **Logo** — pick from `logos/logo-board-2.html` or request another board. Once picked, wire into `index.html` (nav, landing, favicon).
2. **Commit audit fixes** — index.html has significant uncommitted improvements. Commit before any new work.
3. **TMDB API key** — Jordan: register at themoviedb.org → paste into `TMDB_API_KEY` constant (~line 4090).
4. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone.
5. **Send to family** — June 12, 15 days out. Everything else is secondary.

## Key Decisions (Session 13)

- **Audit applied.** All P0-P3 audit findings fixed. Score was 15.5/20. No issues were P0 except `--amber-dim` token (now fixed). 
- **Logo exploration complete for now.** 200+ concepts. Visual + Product rangers + family panel all ran. No winner. The direction: warm, cinematic, social, "we're all seeing it together." Not nostalgic, not clever-but-cold.
- **Share card is the real logo leverage.** Product rangers (Frisby + Kim) found the og:image is what recruits clicks in a group chat, not the favicon. Logo matters for brand identity, not funnel conversion.
- **Logo folder organized.** `logos/README.md` maps every exploration file with status and dead-end reasons.

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero, breathing room)
- ✅ Merged page built (session 12)
- ✅ Full impeccable pipeline
- ✅ Codex adversarial review
- ✅ Desktop responsive
- ✅ Audit pass (session 13) — fixes verified, uncommitted
- ☐ Logo picked and wired
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ Commit audit fixes
- ☐ Send to family — **15 days**

**After family send:**
- Dynamic crew-forward og:image share card (highest-leverage branding surface)
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
12. Don't push the RSVP form below screen 3. Crew avatars + pitch before form. Never a press kit before the form.
13. Don't re-open the tabs vs. single-scroll debate. Three-act merge is validated, shipped, and Codex-hardened.
14. Don't use a single-seat mark. Reads "one lonely person" — the opposite of the brand. (visual-03, product-09)
15. Don't re-explore literal cinema objects (seat, ticket, marquee, reel), type tropes (lowercase wordmark, play-in-O, three dots), or cold diagrams (filling row, brackets). All killed with evidence. See `logos/README.md`.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Page DNA, spacing, typography rules, anti-patterns. Read before ANY UI work. |
| `.impeccable.md` | Design context + validated decisions. |
| `logos/README.md` | Logo exploration map — all 13 boards, status, dead ends, constraints. |
| `rangers/visual/sessions/visual-03-logo-direction.md` | Full 5-voice visual ranger session on logo |
| `rangers/product/sessions/product-09-logo-direction-A.md` | Product rangers + family panel on Direction A |
| `scripts/` | Node scripts used for batch HTML/CSS restructuring. |
| `research/2026-05-27-05-product-feature-map.md` | 79-feature product map |
