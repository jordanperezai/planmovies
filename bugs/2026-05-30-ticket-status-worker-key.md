# ticket_status lockdown deferred — ticket-monitor worker key unconfirmed

**Status:** [open]
**Found:** 2026-05-30
**Severity:** P1 high

## What happens
The ticket-monitor worker writes `ticket_status` using `env.SUPABASE_KEY` (`workers/ticket-monitor/src/index.js:161`; `wrangler.toml` documents only `SUPABASE_KEY`). The planmovies-api worker uses `SUPABASE_SERVICE_KEY` explicitly. If the ticket-monitor secret holds the ANON key, dropping `ticket_status` write policies in the phase-2 lockdown would silently break ticket monitoring.

## What should happen
`ticket_status` writable only by the service-key worker, and the worker provably uses the `service_role` key.

## Root cause
Worker secret named generically (`SUPABASE_KEY`); value not verifiable (Cloudflare hides secrets after they are set).

## Fix plan
Confirm or force the service key: `cd workers/ticket-monitor && npx wrangler secret put SUPABASE_KEY` and paste the Supabase `service_role` key (or decode the existing JWT's `role` claim). THEN lock `ticket_status`. Until then, leave `ticket_status` write policies as-is (low-risk data) — it is pulled OUT of the phase-2 lockdown migration on purpose.
