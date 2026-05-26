# Why agents need semantic search

An agent that searches by keyword finds what you already know how to ask for. An agent that searches by meaning finds what you didn't know existed.

Keyword search matches strings. You type "agent memory," you get pages containing those two words. Semantic search matches intent. You type "how do I make my AI remember things between sessions," and it finds a page about HANDOFF.md that never uses the word "memory."

That difference compounds across every research task, every time the agent needs to find something it hasn't seen before.

## Two layers, two jobs

The scaffold ships with two semantic search capabilities because they solve different problems.

**Local search (qmd)** searches your own files. When the agent needs to know what you decided about authentication last week, it searches your session logs, memory files, and ranger records. BM25 for exact matches, vector search for meaning. The PostToolUse hook keeps the index current after every edit. The agent's own knowledge base is always searchable.

**Remote search (Exa)** searches the world. When the agent needs to know what practitioners are doing about local SEO in 2026, it searches Reddit, GitHub, X, and the general web through a single API with `includeDomains` filtering. Neural search means the query "what actually works for single-location auto repair shops" returns practitioner threads and case studies, not generic SEO guides.

Local search prevents the agent from re-deriving what it already knows. Remote search prevents the agent from operating in a bubble. Both understand meaning. Both run in parallel with the agent's other work.

## Why one API replaced nine adapters

An earlier version of the research skill used nine separate platform adapters: one for Reddit, one for GitHub, one for X, one for Hacker News, and so on. Each adapter had its own authentication, rate limits, response format, and failure modes.

Exa replaced all of them. One API key. One request format. Platform filtering via `includeDomains`. Neural search that understands what you're looking for regardless of which platform hosts the answer.

The result: 147 out of 147 successful lookups in the first production test. Five parallel agents (web, Reddit, GitHub, X, internal vault) running through the same API, each returning different signal from the same search intent.

Reddit surfaces what practitioners say when they're not trying to sell you something. GitHub turns up the tools people built rather than the tools people marketed. X identifies who's worth following. The general web and internal vault round it out: case studies with numbers from one, prevention of duplicate research from the other.

## What happens without it

An agent doing keyword-only research returns the first page of Google results dressed up as analysis. It finds what everyone else finds.

An agent with no local search treats every session like its first day. It searches the web for answers that already exist in its own memory files. It re-derives findings from three sessions ago because it couldn't find them by meaning, only by exact filename. That's the more expensive failure: not ignorance, but amnesia.

An agent with semantic search on both layers checks what it already knows (local), identifies the gaps, then fills them with signal from practitioners and builders (remote). The research compounds because the agent builds on its own history instead of starting from zero each time.

## The design

```
Agent needs to know something
    |
    v
Step 1: Search local (qmd)
    "Do I already know this?"
    |
    v
Step 2: Search remote (Exa, 5 parallel agents)
    "What's out there that I don't have?"
    |
    v
Step 3: Synthesize
    What's confirmed. What's new. What's missing.
    |
    v
Step 4: Wire into knowledge system
    Research file + ranger memory + MEMORY.md pointer
```

The local-first step is the one most research tools skip. It prevents the agent from wasting searches on questions it already answered.

## Setup

Exa's free tier gives you 1000 searches per month. For an agent that runs `/deep-research` a few times a week with 5 parallel agents per run, that's roughly 40 research sessions before you need to upgrade. More than enough for most projects.

```bash
# .env
EXA_API_KEY=your-key-here
```

qmd is a local binary with no external dependencies. The scaffold's PostToolUse hook keeps the index fresh automatically.

Both are optional. Without Exa, `/deep-research` falls back to WebSearch and WebFetch. Without qmd, the agent greps files by keyword instead of searching by meaning. The scaffold degrades gracefully. But semantic search on both layers is where the compounding happens.
