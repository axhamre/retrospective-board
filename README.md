# Retrospective board (private)

Private starter template for my projects. Uses TV4 internal tooling and stays private.

## Overview
- Monorepo managed with Turborepo and pnpm.
- Apps: `apps/api` (Hono + TypeScript), `apps/web` (React + TanStack Router + Vite).
- Node 22 target; ESM throughout.

## Architecture
- `apps/api`: Hono server with zod validation, swagger UI, pino logging; env files for dev/test.
- `apps/web`: React 19 + TanStack Router; Vite build; TypeScript strict.
- Shared config at root (`tsconfig.base.json`, ESLint/Prettier) and turbo pipeline (`turbo.json`).

## External/TV4 dependencies
- Root dev tooling: `@tv4/node-kit-eslint`, `@tv4/node-kit-tsconfig`.
- Keep TV4 packages; repo remains private/internal (no distribution).

