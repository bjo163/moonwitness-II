# Changelog

All notable MoonWitness changes will be recorded here.

The project follows semantic versioning for tagged releases. No production release is declared until the deployment and release checklist is complete.

## Unreleased

### Added

- Canonical YAML-backed MoonWitness content graph and narrative datasets.
- Next.js platform surfaces for storytelling, lore, entity traversal, journeys, timeline, constellation, witness/archive experiences, and canonical search.
- Phase 5A canonical content search with node-type filtering.
- Reproducible CI with `npm ci`, lint, typecheck, production build, deployment-trace verification, and production-route smoke tests.
- Vercel deployment runbook and server tracing for repository-level canonical YAML.
- Release/governance baseline with CODEOWNERS, Dependabot, PR checklist, contribution guidance, and security policy.

### Fixed

- Content status mismatch that blocked validation.
- Narrative content typing that blocked production builds.
- Production smoke-server lifecycle behavior.

### Release gate

The first tagged release remains blocked on verified Vercel production deployment and live route smoke evidence tracked in Issue #7.
