---
name: log-bug
description: Document a code defect before fixing it. One file per bug in bugs/. Distinct from LEARNINGS.md (agent mistakes) — this is for code bugs.
model: sonnet
triggers:
  - "log bug"
  - "found a bug"
  - "/log-bug"
---

# Log Bug — Code Defect Documentation

## Steps

1. **Create bug file** — `bugs/YYYY-MM-DD-short-description.md`:
   ```markdown
   # [Short description]

   **Status:** [open]
   **Found:** YYYY-MM-DD
   **Severity:** [P0 critical | P1 high | P2 medium | P3 low]

   ## What happens
   [Observed behavior]

   ## What should happen
   [Expected behavior]

   ## Root cause
   [Why it happens — fill in when understood]

   ## Fix plan
   [How to fix — fill in when known]
   ```

2. **Update bugs/CLAUDE.md** — add a row to the index table.

3. **Fix the bug** (if fixing now) — then update status to `[fixed]` with the date.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I'll just fix it, no need to document" | Undocumented fixes get un-fixed. The next session won't know this was a bug. |
| "It's too small to track" | Small bugs compound. 30 seconds to log, 30 minutes to rediscover. |
