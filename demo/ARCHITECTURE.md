# Demo Architecture

This directory contains a deliberately small checkout example used to demonstrate the portable `architecture-review` skill.

The application follows a simple ports-and-adapters boundary.

## Dependency rules

1. Code under `checkout/` may depend on `domain/` and `ports/`.
2. Code under `checkout/` must not import concrete implementations from `providers/` directly.
3. Provider-specific types must not appear in the public API of `checkout/`.
4. External provider errors must be translated into application/domain-level results before crossing the checkout boundary.
5. Concrete provider implementations belong behind interfaces defined under `ports/`.

These rules are intentionally local to this demo application. The Agent Plugin supplies the review procedure; this file supplies the repository-specific architecture against which the procedure should reason.
