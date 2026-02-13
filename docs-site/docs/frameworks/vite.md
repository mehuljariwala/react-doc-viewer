---
id: vite
title: Using react-doc-viewer with Vite
sidebar_label: Vite
description: How to display PDF and documents in a Vite React project using @iamjariwala/react-doc-viewer.
keywords: [vite pdf viewer, vite document viewer, react vite pdf, display pdf vite]
---

# Vite Integration

No additional configuration is needed for Vite projects.

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function App() {
  return (
    <DocViewer
      documents={[{ uri: "/sample.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

Place documents in the `public/` folder to serve them statically.
