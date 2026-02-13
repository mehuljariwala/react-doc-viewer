---
id: drag-and-drop
title: Drag & Drop File Upload
sidebar_label: Drag & Drop
description: Enable drag-and-drop file upload in your React document viewer with file type filtering, size limits, and callbacks.
keywords: [react drag and drop, file upload react, drop files viewer, drag drop pdf, dropzone react]
---

# Drag & Drop File Upload

Enable file drag-and-drop to add or replace documents in the viewer. Supports file type filtering, size limits, and callbacks.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    dragDrop: {
      enableDragDrop: true,
      acceptedFileTypes: ["application/pdf", "image/*"],
      maxFileSize: 50 * 1024 * 1024,
      dropBehavior: "append",
      onDrop: (files) => console.log("Files dropped:", files),
      onDropRejected: (files, reason) => console.log("Rejected:", reason),
    },
  }}
/>
```

## Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableDragDrop` | `boolean` | `false` | Enable drag-and-drop |
| `acceptedFileTypes` | `string[]` | all types | MIME types to accept (supports wildcards like `image/*`) |
| `maxFileSize` | `number` | unlimited | Max file size in bytes |
| `dropBehavior` | `"append" \| "replace"` | `"append"` | Add to or replace existing documents |
| `onDrop` | `(files: File[]) => void` | — | Callback when files are accepted |
| `onDropRejected` | `(files: File[], reason) => void` | — | Callback when files are rejected |
