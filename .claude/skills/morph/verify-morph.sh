#!/bin/bash
# verify-morph.sh — Post-morph completeness check
# Run after /morph to verify every scaffold component landed.
# Exit 0 = all clear. Exit 1 = gaps found.

set -euo pipefail

TARGET="${1:-.}"
PASS=0
FAIL=0
MISSING=""

check() {
  local label="$1"
  local path="$TARGET/$2"
  if [ -e "$path" ]; then
    PASS=$((PASS + 1))
  else
    FAIL=$((FAIL + 1))
    MISSING="$MISSING\n  MISSING: $label ($2)"
  fi
}

echo "=== Post-Morph Verification ==="
echo "Target: $TARGET"
echo ""

# Core files (19)
echo "--- Core Files ---"
check "CLAUDE.md" "CLAUDE.md"
check "AGENTS.md (symlink)" "AGENTS.md"
check "SOUL.md" "SOUL.md"
check "VOICE.md" "VOICE.md"
check "USER.md" "USER.md"
check "MEMORY.md" "MEMORY.md"
check "HANDOFF.md" "HANDOFF.md"
check "LEARNINGS.md" "LEARNINGS.md"
check "MAP.md" "MAP.md"
check "TOOLS.md" "TOOLS.md"
check "WILL.md" "WILL.md"
check "SECURITY.md" "SECURITY.md"
check ".gitignore" ".gitignore"

# Core directories (12)
echo "--- Directories ---"
check "memory/" "memory"
check "memory/topics/" "memory/topics"
check "bugs/" "bugs"
check "journal/" "journal"
check "rangers/" "rangers"
check "research/" "research"
check ".claude/skills/" ".claude/skills"
check "hooks/" "hooks"
check "infra/" "infra"
check "autonomous/" "autonomous"
check "docs/" "docs"
check "scans/" "scans"

# Core hooks (4)
echo "--- Hooks ---"
check "blocker.sh" "hooks/blocker.sh"
check "infra-check.sh" "hooks/infra-check.sh"
check "l1-cap-check.sh" "hooks/l1-cap-check.sh"
check "pre-compact-nudge.sh" "hooks/pre-compact-nudge.sh"

# Core infra (1)
echo "--- Infra ---"
check "zordon-recall.sh" "infra/zordon-recall.sh"

# Settings
echo "--- Config ---"
check "settings.json" ".claude/settings.json"

# Settings content checks
if [ -f "$TARGET/.claude/settings.json" ]; then
  grep -q "PreCompact" "$TARGET/.claude/settings.json" 2>/dev/null && check "PreCompact hook wired" ".claude/settings.json" || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: PreCompact hook not wired in settings.json"; }
  grep -q "l1-cap" "$TARGET/.claude/settings.json" 2>/dev/null && check "L1 cap hook wired" ".claude/settings.json" || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: L1 cap hook not wired in settings.json"; }
  grep -q "blocker" "$TARGET/.claude/settings.json" 2>/dev/null && check "Blocker hook wired" ".claude/settings.json" || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: Blocker hook not wired in settings.json"; }
fi

# Core skills (18 minimum)
echo "--- Core Skills ---"
for skill in learn catch-up wrap-up declutter tune emergent-scan anti-slop deep-research brainstorm log-bug collider-smash vault-scan ranger multi-ranger last30days; do
  check "/skill: $skill" ".claude/skills/$skill/SKILL.md"
done

# CLAUDE.md content checks
echo "--- CLAUDE.md Content ---"
if [ -f "$TARGET/CLAUDE.md" ]; then
  grep -q "Layer 1" "$TARGET/CLAUDE.md" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: Layer 1/2 split in CLAUDE.md"; }
  grep -q "Self-Improvement\|escalat" "$TARGET/CLAUDE.md" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: Self-Improvement section in CLAUDE.md"; }
  grep -q "Mistake Patterns\|Top.*Mistake" "$TARGET/CLAUDE.md" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: Top Mistake Patterns in CLAUDE.md"; }
  grep -q "Skill-Before-Adhoc\|skill.*before.*adhoc" "$TARGET/CLAUDE.md" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: Skill-Before-Adhoc rule in CLAUDE.md"; }
fi

# .gitignore check
echo "--- .gitignore ---"
if [ -f "$TARGET/.gitignore" ]; then
  grep -q "\.claude/\*" "$TARGET/.gitignore" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: .claude/* in .gitignore"; }
  grep -q "!\.claude/skills" "$TARGET/.gitignore" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: !.claude/skills/ negation in .gitignore"; }
  grep -q "zordon-recall" "$TARGET/.gitignore" 2>/dev/null || { FAIL=$((FAIL+1)); MISSING="$MISSING\n  MISSING: .zordon-recall.sqlite in .gitignore"; }
fi

# AGENTS.md symlink check
if [ -f "$TARGET/AGENTS.md" ]; then
  if [ -L "$TARGET/AGENTS.md" ]; then
    check "AGENTS.md is symlink" "AGENTS.md"
  else
    FAIL=$((FAIL+1))
    MISSING="$MISSING\n  WARNING: AGENTS.md exists but is NOT a symlink to CLAUDE.md"
  fi
fi

# Report
echo ""
echo "=== Results ==="
echo "PASS: $PASS"
echo "FAIL: $FAIL"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "Gaps found:"
  echo -e "$MISSING"
  echo ""
  echo "Run /morph again targeting the missing items."
  exit 1
else
  echo "All checks passed. Morph is complete."
  exit 0
fi
