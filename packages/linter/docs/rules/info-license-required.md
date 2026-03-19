---
title: info-license-required
ruleId: "@godark/typespec-linter/info-license-required"
description: "Require OpenAPI info.license.name on service namespaces."
recommended: true
severity: warning
---

# info-license-required

Requires service metadata to include a license name in OpenAPI info.

## Rule details

- Applies to service namespaces.
- Resolves `@info(...)` and verifies `license.name` is declared.
- Supports legal/compliance workflows that depend on explicit API licensing metadata in published specs.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0" })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0", license: #{ name: "MIT" } })
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
    "@godark/typespec-linter/info-license-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/info-license-required": true
```
