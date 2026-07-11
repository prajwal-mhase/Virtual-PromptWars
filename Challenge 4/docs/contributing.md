# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes scoped to one feature or fix.
3. Add or update tests for behavior changes.
4. Run `npm run lint`, `npm run test`, and `npm run build`.
5. Open a pull request with screenshots for UI changes and API examples for backend changes.

## Code Style

- TypeScript strict mode.
- Zod validation for request DTOs.
- Prisma models are the database source of truth.
- Keep components accessible: labels, focus states, semantic headings, and keyboard support.
- Avoid storing secrets in code or logs.
