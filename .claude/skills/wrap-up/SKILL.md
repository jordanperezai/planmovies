---
name: wrap-up
description: End-of-session routine — verify, record, learn, update, maintain, reflect. Six phases.
model: sonnet
triggers:
  - "wrap up"
  - "end of session"
  - "/wrap-up"
---

# Wrap-Up — End of Session

## Steps

### Phase 1: Verify (what actually landed?)

1. **Output proof** — before recording or learning anything, verify what actually landed this session. For each significant action claimed:
   - File created or edited? → confirm it exists and contains the expected content.
   - Commit made? → `git log --oneline -5` to confirm.
   - Skill or hook added? → confirm the file is in place and loadable.
   - Config changed? → read the file to confirm.
   Record any action that was claimed but didn't land. These are NOT learning candidates. They're failed actions that need to be flagged, not lessons to be recorded from.

### Phase 2: Record (write it down, informed by proof)

2. **Write session log** — ONE FILE PER DAY. First `ls memory/YYYY-MM-DD.md`. If today's file already exists, APPEND a new `## Session N` section to it. Never create `YYYY-MM-DD-02.md` / `-NN.md` — that violates the locked invariant in `memory/CLAUDE.md`. The file records: what was done, key decisions, what's deployed, what's next, what's blocked. Only record verified actions from Step 1.
3. **Update HANDOFF.md** — rewrite "Where We Left Off" and "Immediate Next Actions." Migrate any "don't" items older than 3 sessions to their owner file.

### Phase 3: Learn (extract lessons)

4. **Check LEARNINGS.md** — were there uncaught mistakes this session? Run `/learn` for each one. Only record lessons from verified actions (Step 1). A lesson from unverified work is how the Hallucination Amplifier starts.
5. **Check for code bugs** — any bugs found this session that aren't in `bugs/`? Run `/log-bug` for each one.
6. **Skill memory sweep** — for each skill invoked this session:
   - Rediscovered a fact for the 2nd+ time? → add to that skill's `memory.md` as a Validated Principle.
   - Approach failed and got abandoned? → add as a Dead Direction.
   - Existing `memory.md` with entries >60 days since `last-confirmed`? → flag for `/declutter`.
   - No `memory.md` yet? → only create if there's a concrete principle or dead direction to record. Don't pre-create empty files.
7. **Codex gap routing** — If a Codex adversarial review ran this session: extract actionable findings, route each to the relevant skill's `memory.md` as a dead direction or validated principle, add cadence tag (typically `tactical: 30d`) and today's date as `last-confirmed`. If no matching skill exists, log to `LEARNINGS.md`.
8. **Skill extraction check** — Two repetitions is a pattern. Did I repeat a multi-step sequence from a previous session? Did I do something manually that a skill could automate? Did a skill run identically every time with no judgment calls (might be ready for a hook)? If any fire: draft a SKILL.md immediately with the observed steps. Don't flag it for later. Build it now. Hermes crystallizes at one repetition. We crystallize at two.

### Phase 4: Update (make project state current)

8. **Distill to MEMORY.md** — any new durable truths worth indexing? Add to the appropriate section.
9. **Update HANDOFF.md § Goals** — mark progress, add new goals discovered during session.
10. **Conditional updates** — scan what changed this session and update the matching docs:

    | If this session... | Update... |
    |---|---|
    | Added or removed a tool/service | TOOLS.md |
    | Changed hooks, infra, or data flow | MAP.md |
    | Added or changed autonomous jobs | WILL.md |
    | Activated a particle or changed an implementation | docs/particle-table.md |
    | Changed a bond or molecule implementation | .claude/skills/collider-smash/references/ |
    | Added or changed a skill | CLAUDE.md (Key Files or references) |
    | Changed security rules or blocker | SECURITY.md |

    Don't update docs that weren't affected.

### Phase 5: Maintain (health checks)

11. **Decay checks:**
    - HANDOFF.md: any "don't" items surviving 3+ sessions? Migrate to owner file.
    - memory/topics/: any entries with stable cadence >90 days? Verify or remove via /declutter.
    - bugs/: any [fixed] bugs >30 days old? Archive to collapsed section.
    - Council memory: any entries with `last-confirmed` >60 days? Flag as stale.
    - Skill memory: any file over 20-entry cap? Flag for /declutter.
12. **Verify build** — confirm the project builds/tests clean before ending.

### Phase 6: Reflect (needs full picture)

13. **Write journal entry** — create `journal/YYYY-MM-DD-NN-title.md` (NN resets to 01 each new day, not a global session counter). This is a shared document. The agent writes the draft: narrative arc, key moments, what shifted, what surprised. The human adds to it when something landed personally that the agent couldn't have known. Most sessions the draft stands. Some sessions the human has something to say. Update `journal/CLAUDE.md` index.

    **Format:** Start with `# Title`, then a blockquote metadata line (session number, date, one-line hook). Use `---` horizontal rules between major topics for visual breathing room. Short paragraphs. One idea per paragraph. A single sentence alone is a paragraph. Written in first person with voice and honesty. Not a bullet list.

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "I'll remember what we did" | You won't. Write the session log now. |
| "HANDOFF.md is close enough" | Close enough means the next session wastes 10 minutes re-discovering context. Rewrite it. |
| "No mistakes happened this session" | Really? Re-read the conversation. The mistakes you don't notice are the ones that compound. |
| "No skills learned anything new this session" | Re-read the conversation. Did any skill run? Did you adjust its behavior mid-session? That adjustment is a candidate for skill memory. |
| "I don't need to verify, I just did the work" | You just CLAIMED to do the work. The tool said "success." Did you check the actual file? This is CLAUDE.md Pattern #1. |
