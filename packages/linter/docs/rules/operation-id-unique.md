---
title: operation-id-unique
ruleId: "@godark/typespec-linter/operation-id-unique"
description: "Require explicit operationId values to be unique across all operations."
recommended: true
severity: warning
---

# operation-id-unique

Requires explicit `operationId` values to be unique across the API surface.

## Rule details

- Collects explicit operation IDs from all operations.
- Fails when a previously used ID appears again.
- Enforces uniqueness globally, not per namespace.
- Prevents collisions in generated clients, documentation indexes, and operation lookup tooling.

## Examples

```typespec
// Bad example
@operationId("list-pets")
@route("/pets")
@get
op listPets(): Pet[];

@operationId("list-pets")
@route("/stores/{storeId}/pets")
@get
op listStorePets(@path storeId: string): Pet[];

// Good example
@operationId("list-pets")
@route("/pets")
@get
op listPets(): Pet[];

@operationId("list-store-pets")
@route("/stores/{storeId}/pets")
@get
op listStorePets(@path storeId: string): Pet[];
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/operation-id-unique": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/operation-id-unique": true
```
