---
id: api-reference
title: API Reference — Props & Config
sidebar_label: API Reference
description: Complete API reference for @iamjariwala/react-doc-viewer including all props, config options, and DocViewerRef methods.
keywords: [react-doc-viewer api, docviewer props, config options, docviewerref, viewer api reference]
---

# API Reference

## DocViewer Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `documents` | `IDocument[]` | Yes | Array of documents to display |
| `pluginRenderers` | `DocRenderer[]` | No | Renderers to use |
| `className` | `string` | No | CSS class for the container |
| `style` | `CSSProperties` | No | Inline styles |
| `config` | `IConfig` | No | Configuration object |
| `theme` | `ITheme` | No | Theme colors |
| `prefetchMethod` | `string` | No | HTTP method for prefetching (`"HEAD"` default) |
| `requestHeaders` | `Record<string, string>` | No | Custom request headers |
| `initialActiveDocument` | `IDocument` | No | Document to display initially |
| `activeDocument` | `IDocument` | No | Controlled active document |
| `onDocumentChange` | `(doc: IDocument) => void` | No | Callback when document changes |
| `language` | `AvailableLanguages` | No | UI language code |
| `jumpToPage` | `number` | No | Declarative page jump |
| `ref` | `DocViewerRef` | No | Ref for programmatic control |

## IDocument

```tsx
interface IDocument {
  uri: string;
  fileType?: string;
  fileName?: string;
  fileData?: string | ArrayBuffer;
}
```

## Full Config

```tsx
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
  dragDrop: { enableDragDrop: true },
  thumbnail: { enableThumbnails: true },
  annotations: { enableAnnotations: true },
}}
```

## DocViewerRef Methods

| Method | Description |
|--------|-------------|
| `prev()` | Navigate to previous document |
| `next()` | Navigate to next document |
| `goToPage(n)` | Jump to page `n` in current PDF |

## Custom Request Headers

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
