---
name: alpha-team
version: "1.0.0"
description: "Run an Alpha Team session. 6 voices review any decision about what to build, how to structure it, and whether it's ready. The default council for every Zordon project."
author: zordon
user-invocable: true
effort: high
context: fork
tags:
  - council
  - architecture
  - simplicity
  - memory
  - shipping
  - user
triggers:
  - "alpha"
  - "alpha team"
  - "alpha council"
  - "/alpha"
  - "/alpha-team"
---

# Alpha Council Skill

## Purpose

The default council. Six voices covering the six universal decisions every builder faces: simplicity, memory, failure, boundaries, shipping, and the user. Run this when you need a structured review of any decision.

**This is for universal building decisions. If your project has domain-specific councils, use those for domain questions.**

---

## When to Use

- Architecture decisions (how to structure something)
- Build vs skip decisions (should we build this at all?)
- Memory design (where does this knowledge belong?)
- Shipping readiness (is this done enough?)
- Safety and autonomy boundaries (what runs alone?)
- Any decision where you're going back and forth

---

## Step 0 -- Load memory

Read `councils/alpha-team/memory.md` before anything else. Inject into every advisor's context:
- **Validated Principles** as "do not contradict these without strong evidence"
- **Dead Directions** as "do not re-suggest these"
- Flag any entry with `last-confirmed` older than 60 days as "potentially stale"

---

## Step 1 -- Frame the decision

Read the user's input. Identify:
- What's being decided
- What the options are (if known)
- What's at stake

State the framed decision clearly before proceeding.

---

## Step 2 -- Spawn 6 advisors in parallel

Use the Agent tool to spawn ALL 6 sub-agents in a single message (parallel). Each gets:
- The framed decision + relevant context
- Their specific role from `councils/alpha-team/roster.md`
- **Neutral prompt only.** No framing about expected outcomes. No "we're leaning toward X."
- This instruction: **"Your job is to find what they're missing from your perspective. Be direct. 2-3 paragraphs max."**

**Independent verification (mandatory):**
- The verifier voice (Torres) must check actual artifacts: read files, check user research, look for evidence of user contact. She reports what she found, not what she thinks.
- Where possible, give different voices different source material. One reads the code. One reads the docs. One reads the git history.

### The 6 Advisors

**Rich Hickey** -- "Is this simple, or just easy? What are you complecting?"
**Andy Matuschak** -- "Where does this knowledge live, and will it still be useful in 30 days?"
**Richard Feynman** -- "How do you know this actually works? Show me."
**Nassim Taleb** -- "What's the worst case, and have you made sure you survive it?"
**Kent Beck** -- "Does it work? Then ship it. Make it right later."
**Teresa Torres** (verifier) -- "Who is this for, and when did you last talk to them?"

---

## Step 3 -- Anonymous peer review

After all 6 respond, shuffle and assign letters A-F. Answer:
1. **Which response is strongest and why?**
2. **Which has the biggest blind spot?**
3. **Blind Spot Protocol:**
   - What did ALL advisors agree on without debate?
   - What topic did NO advisor raise?
   - Which stakeholder perspective is missing?
   - What's the worst outcome if the group consensus is wrong?
4. **Flag unverified claims:** Which claims could be checked against actual files or data but weren't?

---

## Step 4 -- Chairman synthesis

1. **Verdict** -- clear recommendation (not "it depends")
2. **Strongest argument for**
3. **Strongest argument against**
4. **What the peer review caught**
5. **Confidence level** -- high / medium / low
6. **Concrete next steps**

---

## Step 5 -- Write session file

```bash
ls councils/alpha-team/sessions/ 2>/dev/null | wc -l
```

Create `councils/alpha-team/sessions/alpha-NN-[topic-slug].md` with all advisor responses, peer review, and synthesis.

---

## Step 6 -- Present the verdict

```
Alpha Council verdict on [topic]:

[Verdict -- 1-2 sentences]

For: [strongest argument]
Against: [strongest argument]
Blind spot: [what peer review caught]
Confidence: [level]

Next steps:
1. [action]
2. [action]

Full session: councils/alpha-team/sessions/alpha-NN-[topic].md
```

The human decides. The council advises, it doesn't overrule.

---

## Step 7 -- Log to memory (MANDATORY, same turn)

Update `councils/alpha-team/memory.md` BEFORE returning control:
- Direction killed? Add to Dead Directions
- Principle confirmed? Add to Validated Principles (with `last-confirmed`)
- Entry count > 20? Evict oldest `last-confirmed`
- Always add a Distillation Log row

**Self-check:** Did you edit `councils/alpha-team/memory.md` this session? If not, stop and do it now.

---

## Anti-Rationalization Table

| Excuse | Truth |
|--------|-------|
| "This decision is too small for a council" | Small decisions compound. If you're debating it, it's worth 5 minutes of structured review. |
| "I already know what to build" | Feynman: "You must not fool yourself, and you are the easiest person to fool." Run it anyway. |
| "The council will slow me down" | Beck is on the council. His entire philosophy is shipping. If Beck says ship, ship. |
| "I don't have users to talk to yet" | Torres: that's the problem. The council catches the gap before you build the wrong thing. |
| "These voices don't know my domain" | They're not domain experts. They're decision-framework experts. Domain councils are for domain questions. |
