---
name: emergent-scan
description: "Find what you haven't noticed. Two modes: code (broken state, drift) and product (hidden leverage, untapped potential). Surface and stop."
model: sonnet
triggers:
  - "emergent scan"
  - "what are we missing"
  - "what's emerged"
  - "scan for surprises"
  - "/emergent-scan"
---

# Emergent Scan

Find what you haven't noticed yet. Two modes. Auto-detect from prompt. If ambiguous, run both.

## Code Mode — "What's broken that nobody noticed?"

### 1. Project state
- git status: uncommitted work, untracked files, stash entries
- Recent commits: anything surprising in the last 10?
- Build/test status: does it pass right now?

### 2. File health
- Any Layer 1 file over 250 lines? (context budget exceeded)
- Any .md file over 500 lines? (probably doing two jobs)
- HANDOFF.md "Last updated" more than 7 days old? (stale)
- LEARNINGS.md over 15 entries? (needs pruning)
- Council memory over 20 entries? (needs eviction)
- TODO.md items unchanged for 3+ sessions? (stalled or fake priorities)

### 3. Cross-file contradictions
- Read SOUL.md, CLAUDE.md, VOICE.md, USER.md. Do they agree?
- Does CLAUDE.md reference skills or files that don't exist?
- Does HANDOFF.md "next actions" match TODO.md "now"?
- Do the decision rules in CLAUDE.md match The Constraint in SOUL.md?

### 4. Cross-session patterns
- Read last 3-5 session logs. What keeps coming up?
- Any recurring friction that nobody has named?
- Any recurring success that hasn't been codified into a skill?

### 5. Report
Already documented (skip) -> Surprises (need attention) -> Suggested actions. Don't fix. Report only.

---

## Product Mode — "What's one step away from what you already built?"

### 1. Map what exists
What's built, what's deployed, what's live, what data flows are active. List it.

### 2. Find hidden leverage
- Infrastructure that exists but isn't being used
- Data being collected but not surfaced
- Skills that exist but nobody invokes
- Connections between existing systems that haven't been wired

### 3. Find gaps
- **Missing skills:** What got done manually this session that should be automated? What 5+ step sequence happened that could be a skill?
- **Missing hooks:** What mistake happened that a hook could have caught? What rule exists in CLAUDE.md but isn't enforced structurally?
- **Missing councils:** Any decision type made 3+ times without structured debate?

### 4. Find what's being avoided
- What's been on TODO.md for 3+ sessions without progress?
- What topic keeps getting deferred to "next session"?
- What hard decision is everyone building around instead of making?

### 5. Generate ideas
5-8 ideas. Each one:
- One-line pitch
- What already exists to build on (no new infrastructure required)
- The emergent loop: what new behavior does this create that feeds back?
- Effort: trivial / light / medium / heavy

Rank by emergent potential, not effort. The best emergent features create loops that feed themselves.

### 6. Present as a menu
Surface and stop. Don't build. Don't plan. The human picks.

---

## Output

Save to `scans/YYYY-MM-DD-[topic].md`. If multiple entries exist for the same day, use `YYYY-MM-DD-NN-[topic].md` (01, 02, etc.). Update `scans/README.md` index.

```markdown
# Emergent Scan NN — [Topic]

**Date:** YYYY-MM-DD
**Mode:** Code / Product / Both

## Surprises (Code Mode)
[Broken state, contradictions, unnamed patterns]

## Hidden Leverage (Product Mode)
[Infrastructure not used, connections not wired]

## Gaps
[Missing skills, hooks, councils]

## What's Being Avoided
[Stalled TODOs, deferred decisions]

## Ideas (ranked by emergent potential)
| # | Idea | Builds on | Emergent loop | Effort |
|---|------|-----------|---------------|--------|

## The One Thing
[If you only act on one finding from this scan, it should be this.]
```

---

## Anti-Rationalization Table

| Excuse | Reality |
|--------|---------|
| "Everything is on track" | That's when drift is most invisible. Scan anyway. |
| "I already know what to work on" | You know what you decided to work on. The scan finds what you decided not to look at. |
| "There's nothing to scan yet, the project is new" | New projects have the most hidden leverage. Everything is one step away. |
| "I'll do a scan next session" | The patterns are freshest now. Next session you'll be heads-down on something else. |
