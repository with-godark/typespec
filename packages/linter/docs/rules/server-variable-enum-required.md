---
title: server-variable-enum-required
ruleId: "@godark/typespec-linter/server-variable-enum-required"
description: "Enforce enum-like constrained values for server variables."
recommended: true
severity: warning
---

# server-variable-enum-required

Requires server URL template variables to use constrained enum-like types.

## Rule details

- Applies to server variables declared in `@server(...)` templates.
- Accepts enum and union types.
- Fails broad scalar variables such as `string`.
- Keeps deployment target variants explicit for client generation and environment validation.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@server("https://{region}.example.com", "prod", { region: string; })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@server("https://{region}.example.com", "prod", { region: "us" | "eu"; })
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
    "@godark/typespec-linter/server-variable-enum-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/server-variable-enum-required": true
```
