---
name: recruit-rangers
description: "Research, interview, and validate real-person ranger teams. Sourcing → scoring → test-run → roster."
user-invocable: true
model: opus
autonomous_safe: false
blast_radius: low
triggers:
  - "recruit rangers"
  - "hire rangers"
  - "build a ranger team"
  - "/recruit-rangers"
---

# Recruit Rangers

## Purpose

Assemble a ranger team of real public figures for a specific decision domain. Not role-based voices. Real people with documented frameworks, cited source material, and identifiable blindspots.

## When to use

- A new decision domain needs a ranger team (design, engineering, marketing, etc.)
- An existing team needs a voice replaced (blindspot too large, output too generic)
- The project expanded into a domain no current team covers

## Step 1 -- Define seats from the product

Don't start with famous people. Start with the product's actual decision surface.

List the 4-6 recurring decisions this team will handle. For each, name the lens that catches what a generalist misses. Each lens becomes a seat.

One seat must be a **verifier** who checks actual artifacts (code, live site, rendered output) rather than reasoning from the prompt.

Seats should create tension. If two seats would agree on every question, one is redundant. Replace it with an opposing lens.

## Step 2 -- Source candidates (3 per seat)

For each seat, research 3 real public figures. Each candidate must pass all four gates:

| Gate | Test | Pass/Fail |
|---|---|---|
| **Framework specificity** | Can you describe HOW they decide in 3 sentences with citations? | Y/N |
| **Problem proximity** | Have they shipped a product in the same category? | Exact > Adjacent > Theoretical |
| **Seat uniqueness** | Would they produce different output than candidates in other seats? | If overlap, wrong seat |
| **Documented blindspot** | Can you name what they'd miss? | If you can't, you don't know the voice |

Run sourcing in parallel: one agent per seat, searching for candidates with documented work (books, talks, case studies, blog posts, shipped products). Training-data-only knowledge is not sufficient. The agent must find citable sources.

Reject any candidate where:
- The framework is "they're really experienced at X" (not a framework)
- The shipped work is "they led a team that built Y" (they managed, they didn't design)
- The blindspot is "they might not know about our specific product" (that's everyone)

## Step 3 -- Score and shortlist

For each seat, pick the strongest candidate based on the four gates. Present the slate:

```
| Seat | Pick | Framework | Proximity | Blindspot |
```

With runner-ups noted. The human approves or adjusts before the test-run.

## Step 4 -- Test-run

Take one real decision the product has already made or is currently facing. Run all picked candidates on the same question using the ranger protocol:

- Each voice runs as a separate agent (context isolation, no shared output)
- Neutral framing (no hints about preferred answer)
- The voice prompt includes: who they are, their documented framework, how they think, what they catch, what they miss
- Cap at 250 words per voice

## Step 5 -- Evaluate

Each voice's output is scored on three criteria:

| Criteria | Pass | Fail |
|---|---|---|
| **Specific** | Names exact elements, fields, pixels, copy | "Consider simplifying the form" |
| **Non-obvious** | Says something no generalist would say | Restates conventional wisdom |
| **Actionable** | Can be implemented without further clarification | Requires a follow-up "how?" |

Also check:
- **Zero overlap.** If two voices said the same thing, one seat is redundant.
- **Tension present.** At least two voices should disagree on something substantive.

A voice that fails any criterion gets replaced by its runner-up and re-tested.

## Step 6 -- Write the roster

Create `rangers/<name>/roster.md` following the template in `rangers/CLAUDE.md`. Include:
- Voice table (name, seat, key question)
- Full voice details (career, framework, what they bring, blindspot, key source with URL)
- The test-run question and a one-line summary of each voice's unique contribution

Create `rangers/<name>/sessions/` directory for future session logs.

Write the test-run as the team's first session file: `<name>-01-<topic>.md`.

Do NOT create memory.md. Memory is earned, not seeded. Create it when the team rediscovers a dead direction or repeats a finding.

## Anti-Rationalization Table

| Excuse | Why it's wrong |
|---|---|
| "We don't have time to research, let's use role-based voices" | Role-based voices produce generic output. The research takes 10 minutes. The wrong team wastes hours. |
| "This person is famous enough, skip the test-run" | Famous people produce the worst voices. The model defaults to flattery and platitudes. The test-run catches this. |
| "3 candidates per seat is overkill for a small project" | The runner-ups matter. When a voice underperforms in session 3, you swap without re-researching. |
| "The verifier seat isn't needed for this domain" | Every domain has artifacts that can be checked. A team without a verifier is a brainstorm, not a review. |
| "Let's just add more voices instead of replacing weak ones" | 5 voices is the cap. More voices dilute signal. Replace, don't add. |
