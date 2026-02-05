[![npm-version](https://img.shields.io/npm/v/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)
[![npm-download](https://img.shields.io/npm/dt/@iamjariwala/react-doc-viewer.svg)](https://www.npmjs.com/package/@iamjariwala/react-doc-viewer)

# @iamjariwala/react-doc-viewer

A powerful, feature-rich document viewer for **React v17+**. View PDFs, Office docs, images, videos, and more — with built-in drag-and-drop, thumbnail navigation, annotations, and i18n support.

> Forked from [@cyntler/react-doc-viewer](https://github.com/cyntler/react-doc-viewer) with active maintenance and new features.

## What's New in v0.2.0

- **Drag & Drop** — Drop files directly onto the viewer
- **Thumbnail Sidebar** — Visual page navigation for PDFs
- **Annotations** — Highlight text, draw, and add comments on documents
- **Page Jump** — Navigate to any page programmatically via ref or prop

## Table of Contents

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

## Supported File Types

| Extension | MIME Type | Notes |
| --------- | --------- | ----- |
| pdf | application/pdf | |
| png | image/png | |
| jpg / jpeg | image/jpg, image/jpeg | |
| gif | image/gif | |
| bmp | image/bmp | |
| tiff | image/tiff | |
| webp | image/webp | |
| csv | text/csv | |
| txt | text/plain | |
| htm / html | text/htm, text/html | |
| mp4 | video/mp4 | |
| doc | application/msword | Public URLs only |
| docx | application/vnd.openxmlformats-officedocument.wordprocessingml.document | Public URLs only |
| xls | application/vnd.ms-excel | Public URLs only |
| xlsx | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | Public URLs only |
| ppt | application/vnd.ms-powerpoint | Public URLs only |
| pptx | application/vnd.openxmlformats-officedocument.presentationml.presentation | Public URLs only |
| odt | application/vnd.oasis.opendocument.text | |

> [!IMPORTANT]
> MS Office documents (doc, docx, xls, xlsx, ppt, pptx) use Microsoft's online viewing service via iframe and **require publicly accessible URLs**.

## Live Demo

[Storybook](https://mehuljariwala.github.io/react-doc-viewer)

## Installation

```bash
npm install @iamjariwala/react-doc-viewer
# or
yarn add @iamjariwala/react-doc-viewer
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

### Custom Renderer

```tsx
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
  config={{
    dragDrop: {
      enableDragDrop: true,
      acceptedFileTypes: ["application/pdf", "image/*"],
      maxFileSize: 50 * 1024 * 1024, // 50MB
      dropBehavior: "append", // "append" or "replace"
      onDrop: (files) => {
        console.log("Files dropped:", files);
      },
      onDropRejected: (files, reason) => {
        console.log("Rejected:", reason); // "file-type" | "file-size" | "unknown"
      },
    },
  }}
/>
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableDragDrop` | `boolean` | `false` | Enable drag-and-drop |
| `acceptedFileTypes` | `string[]` | all | MIME types to accept (supports wildcards like `image/*`) |
| `maxFileSize` | `number` | unlimited | Max file size in bytes |
| `dropBehavior` | `"append" \| "replace"` | `"append"` | Add to or replace existing documents |
| `onDrop` | `(files: File[]) => void` | — | Callback when files are accepted |
| `onDropRejected` | `(files, reason) => void` | — | Callback when files are rejected |

### Thumbnail Sidebar

Display a visual sidebar with page thumbnails for quick PDF navigation.

```tsx
<DocViewer
  documents={docs}
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

Add highlights, drawings, and comments to your documents.

```tsx
<DocViewer
  documents={docs}
  config={{
    annotations: {
      enableAnnotations: true,
      defaultColor: "#FFFF00",
      colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
      tools: ["select", "highlight", "pen", "comment", "eraser"],
      onAnnotationChange: (annotations) => {
        console.log("Annotations:", annotations);
      },
      initialAnnotations: [], // pre-load saved annotations
    },
  }}
/>
```

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `enableAnnotations` | `boolean` | `false` | Enable annotation toolbar |
| `defaultColor` | `string` | — | Default color for new annotations |
| `colors` | `string[]` | — | Color palette for the picker |
| `tools` | `AnnotationTool[]` | all | Which tools to show: `"select"`, `"highlight"`, `"pen"`, `"comment"`, `"eraser"` |
| `onAnnotationChange` | `(annotations) => void` | — | Callback when annotations change |
| `initialAnnotations` | `IAnnotation[]` | `[]` | Pre-loaded annotations |

**Exporting annotations** — Use the `useAnnotationExport` hook:

```tsx
import { useAnnotationExport } from "@iamjariwala/react-doc-viewer";

const { exportAsJSON, downloadAnnotations, getAnnotationsForPage } = useAnnotationExport();
```

### Page Navigation

Jump to a specific page using a ref or the `jumpToPage` prop.

**Using ref:**

```tsx
const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} />;

// Navigate
docViewerRef.current?.goToPage(5);
docViewerRef.current?.prev();
docViewerRef.current?.next();
```

**Using the `jumpToPage` prop:**

```tsx
const [page, setPage] = useState(1);

<DocViewer documents={docs} jumpToPage={page} />;
```

## Configuration

### Full Config Reference

```tsx
<DocViewer
  documents={docs}
  config={{
    header: {
      disableHeader: false,
      disableFileName: false,
      retainURLParams: false,
      overrideComponent: MyHeader, // custom header component
    },
    loadingRenderer: {
      overrideComponent: MyLoader,
      showLoadingTimeout: 500, // ms, or false to show immediately
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
    dragDrop: { enableDragDrop: true, /* ... */ },
    thumbnail: { enableThumbnails: true, /* ... */ },
    annotations: { enableAnnotations: true, /* ... */ },
  }}
/>
```

### Overriding Header

```tsx
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

<DocViewer config={{ header: { overrideComponent: MyHeader } }} documents={docs} />;
```

### Overriding Loading Renderer

```tsx
const MyLoader = ({ document, fileName }) => {
  return <div>Loading {fileName || document?.fileType}...</div>;
};

<DocViewer
  config={{
    loadingRenderer: {
      overrideComponent: MyLoader,
      showLoadingTimeout: 500, // false to disable delay
    },
  }}
  documents={docs}
/>;
```

### Overriding No Renderer (Error)

```tsx
const MyError = ({ document, fileName }) => {
  return <div>Unsupported file: {fileName || document?.fileType}</div>;
};

<DocViewer
  config={{ noRenderer: { overrideComponent: MyError } }}
  documents={docs}
/>;
```

## Theming

Customize the viewer's appearance with a theme object:

```tsx
<DocViewer
  documents={docs}
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

## Styling

**CSS class:**

```tsx
<DocViewer documents={docs} className="my-viewer" />
```

**Inline styles:**

```tsx
<DocViewer documents={docs} style={{ width: 500, height: 500 }} />
```

**Styled Components:**

```tsx
import styled from "styled-components";

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
<DocViewer documents={docs} language="pl" />
```

**Supported languages:** `ar`, `de`, `en`, `es`, `fr`, `it`, `ja`, `pl`, `pt`, `ru`, `se`, `sr`, `sr_cyr`, `tr`

Translation files are in `src/locales/`. PRs for new languages are welcome.

## Advanced

### DocViewerRef

Control the viewer programmatically:

```tsx
import DocViewer, { DocViewerRef } from "@iamjariwala/react-doc-viewer";

const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} />;

docViewerRef.current?.prev();       // previous document
docViewerRef.current?.next();       // next document
docViewerRef.current?.goToPage(3);  // jump to page 3
```

### Custom HTTP Verb

Some services (like AWS S3) require a specific HTTP verb for pre-fetching. By default, `HEAD` is used:

```tsx
<DocViewer documents={docs} prefetchMethod="GET" />
```

### Custom Request Headers

Provide custom headers for authenticated requests:

```tsx
<DocViewer
  documents={docs}
  prefetchMethod="GET"
  requestHeaders={{
    "X-Access-Token": "1234567890",
    "My-Custom-Header": "value",
  }}
/>
```

## License

[Apache-2.0](./LICENSE)
