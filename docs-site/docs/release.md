---
id: release
title: Release validation and walkthrough
---

# Release validation and walkthrough

## Status

The XLSX and discovery update is included in **1.9.0**. Install `@iamjariwala/react-doc-viewer@1.9.0` or newer for `XLSXRenderer`. A branch push or demo build is not an npm publication; the npm package version and GitHub release notes identify the released artifact.

## Reproduce validation

Use the Node version in `.nvmrc`, then run:

```sh
npm ci
npm run docs:check
npm test
npm run lint
npm run build
npm run package:smoke
npm run measure:bundle
npm run storybook:build
npm run metrics
```

The package smoke check installs a tarball in fresh consumer projects and exercises the supported React major versions and the Next.js example. Use the CI result for the commit being released; declaring a peer range alone is not compatibility evidence. Unit tests cover XLSX parsing, sheet navigation and error cases. A production build does not prove pixel-perfect rendering or all browser behavior.

See the committed [bundle report](https://github.com/mehuljariwala/react-doc-viewer/blob/main/reports/release-bundle.json) for the measurement method and artifact integrity. Review generated package and bundle reports. The repository's existing dependency audit findings must be evaluated before an npm release; passing feature tests is not a full security audit.

## Demo walkthrough

1. Open Storybook's **File Types / Data / XLSX** story.
2. Switch worksheets and inspect data, including literal text cells.
3. Try an empty or invalid workbook to see the explicit status and download fallback.
4. Compare PDF search and local DOCX preview using the existing stories.
5. Explain that XLSX is a bounded data preview: no formula evaluation, charts, macros or exact Excel layout.

Use this walkthrough for a short screen recording or release article. Include the actual release version and a link to the working demo. Disclose package maintainership in community posts.

## Documentation publishing

`npm run docs:sync` regenerates both root and docs-site AI files. Commit these outputs whenever maintained guides change. `docs:check` fails when generated files drift. Storybook builds copy the AI files into the deployed demo directory.

The Context7 workflow refreshes `/mehuljariwala/react-doc-viewer` after documentation changes land on main. Configure the repository secret `CONTEXT7_API_KEY`; without it the workflow reports that setup is needed. Alternatively request a refresh on the Context7 library page. Refresh completion and retrieval results must be checked after indexing; no first-place recommendation is promised.

## Measure adoption

Run `npm run metrics` before launch and weekly afterward to save npm download windows and GitHub stars/forks. Compare equivalent windows. Downloads include automation, and stars do not measure production usage.

Record successful integrations, reproducible bug reports, merged community contributions and time to resolve reported issues. Keep those as observed outcomes rather than inventing counters. Do not install package telemetry or collect document content to measure adoption.

## Release checklist

- Confirm all CI checks and release evidence for the chosen commit.
- Verify the package tarball, release notes and renderer/privacy documentation agree.
- Choose a semantic version that reflects the changes; remove unreleased labels only for APIs actually published.
- Publish through the maintainer's existing authenticated npm release process.
- Deploy the built demo and documentation, refresh Context7, and verify the public links.
- Share the demo and measured improvements with a relevant audience; no fabricated reviews, download inflation or ranking promises.
