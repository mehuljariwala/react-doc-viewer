---
id: performance
title: Performance and reproducible bundle measurements
---

# Performance and reproducible bundle measurements

Run `npm run measure:bundle` to build representative consumers and report minified and gzip assets. Keep the generated report with release evidence. Record the commit, dependency lockfile, Node version and which entry/renderers were selected.

Package archive size, unpacked size and browser transfer size are different measurements. Do not use npm's unpacked size as a browser-download benchmark. Gzip totals across separate chunks are an approximation; browser caching and compression settings change transfer costs.

Selective renderer imports control accepted formats, but shared imports can keep PDF dependencies in the application bundle. We do not promise that importing only one renderer removes all other code. The XLSX parser uses a dynamic import so parsing code can load when needed.

For a meaningful comparison with another library, use the same bundler, production mode, React version, document types and feature requirements. Publish the fixture and measured output; avoid unsourced size or speed rankings.

Spreadsheet parsing has documented [resource/display limits](guides/xlsx.md). Large PDFs and image-heavy DOCX files also need testing on representative devices. Build success does not establish runtime rendering speed or memory usage.
