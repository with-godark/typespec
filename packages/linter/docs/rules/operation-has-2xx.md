---
title: operation-has-2xx
ruleId: "@godark/typespec-linter/operation-has-2xx"
description: "Require every operation to define at least one successful 2xx response."
recommended: true
severity: warning
---

# operation-has-2xx

Requires each operation to declare at least one successful 2xx response.

## Rule details

- Resolves HTTP responses for each operation.
- Accepts explicit 2xx status codes and valid 2xx ranges.
- Fails operations that only describe error outcomes.
- Prevents incomplete contracts that omit the primary success path consumers need.

## Examples

```typespec
// Bad example
@route("/pets/{id}")
@get
op read(@path id: string): {
  @statusCode code: 404;
};

// Good example
@route("/pets/{id}")
@get
op read(@path id: string): {
  @statusCode code: 200;
  @body body: Pet;
};
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/operation-has-2xx": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/operation-has-2xx": true
```
