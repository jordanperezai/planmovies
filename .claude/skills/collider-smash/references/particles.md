# Particle Registry

> **Purpose:** Canonical list of all 46 capability particles and 8 document particles. The /collider-smash skill reads this file to know WHAT to verify.
> **Source:** Agent Collider (src/data/particles.ts). Particles extracted from 400+ frameworks.
> **Write:** When a new particle is discovered or a definition changes.

---

## How to read this

Each particle has:
- **Column**: which cognitive function it belongs to (Memory, Retrieval, Security, Skills, Soul, Reasoning, Will, Coordination, Learning)
- **Row**: when it operates (Setup, Live, Saved, Autonomous)
- **What it does**: one-sentence definition
- **Detection**: how to find it in a file system (from X-Ray rules)

---

## Capability Particles (46)

### Memory (8)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| versioned-memory | Versioned Memory | Setup | Agent state in git-tracked files | Git-tracked memory files |
| scoped-memory | Scoped Memory | Setup | Separate memory per project/topic | Per-project memory directories |
| source-of-truth | Source of Truth | Setup | Every fact lives in exactly one place | CLAUDE.md + MEMORY.md ownership pattern |
| session-checkpoint | Session Checkpoint | Live | Save state mid-conversation | HANDOFF.md |
| private-memory | Private Memory | Saved | Agent-internal state not shown to user | .claude/ directory |
| permanent-log | Permanent Log | Saved | Append-only action history | Dated session logs or LEARNINGS.md |
| staleness-score | Staleness Score | Autonomous | Detect when knowledge is going stale | Declutter skill (staleness management) |
| cleanup-rules | Cleanup Rules | Saved | What to keep and what to discard | Declutter or cleanup skill |

### Retrieval (4)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| search-protocol | Search Rules | Setup | How the agent queries its own knowledge | Query skill |
| context-surface | Just-in-Time Memory | Live | Relevant knowledge surfaces at the right moment | Hook-based context surfacing |
| shared-knowledge-graph | Shared Knowledge Graph | Saved | Connected facts both human and agent can edit | Wiki or knowledge graph directory |
| knowledge-intake | Knowledge Intake | Saved | New info ingested without rebuilding | Ingest skill |

### Security (8)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| pre-rebuttal | Excuse Blocker | Setup | Pre-written rebuttals against self-rationalization | Skill files (contain anti-rationalization tables) |
| hard-guardrails | Hard Guardrails | Setup | Safety rules enforced by code, not English | SECURITY.md or hook settings |
| authority-separation | Authority Separation | Live | Decision-maker and executor are different roles | SECURITY.md authority rules |
| human-approval | Human Approval | Live | Hard stop requiring human confirmation | WILL.md or SECURITY.md approval gates |
| output-proof | Output Proof | Live | Verify the work actually happened | Wrap-up skill (verification phase) |
| trust-boundary | Trust Boundary | Live | Line between trusted and untrusted content | SECURITY.md trust boundaries |
| task-sandbox | Task Sandbox | Autonomous | Isolated copy per parallel task | Sandbox config or WILL.md + SECURITY.md |
| write-access | Write Access | Autonomous | Controls which files an agent can modify | WILL.md (autonomous write authorization) |

### Skills (3)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| skill-card | Skill Card | Setup | Standardized metadata for every skill | Skill definition files |
| skill-routing | Skill Routing | Live | Route user intent to the right skill | Multiple skill files (routing between them) |
| skill-extraction | Skill Extraction | Saved | Repeated patterns become named skills | Wrap-up skill (skill extraction check) |

### Soul (3)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| identity-separation | Identity Layer | Setup | Separate WHO from WHAT | SOUL.md |
| voice-routing | Voice Routing | Live | Different voice for different context | VOICE.md |
| identity-drift-detection | Identity Drift | Saved | Detect slow personality changes | Tune skill or collider-smash |

### Reasoning (7)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| reasoning-blueprint | Reasoning Blueprint | Setup | Pre-planned flowchart for reasoning steps | SOUL.md execution loop + CLAUDE.md decision rules |
| output-parser | Output Parser | Live | Convert messy LLM output to structured data | External (handled by model) |
| context-budget | Context Budget | Live | Manage the agent's attention span | CLAUDE.md (context management rules) |
| gap-detection | Blind Spot Check | Live | Find what everyone missed | Council system (blind spot detection) |
| task-lineage | Goal Chain | Saved | Every task traces to a bigger purpose | TODO.md goal tracking |
| contradiction-resolution | Contradiction Resolution | Saved | Automatic rules for conflicting facts | Council skill (contradiction resolution) |
| reasoning-budget | Reasoning Budget | Autonomous | Hard limits on thinking time/cost | model: routing in skill frontmatter |

### Will (3)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| intent-detection | Intent Detection | Live | Detect what the human actually wants | Skill triggers or multiple skills with auto-activation |
| trigger-condition | Trigger Condition | Autonomous | "Should this agent wake up right now?" | WILL.md or scheduled task config |
| scheduled-task | Scheduled Task | Autonomous | Time-based automation built in | WILL.md autonomous jobs or cron config |

### Coordination (6)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| tool-interface | Tool Card | Setup | Contract making any agent callable | TOOLS.md or tools directory |
| parallel-dispatch | Parallel Dispatch | Live | Send task to multiple agents at once | Council system (multi-agent dispatch) |
| messaging-gateway | Messaging Gateway | Live | Broadcast messages to humans/systems | Messaging or notification system |
| shared-workspace | Shared Workspace | Saved | Human and agent read/write same workspace | MAP.md or shared workspace |
| shared-environment | Shared World | Autonomous | Agents interact through a shared environment | Shared rules directory |
| background-agent | Background Agent | Autonomous | Invisible process alongside main agent | Autonomous execution scripts |

### Learning (4)

| ID | Name | Row | What it does | Detection |
|---|---|---|---|---|
| learning-loop | Learning Loop | Setup | The cycle that makes the agent improve | LEARNINGS.md or learn skill |
| self-reflection | Self-Reflection | Live | Evaluate own output before committing | Journal entries or wrap-up skill |
| pattern-rule | Learned Rule | Saved | Permanent rule from recurring failure | LEARNINGS.md rules enforced in CLAUDE.md |
| refinement-tiers | Knowledge Refinery | Saved | Tiered distillation: raw to permanent | MEMORY.md (hot/warm/cold tiers) |

---

## Document Particles (8)

Three categories: Identity, Operational, Knowledge.

| ID | Name | Category | Stores | Changes |
|---|---|---|---|---|
| doc-identity | Identity File | Identity | WHO the agent is. Character, voice, values. | Rarely. Identity is the most stable layer. |
| doc-narrative | Narrative File | Identity | What it meant. Voice matters. Write-once. | Write-once. Journal entries and why docs. |
| doc-rule | Rule File | Operational | What the agent MUST and MUST NOT do. | Rarely. Every rule justified by evidence. |
| doc-state | State File | Operational | What's true RIGHT NOW. Status, next actions. | Every session. Fully rewritten, not appended. |
| doc-skill | Skill File | Operational | HOW to do a procedure. Metadata + steps. | When the skill evolves. |
| doc-index | Index File | Knowledge | What exists and where to find it. Pointers. | When knowledge changes. |
| doc-log | Log File | Knowledge | What happened. Append-only records. | Write-once. Never edit previous entries. |
| doc-reference | Reference File | Knowledge | Lookup tables and structured knowledge. | When taxonomy or architecture evolves. |

---

## Scorecard

| Column | Particles |
|---|---|
| Memory | 8 |
| Retrieval | 4 |
| Security | 8 |
| Skills | 3 |
| Soul | 3 |
| Reasoning | 7 |
| Will | 3 |
| Coordination | 6 |
| Learning | 4 |
| **Capability total** | **46** |
| Document archetypes | 8 |
| **Grand total** | **54** |

---

*Registry current as of May 2026. Particle definitions from Agent Collider (46 capability + 8 document, verified against src/data/particles.ts).*
