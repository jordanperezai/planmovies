# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-29 (Session 17)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 17 complete. **The brand is real, redesigned, and committed.** Caught that the Session-16 commit (d2c0e51) was mislabeled — its `index.html` still had old gold `#c9a84c`. This session actually delivered the brand AND rebuilt the landing around it.

**Current brand (committed this session, NOT pushed):**
- **Mark:** Five chunky rounded-top TABS in a wide low band (`<symbol id="seatRow">`, viewBox `0 0 216 36`, W=40/gap=4/r=12). Cinema seats + people from behind. Re-traced from the brand-sheet pixels — the Session-16 `154×88` skinny-finger version was wrong ("does not look like it should").
- **Color:** Ember **`#E53908`** (corrected from #d9480f — the sheet's printed label ≠ its actual pixels; Jordan's eye caught it). Ramp re-derived; stored under `--gold*` names.
- **Wordmark:** lowercase `planmovies`, Poppins 800, plan=cream + movies=ember. Slogan **"Get the row together."** under it. NEVER uppercase.
- **Landing:** LEFT-aligned hero on one spine (lockup, poster, crew avatars, title, date, countdown, CTA). Date prominent in cream + venue line (Regal Secaucus · Secaucus, NJ). 100dvh-safe via `.landing-inner{flex:1;min-height:0}` + `justify-content:safe center` (lockup never clips).
- **THE FILL SYSTEM:** the hero mark's 5 seats fill ember with live RSVPs (`renderHeroRow()` hooked to `updateLandingHeadcount`). Open seats = `--seat-open #6e3a26` dim-ember (reads "waiting", not broken-gray), starts at seat 1 (never all-dead), capped at 5 as a milestone, true count stays in the text. Logo stays SOLID 5 ember everywhere it's identity — favicon + nav unified to the 5-tab mark; `seatRow3` removed.
- **Validated by the Logo+Family panel** (`rangers/logo/sessions/logo-04`): left 9/11, "fill = meter not logo" unanimous among designers, family 5/5 understood the fill and felt the join-FOMO.

## Immediate Next Actions

1. **Push** — brand + redesign are committed to `main` (local only). Push deploys to planmovies.com (Cloudflare Pages auto-deploys on push). Jordan's call — verify the live site after.
2. **Family-flagged polish** (from panel logo-04, before family send): louder post-RSVP "you're in, <name>" confirmation (Carmen/Ray); decide on crew faces in the seats (Sofia) — note it conflicts with the fill mark.
3. **Final lit logo art (raster)** — Imagen Round 5 prompts (`image-prompts.md`) → `scripts/cutout.py` (needs `pip install "rembg[cli]" onnxruntime pillow`) → app-icon / og:image.
4. **TMDB API key** — Jordan: themoviedb.org → `TMDB_API_KEY` (~line 4090).
5. **Twilio Verify** — Jordan: Supabase → Auth → Providers → Phone.
6. **Send to family** — June 12 is **14 days out**.

## Goals

**Now (send to family):**
- ✅ All features built (auth, photos, feed, primer, countdown, profile, One Movie)
- ✅ Design quality pass (typography, a11y, contrast, type scale)
- ✅ Crew page redesign (poster hero)
- ✅ Merged page built (session 12)
- ✅ Full impeccable pipeline (updated to v3.5.0 session 16)
- ✅ Codex adversarial review
- ✅ Desktop responsive
- ✅ Audit pass (session 13)
- ✅ Logo: 5-arch row mark + Ember Orange — locked, wired (local)
- ✅ .impeccable.md refreshed (ember brand, 5-arch mark, Poppins lowercase)
- ☐ Commit + push the ember brand pivot
- ☐ Install rembg + generate final logo art
- ☐ TMDB API key (Jordan)
- ☐ Twilio Verify (Jordan)
- ☐ **Send to family — 14 days**

**After family send:**
- Named Crew page + Founding Crew badge
- Dynamic crew-forward og:image share card (once final raster logo art is cut)
- Platform: Stripe Connect Express, multi-organizer
- Human brand designer for polished deliverable (brief documented in logo-maker skill + rangers)

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
13. Don't make the center arch taller than the side arches. It looks like a middle finger. Color-only "you" distinction.
14. Don't use uppercase "PLANMOVIES" anywhere. The wordmark is lowercase `planmovies`, Poppins 800.
15. Don't use Clash Display. Removed — 0 remaining uses after session 16.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Read before ANY UI work. |
| `.impeccable.md` | Design context — ember brand, 5-arch mark, Poppins lowercase. CURRENT as of session 16. |
| `.claude/skills/logo-maker/memory.md` | Full logo hunt memory: concept + color locked, all dead directions. |
| `.claude/skills/logo-maker/references/image-prompts.md` | Round 5 prompts for final logo art generation. |
| `.claude/skills/logo-maker/references/competitor-colors.md` | Color landscape: who owns what, the ember differentiation case. |
| `scripts/cutout.py` | rembg batch background removal. Run after `pip install "rembg[cli]"`. |
| `rangers/logo/sessions/logo-03-the-one-color.md` | Logo Rangers color decision: gold vs red, full 6-voice deliberation. |
