---
title: server-https-required
ruleId: "@godark/typespec-linter/server-https-required"
description: "Require service server URLs to use HTTPS."
recommended: true
severity: warning
---

# server-https-required

Requires each declared service server URL to start with `https://`.

## Rule details

- Applies to server entries on service namespaces.
- Validates every declared server URL.
- Fails any URL that does not use HTTPS.
- Prevents insecure base URLs from propagating into published contracts and generated client defaults.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@server("http://api.example.com", "prod")
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
    "@godark/typespec-linter/server-https-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/server-https-required": true
```
