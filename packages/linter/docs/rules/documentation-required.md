---
title: documentation-required
ruleId: "@godark/typespec-linter/documentation-required"
description: "Require non-empty @doc text on operations, models, and enums."
recommended: true
severity: warning
---

# documentation-required

Requires descriptive `@doc(...)` text on core declarations so generated API artifacts stay explainable.

## Rule details

- Checks operations, models, and enums that become public contract surface.
- Fails when `@doc` is missing or resolves to empty/whitespace text.
- Preserves intent in generated OpenAPI descriptions and generated client reference documentation.

## Examples

```typespec
// Bad example
enum OrderStatus {
  pending,
  shipped
}

// Good example
@doc("Lifecycle states for an order.")
enum OrderStatus {
  pending,
  shipped
}
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/documentation-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/documentation-required": true
```
