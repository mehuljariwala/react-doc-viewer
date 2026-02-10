[![npm version](https://img.shields.io/npm/v/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![npm downloads](https://img.shields.io/npm/dt/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![license](https://img.shields.io/npm/l/@iamjariwala/react-doc-viewer.svg)](https://github.com/mehuljariwala/react-doc-viewer/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%2B-61dafb.svg)](https://reactjs.org/)

# @iamjariwala/react-doc-viewer

React document viewer and PDF viewer component — render PDF, Word, Excel, PowerPoint, images, video, CSV, and 20+ file types with drag-and-drop, annotations, thumbnails, and i18n. Drop-in React component for document preview and file viewing.

## Why @iamjariwala/react-doc-viewer?

Most React document viewers only handle PDFs or require expensive commercial licenses. This library is the **most feature-complete open-source document viewer for React** — supporting 20+ file types in a single component, with built-in annotations, drag-and-drop, thumbnail navigation, and full TypeScript support.

**Best for:**
- Apps that need to preview multiple file types (PDF, Word, Excel, images, video) without separate libraries for each
- Document management systems, file browsers, and content platforms
- Projects that need annotation, highlighting, or commenting on documents
- Teams that want a single drop-in component instead of stitching together 5+ libraries

### How it compares

| Feature | @iamjariwala/react-doc-viewer | react-pdf | @cyntler/react-doc-viewer | react-file-viewer |
| ------- | :--: | :--: | :--: | :--: |
| PDF rendering | Yes | Yes | Yes | Yes |
| Office docs (Word, Excel, PPT) | Yes | -- | Yes | Partial |
| Images (PNG, JPG, GIF, WebP, TIFF, BMP) | Yes | -- | Yes | Partial |
| Video (MP4) | Yes | -- | Yes | Yes |
| CSV / TXT / HTML | Yes | -- | Yes | Partial |
| Drag & Drop | Yes | -- | -- | -- |
| Annotations (highlight, draw, comment) | Yes | -- | -- | -- |
| Thumbnail sidebar | Yes | -- | -- | -- |
| Programmatic page navigation | Yes | Yes | -- | -- |
| i18n (14 languages) | Yes | -- | -- | -- |
| Custom renderers | Yes | -- | Yes | -- |
| Theming | Yes | -- | Yes | -- |
| TypeScript | Yes | Yes | Yes | -- |
| Actively maintained (2024+) | Yes | Yes | -- | -- |
| License | Apache-2.0 | MIT | MIT | MIT |

---

### Feature Highlights

| | | |
|:--|:--|:--|
| **Multi-Format Support** -- PDF, DOCX, images, video, CSV & more | **Drag & Drop** -- Drop files directly onto the viewer | **Annotations** -- Highlight, draw, and comment on documents |
| **Thumbnail Sidebar** -- Visual page navigation for PDFs | **14 Languages** -- Built-in i18n with community translations | **Theming** -- Full color control via theme object |
| **Custom Renderers** -- Extend or replace any file type renderer | **Page Navigation** -- Programmatic page jump via ref or prop | |

---

### What's New in v0.2.0

- **Drag & Drop** -- Drop files directly onto the viewer to add or replace documents
- **Thumbnail Sidebar** -- Visual page navigation with auto-scroll for PDFs
- **Annotations** -- Highlight text, freehand draw, and add comments with export support
- **Page Jump** -- Navigate to any page programmatically via ref or prop

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Why @iamjariwala/react-doc-viewer?](#why-iamjariwalareact-doc-viewer)
- [Supported File Types](#supported-file-types)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Quick Start](#quick-start)
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
  - [Drag & Drop](#drag--drop)
  - [Thumbnail Sidebar](#thumbnail-sidebar)
  - [Annotations](#annotations)
  - [Page Navigation](#page-navigation)
- [Configuration](#configuration)
  - [Full Config Reference](#full-config-reference)
  - [Overriding Header](#overriding-header)
  - [Overriding Loading Renderer](#overriding-loading-renderer)
  - [Overriding No Renderer (Error)](#overriding-no-renderer-error)
- [Theming](#theming)
- [Styling](#styling)
- [Internationalization (i18n)](#internationalization-i18n)
- [Advanced](#advanced)
  - [DocViewerRef](#docviewerref)
  - [Custom HTTP Verb](#custom-http-verb)
  - [Custom Request Headers](#custom-request-headers)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Supported File Types

| Extension | MIME Type | Notes |
| --------- | --------- | ----- |
| pdf | `application/pdf` | |
| png | `image/png` | |
| jpg / jpeg | `image/jpg`, `image/jpeg` | |
| gif | `image/gif` | |
| bmp | `image/bmp` | |
| tiff | `image/tiff` | |
| webp | `image/webp` | |
| csv | `text/csv` | |
| txt | `text/plain` | |
| htm / html | `text/htm`, `text/html` | |
| mp4 | `video/mp4` | |
| doc | `application/msword` | Public URLs only |
| docx | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | Public URLs only |
| xls | `application/vnd.ms-excel` | Public URLs only |
| xlsx | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | Public URLs only |
| ppt | `application/vnd.ms-powerpoint` | Public URLs only |
| pptx | `application/vnd.openxmlformats-officedocument.presentationml.presentation` | Public URLs only |
| odt | `application/vnd.oasis.opendocument.text` | |

> [!IMPORTANT]
> MS Office documents (doc, docx, xls, xlsx, ppt, pptx) use Microsoft's online viewing service via iframe and **require publicly accessible URLs**.

## Live Demo

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

> The CSS import is required for correct rendering of PDF and other file types.

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

Or import only what you need:

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

### Drag & Drop

Enable file drag-and-drop to add or replace documents in the viewer.

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

Display a visual sidebar with page thumbnails for quick PDF navigation.

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

### Annotations

Add highlights, freehand drawings, and comments to your documents.

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

### Page Navigation

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

## Theming

Customize the viewer's appearance with a theme object:

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

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `primary` | `string` | `"#fff"` | Primary background color |
| `secondary` | `string` | `"#000"` | Secondary background color |
| `tertiary` | `string` | `"#ffffff99"` | Tertiary background color |
| `textPrimary` | `string` | `"#000"` | Primary text color |
| `textSecondary` | `string` | `"#fff"` | Secondary text color |
| `textTertiary` | `string` | `"#00000044"` | Tertiary text color |
| `disableThemeScrollbar` | `boolean` | `false` | Disable themed scrollbar styling |

## Styling

**CSS class:**

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className="my-viewer" />
```

**Inline styles:**

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ width: 500, height: 500 }} />
```

**Styled Components:**

```tsx
import styled from "styled-components";
import DocViewer from "@iamjariwala/react-doc-viewer";

const MyDocViewer = styled(DocViewer)`
  border-radius: 10px;
`;

<MyDocViewer documents={docs} />;
```

**Override internal elements by DOM ID:**

```css
#react-doc-viewer #header-bar {
  background-color: #faf;
}
```

## Internationalization (i18n)

Pass a `language` prop to translate the UI:

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} language="pl" />
```

**Supported languages:**

| Code | Language |
| ---- | -------- |
| `en` | English |
| `ar` | Arabic |
| `de` | German |
| `es` | Spanish |
| `fr` | French |
| `it` | Italian |
| `ja` | Japanese |
| `pl` | Polish |
| `pt` | Portuguese |
| `ru` | Russian |
| `se` | Swedish |
| `sr` | Serbian (Latin) |
| `sr_cyr` | Serbian (Cyrillic) |
| `tr` | Turkish |

Translation files are in `src/locales/`. PRs for new languages are welcome.

## Advanced

### DocViewerRef

Control the viewer programmatically:

```tsx
import DocViewer, { DocViewerRef } from "@iamjariwala/react-doc-viewer";

const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} pluginRenderers={DocViewerRenderers} />;

docViewerRef.current?.prev();
docViewerRef.current?.next();
docViewerRef.current?.goToPage(3);
```

### Custom HTTP Verb

Some services (like AWS S3) require a specific HTTP verb for pre-fetching. By default, `HEAD` is used:

```tsx
<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} prefetchMethod="GET" />
```

### Custom Request Headers

Provide custom headers for authenticated requests:

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
@iamjariwala/react-doc-viewer is an open-source React document viewer that supports 20+ file types (PDF, Word, Excel, PowerPoint, images, video, CSV, HTML, and more) in a single component. It includes built-in annotations, drag-and-drop, thumbnail navigation, theming, and i18n — features that most alternatives require paid licenses or multiple libraries to achieve.

**How do I display a PDF in React?**
Install `@iamjariwala/react-doc-viewer`, import `DocViewer` and `DocViewerRenderers`, pass your PDF URL as a document, and the component handles rendering, zoom, pagination, and page navigation automatically. See [Quick Start](#quick-start).

**Can I view Word, Excel, and PowerPoint files in React?**
Yes. This library renders `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, and `.pptx` files using Microsoft's online viewing service. The files must be accessible via a public URL.

**Does it support annotations and highlighting?**
Yes. Enable annotations via config to get text highlighting, freehand drawing, comments, and an eraser tool. Annotations can be exported as JSON and pre-loaded from saved data. See [Annotations](#annotations).

**Does it work with Next.js?**
Yes. The library works with Next.js and other React frameworks. A Next.js example project is included in the repository under `use-cases/nextjs/`.

**Can I add my own file type renderer?**
Yes. Create a custom renderer component with `fileTypes` and `weight` properties and pass it via `pluginRenderers`. You can also override the file loading logic. See [Custom Renderer](#custom-renderer).

**How does this compare to react-pdf?**
react-pdf only handles PDF files. @iamjariwala/react-doc-viewer handles 20+ file types including PDF, and adds drag-and-drop, annotations, thumbnails, theming, and i18n on top. If you only need PDF rendering, react-pdf is lighter. If you need multi-format support or advanced features, this library covers more ground.

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

<sub>Forked from [@cyntler/react-doc-viewer](https://github.com/cyntler/react-doc-viewer).</sub>
