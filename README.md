[![npm version](https://img.shields.io/npm/v/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![npm downloads](https://img.shields.io/npm/dm/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![npm total downloads](https://img.shields.io/npm/dt/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@iamjariwala/react-doc-viewer)](https://bundlephobia.com/package/@iamjariwala/react-doc-viewer)
[![license](https://img.shields.io/npm/l/@iamjariwala/react-doc-viewer.svg)](https://github.com/mehuljariwala/react-doc-viewer/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%20%7C%2018%20%7C%2019-61dafb.svg)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mehuljariwala/react-doc-viewer/pulls)
[![GitHub stars](https://img.shields.io/github/stars/mehuljariwala/react-doc-viewer?style=social)](https://github.com/mehuljariwala/react-doc-viewer)

# @iamjariwala/react-doc-viewer

**The most feature-complete open-source document viewer for React.** Render PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and 20+ file types in a single drop-in component. Built-in annotations, drag-and-drop file upload, thumbnail sidebar, zoom controls, page navigation, theming, and i18n (14 languages) -- all with full TypeScript support.

> **One component. 20+ file types. Zero hassle.**

```bash
npm install @iamjariwala/react-doc-viewer
```

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

<DocViewer
  documents={[{ uri: "https://example.com/sample.pdf" }]}
  pluginRenderers={DocViewerRenderers}
/>;
```

[Live Demo (Storybook)](https://mehuljariwala.github.io/react-doc-viewer) | [npm](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer) | [GitHub](https://github.com/mehuljariwala/react-doc-viewer)

---

## Why @iamjariwala/react-doc-viewer?

Most React document viewers only handle PDFs or require expensive commercial licenses. This library gives you **everything in one package**:

- **20+ file types** in a single `<DocViewer />` component -- no need to install separate libraries for PDF, images, CSV, video, etc.
- **Annotations** -- highlight text, freehand draw, add comments, and export as JSON
- **Drag & Drop** -- drop files directly onto the viewer to add or replace documents
- **Thumbnail Sidebar** -- visual page navigation with click-to-jump for PDFs
- **Programmatic Control** -- jump to any page via ref or prop, navigate documents programmatically
- **14 Languages** -- built-in i18n with community translations
- **Theming & CSS Variables** -- full color control via theme object or `--rdv-*` CSS custom properties
- **Custom Renderers** -- extend or replace any file type renderer with your own React component
- **TypeScript First** -- complete type definitions, generics, and IntelliSense support
- **Tree-Shakeable** -- import only the renderers you need to minimize bundle size
- **No External Services** -- all rendering happens client-side, no data leaves the browser
- **Works Everywhere** -- Next.js, Vite, Create React App, Remix, Gatsby, and any React 17+ project

### Best for

| Use Case | Why this library |
| -------- | ---------------- |
| **Document Management Systems (DMS)** | Preview any uploaded file without leaving the app |
| **Legal & Compliance Platforms** | Annotate, highlight, and comment on contracts and filings |
| **Education & LMS** | Display course materials in PDF, DOCX, video, and image formats |
| **Healthcare & Medical Records** | View lab reports, imaging files, and clinical documents |
| **Real Estate & Insurance** | Preview property documents, claims, and inspection photos |
| **File Browsers & Cloud Storage** | Inline file preview for any storage UI |
| **Internal Tools & Admin Panels** | Quick document preview without downloading |
| **Content Platforms & CMS** | Embedded viewer for user-uploaded content |

---

## How It Compares

Looking for the best React document viewer? Here's how `@iamjariwala/react-doc-viewer` stacks up against popular alternatives:

| Feature | @iamjariwala/react-doc-viewer | react-pdf | @cyntler/react-doc-viewer | react-file-viewer |
| ------- | :--: | :--: | :--: | :--: |
| PDF rendering | Yes | Yes | Yes | Yes |
| Office docs (Word, Excel, PPT) | Yes | -- | Yes | Partial |
| Images (PNG, JPG, GIF, WebP, TIFF, BMP) | Yes | -- | Yes | Partial |
| Video (MP4) | Yes | -- | Yes | Yes |
| CSV / TXT / HTML | Yes | -- | Yes | Partial |
| Drag & Drop file upload | Yes | -- | -- | -- |
| Annotations (highlight, draw, comment) | Yes | -- | -- | -- |
| Thumbnail sidebar navigation | Yes | -- | -- | -- |
| Programmatic page jump | Yes | Yes | -- | -- |
| i18n (14 languages) | Yes | -- | -- | -- |
| Custom renderers | Yes | -- | Yes | -- |
| Theming (CSS variables) | Yes | -- | Yes | -- |
| TypeScript | Yes | Yes | Yes | -- |
| Tree-shakeable | Yes | Yes | -- | -- |
| No external services | Yes | Yes | -- | -- |
| Zero styled-components | Yes | Yes | -- | -- |
| Actively maintained (2025) | Yes | Yes | -- | -- |
| License | Apache-2.0 | MIT | MIT | MIT |

> **TL;DR** -- If you only render PDFs, `react-pdf` is lighter. If you need multi-format support, annotations, drag-and-drop, or thumbnails, this library covers more ground in a single package.

---

### Feature Highlights

| | | |
|:--|:--|:--|
| **Multi-Format Support** -- PDF, DOCX, images, video, CSV & more | **Drag & Drop** -- Drop files directly onto the viewer | **Annotations** -- Highlight, draw, and comment on documents |
| **Thumbnail Sidebar** -- Visual page navigation for PDFs | **14 Languages** -- Built-in i18n with community translations | **Theming** -- Full color control via CSS variables |
| **Custom Renderers** -- Extend or replace any file type | **Page Navigation** -- Programmatic page jump via ref or prop | **Security** -- DOMPurify sanitization, no external iframes |

---

### What's New in v1.1.0

- **Security: HTML XSS fix** -- HTML renderer now sanitizes content with DOMPurify before rendering
- **Security: MS Office docs** -- Removed external iframe dependency; Office files now render as download cards with file info
- **Removed styled-components** -- All styling migrated to plain CSS with CSS custom properties, reducing bundle size
- **Smaller bundle** -- Removed `styled-components`, `core-js`, and `ajv` dependencies (~300-400KB savings)
- **CSS custom properties** -- Theming now uses `--rdv-*` CSS variables for full customizability

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Supported File Types](#supported-file-types)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Framework Guides](#framework-guides)
  - [Next.js (App Router & Pages Router)](#nextjs-app-router--pages-router)
  - [Vite](#vite)
  - [Create React App](#create-react-app)
  - [Remix](#remix)
- [Documents](#documents)
  - [Remote & Local Files](#remote--local-files)
  - [Initial Active Document](#initial-active-document)
  - [Controlled Document](#controlled-document)
  - [Blob / Uploaded Files](#blob--uploaded-files)
- [Renderers](#renderers)
  - [Built-in Renderers](#built-in-renderers)
  - [Custom Renderer](#custom-renderer)
  - [Custom File Loader](#custom-file-loader)
- [Features](#features)
  - [Drag & Drop File Upload](#drag--drop-file-upload)
  - [Thumbnail Sidebar](#thumbnail-sidebar)
  - [Annotations (Highlight, Draw, Comment)](#annotations-highlight-draw-comment)
  - [Page Navigation & Page Jump](#page-navigation--page-jump)
- [Configuration](#configuration)
  - [Full Config Reference](#full-config-reference)
  - [Overriding Header](#overriding-header)
  - [Overriding Loading Renderer](#overriding-loading-renderer)
  - [Overriding No Renderer (Error)](#overriding-no-renderer-error)
- [Theming & CSS Variables](#theming--css-variables)
- [Styling & CSS Customization](#styling--css-customization)
- [Internationalization (i18n) -- 14 Languages](#internationalization-i18n----14-languages)
- [Performance & Bundle Size](#performance--bundle-size)
- [Security](#security)
- [Advanced](#advanced)
  - [DocViewerRef API](#docviewerref-api)
  - [Custom HTTP Verb for S3 / Cloud Storage](#custom-http-verb-for-s3--cloud-storage)
  - [Custom Request Headers for Authenticated APIs](#custom-request-headers-for-authenticated-apis)
- [FAQ](#faq)
- [Migrating from Other Libraries](#migrating-from-other-libraries)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Supported File Types

`@iamjariwala/react-doc-viewer` supports **20+ file formats** out of the box:

| Extension | MIME Type | Renderer |
| --------- | --------- | -------- |
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

> [!NOTE]
> MS Office documents (doc, docx, xls, xlsx, ppt, pptx) render as download cards showing file name, type, and a download link. No external service or public URL is required. Need inline rendering? Create a [Custom Renderer](#custom-renderer) with your preferred conversion service.

## Live Demo

Try all features interactively:

[Storybook Demo](https://mehuljariwala.github.io/react-doc-viewer)

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

```bash
bun add @iamjariwala/react-doc-viewer
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

> The CSS import (`@iamjariwala/react-doc-viewer/dist/index.css`) is required for correct rendering of PDF pages, annotations, thumbnails, and all styled elements.

## Framework Guides

### Next.js (App Router & Pages Router)

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

> The `"use client"` directive is required when using the App Router since DocViewer uses browser APIs. A working Next.js example is included at `use-cases/nextjs/`.

### Vite

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

### Create React App

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

### Remix

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

## Documents

### Remote & Local Files

Each document needs a `uri` pointing to a file URL or a local file path.

```tsx
const docs = [
  { uri: "https://example.com/file.pdf" },
  { uri: require("./files/document.pdf") },
];
```

### Initial Active Document

By default the first document is displayed. Use `initialActiveDocument` to change this:

```tsx
<DocViewer
  documents={docs}
  initialActiveDocument={docs[1]}
  pluginRenderers={DocViewerRenderers}
/>
```

### Controlled Document

Control which document is displayed with `activeDocument` and `onDocumentChange`:

```tsx
const [activeDocument, setActiveDocument] = useState(docs[0]);

<DocViewer
  documents={docs}
  activeDocument={activeDocument}
  onDocumentChange={setActiveDocument}
  pluginRenderers={DocViewerRenderers}
/>
```

### Blob / Uploaded Files

Display user-uploaded files using blob URLs:

```tsx
const [files, setFiles] = useState<File[]>([]);

<>
  <input
    type="file"
    accept=".pdf"
    multiple
    onChange={(e) =>
      e.target.files?.length && setFiles(Array.from(e.target.files))
    }
  />
  <DocViewer
    documents={files.map((file) => ({
      uri: window.URL.createObjectURL(file),
      fileName: file.name,
    }))}
    pluginRenderers={DocViewerRenderers}
  />
</>
```

## Renderers

### Built-in Renderers

Use all built-in renderers:

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";

<DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />;
```

Or import only what you need for smaller bundles:

```tsx
import DocViewer, { PDFRenderer, PNGRenderer } from "@iamjariwala/react-doc-viewer";

<DocViewer pluginRenderers={[PDFRenderer, PNGRenderer]} documents={docs} />;
```

**Available renderers:** `BMPRenderer`, `CSVRenderer`, `GIFRenderer`, `HTMLRenderer`, `JPGRenderer`, `MSDocRenderer`, `PDFRenderer`, `PNGRenderer`, `TIFFRenderer`, `TXTRenderer`, `VideoRenderer`, `WebPRenderer`

### Custom Renderer

Create a renderer for any file type by defining `fileTypes`, `weight`, and a React component:

```tsx
import { DocRenderer } from "@iamjariwala/react-doc-viewer";

const MyPNGRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;
  return <img src={currentDocument.fileData as string} />;
};

MyPNGRenderer.fileTypes = ["png", "image/png"];
MyPNGRenderer.weight = 1;

<DocViewer pluginRenderers={[MyPNGRenderer]} documents={docs} />;
```

### Custom File Loader

Prevent the default file loading and handle it yourself:

```tsx
MyPNGRenderer.fileLoader = ({ documentURI, signal, fileLoaderComplete }) => {
  myCustomLoader(documentURI).then(() => {
    fileLoaderComplete();
  });
};
```

## Features

### Drag & Drop File Upload

Enable file drag-and-drop to add or replace documents in the viewer. Supports file type filtering, size limits, and callbacks.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    dragDrop: {
      enableDragDrop: true,
      acceptedFileTypes: ["application/pdf", "image/*"],
      maxFileSize: 50 * 1024 * 1024, // 50 MB
      dropBehavior: "append",
      onDrop: (files) => {
        console.log("Files dropped:", files);
      },
      onDropRejected: (files, reason) => {
        console.log("Rejected:", reason);
      },
    },
  }}
/>
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableDragDrop` | `boolean` | `false` | Enable drag-and-drop |
| `acceptedFileTypes` | `string[]` | all types | MIME types to accept (supports wildcards like `image/*`) |
| `maxFileSize` | `number` | unlimited | Max file size in bytes |
| `dropBehavior` | `"append" \| "replace"` | `"append"` | Add to or replace existing documents |
| `onDrop` | `(files: File[]) => void` | -- | Callback when files are accepted |
| `onDropRejected` | `(files: File[], reason: "file-type" \| "file-size" \| "unknown") => void` | -- | Callback when files are rejected |

### Thumbnail Sidebar

Display a visual sidebar with page thumbnails for quick PDF navigation. Click any thumbnail to jump to that page.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    thumbnail: {
      enableThumbnails: true,
      thumbnailWidth: 120,
      sidebarDefaultOpen: true,
    },
  }}
/>
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableThumbnails` | `boolean` | `false` | Enable thumbnail sidebar |
| `thumbnailWidth` | `number` | `120` | Width of each thumbnail in pixels |
| `sidebarDefaultOpen` | `boolean` | `false` | Open sidebar by default |

### Annotations (Highlight, Draw, Comment)

Add highlights, freehand drawings, and comments to your documents. Export annotations as JSON for persistence.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    annotations: {
      enableAnnotations: true,
      defaultColor: "#FFFF00",
      colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      tools: ["select", "highlight", "pen", "comment", "eraser"],
      onAnnotationChange: (annotations) => {
        console.log("Annotations:", annotations);
      },
      initialAnnotations: [],
    },
  }}
/>
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableAnnotations` | `boolean` | `false` | Enable annotation toolbar |
| `defaultColor` | `string` | -- | Default color for new annotations |
| `colors` | `string[]` | -- | Color palette for the picker |
| `tools` | `AnnotationTool[]` | all | Which tools to show: `"select"`, `"highlight"`, `"pen"`, `"comment"`, `"eraser"` |
| `onAnnotationChange` | `(annotations: IAnnotation[]) => void` | -- | Callback when annotations change |
| `initialAnnotations` | `IAnnotation[]` | `[]` | Pre-loaded annotations |

**Exporting annotations** -- Use the `useAnnotationExport` hook:

```tsx
import { useAnnotationExport } from "@iamjariwala/react-doc-viewer";

function AnnotationControls() {
  const {
    exportAnnotations,
    exportAsJSON,
    downloadAnnotations,
    getAnnotationsForPage,
    annotationCount,
  } = useAnnotationExport();

  return (
    <button onClick={() => downloadAnnotations("my-annotations.json")}>
      Download {annotationCount} Annotations
    </button>
  );
}
```

### Page Navigation & Page Jump

Jump to a specific page using a ref or the `jumpToPage` prop.

**Using ref:**

```tsx
import DocViewer, { DocViewerRef } from "@iamjariwala/react-doc-viewer";

const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} pluginRenderers={DocViewerRenderers} />;

docViewerRef.current?.goToPage(5);
docViewerRef.current?.prev();
docViewerRef.current?.next();
```

**Using the `jumpToPage` prop:**

```tsx
const [page, setPage] = useState(1);

<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} jumpToPage={page} />;
```

## Configuration

### Full Config Reference

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    header: {
      disableHeader: false,
      disableFileName: false,
      retainURLParams: false,
      overrideComponent: MyHeader,
    },
    loadingRenderer: {
      overrideComponent: MyLoader,
      showLoadingTimeout: 500,
    },
    noRenderer: {
      overrideComponent: MyError,
    },
    csvDelimiter: ",",
    pdfZoom: {
      defaultZoom: 1.1,
      zoomJump: 0.2,
    },
    pdfVerticalScrollByDefault: true,
    dragDrop: {
      enableDragDrop: true,
      acceptedFileTypes: ["application/pdf", "image/*"],
      maxFileSize: 50 * 1024 * 1024,
      dropBehavior: "append",
      onDrop: (files) => console.log(files),
      onDropRejected: (files, reason) => console.log(reason),
    },
    thumbnail: {
      enableThumbnails: true,
      thumbnailWidth: 120,
      sidebarDefaultOpen: false,
    },
    annotations: {
      enableAnnotations: true,
      defaultColor: "#FFFF00",
      colors: ["#FFFF00", "#FF6B6B", "#4ECDC4"],
      tools: ["select", "highlight", "pen", "comment", "eraser"],
      onAnnotationChange: (annotations) => console.log(annotations),
      initialAnnotations: [],
    },
  }}
/>
```

### Overriding Header

```tsx
import { IHeaderOverride } from "@iamjariwala/react-doc-viewer";

const MyHeader: IHeaderOverride = (state, previousDocument, nextDocument) => {
  if (!state.currentDocument) return null;

  return (
    <div>
      <span>{state.currentDocument.uri}</span>
      <button onClick={previousDocument} disabled={state.currentFileNo === 0}>
        Prev
      </button>
      <button
        onClick={nextDocument}
        disabled={state.currentFileNo >= state.documents.length - 1}
      >
        Next
      </button>
    </div>
  );
};

<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{ header: { overrideComponent: MyHeader } }}
/>;
```

### Overriding Loading Renderer

```tsx
const MyLoader = ({ document, fileName }: { document: IDocument | undefined; fileName: string }) => {
  return <div>Loading {fileName || document?.fileType}...</div>;
};

<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    loadingRenderer: {
      overrideComponent: MyLoader,
      showLoadingTimeout: 500,
    },
  }}
/>;
```

### Overriding No Renderer (Error)

```tsx
const MyError = ({ document, fileName }: { document: IDocument | undefined; fileName: string }) => {
  return <div>Unsupported file: {fileName || document?.fileType}</div>;
};

<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{ noRenderer: { overrideComponent: MyError } }}
/>;
```

## Theming & CSS Variables

Customize the viewer's appearance with a theme object. Values are injected as CSS custom properties (`--rdv-*`) on the container element.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  theme={{
    primary: "#5296d8",
    secondary: "#ffffff",
    tertiary: "#5296d899",
    textPrimary: "#ffffff",
    textSecondary: "#5296d8",
    textTertiary: "#00000099",
    disableThemeScrollbar: false,
  }}
/>
```

| Property | CSS Variable | Default | Description |
| -------- | ------------ | ------- | ----------- |
| `primary` | `--rdv-primary` | `"#fff"` | Primary background color |
| `secondary` | `--rdv-secondary` | `"#000"` | Secondary background color |
| `tertiary` | `--rdv-tertiary` | `"#ffffff99"` | Tertiary background color |
| `textPrimary` | `--rdv-text-primary` | `"#000"` | Primary text color |
| `textSecondary` | `--rdv-text-secondary` | `"#fff"` | Secondary text color |
| `textTertiary` | `--rdv-text-tertiary` | `"#00000044"` | Tertiary text color |
| `disableThemeScrollbar` | -- | `false` | Disable themed scrollbar styling |

## Styling & CSS Customization

**CSS class:**

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className="my-viewer" />
```

**Inline styles:**

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ width: 500, height: 500 }} />
```

**Override internal elements with CSS classes:**

All internal elements use `.rdv-*` class names that you can target:

```css
.rdv-container {
  border-radius: 10px;
}

.rdv-header-bar {
  background-color: #faf;
}

.rdv-pdf-controls {
  gap: 12px;
}
```

**Override CSS custom properties globally:**

```css
#react-doc-viewer {
  --rdv-primary: #1a1a2e;
  --rdv-secondary: #16213e;
  --rdv-text-primary: #e94560;
}
```

**Common CSS class reference:**

| Class | Element |
| ----- | ------- |
| `.rdv-container` | Root container |
| `.rdv-header-bar` | Top header bar |
| `.rdv-file-name` | File name display |
| `.rdv-doc-nav-prev` / `.rdv-doc-nav-next` | Document navigation buttons |
| `.rdv-pdf-controls` | PDF control bar (zoom, pagination) |
| `.rdv-pdf-page-wrapper` | Individual PDF page wrapper |
| `.rdv-thumbnail-sidebar` | Thumbnail sidebar container |
| `.rdv-annotation-toolbar` | Annotation toolbar |
| `.rdv-image-container` | Image renderer container |
| `.rdv-csv-container` | CSV table container |
| `.rdv-txt-container` | Text renderer container |
| `.rdv-video-container` | Video player container |
| `.rdv-msdoc-container` | Office document download card |
| `.rdv-loading-container` | Loading spinner container |

## Internationalization (i18n) -- 14 Languages

Pass a `language` prop to translate the UI into any of the 14 supported languages:

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} language="pl" />
```

**Supported languages:**

| Code | Language | Code | Language |
| ---- | -------- | ---- | -------- |
| `en` | English | `ja` | Japanese |
| `ar` | Arabic | `pl` | Polish |
| `de` | German | `pt` | Portuguese |
| `es` | Spanish | `ru` | Russian |
| `fr` | French | `se` | Swedish |
| `it` | Italian | `sr` | Serbian (Latin) |
| `tr` | Turkish | `sr_cyr` | Serbian (Cyrillic) |

Translation files are in `src/locales/`. PRs for new languages are welcome.

## Performance & Bundle Size

v1.1.0 significantly reduced bundle size by removing heavy dependencies:

| Dependency removed | Size saved |
| ------------------ | ---------- |
| `styled-components` | ~160KB minified |
| `core-js` | ~150KB minified |
| `ajv` | ~70KB minified |
| **Total savings** | **~380KB** |

**Optimization tips:**

- **Tree-shake renderers** -- Import only the renderers you need instead of `DocViewerRenderers`
- **Lazy load the viewer** -- Use `React.lazy()` to code-split the viewer into its own chunk
- **Set dimensions** -- Always give the viewer explicit `width` and `height` via `style` prop to prevent layout shifts

```tsx
const DocViewer = React.lazy(() => import("@iamjariwala/react-doc-viewer"));

<Suspense fallback={<div>Loading viewer...</div>}>
  <DocViewer documents={docs} pluginRenderers={[PDFRenderer]} />
</Suspense>
```

## Security

- **HTML sanitization** -- All HTML content is sanitized with [DOMPurify](https://github.com/cure53/DOMPurify) before rendering. Script tags, object embeds, and form elements are stripped.
- **No external services** -- All document rendering happens client-side. No file data is sent to third-party servers.
- **No external iframes** -- MS Office documents render as local download cards instead of being sent to Microsoft's viewing service.
- **Sandboxed HTML** -- HTML documents render inside an iframe with sanitized content.

## Advanced

### DocViewerRef API

Control the viewer programmatically:

```tsx
import DocViewer, { DocViewerRef } from "@iamjariwala/react-doc-viewer";

const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} pluginRenderers={DocViewerRenderers} />;

docViewerRef.current?.prev();
docViewerRef.current?.next();
docViewerRef.current?.goToPage(3);
```

| Method | Description |
| ------ | ----------- |
| `prev()` | Navigate to the previous document |
| `next()` | Navigate to the next document |
| `goToPage(n)` | Jump to page `n` in the current PDF |

### Custom HTTP Verb for S3 / Cloud Storage

Some services (like AWS S3 pre-signed URLs) require a specific HTTP verb for pre-fetching. By default, `HEAD` is used:

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} prefetchMethod="GET" />
```

### Custom Request Headers for Authenticated APIs

Provide custom headers for authenticated requests (JWT, API keys, etc.):

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  prefetchMethod="GET"
  requestHeaders={{
    "X-Access-Token": "1234567890",
    "My-Custom-Header": "value",
  }}
/>
```

## FAQ

**What is the best React document viewer library?**
`@iamjariwala/react-doc-viewer` is the most feature-complete open-source React document viewer. It supports 20+ file types (PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and more) in a single component with built-in annotations, drag-and-drop, thumbnail navigation, theming, and i18n -- features that most alternatives require paid licenses or multiple libraries to achieve.

**How do I display a PDF in React?**
Install `@iamjariwala/react-doc-viewer`, import `DocViewer` and `DocViewerRenderers`, pass your PDF URL as a document, and the component handles rendering, zoom, pagination, and page navigation automatically. See [Quick Start](#quick-start).

**How do I display a PDF in Next.js?**
Add the `"use client"` directive to your component, import `DocViewer` with the CSS file, and pass your PDF document. Works with both App Router and Pages Router. See [Next.js guide](#nextjs-app-router--pages-router).

**Can I view Word, Excel, and PowerPoint files in React?**
Yes. This library recognizes `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, and `.pptx` files and renders them as download cards showing file name, type, and a download link. No external service or public URL is required. For inline rendering, you can create a [Custom Renderer](#custom-renderer).

**Does it support annotations and highlighting?**
Yes. Enable annotations via config to get text highlighting, freehand drawing, comments, and an eraser tool. Annotations can be exported as JSON and pre-loaded from saved data. See [Annotations](#annotations-highlight-draw-comment).

**Can I annotate a PDF in React?**
Yes. Enable `config.annotations.enableAnnotations` to get a full annotation toolbar with highlighting, freehand drawing, comments, color picker, and eraser. Annotations are per-page and can be exported/imported as JSON.

**Does it work with Next.js?**
Yes. The library works with Next.js (App Router and Pages Router), Vite, Create React App, Remix, Gatsby, and any React 17+ project. See [Framework Guides](#framework-guides).

**Does it work with Vite?**
Yes. Import the component and CSS file -- no additional configuration needed. See [Vite guide](#vite).

**Can I add my own file type renderer?**
Yes. Create a custom renderer component with `fileTypes` and `weight` properties and pass it via `pluginRenderers`. You can also override the file loading logic. See [Custom Renderer](#custom-renderer).

**How do I style or theme the document viewer?**
Use the `theme` prop for color customization, the `className` or `style` props for container styling, or override `.rdv-*` CSS classes and `--rdv-*` CSS custom properties for fine-grained control. See [Theming](#theming--css-variables) and [Styling](#styling--css-customization).

**Is it secure? Does it send data to external servers?**
No data leaves the browser. All rendering is client-side. HTML content is sanitized with DOMPurify to prevent XSS. MS Office files render locally as download cards -- no Microsoft iframe. See [Security](#security).

**How does this compare to react-pdf?**
react-pdf only handles PDF files. `@iamjariwala/react-doc-viewer` handles 20+ file types including PDF, and adds drag-and-drop, annotations, thumbnails, theming, and i18n on top. If you only need PDF rendering, react-pdf is lighter. If you need multi-format support or advanced features, this library covers more ground.

**How do I reduce bundle size?**
Import only the renderers you need (`PDFRenderer`, `PNGRenderer`, etc.) instead of `DocViewerRenderers`. Use `React.lazy()` to code-split the viewer. See [Performance](#performance--bundle-size).

**Does it support drag-and-drop file upload?**
Yes. Enable `config.dragDrop.enableDragDrop` to allow users to drag files onto the viewer. Supports file type filtering, size limits, append/replace behavior, and rejection callbacks. See [Drag & Drop](#drag--drop-file-upload).

**Does it support thumbnail navigation?**
Yes. Enable `config.thumbnail.enableThumbnails` to show a sidebar with page thumbnails for PDFs. Click any thumbnail to jump to that page. See [Thumbnail Sidebar](#thumbnail-sidebar).

**Can I jump to a specific page in a PDF?**
Yes. Use `docViewerRef.current?.goToPage(5)` for programmatic navigation, or the `jumpToPage` prop for declarative control. See [Page Navigation](#page-navigation--page-jump).

**Does it support TypeScript?**
Yes. The library is written in TypeScript and ships with complete type definitions. All props, config options, and hooks are fully typed with IntelliSense support.

**What React versions are supported?**
React 17, 18, and 19 are supported via `peerDependencies: "react": ">=17.0.0"`.

**Is it accessible?**
The viewer uses semantic HTML, keyboard-navigable controls, and appropriate ARIA attributes where applicable.

## Migrating from Other Libraries

### From @cyntler/react-doc-viewer

`@iamjariwala/react-doc-viewer` is a fork of `@cyntler/react-doc-viewer` with additional features. Migration is straightforward:

1. Replace the package: `npm uninstall @cyntler/react-doc-viewer && npm install @iamjariwala/react-doc-viewer`
2. Update imports: replace `@cyntler/react-doc-viewer` with `@iamjariwala/react-doc-viewer`
3. Add the CSS import: `import "@iamjariwala/react-doc-viewer/dist/index.css"`
4. All existing props and config options are compatible

### From react-pdf

If you're using `react-pdf` and need multi-format support:

1. Install: `npm install @iamjariwala/react-doc-viewer`
2. Replace `<Document>` + `<Page>` with `<DocViewer documents={[{ uri: pdfUrl }]} />`
3. The built-in PDF renderer handles zoom, pagination, and page navigation automatically

### From react-file-viewer

1. Install: `npm install @iamjariwala/react-doc-viewer`
2. Replace `<FileViewer fileType={type} filePath={path} />` with `<DocViewer documents={[{ uri: path }]} />`
3. File type is detected automatically from the URL or can be specified via `fileType` property

## Contributing

Contributions are welcome. Please open an issue first to discuss significant changes. PRs for bug fixes, new renderers, and translations are appreciated.

```bash
git clone https://github.com/mehuljariwala/react-doc-viewer.git
cd react-doc-viewer
npm install
npm start
```

## License

[Apache-2.0](./LICENSE)

---

<sub>Forked from [@cyntler/react-doc-viewer](https://github.com/cyntler/react-doc-viewer). Built and maintained by [Mehul Jariwala](https://github.com/mehuljariwala).</sub>
