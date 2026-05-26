# MEMORY.md -- PlanMovies Long-Term Memory

> **Purpose:** Distilled truths that survive across sessions. Becomes a knowledge graph over time.
> **Format:** One line per entry, under 150 chars. Link to topic files with [[topic-name]].
> **Overflow:** When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.
> **NOT FOR:** Session logs (-> memory/), bugs (-> bugs/).

## Hot (active)

- PlanMovies scaffolded 2026-05-25. Single HTML file. Cloudflare Pages. Supabase. Stripe (test mode). Cloudflare Worker for ticket alerts.
- First event: Disclosure Day (Spielberg) at Regal Secaucus. Opening night June 12 2026. Tickets expected May 27.
- GitHub webhook to Cloudflare Pages is BROKEN. Deploy with: `CLOUDFLARE_ACCOUNT_ID=0ac90ecc2fb8de376efd32b25a466bfe npx wrangler pages deploy . --project-name=planmovies --branch=main`
- Two ranger teams in place. Product Rangers (structure/conversion). Visual Rangers (surface/feel). Both have rosters + sessions in rangers/.
- Global design pipeline in ~/.claude/skills/: impeccable, design-pipeline, layout, typeset, colorize, animate, audit, critique. NOT referenced in Zordon. Bridge needed.
- RSVP form has 7 fields. Product Rangers unanimous: strip to 3 (name, status, party size). Not yet done.
- Zordon is a live repo. Always re-diff after each sync pass — it changes between sessions.
- Jordan's preference: Murthy (social dynamics) and Kim (coordinator burden) lenses over Frisby (conversion) for small-n decisions.

## Warm (reference)

## Cold (archived)

## Session History

| Date | Key work |
|---|---|
| 2026-05-25 | Zordon framework morph. 19 core files + 17 skills + hooks + infra. |
| 2026-05-26 | Full UX audit. Product Rangers (2 sessions). Visual Rangers (1 session). Cinematic landing page overhaul. |
