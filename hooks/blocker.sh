#!/bin/bash
# Blocks destructive commands. Exit 2 = hard block.
# Triggered by: PreToolUse (Bash)

cmd=$(echo "$CLAUDE_TOOL_INPUT" | grep -oP '"command":\s*"\K[^"]+' 2>/dev/null || echo "$CLAUDE_TOOL_INPUT")

blocked=false

if echo "$cmd" | grep -qE 'rm\s+-rf\s+[/~.]'; then
  blocked=true
  msg='rm -rf on root/home paths'
fi

if echo "$cmd" | grep -qE 'git\s+reset\s+--hard'; then
  blocked=true
  msg='git reset --hard'
fi

if echo "$cmd" | grep -qE 'git\s+push\s+--force.*(main|master)'; then
  blocked=true
  msg='force push to main/master'
fi

if echo "$cmd" | grep -qiE 'DROP\s+(TABLE|DATABASE)|TRUNCATE'; then
  blocked=true
  msg='DROP/TRUNCATE SQL'
fi

if echo "$cmd" | grep -qE 'curl.*\|\s*(sh|bash)'; then
  blocked=true
  msg='pipe curl to shell'
fi

if [ "$blocked" = true ]; then
  echo "BLOCKED: $msg" >&2
  exit 2
fi
