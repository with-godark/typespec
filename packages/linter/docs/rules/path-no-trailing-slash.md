---
title: path-no-trailing-slash
ruleId: "@godark/typespec-linter/path-no-trailing-slash"
description: "Disallow trailing slashes on non-root operation paths."
recommended: true
severity: warning
---

# path-no-trailing-slash

Requires operation routes to avoid trailing slashes, except for the root path `/`.

## Rule details

- Applies to operation route paths.
- Fails paths ending in `/` when the full path is longer than one character.
- Avoids duplicate route forms and normalization inconsistencies across gateways and clients.

## Examples

```typespec
// Bad example
@route("/pets/")
@get
op read(): string;

// Good example
@route("/pets")
@get
op read(): string;
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/path-no-trailing-slash": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/path-no-trailing-slash": true
```
