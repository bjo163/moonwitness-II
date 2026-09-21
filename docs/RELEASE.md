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

## First release

The repository currently declares version `0.1.0`, but that version must not be described as a verified production release until Issue #7 is closed with deployment evidence.
