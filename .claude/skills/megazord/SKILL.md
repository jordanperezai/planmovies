---
name: megazord
description: "Combine all ranger teams on one decision. Route to multiple teams, map alignment, surface blind spots no single team caught."
user-invocable: true
model: sonnet
autonomous_safe: false
blast_radius: medium
triggers:
  - "megazord"
  - "combine rangers"
  - "all rangers"
  - "/megazord"
---

# Megazord

## Purpose

When a decision cuts across multiple domains, one ranger team gives a partial view. /megazord auto-selects the relevant teams, runs them in parallel, and synthesizes where they agree, where they disagree, and what ALL of them missed.

---

## Step 0 -- Frame the decision

State clearly:
- What's being decided
- What the options are (if known)
- What's at stake

## Step 1 -- Select ranger teams

Map the decision to ranger teams based on what it touches. Read `rangers/CLAUDE.md` for the full list of available ranger teams.

**Minimum 2 ranger teams. Maximum 5.** If the decision only maps to 1 ranger team, use that ranger team's skill directly.

Present the selected ranger teams to the user for approval before proceeding. The user can add or remove ranger teams.

## Step 2 -- Run ranger teams in parallel (Context Isolation Protocol)

Spawn all selected teams using the Agent tool in a single message (parallel execution). Each team gets:
- The same framed decision (neutral, no opinions)
- Their own roster and memory
- The standard session flow from rangers/CLAUDE.md

**Context isolation rules (non-negotiable):**

1. **Neutral framing.** The decision prompt contains the question, options, and constraints. No arguments for or against. No "we're leaning toward X." No adjectives that color options. Facts only.
2. **No prior conclusion.** If the human expressed a preference, strip it from the team prompts. Rangers advise on the question, not validate a choice already made.
3. **No cross-team contamination.** Each team is spawned in parallel. They cannot see each other's output or know which other teams are running.
4. **No confidence anchoring.** Don't tell teams "most people agree" or "the common approach is." Let each team arrive at confidence independently.
5. **Verifier voices check artifacts, not arguments.** Each team's verifier reads actual files, checks git state, or inspects live systems.
6. **No synthesis leakage.** When presenting results in Step 3, do NOT editorialize. Present each team's verdict as-is before synthesizing.

If the prompt would make a reasonable person guess which answer you want, rewrite it.

## Step 3 -- Alignment map

After all ranger teams report, build the alignment table:

```
| Ranger team | Verdict | Confidence | Key argument |
|---------|---------|------------|--------------|
| [name] | [recommendation] | [H/M/L] | [one line] |
| [name] | [recommendation] | [H/M/L] | [one line] |
```

Classify:
- **Full alignment** -- all ranger teams recommend the same direction
- **Partial alignment** -- majority agrees, minority dissents
- **Split** -- no clear majority
- **Contradiction** -- ranger teams recommend mutually exclusive actions

## Step 4 -- Blind Spot Check

This is the load-bearing step. Ask:

1. **What did ALL ranger teams agree on without debate?** (Consensus without friction often means a shared assumption nobody questioned.)
2. **What topic did NO ranger team raise?** (The gap between what was discussed and what matters.)
3. **Which stakeholder perspective is missing?** (Customer? Competitor? Regulator? Future self?)
4. **What's the worst outcome if the consensus is wrong?**
5. **Which claims from the ranger teams could be checked against actual files but weren't?**

Write the blind spots explicitly. These are often more valuable than the verdicts.

## Step 5 -- Synthesis

```
Multi-ranger team review on [topic]:

Alignment: [Full / Partial / Split / Contradiction]

Agreed: [what all ranger teams aligned on]
Disputed: [where they diverged and why]

Blind spots:
- [what nobody mentioned]
- [shared assumption that wasn't challenged]

Recommendation: [synthesized direction]
Confidence: [H/M/L]
Risk if wrong: [one sentence]

Next steps:
1. [action]
2. [action]

Full sessions: [list of ranger team session files]
```

## Step 6 -- Log to all ranger team memories

Update each participating ranger team's `memory.md`:
- New validated principle if the review confirmed one
- New dead direction if it killed one
- Cross-reference: "This principle was validated across [N] ranger teams in megazord session on [date]"

---

## Anti-Rationalization Table

| Excuse | Truth |
|--------|-------|
| "One ranger team is enough for this decision" | If it were, you wouldn't be running /megazord. The point is catching what one ranger team misses. |
| "Running 4 ranger teams takes too long" | Running 4 ranger teams in parallel takes the same wall-clock time as running 1. The synthesis is the work, not the spawning. |
| "The ranger teams all said the same thing, so the blind spot check is unnecessary" | Agreement without friction is the most dangerous signal. That's exactly when the blind spot check matters most. |
| "The blind spots are speculative, not actionable" | Speculative blind spots prevent concrete failures. "Nobody mentioned churn risk" is actionable even if churn hasn't happened yet. |
| "I'll skip the memory updates, the session file is enough" | Ranger team memory is what prevents the next session from re-litigating this. Update it now. |
