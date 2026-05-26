---
name: catch-up
description: Bring this agent up to speed — reconcile docs against actual repo state, not memory
model: sonnet
triggers:
  - "catch up"
  - "what did I miss"
  - "what happened"
  - "/catch-up"
---

# Catch-Up — Session Start Recovery

## The Rule

Trust the repo, not the docs. Session logs describe what someone intended to do. Git log and file timestamps show what actually happened. When they disagree, the repo wins.

## Steps

1. **Read the docs** — HANDOFF.md + MEMORY.md + 2 most recent memory/*.md session logs. Note what they claim is the current state.

2. **Check the repo** — Run these in parallel:
   ```bash
   git log --oneline --since="$(grep 'Last updated' HANDOFF.md | head -1 | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')" --stat
   git status --short
   git stash list
   find . -name "*.md" -newer HANDOFF.md -not -path "./node_modules/*" -not -path "./.next/*" | head -20
   ```

3. **Reconcile** — For each claim in HANDOFF.md and session logs, verify:
   - "X was built" → does the file/feature exist?
   - "X was deployed" → curl the URL and check
   - "X was fixed" → is the fix in the codebase?
   - Data claims (counts, scores, totals) → query the actual source
   
   Flag anything that docs say happened but the repo doesn't confirm.

4. **Surface undocumented changes** — Commits and file changes that don't appear in any session log. These are the blind spots.

5. **Produce the report:**
   ```
   ## Catch-Up Report — YYYY-MM-DD

   ## Confirmed (docs match repo)
   - [list]

   ## Drift (docs say X, repo says Y)
   - [list with specifics]

   ## Undocumented (in repo but not in docs)
   - [list]

   ## Recommended focus
   - [based on HANDOFF.md next actions + goals + what drift reveals]
   ```

6. **Ask before updating** — Catch-up is read-only by default. Present the report and let the user decide what to update.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I remember what we did last time" | You don't. You have a summary from compaction. Read the actual files. |
| "HANDOFF.md is enough" | HANDOFF.md describes intent. Git log describes what actually happened. Check both. |
| "I'll just trust the numbers in the docs" | Query the real source. Docs decay. The repo and database don't. |
| "Checking all this takes too long" | A wrong assumption costs more than 30 seconds of verification. |
