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

### Production verification

- Vercel project `moonwitness-ii-web` is connected to `bjo163/moonwitness-II`.
- Production deployment `dpl_76FVCAxbjm5aHTth7N4Aez4zJJKt` reached `READY` from `main`.
- Verified deployed SHA: `01b0d410624a28430cc31edbea5f92fe67cb5a9e`.
- Production URL: `https://moonwitness-ii-web.vercel.app`.
- Six release smoke routes returned HTTP 200 with non-empty responses.
- No recent Vercel runtime errors were reported after verification.

### Release status

Production verification is complete. The Unreleased section remains open until the first Git tag and GitHub Release are created from the final verified release commit.
