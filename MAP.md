# MAP.md -- System Map

> **Purpose:** Visual map of how everything connects. Data flow, infrastructure, file relationships.
> **Read:** When making changes that touch multiple parts, adding integrations, or orienting a new session.
> **Write:** When infrastructure changes, new services are added, or data flow evolves.
> **Not for:** Tool evaluations (-> TOOLS.md), goals (-> TODO.md).
> **Cap:** 500 lines.

---

## File Relationships

```
CLAUDE.md (Layer 0 -- mechanical rules, always loaded)
    |
    reads at session start
    |
    v
SOUL.md -- identity, The Constraint, execution loop
VOICE.md -- how the agent sounds
USER.md -- who Jordan is
MEMORY.md -- distilled truths (hot/warm/cold)
HANDOFF.md -- where we left off
LEARNINGS.md -- mistakes + rules
TODO.md -- priorities

    on-demand
    |
    v
SECURITY.md -- authority boundaries
WILL.md -- autonomous operations
TOOLS.md -- what's in production
MAP.md -- this file

    write-only
    |
    v
memory/*.md -- session logs (grepped, never fully read)
journal/*.md -- narrative reflections
councils/sessions/*.md -- council session logs
bugs/*.md -- code defects
scans/*.md -- emergent scan findings
research/*.md -- deep research + last30days output
```

## Architecture

```
                    planmovies.com
                         |
                  Cloudflare Pages
                         |
                    index.html
                   (entire app)
                    /        \
                   /          \
          Supabase             Stripe
      (RSVPs, seats,        (payment
       user data)            collection)
              \                  |
               \                 |
                Cloudflare Worker
             (ticket-monitor)
                     |
              Telegram Bot API
            (availability alerts)
```

## Data Flow

```
User opens planmovies.com
    -> index.html loads from Cloudflare Pages
    -> RSVP form submits to Supabase (insert into rsvps table)
    -> Organizer views RSVPs in admin panel (select from Supabase)
    -> Organizer assigns seats (update in Supabase)
    -> Payment link sent via Stripe Checkout
    -> Stripe webhook confirms payment (update Supabase)

Ticket Monitor (runs on schedule):
    -> Cloudflare Worker checks ticket availability
    -> If tickets available: sends Telegram alert
    -> Jordan buys tickets manually
```

## File Map

```
/
  index.html              -- the entire frontend app
  .env                    -- Stripe, Supabase, Telegram keys (not committed)
  workers/
    ticket-monitor/
      src/                -- Worker source
      wrangler.toml       -- Worker config
  memory/                 -- session logs
  .claude/skills/         -- agent skills (17)
  hooks/                  -- agent hooks (3)
  infra/                  -- agent infra scripts
```
