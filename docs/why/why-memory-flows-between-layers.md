# Why memory flows between layers

## The problem

Three memory layers exist: skill memory, ranger memory, project memory. Each one worked. None of them talked to each other.

A ranger discovers "harvest, not strain, is the canonical key." That fact lives in engineering ranger memory. The deploy skill doesn't know. The product-audit skill doesn't know. MEMORY.md doesn't know. The agent rediscovers the same thing next week from a different angle and writes it somewhere else.

Islands of memory. Each one accumulating. None of them flowing.

## Production evidence

One production project accumulated 15 skill memory files and 7 self-improving rangers. Another has 12 skill memories and 9 rangers. These evolved organically over dozens of sessions. The pattern works. Cross-layer flow was manual. A human had to notice that a ranger finding mattered to a skill, then copy it over. That doesn't scale past two projects.

## Research backing

The Agent Collider mapped self-improvement as a molecule of 4 irreducible particles: Learning Loop + Self-Reflection + Pattern Rule + Write Access. The "Water Molecule" (Skill + Skill Metadata + Self-Reflection) is the irreducible learning unit. Remove any one and the agent stops improving.

G-Memory (NeurIPS 2025) uses a three-tier hierarchy with bi-directional traversal. Knowledge flows UP (experiences become insights) and DOWN (insights inform queries). Result: 20.89% improvement in action success rates. The direction matters. Upward-only or downward-only both lose.

Cognee's memify operation: prune stale, strengthen frequent, reweight by usage, derive new facts. Memory that evolves, not accumulates.

## The triage heuristic

Every finding gets routed by one question: where does this belong?

- "This skill should always/never do X" → skill memory.
- "This domain has a principle or dead end" → ranger memory.
- "This is true across the project" → MEMORY.md.
- "This mistake could happen again" → LEARNINGS.md.

The `/learn` skill applies this heuristic at the moment a mistake is caught. The `/wrap-up` skill applies it at session end during reflection. Between them, every finding gets triaged to the right layer.

## Rules

Memory is earned. Create on 2nd rediscovery, not 1st occurrence. One exception: dead directions get logged immediately, because the cost of re-exploring a dead end is higher than the cost of one extra memory entry.

Contradict check before every write. If the new fact contradicts an existing entry, one of them is wrong. Resolve before writing.

Cap + decay on every store. Skill memory: 20 entries. Ranger memory: 20 entries. MEMORY.md: 200 lines. When full, evict the oldest or weakest. No store grows without bound.

No second source of truth. If a fact lives in skill memory AND ranger memory, one is the owner and the other is a pointer. Duplication is how contradictions start.

## What makes this different

Every other framework that solves cross-layer memory flow requires infrastructure. Databases. Vector stores. Runtime services.

Zordon does it with markdown files, triage heuristics baked into skill instructions, and two orchestration points: `/learn` (immediate) and `/wrap-up` (session end). The memory system is the file system. The routing logic is prose in a skill file. The decay mechanism is a monthly `/declutter` pass.

No servers. No dependencies. The whole thing fits in a git repo.
