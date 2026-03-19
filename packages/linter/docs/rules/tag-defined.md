---
title: tag-defined
ruleId: "@godark/typespec-linter/tag-defined"
description: "Enforce declaration of operation tags in service tag metadata."
recommended: true
severity: warning
---

# tag-defined

Requires operation tags to be declared in service tag metadata.

## Rule details

- Reads tags assigned to operations with `@tag(...)`.
- Compares them against keys declared in service `@tagMetadata`.
- Fails operation tags that are missing from metadata.
- Keeps tag taxonomy centralized so OpenAPI grouping remains consistent and machine-parseable.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@tagMetadata(#{
  pet: #{ description: "Pet operations" },
  store: #{ description: "Store operations" }
})
namespace PetApi {
  @tag("billing")
  @get
  op listOrders(): string;
}

// Good example
@service(#{ title: "Pet API" })
@tagMetadata(#{
  pet: #{ description: "Pet operations" },
  billing: #{ description: "Billing operations" }
})
namespace PetApi {
  @tag("billing")
  @get
  op listOrders(): string;
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
    "@godark/typespec-linter/tag-defined": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/tag-defined": true
```
