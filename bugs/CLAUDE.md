# Bugs

Code bugs only. Agent mistakes go in LEARNINGS.md. One file per bug.

Use `/log-bug` to create entries. It writes the file, adds the index row, and formats consistently. You can also create files manually.

Different from LEARNINGS.md: bugs are code defects (the software is wrong). Learnings are agent mistakes (the process was wrong). A function returning null is a bug. Deploying without testing is a learning.

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
