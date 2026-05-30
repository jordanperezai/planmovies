# MEMORY.md -- PlanMovies Long-Term Memory

> **Purpose:** Distilled truths that survive across sessions. Becomes a knowledge graph over time.
> **Format:** One line per entry, under 150 chars. Link to topic files with [[topic-name]].
> **Overflow:** When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.
> **NOT FOR:** Session logs (-> memory/), bugs (-> bugs/).

## Hot (active)

- PlanMovies scaffolded 2026-05-25. Single HTML file. Cloudflare Pages. Supabase. Stripe LIVE (pk_live_51Sl2z64). Cloudflare Worker for ticket alerts.
- First event: Disclosure Day (Spielberg) at Regal Secaucus. Opening night June 12 2026. Tickets ON SALE on Fandango (up to 20 seats/order).
- Auto-deploy via GitHub Actions: push to main triggers `.github/workflows/deploy.yml` which deploys to Cloudflare Pages. Secrets in GitHub repo settings. Manual fallback: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy /Users/jordan/Desktop/PlanMovies --project-name=planmovies --branch=main --commit-dirty=true`
- Three ranger teams in place. Product Rangers (structure/conversion). Visual Rangers (surface/feel). Logo Rangers (the brand mark — Haviv/Scher/Hische/Draplin/Leader + Bierut verifier; `rangers/logo/`, run via `/logo-rangers`).
- Family/organizer split: planmovies.com = family view (crew list, 2 tabs). planmovies.com?org=1 = organizer (full dashboard, 4 tabs).
- .impeccable.md exists in project root. Design context locked. Run any design skill without needing /impeccable teach.
- Monospace reserved for data only: countdowns, status labels, metadata. Emotional content uses Inter. Credits use Barlow Condensed.
- The Movie tab = "The World of Disclosure Day." Pattern: every movie gets a world page immersing skeptics in the film's universe.
- Zordon is a live repo. Always re-diff after each sync pass — it changes between sessions.
- Jordan's preference: Murthy (social dynamics) and Kim (coordinator burden) lenses over Frisby (conversion) for small-n decisions.

- Money flow: Scenario B. $18/ticket. Live Stripe Payment Link: `https://buy.stripe.com/bJe00jdykaNS4Tj8D23F600`. PlanMovies Stripe account live. PLANMOVIES on statements.
- Content live: 4-poster carousel, 39 quotes (1947-2026, 6 categories incl. World Governments), 5 trailer videos + 3 BTS videos, Declassified Files section, 33 Go Deeper items. All data arrays + render functions.
- UX: RSVP + Crew consolidated (one page). Payment hidden until RSVP. Crew list = Partiful avatar row. Landing = 100dvh single frame, no scroll.
- Credibility cascade on Movie tab: quotes (presidents) → headlines (NYT/60min) → world governments → declassified files → rabbit hole → go deeper.
- Partiful audited (session 9): 22 screenshots + web app. Key insight: event lifecycle, not static page. Their social proof + onboarding is best-in-class.
- Atom Tickets audited (session 9): $178M raised from Disney/Fox/Lionsgate. Acquired by Fever 2025. Social features stripped. Gap they left = PlanMovies.
- Auth decided: Supabase Auth + Twilio Verify for phone OTP before RSVP. No A2P 10DLC needed. Escape valve: organizer manual-add.
- Named Crew = core product concept. Persistent social object across events. "The Perez Family Movie Club." The product's soul.
- One Movie Identity: profile feature, pick one movie to represent you. Poster = visual identity. Jordan's idea.
- Product vision: 79 features mapped + 93 proposed by rangers. Full map: `research/2026-05-27-05-product-feature-map.md`.
- All crew communication via organizer's WhatsApp/iMessage. PlanMovies generates messages, doesn't send SMS. No A2P needed.
- Stripe Connect Express proven: `workers/planmovies-api/` Worker live. Full flow tested: product→price→Payment Link on connected account, $2.50 platform fee via `application_fee_amount`. PLANMOVIES on statement.
- PlanMovies Stripe account separate from Jordan/Arugami. Test connected account: `acct_1TbmyLGaAORvGiJm`. Platform fee = $2.50/ticket → $25K/month at 1K events.
- Platform plan: `.claude/plans/piped-spinning-lamport.md`. Stripe Connect Express, Cloudflare Worker API, Supabase organizers/events/payments schema. Post-June 12.
- Supabase now has: rsvps, seat_assignments, ticket_status, organizers, events, payments. Jordan is first organizer row. Disclosure Day is first event row.
- Cloudflare native git integration blocked: jordanperezai personal GitHub account doesn't appear in Cloudflare Pages dropdown. GitHub Actions is the workaround.

- Design critique scores: heuristics 26/40, AI slop 3.5/10. Full impeccable pipeline run session 12.
- DESIGN.md codifies Page DNA: hero visual → social proof → primary action → context. Read before ANY UI work.
- var(--mono) = data only. 8 type scale tokens: --text-xs(11px) through --text-3xl(clamp). Tokenized throughout.
- Single-scroll three-act page SHIPPED (session 12). No Movie tab. Timeline + category toggle. Commit 3e1e9af.
- Audit score 15.5/20 (session 13). All P0-P3 fixes applied to index.html (uncommitted). Key: amber-dim token, toast live region, heading semantics, non-blocking Supabase, scaleX progress bar, 44px tap targets, safe-area nav.
- Logo LOCKED (LIVE): 5-tab row mark, Ember `#e53908`, lowercase `planmovies` Poppins 800, "Get the row together." Nav=wordmark-only. Fill: outlines open, solid ember filled. Lit-deep gradient (#ff6326→#e53908) on filled seats + "movies" + CTA (contrast 4.69-6.74:1, both AA). Landing redesigned: poster=full-bleed backdrop, content=lower third, 23/40→pending redeploy.
- Seat-fill takeover live (2026-05-30, `a0534d6`): full-screen on RSVP — row fills to live count, your seat glows, "You're in, / [Name]" in ember. ~1.5s, tap-to-skip, reduced-motion safe. The peak-end moment + Carmen/Ray's loud confirmation.
- World+sheet concept (`logos/_review/world-sheet-mock.html`): Disclosure Day world full-screen + peeking bottom sheet for crew/logistics. Mockup only. Build on crew page first.
- PUBLIC LAUNCH June 1 2026 (decided session 19): PlanMovies = the business/platform. Disclosure Day = flagship event (scope C: anyone creates their own crew in their city). Stack stays single-HTML. See `memory/project_launch-pivot-public-platform.md`.
- Security hardened (session 19): Phase 1 DB lockdown live — payments/organizers locked (no public access), events=SELECT-only. 6 XSS src sinks escaped (photo_url + one_movie_poster). rsvps ownership migration pending (before Reddit post).
- Twilio Verify: PlanMovies service created, Fraud Guard on, US+Canada SMS geo-locked. Pending: trial upgrade + Supabase Auth config (Jordan's task). Credentials go in Supabase dashboard ONLY, never in .env or index.html.
- Logo Rangers: `rangers/logo/` — 4 sessions (03 = color; 04 = alignment + fill). Critique vindicated panel: open-seat outline was the Rangers' call all along; dim-fill override failed contrast.
- logo-maker skill: `.claude/skills/logo-maker/`. Memory rewritten session 16 (31→14 validated + 10 dead). Concept + color locked. Pipeline: Imagen → rembg → transparent PNG.
- Image-gen pipeline established: Imagen on FLAT bg → `scripts/cutout.py` (rembg, needs `pip install`) → `assets/cut/`. Reusable for all app artwork.
- impeccable skill: v3.5.0 (updated session 16 from v2.1.1). Global `~/.claude`. `.impeccable.md` refreshed (ember brand, 5-arch mark, Poppins lowercase).
- og:image share card (not favicon) is the branding surface that drives group-chat tap-through. See product-09.
- Crew hero is playable: tap opens official trailer inline. No modal, no new page.
- Landing page: carousel dots replaced by crew avatars. Director badge on organizer. "Jordan & Sarai are going" stays below.
- Activity feed language: "joined the crew" / "created the crew". Not "RSVPed".
- Desktop responsive: full-bleed hero, 720/800px content width. No more phone frame on desktop.
- Codex adversarial review standard: run every session. Found 11 issues in session 12 (2 XSS P0s). Fixed all.
- --gold-dim bumped #8a7234→#9a8240 (WCAG AA). --amber-dim token added.
- Zone backgrounds: .zone-social (gold tint), .zone-form (warm), .zone-movie (blue), .zone-evidence (blue→gold).
- RSVP form: name + going + party size + submit. Party size hidden when "Can't Make It". Phone post-RSVP optional.
- One Movie Identity: profile tab, TMDB search, poster badge on crew avatars. Needs TMDB API key (Jordan's task).
- activity_feed table live. crew-photos bucket live. one_movie columns in rsvps.
- planmovies-api Worker: /api/og live with RSVP count SVG. Static backdrop still og:image (iMessage/WhatsApp don't support SVG).
- scripts/ directory: 4 node scripts for batch HTML/CSS restructuring. Reference before similar large-scale edits.

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
| 2026-05-27 (s8) | 31 commits. Movie tab restructured (credibility cascade). RSVP+Crew consolidated. Landing single viewport. Partiful avatar row. Rangers 06+07. 6 crew page audit fixes. Jake Barber + Matthew Brown added. World Govts section. Declassified Files featured. |
| 2026-05-27 (s9) | Product vision session. Partiful audit (22 screenshots). Atom Tickets audit ($178M, acquired). Reddit demand validated. 79 features mapped + 93 proposed. Named Crew + One Movie Identity + auth design. No code changes. |
| 2026-05-27 (s10) | 9 features built + full design overhaul. Design scores: heuristics 24/40, AI slop 5.0/10. Phone auth, activity feed, crew photos, font role reset. index.html 3930 lines. Pushed. |
| 2026-05-28 (s11) | 7 commits. Poster hero crew page. Auth simplified. Typography cleanup (29→7 uppercase, 71→24 ls, 252 tokenized). Audit pass (a11y, lazy loading). DESIGN.md. Merged page direction confirmed (mockup v4). index.html 4300 lines. |
| 2026-05-28 (s12) | 1 commit (3e1e9af). Two-tab → single-scroll three-act merge. Full impeccable pipeline. Desktop responsive. Codex review (11 issues fixed). Crew avatars on landing. index.html 4697 lines. |
