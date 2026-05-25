# TOOLS.md -- What We Actually Use

> **Purpose:** Quick reference of tools in production. If it's not actively running, it's not here.
> **Read:** When evaluating a new tool or checking what's available.
> **Write:** When a tool is adopted, dropped, or changes status.
> **Not for:** Evaluations or research (-> research/). Cap: 150 lines.

## Infrastructure

| Tool | What it does | Status |
|------|-------------|--------|
| **Cloudflare Pages** | Hosts planmovies.com. Auto-deploys from GitHub main branch. | Active |
| **Cloudflare Workers** | Runs ticket-monitor for availability checks + Telegram alerts. | Active |
| **Supabase** | Postgres database for RSVPs, seat assignments, user data. Free tier. | Active |
| **Stripe** | Payment collection from group members. Checkout sessions. | Active |
| **Telegram Bot API** | Sends ticket availability alerts to Jordan. | Active |
| **GitHub** | Source control. github.com/jordanperezai/planmovies | Active |
| **Claude Code** | Primary AI coding agent. Reads CLAUDE.md, runs skills, fires hooks. | Active |
| **git** | Version control. All .md files are git-tracked. | Active |

## Evaluated and Decided

| Tool | Verdict | Why |
|------|---------|-----|
| *Build tooling (Vite, etc.)* | Skip | Single HTML file is intentional. No build step needed. |
