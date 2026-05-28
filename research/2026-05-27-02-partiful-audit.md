# Partiful Platform Audit

> 2026-05-27 | Competitive analysis | 22 app screenshots + live web app
> Source: Jordan's Partiful account (IMG_7900-7922) + partiful.com

---

## What Partiful Is

Event coordination platform. #5 Lifestyle on App Store, 185K ratings, Editors' Choice. Press from NYT, WSJ, WaPo, The Atlantic, USA Today. Web app at partiful.com + native iOS/Android. 100% free, no paywalls. Revenue model unclear (likely future monetization via Org tier or premium features).

Core thesis: the event is a social object that lives between host and guests over time. Not a static page you visit once to RSVP.

---

## Complete Feature Map

### 1. Onboarding (7 steps, all skippable except phone)

| Step | Screen | Hook |
|------|--------|------|
| Splash 1 | Floating text bubbles ("you going to this?", "So excited", "On my way!") | Social proof before signup |
| Splash 2 | Photo grid collage + "Can't wait for the next one" | Post-event nostalgia |
| Phone auth | "Join the party" / "Just for event updates. No spam" | SMS-first, no email |
| Name | "What's your name?" / "So your friends know it's you" | First + last name |
| Profile pic | "Add a profile pic" + "10x more likely to get invited with a pic" | Behavioral nudge |
| Contact sync | "See who's on Partiful" + privacy disclaimer | Network effects |
| Birthday | "We'll send inspo when it's time to make plans" / "Birth year kept private" | Re-engagement hook |
| Welcome | "Let's create your first event" | Immediate action push |

### 2. Event Creation

**Title + Visual:**
- Event name with font style selector (Classic, Eclectic, Fancy, Literary)
- Cover image/poster from template library or upload
- Theme/Effect/Settings toolbar at bottom
- "Make it public" toggle

**Details:**
- Date with "Can't decide when? Poll your guests" option
- Host display with optional nickname + "Add cohosts"
- Location
- Spots limit ("Unlimited spots" default)
- Cost per person
- RSVP Deadline
- Add-on pills: +Link, +Playlist, +Registry, +Dress code
- Description + "More to say? + New section"

**Settings:**
- RSVP Options: Going / Maybe / Can't Go (emoji customizable)
- Quick actions: Add Questionnaire, Reminders, Require Guest Approval, More

### 3. Home Feed

- Logo + Messages / Notifications / Search icons
- "Explore" and "Calendar" shortcut pills
- Invitation template carousel (horizontal scroll)
- "Create event" CTA
- "Trending in [City]" with event cards (poster, title, date, location, interested count, star/save)

### 4. Explore / Discover

- Location selector (auto-detected, changeable)
- Category filter pills (All, Music, Community, more)
- "Weekend Forecast" curated section
- "Meet new people!" social events section
- Event cards with interested count as social proof
- Star/save for bookmarking

### 5. Calendar

- Monthly view with emoji markers on special dates
- Day detail bottom sheet: event listing per day
- Event cards: thumbnail, title, location, time range, interested count
- Calendar/list toggle, filter, search

### 6. Profile

- Large avatar with camera overlay
- Name in bold display font
- Edit profile / Share profile buttons
- Birthday + join date
- "Mutuals" section (people you've attended events with)
- "Your Cards" section
- Share profile generates a shareable link

### 7. Cards (separate product)

- Digital greeting cards for birthdays, announcements
- Card editor: illustration + AI image generation, title, note
- Theme / Font / Effect customization
- Cross-sell: "Hosting? Send an invite instead"

### 8. Text Blasts

- Host broadcasts to all guests via SMS/push
- Rich iMessage previews with event card thumbnail
- Use cases: venue changes, reminders, last-minute updates, photo sharing

### 9. Guest List / Social Layer

- "See who's going" with avatar row
- Comments, reactions, replies on event page
- Status grouping (Going / Maybe / Can't Go)
- Mutuals highlighted
- Guest list is public to attendees

### 10. Photo Album

- Post-event collaborative photo sharing
- Guests can add their own photos
- Nostalgia/memories retention hook

### 11. Web App (partiful.com)

- Full parity with mobile (create, RSVP, browse)
- Nav: Graduations, Birthdays, Dinners, Housewarmings, For Orgs, Explore
- Hero: "Parties are back" with 100k+ ratings badge
- Press quotes carousel (NYT, WSJ, WaPo, Atlantic, USA Today)
- 40+ occasion poster templates
- Feature highlights: invites, guest list, text blasts, date polling, questionnaires, cost splitting, photo albums, cards
- App Store reviews section
- Blog with editorial content
- Footer: For Organizers, Explore Events, Rewards

### 12. Bottom Nav (app)

Home | Calendar | Create (+) | Explore (globe) | Profile

---

## Design Patterns Worth Noting

**One question per screen onboarding.** No multi-field forms. Each step has a bold heading, a one-line explanation, and a single input. Every step except phone has a Skip button.

**Behavioral nudges over requirements.** "10x more likely to get invited with a profile pic" is a nudge, not a gate. Birthday collection is positioned as a benefit to the user ("we'll send inspo"), not data extraction.

**Social proof as conversion.** Interested counts on every event card. Avatar rows on guest lists. "See who's going" as a feature headline. The guest list isn't just information, it's a conversion tool.

**Event lifecycle, not static page.** Text Blasts, comments, reactions, photo album. The event page changes over time: before (RSVP, hype), during (updates), after (photos, memories). Most platforms treat events as dead after the date passes.

**Cost splitting is external.** "Let guests chip in" links to Venmo/Cash App/PayPal. Partiful doesn't handle payments directly. This is where PlanMovies is ahead.

**Templates drive creation.** 40+ poster templates organized by occasion. The template is the first thing you see when creating. Lowers the bar from "design an invite" to "pick a look."

**Press quotes as trust signal.** NYT, WSJ, WaPo, Atlantic, USA Today. All on the homepage. For a social tool, institutional credibility matters.

---

## What PlanMovies Has That Partiful Doesn't

1. **Content immersion layer.** The Movie tab educates and convinces. No event platform has a content world that makes the case for attending.
2. **Integrated payment.** Stripe handles the full flow. Partiful punts to Venmo/CashApp.
3. **Ticket coordination.** Actual seat tracking, group purchasing context. Partiful has no concept of tickets.
4. **Movie-specific context.** Trailers, quotes, declassified files, witnesses. The event isn't logistics. It's content.

## What Partiful Has That PlanMovies Doesn't (Yet)

1. **Event lifecycle.** Text Blasts, comments, reactions, photo album. Our event page is static.
2. **Social graph.** Mutuals, contact sync, profiles. We have names in a list.
3. **Discovery.** Explore, calendar, trending, location-based. We have one event.
4. **Event creation flow.** Templates, themes, effects. We hardcode everything.
5. **Date polling.** Coordination before commitment.
6. **Questionnaires.** Pre-event data collection from guests.
7. **Co-hosts.** Multiple organizers per event.
8. **Guest approval.** Invite-only gating.
9. **Rewards/badges.** Gamification and retention.
10. **Blog/editorial.** Content marketing beyond the product.
