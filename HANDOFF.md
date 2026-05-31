# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-30 (Session 20)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 20 complete. The phone-OTP RSVP gate is BUILT and verified (local, uncommitted): a `#auth-gate` modal fires at "Count Me In", stamps `user_id`, and Jordan's organizer actions reuse the same gate (phone login = admin via `is_organizer()`). Twilio is fully set up on Jordan's side (upgraded out of trial; Supabase Phone provider = Twilio Verify; enabled). Gradient #1 (lit-deep) is locked. The hero is now CENTERED (nav stays left) and empty seats are GREY outline (#6b7078), filling to ember as the crew RSVPs.

A Codex foreground review found and we PATCHED a live P0 (activity_feed stored XSS). The phase-2 RLS lockdown migration is written and ready (`migrations/2026-05-30_phase2_rsvp_lockdown.sql`) but NOT applied — it goes LAST in the deploy sequence. Three real issues are deferred and logged in `bugs/` (self-set paid, unbounded rows, ticket_status worker key).

Nothing is deployed. The live DB has only been READ (policy names verified, not changed). Everything is in the working tree, uncommitted.

**The whole thing is one deploy sequence away from launch.** It MUST run in order (client first, DB last), or the live family flow breaks in the gap between.

## Immediate Next Actions (the deploy sequence — run in order)

1. **Commit + push** the working tree (index.html gate + brand, migration, bugs, docs). Cloudflare auto-deploys. Confirm planmovies.com is live. *(Nothing is committed yet — Jordan says when.)*
2. **Real OTP test:** Jordan RSVPs on the LIVE site with his phone. Confirms the Twilio round-trip WHILE the old permissive policies are still live, so a failure is loud, not masked.
3. **Apply the phase-2 migration** → insert Jordan's verified uid into `organizer_admins` → re-run `get_advisors(security)` → confirm an anonymous DELETE on an rsvp row is rejected.
4. **Delete the 3 legacy seed rows** (Jordan / Sarai Perez / Taylor) so re-RSVPs don't duplicate.
5. **Deferred (logged in `bugs/`):** paid/ticket_secured column guard (before payments), per-user RSVP cap, ticket_status lockdown (after confirming the ticket-monitor worker key is service_role).
6. **Still pending from S19:** multi-tenant event_id wiring + create-crew form + seed city events; Reddit post draft; Supabase Pro upgrade (Jordan).

## Goals

**June 1 public launch:**
- ✅ Single HTML file stays (no framework migration)
- ✅ Phase 1 DB lockdown (payments/organizers/events — live)
- ✅ XSS fixes (6 src sinks S19 + activity_feed stored XSS S20)
- ✅ Landing: poster backdrop, lit-deep gradient (#1 LOCKED), centered hero, grey-outline empty seats (local)
- ✅ Brand: #e53908, 5-arch mark, nav=wordmark-only, favicon flat solid
- ✅ Seat-fill takeover on RSVP (live)
- ✅ Twilio: upgraded, Supabase Phone provider = Twilio Verify, enabled
- ✅ Phone-OTP RSVP gate built + organizer auth model (local)
- ✅ Codex review done; P0 patched; P2s fixed; P1s deferred + logged
- ✅ phase-2 RLS lockdown migration written (NOT applied)
- ☐ Deploy sequence run (commit/push → OTP test → migration → seed cleanup)
- ☐ Multi-tenant: event_id wired, create-crew form, city event rows seeded
- ☐ Reddit post drafted + staged
- ☐ Supabase Pro upgrade (Jordan)
- ☐ Go/no-go gate: anon DELETE on live rsvp row rejected (verified post-migration)

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
16. Open seats are OUTLINES, never a fill (a dim ember fill failed at 2.19:1). As of S20 the outline is GREY (#6b7078, 4.02:1), not ember — so ember exclusively means a filled seat = a person. Filled = solid ember; the stroke transitions grey→ember as the row fills. (Landing mark + seat-fill takeover both.)
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
