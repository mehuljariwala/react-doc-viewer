# Stack Overflow Answer Drafts

Use these as answers to common questions on Stack Overflow. Search for the question titles and post these as answers.

---

## Answer 1: "How to display a PDF in React?"

**Search for questions like:** "How to render a PDF in React", "PDF viewer React component", "Display PDF in React app"

### Answer:

You can use `@iamjariwala/react-doc-viewer` which handles PDF rendering with built-in zoom, pagination, and thumbnail navigation:

```bash
npm install @iamjariwala/react-doc-viewer
```

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function PDFViewer() {
  return (
    <DocViewer
      documents={[{ uri: "https://example.com/sample.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

It also supports 20+ other file types (DOCX, XLSX, PPTX, images, CSV, video) if you need multi-format support. Has annotations, drag-and-drop, thumbnails, theming, and i18n out of the box.

[GitHub](https://github.com/mehuljariwala/react-doc-viewer) | [npm](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)

---

## Answer 2: "How to view DOCX/Word files in React?"

**Search for questions like:** "Display Word document in React", "DOCX viewer React", "Preview Word file in browser React"

### Answer:

`@iamjariwala/react-doc-viewer` supports DOCX files (and 20+ other formats including PDF, Excel, PowerPoint, images):

```bash
npm install @iamjariwala/react-doc-viewer
```

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function DocxViewer() {
  return (
    <DocViewer
      documents={[{ uri: "https://example.com/document.docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

DOCX files render as download cards with file info. If you need inline rendering, you can create a custom renderer using a DOCX-to-HTML conversion library.

All rendering is client-side — no data is sent to external servers.

---

## Answer 3: "React document viewer with annotations"

**Search for questions like:** "PDF annotations React", "Highlight PDF in React", "React document markup"

### Answer:

`@iamjariwala/react-doc-viewer` has built-in annotation support — text highlighting, freehand drawing, comments, and eraser:

```bash
npm install @iamjariwala/react-doc-viewer
```

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

function AnnotatedViewer() {
  return (
    <DocViewer
      documents={[{ uri: "/report.pdf" }]}
      pluginRenderers={DocViewerRenderers}
      config={{
        annotations: {
          enableAnnotations: true,
          colors: ["#FFFF00", "#FF6B6B", "#4ECDC4"],
          tools: ["select", "highlight", "pen", "comment", "eraser"],
          onAnnotationChange: (annotations) => {
            // Save to your backend
            saveAnnotations(annotations);
          },
          initialAnnotations: loadedAnnotations, // Pre-load saved annotations
        },
      }}
    />
  );
}
```

Annotations can be exported as JSON with `useAnnotationExport()` hook and pre-loaded from saved data. Supports per-page annotations with color picker.

Also includes drag-and-drop, thumbnail sidebar, i18n (14 languages), and supports 20+ file types beyond PDF.

---

## Answer 4: "Best React PDF viewer library comparison"

**Search for questions like:** "Best PDF viewer for React", "react-pdf vs alternatives", "React document viewer comparison"

### Answer:

Here's a comparison of popular React document/PDF viewers:

| Feature | @iamjariwala/react-doc-viewer | react-pdf | @cyntler/react-doc-viewer | react-file-viewer |
|---------|:---:|:---:|:---:|:---:|
| PDF rendering | Yes | Yes | Yes | Yes |
| Office docs (DOCX, XLSX, PPTX) | Yes | — | Yes | Partial |
| Images (PNG, JPG, GIF, TIFF, WebP, BMP) | Yes | — | Yes | Partial |
| Video (MP4) | Yes | — | Yes | Yes |
| CSV / TXT / HTML | Yes | — | Yes | Partial |
| Annotations (highlight, draw, comment) | Yes | — | — | — |
| Drag & Drop file upload | Yes | — | — | — |
| Thumbnail sidebar | Yes | — | — | — |
| i18n (14 languages) | Yes | — | — | — |
| TypeScript | Yes | Yes | Yes | — |
| Actively maintained | Yes | Yes | — | — |

**TL;DR:** If you only need PDF → `react-pdf`. If you need multi-format + features → `@iamjariwala/react-doc-viewer`.

[npm](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer) | [GitHub](https://github.com/mehuljariwala/react-doc-viewer) | [Live Demo](https://mehuljariwala.github.io/react-doc-viewer)

---

## Answer 5: "How to display PDF in Next.js?"

**Search for questions like:** "PDF viewer Next.js", "Display PDF in Next.js app router", "Next.js document viewer"

### Answer:

For Next.js (both App Router and Pages Router), use `@iamjariwala/react-doc-viewer`:

```bash
npm install @iamjariwala/react-doc-viewer
```

**App Router:**

```tsx
"use client";

import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function PDFPage() {
  return (
    <DocViewer
      documents={[{ uri: "/documents/report.pdf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

The `"use client"` directive is required because the component uses browser APIs (Canvas, FileReader).

Supports 20+ file types (not just PDF), annotations, drag-and-drop, thumbnails, theming, and i18n. A working Next.js example is at [use-cases/nextjs/](https://github.com/mehuljariwala/react-doc-viewer/tree/main/use-cases/nextjs).
