# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-30 (Session 19)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 19 complete. Two things are local and waiting to ship: the rebuilt landing (poster as full-bleed backdrop, lit-deep gradient, lower-third content) and six XSS fixes. Both sit in index.html, uncommitted. The DB lockdown Phase 1 is already live in Supabase (payments/organizers/events locked). The landing redesign was verified at 390/430/1280px.

**Jordan is in the middle of Twilio setup:** Verify service created, Fraud Guard on, Geo permissions (US + Canada SMS) saved. Blocked on two things he has to do himself:
1. Upgrade out of Twilio trial (top bar says "Upgrade").
2. Paste Account SID + Auth Token + Verify Service SID into Supabase → Authentication → Providers → Phone → Twilio Verify.

**Gradient temperature not yet picked.** Jordan needs to open `logos/_review/gradient-temps.html` and pick 1, 2, or 3 before the landing ships.

**June 1 is the public launch target.** That's tomorrow. The clock is real.

## Immediate Next Actions

1. **Jordan: pick gradient temperature** (open `logos/_review/gradient-temps.html`, pick 1/2/3) → I apply it and commit.
2. **Jordan: finish Twilio** (upgrade trial + paste 3 values into Supabase Auth). I wire the RSVP flow and we test a real code together.
3. **Commit + deploy landing rebuild** (index.html is uncommitted — 88 insertions, 62 deletions). One commit, auto-deploys to planmovies.com.
4. **rsvps ownership lockdown migration** — drop public DELETE/UPDATE on rsvps, scope to `auth.uid()`. Gate before Reddit post. Adversarial test: anon DELETE must be rejected.
5. **Multi-tenant wiring** — wire event_id into fetchAttendees/submitRSVP/realtime; minimal create-crew form; seed 5-10 city events. Can start in parallel with Twilio setup.
6. **Reddit post draft** — copy and subreddit strategy. Ready to draft anytime.
7. **Jordan: Supabase Pro upgrade** (~$25/mo) — removes the 200-connection realtime hard wall, no auto-pause. Do before posting.

## Goals

**June 1 public launch:**
- ✅ Single HTML file stays (no framework migration)
- ✅ Phase 1 DB lockdown (payments/organizers/events locked — live)
- ✅ XSS fixes (6 sinks — local, committed with landing)
- ✅ Landing redesigned: poster backdrop, lit-deep gradient, lower third content (local, pending deploy)
- ✅ Brand correct: #e53908, 5-arch mark, nav=wordmark-only
- ✅ Seat-fill takeover on RSVP (live)
- ✅ Twilio: Verify service created, Fraud Guard on, Geo (US+Canada SMS)
- ☐ Gradient temperature picked + committed
- ☐ Twilio: upgrade trial + Supabase Auth config (Jordan)
- ☐ rsvps ownership lockdown (public DELETE/UPDATE dropped)
- ☐ Multi-tenant: event_id wired, create-crew form, city event rows seeded
- ☐ Reddit post drafted + staged
- ☐ Supabase Pro upgrade (Jordan)
- ☐ Go/no-go gate: anon DELETE on live rsvp row rejected (verified)

**After launch:**
- Named Crew page + Founding Crew badge
- Dynamic crew-forward og:image share card
- World+sheet draggable (crew page first — mockup at `logos/_review/world-sheet-mock.html`)
- Final raster logo art (Imagen → rembg → app-icon/og:image)
- Platform: Stripe Connect Express, multi-organizer
- TMDB API key (Jordan) → One Movie Identity feature

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Astro is the only future migration ever on the table, and only when per-crew link previews + SEO demand it.
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
17. Don't put `flex:1` children inside the poster carousel — overflow at tall viewports. Crew-dots live in normal flow outside the carousel (fixed Session 18).
18. Don't push the CTA gradient deep end to --gold-dim (#b32c06). That drops to 3.13:1 — fails AA. Clamp at base #e53908.
19. Don't put Twilio credentials in .env or index.html. They live in Supabase Auth dashboard only.
20. Don't collect payments from strangers on launch day. RSVP-first. Payments come after the product is proven.

## Reference Docs

| Doc | What |
|---|---|
| `DESIGN.md` | Platform design system. Read before ANY UI work. |
| `.impeccable.md` | Design context (update: nav=wordmark-only, poster=backdrop, gradient on mark+CTA). |
| `.impeccable/critique/` | /critique snapshot: 30/40 (Session 18), 23/40 mobile (Session 19). |
| `.claude/skills/logo-maker/memory.md` | Full logo hunt: concept + color + fill system + dead directions. |
| `logos/_review/gradient-temps.html` | Three gradient temperatures: 1=lit-deep (live), 2=warm, 3=lit-cool. Jordan picks. |
| `logos/_review/landing-v2-mobile.html` | Landing Path A mock (superseded by the real rebuild in index.html). |
| `logos/_review/world-sheet-mock.html` | Idea 2: world-first + draggable bottom sheet. Not shipped. |
| `memory/project_launch-pivot-public-platform.md` | Launch strategy: June 1, scope C, platform positioning. |
