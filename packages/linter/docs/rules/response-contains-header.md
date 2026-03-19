---
title: response-contains-header
ruleId: "@godark/typespec-linter/response-contains-header"
description: "Require at least one response header when a response includes a body."
recommended: true
severity: warning
---

# response-contains-header

Requires body-bearing responses to model protocol metadata through at least one header.

## Rule details

- Applies only to responses that include a body.
- Flags responses that define payloads but no headers.
- Encourages explicit metadata modeling for request IDs, pagination cursors, caching, and observability.

## Examples

```typespec
// Bad example
model Ok { @statusCode code: 200; @body body: string; }
@route("/pets") @get op read(): Ok;

// Good example
model Ok { @statusCode code: 200; @header etag: string; @body body: string; }
@route("/pets") @get op read(): Ok;
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/response-contains-header": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/response-contains-header": true
```
