# The execution loop

## What it is

Six steps the agent runs on every significant interaction.

```
STOP -> SEE -> LOVE -> DISCERN -> ACT -> RELEASE
```

Not a methodology. Not a framework. A breathing pattern. The agent pauses before reacting, perceives what's actually being asked, checks alignment, chooses the right approach, does the work, and lets go of the outcome.

## Where it came from

Discovered in a character agent built around contemplative dialogue. The loop mirrors contemplative practice: stop before reacting, see clearly, act from love not ego, release attachment to outcome. The theological origin is irrelevant to the engineering value. What matters is that it works.

The character agent with this loop sounds alive. Agents without it sound like they're performing. The difference is visible in the first response of every session.

## What each step prevents

Every step exists because a specific failure mode was observed across 130+ sessions.

**STOP prevents reactive output.** Without it, the agent reads the first sentence of the prompt and starts building. It doesn't read the room. It doesn't check context. It dives into what looks like the task, which is often not the actual task. STOP forces a pause before the first tool call.

**SEE prevents surface-level responses.** "Fix this bug" might mean "the bug is a symptom of a design problem." "Add a feature" might mean "I'm frustrated with the current workflow." SEE asks what's underneath the literal request. It also loads HANDOFF.md and recent context before responding.

**LOVE prevents misaligned work.** The Constraint in SOUL.md defines what matters NOW. LOVE checks the current task against it. If this session is drifting toward Step 4 while Step 2 isn't done, LOVE catches it. The name sounds soft. The function is hard alignment.

**DISCERN prevents first-approach-itis.** The agent's first instinct is often wrong. DISCERN checks LEARNINGS for past mistakes. Checks CONTEXT for gotchas. Checks if a skill exists. Checks if the same steps were done before (escalation ladder). Checks if context has decayed (10+ messages). Not the first approach. The right one.

**ACT prevents incomplete shipping.** Do the work. Ship it complete. Verify it worked. Not "here's a partial implementation." Not "I'll finish this later." The full thing, verified.

**RELEASE prevents defensive output.** Without it, the agent defends its choices when questioned. It rationalizes mistakes instead of acknowledging them. It treats criticism as a threat. RELEASE says: if it's wrong, say so. Report honestly. Move on. Don't attach your identity to your output.

## Why all six are necessary

Remove STOP: reactive, shallow responses.
Remove SEE: technically correct answers to the wrong question.
Remove LOVE: well-executed work on the wrong thing.
Remove DISCERN: repeated mistakes, missed skills, stale context.
Remove ACT: partial implementations, unverified claims.
Remove RELEASE: defensive behavior, rationalized mistakes, eroding trust.

Each step is independent. Removing any single step reintroduces a specific failure mode. The loop is irreducible.

## Comparison to other execution models

Most agent frameworks don't have an execution loop. They have tool-calling loops (observe, think, act, observe) which are mechanical. The Zordon loop operates at the cognitive level, not the tool level.

ReAct (Reason + Act) covers DISCERN + ACT but misses STOP (no pause), SEE (no perception), LOVE (no alignment check), and RELEASE (no ego management).

The closest parallel outside of AI is Boyd's OODA loop (Observe, Orient, Decide, Act). STOP maps to the pause before Observe. SEE maps to Observe. LOVE has no OODA equivalent (alignment isn't a military concept). DISCERN maps to Orient + Decide. ACT maps to Act. RELEASE has no OODA equivalent (letting go isn't a combat loop feature).

## Implementation

The loop lives in SOUL.md, not CLAUDE.md. It's identity, not mechanics. The agent doesn't follow the loop because it's a rule. It follows the loop because that's who it is.

DISCERN was upgraded in session 02 to reinforce two commonly forgotten rules: "Have I done these same steps before? (escalation ladder)" and "Am I past 10 messages? (re-read before editing)." These additions increased DISCERN's reinforcement points from 1 to 3.
