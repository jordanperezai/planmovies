# WILL.md -- Autonomous Operations

> **Purpose:** What the agent does when the human isn't present.
> **Read:** Before any autonomous run.
> **Write:** When adding, promoting, or retiring a job.
> **Not for:** Session work (-> HANDOFF.md), mechanical rules (-> CLAUDE.md).

---

## Autonomy Scale

| Tier | Name | What it can do | Example |
|------|------|----------------|---------|
| 0 | **Observe** | Read state, log findings. No writes, no alerts. | Health checks |
| 1 | **Report** | Observe + send notifications. No data changes. | Ticket alerts |
| 2 | **Maintain** | Report + fix known problems within guardrails. | Auto-heal, data sync |
| 3 | **Act** | Maintain + make decisions, call external APIs. | AI-driven workflows |

**Promotion rule:** A job starts at Tier 0-1. It earns higher tiers after 7+ days with zero incidents. The human promotes explicitly. The system never self-promotes.

---

## Active Jobs

| Job | Trigger | Intent | Tier | Escalation |
|-----|---------|--------|------|------------|
| `ticket-monitor` | Scheduled (Cloudflare Cron) | Check Regal ticket availability, alert via Telegram | 1 | Alert Jordan. Don't buy tickets. |
| `/declutter` | Monthly (manual) | Prune LEARNINGS, compress MEMORY, decay topics | 0 | Report what would be pruned. Don't prune without approval. |

**Autonomous run template:** `infra/auto-skill.sh` chains any job through: authorization check (WILL.md) -> skill execution (Claude Code) -> proof capture (autonomous/) -> notification (message.sh).

---

## Constraints

- **Default deny.** If a job isn't listed here, it doesn't run.
- **No PII in agent state.** Agent files never contain personal data (names in RSVPs stay in Supabase only).
- **Receipt on every action.** Every autonomous action writes a log entry.
- **Append-only.** One bad run can't destroy history.
- **Budget caps.** API calls capped per job. Overrun = halt + alert.
- **Never purchase tickets autonomously.** Ticket buying is always manual.

---

## Promotion History

| Date | Job | From | To | Reason |
|------|-----|------|----|--------|
| 2026-05-25 | `ticket-monitor` | -- | Tier 1 | Already running as Cloudflare Worker |
| 2026-05-25 | `/declutter` | -- | Tier 0 | Initial setup |
