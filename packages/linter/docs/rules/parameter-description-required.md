---
title: parameter-description-required
ruleId: "@godark/typespec-linter/parameter-description-required"
description: "Require non-empty @doc text on operation parameters."
recommended: true
severity: warning
---

# parameter-description-required

Requires operation parameters to include meaningful `@doc(...)` descriptions.

## Rule details

- Inspects parameters in each operation parameter model.
- Fails when parameter docs are missing or blank.
- Ensures generated documentation explain parameter intent, expected values, and usage boundaries.

## Examples

```typespec
// Bad example
@route("/pets")
@get
op read(@query isActive: boolean): Pet[];

// Good example
@route("/pets")
@get
op read(@doc("Filter by active flag") @query isActive: boolean): Pet[];
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/parameter-description-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/parameter-description-required": true
```
