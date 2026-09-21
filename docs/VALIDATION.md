# MoonWitness Validation

MoonWitness keeps its verification layer intentionally small, but the operational baseline now checks both canonical content and the production web application.

## Install

Use Node.js 22 and the committed lockfile:

```bash
npm ci
```

## Content validation

```bash
npm run validate:content
```

The content validator checks:

- Duplicate IDs.
- Missing IDs.
- Graph references to unknown entities.
- Unsupported content statuses.

It intentionally does **not** enforce the whole narrative.

## Web quality gates

```bash
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:smoke
```

The smoke test starts the production Next.js server and verifies core routes, including Home, Explorer, Lore, Storytelling, Constellation, and a canonical entity page.

GitHub Actions runs these gates using `npm ci`, so dependency installation is reproducible from `package-lock.json`.

> Capture first. Refine later.
