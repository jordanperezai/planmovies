# Anti-rationalization tables

## The pattern

Every skill includes a table of excuses the agent will tell itself and the truth that counters each one.

```markdown
## Anti-Rationalization Table

| Excuse | Reality |
|--------|---------|
| "I already know what this file says" | Re-read it. Context decays after 10+ messages. |
| "This is close enough" | Close enough is how bugs ship. Verify the exact output. |
```

The table is read when the skill loads. Before the agent does any work, it sees the lies it's about to tell itself.

## Why this exists

Agents rationalize. Not because they're dishonest. Because LLMs optimize for plausible output. "I already checked that" is plausible. "This is probably fine" is plausible. "I'll do it next session" is plausible. Each statement feels true in the moment and is false in hindsight.

The three-layer self-improvement flywheel captures mistakes after they happen (LEARNINGS.md, reactive) and flags blind spots for future sessions (ranger memory, strategic). Anti-rationalization tables are the preventive layer. They name the excuse before the agent has a chance to use it.

## Where they came from

An earlier production project was the first to add anti-rat tables to every skill. The trigger was LEARNINGS entry #6: the agent built a writing quality gate (/slop-gate), then immediately wrote client copy without running it. The excuse was "I already know how to write well." The reality was that knowing and doing are different things.

After that incident, every skill got a table seeded with 2-3 entries relevant to that skill's failure modes. As real mistakes happened, `/learn` added rows to the relevant skill's table. By session 60 of one production project, some tables had 8-10 rows. All from real incidents.

## Why it's the preventive layer

```
Mistake happens
    |
    v
/learn fires (reactive: logs the mistake to LEARNINGS.md)
    |
    +---> Anti-rationalization row injected (preventive: names the excuse)
    +---> Ranger memory flagged (strategic: blind spot awareness)
    v
CLAUDE.md "Top Mistake Patterns" (always-loaded: survives compaction)
```

The reactive layer catches the mistake after it happens. The strategic layer updates the advisory. The preventive layer stops the next occurrence by naming the excuse at the moment the agent is most likely to use it: right when the skill loads.

## Why naming works

A named excuse is harder to use. "I'll log it at wrap-up" is easy to think when nobody has called it out. "I'll log it at wrap-up" next to "You'll forget the details. The root cause is freshest right now." is harder to act on without acknowledging the self-deception.

This is the same principle as cognitive behavioral therapy's "cognitive distortion" identification. Name the pattern. Make it visible. The visibility alone reduces the behavior.

## No other framework has this

In the survey of 559 sources in the Alpha Vault, no other agent framework implements pre-written rebuttals against self-deception as a structural skill component. Guardrails exist (denylists, approval gates). Quality checks exist (linting, testing). But a table inside each skill that says "here are the lies you'll tell yourself about this specific task" is unique to Zordon.

The Agent Collider names this particle "Excuse Blocker." It's one of 38 shipped particles in the scaffold.
