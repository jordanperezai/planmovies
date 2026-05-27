# The Pipeline

> Session 3 | 2026-05-26 | design pipeline, audience split, the world of the film
> Key discovery: "The page that changes between visits earns re-opens."

---

## Running the Machine

The session started with a design pipeline that existed in global skills but had never been run on this project. `.impeccable.md` first, then `/shape`, then `/impeccable craft`, then `/audit`, then `/critique`, then `/harden`, then `/typeset`, then `/polish`. Eight steps. Each one found something the previous one missed.

The most important catch came not from a skill but from Jordan looking at a screenshot: "why does it look like the RSVP is just floating there." The status line below the CTA was three different-width text fragments drifting in dark space with nothing anchoring them. The audit hadn't caught it. The critique skill almost caught it. Jordan caught it immediately. The fix took four minutes.

That's the pattern. The skills surface systemic issues. The human sees what doesn't feel right.

---

## The Gradient Text Ban

The `/impeccable craft` skill found a BAN 2 violation that had been sitting in the code since session 2. The title shimmer was using `background-clip: text` with a gradient — the exact pattern the skill marks as an AI slop tell. It had been added by the Visual Rangers as a "shimmer re-enable." It survived two ranger sessions and a full visual overhaul without being caught.

Replaced it with a `title-glow` animation using text-shadow pulse. Same cinematic effect, no banned pattern. The distinction matters less visually than technically. But the principle is right: gradient text is a fingerprint.

---

## The CTA That Didn't Work

During visual testing, I found that the inline CTA button had no `onclick` handler. The sticky CTA did. The landing page's primary call to action had been doing nothing for anyone who tapped it before the sticky appeared.

Nobody had opened the link yet. Nobody had tried to RSVP. The bug was there since the button was built.

This is the exact failure mode CLAUDE.md Pattern #1 describes: success signal without ground-truth check. The button existed. The button looked correct. The button didn't work. Only tapping it revealed the truth.

---

## Two Audiences

The Product Rangers session 03 was the session's structural pivot. The question was: who sees what after they RSVP?

Five independent voices said the same thing: payment percentages and readiness rings are the organizer's anxiety projected onto participants. A family member who just said "I'm in" doesn't need to know that 0% of people have paid. That data belongs to Jordan, not his cousin.

The split is simple. `planmovies.com` is the family page: crew list, the movie, and a buy ticket button. `planmovies.com?org=1` is Jordan's page: same family experience on top, then the full operational dashboard underneath.

Kim's insight was the sharpest: don't build a separate admin panel. Same attendee list, different density. The organizer sees payment badges and a nudge button. The participant sees names. One surface, two levels.

The nudge loop is still not built. Jordan is still texting people manually in WhatsApp, checking who paid, following up on soft yeses. The product sees the outputs of that coordination but absorbs none of the process. That's the next structural thing to fix.

---

## The World of the Film

The skeptic path got built. "What is Disclosure Day?" below the CTA routes to the Movie tab. The Movie tab is now "The World of Disclosure Day": trailers, cast, the premise, quotes from cast and crew, what people are saying, and then a section that doesn't belong on most movie microsites: "THIS IS ACTUALLY HAPPENING."

Real congressional hearing clips. Grusch's opening statement. Fravor describing the Tic Tac encounter. The Pentagon releasing 40+ UAP videos four days before this session. WAR.GOV/UFO with 1 billion visits in two weeks.

Ramirez said it in Visual Rangers session 01: the page presents information about the film instead of creating the feeling of it. The "DOWN THE RABBIT HOLE" section creates the feeling. The film and the real world blur together. That's the immersion.

Murthy's observation lands here too: the page that changes between visits earns re-opens. Right now it's static. As RSVPs come in, the crew list changes. When new Pentagon files drop, the headlines update. When Jordan builds the nudge loop, the coordination layer becomes active. The page has to become a living thing.

---

## What Shifted

The app shipped two things this session that session 2 didn't have: a reason to come back, and a reason to bring someone else. The crew list recruits through social pressure. The rabbit hole recruits through curiosity. The share buttons are everywhere now.

The link still hasn't been sent to the family. Every improvement to an empty page is potential energy. The moment Jordan sends it, it converts.

The design pipeline is documented, proven, and ready to run again. The next movie Jordan plans will inherit everything built here.
