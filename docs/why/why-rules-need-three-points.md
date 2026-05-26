# Rule placement hierarchy

## The discovery

In 130+ sessions across 4 projects, the author repeatedly had to remind the agent about rules that existed in the scaffold. The escalation ladder, context decay warnings, skill extraction triggers. All were written in CLAUDE.md. All were read at session start. None were reliably followed.

The audit mapped where every key behavior lived and how many times it was reinforced:

| Behavior | Reinforcement points | Compliance |
|---|---|---|
| Log mistakes immediately | 3 (CLAUDE.md + /wrap-up + /learn) | High |
| Verify before done | 3 (CLAUDE.md + DISCERN + /wrap-up) | High |
| Escalation ladder | 1 (CLAUDE.md only) | Low |
| Re-read after 10+ messages | 1 (CLAUDE.md only) | Low |
| Gate-first principle | 1 (CLAUDE.md only) | Low |

The pattern: **rules with 1 reinforcement point get forgotten. Rules with 3+ reinforcement points stick.**

## Why this happens

LLMs process instructions with a decay gradient. Rules at the top of a file get more attention than rules at the bottom. Rules in files loaded early in the session (CLAUDE.md, SOUL.md) decay as the conversation grows. By message 10, a rule declared once at session start is buried context.

This is not a model limitation that will be fixed with bigger context windows. It's an attention allocation problem. More context means more competition for attention. A rule declared once is always at a disadvantage against rules reinforced at multiple points.

The Hermes Agent documentation confirms this indirectly: stable system prompts enable cheaper cache hits. Don't change the system prompt mid-session. The cost framing of Zordon's "context decay" pattern. Rules that survive mid-session are rules that appear in multiple files.

## The three reinforcement points

For a rule to reliably fire, it needs to appear at three points in the scaffold:

**1. Declaration (CLAUDE.md).** The rule exists. Read at session start. Sets the expectation. This is necessary but not sufficient.

**2. Point of action (SOUL.md execution loop).** The rule fires when the relevant decision happens. DISCERN runs on every significant task. Rules embedded in DISCERN fire at decision time, not only at session start.

**3. Ritual check (/wrap-up).** The rule is verified at session end. "Did I follow this rule?" Even if the agent forgot mid-session, the wrap-up catches it.

Declaration alone: ~40% compliance (observed).
Declaration + point of action: ~70% compliance.
Declaration + point of action + ritual check: ~90% compliance.

## What was fixed

Four rules were under-reinforced (1 point each). Each was upgraded to 3 points:

| Rule | Added to DISCERN | Added to /wrap-up |
|---|---|---|
| Escalation ladder | "Have I done these same steps before?" | Step 6: skill extraction check |
| Re-read after 10+ messages | "Am I past 10 messages?" | (implicit in re-reading files) |
| Propose skills from patterns | (same as escalation) | Step 7: "Two repetitions is a pattern" |

One rule (the `/challenge` adversarial review) was upgraded from a skill (manual, 0% invocation rate) to a PreToolUse hook (automatic, 100% fire rate on core file edits). This is the extreme case: when compliance at 3 reinforcement points isn't enough, promote to a hook where compliance is structural.

## The escalation of enforcement

Rules that need to be followed have four escalation levels:

```
1. Convention    -- documented in a file, agent follows if it remembers
2. Reinforced    -- appears at 3+ points, agent follows reliably
3. Hook          -- fires automatically on tool use, agent can't forget
4. Denylist      -- blocks execution, agent can't override (exit code 2)
```

Convention is where rules start. If a convention is forgotten repeatedly, it should be reinforced. If reinforcement isn't enough, it should become a hook. If a hook warning isn't enough, it should be a denylist block.

This is the rule placement version of the escalation ladder. The pattern applies to the framework's own rules, not only user workflows.

## Design principle

When adding a rule to the scaffold, ask: where does this rule fire? If the answer is "one place," the rule will be forgotten. Place it at the declaration point (CLAUDE.md), the action point (execution loop or relevant skill), and the verification point (/wrap-up). Three points minimum for rules that matter.
