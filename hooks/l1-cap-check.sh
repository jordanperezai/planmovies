#!/bin/bash
# l1-cap-check.sh — Enforce character caps on Layer 1 + key Layer 2 files
# Fires on PostToolUse (Edit|Write).
# Warns when a file exceeds its cap. Does not block.
# Validated by Agentic Council: constraints must be present before first action.

ZORDON_ROOT="${CLAUDE_PROJECT_DIR:-.}"

check_cap() {
  local file="$1"
  local cap="$2"
  local path="$ZORDON_ROOT/$file"

  [ -f "$path" ] || return 0

  local chars=$(wc -c < "$path" | tr -d ' ')
  if [ "$chars" -gt "$cap" ]; then
    local over=$((chars - cap))
    echo "[L1 CAP] $file is $chars chars ($over over the $cap cap). Run /declutter or compress."
  fi
}

# L1 files — adjust caps per project
check_cap "CLAUDE.md" 12000
check_cap "SOUL.md" 4000
check_cap "USER.md" 5000
check_cap "HANDOFF.md" 8000
check_cap "MEMORY.md" 6000
check_cap "LEARNINGS.md" 8000

# L2 files
check_cap "VOICE.md" 6000

exit 0
