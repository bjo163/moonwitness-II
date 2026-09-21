# MoonWitness Release Checklist

MoonWitness does not treat a successful local or GitHub build as a production release. A release requires code, artifact, deployment, and live-route evidence.

## 1. Main must be clean

- No unintended open pull requests.
- Content and contracts are committed.
- Changelog reflects the release scope.
- Version is intentional.

## 2. GitHub gates must pass on the release commit

Required:

```bash
npm ci
npm run validate:content
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:verify-trace
npm run web:smoke
```

The matching GitHub Actions Content Validation and Platform Build runs must both be successful.

## 3. Production deployment must be verified

Issue #7 must be complete.

Record:

- Vercel project ID,
- deployment ID,
- production URL,
- deployed commit SHA,
- deployment status.

The deployed SHA must match the intended release commit.

## 4. Live production routes must pass

Verify HTTP 200 and non-empty responses for at least:

- `/`
- `/explore`
- `/lore`
- `/storytelling`
- `/constellation`
- `/entity/era_00`

Also inspect Vercel runtime errors after the smoke pass.

## 5. Tag and release

Only after the preceding gates are complete:

1. choose the semantic version,
2. update `CHANGELOG.md`,
3. create the Git tag from the verified production commit,
4. create the GitHub Release using the changelog,
5. verify that the tag, GitHub Release, Vercel deployment, and production SHA all point to the same code.

## First release status

MoonWitness v0.1.0 is published and verified.

- Tag: `v0.1.0`
- GitHub Release: `MoonWitness v0.1.0 — First Witness`
- Release ID: `393230025`
- Verified release SHA: `dd0d710fd92bd82ffc271148b0c02a62f25db792`
- Production deployment: `dpl_8ThVEtisMjs3k2CJwM94gYMcrjsX`
- Production URL: `https://moonwitness-ii-web.vercel.app`
- Required live routes: HTTP 200
- Recent Vercel runtime errors: none

For future releases, repeat the full checklist against the intended release commit and do not reuse old deployment evidence.
