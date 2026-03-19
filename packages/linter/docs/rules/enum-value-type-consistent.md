---
title: enum-value-type-consistent
ruleId: "@godark/typespec-linter/enum-value-type-consistent"
description: "Require enum literal values to use a single consistent type."
recommended: true
severity: warning
---

# enum-value-type-consistent

Requires enum literal values to stay in one type domain across the declaration.

## Rule details

- Uses the first explicit literal value as the baseline for value typing.
- Fails later members that switch between number and string literals.
- Prevents mixed-type enum serialization patterns that break strongly typed client bindings.

## Examples

```typespec
// Bad example
enum Mixed {
  One: 1,
  Two: "2"
}

// Good example
enum Mixed {
  One: 1,
  Two: 2
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
    "@godark/typespec-linter/enum-value-type-consistent": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/enum-value-type-consistent": true
```
