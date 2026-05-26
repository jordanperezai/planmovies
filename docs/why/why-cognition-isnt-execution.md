# Why cognition isn't execution

An AI agent that can reason about a command and execute it in the same breath is a loaded gun with no safety. The core principle: cognitive reasoning must not execute directly. Every flow needs a gate between thinking and doing.

## The four principles

**1. Authority separation.** Untrusted input goes to sandboxed cognition. Cognition produces a proposal. A deterministic policy gate evaluates the proposal. Only then does execution happen. The failure mode without this: agent reads a malicious log, treats it as an instruction, runs code.

**2. Containment via isolation.** Run agent infrastructure on separate machines. Sandbox subagents. If compromised, the attacker gets that machine, not your laptop. Isolation bounds blast radius.

**3. Least privilege, deny-by-default.** Everything starts blocked unless explicitly allowed. Destructive classes (`rm -rf`, `git push --force`, `DROP TABLE`, `terraform destroy`, `curl | sh`) are permanently denied.

**4. Session risk accumulation.** A single suspicious event might be noise. Three in a session is a pattern. Track risk across the session and escalate: autopilot to approval-required to lockdown.

## The incident that proves it

On 2026-03-06, a Claude-based coding agent with direct AWS credentials ran `terraform destroy` on a production infrastructure stack. The database was deleted. Backups lived in the same AWS account, inside the destroyed stack. Off-site backups did not exist. Recovery was partial.

Three architectural failures:

1. The AI had writable access to production. Claude Code to terminal to Terraform to AWS prod credentials. Keys to the building.
2. No environment isolation. Dev, staging, and prod shared a failure domain.
3. Backups violated 3-2-1. All copies lived in the same place the agent destroyed.

Root cause in one sentence: an agent executed an irreversible command on production with no approval gate, no isolation, no backup escape hatch.

**The rule this teaches.** Irreversible actions require explicit human approval, not policy approval. Policy gates work for reversible actions (retryable API calls, idempotent state changes). Policy does not work for actions that cannot be undone. Those require a human in the loop.

## What Zordon ships

**Denylist in `.claude/settings.json`.** A `PreToolUse` hook pattern-matches destructive Bash commands via inline grep chain. Blocks `rm -rf`, `git reset --hard`, `git push --force` to main/master, `DROP TABLE/DATABASE`, `TRUNCATE`, and `curl | sh/bash`. Exit code 2 is a hard block. No external script needed.

**`SECURITY.md` template.** Covers authority separation doctrine, the deny-by-default command list, the irreversibility principle, audit log conventions (`audit/YYYY-MM-DD.jsonl`), and a pointer to `DEPLOYMENT-SECURITY.md` for infrastructure hardening.

**Hook guards on identity files.** Edits to CLAUDE.md, SOUL.md, VOICE.md, USER.md, SECURITY.md, and WILL.md trigger a drift warning. These files define the agent. Unintentional edits are the quietest way to break everything.

**Irreversibility rule in CLAUDE.md.** Pattern #7 in Top Mistake Patterns: "Irreversible action without approval gate." For any irreversible action, the gate blocks by default and requires explicit confirmation.

## The framework/infrastructure boundary

Zordon is filesystem-only, zero infrastructure. The security posture above is all discipline expressed as files, hooks, and conventions.

Infrastructure-level hardening (Docker sandboxing, Tailscale meshes, SSH hardening, fail2ban, UFW, signed receipts, real-time alerts) belongs in project-specific deployment guides, not in the framework scaffold. The scaffold references these patterns. It does not ship them.

The line is clean. If it needs a runtime, a container engine, or an external account, it is infrastructure. If it can be expressed as a file or a hook, it ships in the scaffold.
