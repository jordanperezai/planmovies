---
name: multi-council
description: "Route a decision to multiple councils, map alignment, and surface blind spots no single council caught"
user-invocable: true
model: sonnet
autonomous_safe: false
blast_radius: medium
triggers:
  - "multi-council"
  - "run multiple councils"
  - "ask all councils"
  - "/multi-council"
---

# Multi-Council

## Purpose

When a decision cuts across multiple domains, running one council gives a partial view. /multi-council auto-selects the relevant councils, runs them in parallel, and synthesizes where they agree, where they disagree, and what ALL of them missed.

---

## Step 0 -- Frame the decision

State clearly:
- What's being decided
- What the options are (if known)
- What's at stake

## Step 1 -- Select councils

Map the decision to councils based on what it touches. Read `councils/README.md` for the full list of available councils.

**Minimum 2 councils. Maximum 5.** If the decision only maps to 1 council, use that council's skill directly.

Present the selected councils to the user for approval before proceeding. The user can add or remove councils.

## Step 2 -- Run councils in parallel

Spawn all selected councils using the Agent tool in a single message (parallel execution). Each council gets:
- The same framed decision
- Their own roster and memory
- The standard session flow from councils/README.md

**Independent verification rules apply to every council spawned:**
- **Neutral prompts only.** No framing about expected outcomes. No "we're leaning toward X."
- **Verifier voices must check actual artifacts.** Each council's verifier reads files, checks data, or inspects live state.
- **Each council returns its verdict independently.** They do NOT see each other's output.

## Step 3 -- Alignment map

After all councils report, build the alignment table:

```
| Council | Verdict | Confidence | Key argument |
|---------|---------|------------|--------------|
| [name] | [recommendation] | [H/M/L] | [one line] |
| [name] | [recommendation] | [H/M/L] | [one line] |
```

Classify:
- **Full alignment** -- all councils recommend the same direction
- **Partial alignment** -- majority agrees, minority dissents
- **Split** -- no clear majority
- **Contradiction** -- councils recommend mutually exclusive actions

## Step 4 -- Blind Spot Check

This is the load-bearing step. Ask:

1. **What did ALL councils agree on without debate?** (Consensus without friction often means a shared assumption nobody questioned.)
2. **What topic did NO council raise?** (The gap between what was discussed and what matters.)
3. **Which stakeholder perspective is missing?** (Customer? Competitor? Regulator? Future self?)
4. **What's the worst outcome if the consensus is wrong?**
5. **Which claims from the councils could be checked against actual files but weren't?**

Write the blind spots explicitly. These are often more valuable than the verdicts.

## Step 5 -- Synthesis

```
Multi-council review on [topic]:

Alignment: [Full / Partial / Split / Contradiction]

Agreed: [what all councils aligned on]
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

Full sessions: [list of council session files]
```

## Step 6 -- Log to all council memories

Update each participating council's `memory.md`:
- New validated principle if the review confirmed one
- New dead direction if it killed one
- Cross-reference: "This principle was validated across [N] councils in multi-council session on [date]"

---

## Anti-Rationalization Table

| Excuse | Truth |
|--------|-------|
| "One council is enough for this decision" | If it were, you wouldn't be running /multi-council. The point is catching what one council misses. |
| "Running 4 councils takes too long" | Running 4 councils in parallel takes the same wall-clock time as running 1. The synthesis is the work, not the spawning. |
| "The councils all said the same thing, so the blind spot check is unnecessary" | Agreement without friction is the most dangerous signal. That's exactly when the blind spot check matters most. |
| "The blind spots are speculative, not actionable" | Speculative blind spots prevent concrete failures. "Nobody mentioned churn risk" is actionable even if churn hasn't happened yet. |
| "I'll skip the memory updates, the session file is enough" | Council memory is what prevents the next session from re-litigating this. Update it now. |
