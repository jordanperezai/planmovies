# Why File Structure Is Taxonomy

The Agent Collider extracted 46 irreducible particles from 400+ frameworks. Each particle answers: what can an agent DO?

Nobody asked the other question: how should an agent STORE what it knows?

---

We ran the same collision methodology on a different dimension. Took 7 frameworks (soul.md, Hermes, GenericAgent, GitAgent, Cursor rules, llms.txt, the Agent Skills Spec) plus 10 Alpha Vault concept pages from 228 sessions of research. Smashed their file structures together. Asked: what survives?

8 file archetypes survived. Every framework uses some subset. No framework uses all 8. Zordon uses all 8.

---

## The 8 Document Particles

| Archetype | What it stores | How it reads | Changes |
|---|---|---|---|
| Identity | WHO the agent is | Prose, felt not enumerated | Rarely |
| Rule | What the agent MUST/MUST NOT do | Bullets, scanned not read | Rarely |
| State | What's true RIGHT NOW | Scannable, rewritten each session | Every session |
| Index | What exists, where to find it | One-liners, read first | When knowledge changes |
| Log | What happened | Append-only, grepped not read | Write-once |
| Skill | HOW to do a procedure | YAML metadata + numbered steps | When skill evolves |
| Reference | Lookup tables, structured knowledge | Consistent fields, independently readable | When taxonomy grows |
| Narrative | What it meant | Prose with voice, horizontal rules | Write-once |

Each archetype has different structural needs. Different section ordering. Different formatting. Different cap behavior. Treating them all the same is the mistake every other framework makes.

---

## Why this is taxonomy, not style

Taxonomy is classification by irreducible type. Style is preference.

Choosing between serif and sans-serif is style. Recognizing that a log file and an identity file are fundamentally different documents with different structural requirements is taxonomy. You can't merge them. You can't substitute one for the other. Each has a function that no other archetype performs.

The Agent Collider proved this for capabilities. You can't merge Learning Loop with Learned Rule. They're irreducible. They serve different functions. Same principle applies to documents. SOUL.md and LEARNINGS.md aren't "both markdown files." They're different archetypes serving different cognitive functions in the agent's operation.

---

## The tiered context loading connection

Alpha Vault's research on tiered context loading (verified at -83 to -92% token reduction) showed that files should support three reading depths:

- L0 (~100 tokens): "Is this relevant?"
- L1 (~2K tokens): "What's in here?"
- L2 (full file): "I need the details."

Here's the connection to taxonomy: each archetype supports these tiers DIFFERENTLY.

An identity file's L0 is the opening statement. A rule file's L0 is the header and first bullet group. A skill file's L0 is the YAML frontmatter. An index file's L0 is its own existence (the index IS the routing layer).

If you structure an identity file like a rule file (all bullets), the L0 tier breaks. The agent can't feel the identity from a bullet list. If you structure a rule file like a narrative (all prose), the L1 tier breaks. The agent can't scan for specific rules in a paragraph.

The archetype determines how tiered loading works. Get the archetype wrong and no amount of formatting fixes it.

---

## What this means for Zordon

Zordon is the first framework to:

1. Name the archetypes explicitly
2. Define structural rules per archetype
3. Ship a structure reference with the scaffold
4. Verify structural integrity (/collider-smash checks particles, bonds, molecules. /declutter checks structural drift.)

The Agent Collider may eventually add document particles as a second dimension. 46 capability particles on one axis. 8 document particles on the other. Every agent framework plots somewhere on both.

---

*8 document archetypes extracted from 7 frameworks + Alpha Vault (228 sessions, 10 concept pages). Collision methodology identical to the Agent Collider's capability taxonomy. Zordon implements all 8.*
