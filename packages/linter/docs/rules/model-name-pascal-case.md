---
title: model-name-pascal-case
ruleId: "@godark/typespec-linter/model-name-pascal-case"
description: "Enforce PascalCase model names."
recommended: true
severity: warning
---

# model-name-pascal-case

Requires model type names to follow PascalCase for cross-language consistency.

## Rule details

- Checks all model declarations emitted into API schema components.
- Fails names that start lowercase or break PascalCase word boundaries.
- Aligns generated type names with common conventions in C#, Java, and TypeScript generated clients.

## Examples

```typespec
// Bad example
model petStore {}
model fooBar {}

// Good example
model PetStore {}
model FooBar {}
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/model-name-pascal-case": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/model-name-pascal-case": true
```
