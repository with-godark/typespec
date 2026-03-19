---
title: operation-summary
ruleId: "@godark/typespec-linter/operation-summary"
description: "Require every operation to include a summary."
recommended: true
severity: warning
---

# operation-summary

Requires every operation to include a concise human-readable summary.

## Rule details

- Applies to all operations.
- Fails operations that do not define summary metadata.
- Improves operation discoverability in generated documentation, API explorers, and generated client reference views.

## Examples

```typespec
// Bad example
@route("/pets/{id}")
@get
op getPet(@path id: string): Pet;

// Good example
@summary("List pets")
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
    "@godark/typespec-linter/operation-summary": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/operation-summary": true
```
