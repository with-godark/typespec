---
title: operation-id-required
ruleId: "@godark/typespec-linter/operation-id-required"
description: "Require operations to define a non-empty explicit operationId."
recommended: true
severity: warning
---

# operation-id-required

Requires every operation to declare an explicit, non-empty `operationId`.

## Rule details

- Applies to all operations.
- Fails when `@operationId(...)` is missing.
- Fails when `@operationId` is present but empty or whitespace-only.
- Stabilizes generated client method naming across refactors and reduces accidental breaking changes.

## Examples

```typespec
// Bad example
@route("/pets")
@get
op listPets(): Pet[];

// Good example
@operationId("list-pets")
@route("/pets")
@get
op listPets(): Pet[];
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/operation-id-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/operation-id-required": true
```
