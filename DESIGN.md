# DESIGN.md — PlanMovies Platform Design System

> **Purpose:** Every page on PlanMovies follows this system. Read before building any UI.
> **Source of truth for:** page structure, spacing, typography rules, color usage, component patterns.
> **Not for:** brand identity (-> .impeccable.md), voice (-> VOICE.md), agent behavior (-> CLAUDE.md).

## The Page DNA

Every page on PlanMovies follows this structure. The order matters. The ratios matter. This is the pattern that made the Crew page feel alive instead of generated.

```
┌──────────────────────────┐
│     HERO VISUAL          │  40% of first viewport
│  (poster/backdrop/image) │  Dimmed, saturated, gradient fade
│  Title + context overlay │
├──────────────────────────┤
│                          │
│     SOCIAL PROOF         │  People. Names. Faces. Centered.
│  (crew, attendees, you)  │  This is the conversion mechanism.
│                          │
├──────────────────────────┤
│     PRIMARY ACTION       │  Wrapped in a card. Compact.
│  (RSVP, vote, confirm)   │  3 fields max. One button.
│                          │
├──────────────────────────┤
│     CONTEXT              │  Supporting info: venue, schedule,
│  (venue, feed, details)  │  activity feed, dress code.
│                          │  Progressive disclosure for extras.
└──────────────────────────┘
```

**Why this order works:** The visual creates the emotion. The people create the pull. The action captures the commitment. The context supports the decision. Reversing any pair (form before people, text before visual) breaks the conversion.

## Hero Visual

Every page opens with a visual. Not text. Not a form. An image that makes you feel something.

**Event pages:** Movie poster backdrop. Full-width, `height: 320px`, `object-fit: cover`, `filter: brightness(0.5) saturate(1.2)`. Gradient fade from transparent to `--bg-deep` at the bottom. Title, venue, and date overlaid on the gradient.

**Profile pages:** The user's One Movie poster, or their photo, as a hero band.

**Discovery/browse pages:** Featured movie poster or collage.

**The rule:** If you can't identify a hero image for a page, the page shouldn't exist yet. The visual IS the page. The movie's marketing team spent $200M making that poster emotionally compelling. Use it.

## Spacing

Density is the #1 AI tell. A page that breathes feels designed. A page that's packed feels generated.

| Token | Value | Use |
|---|---|---|
| `--space-tight` | 8px | Related items within a group |
| `--space-md` | 16px | Between form fields, between card and its label |
| `--space-lg` | 24px | Between major sections in `.crew-body` |
| `--space-xl` | 32px | Before/after atmospheric dividers |
| `--space-section` | 48px | Between page-level zones (hero to body, body to footer) |

**The rule:** `.crew-body > * + *` gets 24px. No exceptions. If two elements feel too far apart, they should be in the same card, not closer together on the page.

## Typography

### Fonts

| Font | Role | Example |
|---|---|---|
| Inter | Body text, buttons, form labels, descriptions | "Your turn." / "Count Me In" |
| Barlow Condensed | Display headings, section headers, venue labels, badges | "Disclosure Day" / "The Crew" |
| JetBrains Mono | Data only: countdown, prices, timestamps, phone/OTP, seat numbers | "15:09:14:57" / "$18" |

**Mono = data.** If the content isn't a number, a time, a price, or a code, it's not mono.

### Case

| Element | Case | Why |
|---|---|---|
| Nav brand (PLAN MOVIES) | Uppercase | Brand identity |
| Page eyebrows | Uppercase | Hierarchy signal (one tier only) |
| Countdown labels (DAYS, HRS) | Uppercase | Data label |
| Section headers | Sentence case | "The Crew" not "THE CREW" |
| Buttons | Sentence case | "Count Me In" not "COUNT ME IN" |
| Tags/badges | Sentence case | "Going" not "GOING" |
| Everything else | Sentence case | Default is sentence case. Uppercase is earned. |

### Letter-spacing

| Tier | Value | Use |
|---|---|---|
| Tight | -0.5px | Large display headings (32px+) |
| None | 0 | Body text, buttons, labels (the default) |
| Heading | 1px | Section headers in sentence case |
| Brand | 2px | Nav brand, page eyebrows |
| Display | 3-4px | Landing title, hero overlays |

**The rule:** If you're adding `letter-spacing` to an element, check the tier table. If it's not listed, don't add it. The default is 0.

## Color

Three gold registers. One blue counterweight. Near-black surfaces.

| Color | Token | Use |
|---|---|---|
| Hot gold | `--gold` (#c9a84c) | CTA buttons, active states, primary actions |
| Warm gold | `--gold-warm` (#b8984a) | Titles, badges, hero overlay text |
| Cool gold | `--gold-cool` (#8a7d5a) | Credit text, tertiary labels, dimmed brand |
| Blue atmos | `--blue-atmos` (#3a5080) | Film-specific counterweight, countdown tint, atmospheric |
| Surfaces | `--bg-deep` through `--bg-elevated` | Page background, cards, hover states |

**The rule:** Gold is the brand. Blue is the film. Future events swap the blue counterweight color (extracted from the movie poster), never the gold.

## Components

### Cards

Use cards to elevate content above the page surface. Not for wrapping everything.

```css
padding: 24px 20px;
background: var(--bg-card);
border: 1px solid var(--border-subtle);
border-radius: var(--radius);
```

**When to card:** Forms, confirmation states, featured content.
**When NOT to card:** Section headers, inline text, avatar rows, dividers. Not everything needs a container.

### Hero

```css
.crew-hero {
  position: relative;
  margin: -68px -16px 0; /* bleed to edges, overlap nav */
  overflow: hidden;
}
.crew-hero-poster {
  width: 100%; height: 320px;
  object-fit: cover;
  filter: brightness(0.5) saturate(1.2);
}
.crew-hero-gradient {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(to top, var(--bg-deep), transparent);
}
```

The hero bleeds edge-to-edge and overlaps behind the nav. The gradient creates a seamless transition to the page content below.

### Atmospheric Dividers

```css
.atmos-divider {
  margin: 32px -16px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--blue-atmos-glow),
    var(--gold-glow), var(--blue-atmos-glow), transparent);
}
```

Use between major page zones. Not between every section.

## Anti-Patterns (Kill on Sight)

These patterns make PlanMovies look AI-generated. If you catch yourself writing any of them, stop and rewrite.

1. **Uppercase on non-brand elements.** Section headers, buttons, badges, tags in ALL CAPS.
2. **Letter-spacing spray.** Adding 0.3-0.5px tracking to body text, labels, or buttons.
3. **Same density everywhere.** No spacing variation between sections. Everything 16px apart.
4. **Form-first pages.** The first thing visible is an input field, not a visual or social proof.
5. **Tiny avatar circles with initials.** Two 32px circles with "J" and "S" is not a crew. Show faces, names, status lines. Make the crew feel like people.
6. **Hero metric stat cards.** Big number + small label + grid. That's a dashboard, not an event page.
7. **Monospace on non-data text.** Mono is for numbers and codes. Period.
8. **Gold glow on everything.** One gold glow (CTA hover) is an accent. Five gold glows is a dashboard.

## Applying to New Pages

When building any new page:

1. **Identify the hero image.** What's the most emotionally compelling visual for this page?
2. **Identify the social proof.** Who or what creates the pull to act?
3. **Identify the one action.** What's the single thing the user should do?
4. **Build in Page DNA order.** Hero → social proof → action → context.
5. **Apply spacing tokens.** 24px between sections. Cards around forms. Breathing room.
6. **Check typography.** Sentence case. No letter-spacing spray. Mono for data only.
7. **Test on mobile.** The link arrives via WhatsApp. Phone is the primary viewport.

### Example: Event Creation Page

- **Hero:** Poster from TMDB search result (auto-fills as you pick the movie)
- **Social proof:** "Your crew from last time" (pre-filled from Named Crew)
- **Action:** Date + theater + share link
- **Context:** Price calculator, seat map preview

### Example: Profile Page

- **Hero:** User's One Movie poster (60% width, centered)
- **Social proof:** "Founding Crew" badge + crew connections
- **Action:** Edit profile / Pick your movie
- **Context:** Event history, stats

### Example: Discover Page

- **Hero:** Featured movie poster (this weekend's pick)
- **Social proof:** "3 groups going opening night in NJ"
- **Action:** Browse / Join a group
- **Context:** Filters, location, trending
