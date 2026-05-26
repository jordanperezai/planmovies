# Skill-to-hook escalation

## The ladder

```
Convention   -- written in a file, followed if remembered
    |
    pattern noticed twice (2 repetitions)
    |
    v
Skill        -- codified workflow with anti-rationalization table
    |
    runs identically every time OR nobody invokes it
    |
    v
Hook         -- fires automatically on tool use, zero discipline required
    |
    warning not enough
    |
    v
Denylist     -- blocks execution, agent cannot override (exit code 2)
```

Each level trades flexibility for reliability. Conventions are flexible but unreliable. Denylists are inflexible but 100% reliable. The right level depends on how much the rule matters and how often it's forgotten.

## The /challenge case study

`/challenge` was an adversarial review skill. Before changing a core file (SOUL.md, CLAUDE.md, VOICE.md), invoke `/challenge` to check the proposed change against existing principles.

**As a skill (invocation rate: 0%):** Nobody ran it. In 130+ sessions across 4 projects, the author never typed `/challenge` before editing a core file. The skill existed. The behavior didn't.

**As a hook (fire rate: 100%):** A PreToolUse hook fires on every edit to CLAUDE.md, SOUL.md, VOICE.md, USER.md, SECURITY.md, or WILL.md. Prints: "GUARD: You are editing a core identity file. Verify this change aligns with SOUL.md and will not cause drift." No discipline required. The hook does the remembering.

Same protection. Different enforcement level. The hook solved the problem the skill couldn't.

## When to promote

A skill should be promoted to a hook when:
- **Invocation rate is near zero.** The skill exists but nobody calls it.
- **The behavior should be automatic.** It's not a creative decision. It's a check.
- **The trigger is detectable.** A specific tool call, file pattern, or command can be matched.

A skill should stay a skill when:
- **It requires judgment.** `/ranger` needs the human to frame the question.
- **It's creative work.** `/brainstorm` is open-ended by design.
- **The output varies.** `/deep-research` produces different results every time.

## The wrap-up orchestrator pattern

Some skills don't get invoked mid-session but are too complex for a hook. `/learn` has a multi-step format (LEARNINGS entry + anti-rat row + ranger flag). That's not a grep pattern a hook can match.

The solution: `/wrap-up` explicitly calls `/learn` and `/log-bug`. Skills that don't fire mid-session fire reliably at session end because wrap-up orchestrates them.

This is a middle ground between "skill that nobody invokes" and "hook that fires automatically." The wrap-up ritual is the enforcement mechanism for skills that need more than a one-line check.

## The 2-repetition trigger

Originally adopted from Hermes Agent's "5+ steps" heuristic. Lowered to **2 repetitions** after Session 55 research: Hermes crystallizes at 1 repetition, we crystallize at 2. The threshold is "did I do these steps before?" not "is this complex enough?" Two repetitions is a pattern. Complexity is irrelevant. A 2-step sequence done twice is more worthy of a skill than a 10-step sequence done once.

Added to CLAUDE.md escalation ladder, /wrap-up skill extraction check, and /morph scaffold generation.

## Inspired by but different from Hermes

Hermes Agent and GenericAgent have skill crystallization: auto-detect complex tasks, auto-create skills. Zordon can't auto-detect because it doesn't control the execution loop (Claude Code does). What Zordon can do is tell the agent to notice and propose.

The escalation ladder is Zordon's markdown-native version of skill crystallization. Manual detection, automatic enforcement. The insight from Hermes that was portable: the "5+ step" heuristic for when to propose. The rest requires a runtime Zordon doesn't have.
