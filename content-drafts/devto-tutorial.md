---
title: How to Build a Document Viewer in React — PDF, Word, Excel & 20+ File Types
published: false
description: Add a full-featured document viewer to your React app in 5 minutes. Supports PDF, DOCX, XLSX, PPTX, images, video, CSV with annotations, drag-and-drop, and thumbnails.
tags: react, javascript, webdev, tutorial
cover_image:
---

Most React apps eventually need to preview documents. Maybe it's a DMS, a legal platform, or just an admin panel where users upload files. The typical approach? Install `react-pdf` for PDFs, something else for images, hack together a CSV table, and hope nobody uploads a DOCX.

There's a simpler way.

## One Component, 20+ File Types

[`@iamjariwala/react-doc-viewer`](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer) handles PDF, Word, Excel, PowerPoint, images (PNG, JPG, GIF, TIFF, WebP, BMP), video (MP4), CSV, TXT, and HTML — all in a single `<DocViewer />` component.

### Install

```bash
npm install @iamjariwala/react-doc-viewer
```

### Basic Usage

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function App() {
  const docs = [
    { uri: "https://example.com/report.pdf" },
    { uri: "https://example.com/photo.png" },
    { uri: "https://example.com/data.csv" },
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
```

File types are auto-detected from the URL. The viewer renders a header bar with navigation between documents, and the appropriate renderer for each file type.

## Add PDF Annotations

Enable text highlighting, freehand drawing, comments, and eraser:

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    annotations: {
      enableAnnotations: true,
      defaultColor: "#FFFF00",
      colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1"],
      tools: ["select", "highlight", "pen", "comment", "eraser"],
      onAnnotationChange: (annotations) => {
        // Save to your backend
        console.log(annotations);
      },
    },
  }}
/>
```

Annotations can be exported as JSON and pre-loaded from saved data — useful for legal review, education, and collaboration workflows.

## Drag & Drop File Upload

Let users drop files directly onto the viewer:

```tsx
config={{
  dragDrop: {
    enableDragDrop: true,
    acceptedFileTypes: ["application/pdf", "image/*"],
    maxFileSize: 50 * 1024 * 1024, // 50 MB
    dropBehavior: "append",
    onDrop: (files) => console.log("Dropped:", files),
    onDropRejected: (files, reason) => alert(`Rejected: ${reason}`),
  },
}}
```

## Thumbnail Sidebar

Add a visual sidebar with page thumbnails for PDFs:

```tsx
config={{
  thumbnail: {
    enableThumbnails: true,
    thumbnailWidth: 120,
    sidebarDefaultOpen: true,
  },
}}
```

Click any thumbnail to jump to that page.

## Works with Next.js

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

Also works with Vite, Create React App, Remix, and Gatsby.

## Theming with CSS Variables

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  theme={{
    primary: "#1a1a2e",
    secondary: "#16213e",
    textPrimary: "#e94560",
  }}
/>
```

Or override directly in CSS:

```css
#react-doc-viewer {
  --rdv-primary: #1a1a2e;
  --rdv-secondary: #16213e;
}
```

## Why Not Just Use react-pdf?

`react-pdf` is excellent for PDF-only use cases. But if your app handles multiple file types, you'd need to install and maintain separate libraries for images, CSV, video, etc.

| Feature | @iamjariwala/react-doc-viewer | react-pdf |
|---------|:---:|:---:|
| PDF rendering | Yes | Yes |
| Office docs | Yes | — |
| Images (6 formats) | Yes | — |
| Video, CSV, HTML, TXT | Yes | — |
| Annotations | Yes | — |
| Drag & Drop | Yes | — |
| Thumbnails | Yes | — |
| i18n (14 languages) | Yes | — |

## Security

- HTML is sanitized with DOMPurify (no XSS)
- No data sent to external servers
- No Microsoft iframe for Office docs
- All rendering is client-side

## Try It

- [npm](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
- [Live Demo (Storybook)](https://mehuljariwala.github.io/react-doc-viewer)
- [GitHub](https://github.com/mehuljariwala/react-doc-viewer)

---

If this helped, drop a star on [GitHub](https://github.com/mehuljariwala/react-doc-viewer) and let me know what features you'd like next.
