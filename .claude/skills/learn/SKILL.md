---
name: learn
version: "4.0.0"
description: "Self-improvement flywheel. Two speeds: quick (log a mistake) or deep (full post-mortem when something breaks in production)."
user-invocable: true
model: sonnet
autonomous_safe: false
blast_radius: low
triggers:
  - "log this mistake"
  - "don't do that again"
  - "what went wrong"
  - "what broke"
  - "root cause"
  - "incident"
  - "postmortem"
  - "/learn"
  - "/self-improve"
---

# Learn Skill

## Purpose

When a mistake is caught or something breaks. Two speeds:

- **Quick** (default): Log the mistake, add the rule, update council memory. 2 minutes.
- **Deep** (`/learn deep` or `/learn incident`): Full post-mortem. Timeline, impact, 5 Whys, action items, then the same quick outputs. 15 minutes.

Use deep when: production outage, client-facing breakage, data integrity issue, or anything Jordan says "let's do a postmortem on."

Use quick for everything else.

---

## Deep Mode — Full Post-Mortem

Run this BEFORE the quick steps when `/learn deep` or `/learn incident` is invoked.

### D1 — Timeline

Build chronological facts before analysis:

```
[HH:MM] Event description
[HH:MM] Event description
```

Answer: What happened? When did it start? Who noticed? Detection latency? When was it fixed? What was the immediate fix?

### D2 — Impact

Quantify the cost:
- Which clients affected? (names, not counts)
- What did they experience? (their perspective, not the system's)
- Duration of impact
- Revenue or trust risk

### D3 — Root Cause (5 Whys)

Not the surface symptom. The actual failure:

```
Why did the client see an error? → The webhook returned 500
Why did the webhook return 500? → The handler couldn't reach Supabase
Why couldn't it reach Supabase? → The project was paused
Why was the project paused? → Free tier auto-pauses after inactivity
Why was there inactivity? → No keepalive was configured
ROOT CAUSE: No keepalive mechanism for Supabase free-tier project
```

### D4 — Contributing Factors

What made it worse or delayed detection: missing monitoring, stale docs, previous shortcuts, unclear ownership, time pressure.

### D5 — Action Items

Two categories:

**Immediate fix** (already done):
- The specific change that resolved the incident

**Structural prevention** (prevent recurrence):
- What ensures this class of failure can't happen again?
- How do we detect it faster next time?

Each action item: `- [ ] [action] — owner: [who] — by: [date]`

### D6 — Severity Tag

- **P0** — Revenue loss or complete service outage for any client
- **P1** — Degraded service visible to clients, no revenue loss yet
- **P2** — Internal breakage not visible to clients but creates risk
- **P3** — Near-miss or minor issue caught before impact

### D7 — Save the Record

Save to `bugs/YYYY-MM-DD-[slug].md` with the full analysis (timeline, impact, root cause, contributing factors, action items, severity).

### D8 — WILL.md Check

Ask: should an autonomous monitor have caught this? If yes, add or update a WILL.md policy. If an existing policy should have caught it but didn't, investigate why.

Then continue to the quick steps below (Layer 1 through Layer 5).

---

## Quick Mode — Steps

### Layer 1 — LEARNINGS.md (reactive)

Append entry with this format:
```
**#N [Short title] — YYYY-MM-DD**
Mistake: What went wrong.
Root cause: The assumption that failed.
Rule: What prevents recurrence.
Enforced in: Where the rule now lives (skill file, CONTEXT.md, hook, etc.)
Council flag: [council name] or "none"
```

### Layer 2 — Skill anti-rationalization (preventive)

If the mistake maps to a specific skill (e.g., a council skill, `/onboard-client`, `/client-health`), add an anti-rationalization row to that skill's SKILL.md:

```markdown
## Anti-Rationalization Table

| Excuse | Truth |
|--------|-------|
| "It seemed like a simple decision, no council needed" | Simple decisions are where bias hides. If 3 people would disagree, run the council. |
| "I already know what the council would say" | You thought you knew what the 225 receipts were too. Verify, don't assume. |
```

If the skill doesn't have an anti-rationalization table yet, create one. The table grows over time — each mistake adds a row that names the specific lie the agent would tell itself to skip doing the right thing.

### Layer 3 — Council memory flag (strategic)

If the mistake reveals something a council should have caught or should know about:

1. Identify which council's blind spot this is (Operations? Strategy? Product? Sales? Marketing? Personas?)
2. Update that council's `memory.md`:
   - If it killed a direction that turned out to be right → remove from Dead Directions, add note
   - If it validated a principle → add or update `last-confirmed`
   - If it reveals a new blind spot → add to Validated Principles as a new entry
3. If the insight crosses councils (e.g., a pricing mistake that affects both Strategy and Sales), update BOTH council memories

### Layer 4 — Cross-council propagation

Check: does this learning affect other councils?

| If the mistake is about... | Also update... |
|---------------------------|----------------|
| Client messaging/language | Marketing memory + Sales memory |
| Pricing/offer design | Strategy memory + Sales memory |
| Dashboard UX | Product memory + Personas memory |
| Infrastructure/deployment | Operations memory |
| Client trust/retention | Product memory + Strategy memory |

Don't over-propagate — only update councils where the learning would change a future session's outcome.

### Layer 5 — Learned Rule extraction (when LEARNINGS.md hits cap)

When LEARNINGS.md reaches 15 active entries:
1. Read all 15 entries
2. Identify the top 3 recurring root causes (patterns that appear in 3+ entries)
3. Extract each into a permanent rule in CLAUDE.md's Top Mistake Patterns section
4. Archive the individual entries that are now covered by the permanent rule (move to `## Archived` section at bottom of LEARNINGS.md)
5. Report to Jordan which patterns graduated and which entries were archived

**The goal:** Mistakes start in LEARNINGS.md (reactive log), prove they're recurring, then graduate to CLAUDE.md (always-loaded prevention). Individual entries get archived once the pattern is structural.

### Final confirmation

Report to Jordan:
- What was logged to LEARNINGS.md
- Which skill got an anti-rationalization row (if any)
- Which council memory was flagged (if any)
- Which cross-council propagation happened (if any)

## When NOT to use

- Bug in code → use `/log-bug` instead (code defects, not agent mistakes)
- Feature request → just build it
- Jordan's preference/correction that isn't a "mistake" → update USER.md or the relevant doc directly

## Anti-Rationalization Table

| Excuse | Truth |
|--------|-------|
| "It was a small issue, no postmortem needed" | Small issues that recur become big issues. At minimum, run quick mode. |
| "I already fixed it, we're good" | Fixing without documenting means you'll fix it again in 3 weeks. |
| "The root cause is obvious" | Obvious root causes often mask deeper structural issues. Do the 5 Whys. |
| "Nobody noticed, so it doesn't count" | Silent failures are worse than loud ones. They compound. |
| "I'll log it later" | Later is never. Log it now. Context decays fast. |
