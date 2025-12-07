# Retrospective board

Private starter template for my projects. Uses TV4 internal tooling.

## Overview

Monorepo managed with Turborepo and pnpm.

- `apps/api`: Hono API server
- `apps/web`: React SPA with TanStack Router

## Development

### Prerequisites

- Node (see `.nvmrc`)
- pnpm

### Setup

```sh
pnpm install
```

### Run locally

```sh
pnpm dev
```

### Other commands

```sh
pnpm build       # Build all apps
pnpm test        # Run tests
pnpm lint        # Lint
pnpm format      # Format code
pnpm type-check  # TypeScript check
```

## External/TV4 dependencies

- Root dev tooling: `@tv4/node-kit-eslint`, `@tv4/node-kit-tsconfig`.
- Keep TV4 packages; repo remains private/internal (no distribution).
