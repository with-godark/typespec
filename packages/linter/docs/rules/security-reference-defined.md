---
title: security-reference-defined
ruleId: "@godark/typespec-linter/security-reference-defined"
description: "Require declared authentication options to reference concrete security schemes."
recommended: true
severity: warning
---

# security-reference-defined

Requires operation authentication metadata to reference concrete, declared security schemes.

## Rule details

- Applies to operations that define authentication requirements.
- Fails auth options that contain no referenced schemes.
- Prevents publishing auth declarations that appear enforced but are not implementable by clients.

## Examples

```typespec
// Bad example
@route("/pets")
@get
@useAuth()
op read(): Pet[];

// Good example
@route("/pets")
@get
@useAuth(ApiKeyAuth<ApiKeyLocation.header, "x-api-key">)
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
    "@godark/typespec-linter/security-reference-defined": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/security-reference-defined": true
```
