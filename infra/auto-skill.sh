#!/bin/bash
# auto-skill.sh -- Run a skill unattended with proof and notification.
# The template that wires Verified Autonomy (Molecule #7):
#   Scheduled Task + Output Proof + Messaging Gateway
#
# Usage:
#   ./infra/auto-skill.sh "/alpha-scan" "Weekly alpha scan"
#   ./infra/auto-skill.sh "/declutter" "Monthly cleanup" --channel slack
#   ./infra/auto-skill.sh "/collider-smash" "Monthly structural check"
#
# What it does:
#   1. Checks WILL.md to confirm the job is authorized
#   2. Runs the skill via Claude Code
#   3. Captures the output as proof
#   4. Logs the run to memory/autonomous/
#   5. Sends a notification with the results
#
# Setup:
#   - Claude Code CLI must be available as `claude`
#   - .env must be configured for message.sh
#   - The skill must be listed in WILL.md Active Jobs
#
# Scheduling (pick one):
#   launchd: create a plist in ~/Library/LaunchAgents/
#   cron:    crontab -e -> 0 9 * * 1 cd /path/to/project && ./infra/auto-skill.sh "/alpha-scan" "Weekly scan"
#   Worker:  Cloudflare cron trigger calls this via API

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILL="${1:?Usage: auto-skill.sh \"/skill-name\" \"description\" [--channel telegram|slack|sms]}"
DESCRIPTION="${2:-Autonomous run: $SKILL}"
CHANNEL="${4:-${NOTIFY_DEFAULT_CHANNEL:-telegram}}"
TIMESTAMP=$(date +%Y-%m-%d-%H%M)
LOG_DIR="$PROJECT_DIR/autonomous"
LOG_FILE="$LOG_DIR/$TIMESTAMP-$(echo "$SKILL" | tr '/' '-' | tr -d ' ').md"
TIMEOUT="${AUTONOMOUS_TIMEOUT:-300}"

mkdir -p "$LOG_DIR"

log() {
  echo "[$(date +%H:%M:%S)] $1" >> "$LOG_FILE"
  echo "[$(date +%H:%M:%S)] $1" >&2
}

# Step 1: Check authorization
if ! grep -q "$SKILL" "$PROJECT_DIR/WILL.md" 2>/dev/null; then
  log "BLOCKED: $SKILL is not listed in WILL.md Active Jobs"
  "$SCRIPT_DIR/message.sh" "BLOCKED: $SKILL attempted but not authorized in WILL.md" --channel "$CHANNEL" 2>/dev/null || true
  exit 1
fi

# Step 2: Write log header
cat > "$LOG_FILE" << EOF
# Autonomous Run: $SKILL

> **Date:** $TIMESTAMP
> **Description:** $DESCRIPTION
> **Timeout:** ${TIMEOUT}s

## Output

EOF

log "Starting: $SKILL"

# Step 3: Run the skill via Claude Code
SKILL_OUTPUT=""
RUN_EXIT=0

if command -v claude &>/dev/null; then
  SKILL_OUTPUT=$(cd "$PROJECT_DIR" && timeout "$TIMEOUT" claude --print "Run $SKILL and report findings. This is an autonomous run. Be concise. Output proof: verify what you changed." 2>&1) || RUN_EXIT=$?
else
  log "ERROR: claude CLI not found"
  RUN_EXIT=127
fi

# Step 4: Capture proof
echo "$SKILL_OUTPUT" >> "$LOG_FILE"

cat >> "$LOG_FILE" << EOF

## Proof

- **Exit code:** $RUN_EXIT
- **Timeout:** ${TIMEOUT}s
- **Timestamp:** $(date +%Y-%m-%d\ %H:%M:%S)
EOF

if [ $RUN_EXIT -eq 0 ]; then
  log "Completed successfully"
  STATUS="OK"
elif [ $RUN_EXIT -eq 124 ]; then
  log "TIMEOUT after ${TIMEOUT}s"
  STATUS="TIMEOUT"
else
  log "FAILED with exit code $RUN_EXIT"
  STATUS="FAILED (exit $RUN_EXIT)"
fi

echo "- **Status:** $STATUS" >> "$LOG_FILE"

# Step 5: Notify
SUMMARY=$(echo "$SKILL_OUTPUT" | tail -5 | head -3)
NOTIFY_MSG="[$STATUS] $DESCRIPTION
$SUMMARY"

"$SCRIPT_DIR/message.sh" "$NOTIFY_MSG" --channel "$CHANNEL" 2>/dev/null || log "WARNING: notification failed"

log "Run complete. Log: $LOG_FILE"
