---
name: deep-research
description: "Multi-source research using Exa neural search. Parallel agents search Reddit, GitHub, X, and general web, then synthesize into actionable findings."
model: opus
triggers:
  - "deep research"
  - "research this"
  - "do research on"
  - "what's the latest on"
  - "/deep-research"
---

# Deep Research — Multi-Source Investigation

Thorough research on a topic. Exa neural search as the primary search layer. Produces actionable findings, not a Wikipedia summary.

## When to use

- Entering a new domain or vertical
- Evaluating tools, platforms, or approaches before committing
- Competitive landscape analysis
- Any time you need to know what's out there before building

## Step 0 — Preflight

```
Required:
- EXA_API_KEY in .env (Exa Search API — free tier: 1000 searches/month)

Optional:
- WebSearch tool available → use for broad queries when Exa is unavailable
- WebFetch tool available → use for specific page content
- Alpha Vault at ~/Desktop/Alpha Vault/ → scan for existing knowledge
- qmd available → semantic search across project docs
- gh CLI → GitHub-specific queries
```

If `EXA_API_KEY` is missing, fall back to WebSearch/WebFetch. Research quality drops but it still works.

## Step 1 — Frame the question

Not "SEO." Instead: "What SEO tactics work for single-location service businesses in 2026?"

Clarify:
- **What's the specific question?**
- **Who is this for?** (which project, which decision)
- **What do we already know?** (check MEMORY.md, existing research files, Alpha Vault if available)

## Step 2 — Launch parallel agents

Spawn independent agents for each source category. All agents run in parallel.

### Exa API pattern

```bash
curl -X POST "https://api.exa.ai/search" \
  -H "x-api-key: $EXA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "YOUR QUERY",
    "type": "neural",
    "numResults": 5,
    "contents": {
      "text": {"maxCharacters": 3000}
    }
  }'
```

Add `"includeDomains": ["reddit.com"]` to filter by platform.

### Agent categories

| Agent | What it searches | includeDomains filter |
|---|---|---|
| **General Web** | 3-5 neural searches on the core topic | None (broad) |
| **Reddit** | 4-6 searches for practitioner threads | `["reddit.com"]` |
| **GitHub** | 3-5 searches for tools, repos, frameworks | `["github.com"]` |
| **X/Twitter** | Specific accounts + recent posts if provided | Use WebFetch on x.com URLs |
| **Alpha Vault** | grep + qmd search for existing knowledge | Local filesystem |

### Agent prompts must include

- The exact research question from Step 1
- The project/decision context
- "Focus on 2025-2026, not basic advice everyone knows"
- "Include hard numbers, case studies, and contrarian findings"
- "Report specific tactics, not generic suggestions"

## Step 3 — Synthesize

Once all agents report back, synthesize into a single document. Don't concatenate. Weave findings together.

Look for:
- **Consensus** — what do multiple sources agree on?
- **Contradictions** — where do sources disagree? Why?
- **Gaps** — what couldn't be found? What's nobody talking about?
- **Actionable insights** — what should change based on this research?

## Step 4 — Save

Write to `research/YYYY-MM-DD-[topic].md`. If multiple entries exist for the same day, use `YYYY-MM-DD-NN-[topic].md` (01, 02, etc.). Update `research/CLAUDE.md` index.

```markdown
# Research: [Topic]

**Date:** YYYY-MM-DD
**Question:** [the framed question]
**Sources searched:** [list]

## Key Findings
[Bulleted, with source attribution]

## What We Already Knew (confirmed)
[Findings that match existing knowledge]

## What's New
[Findings that change our understanding]

## Gaps
[What we still don't know]

## Recommended Actions
[What to do with these findings]
```

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I already know enough to decide" | Research takes 10 minutes. A bad decision based on assumptions takes weeks to undo. |
| "I'll just do a quick web search" | A quick search gives you the first result. Parallel multi-source research gives you the landscape. |
| "The Exa results are good enough" | Exa finds articles. Reddit finds practitioner experience. GitHub finds tools. Alpha Vault finds what you already absorbed. All of them, or you're leaving signal on the table. |
