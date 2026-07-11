# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes scoped to one feature or fix.
3. Add or update tests for behavior changes.
4. Run:

   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. Open a pull request with:
   - UI changes: screenshots
   - Backend changes: API examples

## Code Style & Standards

- TypeScript strict mode.
- Zod validation for request DTOs.
- Prisma models are the database source of truth.
- Accessibility: labels, focus states, semantic headings, and keyboard support.
- Do not store secrets in code or logs.

