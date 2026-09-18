# MOONWITNESS — ENTITY MODEL

## Core Entities

- ENTITY
- PERSON
- CHARACTER
- ALIAS
- EVENT
- WITNESS
- MESSAGE
- ERA
- RELATIONSHIP
- SIGNAL
- OBSERVATION
- SEDUCTION
- FAULT_LINE
- EXPOSURE
- PAST_PRESENCE
- AUDIT
- EVALUATION
- BALANCING
- PROMOTING
- CONFLICT
- VILLAIN
- SANITY_LAST_BREATH
- ARCHIVE
- SOURCE
- CHANGE

## Identity Types

```
PERSON
CHARACTER
ALIAS
SYMBOL
GROUP
FICTIONAL_REFERENCE
PUBLIC_REFERENCE
COMPOSITE
UNKNOWN
```

## Common Metadata

```
id
type
name / title
status
created_at
updated_at
source
provenance
canon_level
visibility
related_entities
```

## Core Relationships

```
PERSON
  ↕
ALIAS
  ↕
RELATIONSHIP
  ↕
PAST_PRESENCE
  ↕
FAULT_LINE
  ↕
EVENT
  ↕
WITNESS
  ↕
MESSAGE
  ↕
ERA
```

## Entity Principles

- Every entity has one stable ID.
- One thing has one natural home.
- Cross-links are preferred over duplication.
- Unknown is allowed.
- Narrative roles are contextual.
