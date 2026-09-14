# Validation for the XLSX and discovery update

Validated locally on 2026-09-14 using Node 22.22.1 and npm 10.9.4. These are local checks; GitHub CI reports its own result for the pushed commit. The package is still an unreleased working-tree build based on version 1.8.0.

- `npm test`: 26 tests passed in 3 files, including 22 XLSX tests and 4 existing viewer tests.
- `npm run lint`: passed, with 2 existing React hook dependency warnings.
- `npm run prettier:changed`: passed for changed/untracked supported files, respecting existing ignore rules.
- `npm run docs:check`: passed; root and docs-site AI files agree with maintained guides.
- `npm run build`: passed; DOCX patch is idempotent, declarations/CSS/worker are packaged.
- `npm run package:smoke`: Vite React 17.0.2, 18.3.1 and 19.2.0 consumers passed ESM/CommonJS browser builds, type and asset checks; Next.js 16.3.5 with React 19 passed its production build. After final XLSX guard fixes and metadata edits, the exact final artifact was rebuilt and the React 18 packed smoke rerun by the measurement command.
- `npm run storybook:build`: passed; AI files copied to static output.
- Docs site `npm run build`: passed with link validation.
- Chrome/Playwright demo check: Sales, Notes and Empty worksheet states verified; literal HTML-looking text did not execute. Only observed console error was the local server's missing favicon. Screenshot committed with the XLSX guide.
- Independent review: namespace/coordinate validation bypasses and invalid-date rendering fixed and rechecked with regressions. Valid sample workbook still parses.

See `release-bundle.json` for the exact tarball integrity and measurement method. The report includes React, the inline PDF worker and lazy chunks, so summed gzip bytes are not initial-page transfer size. `adoption-baseline.json` records public API windows and limitations, not active-user counts or recommendation rank.

## Remaining release considerations

Existing dependency audit findings and React hook/test warnings remain; this was not a full security audit or an across-the-board dependency upgrade. Compatibility coverage is a build matrix plus XLSX browser smoke, not an exhaustive browser/format certification. Spreadsheet preview deliberately omits formula execution, charts, macros and exact Excel styling.

No npm release, default-branch merge, public-site deployment or promotional posting is represented by this validation report. Context7 automatic refresh needs `CONTEXT7_API_KEY` and runs after documentation lands on main.
