#!/usr/bin/env node
// critique-fixes.js — Layout + Quieter + Polish fixes from /critique
// Run: node scripts/critique-fixes.js

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');
let changes = [];

// ============================
// QUIETER: Remove AI visual tells
// ============================

// 1. Kill CTA pulsing glow animation
html = html.replace(
  "@keyframes cta-glow { 0%,100%{ transform:scale(1); opacity:0.4; } 50%{ transform:scale(1.15); opacity:0; } }",
  ""
);
html = html.replace(
  "  animation: cta-glow 2.5s ease-out infinite;\n  pointer-events: none;\n",
  "  pointer-events: none;\n"
);
changes.push('Removed CTA pulsing glow animation');

// 2. Kill title glow animation
html = html.replace(
  "@keyframes title-glow { 0%,100%{ text-shadow: 0 0 60px rgba(201,168,76,0.15); } 50%{ text-shadow: 0 0 80px rgba(201,168,76,0.3); } }",
  ""
);
html = html.replace(
  "  animation: title-glow 8s ease-in-out infinite;",
  ""
);
changes.push('Removed title glow animation');

// 3. Remove landing stars
html = html.replace(
  /\.landing-stars \{[^}]+\}\n/,
  ""
);
html = html.replace(
  '    <div class="landing-stars"></div>\n',
  ""
);
changes.push('Removed landing stars particle effect');

// 4. Reduce poster box-shadow (remove 120px glow spread, keep depth shadow)
html = html.replace(
  /box-shadow: 0 24px 64px rgba\(0,0,0,0\.7\), 0 0 120px rgba\(42,58,90,0\.15\);/g,
  "box-shadow: 0 16px 48px rgba(0,0,0,0.6);"
);
changes.push('Reduced poster box-shadows (removed 120px blue glow)');

// 5. Remove backdrop-filter from everything EXCEPT nav (line 125)
// Keep: .nav backdrop-filter: blur(20px)
// Remove from: news ticker, seat modal overlay, modal backdrop
html = html.replace(
  /  backdrop-filter: blur\(10px\);\n/g,
  ""
);
html = html.replace(
  /  backdrop-filter: blur\(6px\);\n/g,
  ""
);
html = html.replace(
  /  backdrop-filter: blur\(12px\);\n/g,
  ""
);
html = html.replace(
  /  -webkit-backdrop-filter: blur\(12px\);\n/g,
  ""
);
changes.push('Removed backdrop-filter blur (kept nav only)');

// 6. Remove CTA glow pseudo-element
html = html.replace(
  `.cta-btn-wrap::before {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.2), transparent 70%);

}`,
  `.cta-btn-wrap::before { display: none; }`
);
changes.push('Removed CTA radial glow pseudo-element');

// ============================
// LAYOUT: Structural fixes
// ============================

// 7. Move activity feed up — between payment section and movie world
// Extract the activity feed HTML
const feedStart = '    <div id="activity-feed-section" style="margin-bottom:20px;">';
const feedEnd = '    </div>\n\n    <div id="primer-section"';
const feedIdx = html.indexOf(feedStart);
const feedEndIdx = html.indexOf(feedEnd, feedIdx);
if (feedIdx !== -1 && feedEndIdx !== -1) {
  const feedHTML = html.substring(feedIdx, feedEndIdx + '    </div>'.length);
  // Remove from current position
  html = html.substring(0, feedIdx) + html.substring(feedEndIdx + '    </div>\n\n'.length);
  // Insert before the movie world section
  html = html.replace(
    '    <!-- ========================================= -->\n    <!-- THE MOVIE WORLD (Act 1, below the form)   -->',
    feedHTML + '\n\n    <div class="atmos-divider"></div>\n\n    <!-- ========================================= -->\n    <!-- THE MOVIE WORLD (Act 1, below the form)   -->'
  );
  changes.push('Moved activity feed above movie world (closer to RSVP form)');
}

// 8. Add bottom CTA after rabbit hole
html = html.replace(
  '      <div id="go-deeper-section"></div>\n    </div>\n\n    <div class="atmos-divider"></div>\n\n    <div id="primer-section"',
  '      <div id="go-deeper-section"></div>\n    </div>\n\n    <div style="text-align:center;margin:32px 0 16px;">\n      <button class="cta-btn" onclick="document.getElementById(\'inline-rsvp\').scrollIntoView({behavior:\'smooth\'});" style="padding:14px 32px;">RSVP Now</button>\n    </div>\n\n    <div class="atmos-divider"></div>\n\n    <div id="primer-section"'
);
changes.push('Added bottom CTA after rabbit hole');

// 9. Fix "Movie" nav tab — remove from tab bar, use simple link style
html = html.replace(
  '      <button class="nav-tab" onclick="document.getElementById(\'the-evidence\').scrollIntoView({behavior:\'smooth\'})" style="color:var(--text-secondary)">The Movie</button>\n',
  ''
);
changes.push('Removed "The Movie" from tab bar (content is now inline on same page)');

// 10. Simplify post-RSVP confirmation — collapse phone/status/photo into profile link
const postRsvpOld = `        <div id="post-rsvp-phone" style="margin-top:16px;padding:14px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);">
          <p style="font-size:var(--text-base);color:var(--text-secondary);margin-bottom:10px;">Get ticket updates via text</p>
          <div style="display:flex;gap:8px;">
            <div class="phone-input-wrap" style="flex:1;">
              <span class="country-code">+1</span>
              <input class="phone-number" type="tel" id="f-phone" placeholder="(555) 123-4567" aria-label="Phone number" inputmode="numeric" autocomplete="tel-national" maxlength="14">
            </div>
            <button type="button" onclick="savePhoneNumber()" style="padding:8px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:var(--text-base);cursor:pointer;font-family:var(--font);white-space:nowrap;">Save</button>
          </div>
        </div>
        <div class="form-group" id="status-line-group" style="margin-top:12px;">
          <input class="status-line-input" type="text" id="f-status-line" aria-label="Status line" placeholder="Say something... (e.g. Can't wait, Already watched the trailer 4x)" maxlength="80">
          <button type="button" onclick="saveStatusLine()" style="display:block;margin:6px auto 0;background:none;border:none;font-size:var(--text-sm);color:var(--gold-dim);cursor:pointer;">Save</button>
        </div>
        <div class="photo-upload-area" id="photo-upload-area">
          <input type="file" id="photo-file" accept="image/*" style="display:none;" onchange="uploadPhoto(this)">
          <button class="photo-upload-btn" type="button" onclick="document.getElementById('photo-file').click()">Add your photo</button>
          <p style="font-size:var(--text-xs);color:var(--text-tertiary);">Shows next to your name in the crew list</p>
        </div>
        <div style="margin-top:16px;">
          <div class="section-header">The Crew So Far</div>
          <div id="confirm-crew" style="display:flex;flex-direction:column;gap:6px;margin-bottom:24px;"></div>
        </div>`;

const postRsvpNew = `        <div id="post-rsvp-extras" style="display:none;">
          <div id="post-rsvp-phone" style="margin-top:16px;padding:14px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);">
            <p style="font-size:var(--text-base);color:var(--text-secondary);margin-bottom:10px;">Get ticket updates via text</p>
            <div style="display:flex;gap:8px;">
              <div class="phone-input-wrap" style="flex:1;">
                <span class="country-code">+1</span>
                <input class="phone-number" type="tel" id="f-phone" placeholder="(555) 123-4567" aria-label="Phone number" inputmode="numeric" autocomplete="tel-national" maxlength="14">
              </div>
              <button type="button" onclick="savePhoneNumber()" style="padding:8px 16px;background:var(--bg-elevated);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);color:var(--text-secondary);font-size:var(--text-base);cursor:pointer;font-family:var(--font);white-space:nowrap;">Save</button>
            </div>
          </div>
          <div class="form-group" id="status-line-group" style="margin-top:12px;">
            <input class="status-line-input" type="text" id="f-status-line" aria-label="Status line" placeholder="Say something... (e.g. Can't wait, Already watched the trailer 4x)" maxlength="80">
            <button type="button" onclick="saveStatusLine()" style="display:block;margin:6px auto 0;background:none;border:none;font-size:var(--text-sm);color:var(--gold-dim);cursor:pointer;">Save</button>
          </div>
          <div class="photo-upload-area" id="photo-upload-area">
            <input type="file" id="photo-file" accept="image/*" style="display:none;" onchange="uploadPhoto(this)">
            <button class="photo-upload-btn" type="button" onclick="document.getElementById('photo-file').click()">Add your photo</button>
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);">Shows next to your name in the crew list</p>
          </div>
        </div>
        <button type="button" onclick="document.getElementById('post-rsvp-extras').style.display=document.getElementById('post-rsvp-extras').style.display==='none'?'block':'none';this.textContent=document.getElementById('post-rsvp-extras').style.display==='none'?'Set up your profile':'Hide'" style="display:block;width:100%;margin-top:16px;padding:10px 16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);font-family:var(--font);font-size:var(--text-base);color:var(--text-secondary);cursor:pointer;text-align:center;">Set up your profile</button>
        <div style="margin-top:16px;">
          <div class="section-header">The Crew So Far</div>
          <div id="confirm-crew" style="display:flex;flex-direction:column;gap:6px;margin-bottom:24px;"></div>
        </div>`;

html = html.replace(postRsvpOld, postRsvpNew);
changes.push('Collapsed phone/status/photo behind "Set up your profile" button');

// ============================
// POLISH: Small fixes
// ============================

// 11. Hide party size when "Can't Make It" selected
const radioHandlerOld = `document.querySelectorAll('.radio-group').forEach(group => {
  group.addEventListener('click', e => {
    const pill = e.target.closest('.radio-pill');
    if (!pill) return;
    group.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
  });
});`;

const radioHandlerNew = `document.querySelectorAll('.radio-group').forEach(group => {
  group.addEventListener('click', e => {
    const pill = e.target.closest('.radio-pill');
    if (!pill) return;
    group.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    if (group.id === 'f-status') {
      const val = pill.querySelector('input').value;
      const partyGroup = document.getElementById('f-party').closest('.form-group');
      if (partyGroup) partyGroup.style.display = val === 'cant' ? 'none' : '';
    }
  });
});`;

html = html.replace(radioHandlerOld, radioHandlerNew);
changes.push('Party size hides when "Can\'t Make It" is selected');

// 12. Fix heading hierarchy — the h3 in confirmation should be h2
html = html.replace(
  '<h3 id="confirm-heading" style="font-size:1.3rem;font-weight:700;margin-bottom:8px;"></h3>',
  '<h2 id="confirm-heading" style="font-size:1.3rem;font-weight:700;margin-bottom:8px;"></h2>'
);
changes.push('Fixed heading hierarchy (h3 -> h2 in confirmation)');

// 13. Remove the extra atmos-divider that was between payment and the old activity feed position
// After moving the feed, there may be a double divider. Let's clean up.
html = html.replace(
  '    </div>\n\n    \n',
  '    </div>\n\n'
);
changes.push('Cleaned up whitespace from structural moves');

// ============================
// WRITE OUTPUT
// ============================
fs.writeFileSync(file, html, 'utf8');

console.log('Done. ' + changes.length + ' changes applied:');
changes.forEach((c, i) => console.log('  ' + (i+1) + '. ' + c));
