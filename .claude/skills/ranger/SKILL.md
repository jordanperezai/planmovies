---
name: ranger
description: "Assemble your rangers. 5 independent perspectives on a hard decision. Each voice runs as a separate agent. Neutral prompts. No groupthink."
model: opus
triggers:
  - "ranger"
  - "rangers"
  - "assemble rangers"
  - "I need perspectives"
  - "debate this"
  - "/ranger"
---

# Rangers — Structured Decision Debate

When a decision has real stakes and one perspective isn't enough.

## When to use

- Choosing between approaches with real tradeoffs
- Decisions that affect architecture, product direction, or user experience
- When you keep going back and forth and can't commit
- When the cost of being wrong is high

## Step 0 — Load memory (without contaminating)

Before framing the decision:

1. **Check for named rangers:** Does `rangers/<name>/` exist for this domain? If yes, read `rangers/<name>/roster.md` and `rangers/<name>/memory.md` (if it exists).
2. **Separate facts from opinions in memory:**
   - **Dead directions** = facts. "We tried X, it failed because Y." These are history. Include them verbatim so voices don't waste time re-exploring known failures.
   - **Validated principles** = opinions that survived one session. These are NOT hard constraints. Present them as: "Previous sessions found [principle]. You may disagree if your analysis warrants it."
3. **Extract voice calibration:** Read the Voice Calibration section. Chairman only. Don't inject into individual voices.
4. **If no memory file exists:** Proceed without constraints. Memory is earned, not pre-created.

**The distinction:** Dead directions say "this road is closed." Validated principles say "last time we went left." One prevents wasted work. The other could prevent a better answer.

Dead directions appear in each voice's prompt as: "The following approaches have been tried and failed. Do not re-suggest without new evidence: [list]."

Validated principles appear as: "Previous sessions concluded: [list]. These are prior findings, not rules. Challenge them if warranted."

## Step 1 — Frame the decision

State clearly:
- **The question** (not vague. "Should we use Supabase or Postgres directly?" not "what database?")
- **The options** (2-4 concrete choices)
- **The constraints** (budget, timeline, existing infrastructure, non-negotiables)
- **What's at stake** (what breaks if we pick wrong?)

## Step 2 — Assign 5 voices

Adapt the voices to the question. Each voice should have a distinct lens.

**For domain decisions:** Use real public figures whose documented work and decision-making patterns fit the question. Ground each voice in their actual career, published frameworks, and known positions. Personas activate perspective and process, not factual knowledge. See `rangers/CLAUDE.md` for roster design guidance.

**For adversarial/strategic decisions:** Use role-based voices when structural tension matters more than domain expertise. Default roster when no domain is obvious:

| # | Voice | Lens |
|---|---|---|
| 1 | **The Builder** | What's fastest to ship and maintain? |
| 2 | **The User** | What's best for the person using this? |
| 3 | **The Skeptic** | What breaks? What's the worst case? |
| 4 | **The Strategist** | What compounds over time? What creates leverage? |
| 5 | **The Contrarian** | What's the option nobody wants to say out loud? |

If a named ranger exists for this domain (`rangers/<name>/roster.md`), use that roster.

## Step 3 — Run independently (Context Isolation Protocol)

Each voice runs as a **separate agent call**. Not role-play. Not "imagine you are." Actual independent agents.

Each agent gets:
- The framed decision (from Step 1)
- Their voice description (from Step 2)
- **No knowledge of what the other voices said**

**Context isolation rules (non-negotiable):**

1. **Neutral framing.** The prompt contains the question, the options, and the constraints. No arguments for or against any option. No "we're leaning toward." No "the team prefers." No adjectives that color options ("the simpler approach" vs "the complex one"). Present facts only.
2. **No prior conclusion in the prompt.** If the human said "I think we should do X," do NOT include that in the voice prompts. The voices advise on the question, not on validating a preference. Strip opinions from the decision frame.
3. **No shared context between voices.** Each agent is spawned in parallel in a single message. They cannot see each other's output. They cannot reference each other.
4. **No confidence anchoring.** Don't tell voices "most experts agree" or "the common approach is." Let them arrive at their own confidence level.
5. **Verifier voice checks artifacts, not arguments.** At least one voice must read actual files, check git state, or inspect live systems rather than reasoning from the prompt alone.

If you catch yourself writing a prompt that would make a reasonable person guess which answer you want, rewrite it.

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

Surface the synthesis. The human decides. The ranger advises, it doesn't decide.

## Step 7 — Save and update memory

### 7a. Save session file
Save to `rangers/sessions/YYYY-MM-DD-[topic].md` (or `rangers/<name>/sessions/` if named ranger). Full responses, not summaries. The reasoning IS the value.

### 7b. Update ranger memory (MANDATORY for named rangers)
If a named ranger ran this session:
1. **New validated principles?** Add to `rangers/<name>/memory.md` § Validated Principles. Format: `**[Principle]** -- YYYY-MM-DD. Context: [why]. last-confirmed: YYYY-MM-DD`
2. **New dead directions?** Add to § Dead Directions. Format: `**[Approach]** -- YYYY-MM-DD. Why: [what went wrong]. last-confirmed: YYYY-MM-DD`
3. **Voice calibration notes?** Note in § Voice Calibration which voice the human gravitated toward or dismissed.
4. **Contradict check:** Before adding, scan existing entries. Update or supersede, don't just append.
5. **Cap check:** If memory exceeds 20 entries, evict the entry with the oldest `last-confirmed` date.

If no named ranger (generic `/ranger` run): skip memory write. Generic rangers are one-off.

If `rangers/<name>/memory.md` doesn't exist yet AND this session surfaced a dead direction or validated principle: create the file using the template from `rangers/CLAUDE.md`.

### 7c. Cross-layer triage
After updating ranger memory, check if any finding should flow elsewhere:
- **Finding applies to a specific skill?** Note in session file: "Consider adding to `.claude/skills/<name>/memory.md`." Don't write to skill memory from ranger. That's the skill's job on next invocation.
- **Finding is a durable project truth?** Add to `MEMORY.md` with a pointer: `[principle] -- from [ranger-name] ranger, YYYY-MM-DD`
- **Finding reveals a mistake pattern?** Run `/learn`.

**Self-check:** Did you update memory.md (if named ranger)? Did you check for cross-layer flow? If not, stop and do it now.

## Anti-Rationalization Table

| Excuse | Reality |
|--------|---------|
| "I already know the answer, I don't need a ranger" | If you already know, 5 voices agreeing costs 2 minutes. If you're wrong, it saves a week. |
| "I'll just think about it myself" | You'll think about it from your one perspective. That's the problem the ranger solves. |
| "The voices will just agree with each other" | They're independent agents with no knowledge of each other. If they agree, that's signal. But agreement without peer review is suspect. |
| "This decision doesn't need a full ranger" | Maybe. If there's one clear approach with no alternatives worth debating, skip it. But if you're uncertain enough to consider a ranger, you probably need one. |
| "Memory is overkill for this ranger run" | If the ranger surfaced a dead direction, recording it takes 30 seconds. Not recording it means a future ranger will re-suggest the same failed approach. |
