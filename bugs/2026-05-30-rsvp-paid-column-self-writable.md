# Verified user can set `paid` / `ticket_secured` on their own RSVP row

**Status:** [open]
**Found:** 2026-05-30
**Severity:** P1 high

## What happens
The phase-2 RLS update policy on `rsvps` is row-level (`auth.uid() = user_id OR is_organizer()`). It does not restrict columns, so a verified user can hit the REST API directly and set `paid = true` / `ticket_secured = true` on their own row. The client treats those as organizer-only controls.

## What should happen
Only an organizer may change `paid` / `ticket_secured`.

## Root cause
Postgres RLS is row-level, not column-level. No column guard.

## Fix plan
Column-guard trigger that blocks non-organizer changes to `paid`/`ticket_secured` (or move them to an organizer-only table / RPC). Deferred: we are not collecting payments from strangers day one, so this only bites once payment tracking is live. Fix BEFORE payments go live.
