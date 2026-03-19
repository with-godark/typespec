---
title: boolean-parameter-prefix
ruleId: "@godark/typespec-linter/boolean-parameter-prefix"
description: "Require clear prefixes for boolean operation parameters."
recommended: true
severity: warning
---

# boolean-parameter-prefix

Requires semantic prefixes on boolean parameters so intent stays obvious in specs and generated clients.

## Rule details

- Targets boolean query/path parameters exposed by operations.
- Accepts only these prefixes: `is`, `has`, `can`, `should`, `enable`, `include`.
- Produces clearer generated client method signatures where boolean arguments read like explicit conditions.

## Examples

```typespec
// Bad example
@route("/pets")
@get
op listPets(@query active: boolean): Pet[];

// Good example
@route("/pets")
@get
op listPets(@query isActive: boolean): Pet[];
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/boolean-parameter-prefix": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/boolean-parameter-prefix": true
```
