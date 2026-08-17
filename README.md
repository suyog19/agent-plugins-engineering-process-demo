# Agent Plugins Engineering Process Demo

A small, concrete demonstration of the idea that an engineering procedure can be packaged as a portable, versioned agent capability.

This repository is itself an **Agent Plugins 1.0** package. It contains one portable Agent Skill, `architecture-review`, plus a deliberately small demo application with repository-local architecture rules.

The point is the separation:

- **The plugin packages the reusable engineering procedure.**
- **The repository supplies the architecture and change-specific context.**

That lets the same review procedure travel while each codebase keeps its own architecture rules close to the software.

## Repository structure

```text
.
├── plugin.json
├── skills/
│   └── architecture-review/
│       └── SKILL.md
└── demo/
    ├── ARCHITECTURE.md
    └── sample-change/
        ├── checkout/
        │   └── checkout-service.ts
        ├── domain/
        │   └── order.ts
        ├── ports/
        │   └── payment-gateway.ts
        └── providers/
            └── stripe-client.ts
```

## What the demo contains

`skills/architecture-review/SKILL.md` defines a reusable review procedure. It tells an agent to establish the exact review scope, load repository-local architecture evidence, inspect boundaries and dependency direction, distinguish documented rules from inference, and report only material architecture findings.

`demo/ARCHITECTURE.md` defines the local architecture for the sample application. Among other things, checkout code must depend on the `PaymentGateway` port rather than a concrete provider, and provider-specific types must not cross the checkout boundary.

`demo/sample-change/checkout/checkout-service.ts` is intentionally problematic. The demo is designed so the architecture-review skill has real repository evidence to reason against rather than a canned answer embedded in the skill.

## Install with GitHub Copilot CLI

GitHub Copilot CLI supports installing a plugin directly from the root of a GitHub repository:

```bash
copilot plugin install suyog19/agent-plugins-engineering-process-demo
```

Verify the installation:

```bash
copilot plugin list
```

Start an interactive Copilot CLI session from a clone of this repository and confirm the skill is available:

```text
/skills list
```

Then invoke the review explicitly:

```text
Use /architecture-review to review demo/sample-change/checkout/checkout-service.ts against demo/ARCHITECTURE.md. Focus only on architecture, not general code style.
```

If another installed plugin defines a skill with the same name, GitHub Copilot CLI supports plugin-qualified skill names; use the qualified `architecture-review` entry shown by `/skills list`.

## What to look for

The useful part of the demonstration is not whether the agent can recite a generic architecture checklist. Look at whether it:

1. reads the local architecture rules before judging the change,
2. ties findings to exact code evidence,
3. identifies violations of documented boundaries,
4. separates documented rules from architectural inference, and
5. recommends a correction consistent with the existing `PaymentGateway` abstraction.

The same plugin procedure can then be applied to a different repository whose local architecture rules are entirely different.

## Suggested screenshots for the accompanying article

For a compact article demo, capture three images:

1. **Package** — the repository tree showing `plugin.json`, `skills/architecture-review/SKILL.md`, and `demo/ARCHITECTURE.md`.
2. **Install** — the successful `copilot plugin install ...` output plus the plugin/skill listed in Copilot CLI.
3. **Execute** — the architecture review output showing findings tied to `demo/ARCHITECTURE.md` and `checkout-service.ts`.

Together they show the full idea: **package → install → apply portable process to local engineering context**.

## Standards used

The package follows:

- [Agent Plugins 1.0](https://agent-plugins.org/) — portable plugin package format.
- [Agent Skills specification](https://agentskills.io/specification) — `SKILL.md` format used by the packaged review procedure.
- [GitHub Copilot CLI plugin documentation](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) — direct repository installation and plugin/skill discovery.

## Scope

This is intentionally a small demonstration, not a production architecture-governance framework. It does not claim that a natural-language review is deterministic or that installing a plugin replaces architecture tests, CI gates, or human judgement for consequential decisions.

Its narrower claim is easier to test: **a reusable engineering procedure can be packaged once and installed as an agent capability, while repository-specific engineering context remains local to the codebase.**

## License

MIT
