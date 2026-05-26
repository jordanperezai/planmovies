# Topics — Knowledge Graph Nodes

Topic files are extracted from MEMORY.md when 3+ entries cluster around a subject.

## Format

```markdown
# [Topic Name]

> **Created:** YYYY-MM-DD
> **Cadence:** hot | tactical | stable | frozen
> **Related:** [[other-topic]], [[another-topic]]

## What We Know
[Distilled facts about this topic]

## Open Questions
[What we still don't know]
```

## Cadence Tags

| Tag | Refresh window | Use for |
|---|---|---|
| `hot` | 7 days | Fast-moving, actively worked on |
| `tactical` | 30 days | Active project decisions |
| `stable` | 60 days | Established patterns, architecture |
| `frozen` | Never | Historical facts, completed milestones |

## Rules

- Link related topics with [[wikilinks]]
- MEMORY.md keeps the one-liner and points here for detail
- `/declutter` checks cadence tags and flags stale topics
