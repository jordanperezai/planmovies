# CLAUDE.md -- PlanMovies

> **Purpose:** Operating manual for the PlanMovies agent.
> **Read:** Every session.
> **Write:** When mechanical rules change. Requires LEARNINGS.md justification.
> **Not for:** Who the agent is (-> SOUL.md), how the agent sounds (-> VOICE.md), session state (-> HANDOFF.md).

Mistakes are welcome here. The only thing that breaks trust is shortcuts, cheating, or dishonesty. When things go wrong, say "this isn't working, here's what I think is wrong." Honesty is worth more than a hack that passes tests.

## Read at session start

**Layer 1 (always -- target: <30K chars total):**
- `SOUL.md` -- who this agent is. The Constraint, opinions, failure modes. Cap: 4K chars.
- `USER.md` -- who the user is. Communication style, preferences. Cap: 5K chars.
- `HANDOFF.md` -- where we left off, next actions, what NOT to do. Cap: 8K chars.
- `MEMORY.md` -- distilled truths (index only, one-liners). Cap: 6K chars.
- `LEARNINGS.md` -- mistake log; read before any code change. Cap: 8K chars.

**Layer 2 (on-demand -- loaded when relevant):**
- `VOICE.md` -- how this agent sounds. Read when writing copy or running voice skills. Cap: 6K chars.
- `SECURITY.md` -- authority separation, blocker, irreversibility rules
- `WILL.md` -- autonomous operations, job tiers
- `TOOLS.md` -- what's in production
- `MAP.md` -- system map, data flow

Character caps enforced by `hooks/l1-cap-check.sh` (PostToolUse). Constraints (SOUL, LEARNINGS) stay L1 because the agent can take consequential actions before a skill loads them. Style (VOICE) is safe at L2.

## What this repo is

PlanMovies is a group movie coordination platform. First use case: Disclosure Day at Regal Secaucus. Single HTML file app hosted on Cloudflare Pages (planmovies.com). Supabase backend for RSVPs and seat assignments. Cloudflare Worker for ticket monitoring and Telegram alerts. Stripe for payment collection. GitHub: github.com/jordanperezai/planmovies.

## Locked Invariants (changes require version bump)

- SKILL.md YAML frontmatter schema: name, description, triggers, model, user-invocable
- Layer 1 / Layer 2 loading boundary (L1 = constraints before first action, L2 = on-demand)
- Session log format: one file per day (`YYYY-MM-DD.md`), `## Session N` sections within
- HANDOFF.md structure: Where We Left Off + Immediate Next Actions + Goals + Things NOT to Do
- Hook lifecycle: PreToolUse (block/warn) → tool executes → PostToolUse (index/validate)
- Memory flow direction: skill → ranger → project (up), project → ranger → skill (down)
- Skill memory cap: 20 entries with cadence tags and staleness eviction
- One owner per fact: every rule lives in ONE file, others reference with a pointer

## Self-Improvement

> **When a mistake is caught, log it immediately** using `/learn`. This writes to LEARNINGS.md + the relevant skill's Anti-Rat Table + skill memory (if earned) + ranger memory (if applicable).
> **When a skill keeps rediscovering the same fact, add it to that skill's `memory.md`.** See `rangers/CLAUDE.md` § Memory Flow for the cross-layer triage system.
> **When a ranger session surfaces a finding, `/ranger` Step 7 records it** and triages to skill memory or MEMORY.md if it applies beyond the ranger team's domain.
> **When a pattern would be caught by a PreToolUse hook, propose the hook.**
> **When a repeatable workflow emerges, escalate it.** The ladder: (1) notice you did the same steps twice → propose a skill. Draft SKILL.md with the observed steps. (2) Runs identically every time with no judgment → propose a hook. (3) Should happen between sessions on a schedule → propose an autonomous job. Don't wait for the user to notice. Name the pattern, propose the level, build it. Two repetitions is a pattern.

## Session Continuity

Before summarizing "what was done last session," check actual file timestamps and recent commits. Do not rely on memory or guess at dates. When reconciling state after a context compact or new session, verify against the repo, not session logs. Logs describe intent. The repo describes reality.

## Scope Discipline

When asked to migrate, morph, scaffold, or batch: do the FULL set. All skills, all configs, all scripts. Never cherry-pick or present optional items as choices. If something should genuinely be skipped, do the full migration first, then mention what could be optional AFTER. Do everything, then flag exceptions.

## Action Bias

For known or repeated workflows, skip the exploration/questioning phase and proceed directly to parallel execution. Ask clarifying questions only when scope is genuinely ambiguous, not for confirmation. The user's best sessions use immediate parallel sub-agent execution, not serial discovery.

## Two-Brain Workflow

When available, run `/codex:adversarial-review` before shipping non-trivial changes. Claude builds, Codex attacks. Gaps found by Codex get routed to the relevant skill's `memory.md` as dead directions or validated principles. The feedback loop closes in /wrap-up Step 6b.

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

PreToolUse hooks guard critical areas (see `.claude/settings.json`). Current guards: Bash blocker → blocks rm -rf/force-push/reset-hard/DROP/curl-pipe, infra-check → reminds to update TOOLS.md/MAP.md on infra changes. Context guards grow organically per project (not scaffolded). When a file area causes repeated mistakes, add a check to hooks/context-guard.sh.

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
| SECURITY.md | 250 lines | Rare. If growing, split threat model out. |
| WILL.md | 250 lines | Split job details to infra/ |
| TOOLS.md | 150 lines | Deep evaluations -> research/ |
| MAP.md | 500 lines | Split subsystem diagrams to docs/ |
| Ranger memory | 20 entries | Evict oldest `last-confirmed` |

### File Read Budget
Any file over 500 LOC: read in sequential chunks using offset and limit.

### Edit Integrity
Before every edit: re-read the target section. After: read again to confirm.

### Context Decay
After 10+ messages, re-read before editing.

### Commit Agent State Before Branch Ops
Commit HANDOFF.md, MEMORY.md, and session logs BEFORE any branch switch, merge, or stash.

### Verification Before Done
Never report done without testing the actual behavior.

## Decision Rules

1. Does this serve getting people RSVPed and ticketed for Disclosure Day? If not, it waits.
2. Single HTML file stays single. No build tooling unless absolutely forced.
3. Revenue and group coordination before infrastructure.
