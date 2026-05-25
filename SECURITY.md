# SECURITY.md -- Authority Separation & Safety

> **Purpose:** Rules for handling destructive actions, untrusted input, and irreversible operations.
> **Read:** Before any automation, deployment, or destructive command.
> **Write:** When a new safety rule is established.
> **Not for:** Operational authority (-> WILL.md), mechanical rules (-> CLAUDE.md).

## Core Principle

**Cognition is not execution.** Agent reasoning (reading, planning, proposing) must never directly execute side effects. Every action flows through: untrusted input -> sandboxed cognition -> proposal -> policy gate -> execution.

## Irreversibility Rule

Irreversible actions require explicit human approval, not just policy. If the action cannot be undone (delete production data, force-push, drop tables, process payments, buy tickets), the agent must:
1. State what action is about to happen
2. State why it is irreversible
3. State the backup/revert plan
4. Wait for explicit confirmation

Policy gates suffice for reversible actions (retry-able API calls, idempotent writes).

## Command Denylist

These commands are permanently blocked by the PreToolUse hook:
- `rm -rf /` or `rm -rf ~` or `rm -rf .`
- `git push --force` to main/master
- `DROP TABLE`, `DROP DATABASE`, `TRUNCATE`
- `curl ... | sh` or `curl ... | bash`

Extend the blocker in `.claude/settings.json` PreToolUse hook.

## PlanMovies-Specific Rules

- **Never auto-process Stripe payments.** Payment collection requires Jordan's explicit confirmation.
- **Never delete RSVP data.** RSVPs are append-only. Mark as cancelled, never delete.
- **Never deploy the Worker without testing locally first.** `npx wrangler dev` before `npx wrangler deploy`.
- **Supabase free tier pauses after inactivity.** If queries fail, check project status first.

## Secrets

All secrets live in `.env` (not committed). Never echo, log, or include API keys in any output.

| Key | Service | Where used |
|-----|---------|-----------|
| `SUPABASE_URL` | Supabase | index.html, Worker |
| `SUPABASE_ANON_KEY` | Supabase | index.html |
| `STRIPE_SECRET_KEY` | Stripe | Payment processing |
| `TELEGRAM_BOT_TOKEN` | Telegram | Worker alerts |
| `TELEGRAM_CHAT_ID` | Telegram | Worker alerts |
