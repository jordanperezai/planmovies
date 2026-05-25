#!/bin/bash
# pre-compact-nudge.sh — Self-nudging memory
# Fires before context compression (PreCompact hook).
# Reminds the agent to distill key learnings before context is lost.

cat <<'NUDGE'
[SELF-NUDGE] Context is about to compress. Before it does:
- Any skill memory updates needed? (principles learned, dead directions found)
- Any council findings not yet logged?
- HANDOFF.md current?
If yes to any: write them now (they survive compression in the files, not in context).
NUDGE

exit 0
