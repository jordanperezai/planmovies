# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-25
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 1 complete. The entire app was built, deployed, and morphed in one session. Everything is live:
- planmovies.com serving the app (Cloudflare Pages)
- Ticket monitoring Worker running every 15 min (Cloudflare Workers)
- Telegram alerts wired (@planmovies_alert_bot)
- Stripe payment link active ($22/ticket, test mode)
- Zordon scaffold in place (13 files, 16 skills, 5 hooks, 7 infra scripts)

Jordan has NOT yet shared the link with family. That's the #1 priority.

## Immediate Next Actions

1. **Jordan sends planmovies.com to family group chats.** Everything else is blocked until RSVPs start coming in. Tickets reportedly drop May 27.
2. **Call Regal Group Sales:** (844) 462-7342. Ask about reserving 25 seats for Disclosure Day opening night at Secaucus.
3. **Activate Stripe live account** before May 27 (currently test mode).
4. **Test social preview:** paste planmovies.com in WhatsApp/iMessage, confirm poster shows.
5. **Confirm ticket quantity limit:** open any showtime on regmovies.com, count the selector max.

## Goals

**Now:**
- Send planmovies.com to family (group chats + individual texts)
- RSVP yourself with real info (replace test "Jordan" entry)
- Call Regal Group Sales: (844) 462-7342
- Activate Stripe live account (swap test keys for live)
- Test social preview (paste link in WhatsApp/iMessage)

**Next (before May 27):**
- Confirm Regal ticket quantity selector max
- Set up coordinated purchase plan based on final RSVP headcount
- Create Stripe payment link with real price once tickets are priced

**Next (after tickets purchased):**
- Assign seats in the seat map
- Collect payments via Stripe
- Coordinate rides

**Later (platform):**
- Make PlanMovies generic (any movie, any theater, any group)
- Stripe Connect for organizer payouts
- Framework rebuild (React/Next.js)

## Things NOT to Do

1. Don't add a framework. Single HTML file is intentional. Framework is for the platform rebuild after June 12.
2. Don't expand to other events until Disclosure Day tickets are purchased and seats assigned.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer, not key secrecy.
