#!/bin/bash
# pre-compact-nudge.sh — Self-nudging memory
# Fires before context compression (PreCompact hook).
# Reminds the agent to distill key learnings before context is lost.

cat <<'NUDGE'
[SELF-NUDGE] Context is about to compress. Before it does:
- Any CODE BUGS found this session not yet in bugs/? Especially DEFERRED ones — a bug that lives only in chat is gone after compaction. /log-bug them NOW.
- Any skill memory updates needed? (principles learned, dead directions found)
- Any ranger findings not yet logged?
- HANDOFF.md current?
If yes to any: write them now (they survive compression in the files, not in context).
NUDGE

exit 0
