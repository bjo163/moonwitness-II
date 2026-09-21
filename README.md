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
├── /storytelling
├── /explore
├── /archive
├── /journey
├── /witness
├── /events
├── /messages
├── /seduction
├── /fault-lines
├── /exposure
├── /promoting
├── /conflict
├── /sanity-last-breath
├── /past-presence
├── /change
├── /change-advisory-board
├── /chasing-heart
├── /lovestruck
├── /breath-electric
├── /villains
├── /end-of-an-era
├── /lore
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
exposures
promoting
conflicts
sanity-last-breath
past-presence
changes
change-advisory-board
chasing-heart
lovestruck
breath-electric
villains
end-of-an-era
stories
eras
characters
relationships
graph
```

See the [Platform Blueprint](docs/PLATFORM_BLUEPRINT.md) and [Fast Track Roadmap](docs/ROADMAP.md).

## Run the MVP

MoonWitness targets Node.js 22 and uses the committed lockfile for reproducible installs.

From the repository root:

```bash
npm ci
npm run web:dev
```

Quality gates:

```bash
npm run validate:content
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:smoke
```

Run the production server directly:

```bash
npm run web:start
```

The web app reads canonical YAML content from `data/` through its server-side content loader. GitHub Actions runs the same validation, lint, typecheck, production build, and production-route smoke gates before the baseline is considered healthy.

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
