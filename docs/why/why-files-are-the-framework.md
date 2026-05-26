# The markdown-native framework

## The claim

Zordon is the most comprehensive zero-dependency markdown agent framework. 15 files. 15 skills. No runtime. No database. No server. No package to install. The files ARE the framework.

## What every other framework requires

Every framework in the personal agent space is software.

**OpenClaw (358K stars):** TypeScript application. Multi-service orchestration. Docker sandboxes. The markdown files (SOUL.md, MEMORY.md, USER.md) are config inputs to a runtime, not the framework itself. Remove the runtime, the files do nothing.

**Hermes Agent (96K stars):** Python application. Install with pip. 6 terminal backends. Built-in cron scheduler. Multi-channel gateway. The SOUL.md is the first element loaded into the system prompt by Python code. The code is the framework.

**Letta/MemGPT (22K stars):** Python server with database-backed memory blocks. Agent state lives in a database. The agent is a persistent entity with an ID managed by the server.

**AutoGPT (184K stars):** Python runtime with visual builder and block marketplace. Install, configure, run.

**Agent Zero (14K stars):** Python runtime. Creates its own tools via code execution. Dynamic capability.

**GSD (62K stars):** npm package. TypeScript, tests, build system. `npx get-shit-done-cc@latest` to install.

**soul.md (aaronjmars):** 4 markdown files. SOUL.md + MEMORY.md + SKILL.md + STYLE.md. The closest precedent. But 4 files without decay mechanisms, self-improvement loops, escalation ladders, knowledge graph memory, execution loops, anti-rationalization tables, or 15 skills is a template, not a framework.

## Why markdown works

The insight: AI coding tools already read markdown. Claude Code reads CLAUDE.md. Cursor reads AGENTS.md. Codex reads instructions. The runtime already exists. Every AI coding tool is the runtime.

Building a new runtime to make agents disciplined is solving the wrong problem. The problem isn't "how do we run the agent." The problem is "how do we make the agent remember, learn, and hand off work." That's a file problem, not a software problem.

A HANDOFF.md file that the agent reads at session start and rewrites at session end achieves session continuity. No database needed.

A LEARNINGS.md file that logs mistakes with root causes achieves self-improvement. No training loop needed.

A MEMORY.md file with hot/warm/cold sections and wikilinks to topic files achieves knowledge management. No vector store needed.

The framework is the conventions, not the code. What files exist. What goes in each one. When each one is read. When each one is written. The caps, the decay rules, the ownership table. All of this is encoded in the files themselves.

## What "zero dependency" actually means

Zordon requires:
- An AI coding tool that reads markdown (Claude Code, Cursor, Codex, any agent)
- git (for version control and audit trail)
- A shell (for hooks)

Optional:
- qmd (markdown search engine, for large projects)

That's it. No Python. No Node.js. No database. No Docker. No API keys. No accounts. No installations beyond the AI tool you're already using.

Copy the files into any repo. The framework is active.

## The tradeoff

Markdown-native means no programmatic enforcement. A Python runtime can intercept tool calls and block actions. Markdown relies on the AI following instructions. This is real. The agent can ignore rules. Hooks help (PreToolUse denylist is code-enforced), but most of the scaffold is instruction-following.

The mitigation: rule placement hierarchy (3 reinforcement points), anti-rationalization tables (naming excuses before they happen), and the execution loop (cognitive discipline on every task). These aren't as reliable as code enforcement. They're reliable enough. 130+ sessions of production use confirms it.

The bet: instruction-following reliability improves with each model generation. Rules that work 85% today work 95% tomorrow. The markdown-native approach gets more reliable over time without any code changes. Runtime frameworks need code updates to support new models.

## Why nobody else built this

Three reasons.

**Engineers build software.** The idea that the solution to an engineering problem is NOT code feels wrong. "Just write markdown files" sounds like a non-answer. Engineers default to building runtimes because that's what engineers do.

**Companies build products.** A runtime is a product. You can host it, charge for it, build a moat around it. "Copy these markdown files" is not a business model. There's no commercial incentive to build a markdown framework.

**Solo builders ship products.** The people who use AI tools daily are building their actual product, not meta-infrastructure for the AI that helps them build. They might create a good CLAUDE.md. They don't stop to systematize it across 130+ sessions.

Zordon exists because the author ran 130+ sessions across 4 production projects, noticed what kept working and what kept breaking, absorbed 559 framework analyses via the Alpha Vault, and extracted the pattern. The combination of extensive production data, systematic research, and the product instinct to recognize that files are the answer was not present in any single other person or team.
