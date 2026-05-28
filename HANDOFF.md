# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 8)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 8 complete. Major UX overhaul: RSVP consolidated into crew page, landing locked to single viewport, avatar row crew list (Partiful-style), full movie tab restructure. 31 commits. planmovies.com fully live and polished.

**What shipped (session 8):**
- Stripe Payment Link URL fixed (`bJe00jdykaNS4Tj8D23F600` is the working one)
- "ghgj" test RSVP deleted from Supabase
- Trailer carousel: 5 trailers (Official, Teaser, Super Bowl, TV Spot, Final Trailer)
- Behind the Scenes carousel: 3 videos (Spielberg First Look, Colbert, Emily Blunt)
- Two carousels separated: Trailers & Spots vs Behind the Scenes
- Movie tab restructured: This Is Actually Happening → In Their Words → World Governments → Declassified Files → Rabbit Hole → Go Deeper
- 8 World Government quotes (Belgium, Brazil, UK, Chile, Japan x2, France, Peru)
- "This Is Happening Around the World" standalone section with transition beat "And it's not just America."
- "The Declassified Files" as featured standalone section (gold border, WAR.GOV button)
- Headlines: top 6 shown, Show More for 12 more. NYT 2017, 60 Minutes, NPR, Pentagon, Trump order lead.
- Jake Barber + Matthew Brown added to Witnesses section (NewsNation, verified YouTube IDs)
- World Governments + headlines: Show 3/Show More pattern
- Go Deeper: emojis removed
- Section order: credibility cascade (people → publications → world → files → rabbit hole)
- RSVP + Crew consolidated into one page (The Crew tab)
- Payment section hidden until after RSVP submission
- "THE CREW" label above list, "Your turn." as form intro
- Radio pills: 16px/24px padding, 12px gaps (accessibility)
- Payment button: outline gold (not solid, prevents confusion with RSVP submit)
- Crew list: Partiful-style horizontal avatar row with "+N more" overflow
- Summary line: "Jordan & Sarai are going"
- RSVP: 2 options only (I'm Going / Can't Make It)
- Theater photo (Regal Secaucus) on crew page and RSVP area
- Landing: locked to 100dvh (single viewport, no scroll)
- Landing: "Opening Night" badge and "RSVP OPEN" removed
- Landing: FRI JUN 12 · 7:00 PM (showtime added)
- Landing: tagline removed, social proof + CTA only
- Countdown hidden until 3 days out
- Scroll-to-top on page load/reload
- OG tags: "You're Invited: Disclosure Day", Jordan-specific description with showtime
- Name auto-capitalize + Title Case enforcement in JS
- First names only on crew list (friendlier)
- "Sarai perez" → "Sarai Perez" fixed in Supabase
- Product Rangers session 06: organizer flow (verdicts recorded)
- Product Rangers session 07 + Visual Rangers + Family Personas: crew page audit (6 fixes applied)

**Current live state:**
- planmovies.com fully live, last commit 3b47371
- 2 people RSVPed: Jordan, Sarai Perez
- Stripe Payment Link active: `https://buy.stripe.com/bJe00jdykaNS4Tj8D23F600`
- Payment section hidden until RSVP (shows after "I'm Going" submission)
- Organizer view: planmovies.com?org=1 (no auth, obscurity only)

## Immediate Next Actions

1. **Send planmovies.com to family.** 15 days until June 12. Still not sent. This is the only blocker.
2. **RSVP yourself** if you haven't already (Jordan is in, add +1s if bringing anyone)
3. **Activity/updates feed** (Partiful-inspired, next feature to build)
4. **Waitlist email capture** ("Plan your own movie night?") at the bottom

## Goals

**Now (before June 12):**
- Send planmovies.com to family — NOTHING ELSE MATTERS UNTIL THIS IS DONE
- Activity feed: organizer posts updates crew sees ("Tickets bought!" etc.)
- Waitlist email capture for platform interest

**Post-June 12 (platform build):**
- Full Stripe Connect Express onboarding (organizer signup UI, OAuth flow)
- TMDB movie search + auto poster
- API-driven event creation (replaces manual form)
- Webhook payment tracking
- Tighten Supabase RLS (currently open for testing)
- Secret token org URL (replace ?org=1)
- Obsession movie night as second event (proof of platform)
- Reddit launch: "free tool for Disclosure Day group movie nights"
- Partiful-inspired: photo album, profile badges, calendar, explore/discover
- Custom OG image (1200x630, landscape format for iMessage/WhatsApp preview)

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional. Framework is post-June 12.
2. Don't expand to other events until Disclosure Day is fully coordinated.
3. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
4. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
5. Don't remove "THIS IS REAL" headlines from RSVP page. Jordan's call: immersion converts.
6. Don't show payment status on family crew list. Payment tracking is organizer-only. Ticket icon for everyone.
7. Don't hardcode content one-off. Use data arrays (POSTERS, OFFICIAL_QUOTES, RECOMMENDED) + render functions.
8. Don't commit .env. It is gitignored. Never force-add it.
9. Don't randomize headlines. They are ranked by impact. Order is intentional.
