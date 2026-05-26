# Why memory has layers

## The problem

An AI agent that loads everything into one flat file drifts. Temporary session notes sit next to permanent identity. A workaround from last Tuesday ages into a "rule." Stale facts consume context budget and crowd out what matters right now.

Mixing memory types causes drift. That is the core failure mode.

## Three principles

**Memory has layers.** Different layers need different write rules, read cadences, and retrieval patterns. Identity files change rarely. Distilled truths change weekly. Session logs are written once and never loaded wholesale.

**Persistent identity is immutable ground truth.** The agent needs a cognitive spine that survives context loss. Not a bigger context window. A small, always-loaded core that defines who this agent is and how it operates.

**Memory decays.** Facts age. Recently touched, high-signal facts stay hot. Old, low-access facts drop to warm, then cold. Without decay, the agent carries stale context into fresh work.

## What Zordon ships

Three layers, each with distinct access semantics.

**Layer 1 (always loaded).** CLAUDE.md, SOUL.md, VOICE.md, USER.md, MEMORY.md, HANDOFF.md, LEARNINGS.md, TODO.md. This is the cognitive spine. Identity lives here. Edits to CLAUDE.md require a LEARNINGS.md entry justifying the change, because temporary rules written into identity become permanent by accident.

**Layer 2 (on-demand).** SECURITY.md, WILL.md, TOOLS.md, MAP.md, extensions. Loaded when the task requires it. Not read at boot.

**Layer 3 (write-only).** Session logs at `memory/YYYY-MM-DD.md`. Written at wrap-up, never bulk-loaded. The raw episodic record.

The shape maps to PARA (Projects, Areas, Resources, Archives) if you want a label for it. Layer 1 is Areas. Layer 2 is Resources. Layer 3 is Archives. Active projects live in TODO.md.

## Why decay matters

MEMORY.md uses three buckets: hot (active, under 30 days), warm (reference, 30 to 90 days), cold (archived, over 90 days, grepped not read). No infrastructure. A convention. Migrations happen at monthly distillation via `/declutter`.

Without decay, MEMORY.md grows until it crowds out the identity files that matter more. Every fact in Layer 1 competes for the same context budget.

## What the knowledge graph adds

When memory entries cluster around a topic, they get extracted into `memory/topics/`. Each topic file is a standalone reference linked with wikilinks. This is Layer 3.5. It grows organically as the agent works.

The knowledge graph solves a specific problem: distilled truths (Layer 1) are flat. They don't capture relationships between concepts. Topic files do.

## Why wrap-up distills memory

The `/wrap-up` skill includes a reflection step. It reads the session log and git history, classifies what the session produced, and proposes durable memory entries for MEMORY.md. The agent proposes, the human approves.

This closes the episodic-to-semantic loop. Without it, session logs accumulate but never become reusable knowledge. The agent forgets what it learned.
