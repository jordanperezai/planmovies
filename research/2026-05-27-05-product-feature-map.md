# PlanMovies Complete Product Feature Map

> 2026-05-27 | Product Rangers Session 08 | Comprehensive feature plan
> Rangers: Frisby (conversion), Kim (coordinator burden), Johnson (age-range), Murthy (social dynamics), Shadeed (verifier)
> Total features mapped: 79 | PlanMovies-only: 14 | Already shipped: 11

---

## Priority Summary

- **P0 (Disclosure Day):** 11 features, ALL SHIPPED
- **P1 (Ship within days):** 21 features
- **P2 (Platform foundation):** 33 features
- **P3 (Growth/retention):** 14 features

---

## The 10 Features That Define PlanMovies

1. **The Content World** — Every movie night gets a page that immerses you in the film's universe. Trailers, behind-the-scenes, deep dives. Not a calendar event. A destination.

2. **One Link, Everything Handled** — RSVPs, payments, seats, tickets, updates. One link in the group chat replaces 47 messages.

3. **Integrated Payments** — Real Stripe checkout. Not Venmo links. The system tracks who paid. Nobody chases anyone.

4. **The Anticipation Phase** — The 2 weeks between RSVP and showtime. Activity feed, countdown, daily content, color shifts. The page is alive.

5. **Movie-Based Discovery** — Browse by movie, find groups. "Disclosure Day: 3 groups going opening night in NJ." The movie is the organizing principle.

6. **Auto-Theme from Poster** — Pick a movie. Poster, colors, synopsis, trailers auto-fill. The movie's $200M marketing designs your page for free.

7. **Group Seat Map** — See where your group sits. "You're between Marco and Sarai." The sit-together promise, made visual.

8. **Share-as-Growth** — Every touchpoint is distribution. Post-RSVP share prompt. Shareable fact cards. Auto-generated crew poster.

9. **Organizer Burden Elimination** — Payment tracker, nudge generator, cadence engine. Every hour the organizer spends coordinating, the product absorbs.

10. **Post-Event Loop** — Photo album. "Plan the next one" with crew pre-filled. Every completed movie night seeds the next one.

---

## Feature Tables by Category

### Landing / First Impression

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 1.1 | Single-Viewport Hero | P0 | — | DONE |
| 1.2 | Poster Carousel | P0 | — | DONE |
| 1.3 | Dynamic Social Proof | P0 | — | DONE |
| 1.4 | Custom OG Image (1200x630) | P1 | Low | TODO |
| 1.5 | Personalized Landing (?for=marco) | P2 | Low | TODO |
| 1.6 | Multi-Event Landing | P2 | Medium | TODO |
| 1.7 | "Plan Your Own" Waitlist CTA | P1 | Trivial | TODO |

### RSVP & Crew

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 2.1 | Two-Option RSVP | P0 | — | DONE |
| 2.2 | Avatar Crew Row | P0 | — | DONE |
| 2.3 | Post-RSVP Confirmation | P0 | — | DONE |
| 2.4 | Plus-One Support | P1 | Low | TODO |
| 2.5 | RSVP Change/Cancel | P1 | Medium | TODO |
| 2.6 | RSVP Deadline | P1 | Trivial | TODO |
| 2.7 | Guest Approval Mode | P3 | Medium | TODO |
| 2.8 | Waitlist | P2 | Medium | TODO |
| 2.9 | RSVP Questionnaire | P2 | Medium | TODO |
| 2.10 | Crew Size Limit | P1 | Trivial | TODO |

### Payment & Tickets

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 3.1 | Stripe Payment Link | P0 | — | DONE |
| 3.2 | Payment Status Tracking | P1 | Low | PARTIAL |
| 3.3 | Stripe Webhook Integration | P1 | Medium | TODO |
| 3.4 | Payment Reminder Nudge | P1 | Low | TODO |
| 3.5 | Stripe Connect Onboarding | P2 | High | TODO |
| 3.6 | Split Payment Options | P2 | Medium | TODO |
| 3.7 | Refund Flow | P2 | Medium | TODO |
| 3.8 | Ticket QR Delivery | P2 | High | TODO |
| 3.9 | Concession Pre-Order | P3 | High | TODO |
| 3.10 | "Organizer Covers" Mode | P2 | Low | TODO |

### The Movie Tab / Content World

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 4.1 | Credibility Cascade | P0 | — | DONE |
| 4.2 | Trailer Carousel | P0 | — | DONE |
| 4.3 | TMDB Auto-Content | P2 | Medium | TODO |
| 4.4 | "What to Know" Primer | P1 | Low | TODO |
| 4.5 | Content World Template System | P2 | High | TODO |
| 4.6 | Go Deeper / Rabbit Hole | P0 | — | DONE |
| 4.7 | Shareable Fact Cards | P2 | Medium | TODO |
| 4.8 | Movie Rating & Reviews | P3 | Low | TODO |

### Anticipation Phase (PlanMovies-Only Territory)

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 5.1 | Film-Frame Countdown | P1 | Low | TODO |
| 5.2 | Activity Feed | P1 | Medium | TODO |
| 5.3 | Organizer Updates | P1 | Medium | TODO |
| 5.4 | Daily Fact / Trivia | P2 | Medium | TODO |
| 5.5 | Crew Chat | P3 | High | TODO |
| 5.6 | Share Prompt (post-RSVP) | P1 | Low | TODO |
| 5.7 | Lifecycle Color States | P2 | Low | TODO |
| 5.8 | Seat Map Preview | P2 | High | TODO |
| 5.9 | "Tonight" Mode | P2 | Medium | TODO |
| 5.10 | TMDB Auto-Poster with Crew Names | P2 | Medium | TODO |

### Organizer Tools

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 6.1 | Organizer Dashboard | P0 | — | DONE |
| 6.2 | Payment Tracker | P1 | Medium | TODO |
| 6.3 | Nudge Generator | P1 | Low | TODO |
| 6.4 | Seat Assignment Tool | P2 | Medium | TODO |
| 6.5 | Ticket Purchase Tracker | P1 | Low | TODO |
| 6.6 | Organizer Auth (magic link) | P1 | Medium | TODO |
| 6.7 | Co-Host Permissions | P3 | Medium | TODO |
| 6.8 | Event Analytics | P3 | Medium | TODO |
| 6.9 | Export / CSV | P2 | Trivial | TODO |
| 6.10 | Three-Beat Cadence Engine | P2 | High | TODO |

### Communication

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 7.1 | Organizer Updates Feed | P1 | Medium | TODO |
| 7.2 | Push Notifications | P2 | Medium | TODO |
| 7.3 | SMS Notifications | P2 | Medium | TODO |
| 7.4 | WhatsApp/iMessage Deep Links | P1 | Trivial | TODO |
| 7.5 | Comment Reactions | P2 | Low | TODO |
| 7.6 | @Mentions | P3 | Medium | TODO |
| 7.7 | Telegram Alert Extension | P1 | Low | TODO |

### Post-Event

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 8.1 | Photo Album | P2 | Medium | TODO |
| 8.2 | Crew Rating | P2 | Low | TODO |
| 8.3 | "Plan the Next One" Prompt | P2 | Low | TODO |
| 8.4 | Event Archive | P2 | Low | TODO |
| 8.5 | Post-Event Shareable | P3 | Medium | TODO |
| 8.6 | Discussion Thread | P3 | Medium | TODO |

### Discovery & Explore

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 9.1 | Marquee Explore Page | P2 | High | TODO |
| 9.2 | Location-Based Discovery | P2 | Medium | TODO |
| 9.3 | Movie-Based Discovery | P2 | Medium | TODO |
| 9.4 | "Interested" / Save | P3 | Low | TODO |
| 9.5 | Category Filters | P3 | Medium | TODO |
| 9.6 | Public vs. Private Events | P2 | Low | TODO |

### Profiles & Social Graph

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 10.1 | Basic Profile | P2 | Medium | TODO |
| 10.2 | Movie History | P3 | Low | TODO |
| 10.3 | Mutuals | P3 | Medium | TODO |
| 10.4 | Favorite Genres | P3 | Low | TODO |
| 10.5 | Organizer Profile | P3 | Medium | TODO |
| 10.6 | Contact Sync | P3 | Medium | TODO |

### Event Creation

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 11.1 | One-Decision-Per-Screen Wizard | P2 | High | TODO |
| 11.2 | TMDB Movie Search | P2 | Medium | TODO |
| 11.3 | Auto-Theme from Poster | P2 | Medium | TODO |
| 11.4 | Date Polling | P2 | Medium | TODO |
| 11.5 | Theater/Showtime Selection | P2 | High | TODO |
| 11.6 | Price Calculator | P2 | Trivial | TODO |
| 11.7 | Draft / Preview | P2 | Low | TODO |
| 11.8 | Clone Event | P3 | Low | TODO |
| 11.9 | Add-Ons | P3 | Low | TODO |

### Platform Infrastructure

| # | Feature | Priority | Effort | Status |
|---|---------|----------|--------|--------|
| 12.1 | Phone Auth (Magic Link) | P2 | Medium | TODO |
| 12.2 | Supabase RLS Lockdown | P1 | Medium | TODO |
| 12.3 | Event-Specific URLs | P2 | Medium | TODO |
| 12.4 | Progressive Web App | P2 | Medium | TODO |
| 12.5 | Cloudflare Worker API | P2 | High | PARTIAL |
| 12.6 | Supabase Realtime | P2 | Medium | TODO |
| 12.7 | Error/Empty States | P1 | Low | TODO |
| 12.8 | Analytics | P2 | Low | TODO |
| 12.9 | Rate Limiting | P2 | Low | TODO |
| 12.10 | Multi-Tenant Data Model | P2 | Medium | PARTIAL |
