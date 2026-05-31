# A verified user can create unbounded RSVP rows

**Status:** [open]
**Found:** 2026-05-30
**Severity:** P1 high

## What happens
`resumeRSVP` inserts `rsvps` with `user_id = authUserId`; RLS only checks ownership; there is no per-user cap. A verified user (or a direct API caller) can create many rows under their own uid, spamming or defacing a public crew.

## What should happen
A reasonable cap on rows per user per event.

## Root cause
No row-count constraint.

## Fix plan
A per-user-per-event cap via trigger (e.g. <= 10), or rate limiting. NOT a `UNIQUE(event_id, user_id)` constraint — that would break the legitimate "RSVP again for someone else" feature (one logged-in person RSVPing for family who have no phone). Phone verification raises the bar for launch. Fast-follow.
