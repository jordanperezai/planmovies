# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-26 (Session 3)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 3 complete. Full design pipeline ran. App restructured for two audiences.

**What shipped:**
- `.impeccable.md` design context created
- RSVP form stripped to 3 fields (name, status, party size)
- Post-submit confirmation with crew list + share buttons (was toast-and-reset dead end)
- Family/organizer view split: `planmovies.com` = family view, `planmovies.com?org=1` = organizer
- Family dashboard: crew list + countdown + share + BUY YOUR TICKET (no metrics)
- Organizer dashboard: same + stats, readiness ring, full admin tools
- Monospace font fix: "Jordan is going. Join them." and CTA buttons now use Inter
- "A Steven Spielberg Film" credit now in Barlow Condensed (film credit register)
- The Movie tab: "The World of Disclosure Day" with rabbit hole section (Grusch, Fravor, Pentagon videos) and WAR.GOV/UFO link
- Visited link color bug fixed on RSVP headlines
- Sticky CTA jitter fixed (opacity transition replaces display toggle)
- Two-path landing: COUNT ME IN + "What is Disclosure Day?"
- Product Rangers session 03: app structure advisory, 5/5 voices unanimous on crew list as home

**Infrastructure state:**
- planmovies.com live (Cloudflare Pages, latest: e40ce24b.planmovies.pages.dev)
- GitHub webhook BROKEN — deploy manually: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy /Users/jordan/Desktop/PlanMovies --project-name=planmovies --branch=main --commit-dirty=true`
- Stripe: TEST mode, payment link hidden (display:none)
- Ticket monitoring Worker: running every 15 min

**Link has still NOT been shared with family. Tickets may be dropping.**

## Immediate Next Actions

1. **Send planmovies.com to family.** The app is ready. Tickets may already be on sale.
2. **Test social preview** — paste planmovies.com into WhatsApp/iMessage, confirm OG image shows.
3. **Regal Group Sales: (844) 462-7342** — call for group seating.
4. **Activate Stripe live account** before collecting payments.

## Goals

**Now (before tickets sell out):**
- Send planmovies.com to family
- Call Regal Group Sales: (844) 462-7342
- Activate Stripe live account
- RSVP yourself with real info

**Next (app polish):**
- Visual Rangers session 02: run on crew page and movie tab
- Kim's nudge loop: in-product WhatsApp nudge drafting for organizer
- Seats tab: prepare for when tickets go on sale
- Hype room expansion: podcasts, more congress clips, Reddit embeds

**Later (platform):**
- Make PlanMovies generic (any movie, any theater, any group)
- Stripe Connect for organizer payouts
- Framework rebuild (React/Next.js)
- Growth Rangers

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is for the platform rebuild after June 12.
2. Don't expand to other events until Disclosure Day tickets are purchased and seats assigned.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't push to GitHub expecting auto-deploy. Cloudflare webhook is broken. Use wrangler manually.
