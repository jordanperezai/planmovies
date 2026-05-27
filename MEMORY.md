# MEMORY.md -- PlanMovies Long-Term Memory

> **Purpose:** Distilled truths that survive across sessions. Becomes a knowledge graph over time.
> **Format:** One line per entry, under 150 chars. Link to topic files with [[topic-name]].
> **Overflow:** When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.
> **NOT FOR:** Session logs (-> memory/), bugs (-> bugs/).

## Hot (active)

- PlanMovies scaffolded 2026-05-25. Single HTML file. Cloudflare Pages. Supabase. Stripe LIVE (pk_live_51Sl2z64). Cloudflare Worker for ticket alerts.
- First event: Disclosure Day (Spielberg) at Regal Secaucus. Opening night June 12 2026. Tickets ON SALE on Fandango (up to 20 seats/order).
- Auto-deploy via GitHub Actions: push to main triggers `.github/workflows/deploy.yml` which deploys to Cloudflare Pages. Secrets in GitHub repo settings. Manual fallback: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy /Users/jordan/Desktop/PlanMovies --project-name=planmovies --branch=main --commit-dirty=true`
- Two ranger teams in place. Product Rangers (structure/conversion, 5 sessions, memory earned). Visual Rangers (surface/feel, 2 sessions).
- Family/organizer split: planmovies.com = family view (crew list, 2 tabs). planmovies.com?org=1 = organizer (full dashboard, 4 tabs).
- .impeccable.md exists in project root. Design context locked. Run any design skill without needing /impeccable teach.
- Monospace reserved for data only: countdowns, status labels, metadata. Emotional content uses Inter. Credits use Barlow Condensed.
- The Movie tab = "The World of Disclosure Day." Pattern: every movie gets a world page immersing skeptics in the film's universe.
- Zordon is a live repo. Always re-diff after each sync pass — it changes between sessions.
- Jordan's preference: Murthy (social dynamics) and Kim (coordinator burden) lenses over Frisby (conversion) for small-n decisions.

- Money flow: Scenario B. $18/ticket. Live Stripe Payment Link: `https://buy.stripe.com/bJe00jdykaNS4Tj8D2`. PlanMovies Stripe account live. PLANMOVIES on statements.
- Content live: 4-poster carousel, 31 quotes (1947-2026), 33 Go Deeper items, payment section. All data arrays + render functions.
- Stripe Connect Express proven: `workers/planmovies-api/` Worker live. Full flow tested: product→price→Payment Link on connected account, $2.50 platform fee via `application_fee_amount`. PLANMOVIES on statement.
- PlanMovies Stripe account separate from Jordan/Arugami. Test connected account: `acct_1TbmyLGaAORvGiJm`. Platform fee = $2.50/ticket → $25K/month at 1K events.
- Platform plan: `.claude/plans/piped-spinning-lamport.md`. Stripe Connect Express, Cloudflare Worker API, Supabase organizers/events/payments schema. Post-June 12.
- Supabase now has: rsvps, seat_assignments, ticket_status, organizers, events, payments. Jordan is first organizer row. Disclosure Day is first event row.
- Cloudflare native git integration blocked: jordanperezai personal GitHub account doesn't appear in Cloudflare Pages dropdown. GitHub Actions is the workaround.

## Warm (reference)

## Cold (archived)

- Family persona panel live: `personas/family/roster.md`. 5 archetypes: Marco 28, Lisa 55, Carmen 62, Sofia 16, Ray 68. Session 01 run on RSVP flow 2026-05-27.
- Disclosure Day + UAP ethos fully researched: `research/2026-05-27-01-disclosure-ethos.md`. Key themes: mode-switch from entertainment to evidence, government credibility chain, John Williams at 93.
- Rabbit hole structured as 4-layer cascade: THE WITNESSES → THE FILES → HOW WE GOT HERE → GO DEEPER. Lead with credibility, not politics.

## Session History

| Date | Key work |
|---|---|
| 2026-05-25 | Zordon framework morph. 19 core files + 17 skills + hooks + infra. |
| 2026-05-26 | Full UX audit. Product Rangers (2 sessions). Visual Rangers (1 session). Cinematic landing page overhaul. |
| 2026-05-26 (s3) | Full design pipeline. RSVP form 7→3. Post-submit confirmation. Family/org split. Crew list home. Movie world tab. |
| 2026-05-27 (s4) | Rabbit hole research + restructure. Rangers 04 (page structure, 3-2). Family personas 01 (RSVP flow). Nav fixes. RSVP form persona fixes. |
| 2026-05-27 (s5) | Money flow resolved (B: Stripe + Zelle). Visual Rangers 02 (ticket icon). Auto-deploy. Research: 17 quotes, 33 content items, 6 posters. Plan written for content expansion. |
| 2026-05-27 (s6) | Content expansion shipped (carousel, 31 quotes, 33 Go Deeper). Payment section. Stripe Connect Express proven end-to-end. workers/planmovies-api/ built and deployed. Platform revenue model validated. |
| 2026-05-27 (s7) | PlanMovies Stripe account activated (live). Live Payment Link wired in ($18). planmovies.com fully live. No more blockers. |
