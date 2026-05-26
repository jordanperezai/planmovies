# Principles & Architecture — Zordon Scaffold v6.2

> **Purpose:** Design principles and memory architecture that inform the scaffold steps.
> **Read:** Once, for understanding. The steps in SKILL.md implement these.
> **Not for:** Step-by-step instructions (-> SKILL.md).

---

## Principles (Sessions 1-110)

### One Owner + Pointers
Every rule, fact, or decision lives in ONE file (the **owner**). Other files reference with a one-line pointer. When the rule changes, update the owner -- pointers stay valid. This is the #1 thing most AI-assisted codebases get wrong.

| What kind of knowledge | Owner file |
|---|---|
| Mechanical rules for the agent | `CLAUDE.md` |
| Agent identity, principles, failure modes | `SOUL.md` |
| How the agent sounds: archetype, register, vocabulary, rhythm | `VOICE.md` |
| Who the user is, preferences | `USER.md` |
| Current session state | `HANDOFF.md` |
| Durable cross-session knowledge | `MEMORY.md` |
| Mistakes -> permanent rules | `LEARNINGS.md` |
| Goals and priorities | `TODO.md` |
| Product vision (if SOUL.md outgrows scope) | `VISION.md` |
| Platform quirks, skill-specific gotchas | Skill memory (`.claude/skills/<name>/memory.md`) |
| Recurring decision frameworks | `CLAUDE.md` Decision Rules, ranger memory, or skill memory |

### Session Files = Full Discussion
Never summarize ranger/advisor responses in session files. The reasoning IS the value. Future sessions build on reasoning, not just conclusions.

### File Casing
Root `.md` = CAPITALIZED (CLAUDE.md, SOUL.md). Subdirectory `.md` = lowercase-hyphens (rangers/brand/memory.md).

### Edit & Context Discipline
Bake these into CLAUDE.md from day one:
- **File read budget:** Files over 500 LOC -> read in chunks with offset/limit
- **Edit integrity:** Re-read target section before and after every edit
- **Post-merge verification:** After any git merge/checkout/stash pop, re-read every modified file. Merges silently revert uncommitted edits.
- **Context decay:** After 10+ messages, treat file memory as suspect. Re-read before editing.
- **Phased execution:** Changes touching 5+ files -> break into phases. Each must build.
- **Verification before done:** Never report done without running the build.

### The Narrowing Funnel
When exploring creative/strategic/naming directions: log every direction tried, why rejected, what it taught. Each rejection narrows the space. Prevents re-exploring dead ends across sessions.

### Every File Does ONE Job
When you feel a file getting long, ask: "Is this doing two jobs?" If yes, split it.

### File Size Discipline
Every file has a cap. When exceeded, split or prune.
- CLAUDE.md, SOUL.md, VOICE.md, USER.md, SECURITY.md, WILL.md: 250 lines
- HANDOFF.md: 150 lines
- MEMORY.md: 200 lines
- TOOLS.md: 150 lines
- MAP.md: 500 lines
- LEARNINGS.md: 15 active entries
- TODO.md: 15 items
- Ranger memory: 20 entries

### Guardrail Migration
HANDOFF.md "Things NOT to Do" items that survive 3+ sessions migrate to their real owner:
- Bug-derived rules -> LEARNINGS.md
- Platform facts -> skill memory or CLAUDE.md
- Product decisions -> SOUL.md
- User preferences -> USER.md

### Decay Mechanisms
Every append-only file needs: **cap, decay, or migrate.**
- **HANDOFF.md:** Guardrail migration (above)
- **MEMORY.md:** Hot/warm/cold -- monthly: active -> reference (30-90d) -> archived (>90d)
- **LEARNINGS.md:** <=15 active entries, rules enforced elsewhere get archived
- **Skill memory:** 20-entry cap, entries >60 days flagged for re-verification
- **bugs/CLAUDE.md:** [fixed] bugs archive after 30 days
- **TODO.md:** Completed items collapse. Done items >30 days pruned.
- **Ranger memory:** 20-entry cap with staleness eviction at 60 days

### Ranger Independence (Sessions 63-66)
All ranger and persona runs MUST use independent agents, not single-agent simulation. Each voice gets its own agent call with no knowledge of what the others said.

### Neutral Prompts (Sessions 63-66)
Never frame ranger or persona prompts with arguments for/against any option. Present the question, the context, and the options -- nothing else.

### Two-Source Minimum
Concept pages require 2+ sessions of evidence. MEMORY.md entries are fine from one session.

### Auto-Memory Complements Markdown Memory
Claude Code's auto-memory at `.claude/projects/*/memory/` handles reactive corrections; MEMORY.md handles proactive knowledge. Both systems together give reactive + proactive memory.

### Never Suggest Stopping
The agent never suggests stopping, sleeping, or wrapping up. The user decides when sessions end.

---

## The Architecture

### 4-Layer Memory

```
Layer 0 (identity -- immutable, edits require LEARNINGS.md justification):
  CLAUDE.md     -- mechanical rules, commands, edit discipline

Layer 1 (always loaded -- read every session):
  SOUL.md       -- agent identity, The Constraint, failure modes (WHO the agent is)
  VOICE.md      -- how the agent sounds: archetype, register, Kill List, canonical samples
  USER.md       -- who the human is, communication preferences
  MEMORY.md     -- distilled truths index; pointers only, ~150 chars/line
  HANDOFF.md    -- where we left off, next actions, what NOT to do
  LEARNINGS.md  -- mistake log + extracted rules
  TODO.md       -- goal tracker

Layer 2 (on-demand -- read before touching specific areas):
  SECURITY.md     -- authority separation, blocker rules, irreversibility
  WILL.md         -- autonomous operations (if applicable)
  TOOLS.md        -- what's in production
  MAP.md          -- system map, data flow
  + extensions as needed (DESIGN.md, ARCHITECTURE.md, etc.)

Layer 3 (write-only -- grepped, never fully read):
  memory/YYYY-MM-DD.md -- raw session logs
```

### Three-Layer Self-Improvement System

```
Mistake happens
    |
    v
/learn fires
    |
    +---> LEARNINGS.md (reactive -- logs the mistake)
    +---> Skill anti-rationalization table (preventive -- injects into the skill)
    +---> Ranger memory flag (strategic -- flags blind spots)
    v
CLAUDE.md "Top Mistake Patterns" (always-loaded -- survives compaction)
```

Companion: verification -- ground-truth checks. Every "done" gets a matching "prove it."
Companion: `/log-bug` -- code defects in `bugs/` (distinct from agent mistakes in LEARNINGS.md).
