---
id: supported-file-types
title: Supported file types and rendering modes
---

# Supported file types and rendering modes

A recognized extension is not a promise of native inline rendering. The following describes this branch; XLSXRenderer is unreleased until the next npm release.

- **PDF:** local PDF viewer with pagination, search, zoom and optional annotations.
- **DOCX:** local inline preview by default; optional Office Online mode for public HTTP(S) URLs. Complex Word layouts may differ from Word.
- **XLSX:** local read-only table, sheet selector and bounded preview. See [XLSX](guides/xlsx.md).
- **DOC, XLS, PPT, PPTX, ODT:** Microsoft Office Online for HTTP(S) URLs; download card for blob/local URLs. External viewer availability and public access are required.
- **Apple Pages:** download card.
- **PNG, JPG/JPEG, GIF, BMP, WebP:** image preview. TIFF uses a canvas renderer.
- **CSV:** parsed data table with configurable delimiter.
- **TXT:** text preview. HTML and Markdown use sanitized content. RTF support is a simplified preview, not full Word layout fidelity.
- **MP4:** browser video controls; codec support depends on the browser.

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

<DocViewer
  documents={[{ uri: "/budget.xlsx", fileType: "xlsx" }]}
  pluginRenderers={DocViewerRenderers}
/>;
```

Explicit `fileType` is useful for signed URLs and servers returning generic MIME types. File extensions and MIME types are renderer identifiers, not file-content validation. Do not label a legacy XLS file as XLSX.

See [Security](security.md) before sending private Office URLs or enabling server conversion.
