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

**#5 CSS class redesigns don't touch inline HTML styles — 2026-05-27**
Mistake: The typography redesign changed CSS class definitions (`.section-header`, `.stat-label`, etc.) from mono to Barlow/Inter. The automated re-score found ~35 non-data mono instances still present — because the Briefing tab HTML contains ~20 inline `style="font-family:var(--mono)"` attributes that CSS class changes can't reach.
Root cause: Assumed that updating CSS classes updates all rendered elements. Inline styles override everything and are invisible to CSS-level refactors.
Rule: Any styling system change that says "switch X to Y everywhere" requires a grep for inline `style=""` attributes in the HTML AND JS template literals. The CSS classes are only half the picture.
Enforced in: HANDOFF.md § Things NOT to Do #11 (var(--mono) = data only).

**#6 /critique should run BEFORE building, not after — 2026-05-27**
Mistake: Built 9 features into the page, then ran /critique for the first time and discovered the design scored 6.5/10 AI slop. The features were real but landing in a dashboard aesthetic nobody noticed was broken.
Root cause: Design quality check happened after implementation. "Ship features, then audit" is backwards for a site that lives or dies on first impressions.
Rule: For any session that modifies the UI, run /critique at session START to establish baseline. Build with the critique score in mind. Re-run at end to verify improvement. Never discover the aesthetic is broken after shipping features into it.
Enforced in: CLAUDE.md § Skill-Before-Adhoc (extended to /critique before UI work, not just audit skills).

**#7 onclick inline styles with user content can break on special characters -- 2026-05-28**
Mistake: Initial movie search results used `onclick='pickOneMovie(${m.id}, ${JSON.stringify(esc(m.title))}, ...)'`. Movie titles with single quotes (like "It's a Wonderful Life") would break the HTML attribute because JSON.stringify doesn't escape single quotes, and the onclick was wrapped in single quotes.
Root cause: Assumed JSON.stringify makes all strings safe for inline HTML attributes. It doesn't escape single quotes.
Rule: Never pass user-derived strings as inline onclick arguments. Use a data array (movieSearchResults[i]) and pass only an integer index. The data stays in JS, the HTML attribute stays safe.
Enforced in: pickOneMovieByIndex() pattern — integer index only in HTML, full object in the JS array.

---

### Format

**#N [Short title] -- YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives.
