---
id: getting-started
title: Getting Started with react-doc-viewer
sidebar_label: Getting Started
slug: /getting-started
description: Install and set up @iamjariwala/react-doc-viewer to display PDF, Word, Excel, PowerPoint, images, video, CSV, and 20+ file types in your React app.
keywords: [react document viewer, react pdf viewer, install react-doc-viewer, getting started, pdf viewer setup]
---

# Getting Started

`@iamjariwala/react-doc-viewer` is the most feature-complete open-source document viewer for React. Render PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and 20+ file types in a single drop-in component.

## Installation

```bash
npm install @iamjariwala/react-doc-viewer
```

```bash
yarn add @iamjariwala/react-doc-viewer
```

```bash
pnpm add @iamjariwala/react-doc-viewer
```

## Quick Start

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function App() {
  const docs = [
    { uri: "https://example.com/sample.pdf" },
    { uri: "https://example.com/photo.png" },
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
```

:::info CSS Import Required
The CSS import (`@iamjariwala/react-doc-viewer/dist/index.css`) is required for correct rendering of PDF pages, annotations, thumbnails, and all styled elements.
:::

## Peer Dependencies

- `react >= 17.0.0`
- `react-dom >= 17.0.0`

Works with React 17, 18, and 19.

## What's Included

- **20+ file types** rendered in a single `<DocViewer />` component
- **PDF viewer** with zoom, pagination, and thumbnail navigation
- **Annotations** — highlight text, freehand draw, add comments
- **Drag & Drop** — drop files onto the viewer
- **14 languages** — built-in i18n
- **Theming** — CSS variables (`--rdv-*`) or theme prop
- **Custom renderers** — extend any file type
- **TypeScript** — complete type definitions
- **No external services** — all rendering is client-side

## Next Steps

- [Supported File Types](/docs/supported-file-types) — see all 20+ formats
- [Framework Guides](/docs/frameworks/nextjs) — Next.js, Vite, CRA, Remix
- [Features](/docs/features/annotations) — annotations, drag-drop, thumbnails
- [API Reference](/docs/api-reference) — all props and config options
