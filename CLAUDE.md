# CLAUDE.md -- PlanMovies

> **Purpose:** Operating manual for the PlanMovies agent.
> **Read:** Every session.
> **Write:** When mechanical rules change. Requires LEARNINGS.md justification.
> **Not for:** Who the agent is (-> SOUL.md), how the agent sounds (-> VOICE.md), session state (-> HANDOFF.md).

Mistakes are welcome here. The only thing that breaks trust is shortcuts, cheating, or dishonesty. When things go wrong, say "this isn't working, here's what I think is wrong." Honesty is worth more than a hack that passes tests.

## Read at session start

**Layer 1 (always):**
- `SOUL.md` -- who this agent is. The Constraint, opinions, failure modes.
- `VOICE.md` -- how this agent sounds. Archetype, rules, Kill List, canonical samples.
- `USER.md` -- who the user is. Communication style, preferences.
- `HANDOFF.md` -- where we left off, next actions, what NOT to do
- `MEMORY.md` -- distilled truths
- `LEARNINGS.md` -- mistake log; read before any code change
- `TODO.md` -- goal tracker

**Layer 2 (on-demand):**
- `SECURITY.md` -- authority separation, blocker, irreversibility rules
- `WILL.md` -- autonomous operations, job tiers
- `TOOLS.md` -- what's in production
- `MAP.md` -- system map, data flow

## What this repo is

PlanMovies is a group movie coordination platform. First use case: Disclosure Day at Regal Secaucus. Single HTML file app hosted on Cloudflare Pages (planmovies.com). Supabase backend for RSVPs and seat assignments. Cloudflare Worker for ticket monitoring and Telegram alerts. Stripe for payment collection. GitHub: github.com/jordanperezai/planmovies.

## Self-Improvement

> **When a mistake is caught, log it immediately** using `/learn`. This writes to LEARNINGS.md + the relevant skill's Anti-Rat Table + skill memory (if earned) + council memory (if applicable).
> **When a skill keeps rediscovering the same fact, add it to that skill's `memory.md`.**
> **When a repeatable workflow emerges, escalate it:**

```
Notice same steps twice      -> propose a skill. Draft SKILL.md with observed steps.
Skill runs identically       -> propose a hook (automate structurally)
Should run between sessions  -> propose an autonomous job (WILL.md)
```

Two repetitions is a pattern. Don't wait for the user to notice. Name the pattern, propose the level, build it.

## Session Continuity

Before summarizing "what was done last session," check actual file timestamps and recent commits. Do not rely on memory or guess at dates. When reconciling state after a context compact or new session, verify against the repo, not session logs. Logs describe intent. The repo describes reality.

## Scope Discipline

When asked to migrate, morph, scaffold, or batch: do the FULL set. Never cherry-pick or present optional items as choices. If something should genuinely be skipped, do the full work first, then mention what could be optional AFTER.

## Skill-Before-Adhoc

When the task is audit, review, check, or verification work: scan the skills list BEFORE doing ad-hoc work. If a skill exists, load it.

## Top Mistake Patterns (always-loaded)

1. **Success signal without ground-truth check.** Verify the actual state, not the tool output.
2. **Confident assertion outrunning verification.** Re-read it.
3. **Applying a change to many before testing on one.**
4. **Treating documentation as behavior.** Runtime reveals truth.
5. **Stale context after 10+ messages.** Re-read before editing.
6. **Check that doesn't gate.** Every check must block on FAIL or be removed.
7. **Irreversible action without approval gate.**
8. **Same mistake pattern recurring 3+ times without a structural fix.**
9. **Local build passing but deploy failing (untracked files).**
10. **Trusting delegated output without verification.** Sub-agents hallucinate. Verify before presenting.

> Every rule added to this file should be justified by a repeated mistake.
> Instruction bloat costs ~20% in agent performance. Prune aggressively.

## Commands

```bash
# Local dev: just open index.html in a browser
# Deploy: push to main, Cloudflare Pages auto-deploys
# Worker: cd workers/ticket-monitor && npx wrangler deploy
```

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app (single HTML file) |
| `workers/ticket-monitor/` | Cloudflare Worker for ticket alerts |
| `.env` | Stripe, Supabase, Telegram keys |

## Hook Awareness

PreToolUse hooks guard critical areas (see `.claude/settings.json`). Current guards: Bash blocker blocks rm -rf/force-push/reset-hard/DROP/curl-pipe. Infra-check reminds to update TOOLS.md/MAP.md on infra changes. Context guards grow organically per project.

## Edit & Context Discipline

### File Size Caps

| File | Cap | When exceeded |
|---|---|---|
| CLAUDE.md | 250 lines | Move sections to Layer 2 files |
| SOUL.md | 250 lines | Split opinions to VISION.md |
| VOICE.md | 250 lines | Move canonical samples to canonical/SAMPLES.md |
| USER.md | 250 lines | Rare. Split by topic if needed. |
| HANDOFF.md | 150 lines | Migrate "don't" items >3 sessions to owner file |
| MEMORY.md | 200 lines | Run /declutter. Hot -> warm -> cold. |
| LEARNINGS.md | 15 active entries | Monthly prune. Rules enforced elsewhere get archived. |
| TODO.md | 15 items | If >15, some aren't real priorities. Cut. |
| SECURITY.md | 250 lines | Rare. If growing, split threat model out. |
| WILL.md | 250 lines | Split job details to infra/ |
| TOOLS.md | 150 lines | Deep evaluations -> research/ |
| MAP.md | 500 lines | Split subsystem diagrams to docs/ |
| Council memory | 20 entries | Evict oldest `last-confirmed` |

### File Read Budget
Any file over 500 LOC: read in sequential chunks using offset and limit.

### Edit Integrity
Before every edit: re-read the target section. After: read again to confirm.

### Context Decay
After 10+ messages, re-read before editing.

### Verification Before Done
Never report done without testing the actual behavior.

## Decision Rules

1. Does this serve getting people RSVPed and ticketed for Disclosure Day? If not, it waits.
2. Single HTML file stays single. No build tooling unless absolutely forced.
3. Revenue and group coordination before infrastructure.
