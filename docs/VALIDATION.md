# MoonWitness Validation

MoonWitness keeps validation structural: protect the graph, deployment artifact, public-content boundary, and user journeys without trying to decide narrative truth.

## Install

Use Node.js 22 and the committed lockfile:

```bash
npm ci
```

## Content validation

```bash
npm run validate:content
```

Hard failures include:

- Duplicate IDs.
- Duplicate graph nodes.
- Missing or unknown graph references.
- Unsupported content statuses, canon levels, or visibility values.
- Private or archived nodes exposed through the public graph.

Non-destructive warnings include:

- Duplicate relationship edges.
- Public canon/lore records without provenance.
- Unlisted nodes that appear in the graph but are excluded from public discovery.

Warnings do not fail CI. The validator intentionally does **not** enforce narrative interpretation.

## Web quality gates

```bash
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:verify-trace
npm run web:smoke
```

The production smoke test verifies server availability and core route responses. Deployment-trace verification ensures canonical YAML reaches the Next.js server bundle.

## Browser experience assurance

After a production build:

```bash
npm run web:e2e
```

Playwright starts the production server and verifies:

- focused primary navigation,
- Story entry,
- Explorer search/filter → canonical Entity flow,
- robots.txt and sitemap.xml,
- absence of raw canonical node dumps in public entity UI,
- serious/critical accessibility violations on core routes.

GitHub Actions runs browser experience validation in a separate workflow with Chromium.

> Capture first. Refine later.
