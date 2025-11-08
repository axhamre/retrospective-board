# Node.js TypeScript Service Template

*NOTE: See https://engineering-platform.a2d.tv/developer-toolkit/node-template for how to initialize the template repository. This should be done before following any instructions in this README.*

This repository serves as the starting point for creating new TypeScript backend services that adhere to our golden path guidelines. It is designed to enforce best practices and operational consistency, making it easier to set up, maintain, and collaborate on services across the organization.

You can read more about our golden path in [notion](https://www.notion.so/tv4/Golden-Path-1c2b711a71fc80a5bc5dcb4465fff537)

## Architecture Overview

This template provides a modern Node.js backend service built with:

- **Runtime**: Node.js 22.6.0+ with ESM modules
- **Framework**: [Hono](https://hono.dev/) - Fast, lightweight web framework
- **Language**: TypeScript configured with @tv4/tsconfig
- **Linting**: ESLint with @tv4/eslint-config
- **API Documentation**: OpenAPI 3.1 with Swagger UI
- **Validation**: [Zod](https://zod.dev/) for runtime type validation
- **Feature Flags**: OpenFeature with [Unleash](https://unleash-server.a2d.tv) integration via @tv4/node-kit-features
- **Observability**: OpenTelemetry with custom metrics and tracing via @tv4/node-kit-observability
- **Insights**: Insights reporting via @tv4/node-kit-insights
- **Logging**: Structured logging with via @tv4/node-kit-logger
- **Testing**: Built-in Node test runner as a starting point
- **Build System**: [Turborepo](https://turborepo.com/) for monorepo management
- **Package Manager**: [pnpm](https://pnpm.io/) for efficient dependency management

## Prerequisites

### Required Software

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) - a fast, efficient [drop in replacement for npm](https://pnpm.io/feature-comparison)

For Node we recommend using a version manager like [nvm](https://github.com/nvm-sh/nvm) for easy installation and dynamically switching between versions between projects. Once installed simply run
`nvm use` to switch to, and if necessary download, the correct Node version for this project.

Next install `pnpm` globally via npm:
```bash
npm install -g pnpm
```
> [!NOTE]
> When you update your Node version remember to reinstall pnpm globally for that version as well.

From that point onwards use `pnpm` instead of `npm` to install dependencies
```bash
pnpm install      # Install project dependencies
```
And for running scripts and commands that you would normally run with `npm`
```bash
pnpm dev          # Start the development server
pnpm build        # Build the project
pnpm format       # Format the codebase
pnpm lint         # Run linters
pnpm test         # Run tests
pnpm typecheck    # Run type checking
````
## Repository Structure

The template follows a monorepo structure with shared packages and individual services powered by [Turborepo](https://turborepo.com/):

```
{{REPOSITORY_NAME}}/
├── packages/                         # Shared packages within the monorepo
│   ├── ecs-metadata/                 # ECS metadata utilities
│   └── observability-registry/       # Observability tools
├── services/
│   └── {{SERVICE_NAME}}/             # Your service code
│       ├── src/
│       │   ├── main.ts               # Service entry point
│       │   ├── app.ts                # Hono application setup
│       │   ├── env.ts                # Environment variables & validation
│       │   ├── ...
│       │   ├── endpoints/            # Endpoints
│       │   │   ├── routes.ts
│       │   │   ├── hello-world-get.ts
│       │   │   └── feature-flagged.ts
│       │   └── test/                 # Test files
│       └── package.json              # Service dependencies
├── ...
├── .github/workflows/                # GitHub Actions
├── package.json                      # Root/repository package configuration
└── turbo.json                        # Turborepo build configuration
```

## API Endpoints

The service provides the following endpoints:

- `GET /health` - Service health check
- `GET /docs` - Swagger UI documentation
- `GET /openapi.json` - OpenAPI specification
- `GET /hello` - Hello world endpoint
- `GET /feature-flagged` - Feature flag demonstration

## Support

If you have questions or need assistance:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs or feature requests
- **Team Support**: Contact the backend platform team in [#engineering-platform-team](https://tv4.slack.com/archives/C098CDK3TPZ)
- **Golden Path**: [TV4 Golden Path Documentation](https://www.notion.so/tv4/Golden-Path-1c2b711a71fc80a5bc5dcb4465fff537)

