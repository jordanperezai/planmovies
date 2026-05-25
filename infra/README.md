# infra/

Scripts that keep the environment running. Two categories:

## Autonomous (run on schedule or via hooks)

| Script | What it does |
|--------|-------------|
| `auto-skill.sh` | Runs a skill unattended with proof and notification (Molecule #7) |
| `message.sh` | Multi-channel notifications: Telegram, Slack, Twilio |
| `qmd-update.sh` | PostToolUse hook: reindexes semantic search after file edits |
| `load-council-memory.sh` | SessionStart hook: summarizes council memory state |

## Manual (you run these)

| Script | What it does |
|--------|-------------|
| `skill-adapter.ts` | Skill adapter. Discovers skills, resolves aliases, adapts them for any CLI agent |

## Skill Adapter

```bash
npx tsx infra/skill-adapter.ts list                          # list all discovered skills
npx tsx infra/skill-adapter.ts <skill> [args...]             # print the skill prompt
npx tsx infra/skill-adapter.ts run <skill> [args...]         # run via auto-detected agent
npx tsx infra/skill-adapter.ts run --agent codex <skill>     # run via specific agent
```

The adapter discovers SKILL.md files from both `.claude/skills/` (repo) and `~/.claude/skills/` (global). It resolves names against SKILL.md frontmatter (name, triggers).

The prompt is tool-agnostic. The same prompt works whether you pipe it to Claude, Codex, or anything else. The `run` command auto-detects which CLI agent is installed.

## Adding Scripts

Autonomous scripts should:
- Be called by `auto-skill.sh` or a hook, not run directly
- Produce proof (logs, output files) in `autonomous/`
- Notify via `message.sh`

Manual scripts should:
- Work from any directory (use `$SCRIPT_DIR` for relative paths)
- Exit with meaningful status codes
- Print to stderr for status, stdout for output
