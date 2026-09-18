# MoonWitness Schemas

Schemas define the minimum shape of platform content.

## Principles

- Keep fields small and understandable.
- Prefer references by stable ID.
- Allow unresolved content.
- Allow extra narrative fields while the model is young.
- Tighten validation only when real usage requires it.

## Canonical Datasets

Core:

- `entity.schema.json`
- `event.schema.json`
- `witness.schema.json`
- `message.schema.json`
- `relationship.schema.json`

Narrative:

- `seduction.schema.json`
- `fault-line.schema.json`
- `past-presence.schema.json`
- `change.schema.json`

The remaining narrative concepts can be introduced as their data becomes real.

## Graph

Entity → Event → Witness → Message → Relationship → Era

Narrative layers:

Seduction → Fault Line → Exposure → Past Presence → Audit → Evaluation → Balancing → Promoting → Conflict → Sanity's Last Breath → Change
