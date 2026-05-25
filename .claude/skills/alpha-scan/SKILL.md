---
name: alpha-scan
description: Search the Alpha Vault (559+ curated research sources) for patterns relevant to THIS project. The vault is the ecosystem's private research arm. The skill is the interface.
model: sonnet
user-invocable: true
triggers:
  - "alpha scan"
  - "vault scan"
  - "search the vault"
  - "what does the vault say about"
  - "is there something better"
  - "/alpha-scan"
---

# Alpha Scan

Search the Alpha Vault for research relevant to this project. The vault is private. The skill ships everywhere. The data doesn't.

## Step 0 -- Vault discovery

```bash
VAULT_PATH="${ALPHA_VAULT_PATH:-$HOME/Desktop/Alpha Vault}"
if [ ! -d "$VAULT_PATH" ]; then
  echo "Alpha Vault not found at $VAULT_PATH"
  echo "Set ALPHA_VAULT_PATH in .env or ensure the vault exists at the default location."
  exit 1
fi
```

Check the vault exists. If not, stop and tell the user. Don't guess. Don't fall back to web search (that's /deep-research).

## Step 1 -- Understand the project

Read SOUL.md (or CLAUDE.md if no SOUL.md) to understand what this project does. The vault has 559+ sources covering agent frameworks, memory systems, orchestration, automation, scraping, identity, and more. Knowing the project's domain determines which sources are relevant.

## Step 2 -- Frame the query

The user asked a question or raised a problem. Frame it as a vault search:

- **Specific question:** "Is there a better way to handle memory decay?" → search vault for memory, decay, staleness, retention patterns
- **General scan:** "What's relevant to this project?" → read the vault index, match sources to the project's domain
- **Upgrade check:** "Is there something better than what we're doing for X?" → find the current implementation, search vault for alternatives

## Step 3 -- Search the vault

Read the vault index at `$VAULT_PATH/index.md`. This catalogs every source with summary pages and status.

For targeted queries: grep the vault for relevant terms.

```bash
grep -rli "$SEARCH_TERM" "$VAULT_PATH/raw/" --include="*.md" | head -20
```

For broad scans: read index.md and identify sources by domain relevance.

Read the matching source files (in `$VAULT_PATH/raw/[source].md`). These are full summaries, not abstracts. Read the whole file for each relevant source.

## Step 4 -- Evaluate with 5 questions

For each relevant finding:

| # | Question | How to answer |
|---|---|---|
| 1 | **Same problem?** | Name the specific pattern in THIS project it overlaps with. Be precise. |
| 2 | **Better outcome?** | Does their approach produce measurably better results? State the specific improvement. |
| 3 | **Evidence?** | Benchmarks, production data, concrete examples, or theoretical? |
| 4 | **Portable?** | Can this project adopt the pattern without new infrastructure? |
| 5 | **What breaks?** | Does adopting this break existing behavior or add complexity? |

## Step 5 -- Assign verdict

| Verdict | Criteria | Action |
|---|---|---|
| **Adopt** | Better outcome + portable + nothing critical breaks | Plan the switch. Write to research/. |
| **Adapt** | Better pattern but needs modification for this project | Write to research/ with adaptation notes. |
| **Note** | Interesting but not actionable now | Write to research/ as reference. |
| **Skip** | Not relevant, not better, or insufficient evidence | Don't write anything. |

## Step 6 -- Write results

Save to `research/YYYY-MM-DD-alpha-scan-[topic].md`:

```markdown
# Alpha Scan: [Topic]

**Date:** YYYY-MM-DD
**Query:** [What was searched for]
**Sources reviewed:** N
**Relevant findings:** N

## Findings

### [Source name]
**Verdict:** Adopt / Adapt / Note
**What they do:** [One paragraph]
**How it compares to what we do:** [One paragraph]
**Recommendation:** [Specific action]

## Key takeaway
[One sentence: what's the most important thing this project should do differently?]
```

## Step 7 -- Memory triage

For each finding with an Adopt or Adapt verdict:

| Finding type | Destination |
|---|---|
| Better approach for a specific skill | `.claude/skills/<name>/memory.md` as Validated Principle |
| Project-wide insight | `MEMORY.md` one-liner with vault source citation |
| Contradicts existing memory | Update the existing entry, don't append |

## Access model

The Alpha Vault is private research. It is the ecosystem's moat.

- **Today:** Filesystem access. The vault lives at a local path. Projects on the same machine can read it. Cloned repos cannot.
- **Tomorrow:** API access. The skill checks for an API key instead of a file path. Free tier gets limited queries. Paid tier gets full access.
- **The skill is the interface.** When the access model changes, only Step 0 and Step 3 change. Everything else stays the same.

The vault never ships with any repo. The skill ships with every repo.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I'll just use /deep-research instead" | /deep-research searches the open web. The vault has 559+ curated sources with analysis you won't find on Google. Different tool, different corpus. |
| "The vault probably doesn't cover this topic" | The vault covers agent frameworks, memory, orchestration, automation, identity, scraping, and more. Search first, assume nothing. |
| "I already know what approach to use" | You know what YOU know. The vault contains patterns from 400+ frameworks. Search anyway. |
| "The vault is too big to search" | That's why the index exists. Read index.md. grep for terms. Don't read the whole vault. |
| "This finding isn't actionable right now" | Write it to research/ anyway. The next session might need it. |
