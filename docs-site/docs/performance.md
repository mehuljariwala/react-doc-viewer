---
id: performance
title: Performance & Bundle Size
sidebar_label: Performance
description: Optimize @iamjariwala/react-doc-viewer bundle size with tree-shaking, lazy loading, and selective renderer imports.
keywords: [react viewer performance, pdf viewer bundle size, tree shaking react viewer, lazy load document viewer, optimize react viewer]
---

# Performance & Bundle Size

v1.1.0 significantly reduced bundle size by removing heavy dependencies:

| Dependency removed | Size saved |
|--------------------|------------|
| `styled-components` | ~160KB minified |
| `core-js` | ~150KB minified |
| `ajv` | ~70KB minified |
| **Total savings** | **~380KB** |

## Tree-Shake Renderers

Import only what you need:

```tsx
import DocViewer, { PDFRenderer, PNGRenderer } from "@iamjariwala/react-doc-viewer";

<DocViewer pluginRenderers={[PDFRenderer, PNGRenderer]} documents={docs} />;
```

## Lazy Loading

Code-split the viewer with `React.lazy()`:

```tsx
const DocViewer = React.lazy(() => import("@iamjariwala/react-doc-viewer"));

<Suspense fallback={<div>Loading viewer...</div>}>
  <DocViewer documents={docs} pluginRenderers={[PDFRenderer]} />
</Suspense>
```

## Tips

- Set explicit `width` and `height` via `style` prop to prevent layout shifts
- Use individual renderers instead of `DocViewerRenderers` for smaller bundles
