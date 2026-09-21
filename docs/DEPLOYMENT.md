# MoonWitness Deployment

This repository is a small npm-workspace monorepo:

- Next.js application: `apps/web`
- Canonical content: `data/`
- Workspace lockfile: `package-lock.json` at the repository root

The web application deliberately reads canonical YAML from the repository-level `data/` directory. Deployment must preserve that boundary.

## Vercel project settings

Import the GitHub repository:

`bjo163/moonwitness-II`

Use these project settings:

- Framework Preset: **Next.js**
- Root Directory: **apps/web**
- Production Branch: **main**
- Node.js: **22**
- Install Command: `cd ../.. && npm ci`
- Build Command: `npm run build`
- Output Directory: use the Next.js default

Because the application and lockfile/content live at different monorepo levels, enable Vercel's option to include source files outside the configured Root Directory in the build.

Do not copy `data/` into `apps/web`. The repository-level canonical content remains the source of truth.

## Why file tracing is configured

`apps/web/next.config.ts` sets the repository as `outputFileTracingRoot` and explicitly includes `../../data/**/*.yaml` in server traces.

GitHub Actions runs:

```bash
npm run web:build
npm run web:verify-trace
```

The second command fails if canonical YAML is absent from Next.js server traces. This protects against a deployment that builds successfully but fails at runtime when server-rendered routes read content.

## Pre-deployment verification

From the repository root:

```bash
npm ci
npm run validate:content
npm run web:lint
npm run web:typecheck
npm run web:build
npm run web:verify-trace
npm run web:smoke
```

All commands must pass before production deployment.

## Production verification

After Vercel reports the production deployment as Ready, verify at minimum:

- `/`
- `/explore`
- `/lore`
- `/storytelling`
- `/constellation`
- `/entity/era_00`

Each route should return HTTP 200 with a non-empty response.

Then record:

- Vercel project ID
- production deployment ID
- production URL
- deployed commit SHA
- route smoke-test evidence

in GitHub Issue #7.

## Verified production state

Production deployment is verified:

- Project: `moonwitness-ii-web`
- Project ID: `prj_IWnhw1x7H2wyUvFPkfHPQcAxdFRO`
- Framework: Next.js
- Production URL: `https://moonwitness-ii-web.vercel.app`
- Verified deployment ID: `dpl_76FVCAxbjm5aHTth7N4Aez4zJJKt`
- Verified deployed SHA: `01b0d410624a28430cc31edbea5f92fe67cb5a9e`
- Deployment state: `READY`

Live verification returned HTTP 200 with non-empty responses for `/`, `/explore`, `/lore`, `/storytelling`, `/constellation`, and `/entity/era_00`. A recent Vercel runtime-error check reported no runtime errors.

Issue #7 is complete.
