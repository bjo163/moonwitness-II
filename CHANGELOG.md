# Changelog

All notable MoonWitness changes will be recorded here.

The project follows semantic versioning for tagged releases.

## Unreleased

### Added

- Lightweight Vercel Web Analytics instrumentation.
- Vercel Speed Insights instrumentation.

### Changed

- Primary navigation is focused on Story, Lore, Explore, Archive, and Journey.
- Dependabot major updates for TypeScript, ESLint, and Node types are held for deliberate compatibility migrations.

## 0.1.0 — 2026-09-21

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

### Production verification

- Release tag: `v0.1.0`.
- Release title: `MoonWitness v0.1.0 — First Witness`.
- Verified release SHA: `dd0d710fd92bd82ffc271148b0c02a62f25db792`.
- Production URL: `https://moonwitness-ii-web.vercel.app`.
- Production deployment `dpl_8ThVEtisMjs3k2CJwM94gYMcrjsX` reached `READY`.
- Required live routes returned HTTP 200 with non-empty responses.
- No recent Vercel runtime errors were reported after final release verification.
