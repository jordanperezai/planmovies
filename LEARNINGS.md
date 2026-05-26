# LEARNINGS.md -- Self-Improvement Log

> **PURPOSE:** Every significant mistake, its root cause, and the rule it established.
> **READ:** At session start. **WRITE:** Immediately when a mistake is caught.
> **PRUNE:** Monthly. Target 15 active max.
> **Not for:** Code bugs (-> bugs/), session state (-> HANDOFF.md), agent identity (-> SOUL.md).

## Active Learnings

**#1 Morph from a live repo requires re-diff after each pass -- 2026-05-26**
Mistake: Reported morph complete after pass 1. CONTRIBUTING.md and LICENSE were in Zordon during pass 1, removed by pass 2, and I had already copied them to PlanMovies.
Root cause: Treated Zordon as a static snapshot. It's a live repo that changed between passes.
Rule: Always re-run the full diff after any sync pass. "Done" means the diff is empty RIGHT NOW, not that it was empty when you started.
Enforced in: CLAUDE.md § Session Continuity (verify against repo, not intent).

**#2 Read the owner file before invoking any new scaffold system -- 2026-05-26**
Mistake: Built an ad-hoc ranger session with generic role-based voices (Mobile UX Designer, Growth PM) before reading rangers/CLAUDE.md which explicitly says to use real public figures, not roles.
Root cause: Assumed I knew how the system worked without reading it.
Rule: Before running any scaffold system for the first time (rangers, skills, hooks), read its CLAUDE.md first. 2 minutes of reading beats a full session of rework.
Enforced in: CLAUDE.md § Skill-Before-Adhoc (extended to any system, not just skills).

---

### Format

**#N [Short title] -- YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives.
