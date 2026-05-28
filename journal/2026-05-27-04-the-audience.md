# The Audience

> Session 8 | 2026-05-27 | UX overhaul, ranger audits, Partiful research
> Key discovery: "The crew list IS the home page. The RSVP form is part of it."

---

## The Longest Session

Thirty-one commits. That's not a session, that's a sprint.

We started with a broken Stripe link and ended with a completely different product. The RSVP page doesn't exist anymore. The crew list is an avatar row. The landing doesn't scroll. The payment section hides until you commit. Every one of those changes came from actually looking at the page the way a family member would see it.

---

## What the Rangers Found

Three teams ran the crew page audit. Product Rangers, Visual Rangers, and the family personas. The personas were the most useful. Lisa (55, skeptic) saw the payment section before she'd committed to anything and closed the tab. Ray (68, retired electrician) couldn't tap the tiny radio pills. Carmen (62) submitted the RSVP but didn't know if it worked.

Those aren't bugs. They're design failures that look like user errors.

> "Showing a price tag before someone commits creates two decisions instead of one."

Kim said it in the Product Rangers session. It's obvious in retrospect. But nobody notices until you actually walk Carmen through the flow.

---

## One Page

The consolidation felt risky. The RSVP form has always been its own page. Merging it into the crew page meant rewriting the routing, removing a nav tab, moving the confirmation state, and making sure the payment section appears at the right moment.

It worked because the insight was right: **the event page IS the RSVP page IS the guest list.** That's how Partiful thinks about it. You don't RSVP and then see the party. You arrive, see who's going, and join right there. One scroll, one decision, one destination.

---

## The Credibility Cascade

The Movie tab restructure was the other big move. The section order used to be arbitrary. Now it has a logic: the skeptic lands, sees quotes from presidents and generals (ethos), then sees institutions acting on those claims (headlines), then sees it happening globally (world governments), then sees the actual files (declassified), then can go as deep as they want (rabbit hole).

Each section earns the next one. You can't get to the Pentagon videos without first believing this is serious. The page builds the case.

> "Lead with credibility, not politics."

We moved Obama and Trump to HOW WE GOT HERE in session 4. Same principle here. Presidents open In Their Words because they're the most universally credible. Rogan doesn't appear in the headlines section anymore. These weren't difficult choices once the frame was clear.

---

## Partiful

Jordan pulled up the Partiful app and showed me what they'd built. I've known about Partiful abstractly. Seeing it through Jordan's eyes was different.

The avatar row. The activity feed where the host posts "Can't wait to see you tonight!" The calendar. The badges. It's not a better version of our crew list. It's a different design philosophy: the event is a social object that lives between the host and the guests over time, not a static page you visit once to RSVP.

That's what PlanMovies needs to become. Not for Disclosure Day. After. The avatar row is the first step. The activity feed is next.

---

## What Shifted

At the start of this session, planmovies.com was a complete product with a broken payment link. At the end, it's a more honest product. The landing doesn't scroll because we stopped adding to it. The RSVP page doesn't exist because it never needed to. The payment section hides because that's the right order of operations.

The site got smaller and better at the same time.

Fifteen days until June 12. The only remaining task is sending the link.
