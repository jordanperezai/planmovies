# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 6)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 6 complete. Content expansion shipped. Stripe Connect platform proven. One blocker before the link goes to family: the live Stripe Payment Link URL needs to be wired in.

**What shipped (session 6):**
- Poster carousel (4 TMDB variants, tap/swipe/dots/auto-cycle)
- "In Their Words" rebuilt: 31 verified quotes, 1947–2026, 5 categories (Presidents → Astronauts)
- "Go Deeper" expanded: 33 items, 5 categories, progressive disclosure
- Taken (Spielberg 2002) added to fiction films
- Payment section on crew page: $18/ticket, Fandango proof link, Zelle fallback
- Stripe Connect Express proven end-to-end with real test payment ($20.50, PLANMOVIES on statement)
- `workers/planmovies-api/` Cloudflare Worker built and deployed
- Supabase: organizers, events, payments tables created
- Platform revenue model validated: $2.50/ticket fee via `application_fee_amount`

**What's still pending:**
- `STRIPE_PAYMENT_URL` in index.html is empty — needs live Stripe Payment Link URL
- planmovies.com not yet sent to family (15 days until Jun 12)

**Infrastructure state:**
- planmovies.com live (commit 0baff12, auto-deploy via GitHub Actions)
- `https://planmovies-api.jordan-0ac.workers.dev` — API Worker live (sandbox)
- Supabase: Jordan is first organizer row, Disclosure Day is first event row
- Stripe: PlanMovies account (sandbox). Test connected account: `acct_1TbmyLGaAORvGiJm`
- Supabase RLS on organizers/events/payments is open for testing. Tighten before production.
- Ticket price confirmed: $15.46 adult at Regal Secaucus, Fri Jun 12, 7:00 PM

## Immediate Next Actions

1. **Jordan: Create live Stripe Payment Link** in PlanMovies live account
   - Product: Disclosure Day Ticket, $18, one-time, adjustable quantity
   - Then update `STRIPE_PAYMENT_URL` constant in index.html (one line)
2. **Send planmovies.com to family.** 15 days. Still not sent.
3. **RSVP yourself** — crew list is empty when family arrives

## Goals

**Now (before June 12):**
- Wire live Stripe Payment Link into the site
- Send planmovies.com to family
- RSVP so crew list isn't empty

**Post-June 12 (platform build):**
- Full Stripe Connect Express onboarding (organizer signup UI, OAuth flow)
- TMDB movie search + auto poster
- API-driven event creation (replaces manual form)
- Webhook payment tracking (auto-mark RSVPs as paid)
- Tighten Supabase RLS with service role key
- `/impeccable craft` on RSVP page (requested session 4, still pending)
- Visual Rangers session 03: crew page with payment section
- Family persona session 02: re-run after payment flow is live

**Later (platform):**
- Generic multi-movie, multi-organizer platform
- Stripe Connect for organizer payouts
- PLANMOVIES statement descriptor for all events
- $2.50/ticket platform fee → $25K/month at scale

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is post-June 12.
2. Don't expand to other events until Disclosure Day is fully coordinated.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't remove "THIS IS REAL" headlines from RSVP page. Jordan's call: immersion converts.
6. Don't hide nav during RSVP. Jordan's call.
7. Don't show payment status on family crew list. Payment tracking is organizer-only. Ticket icon for everyone.
8. Don't hardcode content one-off. Use data arrays (POSTERS, OFFICIAL_QUOTES, RECOMMENDED) + render functions.
9. Don't commit .env. It is gitignored. Never force-add it.
