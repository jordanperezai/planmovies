# Extensions & Post-Day-1 Features — Zordon Scaffold v6.2

> **Purpose:** Everything that isn't Day 1 core: tool adaptation, conditional files, extension catalog, rangers, output gates.
> **Read:** When you need to add a feature beyond the core scaffold.
> **Not for:** Day 1 scaffold steps (-> SKILL.md).

---

## Tool Adaptation

The scaffold is **tool-agnostic at its core** -- markdown files + git + shell. The tool-specific layer is small and swappable.

| Layer | What | Tool-specific? |
|---|---|---|
| Identity files (SOUL.md, VOICE.md, USER.md) | Universal markdown | No -- any AI agent can read these |
| Session files (HANDOFF.md, MEMORY.md, LEARNINGS.md, TODO.md) | Universal markdown | No |
| Reference files (SECURITY.md, WILL.md, TOOLS.md, MAP.md) | Universal markdown | No |
| Root instruction file | CLAUDE.md (Claude Code) / AGENTS.md (Cursor, Windsurf) | Yes -- filename matters |
| Folder instruction files | CLAUDE.md in subdirectories | Yes -- Claude Code auto-loads; other tools need explicit reads |
| Skills | `.claude/skills/<name>/SKILL.md` | Yes -- Claude Code convention, but the SKILL.md spec is cross-tool (36+ tools) |
| Hooks | `.claude/settings.json` | Yes -- Claude Code only |

**To use with Claude Code:** Works out of the box. CLAUDE.md auto-loads, skills register as `/commands`, hooks fire on tool use.

**To use with Cursor / Windsurf:** AGENTS.md (symlink to CLAUDE.md) gives these tools the same root instructions. Skills can be referenced in `.cursorrules` or `.windsurfrules`. No hooks equivalent -- use the skill-before-adhoc rule instead.

**To use with Codex / other agents:** Tell the agent to read CLAUDE.md + Layer 1 files at session start. Skills are plain markdown -- any agent can follow the steps. The scaffold pattern (read these files -> do work -> update these files) works regardless of tool.

**The principle:** The scaffold makes agents disciplined, not tool-dependent. The files ARE the framework. The tool-specific wiring is just how those files get loaded.

---

## Conditional Core -- Add If Applicable

These aren't extensions -- they're core files for projects that reach a certain shape. Plan for them from Day 1 even if you don't create them yet.

### WILL.md -- Autonomous Operations

**Include if:** Your project has autonomous/background jobs (cron, launchd, webhooks, scheduled tasks).

WILL.md defines what the agent does when the human isn't present. HANDOFF.md is "what to do when the human walks in." WILL.md is "what to do when the human walks out."

Key sections:

**Autonomy Scale** -- 4 tiers:

| Tier | Name | What it can do | Example |
|------|------|----------------|---------|
| 0 | **Observe** | Read state, log findings. No writes, no alerts. | Health checks |
| 1 | **Report** | Observe + send notifications. No data changes. | Changelog, alerts |
| 2 | **Maintain** | Report + fix known problems within guardrails. | Auto-heal, data sync |
| 3 | **Act** | Maintain + make decisions, call external APIs. | AI-driven workflows |

**Promotion rule:** A job starts at Tier 0-1. It earns higher tiers after 7+ days with zero incidents. The human promotes explicitly -- the system never self-promotes.

**Active Jobs** -- table with: Job, Trigger, Intent, Tier, Escalation behavior.

**Constraints** -- default deny, no PII in agent state, receipt on every action, append-only (one bad run can't destroy history), budget caps for API calls, notification hygiene (alert on state changes only).

### infra/ directory

**Include if:** You have autonomous jobs or monitoring.

```bash
mkdir -p infra
```

Stub files: `infra/telegram.mjs` (alert utility), `infra/health-check.mjs` (endpoint verification). Wire alerts to Telegram -- free, unlimited, takes 5 minutes to set up via @BotFather.

---

## Extensions Catalog -- Add When Needed

Each has a trigger condition. Don't add preemptively.

### Files

| Extension | Trigger | What it does |
|---|---|---|
| `VISION.md` | Vision outgrows SOUL.md | Single source of truth for full product vision |
| `DESIGN.md` | Project has a UI | Visual design system. Start from [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) |
| `ARCHITECTURE.md` | System has 3+ moving parts | Pipeline diagrams, scheduled jobs, data flow |
| `TOOLS.md` | Evaluating 3+ external tools | Quick reference (cap 150 lines). Deep writeups -> `TOOLS-RESEARCH.md` |
| `BUSINESS.md` | Revenue model needs documentation | Revenue models, pricing, competitive positioning |
| `COMPETITORS.md` | Need to track competitive landscape | Who else is in this space, where the gap is |
| `incident-reviews/` | Production incident occurred | Structured post-mortem: what happened, timeline, root cause, what changed, what prevents recurrence. One file per incident. Unlike bugs/ (code defects), incident-reviews are for operational failures (wrong deploy target, data leak, service outage). |
| `FAILURES.md` | Agent has known limitations worth documenting upfront | Proactive failure mode documentation -- where the agent WILL break, by design. Unlike LEARNINGS.md (reactive -- logs mistakes after), FAILURES.md is predictive. Categories: misreads (false positives/negatives in judgment), scaling failures (what breaks under load), unresolvable tensions (value conflicts with no clean answer), conditions required but not guaranteed (what the model needs but can't ensure). Ends with a "What This Model Is Not For" table. Originated in a character agent project. |
| `canonical/SAMPLES.md` | Agent voice is drifting | Ground-truth input/output pairs that define correct voice behavior. Any change that breaks these samples is wrong. Pairs with a `/drift-check` skill that compares recent output against the canonical samples. The voice equivalent of unit tests. Originated in a character agent project. |

### Skills

| Skill | Trigger | What it does |
|---|---|---|
| `/ranger` | Need structured debate on a decision with stakes | 5-voice adversarial panel with anonymous peer review. Each voice MUST be an independent agent. |
| `/enforce-gate` | Writing a check that should block, not just detect | Wraps validation so it gates on FAIL |
| `/explore` | Need options without verdicts | Open brainstorming, no rangers, no decisions |
| `/multi-ranger` | Decision spans multiple rangers | Routes to all relevant rangers, maps alignment |
| `/audit-setup` | Instruction files feel contradictory or stale | Reads all docs, checks for conflicts |
| `/deploy` | Project has a deploy step | Build + deploy + verify checklist |
| `/drift-check` | Agent has a voice/persona that might drift | Compare recent output against canonical/SAMPLES.md. Flag deviations. Originated in a character agent project. |

Note: `/emergent-scan` and `/declutter` are now core skills (ship with scaffold). `/challenge` is now a PreToolUse hook (fires automatically on core identity file edits).

---

## Output Gates (from a character agent's INTEGRITY.md)

**Trigger:** When the agent produces output that needs quality assurance -- client-facing copy, persona responses, anything where "close enough" isn't good enough.

Output gates are checks that **BLOCK output on failure**, not just warn. They are the gate-first principle applied to the agent's own responses, not just code pipelines.

Create an `INTEGRITY.md` (or `GATES.md`) file with numbered gates. Each gate is a binary check. If it fires, stop and regenerate. Universal gates that apply to any agent:

| Gate | Check | Fires when |
|---|---|---|
| Generic Test | "Could any agent have said this?" | Response has no specific voice, opinion, or perspective |
| Vocabulary Scan | Contains banned words from Kill List | Filler, hedge words, AI tells, corporate speak |
| Dodge Check | Avoids answering a question the agent should answer | Hedging with "it's complex" instead of committing |
| Hedge Check | Contains "it could be argued," "some might say," "there are many perspectives" | Agent won't commit to a position |
| Formula Check | Same structure 3+ times in a session | Acknowledge -> reframe -> truth -> image/question (on repeat) |
| Slop Check | Contains items from the Kill List | Throat-clearers, emphasis crutches, adverbs, filler |
| Rhythm Check | 3+ consecutive paragraphs same length/structure/beat | Uniform AI cadence -- real speech is irregular |

When a gate fires: stop generation -> identify which gate -> check VOICE.md/SOUL.md -> regenerate. If the same gate fires twice on the same response, log it in FAILURES.md as an edge case.

---

## Ranger System

**Trigger:** When a decision has real stakes and would benefit from structured multi-perspective debate.

**Structure:** Each ranger lives in `rangers/<name>/` with three files:

```
rangers/
+-- CLAUDE.md              -- index of all rangers with triggers
+-- engineering/
|   +-- roster.md          -- who the voices are, their domains, ground rules
|   +-- memory.md          -- validated principles, dead directions, voice calibration
|   +-- sessions/          -- full session logs (never summaries)
+-- strategy/
    +-- roster.md
    +-- memory.md
    +-- sessions/
```

**Roster template** (`rangers/<name>/roster.md`):

```markdown
# [Name] Ranger

> **Invoked via:** `/[name]-ranger`
> **For:** [What decisions this ranger handles]
> **NOT for:** [What goes to other rangers -- prevents scope creep]

## The 5 Advisors

| # | Voice | Domain | Key Question |
|---|---|---|---|
| 1 | **[Name/Role]** | [Area] | "[The question this voice always asks]" |
| 2 | ... | ... | ... |

### Voice Details
[1-2 paragraphs per voice: what they care about, what they hate, how they argue]

## Ground Rules
- [Which voices balance each other]
- [Who has veto power on what]
- [User] has final say. The ranger advises, it doesn't decide.
```

**Memory template** (`rangers/<name>/memory.md`):

```markdown
# [Name] Ranger Memory

> **Purpose:** Prevent re-suggesting dead directions. Inject validated principles into every session.
> **Cap:** 20 active entries. Oldest `last-confirmed` evicted at #21.

## Validated Principles
- **[Principle]** -- YYYY-MM-DD. Context: [why this is true]. last-confirmed: YYYY-MM-DD

## Dead Directions
- **[Approach that was tried and failed]** -- YYYY-MM-DD. Why: [what went wrong]. last-confirmed: YYYY-MM-DD

## Voice Calibration
[Notes on which voices are too aggressive/passive, adjustments needed]

## Distillation Log
| Date | Entries reviewed | Promoted | Archived |
|---|---|---|---|
```

**Ranger ground rules** (battle-tested across 105+ sessions):

1. Each voice runs as an **independent agent** -- never single-agent role-play
2. Prompts are **neutral** -- no arguments for/against any option
3. Memory **loads before every session** (validated principles, dead directions)
4. Session logs are **full discussions, never summaries** -- the reasoning IS the value
5. Memory updates happen **same-turn**, not deferred to wrap-up
6. Anti-rationalization tables in every ranger skill
7. The human has **final say**. Rangers advise, they don't decide.

**Extension triggers:**

| Extension | Trigger | What it does |
|---|---|---|
| Domain-specific ranger | Generic ranger gives mediocre advice on technical questions | 5 specialist roles with domain lenses |
| Personas | Need to validate consumer product decisions | Demographic personas react, strategists synthesize |
| Design team | UI debates need structured input | Domain-specific design voices debate layout, components |

---

## Common Anti-Patterns

1. **The mega-file.** A 630-line file mixing vision + architecture + decisions. Three audiences, one file. Split by audience.
2. **Unstructured note dumps.** 5,000+ lines across NOTES files with zero structure. Distill immediately.
3. **Session ritual reads everything.** Reading 7+ files at session start eats context. Layer 1 should be 7 files max.
4. **HANDOFF.md becomes a dump.** Without migration rules, guardrails accumulate forever.
5. **No doc sync automation.** Docs go stale within 2 sessions without PostToolUse hooks.
6. **Platform gotchas with no owner.** Every gotcha should live in the skill it affects (skill memory) or in CLAUDE.md if it's universal. Orphaned gotchas get lost.
7. **Multiple agents, no catch-up.** `/catch-up` exists to detect undocumented changes.
8. **Building a gate then skipping it.** The dopamine of shipping a skill replaces the discipline of using it. After building any quality gate, run it on the very next piece of work.
9. **Trusting agent reports without verification.** Sub-agents, research agents, and tool outputs can hallucinate. Verify directory structures, file contents, and claims before presenting them as fact.
