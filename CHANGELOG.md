# Changelog

## Unreleased

### Added

- Local XLSX read-only table preview with sheet navigation, explicit resource/display limits, loading/error feedback and original-file download fallback.
- Multi-sheet XLSX Storybook demo and automated parsing/interaction checks.
- Clean tarball consumer checks for React 17, 18 and 19, plus a Next.js production-build example.
- Reproducible consumer bundle measurements and public adoption snapshot tooling.
- Focused PDF, DOCX, XLSX, authenticated-file, upload and migration guides.
- Generated AI documentation with freshness checks and optional Context7 refresh workflow.

### Fixed

- Consumer installations no longer run an unpinned `npx patch-package` command. The existing DOCX fix is applied during maintainer builds.
- Next.js example consumes the actual package instead of source imports and a different viewer dependency.
- Rendering/privacy descriptions distinguish local previews, Microsoft Office Online and optional server conversion.
- Removed unverified blanket security, competitor and bundle-size claims from discovery materials.

This entry is not a statement that an npm release has been published.
