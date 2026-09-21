# Contributing to MoonWitness

MoonWitness is a story-and-witness platform whose canonical content and contracts live in this repository.

## Baseline

Use Node.js 22 and install dependencies from the committed lockfile:

```bash
npm ci
```

Run the development application:

```bash
npm run web:dev
```

## Required verification

Before opening or merging a pull request, run:

```bash
npm run validate:content
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:verify-trace
npm run web:smoke
```

GitHub Actions runs the same operational baseline.

## Content rules

Canonical content belongs under `data/`. The web application consumes that content; it must not maintain a second copy.

When editing content:

- Preserve stable IDs unless a deliberate migration requires otherwise.
- Keep provenance and source metadata accurate.
- Use the vocabulary defined by the content schema.
- Keep unknown or unresolved material explicit rather than inventing certainty.
- Ensure graph references resolve through the content validator.

Start with:

- `docs/CORE_RULES.md`
- `docs/CANON.md`
- `docs/CONTENT_SCHEMA.md`
- `docs/CONTENT_WORKFLOW.md`
- `docs/ENTITY_MODEL.md`

## Pull requests

Keep changes focused. Explain the purpose, affected contracts, deployment impact, and verification evidence.

Use feature/fix/chore/docs branch names and merge through a pull request after CI is green.

## Architecture

Do not add a database, CMS, authentication system, analytics backend, graph service, or external search service merely because it is conventional. New infrastructure must solve an observed need and preserve the repository's source-of-truth model.
