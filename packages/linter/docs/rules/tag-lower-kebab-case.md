---
title: tag-lower-kebab-case
ruleId: "@godark/typespec-linter/tag-lower-kebab-case"
description: "Require service tag names to use lower-kebab-case."
recommended: true
severity: warning
---

# tag-lower-kebab-case

Requires tag names in `@tagMetadata` to follow lower-kebab-case.

## Rule details

- Applies to tag keys declared in service `@tagMetadata`.
- Accepts lowercase letters and digits separated by single hyphens.
- Fails names that contain uppercase letters, spaces, or underscores.
- Prevents style variants from fragmenting OpenAPI tag grouping.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@tagMetadata(#{ PetTag: #{ description: "Pet operations" } })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@tagMetadata(#{ pet-tag: #{ description: "Pet operations" } })
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
    "@godark/typespec-linter/tag-lower-kebab-case": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/tag-lower-kebab-case": true
```
