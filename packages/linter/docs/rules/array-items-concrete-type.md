---
title: array-items-concrete-type
ruleId: "@godark/typespec-linter/array-items-concrete-type"
description: "Require array properties to declare concrete item types."
recommended: true
severity: warning
---

# array-items-concrete-type

Requires concrete array item types so validators and generated clients can safely process list payloads.

## Rule details

- Inspects model properties that resolve to array shapes.
- Rejects unconstrained item types such as `unknown` and `any`.
- Ensures generated schemas carry enough structure for validation, code completion, and typed deserialization.

## Examples

```typespec
// Bad example
model PetCollection {
  pets: unknown[];
}

// Good example
model PetCollection {
  pets: Pet[];
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
    "@godark/typespec-linter/array-items-concrete-type": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/array-items-concrete-type": true
```
