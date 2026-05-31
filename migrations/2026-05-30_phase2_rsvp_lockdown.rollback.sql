-- ============================================================================
-- ROLLBACK for 2026-05-30_phase2_rsvp_lockdown.sql
-- Restores the prior wide-open public policies. Keeps the additive rsvps.user_id
-- column and the organizer_admins table (both harmless to leave in place).
-- ============================================================================

-- ---------- rsvps ----------
drop policy if exists "rsvps insert own or organizer" on public.rsvps;
drop policy if exists "rsvps update own or organizer" on public.rsvps;
drop policy if exists "rsvps delete own or organizer" on public.rsvps;
drop policy if exists "rsvps public read"             on public.rsvps;
create policy "Anyone can read rsvps"   on public.rsvps for select using (true);
create policy "Anyone can insert rsvps" on public.rsvps for insert with check (true);
create policy "Anyone can update rsvps" on public.rsvps for update using (true) with check (true);
create policy "Anyone can delete rsvps" on public.rsvps for delete using (true);

-- ---------- seat_assignments ----------
drop policy if exists "seat_assignments public read"      on public.seat_assignments;
drop policy if exists "seat_assignments organizer insert" on public.seat_assignments;
drop policy if exists "seat_assignments organizer update" on public.seat_assignments;
drop policy if exists "seat_assignments organizer delete" on public.seat_assignments;
create policy "Anyone can read seats"     on public.seat_assignments for select using (true);
create policy "Anyone can assign seats"   on public.seat_assignments for insert with check (true);
create policy "Anyone can update seats"   on public.seat_assignments for update using (true) with check (true);
create policy "Anyone can unassign seats" on public.seat_assignments for delete using (true);

-- ---------- ticket_status ----------
drop policy if exists "ticket_status public read" on public.ticket_status;
create policy "Anyone can read ticket status"    on public.ticket_status for select using (true);
create policy "Workers can upsert ticket status" on public.ticket_status for insert with check (true);
create policy "Workers can update ticket status" on public.ticket_status for update using (true) with check (true);

-- ---------- activity_feed ----------
drop policy if exists "activity_feed public read"          on public.activity_feed;
drop policy if exists "activity_feed insert authenticated" on public.activity_feed;
create policy "Activity feed is publicly readable"     on public.activity_feed for select using (true);
create policy "Activity feed insert for authenticated" on public.activity_feed for insert with check (true);
