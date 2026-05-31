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

**#8 Node scripts for HTML restructure: use string markers, not line numbers — 2026-05-28**
Mistake: First merge attempt produced a 10-line file. Node script used `\\n` in split/join causing incorrect line counting. The actual content was fine, but the script's validation reported wrong size.
Root cause: String escaping in node scripts written via Write tool: `\\n` in the Write tool parameter becomes `\n` in the file, which is a newline in JS. But `html.split('\\n')` in the source becomes `html.split('\n')` which is correct. The line count display was wrong, but the content was valid.
Rule: After any node script restructure, verify with `wc -l` and `grep` for expected markers, not just the script's own console output. Always check the actual file state independently.
Enforced in: CLAUDE.md Pattern #1 (success signal without ground-truth check).

**#9 XSS: user-derived strings need esc() in ALL template literal paths — 2026-05-28**
Mistake: Codex adversarial review found attendee names interpolated without esc() in some renderFamilyCrew, showConfirmation, and activity feed paths. esc() existed but wasn't consistently applied everywhere.
Root cause: When adding new render paths (crew dots, landing strip, category view), esc() calls were omitted. Each new HTML-building function is a fresh XSS risk.
Rule: Any function that builds innerHTML from Supabase data must wrap every user-derived field in esc(). Review list: name, status_line, photo_url alt text, activity messages. Treat Supabase data as untrusted input.
Enforced in: Code review pattern — search for `.name` and `.message` in innerHTML template literals.

**#10 SVG negative-space cuts must use true transparency, not a background-matching fill -- 2026-05-28**
Mistake: Direction A's play cut was filled with `--bg-card` (#12151b). On the dark page it looked like a hole. On a white iMessage/WhatsApp unfurl it inverted into a visible dark gash — looks like a rendering bug.
Root cause: Tested the mark only on its home page background. Favicons and chat-thumbnail unfurls render on uncontrolled backgrounds (white, gray, light). A filled "background color" is not a hole, it's a painted shape.
Rule: Any SVG mark intended for favicon/app-icon/unfurl use must use true transparency for cuts (mask or fill-rule:evenodd). Never use a background-color fill to fake negative space. Test on both dark AND white backgrounds before calling it done.
Enforced in: `rangers/visual/memory.md` § Dead Directions.

**#11 Logo boards without a positive reference always thrash — stop at 3 misses -- 2026-05-28**
Mistake: Kept generating new logo boards (20 total across sessions 13–15) after repeated rejections, each time guessing at a new direction instead of diagnosing why every direction was failing.
Root cause: The search was defined entirely by "no"s with zero "yes" anchors. Jordan never named a real-world logo he admired — so every board was a blind guess into the dark. Also: we kept asking a 32px static glyph to deliver an emotional hit that structurally lives in the brand world (motion, photography, copy), not a mark.
Rule: After 3 consecutive rejected logo directions, STOP generating. Do one of: (1) ask for 2–3 real-world logos the user loves and what specifically hits; (2) run `/logo-rangers` to diagnose; (3) name the meta-problem ("this is a world problem, not a mark problem") and recommend a human designer. More boards won't fix a missing positive reference.
Enforced in: `.claude/skills/logo-maker/SKILL.md` § Step 3.5 Anti-thrash.

**#11 A security advisory with "always true" write policies is a launch blocker, not a polish item — 2026-05-30**
Mistake: Shipped a public page (planmovies.com) for weeks with `Anyone can delete rsvps` (USING true) and `full access for testing` on events/organizers/payments. Discovered only when preparing for a public Reddit launch. The anon key is public by design; the wide-open policies meant anyone with devtools could wipe every RSVP or read every payment.
Root cause: "It's just family" framing masked the risk. The policies were named for testing and never cleaned up.
Rule: Before any public-facing launch, run `get_advisors(security)` and treat every `rls_policy_always_true` WARN on a write operation as a launch blocker. "We trust our users" is not a mitigation when the anon key is embedded in the page.
Enforced in: HANDOFF.md § Things NOT to Do #3; pre-launch go/no-go checklist.

**#10 Overriding panel consensus requires stronger evidence than "it looks fine" — 2026-05-30**
Mistake: Logo Rangers unanimously recommended OUTLINE for open seats (a chair waiting). I shipped a dim ember FILL instead (#6e3a26), reasoning it "reads waiting." /critique measured it at 2.19:1 vs background and 2.14:1 vs filled — both below the 3:1 graphic minimum. It also read as a battery, not seats. The outline the Rangers called for was correct all along.
Root cause: Trusted aesthetic reasoning ("dim ember reads warm") over a measurable constraint (contrast ratio). The panel had data I ignored.
Rule: When overriding a ranger or critic panel's concrete recommendation, verify with a number, not a vibe. For color, run the contrast ratio. If it doesn't clear the bar, you don't override.
Enforced in: HANDOFF.md § Things NOT to Do #16; logo-maker/memory.md Validated Principles.

**#12 Agents you need OUTPUT from run FOREGROUND — background mode is dispatch-and-poll — 2026-05-30**
Mistake: Launched the Codex adversarial review via the codex-rescue agent with `run_in_background: true`. It dispatched an async Codex task and returned only a task ID + "check /codex:status." I then couldn't read the result: `/codex:status` is user-gated (disable-model-invocation) and `TaskOutput` doesn't track Codex-internal task IDs. I wrongly concluded Codex was "broken" and told the user to run a command — which they'd never had to do before.
Root cause: `run_in_background: true` makes an agent fire-and-forget. For Codex the result then lives behind a user-only status command, unreachable by the model. Re-running the SAME agent in the FOREGROUND blocked until Codex finished and returned the full findings inline.
Rule: If you need an agent's OUTPUT in this conversation (a review, a diagnosis, a result you'll act on), run it FOREGROUND (omit `run_in_background`). Reserve background for true fire-and-forget work the harness will notify you about. If you're about to tell the user to fetch a result via a command, that's the signal you used the wrong mode.
Enforced in: agent-usage default; CLAUDE.md § Two-Brain Workflow.

---

### Format

**#N [Short title] -- YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives.
