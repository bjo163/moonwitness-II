# MoonWitness — Content Workflow

MoonWitness is content-first.

## Add a new story

1. Create or update the canonical YAML dataset under `data/`.
2. Give the record one stable `id`.
3. Keep the source, observation, interpretation, and narrative role distinct.
4. Add the node to `data/graph.yaml` when it should be discoverable.
5. Add relationships in `data/relationships.yaml` when a connection matters.
6. Run:

```bash
npm install
npm run validate:content
```

## Status

Use the smallest meaningful state:

- `draft`
- `review`
- `published`
- `archived`
- `forgotten`
- `reopened`
- `unknown`
- `unresolved`
- `promoted`

## The rule

> Capture first. Connect second. Refine later.

Do not turn an unresolved story into a forced conclusion just to make the dataset look complete.
