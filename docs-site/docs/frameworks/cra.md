---
id: cra
title: Using react-doc-viewer with Create React App
sidebar_label: Create React App
description: How to display PDF and documents in Create React App using @iamjariwala/react-doc-viewer.
keywords: [create react app pdf viewer, cra document viewer, react pdf cra]
---

# Create React App Integration

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function App() {
  return (
    <DocViewer
      documents={[{ uri: `${process.env.PUBLIC_URL}/sample.pdf` }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

Use `process.env.PUBLIC_URL` to reference files in the `public/` folder.
