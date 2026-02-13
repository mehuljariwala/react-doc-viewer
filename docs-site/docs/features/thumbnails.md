---
id: thumbnails
title: Thumbnail Sidebar Navigation
sidebar_label: Thumbnails
description: Display a visual sidebar with page thumbnails for quick PDF navigation in React using @iamjariwala/react-doc-viewer.
keywords: [pdf thumbnails react, thumbnail sidebar, page navigation pdf, pdf preview sidebar]
---

# Thumbnail Sidebar

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

## Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableThumbnails` | `boolean` | `false` | Enable thumbnail sidebar |
| `thumbnailWidth` | `number` | `120` | Width of each thumbnail in pixels |
| `sidebarDefaultOpen` | `boolean` | `false` | Open sidebar by default |
