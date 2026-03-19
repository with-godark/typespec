---
title: enum-no-duplicate-values
ruleId: "@godark/typespec-linter/enum-no-duplicate-values"
description: "Disallow duplicate values within a single enum."
recommended: true
severity: warning
---

# enum-no-duplicate-values

Requires enum members to resolve to unique serialized values.

## Rule details

- Compares each member value against values already declared in the enum.
- Flags duplicates across explicit literals and implicit name-based values.
- Avoids ambiguous payload encoding and duplicate constants in generated client enums.

## Examples

```typespec
// Bad example
enum Status {
  A: "ok",
  B: "ok"
}

// Good example
enum Status {
  A: "ok",
  B: "error"
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
    "@godark/typespec-linter/enum-no-duplicate-values": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/enum-no-duplicate-values": true
```
