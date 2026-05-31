-- ============================================================================
-- Phase 2: lock rsvps + seat_assignments + ticket_status + activity_feed.
-- Project: aahaurqqkrgwqdqkohuu (planmovies)
--
-- Pairs with the client phone-OTP gate in index.html. Organizer model =
-- "phone login, you're admin": organizers verify their phone, their uid lives
-- in organizer_admins, and is_organizer() lets them write any crew row.
--
-- APPLY ORDER (do NOT run this DB-first):
--   1. Deploy the new index.html (gate + user_id-on-insert + organizer guards) and
--      confirm it is live at planmovies.com.
--   2. Run a real signInWithOtp -> verifyOtp -> insert round-trip from a phone
--      WHILE the old permissive policies are still live (so any failure is loud).
--   3. Apply THIS migration.
--   4. Grant the organizer (deploy-time step, NOT committed here -- uses the real uid):
--        insert into public.organizer_admins (user_id, note)
--        select id, 'Jordan / founder' from auth.users where phone = '+1XXXXXXXXXX'
--        on conflict (user_id) do nothing;
--   5. Re-run get_advisors(security); confirm zero rls_policy_always_true on these
--      four tables. From a logged-out browser: crew + feed + seats still render;
--      an anon insert/update/delete on rsvps returns 401/403; a verified-session
--      insert succeeds; the organizer dashboard mutates fine.
--   6. Delete the 3 legacy user_id-null seed rows (Jordan / Sarai Perez / Taylor),
--      or backfill their user_id after those people verify.
--
-- Live policy names below were verified against pg_policies on 2026-05-30.
-- Rollback is in 2026-05-30_phase2_rsvp_lockdown.rollback.sql.
-- Apply ATOMICALLY: apply_migration wraps this in one transaction; if running by hand use
-- psql --single-transaction. Never run statement-by-statement — a mid-run failure must roll back
-- so the tables are never left with policies dropped and no replacement.
-- ============================================================================

-- ---------- organizer identity ----------
create table if not exists public.organizer_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.organizer_admins enable row level security;
-- No policies: only the service key (bypasses RLS) reads/writes this table.

create or replace function public.is_organizer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.organizer_admins where user_id = auth.uid());
$$;
revoke all on function public.is_organizer() from public;
grant execute on function public.is_organizer() to authenticated, anon;

-- ---------- rsvps ownership column ----------
alter table public.rsvps add column if not exists user_id uuid references auth.users(id);
create index if not exists rsvps_user_id_idx on public.rsvps (user_id);

-- ---------- rsvps policies ----------
drop policy if exists "Anyone can insert rsvps" on public.rsvps;
drop policy if exists "Anyone can update rsvps" on public.rsvps;
drop policy if exists "Anyone can delete rsvps" on public.rsvps;
drop policy if exists "Anyone can read rsvps"   on public.rsvps;

create policy "rsvps public read" on public.rsvps
  for select using (true);
create policy "rsvps insert own or organizer" on public.rsvps
  for insert to authenticated
  with check (auth.uid() = user_id or public.is_organizer());
create policy "rsvps update own or organizer" on public.rsvps
  for update to authenticated
  using (auth.uid() = user_id or public.is_organizer())
  with check (auth.uid() = user_id or public.is_organizer());
create policy "rsvps delete own or organizer" on public.rsvps
  for delete to authenticated
  using (auth.uid() = user_id or public.is_organizer());

-- ---------- seat_assignments (organizer-managed; client only SELECTs) ----------
drop policy if exists "Anyone can assign seats"   on public.seat_assignments;
drop policy if exists "Anyone can update seats"   on public.seat_assignments;
drop policy if exists "Anyone can unassign seats" on public.seat_assignments;
drop policy if exists "Anyone can read seats"     on public.seat_assignments;

create policy "seat_assignments public read" on public.seat_assignments
  for select using (true);
create policy "seat_assignments organizer insert" on public.seat_assignments
  for insert to authenticated with check (public.is_organizer());
create policy "seat_assignments organizer update" on public.seat_assignments
  for update to authenticated using (public.is_organizer()) with check (public.is_organizer());
create policy "seat_assignments organizer delete" on public.seat_assignments
  for delete to authenticated using (public.is_organizer());

-- ---------- ticket_status: DEFERRED out of this migration ----------
-- The ticket-monitor worker writes ticket_status with env.SUPABASE_KEY, and that secret is NOT
-- confirmed to be the service_role key (Cloudflare hides it once set). Dropping the write policies
-- here could silently break ticket monitoring. Left AS-IS (low-risk data: ticket availability) until
-- the worker key is confirmed or forced to service_role.
-- See bugs/2026-05-30-ticket-status-worker-key.md.

-- ---------- activity_feed (append-only; insert needs a verified session) ----------
drop policy if exists "Activity feed insert for authenticated" on public.activity_feed;
drop policy if exists "Activity feed is publicly readable"      on public.activity_feed;

create policy "activity_feed public read" on public.activity_feed
  for select using (true);
create policy "activity_feed insert authenticated" on public.activity_feed
  for insert to authenticated with check (true);
-- No update/delete policy: feed entries are immutable.
