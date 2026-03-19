---
title: property-name-camel-case
ruleId: "@godark/typespec-linter/property-name-camel-case"
description: "Require model property names to use lower camelCase."
recommended: true
severity: warning
---

# property-name-camel-case

Requires model property identifiers to use lower camelCase.

## Rule details

- Checks all model property names.
- Fails names that begin with uppercase letters or use underscore/kebab separators.
- Keeps payload field naming consistent across JSON contracts and generated client mappers.

## Examples

```typespec
// Bad example
model Pet {
  PetName: string;
}

// Good example
model Pet {
  petName: string;
}
```

## Configuration

```yaml
# tspconfig.yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  # Enable this rule explicitly
  enable:
    "@godark/typespec-linter/property-name-camel-case": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/property-name-camel-case": true
```
