# Molecule Registry

> **Purpose:** Authoritative list of all known particle molecules and their Zordon implementations. The /collider-smash skill reads this file each run.
> **Source:** Agent Collider (src/data/particles.ts). Molecules are multi-particle patterns that create emergent capabilities.
> **Write:** When a new molecule is discovered or an implementation changes.

---

## How to read this

Each molecule combines 3+ particles into a pattern that creates something none of them does alone. "Assembled" means the full pattern is wired and working. "Partial" means some pieces are in place.

**Verification** checks whether the pattern functions as a unit, not just whether the parts exist.

---

## The 7 Molecules

### 1. Minimum Viable Agent
**Particles:** Self-Reflection + Skill Extraction + Skill Card
**What it creates:** The irreducible core. Every full agent system tested has these three. Remove any one and the agent degrades.
**Zordon implementation:** /wrap-up Phase 1 (output proof = self-reflection). /wrap-up Phase 3 Step 7 (skill extraction check). Every skill has SKILL.md with YAML frontmatter (skill card).
**Verification:** Confirm /wrap-up has output proof step, skill extraction step, and at least one skill exists with frontmatter.

### 2. Agent Loop
**Particles:** Reasoning Blueprint -> Tool Card -> Self-Reflection
**What it creates:** The core cycle: plan, act, evaluate. Every ReAct-style agent implements this.
**Zordon implementation:** Skill SKILL.md procedures (reasoning blueprint). MCP tool interface (tool card, external). Execution loop ACT step + /wrap-up output proof (self-reflection).
**Verification:** Confirm at least one skill has step-by-step procedures. Confirm execution loop exists in SOUL.md. Confirm /wrap-up has output proof.

### 3. Skill Creation
**Particles:** Skill Extraction -> Skill Card -> (new skill produced)
**What it creates:** Agent creates new callable tools from repeated experience.
**Zordon implementation:** /wrap-up Phase 3 Step 7 proposes skills when patterns repeat. New skills get SKILL.md with YAML frontmatter. CLAUDE.md Self-Improvement section documents the escalation ladder.
**Verification:** Confirm /wrap-up has skill extraction check. Confirm CLAUDE.md has escalation ladder (pattern -> owner file -> skill -> hook).

### 4. Workspace Boundary
**Particles:** Scoped Memory + Hard Guardrails + Write Access
**What it creates:** Structural isolation for multi-project/multi-context agents.
**Zordon implementation:** memory/ directory scoped per project (scoped memory). PreToolUse blocker hook (hard guardrails). Skill frontmatter `paths` field + SECURITY.md (write access).
**Verification:** Confirm memory/ exists. Confirm blocker hook in settings.json. Confirm SECURITY.md exists.

### 5. Token Budget
**Particles:** Context Budget + Reasoning Budget + Hard Guardrails
**What it creates:** Cognitive economy. How much to hold in mind + how long to think + enforce both structurally.
**Zordon implementation:** 4-layer memory with file size caps (context budget). `model:` routing in skill frontmatter (reasoning budget). PreToolUse hooks enforce structurally (hard guardrails).
**Verification:** Confirm CLAUDE.md has file size caps table. Confirm at least one skill has `model:` in frontmatter. Confirm hooks exist.

### 6. Ranger Pattern
**Particles:** Parallel Dispatch + Blind Spot Check + Self-Reflection
**What it creates:** Multiple agents answer independently, synthesis finds what all missed, evaluate combined output.
**Zordon implementation:** /ranger spawns 5 independent voices (parallel dispatch). Step 4 anonymous peer review with forced dissent (blind spot check). Chairman synthesis evaluates combined output (self-reflection).
**Verification:** Confirm /ranger skill exists. grep for "independent" or "parallel" and "dissent" or "blind spot" in ranger/SKILL.md.

### 7. Verified Autonomy
**Particles:** Scheduled Task + Output Proof + Messaging Gateway
**What it creates:** Agent runs on schedule, proves work happened, reports results. Autonomy with accountability.
**Zordon implementation:** WILL.md defines scheduled jobs (scheduled task). `infra/auto-skill.sh` chains execution + proof + notification into a single template. It checks WILL.md authorization, runs the skill via Claude Code, captures output as proof in `memory/autonomous/`, and calls message.sh with results.
**Verification:** Confirm WILL.md has Active Jobs table. Confirm `infra/auto-skill.sh` exists. Confirm `infra/message.sh` exists. Confirm `memory/autonomous/` directory is created on first run.

---

## Discovery Queue

> Molecules suspected but not yet validated. Add candidates here. Promote after evidence from 2+ frameworks or observation in this project.

*Empty. No unvalidated molecules yet.*

---

*Registry current as of v6.2 (May 2026). Molecule definitions from Agent Collider (7 molecules, verified against src/data/particles.ts). Zordon implementations verified against scaffold files.*
