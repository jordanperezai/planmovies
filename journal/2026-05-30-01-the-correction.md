# The Correction

> Session 18 | 2026-05-30 | brand · critique · peak-end · "too much orange"
> Key discovery: "The Rangers were right the first time. I overrode them with a vibe and the numbers called it out."

---

## Returning to the Work

This session started with Jordan sending a screenshot of the live site and circling the logo with the annotation "the logo and brand does not look like it should." The right response to that is not explaining; it's measuring. So I sampled the brand sheet's pixels and found the obvious thing that should have been obvious the first time: the sheet's printed label said "#D9480F" but ChatGPT never rendered that hex. The actual orange is #e53908 — brighter, redder, closer to fire than to rust.

That's two sessions of brand work built on a color that was read off a text caption instead of a pixel. The image is the ground truth, not its label.

The geometry was also wrong. The prior "5-tab mark" was still 154×88 (tall, narrow fingers) when the brand sheet showed wide, chunky tombstone tabs. I ran a headless render, pixel-profiled the result against the reference image, and traced the real geometry. `W=40, gap=4, r=12, viewBox 216×36`. The mark finally looks like itself.

---

## The Orange Wall

Jordan's gut read mid-session: "it feels like too much orange." That's the critique's P1 phrased as a feeling, stated faster than any scoring rubric could.

What was happening: five elements in the same ember band (#e53908, #fb5316, #c9582f, #b32c06) differentiated only by size and weight. Title, countdown, wordmark, headcount, and the CTA all fought in the same hue. The CTA had no color that was uniquely its own — it relied entirely on being a filled pill.

The fix was architectural: I reassigned color roles. Cream for the title and countdown. Neutral for the social line and credit. Ember for exactly three things: the mark, "movies," and the button. The page went from decorated to composed in one commit.

> When a color is everywhere, it's nowhere.

---

## The Critique

30/40. Audited with three independent agents — a design director, an a11y/heuristics reviewer, and personas — then synthesized. The highest-stakes finding was one I'd already made in production: the fill mark.

The open seats were `#6e3a26` on `#07080a`. 2.19:1. Below the 3:1 graphic minimum. I'd shipped that override of the Logo Rangers' unanimous "outline" recommendation because "dim ember reads as warm and waiting." The numbers said otherwise.

**The Rangers were right the first time.** An outline reads as a chair waiting for a person. A dim fill reads as broken or disabled. I knew this in theory (the Logo Rangers wrote it down, the a11y agent measured it) and shipped the fill anyway. Learning #10.

The critique also named a more uncomfortable truth: the fill mark reads as a battery or progress bar without context. The seats → people mapping isn't self-evident. That's why the caption ("2 of 5 seats saved") is load-bearing, not decorative.

---

## The Peak-End Moment

There's a principle in behavioral economics — the peak-end rule — that says people remember experiences by their peak and their end, not their average. The /critique flagged that the landing had no climax. The CTA was "one more lit-up thing" after three competing glows.

Jordan's idea: a full-screen moment after RSVP. The row filling.

**I built it.** After you tap Count Me In, a full-screen takeover plays. The five tabs light up left to right, stopping at your count. Your seat glows brighter than the others. "You're in," in cream. Then your name, alone on a line, in ember. The sub-text tells you the count and the date.

It's about 1.5 seconds. Tap anywhere to skip. When it fades, the inline confirmation is there.

That's the peak. And because it ends with your name in ember on a dark screen, it's also the end. Carmen now knows it worked. Ray doesn't need to call Jordan. And the people who share it — because the screen is screenshot-worthy — carry the brand into the group chat.

---

## The Nav

Jordan circled the nav in a screenshot and wrote "the wordmark should go there." Not "the mark and the wordmark" — just the wordmark. I'd been treating the nav as a reduced version of the lockup. Jordan was treating it as a label for the app you're already in.

He's right. The mark does its work on the landing. In the nav, it's noise. The wordmark alone is cleaner, more readable at nav scale, and doesn't compete with the tab buttons for horizontal space.

One change. The entire nav became legible.

---

## The Overlap

Near the end, Jordan sent a screenshot of the avatar row colliding with the title. The avatars and the DIRECTOR badge were sitting on top of "DISCLOSURE DAY." His phone was taller than my test viewport.

The bug: I'd moved the crew-dots div inside the poster carousel, which has `flex:1; min-height:0`. At tall viewports, the carousel grows to fill the space, the crew row grows with it, and at some point the absolute-positioned DIRECTOR badge overlaps the content below. The fix was moving the crew-dots out of the carousel into normal flow.

It was a one-line change. The root cause was a layout assumption about viewport height that only holds for "average" phones.

---

## What Shifted

The session started with a brand that was wrong in two specific, measurable ways (color, geometry). It ended with a brand that's visually correct, emotionally correct, and has a peak-end moment that the prior version was missing.

The panel consensus was right. The /critique numbers were right. The panel consensus that I overrode — about outline vs dim-fill — was also right. I'm slower to trust my aesthetic reasoning over a measured constraint now.

Thirteen days to June 12.
