# @godark/typespec-linter

![Vibe Coded](https://img.shields.io/badge/vibe-coded-ffb347)

TypeSpec governance linter for API quality, consistency, and OpenAPI readiness.

This package provides a curated ruleset for teams that want strict API governance in TypeSpec projects. It includes a recommended rule set covering naming, path design, operation metadata, response quality, security declarations, server configuration, and tag taxonomy.

## What This Package Does

- Adds reusable governance rules to your TypeSpec toolchain.
- Ships a recommended preset with all package rules enabled.
- Helps catch contract issues early during design and CI.
- Improves OpenAPI output quality for documentation and client generation.

## Installation

Install the linter package in your TypeSpec project:

```sh
pnpm add -D @godark/typespec-linter @typespec/compiler @typespec/http @typespec/openapi
```

If your project already has TypeSpec dependencies, install only the linter:

```sh
pnpm add -D @godark/typespec-linter
```

## Quick Start

1. Install the package:

```sh
pnpm add -D @godark/typespec-linter
```

2. Enable the recommended rules in tspconfig.yaml:

```yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"
```

3. Run your TypeSpec workflow (build/lint) and fix any reported diagnostics.

## Basic Usage

Enable the recommended rules in your tspconfig.yaml:

```yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"
```

Run your TypeSpec build/lint flow as usual. The rules are evaluated as part of your TypeSpec compilation and linting process.

## Rule Configuration

You can override individual rules after extending the recommended set.

```yaml
linter:
  extends:
    - "@godark/typespec-linter/recommended"

  enable:
    "@godark/typespec-linter/operation-summary": true

  disable:
    "@godark/typespec-linter/response-contains-header": true
```

## Rule References

Detailed documentation for each rule is available in [docs/rules](docs/rules).

### Naming And Style

- [model-name-pascal-case](docs/rules/model-name-pascal-case.md)
- [property-name-camel-case](docs/rules/property-name-camel-case.md)
- [operation-id-kebab-case](docs/rules/operation-id-kebab-case.md)
- [tag-lower-kebab-case](docs/rules/tag-lower-kebab-case.md)
- [tag-singular](docs/rules/tag-singular.md)

### Documentation And Metadata

- [documentation-required](docs/rules/documentation-required.md)
- [operation-summary](docs/rules/operation-summary.md)
- [parameter-description-required](docs/rules/parameter-description-required.md)
- [info-contact-required](docs/rules/info-contact-required.md)
- [info-description-required](docs/rules/info-description-required.md)
- [info-license-required](docs/rules/info-license-required.md)
- [tag-description-required](docs/rules/tag-description-required.md)

### Paths And Operations

- [path-kebab-case](docs/rules/path-kebab-case.md)
- [path-no-http-verb](docs/rules/path-no-http-verb.md)
- [path-no-trailing-slash](docs/rules/path-no-trailing-slash.md)
- [path-plural-segments](docs/rules/path-plural-segments.md)
- [operation-has-2xx](docs/rules/operation-has-2xx.md)
- [operation-id-required](docs/rules/operation-id-required.md)
- [operation-id-unique](docs/rules/operation-id-unique.md)

### Schemas And Responses

- [array-items-concrete-type](docs/rules/array-items-concrete-type.md)
- [enum-no-duplicate-values](docs/rules/enum-no-duplicate-values.md)
- [enum-value-type-consistent](docs/rules/enum-value-type-consistent.md)
- [response-concrete-payload-required](docs/rules/response-concrete-payload-required.md)
- [response-contains-header](docs/rules/response-contains-header.md)

### Security, Servers, And Tags

- [security-reference-defined](docs/rules/security-reference-defined.md)
- [server-https-required](docs/rules/server-https-required.md)
- [server-no-trailing-slash](docs/rules/server-no-trailing-slash.md)
- [server-url-required](docs/rules/server-url-required.md)
- [server-variable-enum-required](docs/rules/server-variable-enum-required.md)
- [tag-defined](docs/rules/tag-defined.md)
- [tag-unique](docs/rules/tag-unique.md)
- [boolean-parameter-prefix](docs/rules/boolean-parameter-prefix.md)

## Development (Package)

From the package directory:

```sh
pnpm build
pnpm test
```

## License

MIT
