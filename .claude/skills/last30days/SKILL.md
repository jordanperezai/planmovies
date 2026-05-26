---
name: last30days
description: "What are people saying about a topic right now? Exa neural search with date filtering across Reddit, X, HN, and forums. Verbatim quotes, themes, sentiment."
model: sonnet
triggers:
  - "last 30 days"
  - "what are people saying about"
  - "recent sentiment"
  - "what's the buzz on"
  - "/last30days"
---

# Last 30 Days -- Recent Sentiment Scan

What are real people saying about a topic right now? Not articles. Not marketing. Actual discussions from the last 30 days.

Different from /deep-research (comprehensive landscape, strategy docs). This is narrower: recency, sentiment, verbatim quotes.

## When to use

- Before building something: is the market already talking about this problem?
- After launching: what are people saying about the change?
- Competitor intel: what are users complaining about?
- Trend detection: what's gaining traction in your space?

## Step 1 -- Define the topic

Be specific. Not "AI agents" but "complaints about AI agent memory loss between sessions." The more specific, the better the signal.

## Step 2 -- Search recent sources

Use Exa neural search with date filtering. Calculate the date 30 days ago and use `startPublishedDate`.

### Exa pattern for recency

```bash
curl -X POST "https://api.exa.ai/search" \
  -H "x-api-key: $EXA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "YOUR QUERY",
    "type": "neural",
    "numResults": 10,
    "startPublishedDate": "2026-04-15T00:00:00.000Z",
    "contents": {
      "text": {"maxCharacters": 2000}
    }
  }'
```

Run parallel searches with `includeDomains` filtering:

| Agent | includeDomains | Best for |
|---|---|---|
| **Reddit** | `["reddit.com"]` | Long-form opinions, complaints, real experience |
| **X/Twitter** | `["x.com", "twitter.com"]` | Hot takes, announcements, viral threads |
| **Hacker News** | `["news.ycombinator.com"]` | Technical opinions, founder perspectives |
| **Forums** | None (broad, topic-specific query) | Niche community discussion |

If `EXA_API_KEY` is missing, fall back to WebSearch with `site:` filtering. Quality drops significantly for X (most crawlers are blocked).

## Step 3 -- Collect verbatim quotes

For each relevant discussion found:
- Copy the **exact words** people used (verbatim, in quotes)
- Note engagement signals (upvotes, replies, shares)
- Note the source and approximate date
- Flag quotes that surprise you or contradict assumptions

## Step 4 -- Report

```markdown
# Last 30 Days: [Topic]

**Date:** YYYY-MM-DD
**Sources searched:** [list]
**Total discussions found:** N

## Themes
[Group findings by theme. 3-5 themes max.]

### Theme 1: [Name]
- "[verbatim quote]" -- [source, engagement]
- "[verbatim quote]" -- [source, engagement]
**Takeaway:** [one sentence]

## Sentiment
[Overall: positive/negative/mixed. What's the dominant feeling?]

## Surprises
[What did you not expect to find?]

## Strategic Takeaways
[What should we do with this information?]
```

Save to `research/YYYY-MM-DD-[topic].md`. If multiple entries exist for the same day, use `YYYY-MM-DD-NN-[topic].md` (01, 02, etc.). Update `research/CLAUDE.md` index.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I already know what people think" | You know what you think people think. The quotes will surprise you. |
| "Nobody is talking about this" | That's a finding. If nobody is talking about your problem, you're either too early or solving the wrong thing. |
| "Reddit/X isn't representative" | It's not representative of everyone. It IS representative of the people who care enough to write about it. Those are your early adopters or loudest critics. |
| "/deep-research already covers this" | /deep-research is comprehensive and strategic. This is a quick pulse check. Different tools for different questions. |
