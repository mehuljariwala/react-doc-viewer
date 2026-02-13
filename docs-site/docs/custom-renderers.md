---
id: custom-renderers
title: Custom Renderers — Extend Any File Type
sidebar_label: Custom Renderers
description: Create custom file type renderers for @iamjariwala/react-doc-viewer. Override or extend any file format with your own React component.
keywords: [custom renderer react, custom file viewer, extend file types, custom pdf renderer, plugin renderer]
---

# Custom Renderers

Create a renderer for any file type by defining `fileTypes`, `weight`, and a React component.

## Basic Custom Renderer

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

## Custom File Loader

Override the default file loading behavior:

```tsx
MyPNGRenderer.fileLoader = ({ documentURI, signal, fileLoaderComplete }) => {
  myCustomLoader(documentURI).then(() => {
    fileLoaderComplete();
  });
};
```

## Renderer Weight

Higher `weight` values take priority when multiple renderers match a file type. Use this to override built-in renderers with your custom implementation.
