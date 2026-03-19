---
title: tag-unique
ruleId: "@godark/typespec-linter/tag-unique"
description: "Disallow duplicate tag assignments on the same operation."
recommended: true
severity: warning
---

# tag-unique

Requires tag values to be unique within a single operation.

## Rule details

- Inspects repeated `@tag(...)` decorators per operation.
- Fails when an operation uses the same tag more than once.
- Keeps OpenAPI tag arrays clean and avoids redundant grouping metadata.

## Examples

```typespec
// Bad example
@route("/pets")
@tag("pet")
@tag("pet")
@get
op read(): Pet[];

// Good example
@route("/pets")
@tag("pet")
@tag("store")
@get
op read(): Pet[];
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/tag-unique": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/tag-unique": true
```
