---
id: nextjs
title: Using react-doc-viewer with Next.js
sidebar_label: Next.js
description: How to display PDF and documents in Next.js using @iamjariwala/react-doc-viewer. Works with App Router and Pages Router.
keywords: [nextjs pdf viewer, next.js document viewer, react pdf nextjs, display pdf next.js, app router pdf]
---

# Next.js Integration

`@iamjariwala/react-doc-viewer` works with both the **App Router** and **Pages Router** in Next.js.

## App Router

```tsx
"use client";

import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function DocumentPage() {
  return (
    <DocViewer
      documents={[{ uri: "/documents/report.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

:::info
The `"use client"` directive is required in App Router since DocViewer uses browser APIs (Canvas, FileReader, etc.).
:::

## Pages Router

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function DocumentPage() {
  return (
    <DocViewer
      documents={[{ uri: "/documents/report.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

## Working Example

A complete Next.js example is included in the repository at [`use-cases/nextjs/`](https://github.com/mehuljariwala/react-doc-viewer/tree/main/use-cases/nextjs).
