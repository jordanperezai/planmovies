---
name: morph
version: "6.4"
description: Transform any repo into an agent-native project with the Zordon framework -- 4-layer memory, gate-first architecture, authority separation, learnment flywheel, and session discipline. Zero dependencies, just markdown files. 19 core files + 18 core skills.
model: haiku
effort: low
author: zordon
tags:
  - template
  - agent
  - architecture
  - memory
triggers:
  - "morph"
  - "new project"
  - "scaffold a new project"
  - "start a new repo"
  - "migrate to scaffold"
  - "align to zordon"
  - "scaffold migrate"
  - "/morph"
---

# Morph -- v6.4 (Zordon Framework)

## What This Is

The Zordon framework: a scaffold for making any project **agent-native** -- where AI sessions compound instead of resetting. A discipline layer that teaches agents how to remember, decide, learn from mistakes, and hand off work cleanly.

**Core Scaffold (Day 1):** 19 files + 10 directories + 18 skills + hooks + infra. Takes 30 minutes.

Battle-tested across 140+ sessions on five production projects before extraction. v6.4 promotes MAP.md, TOOLS.md, WILL.md, hooks/, autonomous/, and infra scripts from conditional to core. Every project that ran without them eventually needed them.

## Full Morph Principle

**A morph is always full.** Never ask "do you need this?" or present scaffold files as optional. If Zordon has it, the morphed project gets it. The agent's job is to adapt each file's CONTENT to the target project, not to decide which files the project "needs."

The pattern that fails: agent presents a gap table, marks items as "maybe" or "later," user says "sure," agent skips 30% of the scaffold. Three sessions later the project needs exactly what was skipped. This happened on Playback100 (May 2026) where WILL.md, MAP.md, hooks/, and infra scripts were all initially skipped then immediately requested.

**Rules:**
- Every core file gets created. Adapt content, never skip the file.
- Every core directory gets created. Even if empty (CLAUDE.md explains what goes there).
- Every core skill gets copied. Even if not exercised yet (status: "present" in particle table).
- Every hook gets wired (blocker + infra-check + qmd PostToolUse). Not "documented for later." Wired.
- Context guards grow organically per project. As a project discovers which file areas cause mistakes when edited without context, it adds checks to a context-guard.sh file. See Terpmon for a mature example with 10 area-specific guards.
- Every infra script gets copied. Even if dependencies aren't configured yet (scripts fail gracefully).
- The only things that stay in Zordon are Zordon-specific: vault concepts, Agent Collider periodic table, weekly-scan for vault growth. Everything else ships.
- **Ships with every morph:** vault-scan (vault search interface), ranger skill, multi-ranger skill, personas/ directory with template roster. **Does NOT ship:** weekly-scan (depends on vault growth tracking), morph (scaffold-only), any project-specific ranger or persona panel. Projects create their own rangers as needed.
- For mature projects (50+ sessions): files with 50+ cross-repo references cannot be renamed. Trim in place, extract to topics, keep the filename. The morph adapts to what exists, not the other way around.

**Reference material:**
- [Principles & Architecture](references/principles.md) -- design principles, 4-layer memory, learnment flywheel
- [Extensions & Post-Day-1](references/extensions.md) -- tool adaptation, conditional core, extension catalog, rangers, output gates

---

## Two Modes

**New repo:** Run Steps 1-18 below. Creates all 19 files + 18 skills from scratch. ~30 minutes.

**Existing repo (migrate):** The project already has code, docs, and history. Run the migration flow instead:

### Migration Flow

Load `memory.md` before starting. It captures validated principles and dead directions from real migrations.

**M1. Understand what exists.** Read root .md files, git log, .claude/skills/, rangers/, memory/. Run `ls` and `find` on every directory. Write a one-paragraph summary of what the project has, what it's missing, and what it has that the scaffold doesn't expect.

**M2. Audit against scaffold.** For each of the 19 core files, check: EXISTS / MISSING / EXISTS BUT WRONG STRUCTURE. Also check:
- 5-line headers on every .md file
- File casing (root = CAPS, subdirs = lowercase-hyphens, exceptions: CLAUDE.md, SKILL.md)
- File size caps (Layer 1: 250 lines, Layer 2: 500 lines, skills: 1000 lines)
- Directory structure (memory/, memory/topics/, bugs/, journal/, rangers/, research/, .claude/skills/, hooks/, infra/, autonomous/, docs/)
- Core skills present (18 minimum)
- .gitignore pattern (`.claude/*` with `!.claude/skills/` negation)

**M3. Pre-scan references.** Before proposing any renames or deletions, grep the entire repo for every filename that might change. This is the step that prevents 13 stale references from surviving migration.

```bash
# For each file you plan to rename or delete:
grep -rn "OLD_NAME" --include="*.md" --include="*.json" --include="*.ts" .
# Exclude historical files (journal/, memory/YYYY-*.md) from the fix list
# but include them in the count so you know the blast radius
```

If the project has sibling repos using the same scaffold, grep those too.

**M4. Present gap analysis.** Table of gaps with status and action:

| File | Status | Action | Dependencies |
|------|--------|--------|-------------|
| VOICE.md | MISSING | CREATE | None (do early) |
| SOUL.md | EXISTS BUT WRONG STRUCTURE | RESTRUCTURE | VOICE.md must exist first |
| CONTEXT.md | EXISTS (non-scaffold) | RETIRE | Content routes to memory/topics/ |

**Do NOT ask which files to skip.** Full morph means full. The only question to ask: "Do any existing project-specific files need to be RETIRED, or do they stay as extensions alongside the scaffold?" Project extensions coexist. Scaffold files are never optional.

**M5. Build phased plan.** Rules:
- Phase 0 = housekeeping (headers, symlinks, .gitignore, file casing). Zero risk.
- VOICE.md and SOUL.md are high priority (identity files have the most impact on agent behavior).
- File deletions happen AFTER content migrates to owner files. Never delete-then-migrate.
- Skills are additive, come last.
- Renames are the most expensive operation. Batch them into one phase. Each rename requires: mv directory, update SKILL.md name + triggers, update CLAUDE.md skills list, update every referencing skill, update ranger rosters, update business/product files. Commit rename + all reference updates together.
- Map dependency chains explicitly. Common ones:
  - VOICE.md before SOUL.md restructure (voice section moves out)
  - Content migration before source file deletion
  - MAP.md creation before ARCHITECTURE.md deletion (content absorbs)
  - memory/topics/ creation before CONTEXT.md retirement (content routes there)

**Content routing table** (where retired content goes):

| Content type | Routes to |
|-------------|-----------|
| Platform gotchas | memory/topics/[platform].md |
| Decision frameworks | Ranger memory or skill memory |
| Architecture details | MAP.md |
| Tool evaluations | research/ |
| Voice/writing rules | VOICE.md |
| Recurring mistakes | LEARNINGS.md or CLAUDE.md Top Mistake Patterns |

**M6. Execute phases.** For each file:
- Read scaffold template (Steps 2-14 below define what each file should contain)
- Read project's existing content
- Write new version: scaffold structure + project content
- Migrate displaced content to its routing destination before deleting anything
- Update ALL references found in M3: `grep -rn "OLD_NAME" --include="*.md" --include="*.json" .`
- Skip historical files (journal entries, session logs keep old names as historical record)
- Verify: re-read, check line count, check structure

**For skill renames specifically:**
1. `mv .claude/skills/old-name/ .claude/skills/new-name/`
2. Update SKILL.md: `name:` field + `triggers:` field
3. Update CLAUDE.md skills list
4. Grep + fix every referencing skill, ranger roster, and business file
5. If the skill has a ranger, rename the ranger directory too
6. If sibling repos exist, check and fix references there
7. Commit everything together

**M7. Integrity check.** Grep for stale references to every deleted and renamed file. Check file sizes against caps. Confirm .gitignore and AGENTS.md symlink.

**M8. Post-migration cleanup.** Run /declutter on ranger memories. Migration restructuring exposes bloat that was hidden before. Ranger memories that looked fine pre-migration may be 2x over cap. Run /tune to catch structural drift the migration introduced.

**M9. Completeness verification.** Run the mechanical checklist:

```bash
bash /path/to/zordon/.claude/skills/morph/verify-morph.sh /path/to/target
```

This checks: 14 core files, 12 directories, 4 hooks, 1 infra script, settings.json wiring (3 hooks), 15 core skills, CLAUDE.md content (4 sections), .gitignore (3 patterns), AGENTS.md symlink.

**The morph is not done until verify-morph.sh exits 0.** If it finds gaps, fix them and rerun. Don't declare done on a manual count. The script is the gate.

**M10. Write back learnings.** Every morph teaches something. Before closing, update this skill's `memory.md` with what you learned. Ask: what surprised you? What took three attempts? What would you tell the next agent running /morph on a different repo? Add validated principles, dead directions, or both. This step is mandatory. The morph skill compounds only if every agent that runs it contributes back.

**Tag provenance.** Every entry added to memory.md must include `Source: [repo name] [session ID], [brief context]` so future readers know where the learning came from. Example: `Source: Manfred S08, Agent Collider morph.` The distillation log entry must also name the source repo. Untagged entries are orphaned knowledge.

**Key principle:** Content flows UP, not out. When a file is retired, its knowledge migrates to memory/topics/, skill memories, ranger memories, or higher-level files (SOUL.md, VOICE.md, CLAUDE.md). Nothing is deleted until it's captured elsewhere. Use the routing table above.

---

## Core Scaffold -- 19 Files + 16 Skills (Day 1)

### File Casing Convention

Root `.md` files = CAPITALIZED (CLAUDE.md, SOUL.md, MEMORY.md). Subdirectory `.md` files = lowercase-hyphens (docs/particle-table.md, rangers/brand/memory.md). Two exceptions stay CAPITALIZED in subdirectories: `CLAUDE.md` and `SKILL.md`. Everything else is lowercase-hyphens. Only the root gets a README.md (project landing page).

### The 5-Line Header (use on EVERY .md file)

```markdown
# FILENAME.md -- [Title]

> **Purpose:** [One sentence]
> **Read:** [When -- "every session" / "before UI changes"]
> **Write:** [When -- "immediately when mistake caught" / "at session end"]
> **Not for:** [What doesn't belong, with pointers -> where it goes]
```

The **Not for** line prevents content from bleeding into the wrong file.

### Step 1 -- Create directories

```bash
mkdir -p memory memory/topics bugs journal rangers rangers/sessions personas scans research .claude/skills infra hooks autonomous docs
```

### Step 2 -- Create CLAUDE.md

The agent's operating manual. This file is Layer 0 -- identity that survives context loss.

Key sections to include (adapt to your project):

**Trust frame** (put this at the very top, before any rules):
```
Mistakes are welcome here. The only thing that breaks trust is shortcuts,
cheating, or dishonesty. When things go wrong, say "this isn't working,
here's what I think is wrong." Honesty is worth more than a hack that
passes tests.
```

**Read at session start** -- list Layer 0 + Layer 1 files:
```
- SOUL.md -- agent identity, The Constraint, failure modes
- VOICE.md -- how the agent sounds: archetype, rules, Kill List, canonical samples
- USER.md -- who the user is, communication style
- MEMORY.md -- distilled truths
- HANDOFF.md -- where we left off, next actions, what NOT to do
- LEARNINGS.md -- mistake log; read before any code change
- TODO.md -- goal tracker
- memory/[today].md + memory/[yesterday].md -- session logs
```

**Self-Improvement** -- reference the escalation ladder:

```
Notice same steps twice      -> propose a skill. Draft SKILL.md with observed steps.
Skill runs identically       -> propose a hook (automate structurally)
Should run between sessions  -> propose an autonomous job (WILL.md)
```

Two repetitions is a pattern. Hermes crystallizes at one. We crystallize at two. Don't wait for the user to notice. Name the pattern, propose the level, build it. The only human-gated promotion is in WILL.md (autonomous operations require explicit tier approval). Verification is the prerequisite: you can't crystallize a pattern unless you can prove it worked.

**Top Mistake Patterns** -- seed with these 10 (all battle-tested):
1. Success signal without ground-truth check. Run verification.
2. Confident assertion outrunning verification. Re-read it.
3. Applying a change to many before testing on one.
4. Treating documentation as behavior. Runtime reveals truth.
5. Stale context after 10+ messages. Re-read before editing.
6. Check that doesn't gate. Every check must block on FAIL or be removed.
7. Irreversible action without approval gate.
8. Same mistake pattern recurring 3+ times without a structural fix.
9. Local build passing but deploy failing (untracked files).
10. Trusting delegated output without verification. Sub-agents and tool outputs hallucinate. Verify before presenting.

**Commands** -- project-specific build/test/run commands.

**Edit & Context Discipline** -- file read budget, edit integrity, post-merge verification, context decay, phased execution, verification before done. (See [principles.md](references/principles.md) for the full list.)

**Skill-before-adhoc rule** (battle-tested across 105+ sessions):
```
When the task is audit, review, check, or verification work -- pause and scan the
skills list BEFORE opening a browser or running commands. If a skill exists for
this work, load it. The skill carries distilled learnings from every previous time
this work was done. Ad-hoc work throws away that compounding.
```

**Decision rules** (3-5 rules the agent checks before proceeding):
```
1. Does this serve [the primary goal]? If not, it waits.
2. [Project-specific recurring decision framework]
3. Revenue/shipping before infrastructure.
```

### Step 3 -- Create SOUL.md

The agent's identity. WHO the agent is -- principles, opinions, failure modes. This is NOT how the agent sounds (-> VOICE.md) or mechanical rules (-> CLAUDE.md).

Eight sections, in this order (see references/structure.md for the full rationale):

**1. Opening statement** -- one paragraph. Who this agent is. Reading this alone should tell you the character.

**2. The Execution Loop** -- how the agent approaches every interaction. Six steps, run on every significant task:

```
STOP -> SEE -> LOVE -> DISCERN -> ACT -> RELEASE
```

- **STOP** -- Pause before reacting. Don't dive into the first thing that looks like the task. Read the room.
- **SEE** -- Perceive the real situation. Not the surface question -- what is actually being asked? What's underneath? Read HANDOFF.md, check context.
- **LOVE** -- Does this serve the person in front of you? Check The Constraint. If this doesn't serve the current step, flag it before building.
- **DISCERN** -- Choose the right approach. Check LEARNINGS for past mistakes. Does a skill exist for this work? Not the first approach -- the right one. Have I done these same steps before? (-> escalation ladder). Am I past 10 messages? (-> re-read before editing).
- **ACT** -- Do the work. Ship it complete. Verify it worked (output proof).
- **RELEASE** -- Let go of the outcome. Don't defend your choices. Don't rationalize mistakes. If it's wrong, say so. Report honestly and move on.

Discovered in a character agent project, proven across 4 projects. STOP prevents reactive output. RELEASE prevents defensive output. LOVE keeps every session aligned with what actually matters.

**3. The Constraint** -- a single-line funnel showing what matters NOW:
```
[Step 1] -> [Step 2] -> [Step 3] -> [Step 4]
```
Example: `Joey's workflows -> First invoice -> Cubita activated -> Scale`
Example: `Scraper reliability -> NJ coverage -> Consumer product -> B2B layer`

Don't build Step 3 before Step 2 is done. If a session drifts toward Step 4 while Step 1 isn't finished, call it out.

**4. What I Believe** -- the agent's real opinions about the product/project. Prose, not bullets.

**5. Value Tensions** -- what happens when good principles collide. Name the tensions this project faces. Don't resolve them in advance. The point is recognizing them when they appear. Common engineering tensions:
- Speed vs. correctness (ship now or get it right?)
- Simplicity vs. completeness (minimal or handle edge cases?)
- User request vs. codebase health (hack it or fix it properly?)
- Autonomy vs. safety (act or ask first?)

**6. Known Failure Modes** -- honest accounting of where the agent has been wrong. Update this when you catch yourself making the same kind of mistake. Example: "I present test data as production evidence" or "I drift toward infrastructure when the revenue work is hard."

**7. Recovery Procedures** -- what to do WHEN the agent breaks. Three categories:
- **When I'm wrong:** Admit it. Revert the damage. Run /learn. Don't rationalize.
- **When tools break:** Diagnose the tool, not yourself. Work around it. Report the issue.
- **When the rules are wrong:** Flag it to the human. Don't silently obey a rule that produces a bad outcome. The rules serve the project, not the other way around.

Adapted from a character agent's error handling. The pattern is universal. Character agents and coding agents both break. The difference is whether they have a procedure for it.

**8. What I Need from You** -- what the agent needs from the human to work well.

### Step 3b -- Create VOICE.md

How the agent sounds. Separated from SOUL.md because voice is its own cognitive task -- when identity and voice share a file, the voice signal gets diluted by operational noise. Three independent projects (soul.md, OpenClaw/Hermes, Zordon) converged on this separation.

Ten sections, in this order (see references/structure.md for full rationale):

**1. Opening statement** -- voice is identity made audible, not decoration. If the voice drifts, the character has drifted.

**2. The Archetype** -- name a specific human the agent sounds like. "10-year shop foreman" is a voice. "Professional but friendly" is not. If you can't picture a real person talking this way, the archetype is too vague.

**3. Core Characteristics** -- 3-5 named communication patterns, each with a rule and example. Not abstract descriptors. Concrete: "conclusion first, reasoning second" or "short sentences, heavy weight."

**4. Register Shifts** -- how the voice changes by context (debugging vs. teaching vs. pushing back vs. celebrating). The archetype stays the same; the register adapts.

**5. What This Voice Is Not** -- explicit anti-patterns. "Not therapeutic: 'I hear you, that must be hard.' Not sycophantic: 'Great question!' Not academic: 'scholars debate whether...'" Define the negative space so the voice doesn't drift toward generic.

**6. Vocabulary** -- words/phrases used frequently. Words/phrases never used.

**7. Punctuation and Rhythm** -- how formatting creates voice. Em-dash ban. Paragraph length variation. When to use structure vs. natural language.

**8. Kill List** -- banned patterns. Throat-clearing, emphasis crutches, filler, hedge words, AI tells, adverbs. What the agent must NEVER say.

**9. The Test** -- read-aloud verification questions. "Does this sound like a human or a machine?"

**10. Canonical Test Exchanges** -- 4-5 input/output pairs that define "correct" voice. Any voice change that breaks these is wrong. These are the voice equivalent of unit tests.

### Step 4 -- Create USER.md

Who the human is. Communication style, preferences, decision-making patterns. This calibrates agent behavior from session 1.

Key sections:

**Who [Name] Is** -- background, role, what they're building, why.

**How [Name] Works** -- technical depth, session style, what they value (directness? detail? brevity?), common patterns ("iterates fast, sometimes too fast -- call it out").

**Communication Preferences** -- how to format responses (bullets vs prose, length, preamble rules).

**Writing Style** -- if the agent ever writes as/for this person. Rules like "no em-dashes" or "no hustle-porn."

### Step 5 -- Create MEMORY.md

An index, not a dump. Becomes a knowledge graph over time. Topic files at `memory/topics/` hold actual knowledge. ~150 chars per line. Link to topic files with [[topic-name]]. When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.

```markdown
# MEMORY.md -- [Project] Long-Term Memory

> **Purpose:** Distilled truths that survive across sessions. Becomes a knowledge graph over time.
> **Format:** One line per entry, under 150 chars. Link to topic files with [[topic-name]].
> **Overflow:** When 3+ entries cluster around a topic, extract to `memory/topics/[topic].md`.
> **NOT FOR:** Session logs (-> memory/), bugs (-> bugs/).

## Hot (active)
- [Key decision] -- [why, <=150 chars]

## Warm (reference)

## Cold (archived -- grepped not read)

## Session History
| Date | Key work |
|---|---|
```

### Step 6 -- Create HANDOFF.md

Rewritten every session. Optimized for speed.

```markdown
# HANDOFF.md -- [Project] Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated: YYYY-MM-DD**

## Where We Left Off
[What's working, what was just completed]

## Immediate Next Actions
[3-5 things ready to build right now]

## Things NOT to Do
[Explicit guards against regressions -- migrate to owner file after 3 sessions]
```

### Step 7 -- Create LEARNINGS.md

```markdown
# LEARNINGS.md -- Self-Improvement Log

> **PURPOSE:** Every significant mistake, root cause, and established rule.
> **READ:** At session start. **WRITE:** Immediately when a mistake is caught.
> **PRUNE:** Monthly -- rules enforced elsewhere get archived. Target <=15 active.

## Active Learnings

[none yet -- examples below show the format in action]

---

### Format
**#N [Short title] -- YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives.
Ranger flag: [Which ranger/area should be aware, if applicable]

### Examples (delete these after your first real entry)

**#0a Claimed "it works" without verifying -- YYYY-MM-DD**
Mistake: Told the user the deploy was live. It wasn't -- the build had failed silently.
Root cause: Read the deploy command output ("success") without checking the actual URL.
Rule: After any deploy, hit the live URL and verify the change is visible before reporting done.
Enforced in: CLAUDE.md Top Mistake Patterns #1. /deploy skill checklist.

**#0b Deleted file without checking references -- YYYY-MM-DD**
Mistake: Removed a config file during cleanup. Three other files imported from it. Build broke.
Root cause: Treated the delete as safe because the file "looked unused." Didn't grep for references.
Rule: Before deleting or renaming any file, grep the repo for all references to it.
Enforced in: CLAUDE.md edit discipline. SECURITY.md irreversibility rule.

**#0c Built a quality gate then immediately skipped it -- YYYY-MM-DD**
Mistake: Created a writing quality check skill, then wrote client-facing copy without running it.
Root cause: The dopamine of shipping the skill replaced the discipline of using it.
Rule: After building any quality gate, run it on the very next piece of work. No exceptions.
Enforced in: Skill anti-rationalization table. CLAUDE.md Top Mistake Patterns #6.
```

### Step 8 -- Create TODO.md

```markdown
# TODO.md -- Active Goals

> **Purpose:** What needs to happen, in priority order. Not a backlog.
> **Cap:** 15 items max. If it's more than 15, some aren't real priorities.

## Now
- [ ] [Top priority]
- [ ] [Second priority]

## Next
- [ ] [After "Now" is done]

## Later
- [ ] [When the time is right]
```

### Step 9 -- Create 18 core skills

Skills live at `.claude/skills/<name>/SKILL.md` (folder-per-skill, canonical Claude Code format).

**Model routing:** Set `model:` on every skill. 85% of agent work is mechanical and doesn't need a frontier model. Default to `model: sonnet`. Only omit for skills requiring hard reasoning (rangers, cross-file architecture).

**Safety metadata:** Three optional frontmatter fields help the agent self-filter:
- `autonomous_safe: true/false` -- can this skill run unattended via auto-skill.sh?
- `blast_radius: low/medium/high` -- how much damage if it goes wrong?
- `context: fork` -- run in an isolated worktree (for rangers, research that shouldn't pollute main context)

**Anti-rationalization table:** Every skill should include an `## Anti-Rationalization Table` section. This names the lies the agent will tell itself before it tells them. Format:

```markdown
## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I already know what this file says" | Re-read it. Context decays after 10+ messages. |
| "This is close enough" | Close enough is how bugs ship. Verify the exact output. |
| "I'll clean this up in the next session" | There is no next session guarantee. Do it now. |
```

Seed each skill with 2-3 entries relevant to that skill's failure modes. As real mistakes happen, `/learn` adds rows to the relevant skill's table. These tables are the preventive layer of the three-layer flywheel.

**Skill memory:** Skills that run repeatedly should have a `memory.md` file in the skill folder. This persists validated principles and dead directions across sessions:

```markdown
# memory.md -- [Skill Name]

## Validated Principles
- [Pattern that worked, with evidence from when it was confirmed]

## Dead Directions
- [Approach that was tried and failed, with why -- prevents re-exploring]

## Anti-Rationalization Additions
[Rows discovered from real mistakes, added by /learn]
```

Create `memory.md` when a skill rediscovers the same fact twice. The skill loads its memory at invocation. Cap at 20 entries, evict oldest when exceeded.

**a) wrap-up** -- end-of-session routine:
Steps: write `memory/YYYY-MM-DD.md`, update HANDOFF.md, run `/learn` for uncaught mistakes, distill to MEMORY.md, skill extraction check, decay checks, run `/log-bug` for unfiled bugs, run verification on final build. The wrap-up orchestrates the other skills so they fire even when not invoked mid-session.

**b) learn** -- three-layer flywheel:
Steps: append to LEARNINGS.md (mistake/root cause/rule/enforced in), inject anti-rationalization row into the relevant skill, flag ranger memory if blind spot revealed.

**c) log-bug** -- bug documentation:
Steps: create `bugs/YYYY-MM-DD-description.md` with status/what/expected/root cause/fix plan, update `bugs/CLAUDE.md` index.

**d) catch-up** -- inverse of wrap-up:
Steps: read HANDOFF.md + MEMORY.md + recent logs, git log since last update, git status for uncommitted work, produce catch-up report.

**e) declutter** -- monthly maintenance:
Steps: prune LEARNINGS (graduate rules enforced elsewhere), compress MEMORY (hot->warm->cold), collapse TODO (done items >30d), decay CONTEXT (>90d entries).

**f) emergent-scan** -- find what you haven't noticed:
Two modes. Code mode: sweep for broken state, file health, cross-file contradictions, cross-session patterns. Product mode: hidden leverage, missing skills/hooks, stalled TODOs, ideas ranked by emergent potential. Surface and stop. Don't build.

**g) ranger** -- structured decision debate:
5 independent agent voices debate a decision with stakes. Neutral prompts, no groupthink. Step 0 loads ranger memory (validated principles + dead directions as voice constraints). Step 7 writes findings back to ranger memory and triages cross-layer. See `rangers/CLAUDE.md` for memory flow.

**h) brainstorm** -- explore ideas without committing:
Generate 5-10 options with tradeoffs. Name the dimensions that matter. Present and stop. Don't recommend. Don't rank.

**i) deep-research** -- multi-source investigation:
Frame the question, detect available sources, search in parallel, synthesize, save to research/. Works with whatever tools are available.

**j) last30days** -- recent sentiment scan:
What are people saying about a topic right now? Search recent discussions (Reddit, X, HN, forums), report themes with verbatim quotes and strategic takeaways.

**k) anti-slop** -- writing quality gate:
Scan any written output against VOICE.md Kill List. Catches throat-clearing, hedge words, AI tells, em-dashes, uniform paragraph length, synonym cycling. Reports violations. Doesn't auto-fix.

**l) collider-smash** -- full structural verification:
Smash the Agent Collider taxonomy against this project. Three levels: particles (do they exist?), bonds (are they connected?), molecules (are the patterns assembled?). Loads particle table, bond registry, and molecule registry. Run monthly alongside /declutter.

**m) tune** -- structural alignment check:
Check every core file against its archetype from the structure bible. Catches structural drift: wrong section ordering, missing required sections, identity files using bullets instead of prose, state files growing paragraphs instead of staying scannable. Run monthly alongside /declutter and /collider-smash.

**n) multi-ranger** -- route decisions across multiple rangers:
When a decision cuts across domains, auto-select relevant rangers, run them in parallel, build an alignment map, and surface blind spots no single ranger caught. Minimum 2, maximum 5. The blind spot check is the load-bearing step.

**o) declutter** -- monthly maintenance:
Prune LEARNINGS.md (cap 15), compress MEMORY.md (hot/warm/cold), collapse TODO.md (done >30d), decay memory/topics/ entries (>90d), prune ranger memories (cap 20), check skill memories (cap 20). The monthly hygiene skill.

**p) verify** -- effect verification:
Check that something actually worked. Verify the effect, not the action. After any deploy, change, or fix: hit the live URL, check the database, read the output. "The command succeeded" is not verification. "The page shows the new content" is.

### Step 10 -- Create journal/ + bugs/ + rangers/ + personas/

```bash
# journal/CLAUDE.md
# Journal
# Narrative reflections, not operational logs. Written in first person with voice and honesty.
# **Naming:** `YYYY-MM-DD-NN-title.md` (date, session number, slug title)
| # | Date | Title |
|---|---|---|

# bugs/CLAUDE.md
# Bug Tracker
Status tags: [open] [fixed] [wontfix]
| File | Status | Summary |
|---|---|---|

# rangers/CLAUDE.md
# Copy from Zordon scaffold: rangers/CLAUDE.md (full template with real-people guidance,
# roster template, memory template, session flow, and ground rules).
# Key principle: best rangers use real people as fictional advisors, not generic roles.
# Strategic/adversarial rangers use role-based voices when structural tension matters more than taste.
# Includes Memory Flow section: how findings flow between skill memory, ranger memory, and project memory.

# No default ranger ships. Projects create their own rangers as needed via /ranger.
# The generic ranger skill handles any ad-hoc ranger with real-person or role-based voices.
```

**personas/ setup:**

```markdown
# personas/CLAUDE.md
Testing panels for validating decisions. Each persona reacts independently to a stimulus.
No debate between them. The synthesis finds patterns across reactions.

Different from rangers/ (adversarial debate where voices argue with each other).

## How to create a panel

1. Name the panel for who the personas ARE (builders, customers, reviewers)
2. Create `personas/[panel-name]/roster.md`
3. Each persona needs: name, background, lens (what they notice), and a test question
4. 5-10 personas per panel. Fewer than 5 loses coverage. More than 10 loses signal.
5. Ground personas in real research or real people. Generic "marketing persona" is useless.

## Template roster format

| # | Persona | Lens | Test Question |
|---|---------|------|---------------|
| 1 | **[Name]** | [What they notice/care about] | "[Question they'd ask]" |

## Uses beyond naming

- Feature prioritization (who benefits? who doesn't care?)
- Onboarding path design (different entry points for different personas)
- Copy testing (does this land for all panels or only one?)
- Documentation tone (which persona gets confused first?)
- Diagnostic interpretation (explain scan results in each persona's language)
```

### Step 11 -- Create SECURITY.md

```markdown
# SECURITY.md -- Authority Separation & Safety

> **Purpose:** Rules for destructive actions, untrusted input, irreversible operations.

## Core Principle
**Cognition is not execution.** Agent reasoning must never directly execute side effects.
Every action flows through: untrusted input -> sandboxed cognition -> proposal -> policy gate -> execution.

## Irreversibility Rule
Irreversible actions require explicit human approval, not just policy. The agent must:
1. State what action is about to happen
2. State why it is irreversible
3. State the backup/revert plan
4. Wait for explicit confirmation

## Command Denylist
Permanently blocked by PreToolUse hook:
- `rm -rf /` or `rm -rf ~` or `rm -rf .`
- `git push --force` to main/master
- `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`
- `curl ... | sh` or `curl ... | bash`
```

### Step 12 -- Create .gitignore

```gitignore
# Ignore .claude by default (machine-specific settings)
.claude/*

# But track skills -- they're the framework
!.claude/skills/
!.claude/skills/**

# Standard ignores
node_modules/
.env
.env.local
.DS_Store
```

**Why this matters:** plain `.claude/` ignores skills too. New users push an "empty" repo. This burned 30 min of debugging -- it's the #1 scaffold gotcha.

### Step 13 -- Create .claude/settings.json + hooks/

The hooks are the immune system. Extract each hook into its own file under `hooks/` and point settings.json at the file path. Inline bash in JSON is shown below for reference but real repos use: `"command": "bash \"$CLAUDE_PROJECT_DIR/hooks/blocker.sh\""`. The rule: if it's longer than one line, it belongs in a file.

Three layers:

1. **Denylist** (PreToolUse/Bash) -- blocks destructive commands. Exit 2 = hard block.
2. **Context-aware reminders** (PreToolUse/Edit|Write) -- reminds the agent what to check when editing sensitive areas. Prints to stderr, doesn't block.
3. **Post-edit validation** (PostToolUse/Edit|Write) -- runs checks after changes (doc sync, type-checking).

Optional: **SessionStart** -- loads context at the beginning of every session (ranger memory, project state).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "cmd=$(echo \"$CLAUDE_TOOL_INPUT\" | grep -oP '\"command\":\\s*\"\\K[^\"]+' 2>/dev/null || echo \"$CLAUDE_TOOL_INPUT\"); blocked=false; if echo \"$cmd\" | grep -qE 'rm\\s+-rf\\s+[/~.]'; then blocked=true; msg='rm -rf on root/home paths'; fi; if echo \"$cmd\" | grep -qE 'git\\s+reset\\s+--hard'; then blocked=true; msg='git reset --hard'; fi; if echo \"$cmd\" | grep -qE 'git\\s+push\\s+--force.*(main|master)'; then blocked=true; msg='force push to main/master'; fi; if echo \"$cmd\" | grep -qiE 'DROP\\s+(TABLE|DATABASE)|TRUNCATE'; then blocked=true; msg='DROP/TRUNCATE SQL'; fi; if echo \"$cmd\" | grep -qE 'curl.*\\|\\s*(sh|bash)'; then blocked=true; msg='pipe curl to shell'; fi; if [ \"$blocked\" = true ]; then echo \"BLOCKED by denylist: $msg\" >&2; exit 2; fi"
        }]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '(CLAUDE|SOUL|VOICE|USER|SECURITY|WILL)\\.md'; then echo 'GUARD: You are editing a core identity file. Verify this change aligns with SOUL.md and will not cause drift.' >&2; fi"
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "cd \"$CLAUDE_PROJECT_DIR\" && [ -x ./infra/qmd-update.sh ] && ./infra/qmd-update.sh 2>/dev/null || true"
        }]
      }
    ]
  }
}
```

**Context-aware hooks pattern** -- add more PreToolUse Edit|Write hooks as you discover which files need guardrails. The pattern: `grep -q '<path-pattern>'` -> print a reminder to stderr. Examples from production:

```json
// Migration files -- remind to apply to database
"if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'migrations/'; then echo 'WARNING: Migration edited. Apply to database before it takes effect.' >&2; fi"

// Ranger memory -- enforce entry cap
"if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'rangers/.*memory.md'; then echo 'REMINDER: Ranger memory edit. Check entry count (cap: 20). Evict oldest if over cap.' >&2; fi"

// Locked brand/design files -- require explicit approval
"if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'design.md'; then echo 'STOP: design.md is locked brand doctrine. Changes require a dedicated session with user approval.' >&2; fi"
```

**PostToolUse validation pattern** -- run checks after code changes. Examples:

```json
// Type-check TypeScript after edits
{
  "matcher": "Edit|Write",
  "hooks": [{
    "type": "command",
    "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'src/.*\\.ts'; then cd \"$CLAUDE_PROJECT_DIR\" && npx tsc --noEmit --pretty 2>&1 | grep -E '(error TS|ERROR|)' | tail -5 || true; fi"
  }]
}
```

**SessionStart pattern** -- inject context at the beginning of every session. Recommended for your global `~/.claude/settings.json` so it applies to all projects:

```json
// Date/time + weather -- injected as env vars available all session
// Change YOUR_CITY to your location (e.g., "San+Francisco+CA", "London+UK")
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [{
          "type": "command",
          "command": "echo \"SESSION_DATE=$(date '+%Y-%m-%d %H:%M %Z')\" >> \"$CLAUDE_ENV_FILE\" && echo \"SESSION_WEATHER=$(curl -s 'wttr.in/YOUR_CITY?format=%c+%t+%h+%w' 2>/dev/null || echo 'unavailable')\" >> \"$CLAUDE_ENV_FILE\""
        }]
      }
    ]
  }
}
```

```json
// Load ranger memory files at session start (project-level, not global)
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [{
          "type": "command",
          "command": "cd \"$CLAUDE_PROJECT_DIR\" && bash infra/load-ranger-memory.sh 2>&1 || true"
        }]
      }
    ]
  }
}
```

The pattern: every repeated mistake that a hook could have caught is a missing hook. When you notice a pattern, propose the hook.

### Step 14 -- Create AGENTS.md

```bash
ln -s CLAUDE.md AGENTS.md
```

**Why both files exist:** `CLAUDE.md` is read by Claude Code. `AGENTS.md` is read by Cursor, Windsurf, and other AI coding tools. The symlink means both point to the same content -- one source of truth, two entry points. Neither tool reads the other's filename.

**Note:** Subdirectory CLAUDE.md files are Claude Code specific -- other tools don't reliably auto-load AGENTS.md from subdirectories. The SKILL.md spec (agentskills.io, 36+ tools) provides the cross-tool portability layer.

**On Windows:** Symlinks require admin privileges. Copy the file instead: `copy CLAUDE.md AGENTS.md`. Keep them in sync manually.

### Step 15 -- Set up qmd

qmd is a local markdown search engine that makes all your project docs searchable via MCP. This is not optional -- without it, the agent can't search its own documentation. Do this now.

```bash
# 1. Create the update script
cat > infra/qmd-update.sh << 'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")/.."
qmd update
SCRIPT
chmod +x infra/qmd-update.sh

# 2. Register this project as a qmd collection (run from project root)
PROJECT_NAME="MyProject"  # Change this
qmd collection add "$PROJECT_NAME" "$(pwd)" "**/*.md" --ignore "node_modules/**" --ignore ".next/**"

# 3. Also register skills as a separate collection (smaller, faster searches)
qmd collection add "${PROJECT_NAME}Skills" "$(pwd)/.claude/skills" "**/*.md"

# 4. Build the initial index
./infra/qmd-update.sh
```

The PostToolUse hook in Step 14 already auto-reindexes on every edit. Verify it works: edit any `.md` file and check that `qmd status` shows "updated."

### Step 16 -- Create folder CLAUDE.md files

Every operational folder gets a `CLAUDE.md`. No subdirectory READMEs.

Agents read CLAUDE.md (Claude Code auto-loads it). AGENTS.md (symlinked at root) covers Cursor/Codex/Windsurf. Nobody browses subdirectories on GitHub. The root README.md is the only README in the project (landing page if shared).

The agnostic file strategy:
- **CLAUDE.md** = source of truth for agent instructions (Claude Code auto-loads per directory)
- **AGENTS.md** = root-level symlink to CLAUDE.md (covers OpenAI/Cursor/Windsurf)
- **Root README.md** = human landing page (one paragraph, "what is this project")
- **SKILL.md** = portable across all tools (agentskills.io spec, 36+ tools)

```markdown
# memory/CLAUDE.md
Write-only session logs. One file per day: `YYYY-MM-DD.md`.
Session numbers continue across days (Session 1, 2, 3... forever). Never reset.
Multiple sessions in one day go in the same file as `## Session N` sections.
Do NOT read these files fully. Grep when you need to find something.
Written by /wrap-up at session end. Never edit a previous session's section.
```

`bugs/CLAUDE.md`, `journal/CLAUDE.md`, and `rangers/CLAUDE.md` were created in Step 10.

### Step 17 -- Session 1 walkthrough

1. **Read CLAUDE.md** -- internalize the edit discipline
2. **Read SOUL.md** -- understand The Constraint
3. **Do your work** -- build features, fix bugs
4. **When a mistake happens** -- run `/learn` immediately
5. **At session end** -- run `/wrap-up`:
   - Write `memory/YYYY-MM-DD.md`
   - Update HANDOFF.md, MEMORY.md
   - Check LEARNINGS.md for uncaught mistakes
6. **Next session** -- read HANDOFF.md + SOUL.md + MEMORY.md. Pick up exactly where you left off.

By session 3-4, you'll feel the compounding. By session 10, you'll wonder how you ever worked without it.

### Step 18 -- Create docs/particle-table.md

Every project gets its own particle table. Copy the template from the Zordon scaffold (`docs/particle-table.md`) and adapt the "implementation" column to reflect THIS project's actual state. Use four statuses:

- **active** -- implemented and exercised in this project
- **present** -- file/skill exists but not yet used
- **extension** -- available with minimal setup
- **external** -- handled by the hosting platform

The table is the blueprint. /collider-smash verifies the plumbing. Both needed.

At scaffold time, most particles will be "present." They become "active" as the project uses them. Update the table at /wrap-up when a particle's status changes.

---

## Final Checklist

**Run the mechanical check first:**
```bash
bash .claude/skills/morph/verify-morph.sh /path/to/target
```
This catches the structural gaps (missing files, unhookedwiring, missing gitignore patterns). If it exits 0, the structure is correct. The manual checklist below verifies CONTENT quality that the script can't check.

### Core Files (13 root + config -- all required, no exceptions)
- [ ] `CLAUDE.md` -- trust frame + session reads + locked invariants + mistake patterns + edit discipline + decision rules
- [ ] `SOUL.md` -- opening, execution loop, Constraint, beliefs, failure modes, recovery
- [ ] `VOICE.md` -- archetype, rules, Kill List, canonical samples, register shifts
- [ ] `USER.md` -- who the human is, communication preferences, decision style
- [ ] `MEMORY.md` -- index with hot/warm/cold sections
- [ ] `HANDOFF.md` -- session continuity (includes Now/Next/Later goals)
- [ ] `LEARNINGS.md` -- mistake log (seeded empty)
- [ ] `SECURITY.md` -- authority separation, blocker rules, irreversibility
- [ ] `MAP.md` -- architecture map (data flow, file ownership, dependency chains)
- [ ] `TOOLS.md` -- external services, APIs, credentials reference
- [ ] `WILL.md` -- autonomous operations (autonomy scale, active jobs, constraints)
- [ ] `README.md` -- project landing page for humans
- [ ] `AGENTS.md` -- symlink to CLAUDE.md (`ln -s CLAUDE.md AGENTS.md`) for Cursor/Windsurf
- [ ] `.gitignore` -- `.claude/*` with `!.claude/skills/` negation
- [ ] `.claude/settings.json` -- hooks referencing externalized scripts in hooks/
- [ ] `docs/particle-table.md` -- project-level particle coverage
- [ ] `memory/CLAUDE.md` -- behavioral instructions for session log directory
- [ ] All .md files have 5-line headers

### Core Directories (10 -- all created at Step 1)
- [ ] `memory/` + `memory/topics/`
- [ ] `bugs/`
- [ ] `journal/`
- [ ] `rangers/` + `rangers/sessions/`
- [ ] `personas/`
- [ ] `scans/`
- [ ] `research/`
- [ ] `hooks/`
- [ ] `infra/`
- [ ] `autonomous/`
- [ ] `docs/`
- [ ] Each directory has a CLAUDE.md explaining what goes there

### Core Skills (17)
- [ ] `.claude/skills/wrap-up/SKILL.md`
- [ ] `.claude/skills/learn/SKILL.md`
- [ ] `.claude/skills/log-bug/SKILL.md`
- [ ] `.claude/skills/catch-up/SKILL.md`
- [ ] `.claude/skills/declutter/SKILL.md`
- [ ] `.claude/skills/emergent-scan/SKILL.md`
- [ ] `.claude/skills/ranger/SKILL.md`
- [ ] `.claude/skills/vault-scan/SKILL.md`
- [ ] `.claude/skills/multi-ranger/SKILL.md`
- [ ] `.claude/skills/brainstorm/SKILL.md`
- [ ] `.claude/skills/deep-research/SKILL.md`
- [ ] `.claude/skills/last30days/SKILL.md`
- [ ] `.claude/skills/anti-slop/SKILL.md`
- [ ] `.claude/skills/collider-smash/SKILL.md` + `references/`
- [ ] `.claude/skills/tune/SKILL.md`
- [ ] `.claude/skills/verify/SKILL.md`

### Does NOT ship (Zordon-only)
- `.claude/skills/weekly-scan/SKILL.md` — depends on vault growth tracking
- `.claude/skills/morph/SKILL.md` — scaffold-only
- Project-specific rangers and persona panels (these are created by the project, not the scaffold)

### Hooks (externalized to hooks/)
- [ ] `hooks/blocker.sh` -- blocks destructive commands (exit 2 = hard block)
- [ ] `hooks/CLAUDE.md` -- documents all hooks
- Note: context-guard.sh is NOT scaffolded. Projects grow it organically as they discover which file areas need protection.

### Infrastructure (infra/)
- [ ] `infra/auto-skill.sh` -- run skills unattended with proof + notification
- [ ] `infra/message.sh` -- one-way notifications (Telegram, Slack, SMS)
- [ ] `infra/skill-adapter.ts` -- discover skills, resolve aliases, build prompts
- [ ] `infra/load-ranger-memory.sh` -- load ranger memory at session start
- [ ] `infra/qmd-update.sh` -- reindex markdown for local search
- [ ] `infra/CLAUDE.md` -- documents all scripts

### Extensions (Add When Triggered)
See [references/extensions.md](references/extensions.md) for the full catalog with trigger conditions.

---

*Built for Claude Code. Principles apply to any AI coding agent. v6.4 -- May 2026.*
