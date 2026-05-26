# Bond Registry

> **Purpose:** Authoritative list of all known particle bonds and their Zordon implementations. The /collider-smash skill reads this file each run.
> **Source:** Agent Collider (src/data/particles.ts). Bonds discovered empirically by colliding 166+ frameworks.
> **Write:** When a new bond is discovered or an implementation changes.

---

## How to read this

Each bond connects two particles. "Required" means removing the connection breaks one or both particles. "Recommended" means both work alone but are stronger together.

**Verification** is the concrete check: what to grep, what file to read, what connection to confirm.

---

## Required Bonds (7)

### 1. Captured Insight
**Particles:** Self-Reflection -> Learning Loop
**What breaks without it:** Agent reflects but never saves the lesson. Thinking without learning.
**Zordon implementation:** /wrap-up Step 4 checks LEARNINGS.md and calls /learn for uncaught mistakes.
**Verification:** grep for "learn" or "LEARNINGS" in `.claude/skills/wrap-up/SKILL.md`

### 2. Learned Guardrail
**Particles:** Learned Rule -> Excuse Blocker
**What breaks without it:** Agent accumulates rules but never builds defenses against rationalizing past them.
**Zordon implementation:** /learn Step 2 injects anti-rationalization rows into the relevant skill's Anti-Rat Table.
**Verification:** grep for "anti-rationalization" or "Anti-Rat" in `.claude/skills/learn/SKILL.md`

### 3. Goal Persistence
**Particles:** Goal Chain <-> Session Checkpoint
**What breaks without it:** Goals survive inside a session but drift between sessions. Work loses its thread.
**Zordon implementation:** TODO.md (goal chain) + HANDOFF.md (session checkpoint, rewritten by /wrap-up).
**Verification:** confirm TODO.md and HANDOFF.md both exist and HANDOFF.md references current TODO priorities.

### 4. Bounded Learning
**Particles:** Learning Loop <-> Write Access
**What breaks without it:** Agent learns by writing files but has no limits on what it can overwrite. Learning becomes corruption.
**Zordon implementation:** SECURITY.md defines write boundaries. PreToolUse hooks guard identity files. Skill frontmatter `paths` field.
**Verification:** confirm SECURITY.md exists. grep for "PreToolUse" in `.claude/settings.json` or `.claude/settings.local.json`.

### 5. Grounded Self-Check
**Particles:** Output Proof -> Self-Reflection
**What breaks without it:** Agent evaluates its own work without checking if the work actually landed. Self-assessment becomes opinion.
**Zordon implementation:** /wrap-up Step 3 (Output proof) verifies every significant action before the learning loop fires. CLAUDE.md Top Mistake Pattern #1: "Success signal without ground-truth check." Execution loop ACT step: "verify it worked."
**Verification:** grep for "Output proof" or "verify" in `.claude/skills/wrap-up/SKILL.md`. Confirm Step 3 runs before Step 4 (LEARNINGS check).

### 6. Guarded Writes
**Particles:** Hard Guardrails -> Write Access
**What breaks without it:** Agent with file access but no barriers rewrites its own safety rules.
**Zordon implementation:** PreToolUse blocker hook blocks destructive commands. Context-guard hooks (grown per project) warn on edits to sensitive areas without re-reading context first. See Terpmon for a mature example with 10 area-specific guards.
**Verification:** grep for blocker patterns in `.claude/settings.json`. Check for context-guard.sh if project has matured past initial morph.

### 7. Cross-Check
**Particles:** Parallel Dispatch -> Blind Spot Check
**What breaks without it:** Multiple agents answer but nobody finds what they all missed. Redundancy without synthesis.
**Zordon implementation:** /ranger Step 4: anonymous peer review with forced dissent. If 4+ agree, one must steelman the opposing view.
**Verification:** grep for "dissent" or "peer review" or "anonymous" in `.claude/skills/ranger/SKILL.md`

---

## Recommended Bonds (5)

### 8. Accountable Memory
**Particles:** Permanent Log <-> Staleness Score
**What breaks without it:** Logs grow forever. Old entries drown current ones.
**Zordon implementation:** memory/ session logs + cadence-based staleness (hot 7d, tactical 30d, stable 60d). /declutter enforces decay.
**Verification:** grep for "cadence" or "staleness" or "hot" in MEMORY.md header. Confirm /declutter exists.

### 9. Structured Authority
**Particles:** Authority Separation -> Human Approval
**What breaks without it:** Authority exists but approval is ad-hoc. No clear escalation path.
**Zordon implementation:** SECURITY.md: "Cognition is not execution." Irreversibility Rule requires explicit human confirmation.
**Verification:** grep for "irreversib" in SECURITY.md.

### 10. Resilient Recall
**Particles:** Just-in-Time Memory <-> Context Budget
**What breaks without it:** Agent loads everything upfront and hits context limits. Or loads nothing and misses what matters.
**Zordon implementation:** 4-layer architecture. Layer 0-1 always loaded, Layer 2 on-demand, Layer 3 write-only. File size caps enforce budget.
**Verification:** confirm CLAUDE.md Layer 1/Layer 2 distinction exists. Confirm file size caps table exists.

### 11. Curated Memory
**Particles:** Cleanup Rules -> Knowledge Refinery
**What breaks without it:** Old knowledge removed but surviving knowledge never gets distilled. Pruning without polishing.
**Zordon implementation:** /declutter prunes (cleanup). /wrap-up Step 5 distills to MEMORY.md (refinement). Hot -> warm -> cold -> archived.
**Verification:** grep for "MEMORY" or "distill" in `.claude/skills/wrap-up/SKILL.md`. Confirm /declutter Step 2 handles MEMORY.md.

### 12. Self-Testing Skill
**Particles:** Skill Extraction <-> Self-Reflection
**What breaks without it:** Skills that test their own output improve over time. Skills that don't stay frozen at whatever quality they started at.
**Zordon implementation:** /wrap-up skill extraction step evaluates whether extracted patterns actually worked. Skills with anti-rationalization tables self-correct.
**Verification:** grep for "skill extraction" in `.claude/skills/wrap-up/SKILL.md`. Confirm extracted skills get tested before promotion.

### 13. Ranger Memory
**Particles:** Parallel Dispatch <-> Scoped Memory
**What breaks without it:** Rangers debate the same questions repeatedly. No institutional knowledge.
**Zordon implementation:** /ranger Step 0 loads ranger memory. Step 7b writes back. Contradict-check before write. Cap: 20 entries.
**Verification:** grep for "memory" in `.claude/skills/ranger/SKILL.md`. Confirm Step 0 and Step 7 reference memory.

---

## Bond Pair Quick Reference

Machine-readable mapping from bond keys to particle IDs.

| # | Bond Key | Name | Type | Particle A | Particle B | Direction |
|---|---|---|---|---|---|---|
| 1 | bond-ReLa | Captured Insight | required | self-reflection | learning-loop | directed |
| 2 | bond-ArMp | Learned Guardrail | required | pattern-rule | pre-rebuttal | directed |
| 3 | bond-GaSp | Goal Persistence | required | task-lineage | session-checkpoint | mutual |
| 4 | bond-SgEb | Bounded Learning | required | learning-loop | write-access | mutual |
| 5 | bond-VeRe | Grounded Self-Check | required | output-proof | self-reflection | directed |
| 6 | bond-HgWa | Guarded Writes | required | hard-guardrails | write-access | directed |
| 7 | bond-PdGd | Cross-Check | required | parallel-dispatch | gap-detection | directed |
| 8 | bond-AuIl | Accountable Memory | recommended | permanent-log | staleness-score | mutual |
| 9 | bond-AsHl | Structured Authority | recommended | authority-separation | human-approval | directed |
| 10 | bond-WpCw | Resilient Recall | recommended | context-surface | context-budget | mutual |
| 11 | bond-DdDc | Curated Memory | recommended | cleanup-rules | refinement-tiers | directed |
| 12 | bond-SkRe | Self-Testing Skill | recommended | skill-extraction | self-reflection | mutual |
| 13 | bond-CpSm | Ranger Memory | recommended | parallel-dispatch | scoped-memory | mutual |

---

## Discovery Queue

> Bonds suspected but not yet validated. Add candidates here. Promote to Required/Recommended after evidence from 2+ frameworks or 2+ incidents.

*Empty. No unvalidated bonds yet.*

---

*Registry current as of May 2026. Bond definitions from Agent Collider (13 bonds, verified against src/data/bond-pairs.ts). Zordon implementations verified against scaffold files.*
