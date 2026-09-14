# XLSX and discovery release implementation plan

Goal: deliver the five maintainer-approved improvements: consistent documentation, clean package installation checks, runnable examples, inline XLSX preview, and evidence-based release materials.

Architecture: extend the existing DocRenderer interface for XLSX. Keep the existing Office rendering behavior, but accurately document external service use. Build and test a packed tarball in standalone consumers. Generate AI documentation from maintained source docs and ship release evidence rather than unverified comparative claims.

Scope: GitHub feature branch and push are authorized. npm publication and posting promotional messages are separate from this code push. No unrelated enterprise repository changes.

## Task 1: XLSX renderer

- Write failing tests covering multiple sheets, empty/malformed workbooks, literal text cells, and document changes.
- Add browser XLSX parser, lazy load parser, table preview with sheet selector, explicit resource/display limits, loading/error states, and download fallback.
- Register/export XLSXRenderer with higher precedence than the existing Office fallback; add fixture and Storybook demo.
- Verify tests, TypeScript, and production build.

## Task 2: Package and examples

- Remove install-time npx; apply the existing DOCX patch deterministically during maintainer builds.
- Test packed distribution content and clean React consumer builds; use installed package in Next.js example, not source or a competitor.
- Add CI package smoke checks and reproducible bundle measurements; verify supported React versions using actual resolved peer dependencies.

## Task 3: Documentation and release

- Correct source README, docs site, Context7, structured metadata, AI files, and outdated content drafts to match current renderer behavior.
- Provide focused PDF, DOCX, XLSX, authenticated-file, upload and migration guides.
- Generate synchronized llms-full.txt and publish AI files alongside the demo build. Add freshness checks.
- Provide release walkthrough and repeatable download/GitHub metrics collection, with no invented benchmarks or ranking promises.

## Final validation

- Run tests, lint, formatting for changed files, library build, package smoke matrix, Storybook and docs builds where available.
- Record measured package/bundle results and limitations. Review entire diff, fix actionable findings, commit and push feature branch, create reviewable PR if access permits.
