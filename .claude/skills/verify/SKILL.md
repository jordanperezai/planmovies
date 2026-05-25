---
name: verify
description: "Verify that something actually worked. Check the effect, not the action. After any deploy, change, or fix: hit the live URL, check the database, read the output."
model: sonnet
triggers:
  - "verify"
  - "did that work"
  - "check if it worked"
  - "confirm the change"
  - "/verify"
---

# Verify -- Effect Verification

Check that something actually worked. Verify the effect, not the action.

"The command succeeded" is not verification. "The page shows the new content" is.

## When to use

- After any deploy or publish
- After any database migration
- After any config change
- After any fix to confirm the bug is gone
- After any change to verify it didn't break something else

## Step 1 -- State what was changed

Name the specific change. "Updated the RSVP form validation" not "made some changes."

## Step 2 -- Define what "worked" means

Before checking, state the expected outcome. "The form should reject empty phone numbers and show an error message." If you can't state what worked means, you can't verify.

## Step 3 -- Check the actual effect

| Change type | How to verify |
|---|---|
| Deploy to Cloudflare Pages | curl the live URL. Read the response. Check the content matches. |
| Database migration | Query the table. Confirm the column/constraint exists. |
| Worker deploy | Trigger the worker. Check the Telegram message arrived. |
| UI change | Open the page. Check the element renders. Check mobile viewport. |
| Bug fix | Reproduce the original bug steps. Confirm they no longer fail. |
| Config change | Read the config file. Confirm the value is set. |

## Step 4 -- Report

```
## Verification: [what was changed]

**Expected:** [what should have happened]
**Actual:** [what actually happened]
**Status:** VERIFIED / FAILED

[If FAILED: what went wrong, what to try next]
```

## Step 5 -- Check for side effects

The change might have fixed the target but broken something else. For each change, check one related thing:
- UI change? Check that adjacent elements still render.
- Database change? Check that existing queries still work.
- Deploy? Check that other routes still load.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "The command said success" | Commands report their own status. They don't check the downstream effect. curl the URL. |
| "I just changed one line, nothing could break" | One-line changes break production regularly. That's why you verify. |
| "I'll check it later" | Later you'll forget what the expected behavior was. Check now. 30 seconds. |
| "It worked locally" | Local and production are different environments. Deploy and verify. |
