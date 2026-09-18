# MoonWitness Content Graph

## Core Graph

```
ENTITY
  ↓
EVENT
  ↓
WITNESS
  ↓
MESSAGE
```

## Narrative Graph

```
MESSAGE
  ↓
SEDUCTION
  ↓
FAULT LINE
  ↓
EXPOSURE
  ↓
PAST PRESENCE
  ↓
AUDIT
  ↓
EVALUATION
  ↓
BALANCING
  ↓
PROMOTING
  ↓
CONFLICT
  ↓
SANITY'S LAST BREATH
  ↓
CHANGE
  ↓
ERA
```

## Graph Rules

1. Relationships point to stable entity IDs.
2. Source content lives in one place.
3. Graph links reference content; they do not duplicate it.
4. Unknown or unresolved nodes are allowed.
5. The graph may grow incrementally.

## First Seed

The first graph is represented by:

- `data/graph.yaml`
- `data/relationships.yaml`
- `data/first-loop.yaml`

## Platform Goal

The first usable graph should allow:

```
OPEN ENTITY
 → FIND RELATED EVENT
 → FIND WITNESS
 → FIND MESSAGE
 → TRACE FAULT LINE
 → TRACE PAST PRESENCE
 → SEE PROMOTING
 → ENTER NEXT ERA
```
