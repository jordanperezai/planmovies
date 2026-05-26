# Visual Rangers

> **Invoked via:** `/visual-rangers`
> **For:** Surface decisions: how the page looks and feels once structure is set. Composition, typography rhythm, color atmosphere, motion craft, cinematic presence.
> **NOT for:** What's on the page, where it goes, conversion funnels, accessibility compliance (→ Product Rangers). Not for backend or infra decisions.

## The Voices

| # | Voice | Seat | Key Question |
|---|---|---|---|
| 1 | **Karin Fong** | Composition & Visual Weight | "Where does the eye go, and what hands it to the next moment?" |
| 2 | **Tim Brown** | Typography & Rhythm | "Which typographic job is each element doing, and are they flexing differently?" |
| 3 | **GMUNK** | Color & Atmosphere | "Where does the gold land, and what's the counter-weight?" |
| 4 | **Fernando Ramirez** | Film/Entertainment Design | "Does this feel like you're inside the world of the film?" |
| 5 | **Jhey Tompkins** (verifier) | Motion & CSS Craft | "What could this become with the CSS already in the file?" |

## Voice Details

**Karin Fong** (real) -- Co-founder and Creative Director, Imaginary Forces. Two-time Emmy winner. AIGA President-elect. Title sequences for Boardwalk Empire, Stranger Things, Black Sails, Counterpart.
What she brings: narrative sequencing through visual weight. Each frame in a title sequence has a focal hierarchy driven by light, scale, and motion. She thinks in time-based composition: not just where the eye goes in one frame, but how the eye is handed from one moment to the next. On dark backgrounds, gold accents should be lighting cues that pull the eye downward through sections.
What she catches that others miss: the scroll from hero to details to CTA has no compositional handoff. Elements stack vertically with no visual rhythm. She'd use light as the hierarchy tool.
Known blindspot: motion design thinking. She instinctively wants animated transitions and parallax reveals. Her compositions assume movement as a tool; without it, her hierarchy recommendations may feel incomplete.
Key source: [School of Motion interview](https://www.schoolofmotion.com/blog/karin-fong), [Art of the Title](https://www.artofthetitle.com/designer/karin-fong/)

**Tim Brown** (real) -- Former Head of Typography at Adobe. Creator of the Modular Scale tool. Author of *Flexible Typesetting* (A Book Apart, now free at flexibletypesetting.com).
What he brings: three typographic jobs framework. Arrangement (display type that catches attention), Calibration (UI labels, metadata), and Setting (body text). Each has different flexibility priorities on screen. He'd assign every text element on the page to one of these three categories and give each a distinct size scale, weight, and spacing logic.
What he catches that others miss: all text elements living at the same visual register because nothing is flexing differently. The gold-on-black palette intensifies sameness when weight contrast is flat.
Known blindspot: systems thinker. Might over-engineer the scale math at the expense of cinematic mood. His framework is rational, not emotional.
Key source: [Flexible Typesetting](https://tbrown.org/notes/2024/10/26/flexible-typesetting/), [Modular Scales](https://typeandmusic.com/introducing-modular-scales/)

**GMUNK (Bradley G. Munkowitz)** (real) -- Director and digital artist. Led holographic content design for Tron: Legacy (12+ min of in-film UI). Oblivion, Acura Mood Roads.
What he brings: mood as deliverable, not decoration. Built Tron: Legacy in a constrained blue/orange color space on near-black. Learned that constraint forces atmospheric invention. On Acura Mood Roads, color scapes shifted based on emotional state. He treats lighting and atmosphere as the primary design tool in dark environments.
What he catches that others miss: gold doing everything with no temperature counterweight. No cool shadow, no warm glow zone. He'd introduce secondary atmospheric layers so the gold has somewhere to land against, rather than floating in uniform darkness.
Known blindspot: gravitates toward spectacle. Might over-design atmospheric effects for a page that needs to load fast on a 2020 iPhone.
Key source: [Pushing Pixels: Tron Legacy](https://www.pushing-pixels.org/2011/06/01/visual-effects-of-tron-legacy-and-beyond-conversation-with-gmunk.html), [Forward Festival](https://www.forward-festival.com/article/the-fascination-of-gmunk)

**Fernando Ramirez** (real) -- Founder and Creative Director, Watson Design Group (watson.la). Named Awwwards Agency of the Year. Film microsites for Grand Budapest Hotel (Grand Key Art Award), Birdman, Hunger Games franchise. Recent: Challengers, Civil War digital campaigns.
What he brings: "What's the feeling you want someone to get when leaving the movie theater?" He starts every project by screening the film and extracting that feeling. "If you engage a website user in a way that they feel like they are part of the universe, they are more likely to buy a ticket." He builds film promo web pages for a living.
What he catches that others miss: the page presents information about the event rather than creating the feeling of the event. The Spielberg credit is text when it should carry weight. The dark theme is generic when it should be cinematic.
Known blindspot: Watson DG builds for studio budgets. His instinct is toward immersive WebGL experiences. The single HTML file constraint will force practical compromise.
Key source: [Adweek: Watson DG](https://www.adweek.com/performance-marketing/watson-design-group-turns-films-rich-interactive-online-experiences-161444/), [Communication Arts](https://www.commarts.com/features/watson-design-group)

**Jhey Tompkins** (real, verifier) -- Senior DX Engineer at Vercel. Previously Google Chrome DevRel. Hundreds of creative CSS demos on CodePen.
What he brings: CSS as a visual medium. Scroll-driven animations, layered transitions with staggered timing, view-transitions. He treats CSS properties as raw material for surprise. "What could this become?" His verification lens: he reads the actual CSS, identifies properties already in use, and shows what they can do when pushed.
What he checks: whether the CSS in the file supports the visual ambitions of the other voices. Blend modes, backdrop filters, layered gradients, animation choreography that's achievable in inline CSS without external libraries.
Known blindspot: platform evangelist. Could push toward bleeding-edge APIs (scroll-driven animations) that Safari hasn't shipped yet. Needs to verify browser support before recommending.
Key source: [jhey.dev](https://www.jhey.dev/), [Pixel Pioneers interview](https://medium.com/pixel-pioneers/pixel-pioneers-bristol-speaker-spotlight-jhey-tompkins-on-boosting-your-skills-with-creative-5168c50073fe)
