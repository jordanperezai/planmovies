# Why every check must block

Detection without enforcement is failure. Every check must gate (block the bad state from persisting) or be removed. This is not a suggestion. It is a mechanical law: the architecture physically separates detection from authority, and enforcement is the only path that persists state.

A check that detects but does not block is a log line. Log lines do not prevent damage. They document it after the fact.

## The bug that proved it

2026-04-16. A production scraper ran `validate-data.mjs` post-scrape, then published the validated-bad data to the dashboard regardless of the result. Detection fired. Enforcement did not. Users saw wrong data for hours until someone manually read `alerts.jsonl`.

This is the canonical failure mode. The check existed. It ran. It caught the problem. None of that mattered because it did not block the next step.

## What Zordon does about it

Four mechanisms enforce gate-first in practice.

**Denylist in `.claude/settings.json`.** Destructive commands (`rm -rf`, `git push --force`, `git reset --hard`, `DROP TABLE`, `curl | sh`) are blocked by a PreToolUse hook before they execute. Not flagged. Blocked.

**PreToolUse hooks on core files.** Identity files (CLAUDE.md, SOUL.md, VOICE.md, USER.md, SECURITY.md, WILL.md) trigger a drift warning before any edit. The hook fires before the tool runs, not after.

**SECURITY.md irreversibility rule.** Any irreversible action requires explicit human confirmation. Policy can gate reversible actions. Humans gate irreversible ones.

**Top Mistake Pattern #6.** "Check that doesn't gate. Every check must block on FAIL or be removed." This loads into context every session. It is not buried in a doc somewhere. It is in working memory.

## The escalation model

When a check fails to gate, the fix follows a strict ladder:

1. Move the check before the write. Or write to staging and promote only on PASS.
2. On FAIL: preserve previous state, alert loudly, do not continue.
3. Verify by running a FAIL scenario end-to-end. Not a PASS scenario. The gate is not installed until the FAIL path is exercised.

The principle compounds. Every gate that blocks prevents a class of failures, not a single instance. Every check that merely detects creates a false sense of safety that is worse than no check at all.
