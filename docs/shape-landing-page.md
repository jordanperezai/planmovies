# Design Brief: Landing Page

> Shaped: 2026-05-26 | For: /impeccable craft

## 1. Feature Summary

The landing page is the first thing ~25 family members see when they tap a link in WhatsApp or iMessage. It has one job: convert "Jordan sent a link" into an RSVP in under 30 seconds. The page must feel like a theater lobby before the lights go down, not an event listing.

## 2. Primary User Action

Tap "COUNT ME IN" and RSVP. Everything above the button creates desire. Everything below it is optional context.

## 3. Design Direction

**Classified premiere.** Dark, cinematic, atmospheric. The poster commands the frame. Three gold registers (hot for CTA, warm for title/badges, cool for metadata) with a blue counterweight pulled from the film poster.

This is not a dark-mode UI. It's a theater. The near-black background is the room before the film starts. The gold is not an accent color. It's the security clearance aesthetic of the PlanMovies brand.

**Current state vs. target:**
The landing page is 80% there after Visual Rangers session 01. The remaining 20% is:
- **Information architecture**: too many small text elements competing below the title. The eye has no rest between poster and CTA.
- **Typography**: Inter + JetBrains Mono + Barlow Condensed is three families. JetBrains Mono is used for body-level content (tagline, labels) where it reads as "developer tool" instead of "cinematic." The mono font should be reserved for data: countdown, status codes, metadata.
- **Spacing rhythm**: spacing between elements is relatively uniform (8px, 12px, 24px). No breathing room. No hierarchy in the gaps.
- **The form divider and venue card were removed** (form stripped to 3 fields). The RSVP page is now much lighter. The journey from CTA tap to submission is short.

## 4. Layout Strategy

**Visual hierarchy (top to bottom):**

1. **Wordmark** (PLAN [seal] MOVIES) — small, cool gold, identity anchor. Not the focus.
2. **Poster** — dominant. 45vh max. The single visual that creates desire. Blue shadow halo connects it to the atmosphere.
3. **Title + Credit** — supporting role. Confirms what the poster already tells you. Compact cluster, tight gap between title and credit.
4. **Date pill** — OPENING NIGHT / JUN 12 2026. Functional information. Barlow Condensed gives it a badge/ticket quality.
5. **Tagline** — "The one you see with the people who matter." This is the emotional hook. Needs breathing room above and below. Should feel like it belongs on a poster, not in a UI.
6. **Social proof + CTA cluster** — headcount ("Jordan is going. Join them.") and button are one unit. Tight gap between them. The headcount is the last push before the action.
7. **Status metadata** — RSVP OPEN, countdown, ticket status. Smallest text. Cool gold and tertiary. Functional, not emotional.

**Key spatial moves:**
- Generous gap after poster (the poster needs to command, then release)
- Tight gap between title and credit (they're one thought)
- Generous gap before tagline (it's the second emotional beat after the poster)
- Tight gap between headcount and CTA (they're one decision unit)
- The metadata cluster at the bottom should feel like footnotes, not content

**After CTA tap:** The page scrolls or transitions to the RSVP section. The form is now 3 fields: name (text input), status (4 radio pills), party size (5 radio pills). One screen on mobile. No scrolling within the form.

## 5. Key States

| State | What the user sees | What they feel |
|---|---|---|
| **First load** | Poster fades in from blur (@starting-style). Elements stagger in. | "This looks real. Someone put effort into this." |
| **0 RSVPs** | "Be the first to RSVP" or hide headcount entirely | No awkward emptiness. The page still works. |
| **1-3 RSVPs** | "Jordan is going. Join them." with names. | Social proof from known people. Not a counter. |
| **10+ RSVPs** | "Jordan, Maria, and 8 others are going." | Momentum. This is happening. |
| **After RSVP** | Confirmation with crew list. "You're #N. Here's who's in." | Satisfaction + social reinforcement. Share impulse. |
| **Poster fails to load** | Graceful fallback. Title and CTA still work. | Not broken. The page still functions without the poster. |
| **Slow connection** | Poster loads last. Text and CTA appear first. | Functional before beautiful. CTA is never blocked. |

## 6. Interaction Model

**Entry:** User taps link in WhatsApp/iMessage. Page loads. Poster entrance animation plays (1.2s fade from blur). Elements stagger in with fade-up.

**Scroll:** Sticky CTA appears when inline CTA scrolls out of viewport. Safe-area-inset-bottom padding for notched phones.

**CTA tap:** Navigates to RSVP page. Three fields: name, status (Confirmed/Probably/Maybe/Can't Make It), party size (Just Me through +4). Radio pills for status and party size. One tap per field.

**Submit:** Button shows loading state. On success: form resets, toast confirms, page could show crew list (post-submit recruiting per Murthy's principle).

**Hover (desktop):** Poster scales slightly (1.03). CTA brightens with sweep effect.

## 7. Content Requirements

**Static copy:**
- Wordmark: PLAN [seal] MOVIES
- Title: DISCLOSURE DAY
- Credit: A STEVEN SPIELBERG FILM
- Date pill: OPENING NIGHT / JUN 12 2026
- Tagline: "The one you see with the people who matter."
- CTA: COUNT ME IN
- Status: RSVP OPEN
- Ticket line: TICKETS EXPECTED MAY 27 (will change to TICKETS LIVE when available)

**Dynamic content:**
- Countdown: "17d 10h until opening night" (updates live)
- Headcount: varies by RSVP count (see states above)
- Poster: loaded from TMDB CDN. Needs onerror fallback.

**Form labels:**
- "Your Name" (placeholder: "First and last name")
- "Are You Coming?" (Confirmed / Probably / Maybe / Can't Make It)
- "How Many People? (Including You)" (Just Me / +1 / +2 / +3 / +4)

## 8. Recommended References

- `reference/typography.md` — type scale refinement, font pairing validation
- `reference/spatial-design.md` — spacing rhythm, visual hierarchy through whitespace
- `reference/motion-design.md` — entrance animation timing, @starting-style, reduced-motion
- `reference/interaction-design.md` — form patterns, radio pill behavior, optimistic submit

## 9. Resolved Questions

1. **Post-submit experience**: After RSVP, transition to a "lobby" experience. A calm room that builds momentum about the movie. Content: trailers, declassified news headlines, UFO Twitter, podcasts. The crew list lives here too ("You're #5. Here's who's in.") but the room is bigger than a confirmation screen. It's the hype room. Think: movie theater lobby for Disclosure Day, curated for the people who are going. This is a significant feature scope. Shape separately if needed.
2. **Tagline font**: Visual Rangers should decide. Flag during craft or run a ranger session.

## 10. Open Questions (for craft)

1. **News banner**: rotating headline banner (news-banner class, 4s fade). Still wanted or should it be killed? It sits in the nav area.
2. **"TICKETS EXPECTED MAY 27" line**: tickets reportedly drop today. Once live, what should the live state say and link to?
