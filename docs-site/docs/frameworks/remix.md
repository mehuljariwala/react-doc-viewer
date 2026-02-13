---
id: remix
title: Using react-doc-viewer with Remix
sidebar_label: Remix
description: How to display PDF and documents in Remix using @iamjariwala/react-doc-viewer with ClientOnly wrapper.
keywords: [remix pdf viewer, remix document viewer, react pdf remix]
---

# Remix Integration

Use `ClientOnly` from `remix-utils` since DocViewer requires browser APIs.

```tsx
import { ClientOnly } from "remix-utils/client-only";

export default function DocumentRoute() {
  return (
    <ClientOnly fallback={<p>Loading viewer...</p>}>
      {() => {
        const DocViewer = require("@iamjariwala/react-doc-viewer").default;
        const { DocViewerRenderers } = require("@iamjariwala/react-doc-viewer");
        require("@iamjariwala/react-doc-viewer/dist/index.css");
        return (
          <DocViewer
            documents={[{ uri: "/documents/report.pdf" }]}
            pluginRenderers={DocViewerRenderers}
          />
        );
      }}
    </ClientOnly>
  );
}
```
