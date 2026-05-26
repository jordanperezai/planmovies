# Why Rangers Need Independent Verification

Five voices sharing the same input is one voice with five hats.

## The Evidence

Agent Collider Session 63 ran the same naming decision three times with different ranger setups:

1. **Framed prompt ("Skill Router is dead"):** 6-1 voted to keep Selection
2. **Framed prompt ("Give Router a fair shot"):** 7-0 voted Router
3. **Neutral independent prompt:** 7-0 voted for Routing, a third option nobody was pushing for

The framed rangers contradicted each other. The independent ranger found the real answer. Two takeaways: framing bias is real, and genuine independence produces options that prompted reasoning misses.

## The Problem

Parallel dispatch (spawning independent agents) solves sycophancy. Each voice gives its own answer without seeing the others. But it doesn't solve context homogeneity. All five voices receive the same decision framing, the same memory, the same files. They reason independently but from identical evidence. Their disagreements are interpretation differences, not evidence differences.

This produces manufactured consensus. Five voices agree, the human trusts the agreement, but the agreement only reflects one perspective on one set of inputs. OpenClaw's review ranger approved 800+ malicious skills because every voice reasoned from the same poisoned descriptions. The adversarial structure was theatrical.

## The Fix

Five rules, each addressing a different aspect of the problem:

**Neutral prompts.** No framing about expected outcomes. Each voice gets persona + decision context + candidates. "The team is leaning toward X" is banned from ranger prompts.

**At least one verifier.** One voice per ranger checks actual artifacts (files, git history, live state, metrics) rather than reasoning from the prompt alone. Marked with `(verifier)` in the roster. The verifier's response cites what was checked and what was found.

**Diverse source material.** When possible, split evidence across voices. Voice 1 reads the code. Voice 2 reads the docs. Voice 3 reads the git log. Different evidence produces real disagreements.

**Flag unverified claims.** Peer review (Step 3) asks: "Which claims could be checked against actual files but weren't?" Flagged claims get verified before synthesis.

**Search prior art.** Voices check existing decisions, dead directions, and prior art before forming opinions. Prevents re-suggesting approaches already killed.

## What This Doesn't Fix

These rules improve ranger quality. They don't make rangers a safety mechanism. A ranger that passes these five checks is a rigorous thinking tool. It is not a gate. Gates require automated verification (hooks, tests, type checks). A ranger that feels like a gate is the most dangerous kind of false confidence.

## Sources

- Agent Collider ranger-memory.md, Lines 185-224 (Session 63 evidence)
- Agent Collider tribes-session-model-routing.md (10 independent personas, framing bias documented)
- Zordon-OS rangers/agentic/sessions/agentic-03-alpha-ranger-design.md (Steinberger: "one voice with five hats")
- Alpha Vault ZORDON-ATLAS.md, Concept #17: Challenge-Function gap ("no vault-history search against ideas")
