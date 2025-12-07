.PHONY: lint format test type-check check

lint:
	pnpm lint

format:
	pnpm format

test:
	pnpm test

type-check:
	pnpm type-check

check:
	pnpm format:check
	pnpm lint
	pnpm type-check
	pnpm test
