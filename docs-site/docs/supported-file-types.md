---
id: supported-file-types
title: Supported File Types — 20+ Formats
sidebar_label: Supported File Types
description: Complete list of file types supported by @iamjariwala/react-doc-viewer including PDF, Word, Excel, PowerPoint, images, video, CSV, and HTML.
keywords: [supported file types, pdf, docx, xlsx, pptx, image viewer, video player, csv viewer, html renderer, tiff viewer]
---

# Supported File Types

`@iamjariwala/react-doc-viewer` supports **20+ file formats** out of the box:

| Extension | MIME Type | Renderer |
|-----------|-----------|----------|
| pdf | `application/pdf` | Full viewer with zoom, pagination, thumbnails |
| png | `image/png` | Image with checkerboard background |
| jpg / jpeg | `image/jpg`, `image/jpeg` | Image viewer |
| gif | `image/gif` | Image viewer (animated GIF support) |
| bmp | `image/bmp` | Image viewer |
| tiff | `image/tiff` | Canvas-based TIFF renderer |
| webp | `image/webp` | Image viewer |
| csv | `text/csv` | Parsed table with configurable delimiter |
| txt | `text/plain` | Monospace text viewer |
| htm / html | `text/htm`, `text/html` | Sandboxed iframe with DOMPurify sanitization |
| mp4 | `video/mp4` | Native video player with controls |
| doc | `application/msword` | Download card |
| docx | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | Download card |
| xls | `application/vnd.ms-excel` | Download card |
| xlsx | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | Download card |
| ppt | `application/vnd.ms-powerpoint` | Download card |
| pptx | `application/vnd.openxmlformats-officedocument.presentationml.presentation` | Download card |
| odt | `application/vnd.oasis.opendocument.text` | Download card |

:::note MS Office Documents
MS Office documents (doc, docx, xls, xlsx, ppt, pptx) render as download cards showing file name, type, and a download link. No external service or public URL is required. Need inline rendering? Create a [Custom Renderer](/docs/custom-renderers).
:::

## Available Renderers

Import all renderers or pick only what you need:

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";

// Or import individually for tree-shaking
import DocViewer, { PDFRenderer, PNGRenderer } from "@iamjariwala/react-doc-viewer";

<DocViewer pluginRenderers={[PDFRenderer, PNGRenderer]} documents={docs} />;
```

**Individual renderers:** `BMPRenderer`, `CSVRenderer`, `GIFRenderer`, `HTMLRenderer`, `JPGRenderer`, `MSDocRenderer`, `PDFRenderer`, `PNGRenderer`, `TIFFRenderer`, `TXTRenderer`, `VideoRenderer`, `WebPRenderer`
