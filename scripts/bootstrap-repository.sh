#!/usr/bin/env bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REPO=$1

if gh api \
    --method PATCH \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    /repos/TV4/${REPO} \
    -f 'apply_default_rulesets=true' \
    -f 'division=play' \
    -f 'allow_auto_merge=true' \
    -f 'allow_merge_commit=false' \
    -f 'delete_branch_on_merge=true' \
    -f 'has_wiki=false' \
    -f 'has_projects=false' \
    -f 'has_downloads=false' \
    -f 'has_issues=false' \
    > /dev/null; then
  echo -e "${GREEN}Github Repository ${REPO} updated successfully.${NC}"
else
  echo -e "${YELLOW}Failed to update repository ${REPO}. See error output above.${NC}" >&2
  exit 1
fi
