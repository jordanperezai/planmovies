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

**#3 CTA button was missing onclick handler — caught during visual testing -- 2026-05-26**
Mistake: The landing page CTA button (`id="cta-btn"`) had no `onclick` handler. It looked correct in the HTML but did nothing when tapped. The sticky CTA had the handler, the inline CTA didn't.
Root cause: The button was built across multiple editing passes. The handler was added to the sticky version and never to the inline version.
Rule: For every interactive element, verify the handler exists in the HTML, not just in your mental model. "It looks right" and "it works" are different things. Test the actual tap.
Enforced in: CLAUDE.md Pattern #1 (success signal without ground-truth check).

**#4 Inline styles proliferate into unmaintainable overrides -- 2026-05-26**
Mistake: The landing page accumulated ~20 inline style attributes across elements. When spacing needed adjustment (floating RSVP status, hero cluster gaps), the fixes were applied as more inline styles, creating a tangled override chain where CSS class properties and inline styles conflicted silently.
Root cause: Each small change "just added" an inline style rather than updating the CSS class. No single place to look for the spacing system.
Rule: For any element touched more than once, promote its styles to a CSS class. Inline styles are a one-way door toward unreadability.
Enforced in: CLAUDE.md § Edit Integrity (re-read before editing).

---

### Format

**#N [Short title] -- YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives.
