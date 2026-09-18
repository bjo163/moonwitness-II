# MoonWitness Content Validation

MoonWitness uses a small validator before adding heavier infrastructure.

## Run

```bash
npm install
npm run validate:content
```

The validator checks:

- Duplicate IDs.
- Missing IDs.
- Graph references to unknown entities.
- Unsupported content statuses.

It intentionally does **not** enforce the whole narrative.

> Capture first. Refine later.
