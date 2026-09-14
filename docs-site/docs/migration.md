---
id: migration
title: Migrating from another viewer
---

# Migrating from another viewer

## From @cyntler/react-doc-viewer

This package is a fork with a related API, but do not assume every configuration or CSS override is interchangeable.

1. Replace the dependency with `@iamjariwala/react-doc-viewer`.
2. Update imports and add `@iamjariwala/react-doc-viewer/dist/index.css` once.
3. Pass `pluginRenderers` explicitly. Choose local renderers for private documents.
4. Review Office Online and server-conversion behavior in [Security](security.md).
5. Test the file types, request headers, callbacks, annotations and CSS overrides your application uses.

## From react-pdf or react-file-viewer

This is a viewer component with its own API, not a drop-in replacement for their components.

```tsx
import DocViewer, { PDFRenderer } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

<DocViewer
  documents={[{ uri: pdfUrl, fileType: "pdf" }]}
  pluginRenderers={[PDFRenderer]}
/>;
```

Replace your old document/page components, then map required navigation and callbacks to the documented viewer API. Do not carry over unrelated props. Measure your application bundle before and after the migration; a smaller bundle is not guaranteed.
