---
name: declutter
description: "Monthly maintenance. Prune LEARNINGS.md (15 cap), compress MEMORY.md (hot/warm/cold), decay memory/topics/ entries, prune skill memories (20 cap), prune council memories (20 cap). Staleness formula + Accountable Memory bond."
model: sonnet
triggers:
  - "declutter"
  - "monthly cleanup"
  - "prune docs"
  - "compress memory"
  - "/declutter"
---

# Declutter -- Monthly Cleanup

Run monthly (or when files are visibly bloated). The goal: every file stays under its cap by graduating content that's now enforced elsewhere.

Run alongside /tune (structure check) and /collider-smash (particle verification). Three monthly skills, three levels of project health.

## Steps

### 1. LEARNINGS.md (cap: 15 active entries)

For each entry, ask: "Is this rule now enforced in code, a hook, a skill, or CLAUDE.md?" If yes, archive it. Move to an `## Archived` section at the bottom of LEARNINGS.md.

Check:
- Each entry has: date, mistake, root cause, rule, enforced-in
- Status tags are current
- No duplicate root causes (merge if found)
- Total active entries at or below 15

If at 15 and a new entry needs to be added, extract the top 3 recurring root causes into CLAUDE.md's Top Mistake Patterns section first, then archive the covered entries.

### 2. MEMORY.md (cap: 200 lines)

Review entries in auto-memory (`.claude/projects/*/memory/MEMORY.md`) and/or root-level MEMORY.md:
- Entries older than 30 days with no recent grep hits: flag as candidates for removal
- Multi-line entries: compress to single lines (~150 chars)
- Entries that duplicate information in Layer 1 files (CLAUDE.md, SOUL.md): remove from MEMORY.md
- Entries superseded by newer entries: remove the old one

### 3. TODO.md (cap: 15 items)

- Remove completed items older than 30 days
- Collapse "Later" items that haven't moved in 60+ days: either promote to Next or delete
- Verify Now/Next/Later structure is maintained
- Items without a clear next action: rewrite or delete

### 4. memory/topics/ (cadence-based decay)

Check each file in `memory/topics/`:
- **Run the staleness formula** (same as Step 5) if entries have cadence tags. If no cadence tags, fall back to: entries older than 90 days without re-verification = stale
- Content that's now in CLAUDE.md, skill files, or council memory: remove (it graduated)
- Empty or near-empty topic files: consider merging or deleting

### 5. Skill memory (cap: 20 entries per file)

Check each `.claude/skills/<name>/memory.md` that exists.

**Staleness formula:** For each entry with a cadence tag and last-confirmed date, compute:

```
staleness = (today - last_confirmed_date) / cadence_days
```

Cadence days: `hot=7`, `tactical=30`, `stable=60`, `frozen=never (skip)`.

| Staleness | Status | Action |
|-----------|--------|--------|
| < 1.0 | Fresh | No action |
| 1.0 - 2.0 | Aging | Re-confirm if touched this session |
| > 2.0 | **Stale** | Must re-verify or remove |
| > 4.0 | **Critical** | Likely outdated. Verify against current code/state or delete |

Example: A `tactical` entry (30d) last confirmed 75 days ago = 75/30 = **2.5 (stale)**. A `stable` entry (60d) last confirmed 75 days ago = 75/60 = 1.25 (aging, OK).

Run the formula on every entry in every skill memory file. Present results grouped by status (stale first, then aging). Frozen entries are immune.

**Accountable Memory bond (Permanent Log verifies Staleness Score):**

Before evicting or flagging any entry as stale, cross-reference the permanent session logs (`memory/YYYY-MM-DD.md`):

```
grep -rl "<key phrase from entry>" memory/20*.md
```

If the entry's principle was used, referenced, or relevant in a session MORE RECENT than its `last-confirmed` date, the entry is NOT actually stale. Someone just forgot to bump the date. Action: update `last-confirmed` to the session date where it appeared. Don't evict.

If the entry has NO hits in session logs since its `last-confirmed` date: it's genuinely stale. Proceed with verification or eviction.

This prevents killing knowledge that's actively in use but whose timestamp drifted. The log is ground truth. The staleness score is a signal, not a verdict.

Additional checks:
- Cap: 20 entries per file. Evict oldest `last-confirmed` if over cap
- Entries that contradict each other: resolve or flag
- Entries that duplicate council memory: keep in the more specific location only
- Entries missing cadence tags or last-confirmed dates: add them (use `stable` as default cadence, today as last-confirmed if the entry was verified this session)

### 6. HANDOFF.md (freshness check)

"Things NOT to Do" items older than 3 sessions: migrate to their real owner file:
- Recurring mistakes go to LEARNINGS.md
- Platform gotchas go to `memory/topics/`
- Security constraints go to SECURITY.md
- Identity constraints go to SOUL.md or USER.md
- Skill-specific constraints go to that skill's memory.md

HANDOFF.md should be fresh, not accumulated. It's a state file, not a log.

### 7. Council memory (cap: 20 entries per council)

Check each `councils/*/memory.md`:
- Each capped at 20 entries
- **Run the staleness formula** (same as Step 5) on every entry with `last-confirmed`
- **Run the Accountable Memory bond** (same as Step 5) before evicting: grep session logs to verify the entry isn't actively in use with a drifted timestamp
- Evict oldest `last-confirmed` if over cap. Stale entries (>2.0) evict before aging entries
- Check for entries that contradict each other (resolve or escalate)
- Check for entries that are now enforced structurally (graduate to CLAUDE.md or skill file)
- Voice calibration and session calibration sections don't count toward the 20-entry cap but should be compressed if they exceed 5 lines each

### 8. Report

Present the compression report:

```
## Compression Report -- YYYY-MM-DD

| File | Before | After | Graduated/Removed |
|------|--------|-------|-------------------|
| LEARNINGS.md | N entries | N entries | [list what graduated] |
| MEMORY.md | N lines | N lines | [list what moved/removed] |
| TODO.md | N items | N items | [list what removed] |
| memory/topics/ | N files, N total entries | N files, N entries | [list stale flags] |
| Skill memories | N total entries across N files | N entries | [list evictions] |
| HANDOFF.md | N "don't" items | N items | [list migrations] |
| Council memories | N total entries across N councils | N entries | [list evictions] |

### Staleness Report
| File | Entry | Cadence | Last Confirmed | Staleness | Status |
|------|-------|---------|----------------|-----------|--------|
| [file] | [principle name] | hot/tactical/stable | YYYY-MM-DD | N.N | Stale/Critical |

### Actions taken
- [what was archived, removed, migrated]

### Flags for human
- [stale entries that need human decision]
- [contradictions found]
- [critical staleness entries (>4.0) that may be outdated]
```

**Where this report goes:** The session log (`memory/YYYY-MM-DD.md`) under the current session. Not a separate file. Git history preserves the actual diffs.

## Skill Memory Format (gold standard)

Every skill memory file should follow this format:

```markdown
# /[skill-name] Skill Memory

> **Cap:** 20 entries. When full: compress clusters first, reference file second, forget (delete proven-wrong) third.
> **Cadence tags:** hot (7d review) | tactical (30d) | stable (60d) | frozen (never, historical fact)

## Validated Principles

- **[Bold principle name].** [Explanation]. cadence: [tag]. last-confirmed: [YYYY-MM-DD]

## Dead Directions

- **[Bold direction name].** [Why it's dead]. Added: [YYYY-MM-DD].

## Distillation Log

| Date | Entries reviewed | Promoted | Archived |
|---|---|---|---|
```

If a file doesn't match this format, standardize it before running the staleness formula.

## When to run

- **Monthly** alongside /tune and /collider-smash
- **When context feels stale** (reading the same outdated entries repeatedly)
- **Before a big feature push** (clear the deck so new learnings have room)
- **When any file visibly exceeds its cap**

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "All these entries are still relevant" | If a rule is enforced in code or a hook, keeping it in LEARNINGS is redundant. Graduate it. |
| "I might need this entry later" | That's what git history is for. If you need it, grep the log. |
| "Compression takes too long, I'll do it next month" | Doc bloat compounds. Every month you skip, the next compression is harder. 15 minutes now saves hours of context waste later. |
| "The council memories are all important" | 20 entries per council forces prioritization. If everything is important, nothing is. Evict the oldest last-confirmed. |
| "I'll just add one more entry over the cap" | Caps exist because agent context is finite. One over becomes five over becomes thirty over. The cap is the cap. |
| "memory/topics/ files are reference material, they don't decay" | Everything decays. Platform APIs change, workarounds become unnecessary, gotchas get fixed. 90 days without re-verification means re-verify or remove. |
