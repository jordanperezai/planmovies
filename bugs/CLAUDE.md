# Bugs

Code bugs only. Agent mistakes go in LEARNINGS.md. One file per bug.

Use `/log-bug` to create entries. It writes the file, adds the index row, and formats consistently. You can also create files manually.

Different from LEARNINGS.md: bugs are code defects (the software is wrong). Learnings are agent mistakes (the process was wrong). A function returning null is a bug. Deploying without testing is a learning.

## When to log

Log at the moment of discovery, NOT at wrap-up. A bug mentioned only in chat is gone after the next context compaction. This is non-negotiable for **deferred** bugs: if you find a defect and decide not to fix it this session, `/log-bug` it immediately so the defect and the decision survive. Bugs you fix on the spot get logged when you fix them. (The PreCompact hook also nudges for unlogged bugs as a backstop, but the habit is log-on-discovery.)

## Naming

```
YYYY-MM-DD-description.md       Date discovered + slug
2026-05-07-login-timeout.md     Example
```

Multiple bugs on the same day get different slugs.

## Format

Each bug file contains:
- **Status:** [open] / [fixed] / [wontfix]
- **What:** What's broken, with reproduction steps
- **Expected:** What should happen
- **Root cause:** Why it's broken (fill in when found)
- **Fix:** What was done (fill in when resolved)

## Status Tags

- `[open]` -- active, needs fix
- `[fixed]` -- resolved, keep for 30 days then archive
- `[wontfix]` -- documented, won't address

## Index

| File | Status | Summary |
|---|---|---|
| [2026-05-30-activity-feed-xss.md](2026-05-30-activity-feed-xss.md) | [fixed] | Stored XSS via attribute on allowed `<strong>` in activity feed (P0) |
| [2026-05-30-rsvp-paid-column-self-writable.md](2026-05-30-rsvp-paid-column-self-writable.md) | [open] | User can set paid/ticket_secured on own row (P1, pre-payments) |
| [2026-05-30-unbounded-rsvp-rows.md](2026-05-30-unbounded-rsvp-rows.md) | [open] | No per-user RSVP row cap (P1) |
| [2026-05-30-ticket-status-worker-key.md](2026-05-30-ticket-status-worker-key.md) | [open] | ticket_status lockdown deferred pending worker key (P1) |
