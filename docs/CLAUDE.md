# Docs

The intellectual backing behind the scaffold. The scaffold works without reading these. These explain WHY it works.

## What's Here

**particle-table.md** maps every Agent Collider particle to its scaffold implementation. 41 of 46 particles mapped. Start here if you want to understand what the files do and why they exist.

**why/** contains 21 foundational documents. Each explains a design decision: what we tried, what failed, what survived, and why. They cross-reference framework analyses from the Alpha Vault (559+ sources).

**index.md** organizes the why docs by theme (core architecture, what makes Zordon different, knowledge management, self-improvement, decision-making).

## When to Write a Why Doc

When a design decision meets all three criteria:
1. Someone will ask "why did you do it this way?"
2. The answer requires evidence, not just preference
3. The evidence comes from multiple sources (framework analyses, production incidents, failed approaches)

A why doc is not a changelog ("we added X"). It's a thesis with evidence ("we do X because Y, and here's what we tried before").

## Format

```markdown
# Why [thesis stated as a fact]

[Opening: the problem this solves, in concrete terms]

## [Evidence section]
[What we found across frameworks, production incidents, or failed approaches]

## [The design]
[How the scaffold implements this, with specific file/skill references]

## [What happens without it]
[The failure mode this prevents]
```

Prose over bullets. Varied paragraph length. No em-dashes. The why docs are narrative files (doc-narrative archetype).

## Structure

```
docs/
  index.md             Organized by theme
  particle-table.md    46 particles mapped to scaffold files
  why/                 21 foundational documents
```
