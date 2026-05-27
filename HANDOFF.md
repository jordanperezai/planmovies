# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 4)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 4 complete. Rabbit hole restructured, personas panel created, RSVP form polished for all ages.

**What shipped (session 4):**
- 4-layer "Down the Rabbit Hole": THE WITNESSES → THE FILES → HOW WE GOT HERE → GO DEEPER
- Deep research synthesis: `research/2026-05-27-01-disclosure-ethos.md` (full movie + UAP ethos)
- Hard visual transition beat between movie content and evidence: "The movie is based on real events."
- Trailers cut from 7 to 3
- "What is Disclosure Day?" scrolls to the transition beat
- Nav tab pill background removed (was clashing with LIVE indicator)
- Brand text hidden on mobile (<480px), seal icon only
- Share buttons gold-outlined (replaced neon green/blue)
- Visited-link fix on briefing headlines
- Family personas panel created: `personas/family/roster.md` (5 archetypes, session 01 run)
- RSVP form persona fixes: form labels 14px, "I'm Going" pill, 1/2/3/4/5 party numbers, solid gold selection state, ticket clarification line, FRI JUN 12 date with price hint

**Infrastructure state:**
- planmovies.com live (latest: 59dc3fe5.planmovies.pages.dev)
- GitHub webhook BROKEN — deploy manually: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy /Users/jordan/Desktop/PlanMovies --project-name=planmovies --branch=main --commit-dirty=true`
- Stripe: TEST mode, payment link hidden (display:none)
- Ticket monitoring Worker: running every 15 min

**Link has still NOT been shared with family. Opening night is June 12 (FRI). 16 days.**

## Immediate Next Actions

1. **Send planmovies.com to family.** NOW. Tickets may be on sale. 16 days left.
2. **Test social preview** — paste planmovies.com into WhatsApp, confirm OG image shows.
3. **RSVP yourself with real info** so Jordan appears on the crew list.
4. **Regal Group Sales: (844) 462-7342** — call for group seating.
5. **Run `/impeccable craft` on RSVP page** — Jordan requested a full design pass, not done yet.

## Goals

**Now (before tickets sell out):**
- Send planmovies.com to family
- Call Regal Group Sales: (844) 462-7342
- Activate Stripe live account
- RSVP yourself

**Next (app polish):**
- `/impeccable craft` on RSVP page (Jordan requested)
- Visual Rangers session 02: crew page and movie tab
- Kim's nudge loop: in-product WhatsApp nudge drafting for organizer
- Seats tab: prepare for when tickets go on sale
- Family persona session 02: re-run after RSVP craft pass

**Later (platform):**
- Make PlanMovies generic (any movie, any theater, any group)
- Stripe Connect for organizer payouts
- Framework rebuild (React/Next.js)

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is for platform rebuild after June 12.
2. Don't expand to other events until Disclosure Day tickets are purchased and seats assigned.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't push to GitHub expecting auto-deploy. Cloudflare webhook is broken. Use wrangler manually.
6. Don't remove "THIS IS REAL" headlines from RSVP page. Jordan's call: immersion converts.
7. Don't hide nav during RSVP. Jordan's call: nav stays visible.
