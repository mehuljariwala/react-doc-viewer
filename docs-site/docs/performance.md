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

## PDF worker packaging tradeoff

The current default build embeds the PDF worker into each library format so the viewer works without application-specific worker URL setup. An ESM consumer uses the ESM build; a CommonJS consumer uses the CommonJS build. They do not normally download both. The separately exported `dist/pdf.worker.mjs` also increases the npm archive size, as recorded in the bundle report.

This is a known size tradeoff, not a size optimization. Moving to an external worker requires a tested consumer URL configuration contract across supported bundlers. The worker export alone does not create a browser URL, and a bare relative URL can break deployed applications. That contract change is deferred from this update to preserve the existing drop-in setup.
