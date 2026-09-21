## Summary

Describe what changed and why.

## Scope

- [ ] Runtime/application code
- [ ] Canonical content/data
- [ ] Schema/contracts
- [ ] Documentation only
- [ ] CI/deployment

## Canon & content checks

If this PR changes canonical content:

- [ ] Provenance/source fields remain accurate.
- [ ] Existing IDs are preserved unless migration is intentional.
- [ ] Unknown/unresolved material remains explicitly unresolved.
- [ ] No canonical YAML is duplicated into the web app.

## Verification

- [ ] `npm ci`
- [ ] `npm run validate:content`
- [ ] `npm run web:lint`
- [ ] `npm run web:typecheck`
- [ ] `npm run web:build`
- [ ] `npm run web:verify-trace`
- [ ] `npm run web:smoke`

## Deployment impact

Describe any Vercel, runtime, environment, routing, or file-tracing impact.

## Notes

Anything reviewers should know that is not obvious from the diff.
