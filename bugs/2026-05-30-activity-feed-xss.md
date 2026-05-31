# Activity feed stored XSS via attribute on allowed `<strong>`

**Status:** [fixed]
**Found:** 2026-05-30
**Severity:** P0 critical

## What happens
`renderActivityFeed` stripped every tag except `<strong>` with `/<(?!\/?strong\b)[^>]*>/gi`, then wrote the result as innerHTML. The regex matches the tag NAME only, so `<strong onmouseover=alert(1)>` passed through with its event handler intact and ran for every viewer. The `activity_feed` insert policy was open to the public anon key, so anyone could plant the payload. Live-exploitable on planmovies.com.

## What should happen
User-derived feed content must never execute script. Bold is the only intended markup.

## Root cause
Allowlist-by-tag-name sanitizer that ignored attributes. Codex adversarial review caught it; an earlier single-engine (Claude) review wrongly called it "mitigated." Two-brain win.

## Fix
Escape the whole message, then restore ONLY attributeless `<strong>`/`</strong>`: `esc(msg).replace(/&lt;(\/?)strong&gt;/g,'<$1strong>')`. Any injected tag or handler stays inert escaped text. (index.html `renderActivityFeed`.) Follow-up: bind `activity_feed` inserts to `auth.uid()` to also stop actor-name spoofing.
