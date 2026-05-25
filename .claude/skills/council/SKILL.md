---
name: council
description: "5 independent perspectives on a hard decision. Each voice runs as a separate agent. Neutral prompts. No groupthink."
model: opus
triggers:
  - "council"
  - "I need perspectives"
  - "debate this"
  - "/council"
---

# Council — Structured Decision Debate

When a decision has real stakes and one perspective isn't enough.

## When to use

- Choosing between approaches with real tradeoffs
- Decisions that affect architecture, product direction, or user experience
- When you keep going back and forth and can't commit
- When the cost of being wrong is high

## Step 0 — Load memory

Before framing the decision:

1. **Check for named council:** Does `councils/<name>/` exist for this domain? If yes, read `councils/<name>/roster.md` and `councils/<name>/memory.md` (if it exists).
2. **Extract constraints from memory:** Pull Validated Principles and Dead Directions. These become hard constraints injected into every voice's prompt alongside the decision frame.
3. **Extract voice calibration:** Read the Voice Calibration section. Chairman only. Don't inject into individual voices.
4. **If no memory file exists:** Proceed without constraints. Memory is earned, not pre-created.

Dead Directions from memory MUST appear in each voice's prompt as: "The following approaches have been tried and failed. Do not re-suggest without new evidence: [list]."

## Step 1 — Frame the decision

State clearly:
- **The question** (not vague. "Should we use Supabase or Postgres directly?" not "what database?")
- **The options** (2-4 concrete choices)
- **The constraints** (budget, timeline, existing infrastructure, non-negotiables)
- **What's at stake** (what breaks if we pick wrong?)

## Step 2 — Assign 5 voices

Adapt the voices to the question. Each voice should have a distinct lens.

**For domain decisions:** Use real public figures whose documented work and decision-making patterns fit the question. Ground each voice in their actual career, published frameworks, and known positions. Personas activate perspective and process, not factual knowledge. See `councils/README.md` for roster design guidance.

**For adversarial/strategic decisions:** Use role-based voices when structural tension matters more than domain expertise. Default roster when no domain is obvious:

| # | Voice | Lens |
|---|---|---|
| 1 | **The Builder** | What's fastest to ship and maintain? |
| 2 | **The User** | What's best for the person using this? |
| 3 | **The Skeptic** | What breaks? What's the worst case? |
| 4 | **The Strategist** | What compounds over time? What creates leverage? |
| 5 | **The Contrarian** | What's the option nobody wants to say out loud? |

If a named council exists for this domain (`councils/<name>/roster.md`), use that roster.

## Step 3 — Run independently

Each voice runs as a **separate agent call**. Not role-play. Not "imagine you are." Actual independent agents.

Each agent gets:
- The framed decision (from Step 1)
- Their voice description (from Step 2)
- **No knowledge of what the other voices said**

Prompt must be **neutral**. No arguments for or against any option. Present the question, the options, the constraints. Nothing else.

## Step 4 — Peer review (anti-sycophancy)

Shuffle the 5 responses. Assign anonymous letters (A through E). Each reviewer reads all responses without knowing the authors.

For each response, the reviewer identifies:
- One thing the author missed
- One assumption that might be wrong
- Whether they agree or disagree (with justification)

**Forced dissent:** If 4+ voices converge on the same answer, at least one must steelman the opposing view before proceeding. Agreement without pressure-testing is groupthink, not consensus.

## Step 5 — Synthesize

After peer review:
- Where do they agree? (signal)
- Where do they disagree? (the actual decision point)
- What did nobody mention? (blind spot)
- What did peer review surface that the original responses missed?
- What's the recommendation? (with reasoning and confidence level)

## Step 6 — Present

Surface the synthesis. The human decides. The council advises, it doesn't decide.

## Step 7 — Save and update memory

### 7a. Save session file
Save to `councils/sessions/YYYY-MM-DD-[topic].md` (or `councils/<name>/sessions/` if named council). Full responses, not summaries. The reasoning IS the value.

### 7b. Update council memory (MANDATORY for named councils)
If a named council ran this session:
1. **New validated principles?** Add to `councils/<name>/memory.md` § Validated Principles. Format: `**[Principle]** -- YYYY-MM-DD. Context: [why]. last-confirmed: YYYY-MM-DD`
2. **New dead directions?** Add to § Dead Directions. Format: `**[Approach]** -- YYYY-MM-DD. Why: [what went wrong]. last-confirmed: YYYY-MM-DD`
3. **Voice calibration notes?** Note in § Voice Calibration which voice the human gravitated toward or dismissed.
4. **Contradict check:** Before adding, scan existing entries. Update or supersede, don't just append.
5. **Cap check:** If memory exceeds 20 entries, evict the entry with the oldest `last-confirmed` date.

If no named council (generic `/council` run): skip memory write. Generic councils are one-off.

If `councils/<name>/memory.md` doesn't exist yet AND this session surfaced a dead direction or validated principle: create the file using the template from `councils/README.md`.

### 7c. Cross-layer triage
After updating council memory, check if any finding should flow elsewhere:
- **Finding applies to a specific skill?** Note in session file: "Consider adding to `.claude/skills/<name>/memory.md`." Don't write to skill memory from council. That's the skill's job on next invocation.
- **Finding is a durable project truth?** Add to `MEMORY.md` with a pointer: `[principle] -- from [council-name] council, YYYY-MM-DD`
- **Finding reveals a mistake pattern?** Run `/learn`.

**Self-check:** Did you update memory.md (if named council)? Did you check for cross-layer flow? If not, stop and do it now.

## Anti-Rationalization Table

| Excuse | Reality |
|--------|---------|
| "I already know the answer, I don't need a council" | If you already know, 5 voices agreeing costs 2 minutes. If you're wrong, it saves a week. |
| "I'll just think about it myself" | You'll think about it from your one perspective. That's the problem the council solves. |
| "The voices will just agree with each other" | They're independent agents with no knowledge of each other. If they agree, that's signal. But agreement without peer review is suspect. |
| "This decision doesn't need a full council" | Maybe. If there's one clear approach with no alternatives worth debating, skip it. But if you're uncertain enough to consider a council, you probably need one. |
| "Memory is overkill for this council run" | If the council surfaced a dead direction, recording it takes 30 seconds. Not recording it means a future council will re-suggest the same failed approach. |
