#!/bin/bash
# Re-indexes markdown for qmd search after every edit.
# Triggered by: PostToolUse (Edit|Write)

cd "$CLAUDE_PROJECT_DIR" && [ -x ./infra/qmd-update.sh ] && ./infra/qmd-update.sh 2>/dev/null || true
