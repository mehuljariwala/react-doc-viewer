---
title: Preview a PDF
---

# Preview a PDF

Install the package and import its CSS once. Put a PDF at your application's public URL `/sample.pdf`.

```tsx
import DocViewer, { PDFRenderer } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function PdfPreview() {
  return (
    <DocViewer
      documents={[{ uri: "/sample.pdf", fileType: "pdf" }]}
      pluginRenderers={[PDFRenderer]}
      config={{
        search: { enableSearch: true },
        thumbnail: { enableThumbnails: true },
      }}
      style={{ height: 600 }}
    />
  );
}
```

Use a client-only boundary in frameworks that render on the server. See the [Next.js example](../frameworks/nextjs.md). The distribution includes its PDF worker; the packed consumer tests check that asset. Cross-origin URLs need suitable CORS headers from the document server.
