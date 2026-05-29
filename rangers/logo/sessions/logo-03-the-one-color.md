# Logo Rangers — Session 03: The One Color

> 2026-05-28 · Decision: if PlanMovies commits to ONE accent color (+ white/black), which one?
> Context: the mark is the row of three cinema seats (two outline, center solid = "you"). Trigger:
> Jordan said "I don't think the gold we have is strong" + competitor color research.

## The frame (neutral, given to all voices)

Candidates: 1) #c9a84c muted antique gold (current) · 2) #d4af37 true metallic gold ·
3) #eab308 bright amber-gold · 4) #a52a32 velvet/curtain red · 5) #e02b2b bright red.
Facts given: competitor color map (red = Netflix/Cinemark/AMC; blue = Prime/Disney/Blockbuster;
orange = Fandango/Regal; green = Hulu; yellow = IMDb; black/white = Max; gold = unclaimed,
prestige-film awards only). Purkinje fact: theater seats are red because red desaturates first as
lights dim. Surfaces: 16px favicon, ~24px nav, white-chat-bubble unfurl, app tile, lockup.

## The vote

| Voice | Pick | Core reason |
|---|---|---|
| Sagi Haviv | **#d4af37 gold** | appropriate/distinctive/simple; gold = "occasion," unclaimed lane; brightness survives 16px |
| Paula Scher | **#d4af37 gold** | color as environment = "the award, not the seat"; reds disappear on dark (Purkinje) or = Netflix |
| Jessica Hische | **#a52a32 velvet red** | craft/reproduction: thin OUTLINE seats + high chroma fringe at 16px; low-chroma red holds the hairline; gold = wrong emotion (podium, not friends) |
| Aaron Draplin | **#d4af37 gold** | "the single point of light in a dark theater"; #c9a84c apologetic, #eab308 nacho-yellow, reds wear another team's jersey |
| Lindon Leader | **#d4af37 gold** | the discovered idea: gold = the trophy, the center "you" seat is the prize; Purkinje is trivia you'd have to explain (un-FedEx) |
| **Michael Bierut (verifier)** | **#a52a32 velvet red** | MEASURED: every gold fails WCAG on white (1.9–2.3:1, below 3:1); outline seats vanish on white unfurl; velvet red only one clearing 3:1 on both surfaces |

**Tally: 4 gold (#d4af37) · 2 velvet red (#a52a32).**

## Verifier's hard findings (Bierut, checked the files)

- **Repaint cost is cheap.** index.html has only 2 raw `c9a84c` literals; all 131 accent hits route
  through 6 tokens (`--gold` etc., lines ~32-37). Swap tokens = swap brand. Color is not the obstacle.
- **The boards' own labels concede gold's white failure** ("Dies on white," "white = a touch weak").
- **Measured WCAG contrast:**

  | color | vs #07080a (dark page) | vs #ffffff (white unfurl) |
  |---|---|---|
  | #c9a84c muted gold | 8.77 | **2.29 ✗** |
  | #d4af37 metallic gold | 9.53 | **2.10 ✗** |
  | #eab308 amber | 10.45 | **1.92 ✗** |
  | #a52a32 velvet red | **2.84 (marginal)** | 7.05 ✓ |
  | #e02b2b bright red | 4.34 | 4.62 ✓ |

  All golds fail the 3:1 graphical-object floor on white; brighter gold = worse on white. Velvet red is
  marginal (2.84) on the dark page but strong (7.05) on white. Bright red passes both but = Netflix lane.

## Chairman synthesis

Vote leans **#d4af37 gold 4-2**, but the dissent is the verifier with measured data, so it isn't dismissable.
The two findings reconcile into ONE answer rather than a coin-flip:

1. **What fails on white is the thin OUTLINE seats, not gold per se** (both red-voters flagged the *strokes*).
   Solid seats survive far better than hairline strokes on a light background.
2. **Small marks belong on their own dark tile** (favicon/app-tile/unfurl chip), not transparent on white.
   On a dark tile, gold's white-contrast failure is moot — standard practice, already true of our favicon.

**Recommendation: `#d4af37` metallic gold + SOLID seats (drop outlines) + small mark always on a dark tile.**
This takes the 4-vote differentiation/prestige win AND answers Bierut's deployment data. Unanimous secondary
finding: the *current* `#c9a84c` is the weak gold — the fix is a stronger gold, not a switch to red.

Confidence: HIGH that #c9a84c should be replaced by #d4af37 (6/6 reject the muddy current gold).
MEDIUM-HIGH on gold-over-red overall (the differentiation case is strong; the white-unfurl risk is real but
solved by dark-tile + solid seats). Open risk to watch: if the brand ever needs a transparent-on-white mark,
gold needs an outline/darker variant.

Next: build #d4af37 solid-seat row on a dark tile, verify on white unfurl, compare against #c9a84c.
