---
title: server-url-required
ruleId: "@godark/typespec-linter/server-url-required"
description: "Enforce at least one non-empty server URL on service namespaces."
recommended: true
severity: warning
---

# server-url-required

Requires each service namespace to define at least one non-empty server URL.

## Rule details

- Applies only to service namespaces.
- Fails when no servers are declared.
- Fails when server URLs are empty or whitespace-only.
- Ensures generated OpenAPI document includes usable base endpoints for generated client and tool configuration.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
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
    "@godark/typespec-linter/server-url-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/server-url-required": true
```
