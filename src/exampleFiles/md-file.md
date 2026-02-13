# React Doc Viewer

A powerful document viewer component for React applications.

## Features

- **PDF Viewer** with annotations, thumbnails, and search
- **DOCX Renderer** using client-side rendering
- **Image Support** for JPG, PNG, GIF, BMP, WebP, TIFF
- **Office Documents** via Microsoft Office Online viewer
- **Drag & Drop** file loading
- **Dark Mode** with automatic system detection

## Installation

```bash
npm install @iamjariwala/react-doc-viewer
```

## Quick Start

```tsx
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";

function App() {
  const docs = [
    { uri: "https://example.com/document.pdf" },
    { uri: "https://example.com/image.png" },
  ];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
```

## Supported Formats

| Format | Extension | Renderer |
|--------|-----------|----------|
| PDF | .pdf | PDFRenderer |
| Word | .docx | DocxRenderer |
| Images | .jpg, .png, .gif | ImageRenderer |
| Text | .txt | TXTRenderer |
| CSV | .csv | CSVRenderer |
| Markdown | .md | MarkdownRenderer |

## Configuration

The viewer supports extensive configuration:

1. Custom headers and navigation
2. Zoom controls with configurable defaults
3. Thumbnail sidebar
4. Annotation tools (highlight, draw, comment)
5. Watermark overlay
6. Keyboard shortcuts

---

*Built with React and TypeScript*
