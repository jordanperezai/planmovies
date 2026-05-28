#!/usr/bin/env node
// partiful-pass.js — Partiful-inspired design quality improvements
// 1. Breathing room (24px → 36-48px between zones)
// 2. Bigger crew avatars (44px → 56px)
// 3. Poster atmosphere backdrop (already exists, boost opacity)
// 4. Zone backgrounds (subtle bg shifts between sections)
// 5. Elevated form card (more padding, subtle border glow)

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');
let changes = [];

// ============================
// 1. BREATHING ROOM — increase spacing between major zones
// ============================

// crew-body child spacing: 24px → 36px
html = html.replace(
  '.crew-body > * + * { margin-top: 24px; }',
  '.crew-body > * + * { margin-top: 36px; }'
);
changes.push('Section spacing 24px → 36px');

// crew-body padding: more generous
html = html.replace(
  '.crew-body { padding: 24px 16px 0; max-width: 720px; margin: 0 auto; }',
  '.crew-body { padding: 32px 20px 0; max-width: 720px; margin: 0 auto; }'
);
changes.push('Crew body padding 24/16 → 32/20');

// Crew avatars section: more vertical space
html = html.replace(
  '.crew-avatars {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  padding: 16px 0;\n}',
  '.crew-avatars {\n  display: flex;\n  align-items: center;\n  gap: 0;\n  padding: 8px 0;\n}'
);
changes.push('Crew avatars padding adjusted');

// RSVP card: more generous internal padding
html = html.replace(
  '.crew-rsvp-card {\n  padding: 24px 20px; background: var(--bg-card);\n  border: 1px solid var(--border-subtle); border-radius: var(--radius);\n}',
  '.crew-rsvp-card {\n  padding: 28px 24px; background: var(--bg-card);\n  border: 1px solid var(--warm-border); border-radius: var(--radius);\n  box-shadow: 0 4px 24px rgba(0,0,0,0.3);\n}'
);
changes.push('RSVP card: more padding, warm border, subtle shadow');

// Form group spacing
html = html.replace(
  '.crew-rsvp-card .form-group { margin-bottom: 16px; }',
  '.crew-rsvp-card .form-group { margin-bottom: 20px; }'
);
changes.push('Form group spacing 16px → 20px');

// ============================
// 2. BIGGER CREW AVATARS — 44px → 56px
// ============================

html = html.replace(
  '.crew-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--bg-elevated);\n  border: 2px solid var(--bg);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--text-md);\n  font-weight: 700;\n  color: var(--gold);\n  flex-shrink: 0;\n  margin-left: -8px;\n}',
  '.crew-avatar {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: var(--bg-elevated);\n  border: 2px solid var(--bg-deep);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--text-lg);\n  font-weight: 700;\n  color: var(--gold);\n  flex-shrink: 0;\n  margin-left: -10px;\n}'
);
changes.push('Crew avatars 44px → 56px');

// Overflow avatar too
html = html.replace(
  '.crew-avatar-overflow {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--bg-card);\n  border: 2px solid var(--bg);',
  '.crew-avatar-overflow {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: var(--bg-card);\n  border: 2px solid var(--bg-deep);'
);
changes.push('Overflow avatar 44px → 56px');

// Avatar photo size too
html = html.replace(
  '.crew-avatar-photo {\n  width: 36px;\n  height: 36px;',
  '.crew-avatar-photo {\n  width: 48px;\n  height: 48px;'
);
changes.push('Avatar photos 36px → 48px');

// ============================
// 3. POSTER ATMOSPHERE — boost opacity for more presence
// ============================

html = html.replace(
  'opacity: 0.06;\n  filter: blur(40px) saturate(1.4);',
  'opacity: 0.09;\n  filter: blur(50px) saturate(1.6);'
);
changes.push('Poster atmosphere opacity 0.06 → 0.09, blur 40 → 50');

// ============================
// 4. ZONE BACKGROUNDS — subtle shifts between sections
// ============================

// Add zone classes to CSS (before </style>)
const zoneCss = `
/* ZONE BACKGROUNDS — subtle shifts between content zones */
.zone-social {
  background: linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.02) 50%, transparent 100%);
  padding-top: 8px; padding-bottom: 8px;
  margin: 0 -20px; padding-left: 20px; padding-right: 20px;
  border-radius: 0;
}
.zone-form {
  background: linear-gradient(180deg, rgba(201,168,76,0.03) 0%, transparent 100%);
  padding: 32px 20px;
  margin: 0 -20px;
  border-top: 1px solid var(--warm-border);
}
.zone-movie {
  background: linear-gradient(180deg, transparent 0%, rgba(58,80,128,0.04) 50%, transparent 100%);
  padding: 36px 0;
  margin: 0 -20px; padding-left: 20px; padding-right: 20px;
}
.zone-evidence {
  background: linear-gradient(180deg, rgba(58,80,128,0.03) 0%, transparent 40%, transparent 60%, rgba(201,168,76,0.02) 100%);
  padding: 36px 0;
  margin: 0 -20px; padding-left: 20px; padding-right: 20px;
}
@media (min-width: 960px) {
  .zone-social, .zone-form, .zone-movie, .zone-evidence {
    margin: 0 -24px; padding-left: 24px; padding-right: 24px;
  }
}
`;
html = html.replace('</style>', zoneCss + '</style>');
changes.push('Added zone background gradient classes');

// Apply zone classes to HTML sections
// Social zone: avatars + countdown + pitch
html = html.replace(
  '    <div class="crew-avatars-section">\n      <div id="crew-list-family"></div>\n    </div>',
  '    <div class="zone-social">\n    <div class="crew-avatars-section">\n      <div id="crew-list-family"></div>\n    </div>'
);

// Close social zone after pitch line, before dress code
html = html.replace(
  '    <div class="pitch-line">',
  '    <div class="pitch-line" style="padding-bottom:8px;">'
);

// Need to close the zone-social div after the pitch line
html = html.replace(
  '    </div>\n\n    <div id="dress-code-area"></div>',
  '    </div>\n    </div>\n\n    <div id="dress-code-area"></div>'
);
changes.push('Applied social zone to avatars/countdown/pitch');

// Form zone: wrap inline-rsvp
html = html.replace(
  '    <div id="inline-rsvp">',
  '    <div id="inline-rsvp" class="zone-form">'
);
changes.push('Applied form zone to RSVP area');

// Movie zone: wrap movie section
html = html.replace(
  '    <div class="movie-section" id="movie-world-section">',
  '    <div class="movie-section zone-movie" id="movie-world-section">'
);
changes.push('Applied movie zone to movie world section');

// Evidence zone: wrap evidence section
html = html.replace(
  '    <div id="the-evidence" style="padding:28px 0 0;">',
  '    <div id="the-evidence" class="zone-evidence" style="padding:28px 0 0;">'
);
changes.push('Applied evidence zone to timeline/category section');

// ============================
// 5. ELEVATED FORM — already done with the warm border + shadow above
// Add a subtle label above the form for context
// ============================

// The "Your turn." text before the form is good.
// Make it slightly more prominent
html = html.replace(
  '<p style="font-family:var(--font);font-size:var(--text-md);color:var(--text-secondary);margin-bottom:16px;">Your turn.</p>',
  '<p style="font-family:var(--font);font-size:var(--text-lg);color:var(--text-primary);margin-bottom:20px;font-weight:500;">Your turn.</p>'
);
changes.push('"Your turn." text larger and brighter');

// ============================
// WRITE OUTPUT
// ============================
fs.writeFileSync(file, html, 'utf8');
console.log('Done. ' + changes.length + ' changes:');
changes.forEach((c, i) => console.log('  ' + (i + 1) + '. ' + c));
