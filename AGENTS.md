## About this application
[Brief description]

## Architecture overview

Instructions: Update this section whenever there are significant architectural changes. List only the most important architectural decisions or patterns (max 5). If there are fewer than 5 significant items, do not add filler content. Max 100 chars per item.

## Verification
Before creating a commit or requesting review:
1. Run `make check` to ensure all linting, formatting, type checking, and tests pass.
2. Fix any errors immediately. Do not commit broken code.

## Git

1. Review `git diff` and `git status`
2. If changes are large or touch multiple concerns, ask: "Should I split this into separate commits?"
3. For each commit:
   - Max 62 chars using format: type(scope): description
   - Stage only related files

CRITICAL: Do NOT add these to commits or PRs:
- "Generated with [Claude Code]..."
- "Co-Authored-By: Claude Sonnet..."
Keep commits clean without AI attribution.

## Language guidelines

Sentence case: Use for all text, including headings. Do not use title case.
