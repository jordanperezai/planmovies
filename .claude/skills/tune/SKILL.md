---
name: tune
description: "Structural alignment + cross-file conflict detection. Verify every file matches its scaffold archetype, then check for duplicate rules, contradictions, and stale references across files. Run monthly alongside /declutter and /collider-smash."
user-invocable: true
model: sonnet
autonomous_safe: true
blast_radius: low
triggers:
  - "tune"
  - "structural check"
  - "check file structure"
  - "are files structured correctly"
  - "audit setup"
  - "check my setup"
  - "clean up docs"
  - "/tune"
---

# Tune -- Structural Alignment Check

The Zordon scaffold defines 7 file archetypes (identity, rule, state, index, log, skill, reference). Each has rules for section ordering, formatting, and visual rhythm. Files drift from these over time. /tune catches the drift.

/declutter checks size. /collider-smash checks particles. /tune checks structure. Three monthly skills, three levels of project health.

## Phase 1: Load references

1. **Load the structure bible.** Read `~/Desktop/Zordon/.claude/skills/morph/references/structure.md`. This is the authoritative reference for all 7 archetypes. Also read CLAUDE.md for Zordon-OS's file size caps and edit discipline rules.

## Phase 2: Check identity files

2. **SOUL.md** (identity archetype). Check:
   - 8 canonical sections present: opening statement, execution loop, Constraint, beliefs, value tensions, failure modes, recovery procedures, expectations
   - Sections in the correct order (process before priority, constraints before content)
   - Prose over lists (except value tensions which use a hybrid)
   - Opening statement captures the essence in one paragraph
   - No tables (identity is felt, not enumerated)
   - Under 250 lines

3. **USER.md** (identity archetype). Check:
   - Opening statement present
   - Prose over lists
   - Under 250 lines

## Phase 3: Check rule files

4. **CLAUDE.md** (rule archetype). Check:
   - Trust statement present after header
   - Read-at-session-start section lists Layer 1 and Layer 2 files
   - Sections grouped by domain (session reads, what this repo is, skills, mistake patterns, edit discipline, decision rules)
   - Bullets over prose for rules
   - Tables for reference data (file caps, key directories)
   - Every rule justified by evidence (no aspirational rules)
   - Under 250 lines

5. **SECURITY.md** (rule archetype). Check:
   - Core principle stated ("cognition is not execution" or equivalent)
   - Irreversibility rule present with steps
   - Command blocker list present
   - Under 250 lines

6. **WILL.md** (rule archetype). Check:
   - Autonomy scale table present
   - Active Jobs table present
   - Under 250 lines

## Phase 4: Check state files

7. **HANDOFF.md** (state archetype). Check:
   - "Last updated" date present and current
   - "Where We Left Off" section present
   - "Immediate Next Actions" as numbered list
   - "Things NOT to Do" present
   - No prose paragraphs longer than 2 sentences
   - Under 150 lines

8. **TODO.md** (state archetype). Check:
   - Now/Next/Later structure
   - Under 15 items total
   - No completed items older than 30 days

## Phase 5: Check index files

9. **MEMORY.md** (index archetype). Check:
   - Entries are pointers, not content
   - Every entry under 150 characters
   - Under 200 lines

## Phase 6: Check log files

10. **LEARNINGS.md** (log archetype). Check:
    - Entries have date, mistake, root cause, rule, enforced-in fields
    - Under 15 active entries
    - Status tags present where applicable

## Phase 7: Check reference and hybrid files

11. **TOOLS.md** (reference archetype). Check:
    - No empty template rows
    - Every tool has status
    - Under 150 lines

12. **memory/topics/*.md** (reference files). Spot-check 2 topic files:
    - Each has a clear purpose at the top
    - Content is structured for grep, not prose reading
    - Cadence tags present where applicable

13. **rangers/CLAUDE.md** (index archetype). Check:
    - Lists all rangers with short descriptions
    - Pointers to roster and memory files

## Phase 8: Check skill files

14. **Spot-check 3 skill files.** For each, check:
    - YAML frontmatter present with `name` and `description`
    - `user-invocable: true` present
    - Description answers both "what" and "when"
    - Steps are numbered
    - Phase headers present if 8+ steps
    - Anti-rationalization table at end
    - Under 500 lines
    - Rotate which skills get checked each run

## Phase 9: Cross-file conflict detection

15. **Duplicate rules.** Grep for key phrases across all Layer 1 and Layer 2 files. Flag any rule, fact, or instruction that appears in more than one file. One Owner principle: every fact lives in ONE file. Others reference with a pointer.

16. **Contradictions.** Check for files that say opposite things:
    - CLAUDE.md decision rules vs ranger validated principles
    - SOUL.md beliefs vs LEARNINGS.md rules
    - WILL.md autonomy policies vs SECURITY.md boundaries
    - Skill SKILL.md instructions vs CLAUDE.md rules
    - Ranger roster ground rules vs rangers/CLAUDE.md session flow

17. **Stale references.** Grep all skills and docs for references to files, skills, or directories that no longer exist. Common offenders:
    - Retired files (CONTEXT.md, PLAYBOOK.md, ARCHITECTURE.md, TOOLS-RESEARCH.md)
    - Renamed skills (verify-effect, self-improve, slop-gate, incident-review, challenge)
    - Deleted directories (scripts/, incident-reviews/)

18. **Orphaned pointers.** Check MEMORY.md entries. Does every pointer reference a file that still exists? Check CLAUDE.md skill list. Does every skill listed still have a directory?

## Report

19. **Write the report** and present to the user:

    ```
    ## Tune Report: YYYY-MM-DD

    ### In tune (no drift)
    - [list files that pass]

    ### Drifted (needs attention)
    | File | Archetype | Issue | Severity |
    |---|---|---|---|
    | SOUL.md | Identity | Missing Value Tensions section | Medium |
    | ... | ... | ... | ... |

    ### Summary
    N/N files in tune. N drifted. N critical.
    ```

    Severity levels:
    - **Critical:** Missing required section. Section ordering wrong. Wrong archetype pattern (bullets in identity file, prose in rule file).
    - **Medium:** Section present but incomplete. Approaching cap. Visual rules not followed.
    - **Low:** Minor formatting. Placeholder text remaining. Style preference.

16. **Don't fix.** Report only. The human decides what to address.

## When to run

- **Monthly** alongside /declutter and /collider-smash
- **Session 10+** (files have had time to drift)
- **After big refactors** (structural changes can shift file organization)
- **When something feels off** but you can't name what

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "The files work fine, structure doesn't matter" | Structure is how agents read files. Wrong structure = wrong L0/L1 tiers = agent misreads the file. |
| "This is just formatting, not substance" | An identity file written as bullets loses its voice. A state file written as prose loses its scannability. Format IS substance for agent-read files. |
| "We just wrote these files, they can't have drifted" | Drift starts on the first edit after creation. One section added in the wrong place. One paragraph that should be a bullet. Compound over 10 sessions. |
| "I'll just eyeball it" | You'll miss the section ordering. You'll miss the 150-char entries that grew to 200. The structure bible has 7 archetypes with specific rules. Eyeballing doesn't scale. |
| "Zordon-OS doesn't have VOICE.md so skip voice checks" | Voice is embedded in SOUL.md here. Check the voice-relevant sections within SOUL.md instead of skipping entirely. |
