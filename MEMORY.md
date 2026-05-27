# MEMORY.md -- PlanMovies Long-Term Memory

> **Purpose:** Distilled truths that survive across sessions. Becomes a knowledge graph over time.
> **Format:** One line per entry, under 150 chars. Link to topic files with [[topic-name]].
> **Overflow:** When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.
> **NOT FOR:** Session logs (-> memory/), bugs (-> bugs/).

## Hot (active)

- PlanMovies scaffolded 2026-05-25. Single HTML file. Cloudflare Pages. Supabase. Stripe (test mode). Cloudflare Worker for ticket alerts.
- First event: Disclosure Day (Spielberg) at Regal Secaucus. Opening night June 12 2026. Tickets may be on sale now.
- GitHub webhook to Cloudflare Pages is BROKEN. Deploy with: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy /Users/jordan/Desktop/PlanMovies --project-name=planmovies --branch=main --commit-dirty=true`
- Two ranger teams in place. Product Rangers (structure/conversion, 3 sessions, memory earned). Visual Rangers (surface/feel, 1 session).
- Family/organizer split: planmovies.com = family view (crew list, 2 tabs). planmovies.com?org=1 = organizer (full dashboard, 4 tabs).
- .impeccable.md exists in project root. Design context locked. Run any design skill without needing /impeccable teach.
- Monospace reserved for data only: countdowns, status labels, metadata. Emotional content uses Inter. Credits use Barlow Condensed.
- The Movie tab = "The World of Disclosure Day." Pattern: every movie gets a world page immersing skeptics in the film's universe.
- Zordon is a live repo. Always re-diff after each sync pass — it changes between sessions.
- Jordan's preference: Murthy (social dynamics) and Kim (coordinator burden) lenses over Frisby (conversion) for small-n decisions.

## Warm (reference)

## Cold (archived)

## Session History

| Date | Key work |
|---|---|
| 2026-05-25 | Zordon framework morph. 19 core files + 17 skills + hooks + infra. |
| 2026-05-26 | Full UX audit. Product Rangers (2 sessions). Visual Rangers (1 session). Cinematic landing page overhaul. |
| 2026-05-26 (s3) | Full design pipeline. RSVP form 7→3. Post-submit confirmation. Family/org split. Crew list home. Movie world tab. |
