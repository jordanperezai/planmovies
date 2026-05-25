---
name: anti-slop
description: "Scan any written output against VOICE.md Kill List and writing rules. Catches AI-generated slop before it ships."
model: sonnet
triggers:
  - "anti slop"
  - "check for slop"
  - "check this writing"
  - "is this sloppy"
  - "/anti-slop"
---

# Anti-Slop

Scan written output against VOICE.md's Kill List and writing rules. If it reads like AI wrote it with no thought, this catches it.

## When to use

- Before shipping any written output (README, docs, user-facing copy)
- When something "sounds off" but you can't name why
- After generating long-form content
- At /wrap-up if the session produced writing

## Step 1 -- Load the rules

Read VOICE.md. Focus on:
- The Kill List (banned patterns)
- Writing rules (rhythm, punctuation, structure)
- If no VOICE.md exists, use these universal checks

## Step 2 -- Scan for violations

Check the output against each category:

| Category | What to catch |
|---|---|
| **Throat-clearing** | "Here's the thing." "It turns out." "The uncomfortable truth is." "Look." "So." "Well." |
| **Emphasis crutches** | "Full stop." "Let that sink in." "Make no mistake." "I want to be clear." |
| **Adverbs** | really, just, literally, genuinely, honestly, simply, actually, deeply, truly |
| **Filler** | "At its core." "In today's world." "It's worth noting." "At the end of the day." |
| **Meta-commentary** | "Hint:" "Plot twist:" "You already know this, but." |
| **False agency** | "The data tells us." "History shows." Name the person or make it direct. |
| **AI tells** | "Great question!" "Absolutely!" "I'd be happy to help!" "Let me help you with that." |
| **Hedge words** | perhaps, maybe, I think, it seems like, it appears |
| **Three-item lists** | Three is the AI default rhythm. Two or one. |
| **Synonym cycling** | Saying the same thing three ways. Say it once. |
| **Em-dashes** | The #1 AI fingerprint. Use periods or colons. |
| **Uniform paragraph length** | 3+ consecutive paragraphs the same length. Real writing varies. |

## Step 3 -- Report

For each violation found:
- Quote the offending text
- Name the category
- Suggest a fix

## Step 4 -- Verdict

**CLEAN:** No violations. Ship it.
**SLOPPY:** Violations found. Fix before shipping. List each one.

Don't auto-fix. Report the violations. The human or agent decides how to rewrite.

## Anti-Rationalization Table

| Excuse | Reality |
|--------|---------|
| "It's close enough" | Close enough is how slop ships. The whole point is catching what feels fine but reads like AI. |
| "Nobody will notice" | Other AI users will. The patterns are obvious once you know them. |
| "I'll clean it up later" | You won't. Run the check now. 30 seconds. |
| "This is internal, not client-facing" | Internal docs set the standard. If your docs are sloppy, your output will be too. |
