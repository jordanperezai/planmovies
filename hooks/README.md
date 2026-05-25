# Hooks

The agent's reflexes. Scripts that fire automatically on events. Configured in `.claude/settings.json`, which points to files in this directory.

Different from infra/ (utilities called by skills or humans on demand).

## The Rule

If settings.json triggers it automatically, the script lives in `hooks/`.
If a skill or human calls it, the script lives in `infra/`.

## Active Hooks

| Script | Trigger | What it does |
|---|---|---|
| blocker.sh | PreToolUse (Bash) | Blocks rm -rf, force push, DROP TABLE, curl pipe to shell |
| infra-check.sh | PreToolUse (Edit/Write) | Reminds to update TOOLS.md/MAP.md on infra or hooks changes |
| qmd-index.sh | PostToolUse (Edit/Write) | Re-indexes markdown for local search |

## The Context-Guard Pattern

As your project discovers which file areas cause mistakes when edited without context, add checks to a `context-guard.sh` file. This hook is NOT scaffolded. It grows organically from real mistakes.

Each guard checks whether the agent is editing a sensitive area and emits a stderr reminder to re-read relevant context first. See Terpmon for a mature example with 10 area-specific guards (pricing logic, auth flows, migration files, etc.).

To start one: create `hooks/context-guard.sh`, wire it as a PreToolUse Edit|Write hook, and add your first check after the next mistake that would have been prevented by a "did you re-read X?" reminder.

## Adding a New Hook

1. Write the script in this directory
2. Make it executable: `chmod +x hooks/your-hook.sh`
3. Add the trigger to `.claude/settings.json`
4. Update this README
