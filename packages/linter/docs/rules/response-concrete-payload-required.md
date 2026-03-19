---
title: response-concrete-payload-required
ruleId: "@godark/typespec-linter/response-concrete-payload-required"
description: "Require HTTP response bodies to use concrete payload types."
recommended: true
severity: warning
---

# response-concrete-payload-required

Requires response body payloads to be concrete, typed, and serializable.

## Rule details

- Applies to resolved HTTP responses that include a body.
- Fails body types that are `unknown` or `any`.
- Also fails responses where content types cannot be resolved for the payload.
- Prevents ambiguous OpenAPI payload schemas that weaken validation and client deserialization safety.

## Examples

```typespec
// Bad example
@route("/pets/{id}")
@get
op read(@path id: string): {
  @statusCode code: 200;
  @body body: unknown;
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
    "@godark/typespec-linter/response-concrete-payload-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/response-concrete-payload-required": true
```
