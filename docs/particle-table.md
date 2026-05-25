# Particle Table: PlanMovies x Agent Collider

> **Purpose:** Maps every Agent Collider particle to its PlanMovies implementation status.
> **Read:** When understanding WHY a scaffold file exists, or evaluating particle coverage.
> **Source:** Agent Collider (46 capability particles + 8 document particles).

---

## Status Key

- **active** -- implemented and exercised in this project
- **present** -- file/skill exists but not yet used
- **extension** -- available with minimal setup
- **external** -- handled by the hosting platform

---

## Memory (8 particles)

| Particle | Implementation | Status |
|---|---|---|
| Versioned Memory | All .md files git-tracked | present |
| Scoped Memory | memory/ directory | present |
| Source of Truth | One Owner principle in CLAUDE.md | present |
| Session Checkpoint | HANDOFF.md | present |
| Private Memory | .claude/ directory | present |
| Permanent Log | memory/YYYY-MM-DD.md session logs | present |
| Staleness Score | /declutter cadence-based decay | present |
| Cleanup Rules | Per-file caps, /declutter | present |

## Retrieval (4 particles)

| Particle | Implementation | Status |
|---|---|---|
| Search Rules | qmd search protocol | extension |
| Just-in-Time Memory | PreToolUse context hooks | present |
| Shared Knowledge Graph | qmd collections + markdown cross-refs | extension |
| Knowledge Intake | Session logs -> MEMORY.md distillation | present |

## Security (8 particles)

| Particle | Implementation | Status |
|---|---|---|
| Excuse Blocker | Anti-rationalization tables in skills | present |
| Hard Guardrails | PreToolUse blocker hook | present |
| Authority Separation | SECURITY.md | present |
| Human Approval | Irreversibility Rule in SECURITY.md | present |
| Output Proof | /wrap-up verification phase | present |
| Trust Boundary | SECURITY.md trust boundaries | present |
| Task Sandbox | git worktrees | extension |
| Write Access | Skill frontmatter paths field | external |

## Skills (3 particles)

| Particle | Implementation | Status |
|---|---|---|
| Skill Card | .claude/skills/*/SKILL.md with YAML frontmatter | present |
| Skill Routing | Claude Code triggers + description matching | external |
| Skill Extraction | /wrap-up skill extraction check | present |

## Soul (3 particles)

| Particle | Implementation | Status |
|---|---|---|
| Identity Layer | SOUL.md | present |
| Voice Routing | VOICE.md + council system | present |
| Identity Drift | PreToolUse guard on core identity files | present |

## Reasoning (7 particles)

| Particle | Implementation | Status |
|---|---|---|
| Reasoning Blueprint | Skill SKILL.md step-by-step procedures | present |
| Output Parser | Claude Code tool-use protocol | external |
| Context Budget | 4-layer memory + file size caps | present |
| Blind Spot Check | /council peer review + /emergent-scan | present |
| Goal Chain | TODO.md + The Constraint in SOUL.md | present |
| Contradiction Resolution | One Owner principle | present |
| Reasoning Budget | model: routing in skill frontmatter | present |

## Will (3 particles)

| Particle | Implementation | Status |
|---|---|---|
| Intent Detection | Skill triggers in frontmatter | present |
| Trigger Condition | WILL.md Active Jobs | present |
| Scheduled Task | ticket-monitor Cloudflare Worker cron | active |

## Coordination (6 particles)

| Particle | Implementation | Status |
|---|---|---|
| Tool Card | TOOLS.md | present |
| Parallel Dispatch | /council independent voices | present |
| Messaging Gateway | infra/message.sh + Telegram | present |
| Shared Workspace | Git repo with shared .md files | present |
| Shared World | Cloudflare Worker + KV | extension |
| Background Agent | WILL.md + ticket-monitor Worker | active |

## Learning (4 particles)

| Particle | Implementation | Status |
|---|---|---|
| Learning Loop | /learn three-layer flywheel | present |
| Self-Reflection | /wrap-up output proof | present |
| Learned Rule | CLAUDE.md Top Mistake Patterns | present |
| Knowledge Refinery | MEMORY.md hot/warm/cold tiers | present |

---

## Scorecard

| Column | Particles | Active | Present | Extension | External |
|---|---|---|---|---|---|
| Memory | 8 | 0 | 8 | 0 | 0 |
| Retrieval | 4 | 0 | 2 | 2 | 0 |
| Security | 8 | 0 | 6 | 1 | 1 |
| Skills | 3 | 0 | 2 | 0 | 1 |
| Soul | 3 | 0 | 3 | 0 | 0 |
| Reasoning | 7 | 0 | 6 | 0 | 1 |
| Will | 3 | 1 | 2 | 0 | 0 |
| Coordination | 6 | 1 | 3 | 1 | 0 |
| Learning | 4 | 0 | 4 | 0 | 0 |
| **Total** | **46** | **2** | **36** | **4** | **3** |

Most particles are "present" at scaffold time. They become "active" as the project uses them. Update at /wrap-up when a particle's status changes.

---

*Scaffolded 2026-05-25 from Zordon v6.4.*
