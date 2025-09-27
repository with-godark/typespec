# GoDark TypeSpec

A monorepo for GoDark's TypeSpec libraries and related tooling. This repository is to host reusable TypeSpec definitions and utilities used to produce OpenAPI specifications and other contract artifacts.

## Stack
- Language/ecosystem: Node.js (for tooling)
- Package manager: pnpm (workspace)

## Requirements
- Node.js >= 22 (enforced via `package.json` engines)
- pnpm >= 10 (enforced via `package.json` engines; workspace uses `pnpm@10.17.1`)

Check versions:
- node -v
- pnpm -v

## Getting Started
1) Install dependencies (workspace-aware):
- pnpm install

2) Explore workspace layout:
- apps/*  — Executable apps or example projects
- packages/* — TypeSpec libraries and shared packages

## Running and Building

- pnpm -w build — build all packages
- pnpm -w lint — lint all packages
- pnpm -w test — run tests across the workspace

Please add scripts to each package and wire them up with pnpm workspace commands.

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
