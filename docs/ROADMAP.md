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
- [ ] Create the first tagged production release only after Issue #7 is complete

Possible later additions, still usage-gated:

- Database
- CMS
- Authentication
- Moderation
- External search service
- API
- Graph services
- Analytics

> **Do not add infrastructure merely because Phase 5 exists. Complexity must still earn its place.**

## POST-PHASE 4 — VERIFICATION

GitHub runtime, build, deployment-trace, production deployment, and live-route verification are complete.

Verified production evidence:

- Vercel project: `moonwitness-ii-web` (`prj_IWnhw1x7H2wyUvFPkfHPQcAxdFRO`)
- Production deployment: `dpl_76FVCAxbjm5aHTth7N4Aez4zJJKt`
- Production URL: `https://moonwitness-ii-web.vercel.app`
- Verified deployed SHA: `01b0d410624a28430cc31edbea5f92fe67cb5a9e`
- Live routes `/`, `/explore`, `/lore`, `/storytelling`, `/constellation`, and `/entity/era_00`: HTTP 200
- Recent Vercel runtime-error check: no runtime errors found

Issue #7 is complete. The remaining release-process task is to create the first Git tag/GitHub Release after the final release commit is deployed and verified.
