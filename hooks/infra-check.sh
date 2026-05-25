#!/bin/bash
# Reminds to update TOOLS.md/MAP.md/WILL.md on infrastructure changes.
# Triggered by: PreToolUse (Edit|Write)

if echo "$CLAUDE_TOOL_INPUT" | grep -qE 'infra/|hooks/|settings\.json|\.env'; then
  echo 'REMINDER: Infrastructure change. Update TOOLS.md, MAP.md, or WILL.md if this adds, removes, or changes a tool, hook, or job.' >&2
fi
