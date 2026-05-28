# Product Rangers Session 08: The Complete Product Vision

**Date:** 2026-05-27
**Topic:** Every feature. Every category. The definitive PlanMovies product map.
**Rangers:** Stuart Frisby, Kyo Kim, Jeff Johnson, Shreya Murthy, Ahmad Shadeed (verifier)
**Prior memory loaded:** All validated principles and dead directions from memory.md

---

## CATEGORY 1: LANDING / FIRST IMPRESSION

**MURTHY:** The first three seconds from a group chat tap need to answer one question: who's going? Not what the movie is. Not when it is. The person who tapped that link already knows those things because the group chat message said them. What they don't know is whether this is real. Whether people are committed. The landing should feel like walking into a room where three people are already sitting down and waving you over. "Jordan, Sarai, and 2 others are going. You in?"

The current single-viewport hero with the poster is gorgeous. I wouldn't touch it for Disclosure Day. But the model breaks when PlanMovies has 50 events. At that point, the landing can't be one event's poster. It becomes a directory. And directories are boring. The solve: the shared link is always event-specific. planmovies.com/disclosure-day lands on the poster hero. planmovies.com becomes the explore page. Two completely different energy states. Never merge them.

**FRISBY:** The OG preview is the real first impression. Murthy's right. When Jordan texts the link in iMessage, the card that unfolds is what people see. Right now it's pulling the TMDB poster image with "You're Invited: Disclosure Day" and the showtime. That's solid for the first event. But I'd test a version where the OG image is custom-rendered: the poster on the left, "Jordan + 4 are going" on the right, the date at the bottom. A dynamic OG image that updates as more people RSVP. The going count in the iMessage preview is a conversion lever nobody in this space is using. Partiful doesn't do it. Eventbrite doesn't do it. The preview card with social proof is a feature in itself.

**KIM:** I want to talk about the multi-event landing. When PlanMovies is a platform, the organizer isn't Jordan anymore. It's someone who's created three movie nights this year. Their personal landing page is their organizer profile. "Marcus has hosted 7 movie nights. 4.9 stars. 127 total attendees." That's where trust lives for strangers. For the family event, trust is pre-established. For the platform event, trust needs to be built in 3 seconds. The organizer's track record IS the landing for non-family events.

**JOHNSON:** Personalized landing per invitee is the most impactful feature in this category that isn't shipped yet. When Aunt Lisa taps the link and sees "Lisa, Jordan saved you a seat" with the poster and a single button, the cognitive load drops to zero. No decisions. No scanning. One thing to do. The personalization can be as simple as a URL parameter: planmovies.com/disclosure-day?name=Lisa. The system pre-fills the RSVP name field and customizes the hero text. For older family members, this is the difference between a 5-second RSVP and a confused phone call to Jordan.

**SHADEED:** I checked the current OG implementation. The og:image is the TMDB poster at 780px width. That's portrait format. iMessage and WhatsApp preview cards are landscape. The poster is getting center-cropped, which means you see the middle of the image with the title cut off. A custom 1200x630 OG image is not optional. It's broken right now for the most common sharing surface. I'd put this at P0 for any platform launch.

**MURTHY:** Screenshot behavior. What makes someone screenshot the landing and forward it? Two things: it either looks too good not to share (the poster hero achieves this), or it contains information that's easier to screenshot than describe ("Look, 8 people are going already, we should go too"). The crew count visible on the landing, not behind a tab, makes it screenshotable. Right now the crew list is behind the Crew tab. A small "Jordan + 4 going" line on the landing itself would make the screenshot carry social proof.

**NEW FEATURES (Category 1):**
1. Dynamic OG image with going count (updates with RSVPs)
2. Personalized landing via URL parameter
3. Going count on landing hero
4. Organizer profile landing for platform mode
5. Event-specific URL scheme

---

## CATEGORY 2: RSVP & CREW

**KIM:** The two-option RSVP (Going / Can't Make It) is correct. We killed Maybe in session 01 and I'd kill it again. Maybe is the organizer's enemy. It creates a phantom headcount that can't be acted on. "Maybe" means "ask me again later," which means Jordan is still chasing people in the group chat. If you're not going, say so. If you're thinking about it, the page exists for you to come back when you decide.

But the late-RSVP experience needs work. Someone gets the link at 11pm and the movie is tomorrow at 7pm. The page should feel different. Not panicky, but direct. "Tomorrow night. 12 seats left. Jordan needs your answer tonight." The countdown, the urgency, the specificity of "12 seats left" rather than a generic deadline. The scarcity is real because Jordan is buying a fixed number of tickets. Use it.

**MURTHY:** The plus-one naming problem. "Marco is bringing someone" is useless. "Marco is bringing Jessica" is useful. But requiring the name at RSVP time creates friction that kills conversion. Marco might not know Jessica's last name. Or he's not sure she's coming. The solve: let Marco RSVP with a +1 and give him 48 hours to name them. After 48 hours, Jordan gets a nudge: "Marco's +1 still unnamed. Remind him?" The name slot stays open until ticketing forces it closed.

The crew list as social proof engine. Right now it's an avatar row with names. What if each crew member had a one-line status? Not a comment system. A single field: "Can't wait" or "Bringing snacks" or just a movie emoji. Something that makes the crew list feel alive rather than a static headcount. Partiful does this with custom RSVP responses and it's one of our highest-engagement features. The crew list becomes a wall of excitement, not a roster.

**JOHNSON:** The RSVP deadline needs to be explicit and visible. Not buried in metadata. "RSVPs close June 10 at midnight" in plain text under the form. For older users, ambiguity about timing creates anxiety. "Can I still RSVP?" should never be a question. The page should answer it before anyone asks.

The questionnaire feature (organizer asks custom questions) is high potential but dangerous. Every question is friction. I'd cap it at 2 custom questions, with suggested presets: "Need a ride?" and "Joining for dinner before?" Free-form questionnaire fields will tempt organizers to ask 5 questions and murder their conversion rate.

**FRISBY:** The crew size limit needs more thought. For Disclosure Day, it's 20 seats at Regal Secaucus. That's a hard physical constraint. But the limit creates interesting dynamics. "18 of 20 seats filled" is urgency. "20 of 20 seats filled. You're on the waitlist." is FOMO. The waitlist isn't just overflow management. It's proof that the event is desirable. Showing "3 people on the waitlist" to someone who's still deciding is the strongest conversion signal in social events.

**SHADEED:** The approval flow for organizer-gated events. I verified the current RSVP submits directly to Supabase with no approval gate. For family events, that's fine. For platform events where strangers can find your movie night, the organizer needs to approve RSVPs. The flow: RSVP submits, status is "pending," organizer gets a notification, approves or declines. The attendee sees "Waiting for [organizer] to confirm." This requires a status field on the RSVP record and conditional rendering on the crew list (pending members shown differently or hidden until approved).

**KIM:** The RSVP change flow. Someone RSVPs "Going" and then needs to cancel. Right now there's no mechanism for this. The person would have to text Jordan. The product should handle it: "Changed your mind?" link in the confirmation, or a simple "I can't make it anymore" toggle on the event page that recognizes returning visitors. When someone cancels, the waitlist person gets bumped up automatically. Jordan never touches it.

**NEW FEATURES (Category 2):**
6. Late-RSVP urgency mode
7. Plus-one naming with 48-hour grace period
8. Crew member one-line status/reaction
9. Explicit RSVP deadline display
10. Questionnaire cap at 2 with presets
11. Visible waitlist count as social proof
12. Organizer approval gate for platform events
13. Self-service RSVP change with auto waitlist promotion

---

## CATEGORY 3: PAYMENT & TICKETS

**KIM:** This is the category where PlanMovies either becomes essential or stays a nice landing page. The "one person fronts $300 and chases Venmo" problem is the number one pain point of group movie nights. The solve isn't complicated but it needs to be seamless. Jordan buys 20 tickets for $360. PlanMovies collects $18 per person from 20 people. The money goes to Jordan's connected Stripe account. PlanMovies takes $2.50 per ticket. Nobody chases anyone because the page shows who's paid and who hasn't, and the product sends the reminders.

The current Stripe Payment Link is correct for the first event. Post-June 12, the flow should be: RSVP triggers a payment request. The payment link is personalized per attendee. The crew page shows a checkmark next to paid members (organizer view only, per the dead direction about hiding payment status from family). Unpaid members get automated nudges on a cadence the organizer sets.

**MURTHY:** Payment milestones are underrated. "10 of 15 people paid. Jordan is buying tickets tonight." That message in the group chat, auto-generated by PlanMovies, creates urgency without Jordan being the bad guy. The product is the one saying "pay up." Jordan is just the messenger sharing the link. That emotional distance matters. Nobody wants to be the friend who chases money.

**FRISBY:** Should PlanMovies sell tickets directly? No. Not in v1, probably not in v2. The liability, the theater relationships, the refund complexity. Atom Tickets spent $200M and is dead. Fandango and the theater chains own this layer. PlanMovies should be the coordination layer that sits on top. "Jordan bought 20 tickets on Fandango. Here's your ticket." The value is the coordination, not the transaction.

But there's a middle path worth considering: PlanMovies could partner with Fandango's affiliate program. When Jordan clicks "Buy Tickets" from the organizer dashboard, it opens Fandango with the right movie, theater, showtime, and seat count pre-selected. PlanMovies earns an affiliate commission. The organizer still buys on Fandango. The seats are real Fandango tickets. But PlanMovies smoothed the path and earned revenue for it.

**JOHNSON:** The QR ticket delivery needs to account for theater lobby conditions. No wifi, slow cell service, screen brightness on low. The QR code should be downloadable as an image file, not just rendered in-browser. Add it to Apple Wallet and Google Wallet. And the QR code itself should be large enough to scan from a reasonable distance. At least 200x200px. I've seen older users hold their phone up to a scanner with a tiny QR code and fail three times before someone helps them.

**SHADEED:** The concession pre-order is ambitious. I verified that Regal's own app has in-seat delivery for concessions. Building a competing concession ordering system is a multi-year project with POS integration. But a simpler version works: a group concession poll. "What does everyone want? I'll order at the counter." The organizer collects preferences (popcorn, drink sizes, candy) and gets a summary. "7 large popcorns, 4 large Cokes, 3 waters." They order once instead of 20 people standing in line. That's coordination, not commerce.

**KIM:** The "organizer covers" mode is a premium feature. For corporate movie nights, team outings, birthday celebrations. The organizer pays for all tickets, the attendees just RSVP. No payment flow for the crew. The organizer sees one total charge. This is also where group discounts come in. If you're buying 20 tickets, some theaters offer group rates. PlanMovies should surface this: "Regal Secaucus offers group pricing for 15+ tickets. Call (201) 555-0100 to book." Even if we can't automate the discount, knowing it exists and having the phone number saves the organizer 20 minutes of research.

**MURTHY:** Refund flow matters more than people think. Someone cancels after paying. Do they get the money back? The organizer's policy should be stated upfront: "Full refund until June 10. No refunds after." And the system should handle it automatically. The attendee cancels, the refund processes through Stripe, the seat opens for the waitlist. No awkward "hey can I get my money back" texts.

**NEW FEATURES (Category 3):**
14. Payment milestone group chat messages
15. Fandango affiliate integration
16. Apple Wallet / Google Wallet ticket pass
17. Group concession poll
18. Group discount surfacing
19. Organizer-stated refund policy
20. Automated refund-on-cancel

---

## CATEGORY 4: THE MOVIE TAB / CONTENT WORLD

**MURTHY:** This is PlanMovies' moat. No other coordination platform builds a content world around the event itself. Partiful gives you a wallpaper and a description field. PlanMovies gives you an immersive deep-dive that makes the movie feel important before you've even decided to go. For Disclosure Day, it's the credibility cascade: quotes from presidents, headlines from the NYT, declassified government files. For a Marvel movie, it's different. The content world adapts to the genre.

Here's the scaling model. Three tiers:

**Tier 1: Auto-generated.** TMDB provides poster, synopsis, cast, ratings, trailer links, similar movies. Every event gets this for free. The organizer does nothing.

**Tier 2: Template-enhanced.** Genre-specific templates add structure. A horror movie night gets a "Scare Factor" rating, a "Watch this first" section (prequels/related films), and a "Don't read this until after" spoiler section. A franchise movie gets a timeline and a "Previously on..." recap. An indie film gets festival accolades and director's previous work. The organizer picks the template; the system fills it from TMDB + curated data.

**Tier 3: Organizer-curated.** What Jordan built for Disclosure Day. Custom quotes, research, hand-picked articles. This is the premium tier. Some organizers will care enough to build it. Most won't. The platform should make Tier 1 and Tier 2 good enough that Tier 3 is a choice, not a requirement.

**FRISBY:** The "What to Know Before You Go" primer is genuinely useful. For Disclosure Day, it's UAP context. For a Marvel movie, it's "which post-credits scenes from previous films set this up." For a Wes Anderson film, it's "what to expect if you've never seen a Wes Anderson movie." The primer should have two modes: "I know nothing about this" and "I'm already a fan, give me deep cuts." Let the reader self-select. The same crew has both types.

Shareable fact cards. The format should be Instagram Stories dimensions (1080x1920) with the PlanMovies brand mark in the corner. A single fact, a still from the movie, and a "See it with us: planmovies.com/disclosure-day" CTA at the bottom. These are marketing assets that the crew creates for free by sharing them. The movie's marketing budget becomes PlanMovies' growth engine.

**KIM:** The content world solves a specific organizer problem: "Why should I care about this movie?" When Jordan shares the PlanMovies link instead of just saying "Disclosure Day June 12 who's in?" in the group chat, the content world does the selling. The organizer doesn't have to explain why this movie is worth organizing around. The page does it. That's coordinator burden reduction at the persuasion layer.

**JOHNSON:** For age-range accessibility, the content world needs adjustable density. A 16-year-old wants the deep rabbit hole. A 65-year-old wants the 3-sentence summary and the trailer. The primer should lead with the short version and let people expand for more. Not tabs. Not separate pages. Progressive disclosure within one scroll. Show the headline, show the trailer, then "Want to go deeper?" opens the rest.

**SHADEED:** I need to flag that the current movie tab on index.html is heavily hardcoded for Disclosure Day. The data arrays (OFFICIAL_QUOTES, RECOMMENDED, etc.) are specific to UAP content. For this to scale to any movie, the content rendering functions need to consume a generic schema: { quotes: [], headlines: [], media: [], facts: [], sections: [] }. The render functions already exist and are decent. The schema just needs to be abstracted from the Disclosure Day specifics. Not a rebuild. A refactor.

**MURTHY:** One more. Community-contributed content. After the movie night, the crew adds their own takes. "Marco's hot take: the ending makes no sense." "Lisa says: best movie of the year." These crew reviews become part of the content world for the NEXT person who visits the page. Social proof that's authentic and personal. Not professional reviews. Real reactions from real people who went together.

**NEW FEATURES (Category 4):**
21. Three-tier content system (auto / template / curated)
22. Genre-specific templates
23. Dual-mode primer (novice vs. fan)
24. Shareable fact cards (1080x1920)
25. Generic content schema
26. Post-event crew reviews on event page
27. Progressive disclosure for content density

---

## CATEGORY 5: ANTICIPATION PHASE

**MURTHY:** This category is where PlanMovies has the chance to own something nobody else owns. The gap between RSVP and showtime. Partiful has an activity feed but it dies after the first 48 hours. Movie theaters have nothing. The group chat fills with noise. PlanMovies should own the hype.

The advent calendar model. Not literally an advent calendar with doors, but the concept: the page evolves as the date approaches. Content unlocks. The energy builds. Here's a concrete sequence for a 14-day window:

- **Day 14 (RSVP opens):** Poster, trailer, crew list starts filling
- **Day 10:** Behind-the-scenes content unlocks. "New: Watch Spielberg talk about why he made this film."
- **Day 7:** Crew milestone. "10 people are going. This is happening." + organizer can post a custom update
- **Day 5:** Logistics crystallize. "Jordan is buying tickets tomorrow. Last call for RSVPs."
- **Day 3:** Countdown activates. Seat assignments visible. "You're sitting next to Marco."
- **Day 1:** Tonight mode. The page becomes a logistics hub. Directions, parking, showtime, "I'm here" check-in.
- **Day 0 (after):** Transition to memory mode. Photos, reactions, "Plan the next one."

Each unlock triggers a notification. "New content just dropped on Disclosure Day." That's a reason to re-open the page. Without reasons to re-open, the page is a one-visit experience.

**KIM:** The activity feed is the connective tissue. Every meaningful event creates a feed item:
- "Sarai RSVPed" (social proof)
- "Jordan posted an update: Tickets are bought!" (organizer signal)
- "Marco added a +1: Jessica" (crew growth)
- "10 of 15 spots filled" (milestone)
- "New trailer unlocked" (content)
- "Seats assigned. Check where you're sitting." (logistics)

The feed should be reverse-chronological. Recent on top. And each item should be shareable. "Share this update to the group chat" with a pre-formatted WhatsApp message. Because the activity feed is internal to PlanMovies, but the group chat is where the crew actually lives.

**FRISBY:** The auto-poster with crew names is a powerful concept that needs more definition. When 10 people RSVP, PlanMovies generates a custom graphic: the movie poster with all 10 names overlaid, formatted like movie credits. "A Jordan Production. Starring Sarai, Marco, Lisa, Carmen, Sofia, Ray..." This is the thing that gets posted to Instagram. It's personal. It's beautiful. And it has the event URL in the corner for anyone who sees it and wants to join.

The milestone markers matter. Round numbers are psychologically significant. 5, 10, 15, 20 crew members. Each milestone should trigger a visual change on the page and a notification. At 5: "The crew is forming." At 10: "This is happening." At 15: "Opening night is going to be packed." At capacity: "Sold out. [N] on waitlist."

**JOHNSON:** "Tonight" mode needs to be accessibility-first. Theater lobbies are dark. Phones are at low brightness. The page should auto-switch to a high-contrast mode on event day. Large text. Essential info only: showtime, theater address (tappable for Maps), seat assignment, "I'm here" button. No visual clutter. No content world. No activity feed. Just logistics. A 65-year-old in a dark lobby should be able to glance at their phone and know where to go.

**SHADEED:** The seat map preview. I checked the current implementation. There's no seat map rendered yet. For it to work, the organizer needs to input the seating layout (row, seats per row) and then assign people. A visual seat picker is a substantial UI component. For v1, a simpler version: a text list. "Row F: Jordan, Sarai, Marco, Lisa. Row G: Carmen, Sofia, Ray, Jessica." No visual map. Just names and rows. The visual seat picker is a v2 feature after the list version proves that people care about seat assignments.

**KIM:** Post-event transition is critical and nobody in this space does it well. The page should never die. It should evolve. On event day + 1, the page becomes a memory: crew photo at the top, individual reactions ("Rate the movie"), a discussion prompt ("What did you think of the ending?"), and the "Plan the next one" CTA. The content world stays accessible. The crew list becomes a "who was there" roster. The page is now a record. In six months, someone can go back to planmovies.com/disclosure-day and see the whole experience: who went, what they thought, what they said.

**NEW FEATURES (Category 5):**
28. Progressive content unlock calendar
29. Activity feed with shareable items
30. Milestone auto-poster (movie credits style with crew names)
31. Milestone markers at 5/10/15/20/capacity
32. Tonight mode (high-contrast, logistics-only)
33. Text-based seat assignment list (v1)
34. Post-event memory mode
35. "I'm here" check-in

---

## CATEGORY 6: ORGANIZER TOOLS

**KIM:** The organizer's dream dashboard is one screen with three zones:

**Zone 1: Crew status.** A list of every invitee with their status: RSVPed / Not yet / Paid / Unpaid / Seated / Unseated. Traffic-light coloring. Green = fully ready (RSVPed + paid + seated). Yellow = partially done. Red = hasn't responded. The organizer scans this in 3 seconds and knows who to nudge.

**Zone 2: Actions.** "Send reminder to 4 unpaid people." "Assign remaining seats." "Post an update." "Buy tickets (opens Fandango)." Maximum 4 action buttons at any time. The dashboard should surface what needs doing NOW, not show 20 tools the organizer might need someday.

**Zone 3: Timeline.** A visual timeline of the event lifecycle: "RSVPs open -> Payment deadline -> Tickets purchased -> Seats assigned -> Event day." With a marker showing where you are right now. This gives the organizer confidence that they're on track without showing them raw metrics.

**MURTHY:** The Three-Beat Cadence Engine needs to be concrete. Here's what it looks like in practice for a 17-day event:

**Beat 1: The Swell (Days 1-5).** Social proof compounds. The system sends: "3 new people RSVPed today" to the organizer. The organizer shares it (or PlanMovies auto-generates a group chat message). Each RSVP triggers a notification to the crew: "Sarai just joined. 7 spots left." The energy is about growth.

**Beat 2: The Lock (Days 6-12).** Logistics earn their place. Payment reminders go out, framed as social: "12 of 15 people paid. You're one of the last 3." Seat assignments happen. The organizer posts: "Seats assigned! Check where you're sitting." The energy shifts from "are you coming?" to "this is happening, get ready."

**Beat 3: The Arrival (Days 13-17).** Anticipation peaks. The countdown activates. Daily trivia or fun facts about the movie. "Tonight" mode auto-activates on day 17. The organizer sends a final message: "See you tonight. Row F. 7 PM."

Each beat auto-generates suggested messages. The organizer can edit and send or let them auto-fire. The cadence is adjustable: the organizer can silence it, accelerate it, or override individual messages.

**FRISBY:** Co-hosts solve a real problem. For Jordan's family event, he does everything. But for a platform event, responsibilities split naturally. One person handles logistics (theater, showtime, seats). Another handles the social side (reminders, hype, content). Co-host roles should be explicit: "Logistics Lead" and "Hype Lead." Or custom. Each co-host gets dashboard access to their zone only.

**JOHNSON:** The organizer who isn't Jordan needs something Jordan doesn't: templates for everything. The first-time organizer stares at a blank dashboard and doesn't know what to do next. Guided setup: "Step 1: Pick a movie. Step 2: Choose a date. Step 3: Share the link." Then guided coordination: "It's been 3 days. 5 people RSVPed. Here's a suggested reminder to send." The system holds their hand through the first event. By the second event, they know the rhythm.

**SHADEED:** The analytics a platform operator needs are different from what an organizer needs. The organizer needs: how many RSVPed, how many paid, conversion rate from link share to RSVP. The platform needs: events per week, average crew size, payment completion rate, retention (organizers who create a second event), geography distribution, most popular movies. Two dashboards. The organizer dashboard is in the product. The platform dashboard is internal only.

**KIM:** The export feature. The organizer needs to export the crew list as a CSV: name, phone, email, payment status, seat assignment. For the organizer who's buying tickets on Fandango, they need the list of names for the order. For the organizer who's filing an expense report, they need a receipt summary. Simple, flat file. No fancy formatting.

**NEW FEATURES (Category 6):**
36. Three-zone dashboard
37. Three-Beat Cadence Engine with auto-messages
38. Co-host roles with scoped access
39. First-time organizer guided wizard
40. Guided coordination prompts
41. Platform analytics (internal)
42. CSV export

---

## CATEGORY 7: COMMUNICATION

**MURTHY:** Communication lives in the group chat. Not in PlanMovies. PlanMovies generates the messages; the organizer sends them through their existing channels. WhatsApp, iMessage, family group text. Trying to build a messaging system inside PlanMovies is trying to replace WhatsApp. That's a losing battle.

What PlanMovies SHOULD do: be the best message-generation tool for group event coordination. Every milestone, every status change, every deadline generates a ready-to-share message with a link back to the event page. "10 of 15 spots filled for Disclosure Day. RSVP: planmovies.com/disclosure-day." One tap to copy. One tap to share to WhatsApp. The organizer's job is reduced to pressing "share."

Partiful's Text Blasts work because the host can reach everyone who RSVPed with one message. PlanMovies' equivalent: "Send update to crew." The organizer writes one message. It sends via the channel the attendee used to RSVP (if phone auth -> SMS, if email -> email). But I'd start simpler: the organizer writes the message, PlanMovies formats it as a shareable card with the event link, and the organizer pastes it into their group chat. No SMS infrastructure. No notification permission anxiety. Just a perfectly formatted message ready to share.

**KIM:** Day-of communication. "I'm here." "Running 10 minutes late." "Where are you?" This is WhatsApp territory. PlanMovies should not try to own real-time chat on event day. But one thing PlanMovies CAN do: the "I'm here" check-in. A button on the tonight-mode page that pings the crew: "Jordan is at the theater." This is a lightweight signal, not a chat. It tells everyone the event is real and someone's already there. That's useful. A chat system is not.

**JOHNSON:** Push notifications require permission and most people decline. SMS costs money and feels intrusive for a movie night app. The smartest channel is the one the organizer already uses with their crew. For Jordan, that's a family WhatsApp group. For a college friend group, it's iMessage. PlanMovies generates the content; the organizer picks the delivery channel. No infrastructure investment. No permission prompts. No "turn on notifications" nag screens.

**FRISBY:** One underrated communication feature: the post-RSVP confirmation message. When someone RSVPs, the confirmation screen should have a "Share with a friend" button that generates a personalized invite: "I'm going to Disclosure Day. You should come. [link]." Every RSVP becomes a distribution point. The confirmation screen is the highest-engagement moment in the entire flow. Use it.

**SHADEED:** I verified the current Telegram alert setup in the Cloudflare Worker. It monitors Fandango for ticket availability and sends alerts to a Telegram channel. For the organizer, Telegram is fine. For the crew, it's another app to install. The organizer-facing alerts should stay in Telegram or whatever the organizer prefers. Crew-facing communication should never require a new app install. The web page + WhatsApp/iMessage is the stack.

**NEW FEATURES (Category 7):**
43. Milestone message generator
44. "Send update to crew" with formatted card
45. "I'm here" check-in button
46. Post-RSVP "Share with a friend" viral loop
47. Channel-agnostic message generation

---

## CATEGORY 8: POST-EVENT

**MURTHY:** The photo album is the hook that brings people back. But the cold-start problem is real. Nobody wants to be the first person to upload. The solve: the organizer starts it. Jordan uploads 2-3 photos from the night. That breaks the ice. Then the page sends a nudge: "Jordan added photos from Disclosure Day. Add yours?" with a direct upload link. Partiful uses this exact pattern and photo participation jumps 3x when the host uploads first.

The upload flow should be dead simple. Tap the link, select photos from camera roll, done. No crop tool. No filters. No captions required. The friction of "what do I say about this photo?" kills participation. Just the images. People can add comments later.

**KIM:** Crew ratings are more interesting than individual movie ratings. The question isn't "how good was the movie?" It's "how was the night?" A single prompt: "How was movie night? Amazing / Good / Meh." Three options. No stars. No scale. The aggregate becomes the event's score. "14 out of 15 people said Amazing." That's the social proof for the next event. "This organizer's events are always rated Amazing."

Individual movie ratings can coexist but they're secondary. "Would you see it again? Yes / No." Binary. Clean. And useful for the crew recommendation engine: "Your crew liked Disclosure Day (93% would see again). Based on that: Obsession."

**JOHNSON:** "Plan the next one" needs to be specific, not generic. "Same crew, new movie" is one button. "New crew, same movie" is another (for someone who wants to organize their own group). "Browse upcoming movies" is a third. Give the user a clear path, not just a vague CTA that leads to a blank creation form.

**FRISBY:** The post-event shareable. What would someone actually post? A designed collage card: the movie poster on one side, a grid of crew photos on the other, the date, the theater, and the crew's aggregate rating. "Disclosure Day, Opening Night. 15 crew. Rated Amazing." Instagram-story dimensions. Download as image. Share to Instagram, TikTok, WhatsApp status. This is organic marketing. Every crew photo card is an ad for PlanMovies.

**MURTHY:** The discussion thread should be time-limited. Open for 7 days after the event. After that, it freezes. Nobody goes back to a discussion thread 3 months later. But the frozen thread stays visible as part of the event's memory. "Here's what people said." The time limit also creates urgency: "Share your thoughts before the thread closes."

Event pages should persist forever. The URL should always work. In 5 years, someone goes to planmovies.com/disclosure-day-2026 and sees the poster, the crew, the photos, the ratings. It's a time capsule. Archives don't cost storage worth worrying about.

**SHADEED:** The "Movie Night Recap" email. The next morning, every crew member gets a message: "Last night was rated Amazing by 14 people. See photos. Share your take. Plan the next one." With a direct link back to the event page in post-event mode. This is the re-engagement loop. The email is the nudge that triggers photo uploads, ratings, and the "plan the next one" conversion.

**NEW FEATURES (Category 8):**
48. Organizer-first photo upload
49. Simple photo upload flow (no crop, no captions required)
50. Crew night rating (Amazing / Good / Meh)
51. "Would you see it again?" binary movie rating
52. Specific "Plan the next one" paths
53. Post-event shareable card
54. Time-limited discussion thread (7 days)
55. Next-morning recap notification
56. Permanent event page archives

---

## CATEGORY 9: DISCOVERY & EXPLORE

**MURTHY:** This is where PlanMovies becomes a network, not a tool. The killer insight: movie nights are social objects. "3 groups are going to Disclosure Day opening night in NJ" is information that doesn't exist anywhere else. Fandango knows showtimes. Letterboxd knows movie taste. PlanMovies knows that real groups of real people are organizing around specific movies at specific theaters. That's the discovery primitive.

The explore page should answer: "What are people going to see this weekend?" Not a listing of movies. A listing of movie nights. "Opening Night: Disclosure Day. 4 groups forming in your area. 47 people going." The movies are the magnets. The groups are the product.

**FRISBY:** "Weekend Forecast" is the explore feature. Every Thursday, PlanMovies surfaces what's happening this weekend. Opening night groups forming. Rewatches organized. Marathons planned. The forecast is personalized: movies your friends are going to, movies in genres you like, events near your location. This is the email that brings people back to PlanMovies between their own events. "This weekend: 3 friends going to Obsession. Join them?"

**KIM:** Can you join a stranger's group? This is the hardest question in discovery. The answer has to be yes, or PlanMovies can't grow beyond existing friend groups. But it requires trust infrastructure. Organizer profiles with ratings. Event descriptions that set expectations. An approval gate so the organizer vets who joins. And a "public" vs. "private" toggle. Private events (family movie night) don't appear in discovery. Public events (movie club, opening night group) do.

The model: Meetup for movie nights. Anyone can browse. Anyone can request to join. The organizer approves. The trust signals are: organizer rating, crew size, event history, and mutual connections ("2 of your friends are going").

**JOHNSON:** Discovery needs to respect the casual user who doesn't want to commit. "Interested" / "Save for later" is the low-commitment action. Not an RSVP. Not even a Maybe. Just a bookmark. "You saved Disclosure Day. RSVPs close in 3 days." That's the follow-up nudge that converts interest to attendance. The activation energy of "interested" is much lower than "RSVP," and it feeds the discovery algorithm: "200 people interested in Disclosure Day opening night in NJ."

**SHADEED:** The explore page needs to work without a logged-in account. Location-based discovery from the first visit. "Movie nights near Secaucus, NJ" with no login required. The login prompt comes when someone tries to RSVP, not when they try to browse. Every friction point before the value moment kills discovery.

**MURTHY:** "Crew Picks" voting for the next movie. After an event, the same crew votes on what to see next. The organizer presents 3 options. The crew votes. Majority wins. The new event auto-creates with the winning movie. This closes the loop: attend -> rate -> vote -> attend again. The crew becomes a recurring unit, not a one-time group.

Movie recommendations based on crew taste. "Your crew rated Disclosure Day Amazing and Obsession Great. You might like: The Last Drive-In." Not based on individual taste profiles. Based on what THIS group collectively enjoys. The social graph IS the recommendation engine.

**NEW FEATURES (Category 9):**
57. Weekend Forecast email
58. Public event discovery with approval gate
59. "Interested" / "Save" action
60. No-login browse
61. Crew Picks voting
62. Crew-based recommendations
63. Movie night listings as discovery unit

---

## CATEGORY 10: PROFILES & SOCIAL GRAPH

**MURTHY:** The profile on PlanMovies is not a social media profile. It's a coordination identity. What it needs: your name, your photo, your movie history (events attended), your crew connections (who you go to movies with), and your preferences (genres, theaters). That's it. No bio. No followers. No feed. The profile exists so other people can recognize you on the crew list and so the system can recommend movies you'd like.

Mutuals matter when they're actionable. "You and Marco have been to 5 movies together" is nice but decorative. "You and Marco have been to 5 movies together. Marco is going to Obsession. Join him?" is a conversion mechanism. The mutual connection becomes a reason to attend.

**FRISBY:** Organizer reputation is essential for platform trust. First-time organizer: no badge, just their name and photo. After 3 events: "Trusted Organizer" badge. After 10 events: "Experienced Host" with stats (events hosted, average crew size, average rating). This is how a stranger decides whether to join a public movie night organized by someone they don't know. The reputation system is the trust proxy that replaces "my cousin Jordan is organizing this."

**KIM:** Contact sync is necessary for growth but should be optional and clearly explained. "Find friends on PlanMovies" with a one-sentence explanation of what happens to your contacts (we check for matches, we don't store your address book, we don't spam anyone). The incentive: "3 people you know are already on PlanMovies." Seeing familiar names drops the barrier to joining a stranger's event.

**JOHNSON:** Badges and achievements. I'll go against the grain: they're not cringe if they're rare and meaningful. "First to RSVP" every single time is noise. But "Founding Crew: Disclosure Day" for the 15 people who attended the very first PlanMovies event? That's a genuine badge of honor. "5 Movie Nights" shows commitment. "Perfect Attendance" (never cancelled) shows reliability. Cap it at 5 badges max per profile. Quality over quantity. No badge inflation.

**SHADEED:** The profile page needs to be responsive and lightweight. No full-page profile loads. The profile is a card that appears in-context: on the crew list (tap a name -> profile card), on the discovery page (tap an organizer -> profile card), in search results. The card loads the data it needs and nothing more. Avatar, name, movie count, mutual connections, last event attended. Under 10KB.

**MURTHY:** Favorite genres are useful for recommendations but shouldn't be self-reported. Derive them from attendance. If you've attended 4 horror movie nights and 1 comedy, your profile shows a horror affinity. Self-reported preferences are aspirational ("I love arthouse film"). Behavioral data is real ("Marco goes to superhero movies").

**NEW FEATURES (Category 10):**
64. Coordination identity (not social profile)
65. Actionable mutuals
66. Tiered organizer reputation
67. Optional contact sync
68. Rare, meaningful badges (capped at 5)
69. Lightweight profile card (<10KB)
70. Behavior-derived genre affinity

---

## CATEGORY 11: EVENT CREATION

**KIM:** Three taps to create an event. Search movie. Pick date. Share link. Everything else is optional. The TMDB search handles the movie poster, synopsis, cast, trailer. The date picker is a calendar with suggested showtimes (if we have theater data). The share link generates instantly. The organizer can enhance the event later (add content, set a price, assign seats), but the creation is instant. The enemy of event creation is a 10-field form that makes the organizer feel like they're filing a permit.

**FRISBY:** TMDB auto-fill should pull reviews (aggregated score + top critics), cast with photos, similar movies, and the official trailer. All of this populates the content world (Category 4, Tier 1) without the organizer lifting a finger. The organizer's only required input is: which movie, what date, what theater. Everything else exists to make the event page look finished on creation.

**MURTHY:** Date polling is critical for friend groups where the organizer isn't a dictator. "When works for everyone? Friday, Saturday, or Sunday." Three date options. The crew votes. The organizer sees results in real-time and picks the winner. This is Doodle for movie nights. Simple, proven, and it removes the back-and-forth from the group chat.

But for opening nights, there's no poll. The date is the date. The creation flow should detect this: if the movie hasn't released yet and the organizer picks opening day, skip the date poll step. "Opening Night" is a special mode.

**JOHNSON:** Theater selection needs two modes. Mode 1: the organizer knows the theater. They type "Regal Secaucus" and it auto-completes. Mode 2: the organizer wants to find a theater. "Theaters showing Disclosure Day near Secaucus, NJ" with a list of options showing distance, showtime availability, and ticket prices. Mode 2 requires theater data. If PlanMovies can't get real showtimes from Fandango/AMC/Regal, fall back to Mode 1 only. Don't show bad data.

**SHADEED:** Templates help if they're invisible. The organizer picks "Opening Night" and the page auto-configures: countdown widget on, seat assignment on, urgency messaging on. They pick "Casual Rewatch" and the page is relaxed: no countdown, no seat assignment, no payment required. The template isn't a visual theme. It's a configuration preset. The organizer doesn't know they're using a template. They're just picking the event type.

**KIM:** The dress code feature is fun and costless. A single text field: "Dress code: Dress like an alien." It appears on the event page under the logistics section. It's not a feature in the traditional sense. It's a personality slot. It makes the organizer's page feel personal and gives the crew something to laugh about and coordinate around.

**FRISBY:** Clone event is the growth loop. After Disclosure Day, Jordan creates Obsession movie night by cloning the Disclosure Day event. Same crew, new movie. The content world auto-fills from TMDB. The crew list carries over (with fresh RSVP status). The organizer adjusts the date, theater, and price. Five taps. Second event created. The clone is what turns a one-time organizer into a repeat organizer. Make it effortless.

**NEW FEATURES (Category 11):**
71. Three-tap creation
72. TMDB auto-fill (reviews, cast, similar, trailer)
73. Date polling
74. Opening Night auto-detection
75. Two-mode theater selection
76. Event type presets (invisible templates)
77. Dress code personality slot
78. Clone event with crew carry-over

---

## CATEGORY 12: PLATFORM INFRASTRUCTURE

**SHADEED:** The single HTML file is currently 3,207 lines. At 100 events, this model doesn't work. Each event can't have its own 3,000-line HTML file. The migration path: the single file becomes the template. A build step (or server-side render on a Cloudflare Worker) injects event-specific data into the template. The template is still one file. The data comes from Supabase. The first event (Disclosure Day) continues to work as a static file. Future events are rendered dynamically. The migration can be gradual: keep Disclosure Day as-is, build the dynamic renderer for event #2.

**FRISBY:** PWA is important for one reason: the home screen icon. When someone adds PlanMovies to their home screen, it looks like a native app. It loads instantly. It has a custom icon (the clearance seal). For the "tonight mode" use case (checking your seat in the theater lobby), having PlanMovies on the home screen beats opening Safari and navigating to the URL. The PWA manifest is trivial to implement and the payoff is disproportionate.

**KIM:** Offline support matters in one scenario: the theater lobby. Bad cell service. The person needs their ticket QR code and seat assignment. These two pieces of data should be cached locally via service worker. Not the whole page. Not the content world. Just the ticket and the seat. Everything else can fail gracefully with a "Connect to see updates" message.

**JOHNSON:** Notifications. Web push is unreliable (Safari only recently added support, Chrome requires permission, most people decline). SMS costs money. The answer: lean into what works. WhatsApp messages shared by the organizer. Email for the next-morning recap and major milestones. Push notifications as an opt-in bonus, not the primary channel. Don't build a notification infrastructure that requires user permission to function.

**SHADEED:** Rate limiting on the Supabase API. Right now the anon key is hardcoded in index.html and RLS policies are the security layer. For 25 family members, this is fine. For 1,000 public events, it's an abuse vector. Someone could script RSVP submissions, flood the database, or scrape email addresses. Before platform launch: implement rate limiting on the Cloudflare Worker that proxies Supabase requests, move the anon key behind the Worker, and add CAPTCHA on RSVP submission for non-authenticated users.

**KIM:** Multi-tenant architecture. The Supabase schema already has organizers and events tables. The missing piece is isolation: ensuring one organizer can't see another organizer's crew data. RLS policies need to be tested with multiple organizers before platform launch. And the event URL scheme needs to be clean: planmovies.com/[event-slug] resolved via Cloudflare Worker or Pages redirect rules.

**FRISBY:** Analytics. The organizer needs a simple dashboard. But the platform needs: funnel analytics (link click -> page view -> RSVP -> payment -> attendance), cohort analysis (do organizers who use the content world get higher RSVP rates?), and geography heatmaps (where are movie nights happening?). Plausible or PostHog for privacy-respecting analytics. Not Google Analytics. The privacy story matters for trust.

**NEW FEATURES (Category 12):**
79. Dynamic event rendering via Worker
80. PWA with home screen install
81. Service worker for offline ticket/seat
82. Rate limiting via Worker proxy
83. CAPTCHA on RSVP for non-authed users
84. RLS audit for multi-tenant
85. Clean event URLs
86. Privacy-respecting analytics

---

## BONUS: NEW IDEAS

**KIM:** Movie Night Kit. Dinner before, parking, post-movie bar suggestions. The event page becomes the full-night itinerary.

**MURTHY:** Streaming fallback. "Can't make it? Watch at home with the virtual crew." Theater crew + home crew merge post-event.

**FRISBY:** Budget calculator. Per-person cost breakdown: tickets + concessions + dinner. Shareable.

**JOHNSON:** Accessibility features. Wheelchair seating, hearing assist, sensory-friendly showtimes, closed captions.

**SHADEED:** Loyalty program nudge. "Are you an AMC Stubs member?" at ticket-buying moment. Nudge, not integration.

**MURTHY:** Named Crew as social object. "The Perez Family Movie Club: 7 movies, 93% Amazing." Recurring unit, own page.

**KIM:** Morning-after recap message. The single most important re-engagement message. Catches the warm glow.

---

## SYNTHESIS

### Features Killed or Merged

| Feature | Verdict | Reason |
|---|---|---|
| In-app crew chat | KILLED | WhatsApp owns real-time chat. PlanMovies generates messages, doesn't host them. |
| Concession pre-order (commerce) | KILLED, replaced | POS integration is years. Replaced with Group Concession Poll. |
| @mentions | KILLED | Only relevant in a chat system we're not building. |
| Comment reactions | MERGED | Into crew status and post-event discussion. |
| Push notifications as primary | DEMOTED | Opt-in bonus. Primary is organizer-shared messages. |
| Loyalty program integration | KILLED, replaced | No APIs. Replaced with contextual nudge. |
| Self-reported genre preferences | KILLED | Replaced with behavior-derived affinity. |
| Visual seat map (v1) | DEFERRED | Text list v1. Visual picker v2. |
| Full analytics for organizer | SCOPED | Organizer gets crew status. Full analytics are platform-internal. |

### The "PlanMovies Magic" List: 15 Features

1. **One-link coordination** -- Organizer sends one link. Everything happens on that page.
2. **The Content World** -- Three-tier immersive movie deep-dive.
3. **Social proof crew list** -- Names and faces convert the next RSVP.
4. **Payment collection** -- Stripe replaces Venmo-chasing.
5. **Three-Beat Cadence Engine** -- The page evolves: swell -> lock -> arrival.
6. **Dynamic OG image** -- iMessage preview with going count.
7. **Tonight Mode** -- Event day: logistics-only, high-contrast, "I'm here."
8. **Post-event memory mode** -- Photos, ratings, discussion, archive.
9. **Post-RSVP viral loop** -- Every confirmation recruits the next RSVP.
10. **Milestone auto-poster** -- Crew names in movie credits format.
11. **Clone event** -- One tap to create next movie night, same crew.
12. **Movie Night Kit** -- Full night: dinner, parking, post-movie bar.
13. **Crew Picks voting** -- Crew votes on next movie, event auto-creates.
14. **Morning-after recap** -- Re-engagement at peak warmth.
15. **Named Crew** -- "The Perez Family Movie Club" as persistent social object.

### Feature Interaction Map

```
SOCIAL PROOF CHAIN:
Crew list -> Going count on landing -> Dynamic OG -> iMessage preview -> New RSVP -> Crew list

VIRAL LOOP:
RSVP -> Confirmation -> "Share with friend" -> OG preview -> New RSVP
  |
  v
Milestone poster -> Instagram share -> Non-crew sees it -> Event page -> RSVP

ENGAGEMENT FLYWHEEL:
Content unlock -> Notification -> Re-open page -> Activity feed -> Share to group chat
                                                        ^
                                  Cadence Engine -------+

RETENTION LOOP:
Attend -> Recap -> Photos -> Rate -> Crew Picks vote -> New event (clone) -> Same crew RSVPs
                                                              ^
                              Named Crew page ----------------+

TRUST CHAIN (platform):
Organizer reputation -> Event quality (content world) -> Mutuals -> Approval gate -> RSVP
        ^                                                                              |
        +---- Post-event ratings <-- Crew night rating <-- Attend <--------------------+

COORDINATOR BURDEN REDUCTION:
3-tap creation -> TMDB auto-fill -> Content auto-gen -> Cadence auto-nudge -> Payment auto-collect -> Recap auto-sent

MONETIZATION:
Stripe Connect ($2.50/ticket) <- Payment collection <- RSVP conversion <- Social proof <- Dynamic OG
Fandango affiliate <- Ticket purchase link <- Organizer dashboard
```

The core loop: social proof drives RSVPs. RSVPs drive payment. Payment drives ticket purchase. Event happens. Recap drives the next event. Clone makes it effortless. Crew becomes permanent. PlanMovies earns $2.50 per ticket every turn of the wheel.

---

**Total new features proposed: 93**
**Features killed/merged: 9**
**Magic features identified: 15**
