bootstrap:
	./scripts/bootstrap.sh

lint:
	pnpm lint

format:
	pnpm format

test:
	pnpm test

check: format lint test
