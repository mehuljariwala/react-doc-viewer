---
slug: how-to-add-document-viewer-react
title: How to Add a Document Viewer to Your React App in 5 Minutes
authors:
  - name: Mehul Jariwala
    url: https://github.com/mehuljariwala
tags: [react, pdf-viewer, document-viewer, tutorial]
description: Step-by-step guide to adding a document viewer to your React app that supports PDF, Word, Excel, PowerPoint, images, video, CSV, and 20+ file types.
keywords: [react document viewer tutorial, add pdf viewer react, react file preview, document viewer setup]
---

# How to Add a Document Viewer to Your React App in 5 Minutes

Need to display PDFs, Word docs, Excel spreadsheets, or images in your React app? Instead of cobbling together separate libraries for each file type, you can use `@iamjariwala/react-doc-viewer` to handle **20+ file formats** with a single component.

<!-- truncate -->

## Install

```bash
npm install @iamjariwala/react-doc-viewer
```

## Basic Setup

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function DocumentPreview() {
  const documents = [
    { uri: "https://example.com/report.pdf" },
    { uri: "https://example.com/photo.png" },
    { uri: "https://example.com/data.csv" },
  ];

  return <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />;
}
```

That's it. The component auto-detects file types and renders them with the appropriate viewer.

## Add Annotations

Want your users to highlight text, draw on documents, or leave comments?

```tsx
<DocViewer
  documents={documents}
  pluginRenderers={DocViewerRenderers}
  config={{
    annotations: {
      enableAnnotations: true,
      tools: ["select", "highlight", "pen", "comment", "eraser"],
      onAnnotationChange: (annotations) => saveToServer(annotations),
    },
  }}
/>
```

## Add Drag & Drop

Let users drop files directly onto the viewer:

```tsx
<DocViewer
  documents={documents}
  pluginRenderers={DocViewerRenderers}
  config={{
    dragDrop: {
      enableDragDrop: true,
      acceptedFileTypes: ["application/pdf", "image/*"],
      maxFileSize: 50 * 1024 * 1024,
    },
  }}
/>
```

## Works with Next.js

Add `"use client"` at the top of your component and you're good to go:

```tsx
"use client";

import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function ViewerPage() {
  return (
    <DocViewer
      documents={[{ uri: "/documents/contract.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

## Why This Library?

- **20+ file types** in one component (PDF, DOCX, XLSX, PPTX, images, video, CSV, HTML, etc.)
- **Annotations** — highlight, draw, comment, export as JSON
- **Drag & Drop** — file upload with validation
- **Thumbnail sidebar** — visual page navigation for PDFs
- **14 languages** — built-in i18n
- **No external services** — all rendering is client-side, no data leaves the browser
- **TypeScript** — full type definitions
- **Apache-2.0** — free for commercial use

Check out the [full documentation](https://github.com/mehuljariwala/react-doc-viewer) or the [live Storybook demo](https://mehuljariwala.github.io/react-doc-viewer).
