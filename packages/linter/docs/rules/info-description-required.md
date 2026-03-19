---
title: info-description-required
ruleId: "@godark/typespec-linter/info-description-required"
description: "Require a non-empty OpenAPI info.description for service namespaces."
recommended: true
severity: warning
---

# info-description-required

Requires service OpenAPI info metadata to include a meaningful, non-empty description.

## Rule details

- Applies only to service namespaces.
- Reads `@info(...)` and validates that `description` exists and is not blank.
- Provides high-level API scope/context in generated documentation beyond a short title.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0" })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0", description: "Public API for pet operations." })
namespace PetApi;
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/info-description-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/info-description-required": true
```
