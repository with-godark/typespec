---
title: info-contact-required
ruleId: "@godark/typespec-linter/info-contact-required"
description: "Require OpenAPI info.contact metadata on service namespaces."
recommended: true
severity: warning
---

# info-contact-required

Requires each service namespace to publish contact metadata in OpenAPI info.

## Rule details

- Applies only to namespaces treated as services.
- Resolves `@info(...)` metadata and verifies `contact` is present.
- Ensures consumers and platform teams can identify support ownership for incidents and onboarding.

## Examples

```typespec
// Bad example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0" })
namespace PetApi;

// Good example
@service(#{ title: "Pet API" })
@info(#{ version: "1.0.0", contact: #{ email: "api@example.com" } })
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
    "@godark/typespec-linter/info-contact-required": true

  # Disable this rule explicitly
  disable:
    "@godark/typespec-linter/info-contact-required": true
```
