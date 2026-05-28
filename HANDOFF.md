# HANDOFF.md -- PlanMovies Session Handoff

> **Purpose:** Bring a new session up to speed instantly.
> **Last updated:** 2026-05-27 (Session 10)
> **Not for:** Permanent knowledge (-> MEMORY.md), mistakes (-> LEARNINGS.md).

## Where We Left Off

Session 10 complete. Two major work streams: (1) built 9 features, (2) ran /critique twice and did a full design overhaul.

**Current state:**
- index.html: 3930 lines, all features + redesign. NOT committed yet.
- planmovies.com: still on commit 3b47371 (pre-session-10). Needs push.
- Supabase: activity_feed table, crew-photos bucket, rsvps phone/photo_url/status_line/user_id columns all live.
- AI slop score: 5.0/10 (was 6.5). Heuristics: 24/40 (was 20/40).

**Phone auth blocker:** Twilio Verify needs to be configured in Supabase dashboard before OTP codes actually send. Jordan needs to: Supabase → Auth → Providers → Phone → Enable + add Twilio Account SID, Auth Token, Verify Service SID. Until then, "Skip for now" keeps RSVP working without phone verification.

## Immediate Next Actions

1. **Commit and push** — index.html is 3930 lines of undeployed work. One commit, push to main, Cloudflare auto-deploys.
2. **Configure Twilio Verify** in Supabase dashboard. Jordan does this. Not a code task.
3. **Send planmovies.com to family** — 15 days until June 12. This is the only thing that matters.
4. **(Optional) /critique pass 3** — after Twilio config and any cleanup. Should score ~26-28/40.

## Key Decisions (Session 10)

- **Phone auth with escape valve:** "Skip for now" (12px, visible) lets family skip phone verification. RSVP works either way. Auth just links the RSVP to a verified phone once Twilio is configured.
- **Mono = data only:** 13 remaining `var(--mono)` uses are all legitimate (countdown, OTP, phone input, payment amount, seat labels, timestamps). Everything else is Barlow Condensed (display) or Inter (body/buttons).
- **Barlow Condensed as display font:** Replaces mono's incorrectly-held role for labels, headers, and CTAs. Cinema aesthetic without the terminal feel.
- **RSVP auto-scroll:** COUNT ME IN now scrolls to the RSVP form. No more 3-screen hunt.
- **Entrance animations once:** pageViewed{} tracker. First visit animates. Return visits skip it.
- **Activity feed:** Reads activity_feed table, falls back to RSVP timestamps. New RSVPs auto-log to the feed.

## Goals

**Now (before sending to family):**
- ✅ Phone auth RSVP flow
- ✅ OG image fixed (landscape backdrop)
- ✅ Profile photos in avatar row
- ✅ Activity feed
- ✅ Share prompt after RSVP
- ✅ Film-frame countdown (always visible)
- ✅ Crew one-line status
- ✅ "What to Know" primer
- ✅ Organizer manual-add
- ☐ Commit + push (first thing next session)
- ☐ Twilio Verify config (Jordan)
- ☐ Send to family

**After family send:**
- Anticipation phase (content unlock calendar, milestone markers)
- Organizer payment tracker + nudge generator
- Post-event: photo album, crew rating, morning-after recap
- Named Crew page (persistent across events)
- Crew Picks voting + clone event
- Ticket delivery as designed artifact
- Movie Night Kit timeline
- Event creation wizard (TMDB search → date → theater → price → share)
- Founding Crew badge for Disclosure Day attendees

## Things NOT to Do

1. Don't add a framework. Single HTML file intentional.
2. Don't build automated purchasing. NJ criminal statute (4th degree crime). Monitor and alert only.
3. Don't touch the Supabase anon key hardcoded in index.html. RLS policies are the security layer.
4. Don't show payment status on family crew list. Payment tracking is organizer-only. Ticket icon for everyone.
5. Don't hardcode content one-off. Use data arrays + render functions.
6. Don't commit .env. It is gitignored. Never force-add it.
7. Don't randomize headlines. They are ranked by impact. Order is intentional.
8. Don't build in-app chat. PlanMovies generates messages for WhatsApp/iMessage. Don't compete with messaging apps.
9. Don't add a theme/template selector for events. The movie poster IS the theme. Auto-extract, don't ask.
10. Don't build public discovery yet. Security complexity with strangers joining crews is unresolved.
11. Don't apply mono font to non-data text. var(--mono) = countdown digits, prices, timestamps, phone/OTP inputs, seat numbers only.

## Reference Docs

| Doc | What |
|---|---|
| `research/2026-05-27-05-product-feature-map.md` | Complete 79-feature product map |
| `rangers/product/sessions/product-08-complete-product-vision.md` | Full ranger vision (487 lines) |
| `.impeccable.md` | Design context. Read before any UI work. |
