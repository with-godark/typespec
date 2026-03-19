---
title: tag-singular
ruleId: "@godark/typespec-linter/tag-singular"
description: "Require service tags to use singular nouns."
recommended: true
severity: warning
---

# tag-singular

Requires singular tag keys in service `@tagMetadata`.

## Rule details

- Applies to tag names defined in `@tagMetadata` on service namespaces.
- Uses a pluralization heuristic to flag likely plural names.
- Fails names that appear plural, such as values ending with `s`.
- Maintains a consistent taxonomy and avoids split groups like `pet` versus `pets`.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@tagMetadata(#{ pets: #{ description: "Pet operations" } })
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
    "@godark/typespec-linter/tag-singular": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/tag-singular": true
```
