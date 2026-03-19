---
title: path-plural-segments
ruleId: "@godark/typespec-linter/path-plural-segments"
description: "Require literal resource path segments to be plural."
recommended: true
severity: warning
---

# path-plural-segments

Requires literal resource path segments to use plural forms.

## Rule details

- Applies to literal route segments.
- Uses a pluralization heuristic to detect singular resource nouns.
- Skips common service-style segments such as `health`, `status`, and `metrics`.
- Aligns endpoint naming with REST collection conventions (`/pets`, `/orders`).

## Examples

```typespec
// Bad example
@route("/pet/{petId}")
@get
op read(@path petId: string): string;

// Good example
@route("/pets/{petId}")
@get
op read(@path petId: string): string;
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/path-plural-segments": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/path-plural-segments": true
```
