#!/bin/bash
# Blocks destructive commands. Exit 2 = hard block.
# Triggered by: PreToolUse (Bash)
# SAFETY: fails closed. If parsing breaks, exit 2 (block).
#
# Threat model: this is defense-in-depth against ACCIDENTAL destructive commands
# and obvious dangerous patterns. It is NOT a sandbox and cannot fully parse a
# hostile shell. Known accepted residuals: ANSI-C quoting ($'r'm), and paths fed
# to a deleter purely via stdin (printf ... | xargs rm). Use OS-level sandboxing
# for adversarial protection.
#
# Detection approach (hardened 2026-05-28):
#   - parse commands in command position only (no false positives on grep/commit text)
#   - split command-substitution into its own command; strip backslashes and $IFS
#   - match executables by basename (/usr/bin/git, /usr/bin/curl)
#   - canonicalize rm targets (../proj, .git/.. resolve to the project dir)
#   - git reset: allow options between reset and --hard; force-push: clustered -uf,
#     implicit current protected branch, allow --dry-run
#   - curl/wget piped to sh/bash/zsh/dash/ksh/fish/ash, incl. sudo/env wrappers
#   - DROP/TRUNCATE only in a database-client context

set -f

cmd="$CLAUDE_TOOL_INPUT"
if command -v perl >/dev/null 2>&1; then
  parsed_cmd=$(
    printf '%s' "$CLAUDE_TOOL_INPUT" | perl -MJSON::PP -0777 -e '
      my $input = do { local $/; <STDIN> };
      eval {
        my $payload = decode_json($input);
        if (ref($payload) eq "HASH" && exists $payload->{command}) {
          print $payload->{command};
          exit 0;
        }
      };
      print $input;
    ' 2>/dev/null
  )
  [ -n "$parsed_cmd" ] && cmd="$parsed_cmd"
fi

# Normalize before tokenizing:
#  - strip backslashes (r\m -> rm; we detect, never execute)
#  - turn $IFS / ${IFS} into spaces
#  - drop quotes (r'm', "path")
#  - turn command-substitution markers $( ) and backticks into separators so the
#    inner command lands in command position (echo $(rm -rf /) -> echo ; rm -rf /)
#  - collapse whitespace
normalized=$(printf '%s' "$cmd" \
  | tr -d '\\' \
  | sed -E 's/\$\{?IFS\}?/ /g' \
  | tr -d "'\"" \
  | tr '\n' ' ' \
  | sed -E 's/\$\(/ ; /g; s/`/ ; /g; s/\)/ ; /g' \
  | sed -E 's/[[:space:]]+/ /g')

# Split &&, || and ; & | into standalone separator tokens.
tokens_line=$(printf '%s' "$normalized" | sed -E 's/([;&|])/ \1 /g')

# Fail closed: if tokenization produces nothing from non-empty input, block.
if [ -n "$normalized" ]; then
  read -r -a tokens <<< "$tokens_line" 2>/dev/null
  if [ ${#tokens[@]} -eq 0 ]; then
    echo "BLOCKED: tokenization failed on non-empty input (fail-closed)" >&2
    exit 2
  fi
else
  exit 0
fi

is_separator() {
  case "$1" in ";"|"&"|"|") return 0 ;; esac
  return 1
}

# A token is in command position if it starts the line or follows a separator.
# (Skips leading VAR=val assignments.) Only command-position keywords trigger
# guards, so `rg "rm -rf /"` or a commit message mentioning `git reset --hard`
# are not misread as commands.
is_command_position() {
  local idx="$1" p
  [ "$idx" -eq 0 ] && return 0
  p=$((idx - 1))
  while [ "$p" -ge 0 ]; do
    case "${tokens[$p]}" in
      *=*) p=$((p - 1)); continue ;;   # skip env assignments before the command
      *) is_separator "${tokens[$p]}" && return 0 || return 1 ;;
    esac
  done
  return 0
}

# basename of a command token (so /usr/bin/git matches git)
cmdname() { printf '%s' "${1##*/}"; }

# Canonicalize a path token (resolve .. and . relative to cwd) without needing it
# to exist. Used so ../proj and proj/.git/.. compare against protected dirs.
canon_path() {
  python3 -c 'import os,sys; print(os.path.abspath(sys.argv[1]))' "$1" 2>/dev/null || printf '%s' "$1"
}

is_rm_command() { [ "$(cmdname "$1")" = "rm" ]; }

is_dangerous_rm_path() {
  local p="$1"
  [ "$p" != "/" ] && p="${p%/}"

  # Literal dangerous targets, root/cwd/home globs, and unexpanded var forms.
  case "$p" in
    /|//|/\*|/.|/.\*|"~"|"~"/*|"~+"|"~-"|.|./\*|./.|\
    \$HOME|\$HOME/*|\$\{HOME\}|\$\{HOME\}/*|\
    \$CLAUDE_PROJECT_DIR|\$CLAUDE_PROJECT_DIR/*|\$\{CLAUDE_PROJECT_DIR\}|\$\{CLAUDE_PROJECT_DIR\}/*|\
    \$PWD|\$PWD/*|\$\{PWD\}|\$\{PWD\}/*|\$\(pwd\)|\$\(pwd\)/*)
      return 0
      ;;
  esac

  # Resolved-path checks: deleting home, cwd/project root, or any ancestor.
  local danger rp="$p"
  case "$p" in */*|.|..) rp="$(canon_path "$p")"; rp="${rp%/}" ;; esac
  for danger in "${HOME%/}" "${PWD%/}" "${CLAUDE_PROJECT_DIR%/}"; do
    [ -z "$danger" ] && continue
    [ "$rp" = "$danger" ] && return 0
    case "$danger" in "$rp"/*) return 0 ;; esac
  done
  return 1
}

# Advance past git global options; echo the subcommand index.
git_subcommand_index() {
  local j=$1
  while [ "$j" -lt ${#tokens[@]} ]; do
    case "${tokens[$j]}" in
      -C|-c|--git-dir|--work-tree|--namespace|--exec-path) j=$((j + 2)) ;;
      -*) j=$((j + 1)) ;;
      *) break ;;
    esac
  done
  echo "$j"
}

is_git_command() { [ "$(cmdname "$1")" = "git" ]; }

# rm guard: block recursive+force deletion of root, home, cwd, or project paths.
has_dangerous_rm() {
  local i j token saw_recursive saw_force

  for ((i = 0; i < ${#tokens[@]}; i++)); do
    is_rm_command "${tokens[$i]}" || continue
    is_command_position "$i" || continue
    saw_recursive=false
    saw_force=false

    for ((j = i + 1; j < ${#tokens[@]}; j++)); do
      token="${tokens[$j]}"
      is_separator "$token" && break
      [ -z "$token" ] && continue
      [ "$token" = "--" ] && continue

      if [[ "$token" = -* ]]; then
        [[ "$token" =~ [rR] ]] && saw_recursive=true
        [[ "$token" =~ [fF] ]] && saw_force=true
        continue
      fi

      if [ "$saw_recursive" = true ] && [ "$saw_force" = true ] && is_dangerous_rm_path "$token"; then
        return 0
      fi
    done
  done

  return 1
}

# git reset guard: block git reset --hard (any global options before reset, any options between reset and --hard).
has_git_reset_hard() {
  local i j k token

  for ((i = 0; i < ${#tokens[@]}; i++)); do
    is_git_command "${tokens[$i]}" || continue
    is_command_position "$i" || continue
    j=$(git_subcommand_index $((i + 1)))
    [ "${tokens[$j]}" = "reset" ] || continue
    for ((k = j + 1; k < ${#tokens[@]}; k++)); do
      token="${tokens[$k]}"
      is_separator "$token" && break
      [ "$token" = "--hard" ] && return 0
    done
  done

  return 1
}

# Return current branch if it's protected (main/master), else empty.
current_branch_if_protected() {
  local b
  b=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || return 0
  case "$b" in main|master) printf '%s' "$b" ;; esac
}

# force-push guard: block force pushes to main/master (explicit dest, refspec, or
# implicit current branch). Allows --dry-run.
has_force_push_to_main() {
  local i j k token saw_force saw_main saw_dryrun positional

  for ((i = 0; i < ${#tokens[@]}; i++)); do
    is_git_command "${tokens[$i]}" || continue
    is_command_position "$i" || continue
    j=$(git_subcommand_index $((i + 1)))
    [ "${tokens[$j]}" = "push" ] || continue

    saw_force=false
    saw_main=false
    saw_dryrun=false
    positional=0
    for ((k = j + 1; k < ${#tokens[@]}; k++)); do
      token="${tokens[$k]}"
      is_separator "$token" && break

      case "$token" in
        --force|--force=*|--force-with-lease|--force-with-lease=*)
          saw_force=true; continue ;;
        --dry-run|-n)
          saw_dryrun=true; continue ;;
        -[a-zA-Z]*)
          # short-option cluster: force if it contains f (e.g. -f, -uf, -fu)
          [[ "$token" == *f* ]] && saw_force=true
          continue ;;
        --*)
          continue ;;
      esac

      positional=$((positional + 1))
      local check_target="$token"
      if [[ "$token" = +* ]]; then
        saw_force=true
        check_target="${token#+}"
      fi
      [[ "$check_target" = *:* ]] && check_target="${check_target##*:}"
      case "$check_target" in
        main|master|refs/heads/main|refs/heads/master) saw_main=true ;;
      esac
    done

    [ "$saw_dryrun" = true ] && continue   # a dry run mutates nothing

    if [ "$saw_force" = true ]; then
      [ "$saw_main" = true ] && return 0
      # Implicit push (no positional remote/branch args) of a protected current branch.
      if [ "$positional" -eq 0 ] && [ -n "$(current_branch_if_protected)" ]; then
        return 0
      fi
    fi
  done

  return 1
}

# curl-pipe guard: block curl/wget piped into a shell, including via sudo/env/command wrappers.
is_shell_name() {
  case "$1" in
    sh|bash|zsh|dash|ksh|fish|ash|busybox) return 0 ;;
  esac
  return 1
}

has_curl_pipe_to_shell() {
  local i j k token w

  for ((i = 0; i < ${#tokens[@]}; i++)); do
    case "$(cmdname "${tokens[$i]}")" in curl|wget) ;; *) continue ;; esac
    is_command_position "$i" || continue

    for ((j = i + 1; j < ${#tokens[@]}; j++)); do
      token="${tokens[$j]}"
      case "$token" in ";"|"&") break ;; esac
      if [ "$token" = "|" ]; then
        k=$((j + 1))
        while [ "$k" -lt ${#tokens[@]} ]; do
          w="$(cmdname "${tokens[$k]}")"
          case "$w" in
            sudo|command|exec|env) k=$((k + 1)) ;;
            *)
              case "${tokens[$k]}" in -*|*=*) k=$((k + 1)) ;; *) break ;; esac ;;
          esac
        done
        is_shell_name "$(cmdname "${tokens[$k]}")" && return 0
      fi
    done
  done

  return 1
}

# eval/bash -c guard: block shell indirection wrapping destructive commands.
has_eval_wrapping_destructive() {
  local i j token inner
  for ((i = 0; i < ${#tokens[@]}; i++)); do
    case "$(cmdname "${tokens[$i]}")" in
      eval|bash|sh|zsh|dash|env)
        is_command_position "$i" || continue
        for ((j = i + 1; j < ${#tokens[@]}; j++)); do
          inner="${tokens[$j]}"
          is_separator "$inner" && break
          [ "$inner" = "-c" ] && continue
          is_shell_name "$(cmdname "$inner")" && continue
          if echo "$inner" | grep -qiE 'rm[[:space:]]+-rf|git[[:space:]]+push[[:space:]]+--force|DROP[[:space:]]+(TABLE|DATABASE)|TRUNCATE|git[[:space:]]+reset[[:space:]]+--hard'; then
            return 0
          fi
        done
        ;;
    esac
  done
  return 1
}

# SQL guard: block DROP/TRUNCATE only in a database-client context (not when the
# words merely appear as search text or in a commit message).
has_destructive_sql() {
  echo "$normalized" | grep -qiE '\b(psql|mysql|mariadb|sqlite3|mongosh?|cockroach|usql)\b' || return 1
  echo "$normalized" | grep -qiE 'DROP[[:space:]]+(TABLE|DATABASE)|TRUNCATE[[:space:]]' && return 0
  return 1
}

blocked=false

if has_dangerous_rm; then blocked=true; msg='rm -rf on root/home/project paths'; fi
if has_git_reset_hard; then blocked=true; msg='git reset --hard'; fi
if has_force_push_to_main; then blocked=true; msg='force push to main/master'; fi
if has_destructive_sql; then blocked=true; msg='DROP/TRUNCATE against a database client'; fi
if has_curl_pipe_to_shell; then blocked=true; msg='pipe curl/wget to shell'; fi
if has_eval_wrapping_destructive; then blocked=true; msg='shell indirection wrapping destructive command'; fi

if [ "$blocked" = true ]; then
  echo "BLOCKED: $msg" >&2
  # Best-effort audit (no-op where the ledger helper isn't installed).
  _audit="$(dirname "$0")/../infra/audit-log.sh"
  [ -x "$_audit" ] && "$_audit" hook_decision hook blocker decision block reason "$msg" cmd "$normalized" 2>/dev/null
  exit 2
fi
