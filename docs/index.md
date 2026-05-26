# Docs -- Why the Scaffold Looks Like This

> **Purpose:** The intellectual backing behind the scaffold. The scaffold works without reading these. These explain WHY it works.

## Particle Table

**Start here.** The scaffold implements 41 of 46 irreducible agent building blocks identified by the [Agent Collider](https://agent-collider.vercel.app) -- using only markdown, git, and shell hooks.

| Doc | What it answers |
|---|---|
| [Particle Table](particle-table.md) | Which particle maps to which scaffold file/skill. 41 of 46 particles mapped. |

## Syntheses

Twenty foundational docs explain the research behind the scaffold's design decisions. Each cross-references multiple framework analyses from the Alpha Vault.

### Core Architecture

| Synthesis | What it says |
|---|---|
| [Gate-first architecture](why/why-every-check-must-block.md) | Detection without enforcement is failure. Every check must gate or be removed. |
| [Layered memory with reflection](why/why-memory-has-layers.md) | 4-layer memory model. Identity is immutable. Facts decay. |
| [Security as authority separation](why/why-cognition-isnt-execution.md) | Cognition is not execution. Denylist + irreversibility gates. |

### What Makes Zordon Different

| Synthesis | What it says |
|---|---|
| [Voice separation](why/why-voice-is-separate.md) | WHO the agent is (SOUL.md) vs HOW it sounds (VOICE.md). Three independent projects converged on this. |
| [The execution loop](why/why-six-steps.md) | STOP/SEE/LOVE/DISCERN/ACT/RELEASE. Each step prevents a specific failure mode. Irreducible. |
| [Knowledge graph memory](why/why-memory-becomes-a-graph.md) | MEMORY.md becomes a knowledge graph over time. Cadence-based decay. Progressive disclosure. Zero infrastructure. |
| [Anti-rationalization tables](why/why-name-the-lie.md) | Pre-written rebuttals against self-deception. The preventive layer. No other framework has this. |
| [Rule placement hierarchy](why/why-rules-need-three-points.md) | Rules with 1 reinforcement point get forgotten. Rules with 3+ stick. Where to place rules for compliance. |
| [Skill-to-hook escalation](why/why-skills-become-hooks.md) | The enforcement ladder: convention -> owner file -> skill -> hook -> blocker. Manual detection, automatic enforcement. |
| [Autonomous skills need proof](why/why-autonomous-skills-need-proof.md) | The 4th rung: skills that run between sessions with authorization, proof capture, and notification. No other framework does this. |
| [Cross-layer memory flow](why/why-memory-flows-between-layers.md) | Skill memory, ranger memory, and project memory flow between layers via triage heuristics. No infrastructure. |
| [Session handoff](why/why-session-handoff-beats-bigger-context.md) | A bigger context window delays forgetting. A handoff file prevents it. Six frameworks converged on the same pattern. |
| [Constraint ordering](why/why-constraint-ordering-prevents-drift.md) | Sequential priorities prevent drift. The Constraint is four lines that fire on every interaction. |
| [Rangers use real people](why/why-rangers-use-real-people.md) | Real public figures as fictional advisors. Anti-sycophancy measures. Personas for perspective, not facts. |
| [Rangers need independent verification](why/why-rangers-need-independent-verification.md) | Five voices sharing one context is one voice with five hats. Proven by Agent Collider Session 63. Neutral prompts, verifier voices, diverse evidence. |

### Ecosystem

| Synthesis | What it says |
|---|---|
| [Smart environment, not smart agent](why/why-smart-environment-not-smart-agent.md) | The value isn't in the AI. It's in the environment the AI walks into. Models are disposable. The environment compounds. |
| [The markdown-native framework](why/why-files-are-the-framework.md) | Why files are the framework. No runtime. No database. What it means and why nobody else built it. |
| [The research arm pattern](why/why-ship-a-research-arm.md) | First framework that ships with its own research layer. Framework improves because the research improves. |
| [File structure is taxonomy](why/why-file-structure-is-taxonomy.md) | 8 document archetypes extracted by collision. Same methodology as the Agent Collider. Structure is classification, not style. |
| [Skills need an adapter](why/why-skills-need-an-adapter.md) | AGENTS.md tells IDE agents who the project is. The skill adapter tells CLI agents how to run the skills. Together, Zordon is runtime-agnostic. |

## The Ecosystem

```
Alpha Vault (private research) -> discovers patterns from 559+ sources
    |
    v
Zordon (this repo)             -> implements patterns as zero-dep scaffold
    |
    v
Your projects                   -> battle-test patterns, find gaps
    |
    v
Alpha Vault                    -> discovers what to research next
```

**Agent Collider** sits alongside this loop as the independent taxonomy -- 46 named particles that every framework either implements or doesn't.
