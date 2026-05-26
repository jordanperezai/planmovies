# Knowledge graph memory

## The problem with flat memory

MEMORY.md starts as a flat list of one-liners. This works for the first 10-20 sessions. Then three things happen:

1. **The file grows past its cap.** 200 lines. Every session adds 2-3 entries. By session 60, it's unmanageable.
2. **Related entries scatter.** Facts about the same topic (auth system, client onboarding, pricing decisions) spread across Hot, Warm, and Cold sections. Context requires scanning the entire file.
3. **Uniform decay misclassifies.** A pricing decision from 45 days ago isn't stale. A tool evaluation from 15 days ago might be. Uniform 30/90 day windows treat all knowledge as decaying at the same rate. It doesn't.

Every framework that reaches production scale hits this. Letta/MemGPT solved it with a database. Hermes solved it with character caps and auto-consolidation. GenericAgent solved it with a 5-tier memory system. All require runtime infrastructure.

Zordon needed a solution that works in markdown.

## The Alpha Vault proof

The Alpha Vault is a knowledge graph in markdown. 559 raw sources distilled into wiki/summaries/ (per-source), wiki/concepts/ (cross-cutting), wiki/entities/ (people, tools), and wiki/why/ (derived knowledge). Connected by [[wikilinks]] in the body text and `sources:` arrays in frontmatter.

No database. No vector store. Folders, files, links, and frontmatter properties. The graph emerged from the structure, not from a schema declaration.

The Vault works at scale. 52 concepts, 42 why, 441 raw evaluations, 228 session logs. An agent can navigate from a concept to its sources to related concepts to why that reference them. The graph is traversable because the links are explicit.

## The pattern applied to project memory

Every Zordon project ships with the structure:

```
MEMORY.md                     -- index (one-liners with [[wikilinks]])
memory/
  topics/                     -- topic nodes (extracted when 3+ entries cluster)
    CLAUDE.md                 -- format guide + cadence tags
  YYYY-MM-DD.md              -- session logs (raw intake)
```

**Day 1-10:** MEMORY.md is a flat list. Topics/ is empty. This is fine.

**Session 10-30:** Entries cluster. "Auth" shows up 4 times. "Pricing" shows up 3 times. Extract to `memory/topics/auth.md` and `memory/topics/pricing.md`. MEMORY.md entries become one-liners that point to the topic file with [[auth]].

**Session 30-100:** Topic files link to each other with [[wikilinks]]. The pricing topic references the auth topic (pricing depends on auth tiers). The graph forms itself.

**Session 100+:** The structure mirrors the Alpha Vault. Topics are concepts. Session logs are raw. MEMORY.md is the index. Syntheses emerge when topics connect.

## Cadence-based decay

Not all knowledge decays at the same rate. Uniform age-based windows (30 days = warm, 90 days = cold) over-review stable knowledge and under-review volatile knowledge.

Topic files carry a cadence tag in their frontmatter:

| Tag | Refresh window | Use for |
|---|---|---|
| `hot` | 7 days | Fast-moving, actively worked on |
| `tactical` | 30 days | Active project decisions |
| `stable` | 60 days | Established patterns, architecture |
| `frozen` | Never | Historical facts, completed milestones |

A "frozen" pricing decision from 6 months ago stays relevant. A "hot" integration status from 8 days ago is already stale. `/declutter` uses cadence tags instead of uniform age.

Sourced from the Alpha Vault's cadence-staleness concept, which adapted it from modular-context-obsidian.

## Progressive disclosure

The graph structure naturally supports three-tier retrieval:

| Tier | What | Token cost |
|---|---|---|
| MEMORY.md one-liner | "Auth system uses Supabase RLS [[auth]]" | ~10 tokens |
| Topic file summary | First section of memory/topics/auth.md | ~200 tokens |
| Full topic + linked topics | All of auth.md + [[linked]] files | Variable |

The agent reads MEMORY.md first (cheap). If it needs more on auth, it reads the topic file (medium). If it needs the full history, it greps session logs (expensive). Most queries resolve at tier 1.

This is the same pattern as claude-mem's 3-layer MCP contract and OpenViking's L0/L1/L2 tiered context loading, implemented without any infrastructure. The tiers are files. The retrieval is reading.

## The forget primitive

Memory that can only grow is not production-safe. Cold entries older than 6 months get a verify-or-delete check during `/declutter`:

1. Is this still true? (check against current codebase/state)
2. If yes, keep with updated `last-verified` date.
3. If no, delete. Not archive. Delete.

Sourced from cognee's explicit `forget()` operation. The key insight: forgetting is not passive expiry. It's an active decision to remove knowledge that is no longer true.

## Why this is different

Every other memory solution requires infrastructure. Letta needs a server. Mem0 needs a vector store. Hermes needs a Python runtime. The knowledge graph memory pattern works with markdown files, wikilinks, and frontmatter. The graph is the file structure. The edges are the links. The properties are the frontmatter.

Zordon is the only framework where memory grows from a flat file into a knowledge graph using zero additional dependencies.
