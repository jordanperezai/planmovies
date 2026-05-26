# Architecture

> **Purpose:** The science, inspirations, and structural decisions behind Zordon.
> **Read:** When evaluating Zordon against other frameworks or understanding why a design choice was made.

## The Particle System

The scaffold implements **41 of 46 irreducible agent building blocks** identified by the [Agent Collider](https://agent-collider.vercel.app), a periodic table of AI agent primitives extracted from 573+ open-source frameworks.

Particles are the parts. **13 bonds** are the connections between them (required interdependencies that break if severed). **7 molecules** are multi-particle patterns that create emergent capabilities no single particle provides.

| Level | Count | What it is | Example |
|---|---|---|---|
| Particle | 46 (41 shipped) | Irreducible building block | Session Checkpoint = HANDOFF.md |
| Bond | 13 | Required connection between particles | Captured Insight = /wrap-up triggers /learn |
| Molecule | 7 | Multi-particle pattern, emergent capability | Verified Autonomy = auto-skill.sh chains schedule + proof + notify |

Every project gets a `particle-table.md` showing which particles are active, present, or external. `/collider-smash` verifies all three levels monthly.

### Particle Map

| Scaffold file | Particle it implements |
|---|---|
| SOUL.md + VOICE.md + CLAUDE.md | Identity Layer (separate WHO from HOW from WHAT) |
| SECURITY.md + blocker hook | Hard Guardrails (code-enforced, not English) |
| Context-guard hook (organic) | Identity Drift (detect slow personality changes) |
| /learn | Learning Loop (closed-loop improvement cycle) |
| LEARNINGS.md | Learned Rule (recurring mistakes become permanent rules) |
| HANDOFF.md | Session Checkpoint (bookmark before interruption) |
| memory/ + MEMORY.md + topics/ | Knowledge Refinery (raw to distilled to graph) |
| PreToolUse hooks | Just-in-Time Memory (right knowledge at the right moment) |
| Anti-rationalization tables | Excuse Blocker (pre-written rebuttals against self-deception) |
| /emergent-scan | Blind Spot Check (find what everyone missed) |
| WILL.md + auto-skill.sh | Scheduled Task + Trigger Condition (autonomous operations) |
| infra/message.sh | Messaging Gateway (one-way notifications) |

Full table: [particle-table.md](particle-table.md)

4 particles are handled by the hosting platform (Claude Code provides write access control, output parsing, skill routing, and tool interfaces). 1 extension (Shared World via Cloudflare Worker + KV) unlocks with minimal setup.

## Inspirations

| Pattern | Inspired by | What we changed |
|---|---|---|
| Smart environment | [Alpha Vault](https://github.com/jordanperezai/alpha-vault) | Build the environment, not the agent. Models are disposable. The room compounds. |
| 4-layer memory | [Letta/MemGPT](https://github.com/letta-ai/letta) | File-based instead of vector DB. Layer 0 (immutable) separated from Layer 1 (mutable). |
| Adversarial rangers | [karpathy/llm-council](https://github.com/karpathy/llm-council) | Independent agents per voice. Neutral prompts. Self-improving memory. Real people as advisors. |
| Skill crystallization | [Hermes Agent](https://github.com/NousResearch/hermes-agent) + [GenericAgent](https://github.com/lsdefine/GenericAgent) | Markdown instead of Python runtime. Escalation ladder. |
| Gate-first architecture | 140+ session logs over 4 months | Every check must gate or be removed. Output proof gates the learning loop. |
| Voice separation | [soul.md](https://github.com/aaronjmars/soul.md) + Hermes + OpenClaw | Three independent projects converged. VOICE.md is core, not extension. |
| Cadence-based decay | [modular-context-obsidian](https://github.com/prdx-ai/modular-context-obsidian) | hot/tactical/stable/frozen instead of uniform 30/90 day windows. |
| Authority separation | Security-first agent research | SECURITY.md + PreToolUse hook instead of container isolation. |
| Structural verification | [Agent Collider](https://agent-collider.vercel.app) | /collider-smash verifies particles, bonds, and molecules. |

## File Casing Convention

**Root `.md` files** = CAPITALIZED (CLAUDE.md, SOUL.md, MEMORY.md).

**Subdirectory `.md` files** = lowercase-hyphens (docs/particle-table.md, rangers/design/memory.md).

**Two exceptions** that stay CAPITALIZED in subdirectories:
- `CLAUDE.md` -- auto-loaded by Claude Code from any directory
- `SKILL.md` -- Claude Code skill convention

Only the root gets a `README.md` (project landing page for humans). Subdirectories use `CLAUDE.md` for agent instructions.

## Deep Reading

21 essays explain the research behind every design decision:

- **[Smart environment, not smart agent](why/why-smart-environment-not-smart-agent.md)**
- **[The markdown-native framework](why/why-files-are-the-framework.md)**
- **[Gate-first architecture](why/why-every-check-must-block.md)**
- **[Layered memory with reflection](why/why-memory-has-layers.md)**
- **[Security as authority separation](why/why-cognition-isnt-execution.md)**
- **[Voice separation](why/why-voice-is-separate.md)**
- **[The execution loop](why/why-six-steps.md)**
- **[Knowledge graph memory](why/why-memory-becomes-a-graph.md)**
- **[Anti-rationalization tables](why/why-name-the-lie.md)**
- **[Rule placement hierarchy](why/why-rules-need-three-points.md)**
- **[Skill-to-hook escalation](why/why-skills-become-hooks.md)**
- **[Cross-layer memory flow](why/why-memory-flows-between-layers.md)**
- **[Session handoff](why/why-session-handoff-beats-bigger-context.md)**
- **[Constraint ordering](why/why-constraint-ordering-prevents-drift.md)**
- **[Rangers use real people](why/why-rangers-use-real-people.md)**
- **[Rangers need independent verification](why/why-rangers-need-independent-verification.md)**
- **[The research arm pattern](why/why-ship-a-research-arm.md)**
- **[File structure is taxonomy](why/why-file-structure-is-taxonomy.md)**
- **[Semantic search for agents](why/why-agents-need-semantic-search.md)**
- **[Autonomous skills need proof](why/why-autonomous-skills-need-proof.md)**
- **[Skills need an adapter](why/why-skills-need-an-adapter.md)**
