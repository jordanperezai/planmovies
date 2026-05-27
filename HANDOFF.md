# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 5)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 5 complete. Money flow resolved (Scenario B). Research done. Plan written. Ready to build.

**What shipped (session 5):**
- Share buttons demoted to inline WhatsApp/Text SVG icons
- "What is Disclosure Day?" removed from crew page
- LIVE indicator removed entirely
- Price removed from venue line (unknown until tickets confirmed)
- Ticket stub icon (Visual Rangers 02): gold-warm stroke, no perforation, subtle glow
- Corbell "Sleeping Dog" clips added to THE FILES section
- GitHub Actions auto-deploy: `.github/workflows/deploy.yml` (push to main = deploy)
- Cloudflare Pages project rebuilt with custom domains
- Memory files consolidated (one per day)
- Poster flip built (but ugly dossier back, will be replaced by carousel)

**What was decided (not built yet):**
- Money flow: Scenario B. Jordan buys block on Fandango, collects via Stripe Payment Link + Zelle fallback
- Payment status: private (organizer view only). Ticket icon for everyone regardless of payment.
- Poster carousel: cycle through 6 official TMDB variants (replace dossier flip)
- "In Their Words": 17 official UAP quotes organized by category
- "Go Deeper" expansion: 33 curated items (docs, podcasts, channels, films, books)
- All built as reusable components (data arrays + render functions)

**Infrastructure state:**
- planmovies.com live (auto-deploy via GitHub Actions working)
- Stripe is LIVE (not test mode). PlanMovies account active: `pk_live_51Sl2z64...`
- Tickets on sale NOW on Fandango (Thu Jun 11 preview + Fri Jun 12)
- Fandango allows up to 20 seats per transaction
- No need for Regal Group Sales

**Link has still NOT been shared with family. Opening night is June 12 (FRI). 16 days.**

## Immediate Next Actions

1. **Execute the plan:** `.claude/plans/piped-spinning-lamport.md` — 4 features in order:
   - Phase 1: Poster carousel (replace flip)
   - Phase 2: "In Their Words" quotes + "Go Deeper" expansion
   - Phase 3: Payment flow on crew page
   - Phase 4: Test + deploy
2. **Jordan decides:** ticket price (check Fandango), showtime (Thu or Fri), create live Stripe Payment Link with adjustable quantity
3. **Send planmovies.com to family.** 16 days.

## Goals

**Now (before June 12):**
- Execute the plan (poster carousel, quotes, go deeper, payment)
- Jordan: pick showtime, check ticket price, create Stripe Payment Link
- Send planmovies.com to family
- RSVP yourself so crew list isn't empty when family arrives

**Next (after link is sent):**
- `/impeccable craft` on RSVP page (Jordan requested session 4, still pending)
- Visual Rangers session 03: crew page with payment section
- Kim's nudge loop: in-product WhatsApp nudge drafting
- Seats tab: seat assignment after tickets purchased
- Family persona session 02: re-run after payment flow is live

**Later (platform):**
- Make PlanMovies generic (any movie, any theater, any group)
- Stripe Connect for organizer payouts
- Port `/deep-research` skill from Zordon-OS

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is for platform rebuild after June 12.
2. Don't expand to other events until Disclosure Day is fully coordinated.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't remove "THIS IS REAL" headlines from RSVP page. Jordan's call: immersion converts.
6. Don't hide nav during RSVP. Jordan's call: nav stays visible.
7. Don't show payment status on family crew list. Payment tracking is organizer-only. Ticket icon for everyone.
8. Don't hardcode content one-off. Use data arrays (POSTERS, OFFICIAL_QUOTES, RECOMMENDED) + render functions.
