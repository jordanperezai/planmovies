# Why Skills Need an Adapter

AGENTS.md tells any IDE agent who the project is. The skill adapter tells any CLI agent how to execute the project's skills. Together, Zordon becomes agent-runtime-agnostic.

## The Problem

Zordon skills are SKILL.md files with YAML frontmatter. Claude Code reads them natively via `/skill-name`. Every other CLI agent (Codex, future tools) cannot. Without a bridge, your skills only work inside one tool.

The Agent Skills spec (agentskills.io) is adopted by 36+ tools. Skills are already portable in theory. But "portable" means nothing if no mechanism exists to discover, resolve, and deliver them to the agent.

## What the Adapter Does

Five steps. No magic.

1. **Discovery.** Scans `.claude/skills/` (repo) and `~/.claude/skills/` (global) for directories containing SKILL.md.
2. **Parsing.** Reads YAML frontmatter from each SKILL.md: name, description, triggers.
3. **Resolution.** Matches a query against names, directory names, and triggers from SKILL.md frontmatter.
4. **Prompt building.** Packages the skill path, memory path, and arguments into a tool-agnostic prompt.
5. **Execution.** Prints the prompt (default) or runs it via whichever CLI agent is installed.

The prompt is the same regardless of target. The agent is the replaceable part.

## Why This Matters for the Scaffold

Zordon's thesis: files are the framework. The value is in the markdown, not the AI tool reading it. If your skills only work in one tool, the framework has a runtime dependency. The adapter removes that dependency.

A project that uses Zordon today with Claude Code can switch to Codex tomorrow and keep every skill, every ranger, every memory file. The environment persists. The agent is swapped.

## What It Doesn't Do

The adapter doesn't make skills behave identically across tools. Different LLMs interpret the same SKILL.md differently. The adapter ensures delivery, not parity. Quality depends on the model, not the bridge.

## Sources

- agentskills.io (Agent Skills spec, 36+ tools)
- Zordon-OS Session 21: scripts/ consolidation, Codex bridge refactored into universal adapter
- Agent Collider: Skill Card particle (portable skill metadata)
