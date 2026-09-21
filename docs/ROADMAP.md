# MOONWITNESS — FAST TRACK ROADMAP

## PHASE 0 — FOUNDATION

**Goal:** establish the platform contract.

- Master Blueprint
- Core Rules
- Canon
- Entity Model
- Content Schema
- Platform Blueprint

## PHASE 1 — SEED

**Goal:** create the first working universe.

- Crew
- Era 00–07
- First Events
- First Witness Logs
- First Messages
- First Relationships

## PHASE 2 — NARRATIVE ENGINE

**Goal:** connect the creative functions.

- Seduction
- Fault Lines
- Exposure
- Past Presence
- Audit
- Evaluation
- Balancing
- Promoting
- Villains
- Sanity's Last Breath

## PHASE 3 — PLATFORM MVP

**Goal:** make the graph usable.

- [x] Browse entities
- [x] Browse events
- [x] Open witness logs
- [x] Browse messages
- [x] Browse fault lines
- [x] Browse exposure records
- [x] Witness Archive index
- [x] Trace past presence
- [x] Follow relationships
- [x] Explore timeline
- [x] Explore constellation
- [x] Open entity view
- [x] Follow one end-to-end narrative journey

## PHASE 4 — EXPERIENCE

**Goal:** make MoonWitness feel like MoonWitness.

- [x] Moon / line visual system
- [x] Constellation
- [x] First narrative journey surface
- [x] Narrative core surfaces: Seduction, Exposure, Promoting, Conflict, Sanity's Last Breath
- [x] Narrative support surfaces: Villains, Change Advisory Board, Chasing Heart, Lovestruck, Breath Electric, End Of An Era
- [x] Motion layer with reduced-motion support
- [x] Narrative transitions as linked entity steps
- [x] Lightweight entity explorer/search
- [x] Witness Archive discovery
- [x] Story → Journey → Entity discovery path
- [x] Interactive discovery polish
- [x] Lore seed enrichment with provenance
- [x] Multi-event Lore Arc
- [x] Lore Book
- [x] Per-story Journey routes
- [x] Linked story traces in Journey and Constellation
- [x] Multi-event Lore Arc
- [x] Full journey with richer user-provided canon/lore content (current lore seed)

## PHASE 5 — SCALE ONLY WHEN NEEDED

**Goal:** improve discovery and operational readiness without adding infrastructure before it earns its place.

### Phase 5A — Search & scale readiness

- [x] Search across canonical entity content and metadata
- [x] Filter discovery results by node type
- [x] Keep YAML as the source of truth
- [x] Keep search dependency-free and server-rendered
- [x] Verify Phase 5A through GitHub content validation and production build (PR #10: Content Validation #227, Platform Build #167)

### Phase 5B — Operational readiness

- [x] Commit a reproducible npm lockfile
- [x] Use `npm ci` in CI
- [x] Enforce web source linting
- [x] Enforce explicit TypeScript typecheck
- [x] Verify production Next.js build
- [x] Smoke-test core production routes
- [x] Verify Phase 5B on PR #12 (Content Validation #231, Platform Build #171)
- [x] Verify an actual Vercel production deployment

### Phase 5C — Release & governance readiness

- [x] Add CODEOWNERS
- [x] Configure automated npm dependency updates
- [x] Add a pull request verification template
- [x] Add contribution and security guidance
- [x] Establish an unreleased changelog baseline
- [x] Add a release checklist gated by production deployment evidence
- [x] Create and verify the first tagged production release (`v0.1.0`)

### Phase 5D — Release closeout

- [x] Publish and verify `v0.1.0`
- [x] Align roadmap, changelog, and release documentation with the published release
- [x] Triage incompatible major dependency upgrades
- [x] Keep Node.js runtime and Node type definitions aligned
- [x] Prevent routine Dependabot major upgrades for TypeScript, ESLint, and Node types

## PHASE 6 — LEARN BEFORE SCALING

**Goal:** improve how people understand and experience MoonWitness before adding backend infrastructure.

### Phase 6A — Product learning

- [x] Add lightweight Vercel Web Analytics instrumentation
- [x] Add Vercel Speed Insights instrumentation
- [x] Keep analytics dependency-light and avoid a custom analytics backend
- [ ] Review real traffic and web-vital signals before introducing further infrastructure

### Phase 6B — Navigation clarity

- [x] Reduce primary navigation to Story, Lore, Explore, Archive, and Journey
- [x] Keep Home accessible through the MoonWitness brand
- [x] Preserve specialist narrative surfaces through contextual links and discovery
- [ ] Validate navigation behavior with real usage signals

Possible later additions, still usage-gated:

- Database
- CMS
- Authentication
- Moderation
- External search service
- API
- Graph services
- Custom analytics backend

> **Do not add infrastructure merely because Phase 5 exists. Complexity must still earn its place.**

## PRODUCTION & RELEASE VERIFICATION

MoonWitness v0.1.0 is published and production-verified.

- Git tag: `v0.1.0`
- GitHub Release: `MoonWitness v0.1.0 — First Witness`
- Verified release SHA: `dd0d710fd92bd82ffc271148b0c02a62f25db792`
- Production URL: `https://moonwitness-ii-web.vercel.app`
- Production deployment: `dpl_8ThVEtisMjs3k2CJwM94gYMcrjsX`
- Content Validation #244: SUCCESS
- Platform Build #184: SUCCESS
- Required live routes: HTTP 200
- Recent Vercel runtime-error check: no runtime errors

Post-v0.1.0 work should optimize learning, navigation, accessibility, and content quality before introducing new infrastructure.
