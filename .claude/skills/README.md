# .claude/skills/

Skills are repeatable workflows stored as SKILL.md files. Each skill is a directory with at least one file.

## Structure

```
.claude/skills/
  <skill-name>/
    SKILL.md         The skill definition (required)
    memory.md        What this skill has learned (optional, earned)
    references/      Supporting files the skill reads (optional)
```

## SKILL.md Format

Every SKILL.md starts with YAML frontmatter:

```yaml
---
name: skill-name
version: "1.0.0"
description: "One sentence describing what this skill does"
user-invocable: true
triggers:
  - "trigger phrase"
  - "/skill-name"
---
```

The body contains the workflow: when to use, steps, anti-rationalization table.

## Skill Memory

**Memory is earned, not seeded.** Do not create memory.md for a skill that hasn't run. Create it when the skill rediscovers the same fact twice. Most skills never need it.

Skills that earn memory are ones that learn from repeated use: deployment targets, client voice patterns, platform gotchas discovered during execution. If a skill runs 5 times and never produces a "remember this for next time" moment, it doesn't need memory.

### Skill Memory vs Council Memory vs Project Memory

Three memory layers. Each has its own files. No second source of truth.

| Layer | Location | What it stores | Cap |
|-------|----------|---------------|-----|
| **Project** | `MEMORY.md`, `LEARNINGS.md`, `memory/topics/` | Cross-cutting truths, session logs, knowledge graph | MEMORY.md: 200 lines. LEARNINGS: 15 entries. |
| **Council** | `councils/<name>/memory.md` | Domain principles, dead directions, voice calibration | 20 entries per council |
| **Skill** | `.claude/skills/<name>/memory.md` | Process patterns specific to that skill | 20 entries per skill |

**Flow direction:**
- **Up** (skill to council to project): When a skill discovers something that applies beyond that skill, promote it. The skill keeps the specific version. The higher layer gets the generalized version.
- **Down** (project to council to skill): When a project truth constrains a specific skill, add it to that skill's memory.
- **Lateral** (skill to council): When a council finding affects a skill, the council notes it. The skill picks it up on next run.

### When to Add Memory

| Signal | Action |
|--------|--------|
| Skill rediscovers the same fact | Create memory.md, add the fact |
| Skill hits a gotcha for the second time | Add to memory.md |
| A dead approach is tried again | Add to memory.md immediately (first occurrence, exception to "earned" rule) |
| Skill memory hits 20 entries | Evict oldest or promote to council/project memory |

## Running Skills

Inside Claude Code: type `/skill-name` or the trigger phrase.

From any CLI agent: use the skill adapter at `infra/skill-adapter.ts`. It discovers skills, resolves names from frontmatter, and builds prompts for any agent.

## Creating a New Skill

1. Create the directory: `.claude/skills/<name>/`
2. Create `SKILL.md` with frontmatter and workflow
3. Add an anti-rationalization table (excuses the agent tells itself to skip the skill)
4. Do NOT create memory.md yet. Let it be earned.
5. Add the skill to CLAUDE.md's skill list
