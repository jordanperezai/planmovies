# Autonomous

Proof that autonomous jobs ran. When `infra/auto-skill.sh` runs a skill unattended, the output lands here so you can verify what happened while you weren't watching.

WILL.md defines what jobs are authorized. This directory stores what they produced.

## Structure

One subdirectory per job. One file per run. Dated.

```
autonomous/
  declutter/
    2026-05-15.md
    2026-05-16.md
  collider-smash/
    2026-05-15.md
```

Create the subdirectory on the job's first run.

## How It Works

auto-skill.sh checks WILL.md authorization, runs the skill via Claude Code, captures output here, notifies via message.sh.

## When This Outgrows Markdown

Markdown works for low-volume proof: a few jobs, a few runs per week, a few paragraphs per run. Grep handles queries.

Move to structured storage (JSON files or a database) when any of these happen:
- You need to query across jobs ("every declutter that found items over cap")
- You need to aggregate ("average runtime over 30 days")
- Multiple agents run jobs concurrently and you need to correlate outputs
- A dashboard needs to read job history

The directory structure stays the same. The file format changes.
