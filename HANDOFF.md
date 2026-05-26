# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-26
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 2 complete. Major design work done. The landing page has been through two ranger audits (Product Rangers sessions 01-02, Visual Rangers session 01). The visual overhaul landed: poster commands the frame, three gold registers, blue atmosphere from the poster, typography hierarchy fixed.

**Infrastructure state:**
- planmovies.com serving the app (Cloudflare Pages, latest: cb8b3f00.planmovies.pages.dev)
- GitHub webhook to Cloudflare Pages is BROKEN — deploy manually with `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy . --project-name=planmovies --branch=main`
- Ticket monitoring Worker running every 15 min
- Stripe payment link: TEST mode, hidden on page (display:none)
- Zordon scaffold fully synced to latest (13 files, skills, hooks, infra)

**Link has still NOT been shared with family. Tickets reportedly drop TODAY (May 27).**

## Immediate Next Actions

1. **CRITICAL: Jordan sends planmovies.com to family TODAY.** Tickets reportedly drop May 27. Every hour the link sits unsent is RSVPs not collected.
2. **Run /impeccable teach** to create `.impeccable.md` design context. Required before any design pipeline skill runs.
3. **Strip RSVP form to 3 fields** (name, status, party size). Product Rangers unanimous in session 01. Transportation, seating, budget, showtime all to be killed.
4. **Activate Stripe live account** before purchasing tickets.
5. **Call Regal Group Sales:** (844) 462-7342.

## Goals

**Now:**
- Send planmovies.com to family (TODAY — tickets drop May 27)
- RSVP yourself with real info (replace test "Jordan" entry)
- Call Regal Group Sales: (844) 462-7342
- Activate Stripe live account
- Test social preview (paste link in WhatsApp/iMessage)

**Next (design pipeline):**
- /impeccable teach → .impeccable.md
- /shape → design brief for landing page
- /audit → technical quality report
- /critique → visual quality report
- Strip RSVP form to 3 fields

**Next (after tickets purchased):**
- Assign seats in seat map
- Collect payments via Stripe
- Coordinate rides

**Later (platform):**
- Recruit Growth Rangers
- Make PlanMovies generic (any movie, any theater, any group)
- Stripe Connect for organizer payouts
- Framework rebuild (React/Next.js)

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is for the platform rebuild after June 12.
2. Don't expand to other events until Disclosure Day tickets are purchased and seats assigned.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't push to GitHub expecting auto-deploy. Cloudflare webhook is broken. Use wrangler manually.
