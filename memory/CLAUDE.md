Write-only session logs. One file per day: `YYYY-MM-DD.md`.
Session numbers continue across days (Session 1, 2, 3... forever). Never reset.
Multiple sessions in one day go in the same file as `## Session N` sections.
Do NOT read these files fully. Grep when you need to find something.
Written by /wrap-up at session end. Never edit a previous session's section.

IMPORTANT: Before creating a new file, check if today's file already exists.
If `YYYY-MM-DD.md` exists, APPEND a new `## Session N` section. Do NOT create
`YYYY-MM-DD-02.md` or `YYYY-MM-DD-NN.md`. One file per day, always.

## Format

```markdown
# Session Log -- YYYY-MM-DD

## Session N

### What Was Done
...

---

## Session N+1

### What Was Done
...
```

Subdirectory `topics/` holds knowledge graph nodes extracted when 3+ entries cluster around a subject.
