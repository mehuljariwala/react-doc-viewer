---
id: migration
title: Migrating from Other Libraries
sidebar_label: Migration
description: Migrate to @iamjariwala/react-doc-viewer from @cyntler/react-doc-viewer, react-pdf, or react-file-viewer with step-by-step guides.
keywords: [migrate react-doc-viewer, replace react-pdf, replace react-file-viewer, cyntler migration, switch document viewer]
---

# Migrating from Other Libraries

## From @cyntler/react-doc-viewer

1. Replace the package: `npm uninstall @cyntler/react-doc-viewer && npm install @iamjariwala/react-doc-viewer`
2. Update imports: replace `@cyntler/react-doc-viewer` with `@iamjariwala/react-doc-viewer`
3. Add the CSS import: `import "@iamjariwala/react-doc-viewer/dist/index.css"`
4. All existing props and config options are compatible

## From react-pdf

1. Install: `npm install @iamjariwala/react-doc-viewer`
2. Replace `<Document>` + `<Page>` with `<DocViewer documents={[{ uri: pdfUrl }]} />`
3. The built-in PDF renderer handles zoom, pagination, and page navigation automatically

## From react-file-viewer

1. Install: `npm install @iamjariwala/react-doc-viewer`
2. Replace `<FileViewer fileType={type} filePath={path} />` with `<DocViewer documents={[{ uri: path }]} />`
3. File type is detected automatically from the URL
