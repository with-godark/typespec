---
title: tag-description-required
ruleId: "@godark/typespec-linter/tag-description-required"
description: "Enforce descriptions on all tag metadata entries."
recommended: true
severity: warning
---

# tag-description-required

Requires every tag metadata entry to include a non-empty description.

## Rule details

- Applies to service namespaces that define `@tagMetadata`.
- Validates each metadata entry for a non-empty `description` field.
- Makes operation groups self-describing in generated documentation and API explorer sidebars.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@tagMetadata(#{ pet: #{} })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@tagMetadata(#{ pet: #{ description: "Pet operations" } })
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
    "@godark/typespec-linter/tag-description-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/tag-description-required": true
```
