# Why autonomous skills need proof

The escalation ladder has four rungs:

```
Convention    documented rule, agent follows if it remembers
Skill         codified workflow, loads with context and anti-rationalization
Hook          structural enforcement, fires automatically on tool call
Autonomous    runs without human present, on schedule, with proof
```

Most frameworks stop at skill. A few reach hook. None reach autonomous with proof.

## The problem autonomous solves

Hooks fire during sessions. But what about maintenance that should happen between sessions? LEARNINGS.md growing past its 15-entry cap. Council memories drifting past 20 entries. The Alpha Vault finding patterns better than current implementations. Memory entries going stale.

These are real work that degrades the environment if nobody does them. In a human team, this is the ops person who cleans up after everyone leaves. In an agent system, it's a scheduled skill with proof.

## Why proof is non-negotiable

An autonomous agent that runs without proof is a liability. "The cleanup ran" means nothing without evidence of what changed. Three requirements:

1. **Authorization gate.** The script checks WILL.md before executing. If the skill isn't listed as an authorized job, it refuses and notifies. You control what runs by editing WILL.md, not by editing cron.

2. **Output capture.** The full skill output is written to a proof file. Not a summary. The complete output. If something went wrong, you can read exactly what happened.

3. **Notification.** Results sent via message.sh (Telegram, Slack, or SMS). You know it ran. You know the outcome. You don't have to check.

Authorization + proof + notification = Verified Autonomy (Molecule #7 in the Agent Collider).

## The implementation

One bash script: `infra/auto-skill.sh`. Zero dependencies beyond bash and curl.

```
auto-skill.sh "/declutter" "Monthly cleanup"
    |
    v
1. grep WILL.md for "/declutter"
   NOT FOUND -> block, notify "BLOCKED: not in WILL.md"
   FOUND -> continue
    |
    v
2. claude --print "Run /declutter and report findings"
    |
    v
3. Capture output to autonomous/YYYY-MM-DD-HHMM-declutter.md
    |
    v
4. message.sh "[OK] Monthly cleanup -- pruned 3 entries"
```

Schedule it however you want:

| Platform | How |
|---|---|
| macOS | launchd plist in ~/Library/LaunchAgents/ |
| Linux | crontab -e |
| Windows | WSL cron or Task Scheduler |
| Cloudflare | Cron Triggers |

## Why this matters

The escalation ladder is Zordon's enforcement model. Each rung is a different answer to "how do we make sure this happens?"

| Rung | Enforcement | Failure mode it prevents |
|---|---|---|
| Convention | Agent reads the rule | Forgetting (40% compliance) |
| Skill | Agent loads the procedure | Reinventing (skill carries learned patterns) |
| Hook | System fires automatically | Skipping (can't forget what fires by itself) |
| Autonomous | System runs without human | Neglecting (maintenance happens even when nobody's working) |

No other framework in 559 evaluated sources implements the autonomous rung with proof. Hermes Agent crystallizes skills (rung 2). OpenClaw has hooks (rung 3). None chain authorization + execution + proof + notification into a zero-dependency script that runs unattended.

The environment maintains itself. That's the promise of "smart environment, not smart agent." The agent is disposable. The environment compounds. And now the environment cleans itself.

## The escalation trigger

When does a hook become an autonomous job?

A hook fires during sessions when a tool is called. An autonomous job fires between sessions on a schedule. The promotion trigger: **the maintenance would not happen if you waited for a session.**

- LEARNINGS pruning? You'd only remember during /wrap-up. But if you skip a session, the cap drifts. Autonomous.
- Council memory caps? Same. Nobody checks unless prompted. Autonomous.
- Alpha Vault scans? You'd never think to run it mid-session. Autonomous.
- Structural alignment? /tune should run monthly whether or not you're working. Autonomous.

If the maintenance is important enough to have a skill for, and it's mechanical enough to run without judgment, and neglecting it degrades the environment: make it autonomous.
