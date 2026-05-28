#!/usr/bin/env node
// merge-page.js — Merge The Movie tab into The Crew as a single-scroll three-act page
// Run: node scripts/merge-page.js

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// ============================
// 1. ADD NEW CSS before </style>
// ============================
const newCSS = `
/* =============================================
   MERGED PAGE: Three-Act Structure
   ============================================= */

/* ONE-LINE PITCH */
.pitch-line {
  text-align: center; font-size: var(--text-md); line-height: 1.6;
  color: var(--text-secondary); padding: 0 8px;
}
.pitch-line em { color: var(--gold-warm); font-style: normal; }

/* MOVIE CARD (compact) */
.movie-section { }
.movie-section-header { font-family: var(--display); font-size: var(--text-xl); font-weight: 800; margin-bottom: 16px; text-align: center; }
.movie-card { display: flex; gap: 16px; padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius); }
.movie-card-poster { width: 90px; height: 135px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0; }
.movie-card-info { flex: 1; }
.movie-card-title { font-family: var(--display); font-size: 20px; font-weight: 800; margin-bottom: 2px; }
.movie-card-tagline { font-size: var(--text-base); font-style: italic; color: var(--text-secondary); margin-bottom: 10px; }
.movie-detail { font-size: var(--text-sm); color: var(--text-tertiary); margin-bottom: 3px; }
.movie-detail strong { color: var(--text-secondary); }

/* CAST CHIPS */
.cast-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
.cast-chip { padding: 8px 14px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); white-space: nowrap; flex-shrink: 0; }
.cast-chip-name { font-size: var(--text-base); font-weight: 600; }
.cast-chip-role { font-size: var(--text-xs); color: var(--text-tertiary); }

/* FILMMAKER QUOTES */
.filmmaker-quote { padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius); margin-bottom: 10px; }
.filmmaker-quote-text { font-size: var(--text-md); line-height: 1.55; color: var(--text-secondary); font-style: italic; }
.filmmaker-quote-attr { font-size: var(--text-sm); color: var(--gold-cool); margin-top: 6px; }

/* SECTION LABEL (smaller than section-header) */
.section-label { font-family: var(--display); font-size: var(--text-base); font-weight: 700; margin-bottom: 12px; }

/* REALITY BREAK */
.reality-break {
  margin: 0 -16px; text-align: center; padding: 44px 24px;
  border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);
  background: linear-gradient(180deg, transparent, rgba(58,80,128,0.06), transparent);
}
.rb-line1 { font-size: var(--text-lg); font-weight: 300; line-height: 1.5; }
.rb-line2 { font-size: var(--text-lg); font-weight: 600; color: var(--gold); margin-top: 8px; line-height: 1.5; }

/* TIMELINE INTRO */
.timeline-intro { text-align: center; padding: 0 0 4px; }
.timeline-intro h2 { font-family: var(--display); font-size: 24px; font-weight: 800; margin-bottom: 6px; }
.timeline-intro p { font-size: var(--text-base); color: var(--text-secondary); line-height: 1.5; max-width: 340px; margin: 0 auto; }

/* VIEW TOGGLE */
.view-toggle { display: flex; gap: 4px; justify-content: center; margin: 16px 0 4px; }
.view-btn {
  padding: 8px 16px; font-size: var(--text-sm); font-family: var(--font); font-weight: 500;
  background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);
  color: var(--text-tertiary); cursor: pointer; transition: all 0.2s;
}
.view-btn.active { border-color: var(--gold-dim); color: var(--gold); background: rgba(201,168,76,0.08); }

/* TIMELINE */
.timeline { position: relative; padding-left: 28px; margin-top: 16px; }
.timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--gold-dim) 0%, var(--blue-atmos) 30%, var(--gold) 85%, var(--gold) 100%); }
.tl-decade { position: relative; padding: 28px 0 6px; font-family: var(--display); font-size: 20px; font-weight: 800; color: var(--gold-warm); }
.tl-decade::before { content: ''; position: absolute; left: -24px; top: 34px; width: 12px; height: 12px; border-radius: 50%; background: var(--gold); border: 2px solid var(--bg-deep); }
.tl-decade-sub { font-family: var(--font); font-size: var(--text-base); font-weight: 400; color: var(--text-tertiary); margin-top: 2px; line-height: 1.4; }
.tl-node { position: relative; padding: 8px 0 14px; }
.tl-node::before { content: ''; position: absolute; left: -23px; top: 14px; width: 6px; height: 6px; border-radius: 50%; background: var(--text-tertiary); }
.tl-node.highlight::before { background: var(--gold); width: 8px; height: 8px; left: -24px; top: 13px; }
.tl-year { font-family: var(--mono); font-size: var(--text-xs); color: var(--gold-cool); margin-bottom: 4px; }
.tl-quote { font-size: var(--text-base); line-height: 1.55; color: var(--text-secondary); font-style: italic; }
.tl-attr { font-size: var(--text-sm); color: var(--text-tertiary); margin-top: 4px; }
.tl-attr strong { color: var(--text-secondary); font-weight: 600; }
.tl-headline { font-family: var(--display); font-size: var(--text-base); font-weight: 700; color: var(--text-primary); line-height: 1.3; }
.tl-headline-source { font-size: var(--text-xs); color: var(--text-tertiary); font-family: var(--font); margin-top: 2px; }
.tl-featured { position: relative; margin: 8px -8px 12px; padding: 16px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius); }
.tl-featured::before { display: none; }
.tl-video { position: relative; border-radius: var(--radius-sm); overflow: hidden; aspect-ratio: 16/9; cursor: pointer; margin-top: 8px; }
.tl-video img { width: 100%; height: 100%; object-fit: cover; }
.tl-video-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); }
.tl-video-play { width: 40px; height: 40px; background: rgba(255,0,0,0.9); border-radius: 6px; display: flex; align-items: center; justify-content: center; }
.tl-video-tri { width: 0; height: 0; border-left: 12px solid white; border-top: 8px solid transparent; border-bottom: 8px solid transparent; margin-left: 2px; }
.tl-video-title { font-size: var(--text-sm); color: var(--text-secondary); margin-top: 6px; }

/* CATEGORY VIEW */
.category-view { display: none; margin-top: 16px; }
.category-view.active { display: block; }
.cat-group { margin-bottom: 20px; }
.cat-group-header {
  font-family: var(--display); font-size: var(--text-md); font-weight: 700;
  color: var(--text-primary); padding: 10px 0; cursor: pointer;
  border-bottom: 1px solid var(--border-subtle); margin-bottom: 8px;
  display: flex; justify-content: space-between; align-items: center;
}
.cat-group-header::after { content: '+'; color: var(--text-tertiary); font-size: var(--text-lg); }
.cat-group-header.open::after { content: '\\2212'; }
.cat-group-items { display: none; }
.cat-group-items.open { display: block; }
.cat-quote { padding: 12px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 6px; }
.cat-quote-text { font-size: var(--text-base); line-height: 1.5; color: var(--text-secondary); font-style: italic; }
.cat-quote-attr { font-size: var(--text-xs); color: var(--gold-cool); margin-top: 4px; }

/* DECLASSIFIED (within timeline) */
.declassified { margin: 24px -8px; padding: 20px 16px; border: 1px solid var(--gold-dim); border-radius: var(--radius); background: linear-gradient(180deg, oklch(0.16 0.01 80), var(--bg-deep)); }
.declassified h3 { font-family: var(--display); font-size: var(--text-lg); font-weight: 700; margin-bottom: 8px; }
.declassified p { font-size: var(--text-base); line-height: 1.6; color: var(--text-secondary); margin-bottom: 12px; }
.declassified-cta { display: block; text-align: center; padding: 14px; font-family: var(--display); font-size: var(--text-base); font-weight: 700; color: var(--gold); background: oklch(0.18 0.02 80); border: 1px solid var(--gold); border-radius: var(--radius-sm); text-decoration: none; }

/* CONTENT LIBRARY (Down the Rabbit Hole) */
.content-section { margin-top: 28px; }
.content-header { font-family: var(--display); font-size: var(--text-lg); font-weight: 700; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle); }
`;

html = html.replace('</style>', newCSS + '</style>');

// ============================
// 2. UPDATE NAV — Replace "The Movie" tab with anchor scroll
// ============================
html = html.replace(
  '<button class="nav-tab" data-page="briefing" onclick="showPage(\'briefing\')">The Movie</button>',
  '<button class="nav-tab" data-page="briefing" onclick="document.getElementById(\'the-evidence\').scrollIntoView({behavior:\'smooth\'})">The Movie</button>'
);

// ============================
// 3. ADD ONE-LINE PITCH between countdown and dress code
// ============================
const pitchHTML = `
    <div class="pitch-line">
      Spielberg's first UFO film since Close Encounters. John Williams scoring at 93. <em>Nobody knows how this ends.</em>
    </div>
`;
html = html.replace(
  '<div id="dress-code-area"></div>',
  pitchHTML + '\n    <div id="dress-code-area"></div>'
);

// ============================
// 4. INSERT MERGED CONTENT between existing atmos-divider and activity feed
// ============================
const mergedContentHTML = `
    <!-- ========================================= -->
    <!-- THE MOVIE WORLD (Act 1, below the form)   -->
    <!-- ========================================= -->
    <div class="movie-section" id="movie-world-section">
      <div class="movie-section-header">The World of Disclosure Day</div>

      <div class="movie-card">
        <img loading="lazy" class="movie-card-poster"
             src="https://image.tmdb.org/t/p/w300/3o5YPjDGDTcTDL5ftDA9NwN9dLd.jpg"
             alt="Disclosure Day poster"
             onerror="this.style.display='none'">
        <div class="movie-card-info">
          <div class="movie-card-title">Disclosure Day</div>
          <div class="movie-card-tagline">"We deserve to know."</div>
          <div class="movie-detail"><strong>Director</strong> Steven Spielberg</div>
          <div class="movie-detail"><strong>Writer</strong> David Koepp</div>
          <div class="movie-detail"><strong>Score</strong> John Williams</div>
          <div class="movie-detail"><strong>Runtime</strong> 145 min &middot; PG-13</div>
        </div>
      </div>

      <div style="margin-top:16px;">
        <div class="cast-row">
          <div class="cast-chip"><div class="cast-chip-name">Emily Blunt</div><div class="cast-chip-role">Margaret Fairchild</div></div>
          <div class="cast-chip"><div class="cast-chip-name">Josh O'Connor</div><div class="cast-chip-role">Daniel Kellner</div></div>
          <div class="cast-chip"><div class="cast-chip-name">Colin Firth</div><div class="cast-chip-role">Noah Scanlon</div></div>
          <div class="cast-chip"><div class="cast-chip-name">Colman Domingo</div><div class="cast-chip-role">Hugo Wakefield</div></div>
          <div class="cast-chip"><div class="cast-chip-name">Eve Hewson</div><div class="cast-chip-role">Jane Blankenship</div></div>
        </div>
      </div>

      <div style="margin-top:16px;">
        <div class="section-header">The Premise</div>
        <div style="padding:16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius);margin-bottom:16px;">
          <p style="font-size:var(--text-base);line-height:1.6;color:var(--text-secondary);">
            If you found out we weren't alone, if someone showed you, proved it to you, would that frighten you? This summer, the truth belongs to seven billion people.
          </p>
          <p style="font-size:var(--text-base);line-height:1.6;color:var(--text-secondary);margin-top:12px;">
            Spielberg's first original sci-fi in decades. 42 script drafts. John Williams scoring. The entire third act is being kept out of marketing. Nobody knows how this ends.
          </p>
        </div>
      </div>

      <div style="margin-top:16px;">
        <div class="filmmaker-quote">
          <div class="filmmaker-quote-text">"Isn't it going to be wonderful when people realize after seeing this movie that everything is true, and has been true?"</div>
          <div class="filmmaker-quote-attr">Spielberg on Colbert</div>
        </div>
        <div class="filmmaker-quote">
          <div class="filmmaker-quote-text">"I finished reading the script and I bawled. Steven Spielberg believes in the possibility of the human beings we could be."</div>
          <div class="filmmaker-quote-attr">Colman Domingo</div>
        </div>
      </div>

      <div style="margin-top:20px;">
        <div class="section-label">Trailers &amp; Spots</div>
        <div id="trailers-section" style="position:relative;overflow:hidden;"></div>
        <div id="trailer-dots" style="display:flex;justify-content:center;gap:8px;margin-top:-12px;margin-bottom:16px;"></div>
      </div>

      <div style="margin-top:16px;">
        <div class="section-label">Behind the Scenes</div>
        <div id="bts-section" style="position:relative;overflow:hidden;"></div>
        <div id="bts-dots" style="display:flex;justify-content:center;gap:8px;margin-top:-12px;margin-bottom:16px;"></div>
      </div>
    </div>

    <!-- ========================================= -->
    <!-- THE TURN (Reality Break)                  -->
    <!-- ========================================= -->
    <div id="reality-break" class="reality-break">
      <div class="rb-line1">The movie is based on real events.</div>
      <div class="rb-line2">These events are happening now.</div>
    </div>

    <!-- ========================================= -->
    <!-- THE EVIDENCE (Timeline + Category)        -->
    <!-- ========================================= -->
    <div id="the-evidence" style="padding:28px 0 0;">
      <div class="timeline-intro">
        <h2>This Is Actually Happening</h2>
        <p>80 years of presidents, pilots, and intelligence directors saying the same thing.</p>
      </div>

      <div class="view-toggle">
        <button class="view-btn active" onclick="showView('timeline')">Timeline</button>
        <button class="view-btn" onclick="showView('category')">By Authority</button>
      </div>

      <!-- TIMELINE VIEW (rendered by JS) -->
      <div class="timeline" id="view-timeline"></div>

      <!-- CATEGORY VIEW (rendered by JS) -->
      <div class="category-view" id="view-category"></div>

      <!-- HEADLINES -->
      <div style="margin-top:28px;">
        <div class="section-header">Headlines</div>
        <p style="font-size:var(--text-base);line-height:1.6;color:var(--text-secondary);margin-bottom:12px;">
          None of this is from the movie. It started with a New York Times investigation in 2017. It hasn't stopped.
        </p>
        <div id="briefing-headlines" style="display:flex;flex-direction:column;gap:8px;"></div>
        <button id="headlines-more-btn" onclick="showMoreHeadlines()" style="display:none;width:100%;padding:10px;margin:8px 0 24px;background:transparent;border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-tertiary);font-family:var(--display);font-size:var(--text-xs);font-weight:600;cursor:pointer;transition:border-color 0.2s,color 0.2s;">SHOW MORE</button>
      </div>
    </div>

    <div class="atmos-divider"></div>

    <!-- ========================================= -->
    <!-- DOWN THE RABBIT HOLE                      -->
    <!-- ========================================= -->
    <div class="content-section">
      <div class="content-header">Down the Rabbit Hole</div>
      <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-bottom:14px;">Documentaries, podcasts, and books to go deeper.</div>
      <div id="go-deeper-section"></div>
    </div>

    <div class="atmos-divider"></div>
`;

// Insert between the existing atmos-divider and activity-feed-section
html = html.replace(
  '<div class="atmos-divider"></div>\n\n    <div id="activity-feed-section"',
  mergedContentHTML + '\n    <div id="activity-feed-section"'
);

// ============================
// 5. REMOVE PAGE-BRIEFING SECTION
// ============================
const briefingStart = html.indexOf('  <!-- BRIEFING -->');
const briefingEnd = html.indexOf('  <!-- RSVP -->');
if (briefingStart === -1 || briefingEnd === -1) {
  // Try alternate markers
  const altStart = html.indexOf('<section id="page-briefing"');
  const altEnd = html.indexOf('</section>', altStart);
  if (altStart !== -1 && altEnd !== -1) {
    html = html.substring(0, altStart) + html.substring(altEnd + '</section>'.length);
  } else {
    console.error('Could not find page-briefing section markers');
    process.exit(1);
  }
} else {
  html = html.substring(0, briefingStart) + html.substring(briefingEnd);
}

// ============================
// 6. UPDATE "What is Disclosure Day?" LANDING BUTTON
// ============================
html = html.replace(
  `onclick="initialize();showPage('briefing');setTimeout(()=>{document.getElementById('reality-break').scrollIntoView({behavior:'smooth'})},100);"`,
  `onclick="initialize();setTimeout(()=>{document.getElementById('reality-break').scrollIntoView({behavior:'smooth'})},300);"`
);

// ============================
// 7. UPDATE showPage() — remove briefing case
// ============================
html = html.replace(
  "if (page === 'briefing') { renderTrailers(); renderOfficialQuotes(); renderWorldQuotes(); renderGoDeeper(); }",
  "// briefing merged into dashboard"
);

// ============================
// 8. UPDATE renderDashboard call to include movie world rendering
// ============================
html = html.replace(
  "if (page === 'dashboard') renderDashboard();",
  "if (page === 'dashboard') { renderDashboard(); renderMovieWorld(); }"
);

// ============================
// 9. UPDATE FAQ primer text (no more "Movie tab")
// ============================
html = html.replace(
  "No. Spielberg makes movies for everyone. But if you're curious, check the Movie tab. There's a reason this film is coming out now.",
  "No. Spielberg makes movies for everyone. But if you're curious, scroll down. There's a reason this film is coming out now."
);

// ============================
// 10. ADD NEW JS FUNCTIONS before boot()
// ============================
const newJS = `
// ========================================
// MERGED PAGE: Timeline + Category + Movie World
// ========================================

function renderMovieWorld() {
  renderTrailers();
  renderTimeline();
  renderCategoryView();
  renderHypeTicker();
  renderGoDeeper();
}

function showView(view) {
  const tl = document.getElementById('view-timeline');
  const cat = document.getElementById('view-category');
  if (tl) tl.style.display = view === 'timeline' ? '' : 'none';
  if (cat) cat.className = view === 'category' ? 'category-view active' : 'category-view';
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(view === 'timeline' ? 'timeline' : 'authority'));
  });
}

// Timeline data: hand-curated for narrative flow
const TIMELINE_DATA = [
  { type: 'decade', year: '1947', sub: 'Something crashes in Roswell. The cover-up starts.' },
  { type: 'quote', year: '1947', quote: 'The phenomenon reported is something real and not visionary or fictitious.', name: 'Lt. Gen. Twining', title: 'Air Materiel Command' },
  { type: 'quote', year: '1950', quote: 'I can assure you that flying saucers, given that they exist, are not constructed by any power on Earth.', name: 'Harry S. Truman', title: '33rd President' },

  { type: 'decade', year: '1960s', sub: 'Official denial. Private concern.' },
  { type: 'quote', year: '1960', quote: 'Behind the scenes, high-ranking Air Force officers are soberly concerned about the UFOs.', name: 'Vice Adm. Hillenkoetter', title: 'First CIA Director' },
  { type: 'quote', year: '1966', quote: 'I strongly recommend a committee investigation of the UFO phenomena.', name: 'Gerald Ford', title: 'Later 38th President' },
  { type: 'quote', year: '1968', quote: 'Ridicule is not a part of the scientific method, and the public should not be taught that it is.', name: 'Dr. J. Allen Hynek', title: 'Northwestern / Project Blue Book' },

  { type: 'decade', year: '1970s\\u201380s', sub: 'Astronauts talk. Presidents notice.' },
  { type: 'quote', year: '1976', quote: "I don't laugh at people any more when they say they've seen UFOs. I've seen one myself.", name: 'Jimmy Carter', title: '39th President' },
  { type: 'quote', year: '1978', quote: 'These extra-terrestrial vehicles and their crews are visiting this planet.', name: 'Col. Gordon Cooper', title: 'Mercury 7 Astronaut' },
  { type: 'quote', year: '1987', quote: 'Perhaps we need some outside, universal threat to make us recognize this common bond.', name: 'Ronald Reagan', title: '40th President, UN General Assembly', highlight: true },
  { type: 'quote', year: '1986', quote: "It's not about whether or not you believe. Technically, we have no explanation.", name: 'Brig. Oct\\u00e1vio Moreira Lima', title: 'Minister of Aeronautics, Brazil' },

  { type: 'decade', year: '1990s', sub: 'Belgium. UK. France. Governments on record.' },
  { type: 'quote', year: '1990', quote: 'The phenomenon of UFOs does exist, and it must be treated seriously.', name: 'Mikhail Gorbachev', title: 'Soviet Union' },
  { type: 'quote', year: '1990', quote: 'The performance characteristics went beyond the possibilities of existing technology.', name: 'Maj. Gen. De Brouwer', title: 'Belgian Air Force' },
  { type: 'quote', year: '1994', quote: "I called Curtis LeMay and said, General, could I go in that room? He got madder than hell.", name: 'Sen. Barry Goldwater', title: 'Senate Intelligence Chair, USAF Major General' },
  { type: 'quote', year: '1997', quote: 'Either an intrusion took place, or a nuclear-armed base commander was hallucinating.', name: 'Admiral Lord Hill-Norton', title: 'UK Defence Chief' },
  { type: 'quote', year: '1999', quote: 'A single hypothesis sufficiently takes into account the facts: extraterrestrial visitors.', name: 'Gen. Denis Letty', title: 'French Air Force, report to PM' },

  { type: 'decade', year: '2000s\\u201310s', sub: "The Pentagon creates a secret program. Then the NYT breaks it." },
  { type: 'quote', year: '2008', quote: "I happen to have been privileged enough to be in on the fact that we've been visited.", name: 'Dr. Edgar Mitchell', title: 'Apollo 14, 6th man on the Moon' },

  { type: 'featured', year: '2017', label: 'The break', headline: "New York Times reveals the Pentagon's secret UFO program.", videoId: 'rhjTZTFjW8k', videoTitle: 'Official Pentagon UAP footage (declassified)' },
  { type: 'quote', year: '2017', quote: 'I think it was not from this world.', name: 'Cmdr. David Fravor', title: 'Navy TOPGUN Pilot' },
  { type: 'quote', year: '2017', quote: 'We do not know what it was, but we do know what it was not.', name: 'Gen. Ricardo Berm\\u00fadez', title: 'Director of CEFAA, Chile' },

  { type: 'decade', year: '2020s', sub: 'The dam breaks.', gold: true },
  { type: 'quote', year: '2020', quote: 'Off-world vehicles not made on this Earth.', name: 'Dr. Eric Davis', title: 'Pentagon Briefer, NYT' },
  { type: 'quote', year: '2020', quote: 'Some of the phenomena might constitute a different form of life.', name: 'John Brennan', title: 'Former CIA Director' },
  { type: 'quote', year: '2021', quote: "There's footage of objects in the skies that we don't know exactly what they are.", name: 'Barack Obama', title: '44th President', highlight: true },
  { type: 'quote', year: '2021', quote: 'There are a lot more sightings than have been made public.', name: 'John Ratcliffe', title: 'Director of National Intelligence' },
  { type: 'headline', year: '2021', text: 'ODNI Report: 144 incidents. Only 1 explained.' },

  { type: 'featured', year: '2023', label: 'Under oath', headline: 'Congressional hearing. Three witnesses. The world watches.', videoId: 'lcrCMLVk614' },
  { type: 'quote', year: '2023', quote: 'I was informed of a multi-decade crash retrieval and reverse-engineering program.', name: 'David Grusch', title: 'Intelligence Officer, Under Oath' },
  { type: 'quote', year: '2023', quote: 'These sightings are not rare. They are routine.', name: 'Lt. Ryan Graves', title: 'Navy Pilot, Under Oath' },
  { type: 'quote', year: '2023', quote: 'The American public has a right to learn about technologies of unknown origins.', name: 'Sen. Chuck Schumer', title: 'Senate Majority Leader' },
  { type: 'quote', year: '2024', quote: 'Non-human intelligence exists. Zero doubt.', name: 'Col. Karl Nell', title: 'U.S. Army, UAP Task Force' },
  { type: 'quote', year: '2024', quote: 'UAP are real. Advanced technologies not made by any government.', name: 'Lue Elizondo', title: 'Former AATIP Director, Under Oath' },
  { type: 'quote', year: '2024', quote: 'Either they are telling the truth and that would be the biggest story in human history, or we have people in important positions who are crazy.', name: 'Sen. Marco Rubio', title: 'Vice Chair, Senate Intelligence' },
  { type: 'quote', year: '2024', quote: 'Japan possesses its own UAP video footage.', name: 'Minoru Kihara', title: 'Chief Cabinet Secretary, Japan' },
  { type: 'quote', year: '2025', quote: 'I have seen with my own eyes non-human craft, and non-human beings.', name: 'RADM Tim Gallaudet', title: 'Rear Admiral USN' },

  { type: 'featured', year: '2026', label: 'Now', headline: '"WHAT THE HELL IS GOING ON?"', attr: 'Donald Trump, 47th President, Feb 2026', subheadline: 'Pentagon unseals 222 UAP files. 1 billion visits in 2 weeks.' },
  { type: 'quote', year: 'May 2026', quote: 'Holy crap is coming.', name: 'Rep. Tim Burchett', title: 'U.S. House (R-TN)' },

  { type: 'declassified' },

  { type: 'final', year: 'June 12, 2026', text: 'Disclosure Day opens in theaters.', sub: 'Opening night. Same row. Same crew.' },
];

function renderTimeline() {
  const container = document.getElementById('view-timeline');
  if (!container) return;

  container.innerHTML = TIMELINE_DATA.map(node => {
    if (node.type === 'decade') {
      const goldStyle = node.gold ? ' style="color:var(--gold)"' : '';
      const subStyle = node.gold ? ' style="color:var(--gold-warm)"' : '';
      return '<div class="tl-decade"' + goldStyle + '>' + node.year + '<div class="tl-decade-sub"' + subStyle + '>' + node.sub + '</div></div>';
    }
    if (node.type === 'quote') {
      const cls = node.highlight ? ' highlight' : '';
      return '<div class="tl-node' + cls + '"><div class="tl-year">' + node.year + '</div><div class="tl-quote">"' + node.quote + '"</div><div class="tl-attr"><strong>' + node.name + '</strong> \\u00b7 ' + node.title + '</div></div>';
    }
    if (node.type === 'headline') {
      return '<div class="tl-node"><div class="tl-year">' + node.year + '</div><div class="tl-headline">' + node.text + '</div></div>';
    }
    if (node.type === 'featured') {
      let h = '<div class="tl-featured"><div class="tl-year" style="color:var(--gold);">' + node.year + ' \\u2014 ' + node.label + '</div>';
      h += '<div class="tl-headline" style="font-size:16px;">' + node.headline + '</div>';
      if (node.attr) h += '<div class="tl-attr"><strong>' + node.attr.split(',')[0] + '</strong> \\u00b7 ' + node.attr.split(',').slice(1).join(',').trim() + '</div>';
      if (node.subheadline) h += '<div style="margin-top:10px;"><div class="tl-headline">' + node.subheadline + '</div></div>';
      if (node.videoId) {
        h += '<div class="tl-video" id="tl-vid-' + node.videoId + '" onclick="loadRabbitVideo(this.id,\\'' + node.videoId + '\\')" style="cursor:pointer;"><img loading="lazy" src="https://img.youtube.com/vi/' + node.videoId + '/hqdefault.jpg" alt="Video"><div class="tl-video-overlay"><div class="tl-video-play"><div class="tl-video-tri"></div></div></div></div>';
        if (node.videoTitle) h += '<div class="tl-video-title">' + node.videoTitle + '</div>';
      }
      h += '</div>';
      return h;
    }
    if (node.type === 'declassified') {
      return '<div class="declassified">' +
        '<h3>The Declassified Files</h3>' +
        '<p>On May 8, 2026, the Pentagon published 222 classified UAP records. Videos. Photos. Sensor data spanning 1944 to present. The portal hit 1 billion visits in two weeks.</p>' +
        '<div class="tl-video" id="tl-vid-declass" onclick="loadRabbitVideo(this.id,\\'sZwh8wlaoXE\\')" style="cursor:pointer;margin-bottom:12px;"><img loading="lazy" src="https://img.youtube.com/vi/sZwh8wlaoXE/hqdefault.jpg" alt="UAP footage"><div class="tl-video-overlay"><div class="tl-video-play"><div class="tl-video-tri"></div></div></div></div>' +
        '<div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-bottom:14px;">Object goes from stationary to extreme velocity instantaneously. No known technology does this.</div>' +
        '<a class="declassified-cta" href="https://www.war.gov/ufo/" target="_blank" rel="noopener">war.gov/ufo \\u2014 Read the Files</a>' +
        '</div>';
    }
    if (node.type === 'final') {
      return '<div class="tl-node highlight" style="padding-bottom:32px;"><div class="tl-year" style="color:var(--gold);font-size:var(--text-base);">' + node.year + '</div><div class="tl-headline" style="font-size:16px;color:var(--gold);">' + node.text + '</div><div style="font-size:var(--text-base);color:var(--gold-warm);margin-top:4px;">' + node.sub + '</div></div>';
    }
    return '';
  }).join('\\n');
}

function renderCategoryView() {
  const container = document.getElementById('view-category');
  if (!container) return;

  const allCategories = [
    ...QUOTE_CATEGORIES,
    { id: 'world', label: 'World Governments', defaultOpen: false }
  ];

  container.innerHTML = allCategories.map((cat, catIdx) => {
    const quotes = OFFICIAL_QUOTES.filter(q => q.category === cat.id);
    if (!quotes.length) return '';
    const openClass = catIdx === 0 ? ' open' : '';
    return '<div class="cat-group">' +
      '<div class="cat-group-header' + openClass + '" onclick="this.classList.toggle(\\'open\\');this.nextElementSibling.classList.toggle(\\'open\\')">' + cat.label + ' <span style="font-size:var(--text-xs);color:var(--text-tertiary);font-weight:400;">' + quotes.length + '</span></div>' +
      '<div class="cat-group-items' + openClass + '">' +
      quotes.map(q => '<div class="cat-quote"><div class="cat-quote-text">"' + q.quote + '"</div><div class="cat-quote-attr">' + q.name + ' \\u00b7 ' + q.source + '</div></div>').join('') +
      '</div></div>';
  }).join('');
}

`;

// Insert new JS before the boot function
html = html.replace(
  '// Ticket status polling',
  newJS + '\n// Ticket status polling'
);

// ============================
// 11. CLEAN UP — Remove old briefing CSS references that are now orphaned
// ============================
// The old .movie-hero, .cast-grid, etc. CSS classes may still exist but won't cause issues
// The new CSS classes take over. Old ones become dead CSS (harmless).

// ============================
// WRITE OUTPUT
// ============================
fs.writeFileSync(file, html, 'utf8');

const lineCount = html.split('\\n').length;
console.log('Done. index.html is now ' + lineCount + ' lines.');
console.log('Changes:');
console.log('  - Added merged page CSS (~130 classes)');
console.log('  - Changed nav "The Movie" tab to anchor scroll');
console.log('  - Added one-line pitch between countdown and dress code');
console.log('  - Inserted movie world + reality break + evidence + rabbit hole into dashboard');
console.log('  - Removed page-briefing section');
console.log('  - Added renderTimeline(), renderCategoryView(), renderMovieWorld(), showView()');
console.log('  - Updated showPage() wiring');
console.log('  - Updated landing page "What is Disclosure Day?" button');
console.log('  - Updated FAQ text (no more "Movie tab" reference)');
