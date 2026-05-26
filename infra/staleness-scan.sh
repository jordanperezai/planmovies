#!/bin/bash
# staleness-scan.sh — Scan all memory files for stale entries
# Usage: staleness-scan.sh [--stale-only]
# Reads cadence tags and last-confirmed dates, computes staleness score.
# hot=7d, tactical=30d, stable=60d, frozen=skip

set -euo pipefail

ZORDON_ROOT="${ZORDON_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
TODAY=$(date +%s)
STALE_ONLY="${1:-}"
FOUND=0

compute_days_ago() {
  local date_str="$1"
  local then=$(date -j -f "%Y-%m-%d" "$date_str" "+%s" 2>/dev/null || echo 0)
  [ "$then" -eq 0 ] && echo 999 && return
  echo $(( (TODAY - then) / 86400 ))
}

cadence_days() {
  case "$1" in
    hot) echo 7 ;;
    tactical) echo 30 ;;
    stable) echo 60 ;;
    frozen) echo 0 ;;
    *) echo 60 ;;
  esac
}

scan_file() {
  local file="$1"
  local rel="${file#$ZORDON_ROOT/}"

  grep -n "last-confirmed:" "$file" 2>/dev/null | while IFS= read -r line; do
    local linenum=$(echo "$line" | cut -d: -f1)
    local content=$(echo "$line" | cut -d: -f2-)

    local date=$(echo "$content" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | tail -1)
    [ -z "$date" ] && continue

    local cadence=$(echo "$content" | grep -oE 'cadence: (hot|tactical|stable|frozen)' | sed 's/cadence: //')
    [ -z "$cadence" ] && cadence="stable"
    [ "$cadence" = "frozen" ] && continue

    local days=$(compute_days_ago "$date")
    local cd=$(cadence_days "$cadence")
    [ "$cd" -eq 0 ] && continue

    local staleness=$(echo "scale=1; $days / $cd" | bc 2>/dev/null || echo "0")
    local status="fresh"
    local show=false

    if (( $(echo "$staleness > 4.0" | bc -l 2>/dev/null || echo 0) )); then
      status="CRITICAL"
      show=true
    elif (( $(echo "$staleness > 2.0" | bc -l 2>/dev/null || echo 0) )); then
      status="STALE"
      show=true
    elif (( $(echo "$staleness > 1.0" | bc -l 2>/dev/null || echo 0) )); then
      status="aging"
      [ -z "$STALE_ONLY" ] && show=true
    else
      [ -z "$STALE_ONLY" ] && show=true
    fi

    if [ "$show" = true ]; then
      local entry=$(sed -n "${linenum}s/.*\*\*\([^*]*\)\*\*.*/\1/p" "$file" 2>/dev/null | head -1)
      [ -z "$entry" ] && entry="(line $linenum)"
      printf "%-8s  %-10s  %-12s  %-14s  %s\n" "$staleness" "$status" "$cadence" "$date" "$rel: $entry"
      FOUND=$((FOUND + 1))
    fi
  done
}

echo "=== Staleness Scan ==="
echo "Date: $(date +%Y-%m-%d)"
echo ""
printf "%-8s  %-10s  %-12s  %-14s  %s\n" "Score" "Status" "Cadence" "Last Confirmed" "Entry"
printf "%-8s  %-10s  %-12s  %-14s  %s\n" "-----" "------" "-------" "--------------" "-----"

# Scan skill memories
for f in "$ZORDON_ROOT"/.claude/skills/*/memory.md; do
  [ -f "$f" ] && scan_file "$f"
done

# Scan ranger memories
for f in "$ZORDON_ROOT"/rangers/*/memory.md; do
  [ -f "$f" ] && scan_file "$f"
done

echo ""
echo "Scanned $(find "$ZORDON_ROOT"/.claude/skills -name memory.md 2>/dev/null | wc -l | tr -d ' ') skill + $(find "$ZORDON_ROOT"/rangers -name memory.md 2>/dev/null | wc -l | tr -d ' ') ranger memory files."
