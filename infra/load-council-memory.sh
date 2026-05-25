#!/bin/bash
# Summarize council memory state at session start.
# Silent when all councils are empty — only speaks when there's something to see.

cd "$(dirname "$0")/.." || exit 0

found=0

for mem in councils/*/memory.md; do
  [ -f "$mem" ] || continue
  council=$(basename "$(dirname "$mem")")

  # Count entries in Validated Principles (between ## Validated and next ##)
  validated=$(awk '/^## Validated/{f=1;next} /^## /{f=0} f && /last-confirmed/{c++} END{print c+0}' "$mem")
  # Count dead direction entries (between ## Dead and next ##)
  dead=$(awk '/^## Dead/{f=1;next} /^## /{f=0} f && /^- \*\*/{c++} END{print c+0}' "$mem")

  # Skip if empty
  [ "$validated" -eq 0 ] && [ "$dead" -eq 0 ] && continue

  # Find most recent last-confirmed date
  latest=$(grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' "$mem" 2>/dev/null | sort -r | head -1)

  if [ $found -eq 0 ]; then
    echo "[council memory]" >&2
    found=1
  fi

  echo "  $council: ${validated} validated, ${dead} dead directions${latest:+ (latest: $latest)}" >&2
done

if [ $found -eq 0 ]; then
  exit 0
fi
