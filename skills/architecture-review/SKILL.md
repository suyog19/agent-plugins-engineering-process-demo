---
name: architecture-review
description: Review a proposed software change for architecture boundary violations, dependency-direction problems, public contract impact, unnecessary coupling, and missing architectural justification. Use when asked for an architecture review, design review, dependency review, or architectural assessment of a change.
license: MIT
metadata:
  author: suyog19
  version: "1.0.0"
---

# Architecture Review

Review the requested software change as an architecture reviewer. Focus on architectural consequences rather than general code style.

## 1. Establish the review scope

Use the exact files, diff, pull request, commit, or directory named by the user. If the user names no explicit scope and a Git diff is available, review the current change rather than the whole repository.

Do not broaden the review unnecessarily.

## 2. Load repository-local architecture context

Before judging the change, look for architecture evidence that applies to the review scope, including files such as:

- `ARCHITECTURE.md`
- `README.md`
- `AGENTS.md`
- architecture decision records (ADRs)
- module or package documentation
- dependency rules or architecture tests

Treat explicit repository rules as authoritative for that repository. Do not invent local architecture rules that are not supported by repository evidence.

## 3. Review the change

Check the change for materially relevant issues in these areas:

### Architecture boundaries

- Does the change cross a documented module, layer, service, or ownership boundary incorrectly?
- Does a higher-level module depend directly on implementation details that should remain behind an abstraction?
- Does the change bypass an existing port, interface, façade, or orchestration boundary?

### Dependency direction

- Are new dependencies consistent with documented dependency direction?
- Does the change introduce a dependency cycle or reverse an intended dependency relationship?
- Is infrastructure or vendor-specific code leaking into domain or application layers?

### Public contracts

- Does the change expose an implementation-specific type, protocol, or dependency through a public boundary?
- Does it alter an API, event, schema, interface, or other consumer-visible contract?
- If a contract changes, is compatibility or migration impact addressed?

### Coupling and responsibility

- Does the change create unnecessary coupling between modules that should evolve independently?
- Is responsibility moving into a layer that should not own it?
- Is a shared abstraction being introduced without evidence that the reuse boundary is stable?

### Architectural justification

- If the change intentionally departs from an existing architecture rule, is the departure explicitly justified?
- Would the change require an ADR, architecture-document update, or another durable record?

## 4. Separate evidence from inference

For every finding, distinguish between:

- **Documented rule** — supported by repository architecture documentation or an explicit contract.
- **Observed fact** — directly visible in the reviewed change.
- **Inference** — a likely architectural consequence that is not explicitly documented.

Do not present an inference as an established repository rule.

## 5. Report only material findings

Prioritize issues that affect architecture, coupling, contracts, changeability, or operational risk. Do not turn the review into a general lint or style review.

Use these severities:

- **High** — violates a documented boundary or creates a significant contract/coupling risk.
- **Medium** — introduces a meaningful architectural concern that should be resolved or explicitly justified.
- **Low** — a smaller architectural concern or documentation gap worth addressing.

## Output

Start with a one-sentence assessment, then list findings from highest to lowest severity.

For each finding include:

1. **Severity and title**
2. **Evidence** — exact file/path and relevant code or configuration
3. **Architecture basis** — the documented rule, observed fact, or clearly labelled inference
4. **Why it matters**
5. **Recommended action**

If no material architectural findings are supported by the evidence, say so explicitly.
