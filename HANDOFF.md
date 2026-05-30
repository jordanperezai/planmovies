# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-30 (Session 18)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 18 complete. Four commits pushed and live on planmovies.com. Brand is correct and the landing is redesigned end-to-end.

**Current state (all live):**
- **Color:** Ember `#e53908` (corrected this session — the Session-16/17 `#d9480f` came from the sheet's text label, not its pixels).
- **Mark:** 5 chunky rounded-top tabs (viewBox 216×36, W=40/gap=4/r=12). `<symbol id="seatRow">` in index.html.
- **Nav:** **Wordmark only** — `planmovies` (no mark in nav). Jordan's call; cleaner.
- **Landing:** Left-aligned spine; slogan "Get the row together."; cream title; ember reserved for mark + "movies" + CTA only; venue line (Regal Secaucus · Secaucus, NJ).
- **Fill system:** Open seats = ember **OUTLINE** (not dim fill — dim fill failed contrast at 2.19:1); filled = solid ember. `renderHeroRow()` hooked to `updateLandingHeadcount`. Honest at all edges: 0 = all-outline + "Be the first to save a seat"; >5 = "The row is set · N going."
- **Seat-fill takeover (NEW `a0534d6`):** After RSVP, full-screen overlay — row fills to live count, your seat pulses brighter, "You're in, / [Name]" lands in ember, then hands off to inline confirmation. ~1.5s, tap-to-skip, reduced-motion safe.
- **Critique baseline:** 30/40. Snapshot at `.impeccable/critique/`. Open issues: "DIRECTOR" → "HOST", pre-hydration fallback, desktop balance, world+sheet direction.
- **Idea 2 mockup:** `logos/_review/world-sheet-mock.html` — world of Disclosure Day full-screen + peeking bottom sheet. Not shipped. Worth building on crew page first.

## Immediate Next Actions

1. **World+sheet — build real draggable version** on the crew/dashboard page (post-RSVP "fall into the world" surface). The landing-invite version is secondary; start with the crew page.
2. **Final lit logo art (raster)** — Imagen Round 5 prompts (`image-prompts.md`) → `scripts/cutout.py` (needs `pip install "rembg[cli]" onnxruntime pillow`) → app-icon / og:image → og:image share card.
3. **"DIRECTOR" → "HOST"** badge rename (critique P2; one line in `renderLandingCrewDots` + `renderFamilyCrew`).
4. **TMDB API key** — Jordan: themoviedb.org → `TMDB_API_KEY` (~line 4090).
5. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone.
6. **Send to family — 13 days out (Jun 12).**

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero)
- ✅ Merged page built (session 12)
- ✅ Full impeccable pipeline
- ✅ Codex adversarial review
- ✅ Desktop responsive
- ✅ Audit pass (session 13)
- ✅ Logo locked + wired (ember #e53908, 5-arch row, chunky tabs, outlined open seats)
- ✅ Landing redesigned: left spine, fill system, slogan, date+venue, ember reserved
- ✅ Seat-fill takeover on RSVP (the peak-end moment)
- ✅ /critique run: 30/40 baseline saved
- ☐ World+sheet concept (mockup done; real build pending)
- ☐ Final lit raster logo art (og:image / app-icon)
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ **Send to family — 13 days**

**After family send:**
- Named Crew page + Founding Crew badge
- Dynamic crew-forward og:image share card (needs raster logo)
- World+sheet built for crew page (if session 18 mock proves the concept)
- Platform: Stripe Connect Express, multi-organizer
- Human brand designer for polished deliverable

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional.
2. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
3. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
4. Don't show payment status on family crew list. Payment tracking is organizer-only.
5. Don't hardcode content one-off. Use data arrays + render functions.
6. Don't commit .env. It is gitignored. Never force-add it.
7. Don't randomize headlines. They are ranked by impact. Order is intentional.
8. Don't build in-app chat. PlanMovies generates messages for WhatsApp/iMessage.
9. Don't apply mono font to non-data text. var(--mono) = countdown, prices, timestamps, phone/OTP, seats only.
10. Don't push the RSVP form below screen 3.
11. Don't re-open the tabs vs. single-scroll debate. Three-act merge is validated and shipped.
12. Don't re-open the logo debate. 5-arch row + ember orange, locked.
13. Don't make the center arch taller than the side arches. Looks like a middle finger.
14. Don't use uppercase "PLANMOVIES" anywhere. Lowercase `planmovies`, Poppins 800.
15. Don't use Clash Display. Removed; 0 uses.
16. Don't put open seats as a dim ember FILL. It fails contrast (2.19:1 vs bg, 2.14:1 vs filled). Open seats are OUTLINES. This was the Logo Rangers' call all along.
17. Don't put `flex:1` children (like the crew-avatar row) inside the poster carousel — they overflow at tall viewports and collide with elements below. Keep crew-dots in normal flow outside the carousel.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Read before ANY UI work. |
| `.impeccable.md` | Design context. NOTE: still says #d9480f and "centered" — the live state is #e53908 + left-aligned. Update if running /impeccable init. |
| `.impeccable/critique/` | /critique snapshot: 30/40 baseline from Session 18. |
| `.claude/skills/logo-maker/memory.md` | Full logo hunt: concept + color + fill system + all dead directions. |
| `.claude/skills/logo-maker/references/image-prompts.md` | Round 5 prompts for final logo art (Imagen). |
| `scripts/cutout.py` | rembg background removal. Needs `pip install "rembg[cli]"`. |
| `logos/_review/world-sheet-mock.html` | Idea 2 concept: world-first + draggable bottom sheet. Not shipped. |
| `rangers/logo/sessions/logo-04-alignment-and-fill.md` | Logo+Family panel: left vs centered, fill system. The critique vindicated this panel's outline recommendation. |
