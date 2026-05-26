#!/bin/bash
# zordon-recall — FTS5 full-text search across all memory files
# Usage: zordon-recall "map colors"
# Usage: zordon-recall --rebuild
# Usage: zordon-recall --stats
# The index is disposable. The .md files are truth.

set -euo pipefail

ZORDON_ROOT="${ZORDON_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
DB_PATH="$ZORDON_ROOT/.zordon-recall.sqlite"

rebuild_index() {
    rm -f "$DB_PATH"
    sqlite3 "$DB_PATH" "CREATE VIRTUAL TABLE IF NOT EXISTS recall USING fts5(path, source_type, title, content, tokenize='porter unicode61');"
    local count=0

    for f in "$ZORDON_ROOT"/memory/20*.md; do
        [ -f "$f" ] || continue
        local rel="${f#$ZORDON_ROOT/}" title=$(head -1 "$f" | sed 's/^#* //') content=$(cat "$f")
        sqlite3 "$DB_PATH" "INSERT INTO recall(path,source_type,title,content) VALUES ('$rel','session-log','$(echo "$title"|sed "s/'/''/g")','$(echo "$content"|sed "s/'/''/g")');"
        count=$((count+1))
    done
    for f in "$ZORDON_ROOT"/.claude/skills/*/memory.md; do
        [ -f "$f" ] || continue
        local rel="${f#$ZORDON_ROOT/}" name=$(basename "$(dirname "$f")") content=$(cat "$f")
        sqlite3 "$DB_PATH" "INSERT INTO recall(path,source_type,title,content) VALUES ('$rel','skill-memory','$name','$(echo "$content"|sed "s/'/''/g")');"
        count=$((count+1))
    done
    for f in "$ZORDON_ROOT"/rangers/*/memory.md; do
        [ -f "$f" ] || continue
        local rel="${f#$ZORDON_ROOT/}" name=$(basename "$(dirname "$f")") content=$(cat "$f")
        sqlite3 "$DB_PATH" "INSERT INTO recall(path,source_type,title,content) VALUES ('$rel','ranger-memory','$name','$(echo "$content"|sed "s/'/''/g")');"
        count=$((count+1))
    done
    for f in "$ZORDON_ROOT"/journal/20*.md; do
        [ -f "$f" ] || continue
        local rel="${f#$ZORDON_ROOT/}" title=$(head -1 "$f" | sed 's/^#* //') content=$(cat "$f")
        sqlite3 "$DB_PATH" "INSERT INTO recall(path,source_type,title,content) VALUES ('$rel','journal','$(echo "$title"|sed "s/'/''/g")','$(echo "$content"|sed "s/'/''/g")');"
        count=$((count+1))
    done
    [ -f "$ZORDON_ROOT/LEARNINGS.md" ] && { content=$(cat "$ZORDON_ROOT/LEARNINGS.md"); sqlite3 "$DB_PATH" "INSERT INTO recall(path,source_type,title,content) VALUES ('LEARNINGS.md','learnings','LEARNINGS','$(echo "$content"|sed "s/'/''/g")');" ; count=$((count+1)); }

    echo "Indexed $count files into $DB_PATH"
}

show_stats() {
    [ -f "$DB_PATH" ] || { echo "No index. Run: zordon-recall --rebuild"; exit 1; }
    echo "Index: $DB_PATH ($(du -h "$DB_PATH" | cut -f1))"
    sqlite3 "$DB_PATH" "SELECT source_type, COUNT(*) FROM recall GROUP BY source_type ORDER BY 2 DESC;"
}

search_recall() {
    [ -f "$DB_PATH" ] || rebuild_index
    sqlite3 -header -column "$DB_PATH" "SELECT path, source_type, snippet(recall,3,'>>> ',' <<<','...',40) as match FROM recall WHERE recall MATCH '${1}' ORDER BY rank LIMIT ${2:-10};"
}

case "${1:-}" in
    --rebuild) rebuild_index ;;
    --stats) show_stats ;;
    --help|-h|"") echo "Usage: zordon-recall <query> | --rebuild | --stats" ;;
    *) search_recall "$1" "${2:-10}" ;;
esac
