---
title: server-no-trailing-slash
ruleId: "@godark/typespec-linter/server-no-trailing-slash"
description: "Disallow trailing slashes in server URLs."
recommended: true
severity: warning
---

# server-no-trailing-slash

Requires declared service server URLs to avoid trailing slashes.

## Rule details

- Applies to server entries on service namespaces.
- Fails server URLs ending with `/`.
- Prevents double-slash URL assembly bugs when base URLs are joined with operation paths.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@server("https://api.example.com/", "prod")
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@server("https://api.example.com", "prod")
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
    "@godark/typespec-linter/server-no-trailing-slash": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/server-no-trailing-slash": true
```
