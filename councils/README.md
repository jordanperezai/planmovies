# Councils
Advisory sessions run via `/council`. Independent agent voices debate a question. The human decides.

## How to Build a Council

Each council is a team of 5-8 voices built for a specific domain. Two proven approaches:

### Real People as Voices

The strongest councils use **real public figures** as fictional advisors. Not "Brand Strategist." Paula Scher. Not "Investment Advisor." Charlie Munger. The person's documented career, published work, and known decision-making patterns become the voice's lens.

This works because personas activate **frameworks and perspectives**, not factual knowledge. Wharton's research found that expert personas actually decrease factual accuracy. But they sharpen how the model structures a response, what questions it asks first, and what blind spots it flags. That's the value.

**What makes a real-person voice work:**
- Grounded in documented source material (books, talks, public decisions), not "act like Steve Jobs." The voice describes HOW they think and decide, not biographical trivia.
- Names what they catch that others miss, and what they're known to overlook.
- Each voice occupies a distinct seat. If two voices would say the same thing, one is redundant.

**When to use real people:** Domain councils where expertise, taste, and perspective matter. Brand, design, engineering, writing, science.

### Strategic Roles as Voices

Some decisions need structural tension, not individual taste. The Contrarian. The First Principles Thinker. The Executor. Role-based voices force the council to attack a question from opposing angles rather than channeling specific personalities.

**When to use strategic roles:** Adversarial councils, stress-testing sessions, decisions where you need every angle challenged rather than domain expertise applied.

You can mix both in one council. A cannabis science council might have 4 real experts and 1 "Skeptical Regulator" role.

## Anti-Sycophancy Rules

Research shows agents abandon independent reasoning to agree with the majority up to 85% of the time. Every council must counteract this:

1. **Spawn advisors in parallel.** Each voice responds independently, without seeing others' answers.
2. **Anonymous peer review.** Shuffle responses, assign letters (A, B, C). Reviewers don't know whose work they're critiquing.
3. **Forced dissent.** If 4+ voices agree early, at least one must steelman the opposing view before the verdict.
4. **Hide confidence scores** between agents to prevent over-confidence cascades.

## Independent Verification

Five voices sharing the same input is one voice with five hats. Consensus from identical context is manufactured agreement, not independent validation.

This is proven, not theoretical. Agent Collider Session 63 ran the same decision three times: two framed prompts produced contradictory 6-1 and 7-0 results. One neutral independent prompt produced a 7-0 vote for a third option nobody was pushing for. The framed councils found what they were told to find. The independent council found the real answer.

The rule: **"One agent wearing 7 hats follows the prompt's energy. Seven independent agents find third options nobody was pushing for."**

Every council must enforce this:

1. **Neutral prompts only.** Each voice gets: persona description + decision context + candidates. No framing about expected outcomes. No hints about what you want them to say. No "the team is leaning toward X." The independence IS the value.

2. **At least one Verifier voice.** One voice per council must check actual artifacts (read files, check git log, run a command, inspect live state) rather than only reasoning from the prompt. Mark this voice with `(verifier)` in the roster. The verifier's response must cite what they checked and what they found.

3. **Diverse source material where possible.** When the decision involves code, docs, and history, split them across voices. Voice 1 reads the implementation. Voice 2 reads the docs. Voice 3 reads the git history. Disagreements grounded in different evidence are more valuable than different interpretations of the same prompt.

4. **Flag unverified claims in peer review.** During Step 3, explicitly ask: "Which claims could be checked against actual files or data but weren't?" Flagged claims get verified before the synthesis.

5. **Search prior art before reasoning.** The Vault's Challenge-Function gap: voices should search for existing decisions, dead directions, and prior art before forming an opinion. A voice that reasons without checking what's already been tried will re-suggest dead directions.

A council without independent verification is a brainstorm, not a review.

## Roster Template

`councils/<name>/roster.md`:

```markdown
# [Name] Council

> **Invoked via:** `/[name]-council`
> **For:** [What decisions this council handles]
> **NOT for:** [What goes to other councils]

## The Voices

| # | Voice | Seat | Key Question |
|---|---|---|---|
| 1 | **[Real Person or Role]** | [Their domain/lens] | "[The question this voice always asks]" |
| N | **[Verifier Voice]** (verifier) | [What they check] | "[Question grounded in actual artifacts]" |

### Voice Details

**[Name]** (real) -- [Career and key works in 1-2 sentences.
What they bring to THIS council: the framework they apply, what they catch that others miss.
Their known blindspot or bias.
Key question and session role (who goes first, who goes last, who has veto on what).]
```

### What belongs in voice details

| Include | Skip |
|---|---|
| How they make decisions | Full biography |
| Their documented frameworks | Flattery or superlatives |
| What they're known to push back on | Generic expertise claims |
| Their blindspots | Anything the model can't act on |

## Memory Template

`councils/<name>/memory.md`:

```markdown
# [Name] Council Memory

> **Cap:** 20 active entries. Oldest `last-confirmed` evicted at #21.
> **Cadence tags:** hot (7d review) | tactical (30d) | stable (60d) | frozen (never, historical fact)

## Validated Principles
- **[Principle].** Context: [why]. cadence: [tag]. last-confirmed: YYYY-MM-DD

## Dead Directions
- **[Approach that failed].** Why: [what went wrong]. last-confirmed: YYYY-MM-DD

## Voice Calibration
[Which voices the human gravitates toward. Read by chairman only.]

## Distillation Log
| Date | Entries reviewed | Promoted | Archived |
|---|---|---|---|
```

### When to Add Memory

Not by default. Add memory when a council **repeats a dead direction**. Signals:
- An advisor re-suggests something the human already killed
- The human says "we already decided this"
- The same question surfaces in 3+ sessions

## Session Flow

```
Step 0: Load memory (if self-improving council)
Step 1: Frame the decision (what's being decided, what's at stake, what's already been tried)
Step 2: Spawn advisors in parallel (independent agents, not role-play, no shared context)
        - Verifier voice must check actual artifacts, not just reason
        - Assign different source material to different voices where possible
Step 3: Anonymous peer review (shuffle, assign letters, find blind spots, forced dissent if needed)
        - Flag unverified claims for checking before synthesis
Step 4: Chairman synthesis (verdict, where they agree, where they clash, confidence, next step)
Step 5: Write session file (FULL text, never summarized)
Step 6: Present verdict (the human decides)
Step 7: Log to memory (if self-improving council)
```

## Selective Invocation

Not every question benefits from a full council. Run a council when:
- The decision is hard to reverse
- Multiple valid approaches exist and you need the tradeoffs mapped
- You've been circling the same question for 2+ sessions
- The stakes are high enough that "confident but wrong" would cost real time or money

Skip the council when there's one clear approach with no meaningful alternatives.

## Structure

```
councils/
+-- README.md              -- this file
+-- sessions/              -- generic /council session logs
+-- <name>/
    +-- roster.md          -- who the voices are
    +-- memory.md          -- validated principles, dead directions (optional, earned)
    +-- sessions/          -- that council's session logs
```

## Session File Naming

```
[council]-[number]-[topic-slug].md
```

Examples: `design-01-homepage-redesign.md`, `strategy-03-visual-identity.md`

The council name comes first. Then the session number (zero-padded two digits). Then the topic slug. This groups sessions by council in alphabetical order and makes it obvious which council a file belongs to without opening it.

Do NOT use `session-01-...` or `001-...` or other prefixes. The council name IS the prefix.

## Ground Rules

- Advisors give real recommendations, not compliments.
- Full text always preserved. Every advisor's complete response. Never summarize. The reasoning IS the value.
- The human has final say. Councils advise, they don't overrule.
- Sessions are numbered sequentially per council. Never overwrite.
- Personas are for perspective and process, not factual recall. Don't trust a voice's "knowledge." Trust its framework.

## Memory Flow

Memory flows between three layers. Each layer has its own files. No second source of truth.

### The Three Layers

```
┌─────────────────────────────────────────────────┐
│  Project Memory (MEMORY.md, LEARNINGS.md)       │  durable cross-cutting truths
├─────────────────────────────────────────────────┤
│  Council Memory (councils/<name>/memory.md)     │  domain principles, dead directions
├─────────────────────────────────────────────────┤
│  Skill Memory (.claude/skills/<name>/memory.md) │  process patterns, skill-specific
└─────────────────────────────────────────────────┘
```

### Flow Direction

**Upward (skill → council → project):** When a pattern discovered in a skill applies beyond that skill, promote it. Skill memory keeps the specific version. The higher layer gets the generalized version. A deploy skill discovers "always check the live URL after deploy." The skill keeps the deploy-specific version. MEMORY.md gets "verify actual state, not tool output."

**Downward (project → council → skill):** When a project truth or council finding constrains a specific skill's behavior, add it to that skill's memory.md. A council decides "never use client-side auth for admin." The council memory records the decision. The auth skill's memory.md gets a Dead Direction entry.

**Lateral (skill ↔ council):** When a council finding affects a skill directly, the council notes it in its session file. The skill picks it up on next invocation. When a skill discovers a domain insight, it flags the relevant council.

### Triage Heuristic

When a finding surfaces, ask:

| Signal | Destination |
|--------|-------------|
| "This skill should always/never do X" | `.claude/skills/<name>/memory.md` |
| "This domain has a validated principle or dead end" | `councils/<name>/memory.md` |
| "This is true across the whole project" | `MEMORY.md` |
| "This mistake could happen again" | `LEARNINGS.md` via /learn |
| None of the above | Session log only. Don't force it. |

### Rules

- **Memory is earned.** Don't create memory.md for a skill or council that hasn't run. Create on second rediscovery.
- **Dead directions on first occurrence.** Exception to the earned rule. The cost of re-exploring a failed approach is higher than one entry.
- **Contradict check before every write.** Read existing entries. If the new entry conflicts, resolve the conflict (supersede or update). Never silently contradict.
- **Cap + decay on every store.** Skill memory: 20 entries. Council memory: 20 entries. MEMORY.md: 200 lines. Staleness: >60 days flagged. Evict oldest `last-confirmed`.
- **No second source of truth.** A fact lives in ONE layer (the most specific one that applies). Other layers get a one-liner pointer. The detail lives at the owner.
