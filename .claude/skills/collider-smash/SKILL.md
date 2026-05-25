---
name: collider-smash
description: Smash the Agent Collider taxonomy against this project. Three levels -- particles (46 capability + 8 document), bonds (13), molecules (7). Run monthly alongside /declutter.
model: sonnet
triggers:
  - "collider smash"
  - "smash"
  - "structural integrity"
  - "check particles"
  - "check bonds"
  - "/collider-smash"
---

# Collider Smash: Full Structural Verification

The Agent Collider names 46 capability particles, 8 document particles, 13 bonds, and 7 molecules. This skill smashes that taxonomy against your project and reports what survived.

Run monthly alongside /declutter. Also run after any skill rewrite, security change, or scaffold update.

## Phase 1: Particles (do they exist?)

1. **Load the particle registry.** Read `references/particles.md` for the canonical 46 capability particles and 8 document particles. Then read `docs/particle-table.md` for this project's implementation status. For each particle, confirm its status:
   - **ACTIVE**: implemented and exercised in this project.
   - **PRESENT**: file/skill exists but not yet exercised.
   - **EXTENSION**: available with minimal setup.
   - **EXTERNAL**: handled by the hosting platform.
   - **MISSING**: no implementation path. (Should be zero in a morphed project.)

2. **Spot-check active particles.** For 3-5 active particles, verify the implementation is real: does the file exist? Does the skill run? Is the hook configured? Don't check all 46 every time. Rotate which ones get spot-checked.

3. **Flag status changes.** Compare against last run (if available). Did any particle move from active to present (regression)? From present to active (progress)? Update the particle table if needed.

## Phase 2: Bonds (are they connected?)

4. **Load the bond registry.** Read `references/bonds.md` for all 13 known bonds. A bond between two "active" particles should be fully verifiable. A bond where one or both particles are "present" gets marked DORMANT.

5. **Verify each bond.** Run the concrete verification check listed in the registry. For each bond, record:
   - **INTACT**: verification passed.
   - **DEGRADED**: connection exists but weakened (step renamed, grep match is indirect).
   - **BROKEN**: verification failed. Connection is missing.
   - **DORMANT**: particles exist but aren't active yet. Plumbing untested.

6. **Bond discovery pass.** Ask: "Did I notice any particle connections NOT in the registry?" Look for skills calling skills, files referencing files in load-bearing ways, hooks guarding something a skill depends on. Add candidates to the **Discovery Queue** in the bond registry. Don't promote directly.

## Phase 3: Molecules (are the patterns assembled?)

7. **Load the molecule registry.** Read `references/molecules.md` for all 7 known molecules. Each molecule is a multi-particle pattern that creates an emergent capability.

8. **Verify each molecule.** For each molecule, check: are all component particles active? Are the bonds between them intact? Is the pattern actually wired together as a functioning unit?

   For each molecule, record:
   - **ASSEMBLED**: all particles active, all bonds intact, pattern is wired and working.
   - **PARTIAL**: some particles active, some bonds intact, but the full pattern isn't functioning as a unit.
   - **DORMANT**: particles exist but the molecule hasn't been activated yet.
   - **BROKEN**: a required particle or bond is missing. The pattern can't work.

   A molecule can fail even if all its individual particles and bonds pass. The pattern has to be wired as a unit, not just exist as independent connections.

9. **Molecule discovery pass.** Ask: "Did I notice any multi-particle patterns NOT in the registry?" A pattern of 3+ particles that work together to create something none of them does alone. Add candidates to the Discovery Queue in the molecule registry.

## Report

10. **Write the report** to the session log and present to the user:

    ```
    ## Collider Smash: YYYY-MM-DD

    ### Particles
    Active: N | Present: N | Extension: N | External: N | Missing: N
    Changes since last run: [list]

    ### Bonds (13)
    | # | Bond | Type | Status |
    |---|------|------|--------|
    | 1 | Captured Insight | Required | INTACT |
    | ... | ... | ... | ... |

    Intact: N | Degraded: N | Broken: N | Dormant: N

    ### Molecules (7)
    | # | Molecule | Status | Missing |
    |---|----------|--------|---------|
    | 1 | Minimum Viable Agent | ASSEMBLED | |
    | ... | ... | ... | ... |

    Assembled: N | Partial: N | Dormant: N | Broken: N

    ### Discovery candidates
    [New bonds or molecules found]

    ### Priority fixes
    [Broken bonds or molecules, what to fix]
    ```

11. **Escalate.** A broken required bond or a broken molecule is a structural failure. Flag as priority fix.

## When to run

- **Monthly** alongside /declutter
- **After skill rewrites** (may break a bond or molecule)
- **After security changes** (hooks are bond implementations)
- **After /morph updates** (scaffold changes shift implementations)
- **After particles are activated** (a new active particle may complete a dormant molecule)

## Anti-Rationalization Table

| Excuse | Reality |
|---|---|
| "All the particles exist so everything must be fine" | Particles are parts. Bonds are connections. Molecules are patterns. You can have every part, every connection, and still have unassembled patterns. |
| "We haven't changed anything, no need to check" | Drift is silent. Context decay after 10+ sessions can erode connections nobody touched. |
| "A degraded bond is still working" | Degraded today, broken next month. Flag it now or fix it later at 10x the cost. |
| "The discovery queue is speculative, skip it" | Every bond and molecule in the registry was speculative once. Discovery is how the taxonomy grows. |
| "Molecules are just bonds grouped together" | No. A molecule can fail even if all its bonds pass. The pattern has to be wired as a unit. |
