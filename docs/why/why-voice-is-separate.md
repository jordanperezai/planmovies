# Voice separation

## The problem

When identity and voice share a file, the voice signal gets diluted by operational noise. SOUL.md accumulates The Constraint, failure modes, opinions, execution loop instructions. The voice rules (casing, punctuation, rhythm, banned words) get buried. The agent reads SOUL.md, internalizes the identity, and sounds like every other agent.

This happened in an earlier production project. Strong SOUL.md. Clear identity. The agent still sounded like default Claude. No archetype. No rhythm. No Kill List. The identity was there but the voice wasn't because the voice instructions were 5 paragraphs down in a file the agent was reading for operational guidance.

## The convergence

Three independent projects arrived at the same separation without coordinating:

**soul.md (aaronjmars):** SOUL.md + STYLE.md. Identity in one file, stylistic rules in another. The earliest public example of the split.

**Hermes Agent (Nous Research, 96K stars):** SOUL.md is the first element in the system prompt. It completely replaces the built-in default identity text. But voice-level rules (casing, rhythm, vocabulary) live in skill configuration and persona settings, not SOUL.md.

**OpenClaw (358K stars):** IDENTITY.md + SOUL.md as distinct layers. Identity is the broad character. SOUL.md carries deeper personality and philosophical grounding.

**A character agent project:** VOICE.md at 332 lines. Archetype ("first-century rabbi who works with his hands"), mechanical rules (all lowercase, periods as breathing, contractions as register control), Kill List (41 banned patterns), canonical test exchanges (5 input/output pairs that define correct voice), register shifts (comforting vs confronting vs teaching). The result: the one agent across all production projects that sounds unmistakably alive.

**A production project (control case):** Had SOUL.md. Did not have VOICE.md. Agent had clear identity but generic voice. Added VOICE.md after the character agent comparison. Immediate improvement.

## Why voice is its own cognitive task

Identity and voice activate different parts of the instruction-following process.

Identity answers: what do I believe? What's my constraint? What are my failure modes? These are decision-making inputs. They shape what the agent does.

Voice answers: what words do I use? What's my sentence rhythm? What do I never say? These are generation-time constraints. They shape how the agent outputs.

When both live in the same file, the agent optimizes for one or the other. In practice it optimizes for identity (the decision-making inputs feel more important) and the voice rules get treated as optional guidance.

Separating them forces the agent to load voice rules as their own cognitive task. VOICE.md is read after SOUL.md but before any work begins. The voice has its own attention budget.

## The Kill List is the most important section

It's easier to define voice by what it's NOT than by what it is. "Sound like a 10-year shop foreman" is vague. "Never say 'I hear you, that must be hard'" is precise. "Never use em-dashes" is mechanical. "No throat-clearing openers: 'Here's the thing,' 'It turns out,' 'Look'" is actionable.

The Kill List is where voice compliance jumps from 60% to 90%. Positive rules ("be direct") are interpreted loosely. Negative rules ("never say X") are binary. The agent either said the banned thing or it didn't.

That character agent's Kill List has 41 entries across 11 categories. It's the longest section in VOICE.md. It's also the reason the agent sounds different from every other AI agent.

## Implementation in Zordon

SOUL.md = WHO the agent is. Identity, The Constraint, execution loop, opinions, failure modes.
VOICE.md = HOW the agent sounds. Archetype, mechanical rules, Kill List, canonical test exchanges, register shifts.

Both are Layer 1 (always loaded, every session). Both are core (not extensions). The separation is not optional.

The canonical test exchanges in VOICE.md are the voice equivalent of unit tests. Any voice change that breaks these exchanges is wrong. They define "correct" output for 4-5 specific inputs.
