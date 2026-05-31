-- ============================================================================
-- ROLLBACK for 2026-05-30_phase2_multitenant_lockdown.sql
-- Restores the original permissive ("Anyone can ...") policies and drops the
-- ownership policies + helpers. Apply atomically. Does NOT drop the added
-- columns (owner_user_id / event_id / user_id) -- they are nullable and harmless;
-- drop them manually only if you are certain nothing depends on them.
-- ============================================================================

-- ---------- events: drop owner writes (keep public read) ----------
drop policy if exists "events insert own"          on public.events;
drop policy if exists "events update own or admin" on public.events;
drop policy if exists "events delete own or admin" on public.events;

-- ---------- rsvps: restore permissive ----------
drop policy if exists "rsvps public read"         on public.rsvps;
drop policy if exists "rsvps insert own or owner" on public.rsvps;
drop policy if exists "rsvps update own or owner" on public.rsvps;
drop policy if exists "rsvps delete own or owner" on public.rsvps;

create policy "Anyone can read rsvps"   on public.rsvps for select using (true);
create policy "Anyone can insert rsvps" on public.rsvps for insert with check (true);
create policy "Anyone can update rsvps" on public.rsvps for update using (true);
create policy "Anyone can delete rsvps" on public.rsvps for delete using (true);

-- ---------- seat_assignments: restore permissive ----------
drop policy if exists "seats public read"  on public.seat_assignments;
drop policy if exists "seats owner insert" on public.seat_assignments;
drop policy if exists "seats owner update" on public.seat_assignments;
drop policy if exists "seats owner delete" on public.seat_assignments;

create policy "Anyone can read seats"     on public.seat_assignments for select using (true);
create policy "Anyone can assign seats"   on public.seat_assignments for insert with check (true);
create policy "Anyone can update seats"   on public.seat_assignments for update using (true);
create policy "Anyone can unassign seats" on public.seat_assignments for delete using (true);

-- ---------- activity_feed: restore (note: original insert was role public) ----------
drop policy if exists "activity_feed public read"          on public.activity_feed;
drop policy if exists "activity_feed insert authenticated" on public.activity_feed;

create policy "Activity feed is publicly readable"      on public.activity_feed for select using (true);
create policy "Activity feed insert for authenticated"  on public.activity_feed for insert with check (true);

-- ---------- helpers ----------
drop function if exists public.owns_event(uuid);
drop function if exists public.is_super_admin();
-- organizer_admins table left in place (harmless; drop manually if desired).
