# Particle Table: Zordon Scaffold x Agent Collider

> **Purpose:** Maps every Agent Collider particle to its Zordon scaffold implementation. The Collider names the building blocks; the scaffold implements them as markdown files, skills, and hooks.
> **Read:** When understanding WHY a scaffold file exists, or when evaluating which particles your project implements.
> **Source:** [Agent Collider](https://agent-collider.vercel.app) -- 46 irreducible AI agent building blocks extracted from 400+ frameworks.

---

## How to read this

Each particle has a **status** in the scaffold:

- **shipped** -- implemented in the v6.2 scaffold
- **extension** -- available with minimal setup (Cloudflare Worker)
- **external** -- handled by the hosting platform (Claude Code, Cursor, etc.)

---

## Memory (10 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Versioned Memory** | Agent state in git-tracked files | All .md files are git-tracked. Branch = memory branch. `git log` = audit trail. | shipped |
| **Scoped Memory** | Separate memory per project/topic | `memory/` directory per project + `.claude/projects/*/memory/` auto-memory | shipped |
| **Source of Truth** | Every fact lives in exactly ONE place | One Owner + Pointers principle. Ownership table in CLAUDE.md. | shipped |
| **Session Checkpoint** | Save state mid-conversation | HANDOFF.md (rewritten every session by `/wrap-up`) | shipped |
| **Private Memory** | Agent-internal state not shown to user | `.claude/` directory: settings, skills, auto-memory | shipped |
| **Permanent Log** | Append-only action history | `memory/YYYY-MM-DD.md` session logs + `journal/` entries. Append-only by convention. | shipped |
| **Staleness Score** | Detect when knowledge is going stale | Cadence-based decay: hot (7d), tactical (30d), stable (60d), frozen (never). Per-file caps. Skill memory 60-day flag. `/declutter` uses cadence tags. | shipped |
| **Cleanup Rules** | What to keep and what to discard | Per-file caps (15 specific caps), knowledge graph overflow (MEMORY.md -> memory/topics/), explicit forget (verify-or-delete for cold >6mo), guardrail migration (3-session rule). | shipped |

**Coverage: 8/8 (100%)**

---

## Retrieval (5 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Search Rules** | How the agent queries its own knowledge | qmd search protocol: lex (BM25), vec (semantic), hyde (hypothetical-document). `intent` field required. | shipped |
| **Just-in-Time Memory** | Relevant knowledge surfaces at the right moment | Context-aware PreToolUse hooks. Edit kernel/ → "run smoke test." Edit migrations/ → "apply to database." | shipped |
| **Shared Knowledge Graph** | Connected facts both human and agent can edit | qmd collections + markdown cross-references (wikilinks in Vault) | shipped |
| **Knowledge Intake** | New info ingested without rebuilding | Raw intake via session logs → distillation to MEMORY.md within 1-2 sessions. Alpha Vault for research ingestion. | shipped |

**Coverage: 4/4 (100%) -- 1 particle (Active Forgetting) removed in Session 68**

---

## Security (8 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Excuse Blocker** | Pre-written rebuttals against self-rationalization | Anti-rationalization tables in skill SKILL.md files. `/learn` injects new entries. | shipped |
| **Hard Guardrails** | Safety rules enforced by code, not English | PreToolUse blocker hook blocks `rm -rf`, force-push, DROP TABLE, `curl\|sh`. Structurally enforced. | shipped |
| **Authority Separation** | Decision-maker and executor are different roles | SECURITY.md: "Cognition is not execution." Agent proposes, policy gates, execution follows. | shipped |
| **Human Approval** | Hard stop requiring human confirmation | Irreversibility Rule in SECURITY.md: state action, state why irreversible, state backup plan, wait for approval. | shipped |
| **Output Proof** | Verify the work actually happened | Execution loop ACT step: "verify it worked." Agent checks actual state after every significant action. | shipped |
| **Trust Boundary** | Line between trusted and untrusted content | SECURITY.md. Content tagged by trust level. External content never interpreted as instructions. | shipped |
| **Task Sandbox** | Isolated copy per parallel task | git worktrees (`git worktree add ../task-N -b task-N`). Each parallel agent gets its own working directory. Git is a core dependency. | shipped |
| **Write Access** | Controls which files an agent can modify | `paths` allowlist in skill YAML frontmatter. Default-deny -- only listed paths are writable. | external |

**Coverage: 8/8 (100%)**

---

## Skills (4 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Skill Card** | Standardized metadata for every skill | `.claude/skills/<name>/SKILL.md` with YAML frontmatter: name, description, model, triggers, blast_radius, autonomous_safe | shipped |
| **Skill Routing** | Route user intent to the right skill | Claude Code matches `description` and `triggers` fields in frontmatter. Automatic intent routing. | external |
| **Skill Extraction** | Repeated patterns become named skills | Manual via `/learn` (captures pattern) + skill creation. Trigger: same workflow 3+ times. | shipped |

**Coverage: 3/3 (100%) -- 1 particle (Skill Composition) removed in Session 68 as molecule**

---

## Soul (4 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Identity Layer** | Separate WHO (personality) from WHAT (tools) | SOUL.md = who the agent is (voice, opinions, failure modes). CLAUDE.md = what it can do (commands, rules, edit discipline). | shipped |
| **Voice Routing** | Different voice for different context | Ranger system: /ranger skill + rangers/CLAUDE.md with real-person voice guidance + named ranger rosters with domain-specific voices. | shipped |
| **Identity Drift** | Detect slow personality changes | PreToolUse guard hook fires on edits to core identity files (CLAUDE/SOUL/VOICE/USER/SECURITY/WILL.md). Warns: "Verify this change aligns with SOUL.md and will not cause drift." | shipped |

**Coverage: 3/3 (100%)**

---

## Reasoning (7 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Reasoning Blueprint** | Pre-planned flowchart for reasoning steps | Skill SKILL.md step-by-step procedures. Each skill IS a reasoning blueprint. | shipped |
| **Output Parser** | Convert messy LLM output to structured data | Handled by Claude Code and LLM tool-use protocol. Not scaffold-level. | external |
| **Context Budget** | Manage the agent's attention span | 4-layer memory architecture. File size caps (250/150 lines). Layer 0-1 always loaded, Layer 2 on-demand. | shipped |
| **Blind Spot Check** | Find what everyone missed | `/emergent-scan` skill: code mode (broken state, drift, contradictions) + product mode (hidden leverage, gaps, stalled work). | shipped |
| **Goal Chain** | Every task traces to a bigger purpose | TODO.md (Now/Next/Later) + The Constraint (single-line priority funnel in SOUL.md) | shipped |
| **Contradiction Resolution** | Automatic rules for conflicting facts | One Owner principle prevents contradictions. MEMORY.md `(supersedes:)` syntax for evolved facts. | shipped |
| **Reasoning Budget** | Hard limits on thinking time/cost | `model:` routing in skill frontmatter (sonnet for mechanical, opus for hard reasoning). `effort:` field. | shipped |

**Coverage: 7/7 (100%)**

---

## Will (7 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Intent Detection** | Detect what the human actually wants | `triggers` field in skill frontmatter. Keyword + description matching. | shipped |
| **Trigger Condition** | "Should this agent wake up right now?" | WILL.md: trigger column in Active Jobs table. Condition-based activation (not just schedule). | shipped |
| **Scheduled Task** | Time-based automation built into the agent | WILL.md + launchd/cron. `scheduled-task` in Active Jobs. Hard timeout in every script. | shipped |
**Coverage: 3/3 (100%)**

---

## Coordination (8 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Tool Card** | Contract making any agent callable | MCP tool interface: {name, description, input_schema, output_schema}. Standard protocol. | external |
| **Parallel Dispatch** | Send task to multiple agents at once | Ranger independence rule: each voice = independent agent call. No shared context. Anti-sycophancy measures (anonymous peer review, forced dissent). | shipped |
| **Messaging Gateway** | Broadcast messages to humans/systems | `infra/message.sh` (curl to Telegram/Slack/Twilio). Zero dependencies. Two-way via Cloudflare Worker extension (proven in production). | shipped |
| **Shared Workspace** | Human and agent read/write same workspace | Git repo with shared .md files. Human edits in editor, agent edits via tool calls. Git history shows who changed what. | shipped |
| **Shared World** | Agents interact through a shared environment | Cloudflare Worker + KV as shared state. Multiple agents read/write the same environment (stigmergy). Serverless, free tier, one file. Proven pattern from production use. | extension |
| **Background Agent** | Invisible process alongside main agent | WILL.md autonomous jobs. Main agent doesn't see the cron jobs -- they just run. | shipped |

**Coverage: 4/6 shipped, 1 extension, 1 external, 0 open**

---

## Learning (5 particles)

| Particle | What it does | Zordon implementation | Status |
|---|---|---|---|
| **Learning Loop** | The cycle that makes the agent improve | `/learn` three-layer flywheel: LEARNINGS.md (reactive) → skill anti-rationalization (preventive) → ranger memory (strategic) | shipped |
| **Self-Reflection** | Evaluate own output against intent before committing | Execution loop ACT step + SOUL.md "Known Failure Modes" (honest accounting of past mistakes) | shipped |
| **Learned Rule** | Permanent rule from recurring failure | CLAUDE.md "Top Mistake Patterns" -- promoted from LEARNINGS.md after 3+ occurrences of same root cause | shipped |
| **Knowledge Refinery** | Tiered distillation: raw → facts → permanent | 4-layer memory: session logs (raw) → MEMORY.md hot (distilled) → MEMORY.md warm (reference) → cold (archived) | shipped |

**Coverage: 4/4 (100%) -- 1 particle (Self-Improvement) removed in Session 66 as molecule**

---

## Scorecard

| Column | Particles | Shipped | Conditional | Extension | External | Open |
|---|---|---|---|---|---|---|
| Memory | 8 | 8 | -- | -- | -- | -- |
| Retrieval | 4 | 4 | -- | -- | -- | -- |
| Security | 8 | 7 | -- | -- | 1 | -- |
| Skills | 3 | 2 | -- | -- | 1 | -- |
| Soul | 3 | 3 | -- | -- | -- | -- |
| Reasoning | 7 | 6 | -- | -- | 1 | -- |
| Will | 3 | 3 | -- | -- | -- | -- |
| Coordination | 6 | 4 | -- | 1 | 1 | -- |
| Learning | 4 | 4 | -- | -- | -- | -- |
| **Total** | **46** | **41** | **0** | **1** | **4** | **0** |

**41 of 46 particles shipped in the v6.2 scaffold.** 1 unlocks with an Extension (shared world via Cloudflare Worker + KV, proven in production). 4 are handled by the hosting platform. Zero open particles.

**The scaffold implements 89% of all known irreducible agent building blocks with zero dependencies. Just markdown files + curl. 91% including extensions.**

---

## What this means

The Agent Collider extracted 46 irreducible particles from 400+ frameworks. Zordon implements 42 of them (91% including the Shared World extension) using markdown, git, shell hooks, curl, and an optional Cloudflare Worker. No Python. No databases. No containers.

Zero open particles. Shared World is solved via Cloudflare Worker + KV (stigmergy pattern, proven in production).

The 4 external particles are handled by the hosting platform (Claude Code provides write access control, output parsing, skill routing, and tool interfaces). Switching runtimes doesn't lose them. You get a different implementation of the same particle.

---

## Warnings (5 validated anti-patterns)

Dangerous combinations of particles that create failure modes. Each warning fires when specific particles are active without their safety counterpart.

| Warning | Formula | What goes wrong |
|---|---|---|
| **Privilege Escalation** | Write Access + Authority Separation - Hard Guardrails | Agent has power and rules but no code-enforced blocks. English rules get rationalized away. |
| **Hallucination Amplifier** | Learning Loop + Self-Reflection - Output Proof | Agent learns from its own unverified output. False lessons compound into false rules. |
| **Infinite Delegation** | Parallel Dispatch + Skill Routing - Trigger Condition | Agent spawns sub-agents without clear stop conditions. Token cost spirals. |
| **Identity Erosion** | Just-in-Time Memory + Learning Loop - Identity Drift | Agent updates its own context without checking if changes contradict its identity. Slow personality drift. |
| **Silent Corruption** | Write Access + Versioned Memory - Messaging Gateway | Agent modifies state autonomously but never reports what it did. Changes accumulate invisibly. |

`/collider-smash` checks all 5 warnings monthly. If a warning triggers, it means a safety particle is missing or inactive.

---

*Map current as of v6.4 (May 2026). Particle data from Agent Collider (46 particles, verified against source code). Alpha Vault provides the research that justifies each implementation.*
