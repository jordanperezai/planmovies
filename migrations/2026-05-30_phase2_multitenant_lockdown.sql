-- ============================================================================
-- Phase 2 (multi-tenant): lock rsvps + seat_assignments + activity_feed + events
-- for the PUBLIC, multi-crew platform. Project: aahaurqqkrgwqdqkohuu (planmovies)
--
-- SUPERSEDES migrations/2026-05-30_phase2_rsvp_lockdown.sql. That file used a
-- GLOBAL is_organizer() check, which in a multi-tenant world would let ANY crew
-- creator manage EVERY crew's RSVPs. This version is per-event:
--   * events.owner_user_id  = the auth user who created the crew.
--   * owns_event(eid)        = "does the current user own THIS event?"
--   * is_super_admin()       = global moderation escape hatch (Jordan only).
-- A write to a row is allowed if: you own the row (auth.uid()=user_id), OR you
-- own the row's event, OR you're a super-admin. Crews are walled off from each
-- other; strangers cannot read-write each other's RSVPs.
--
-- APPLY ORDER (do NOT run this DB-first):
--   1. Deploy the new index.html (gate + event scoping + create-crew) and confirm
--      it is live at planmovies.com.
--   2. Run a real signInWithOtp -> verifyOtp -> insert round-trip from a phone
--      WHILE the old permissive policies are still live (so any failure is loud).
--   3. Apply THIS migration (apply_migration wraps it in one transaction).
--   4. Backfill the flagship + grant the super-admin (deploy-time, uses the real
--      uid -- NOT committed here):
--        update public.events
--          set owner_user_id = (select id from auth.users where phone = '+1XXXXXXXXXX')
--          where slug = 'disclosure-day-2026-06-12';
--        update public.seat_assignments
--          set event_id = '0d8355b6-e12d-439f-a5a4-0be0285f9704'
--          where event_id is null;
--        insert into public.organizer_admins (user_id, note)
--          select id, 'Jordan / founder -- global moderator'
--          from auth.users where phone = '+1XXXXXXXXXX'
--          on conflict (user_id) do nothing;
--   5. Re-run get_advisors(security); confirm zero rls_policy_always_true on
--      rsvps/seat_assignments/activity_feed. From a logged-out browser: crew +
--      feed + seats still render; an anon insert/update/delete on rsvps returns
--      401/403; a verified-session insert into your OWN crew succeeds; a verified
--      user CANNOT insert/update/delete into a crew they don't own.
--   6. Delete the 3 legacy user_id-null seed rows (Jordan / Sarai Perez / Taylor).
--
-- Live policy names below were verified against pg_policies on 2026-05-30.
-- Rollback: 2026-05-30_phase2_multitenant_lockdown.rollback.sql
-- Apply ATOMICALLY: never statement-by-statement. A mid-run failure must roll
-- back so a table is never left with policies dropped and no replacement.
-- ticket_status is DEFERRED (worker writes it with an unconfirmed key --
-- see bugs/2026-05-30-ticket-status-worker-key.md).
-- ============================================================================

-- ---------- ownership columns ----------
alter table public.events            add column if not exists owner_user_id uuid references auth.users(id);
alter table public.seat_assignments  add column if not exists event_id      uuid references public.events(id);
alter table public.rsvps             add column if not exists user_id        uuid references auth.users(id);

create index if not exists events_owner_user_id_idx     on public.events(owner_user_id);
create index if not exists seat_assignments_event_id_idx on public.seat_assignments(event_id);
create index if not exists rsvps_user_id_idx            on public.rsvps(user_id);
create index if not exists rsvps_event_id_idx           on public.rsvps(event_id);

-- ---------- global super-admin (Jordan moderates ANY crew) ----------
create table if not exists public.organizer_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.organizer_admins enable row level security;
-- No policies: only the service key (bypasses RLS) reads/writes this table.

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.organizer_admins where user_id = auth.uid());
$$;
revoke all on function public.is_super_admin() from public;
grant execute on function public.is_super_admin() to authenticated, anon;

-- ---------- per-event ownership check ----------
create or replace function public.owns_event(eid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.events where id = eid and owner_user_id = auth.uid());
$$;
revoke all on function public.owns_event(uuid) from public;
grant execute on function public.owns_event(uuid) to authenticated, anon;

-- ---------- events: public read (kept) + owner-only writes ----------
-- "Events are publicly readable" (SELECT using true) already exists -- leave it.
drop policy if exists "events insert own"          on public.events;
drop policy if exists "events update own or admin" on public.events;
drop policy if exists "events delete own or admin" on public.events;

create policy "events insert own" on public.events
  for insert to authenticated
  with check (auth.uid() = owner_user_id);
create policy "events update own or admin" on public.events
  for update to authenticated
  using (auth.uid() = owner_user_id or public.is_super_admin())
  with check (auth.uid() = owner_user_id or public.is_super_admin());
create policy "events delete own or admin" on public.events
  for delete to authenticated
  using (auth.uid() = owner_user_id or public.is_super_admin());

-- ---------- rsvps: public read; write = own row OR event-owner OR super-admin ----------
drop policy if exists "Anyone can insert rsvps" on public.rsvps;
drop policy if exists "Anyone can update rsvps" on public.rsvps;
drop policy if exists "Anyone can delete rsvps" on public.rsvps;
drop policy if exists "Anyone can read rsvps"   on public.rsvps;

create policy "rsvps public read" on public.rsvps
  for select using (true);
create policy "rsvps insert own or owner" on public.rsvps
  for insert to authenticated
  with check (auth.uid() = user_id or public.owns_event(event_id) or public.is_super_admin());
create policy "rsvps update own or owner" on public.rsvps
  for update to authenticated
  using      (auth.uid() = user_id or public.owns_event(event_id) or public.is_super_admin())
  with check (auth.uid() = user_id or public.owns_event(event_id) or public.is_super_admin());
create policy "rsvps delete own or owner" on public.rsvps
  for delete to authenticated
  using      (auth.uid() = user_id or public.owns_event(event_id) or public.is_super_admin());

-- ---------- seat_assignments: public read; write = event-owner OR super-admin ----------
drop policy if exists "Anyone can assign seats"   on public.seat_assignments;
drop policy if exists "Anyone can update seats"   on public.seat_assignments;
drop policy if exists "Anyone can unassign seats" on public.seat_assignments;
drop policy if exists "Anyone can read seats"     on public.seat_assignments;

create policy "seats public read" on public.seat_assignments
  for select using (true);
create policy "seats owner insert" on public.seat_assignments
  for insert to authenticated with check (public.owns_event(event_id) or public.is_super_admin());
create policy "seats owner update" on public.seat_assignments
  for update to authenticated
  using (public.owns_event(event_id) or public.is_super_admin())
  with check (public.owns_event(event_id) or public.is_super_admin());
create policy "seats owner delete" on public.seat_assignments
  for delete to authenticated using (public.owns_event(event_id) or public.is_super_admin());

-- ---------- activity_feed: public read; insert needs a verified session ----------
-- OLD insert policy was role {public} (anon could write the feed -- the XSS amplifier). Close it.
drop policy if exists "Activity feed insert for authenticated" on public.activity_feed;
drop policy if exists "Activity feed is publicly readable"      on public.activity_feed;

create policy "activity_feed public read" on public.activity_feed
  for select using (true);
create policy "activity_feed insert authenticated" on public.activity_feed
  for insert to authenticated with check (auth.uid() is not null);
-- No update/delete: feed entries are immutable.
