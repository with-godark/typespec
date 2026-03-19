---
title: operation-id-kebab-case
ruleId: "@godark/typespec-linter/operation-id-kebab-case"
description: "Require operationId values to use lower-kebab-case."
recommended: true
severity: warning
---

# operation-id-kebab-case

Requires lower-kebab-case formatting for operation IDs.

## Rule details

- Resolves operation ID values for operations.
- Requires lowercase letters/digits separated by single hyphens.
- Fails camelCase, snake_case, spaced, or uppercase variants.
- Keeps generated client method names predictable across language targets.

## Examples

```typespec
// Bad example
@operationId("getPet")
@route("/pets/{id}")
@get
op read(@path id: string): Pet;

// Good example
@operationId("get-pet")
@route("/pets/{id}")
@get
op read(@path id: string): Pet;
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/operation-id-kebab-case": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/operation-id-kebab-case": true
```
