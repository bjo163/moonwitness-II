# MOONWITNESS

> When The Moon Witness,  
> We Share A Message.

**Core Theme:** END OF AN ERA  
**Project Type:** Story & Witness Platform · Living Archive · Interactive Narrative Experience

MoonWitness is a lightweight platform for capturing, connecting, witnessing, preserving, and carrying meaningful things into the next phase. It connects people, identities, events, witnesses, messages, relationships, fault lines, past presence, exposure, change, and eras.

## Core Narrative

```
WITNESS
   ↓
EVENT
   ↓
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
NEXT ERA
```

## Platform

> **MOONWITNESS = A STORY & WITNESS PLATFORM**
>
> Capture → Connect → Witness → Understand → Preserve → Promote → Move Forward

The web app is an interface to the platform. The repository is the source of truth for the platform's content and contracts.

## Current Web Surfaces

```
/
├── /witness
├── /events
├── /messages
├── /fault-lines
├── /past-presence
├── /crew
├── /timeline
├── /constellation
└── /entity/[id]
```

The canonical narrative datasets live under `data/`:

```
events
witnesses
messages
seductions
fault-lines
past-presence
changes
eras
characters
relationships
graph
```

See the [Platform Blueprint](docs/PLATFORM_BLUEPRINT.md) and [Fast Track Roadmap](docs/ROADMAP.md).

## Run the MVP

From the repository root:

```bash
npm install
npm run web:dev
```

Production build:

```bash
npm run web:build
npm run web:start
```

The web app reads canonical YAML content from `data/` through its server-side content loader.

## Start Here

- [Platform Blueprint](docs/PLATFORM_BLUEPRINT.md)
- [Fast Track Roadmap](docs/ROADMAP.md)
- [Master Blueprint](docs/MASTER_BLUEPRINT.md)
- [Core Rules](docs/CORE_RULES.md)
- [Canon](docs/CANON.md)
- [Entity Model](docs/ENTITY_MODEL.md)
- [Content Schema](docs/CONTENT_SCHEMA.md)

## Philosophy

> Minimum Rules. Maximum Story.
>
> Structure the chaos. Do not kill the chaos.
