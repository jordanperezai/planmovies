# PlanMovies

Group movie coordination platform. Send one link, collect RSVPs, assign seats, track payments, go to the movie together.

## First Event

Disclosure Day at Regal Secaucus. Family and friends group.

## Architecture

Single HTML file (`index.html`) hosted on Cloudflare Pages at planmovies.com. Supabase for data, Stripe for payments, Cloudflare Worker for ticket monitoring, Telegram for alerts.

## Development

No build step. Open `index.html` in a browser. Push to main to deploy.

## Agent Framework

This project uses the Zordon scaffold for agent-native development. See `CLAUDE.md` for the operating manual.
