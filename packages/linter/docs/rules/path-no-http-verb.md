---
title: path-no-http-verb
ruleId: "@godark/typespec-linter/path-no-http-verb"
description: "Disallow HTTP verb words in literal path segments."
recommended: true
severity: warning
---

# path-no-http-verb

Requires path segments to avoid embedded HTTP method names.

## Rule details

- Applies to literal route segments.
- Flags segments equal to `get`, `put`, `post`, `patch`, `delete`, or `head`.
- Ignores parameter placeholders like `{id}`.
- Preserves resource-oriented URL design where HTTP method conveys action semantics.

## Examples

```typespec
// Bad example
@route("/pets/get")
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
    "@godark/typespec-linter/path-no-http-verb": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/path-no-http-verb": true
```
