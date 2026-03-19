---
title: path-kebab-case
ruleId: "@godark/typespec-linter/path-kebab-case"
description: "Require literal route segments to use lower-kebab-case."
recommended: true
severity: warning
---

# path-kebab-case

Requires lower-kebab-case naming on literal URL path segments.

## Rule details

- Applies to literal segments in operation routes.
- Ignores parameter placeholders such as `{id}`.
- Fails segments that contain uppercase letters, spaces, or underscores.
- Keeps URI style consistent across services and avoids route naming drift over time.

## Examples

```typespec
// Bad example
@route("/petStore")
@get
op read(): string;

// Good example
@route("/pet-store")
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
    "@godark/typespec-linter/path-kebab-case": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/path-kebab-case": true
```
