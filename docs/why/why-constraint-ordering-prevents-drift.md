# Why constraint ordering prevents drift

## The problem

Agents drift. Given a list of priorities, they work on whatever feels most interesting or most tractable. Step 3 looks exciting. Step 2 is boring. The agent starts Step 3, discovers it depends on Step 2, patches over the dependency with assumptions, and ships something that looks complete but isn't grounded.

This is not a model problem. Frontier models reason well. The problem is that reasoning ability without execution ordering produces well-reasoned work on the wrong thing.

## The Alpha Vault evidence

The synthesis "Constraint as the Generative Primitive" (across 15+ sources) states it directly: smarter agents with loose constraints produce worse outcomes than mediocre agents with tight constraints. The constraint graph IS the intelligence.

Three related syntheses reinforce this:

**"Intelligence is free, discipline is the moat."** The value of an agent system is proportional to the rigidity of its state contract, not the sophistication of its intelligence. The explicit build order: identity, then policies, then ledger, then planner, then skills. That sequence IS a Constraint chain.

**"Restraint is the architecture."** The system that persists is the one that regulates itself rather than maximizing output. Without a regulating constraint, agents oscillate between perpetually adding features (drift) and perpetually fixing things (churn).

**"Locked invariants, organic growth."** Design the smallest possible set of locked invariants, then let everything else grow organically around them. The Constraint is a locked invariant. The steps change project to project. The sequential execution rule never changes.

## What The Constraint looks like

Four lines in SOUL.md:

```
[Step 1] -> [Step 2] -> [Step 3] -> [Step 4]
```

Each step must complete before the next begins. If the session drifts toward Step 3 while Step 2 isn't done, the agent calls it out.

The content is project-specific. A product launch might be: "Core feature working -> Tests passing -> Docs written -> Deployed." A research project might be: "Question framed -> Sources gathered -> Synthesis written -> Actions identified." The mechanism is universal. The steps are local.

## How it fires

The execution loop checks The Constraint at the LOVE step. Every significant task runs through STOP, SEE, LOVE, DISCERN, ACT, RELEASE. LOVE asks: does this serve the current Constraint step? If the answer is no, the task waits.

This is checked on every interaction. Not at session start. Not at wrap-up. Every time the agent is about to do work. The Constraint has three reinforcement points: declaration (SOUL.md), point of action (LOVE step), and verification (/wrap-up reflection).

## What other frameworks do

Every system that keeps agents focused uses a structural mechanism. None rely on the agent remembering what to prioritize.

**Ralph** encodes priorities in `prd.json` with boolean completion flags. The loop always picks the highest-priority incomplete item. Fresh context per iteration prevents accumulated drift.

**Archon** uses typed DAGs with `until: APPROVED` semantics. Tasks have explicit termination conditions. A node can't run until its dependencies complete.

**Evolver** uses mutation-gated strategy presets. In `repair-only` mode, innovation is hardcoded to 0%. Focus is enforced by mode gating, not instruction.

**Shannon** runs a four-phase pipeline (Recon, Mapping, Analysis, Exploitation). Phase 4 has a strict "no proof, no report" policy. The gate between phases is structural.

**Claude Code Game Studios** gives directors `disallowedTools: Bash` so they architecturally cannot do implementation work. Focus through tool restriction.

The common thread: focus is never achieved by instruction alone.

## The Agent Collider connection

The Agent Collider identifies Goal Chain (#31) as a particle found in 29 frameworks: every work item traces to its originating purpose. Reasoning Blueprint (#27), found in 39 frameworks, provides the design-time flowchart for how steps connect.

The Trust Diagonal (Thesis 1 from v0.3) maps the arc: external constraint, then behavioral gates, then accountability, then self-constraint. The Constraint follows this progression. The author defines the steps (external). The LOVE step checks them (behavioral gate). Drift gets flagged (accountability). Over time, the agent internalizes the ordering and catches its own drift (self-constraint).

## Why sequential, not parallel

The synthesis is explicit: "Serialize by default, parallelize explicitly."

A Constraint chain with steps out of order is worse than no chain at all. It creates false confidence. The agent believes it's making progress because it's completing steps. But completions out of order produce work that doesn't build on itself.

Sequential ordering forces the agent to verify that foundations exist before building on them. Boring. Effective. The same principle as "ground truth, then rules, then execution" applied to task ordering.

## The thin constitution

The coherence-granularity paradox from the Alpha Vault: "The constitution must be thin and always-present." The Constraint is four lines in SOUL.md. Thin enough to fit in the always-loaded layer. Present enough to fire on every interaction via the execution loop.

A thick constraint document (10 pages of priority rules) would compete for attention budget and lose. A thin constraint (four ordered steps) stays in working memory. The design is intentional. Not a shortcut. The compression IS the mechanism.
