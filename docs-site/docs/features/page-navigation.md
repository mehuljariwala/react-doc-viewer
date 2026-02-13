---
id: page-navigation
title: Page Navigation & Page Jump
sidebar_label: Page Navigation
description: Jump to a specific page in a PDF programmatically using ref or jumpToPage prop in @iamjariwala/react-doc-viewer.
keywords: [react pdf page jump, pdf page navigation, go to page pdf react, programmatic pdf navigation]
---

# Page Navigation & Page Jump

Jump to a specific page using a ref or the `jumpToPage` prop.

## Using Ref

```tsx
import DocViewer, { DocViewerRef } from "@iamjariwala/react-doc-viewer";

const docViewerRef = useRef<DocViewerRef>(null);

<DocViewer ref={docViewerRef} documents={docs} pluginRenderers={DocViewerRenderers} />;

docViewerRef.current?.goToPage(5);
docViewerRef.current?.prev();
docViewerRef.current?.next();
```

## Using jumpToPage Prop

```tsx
const [page, setPage] = useState(1);

<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} jumpToPage={page} />;
```

## DocViewerRef Methods

| Method | Description |
|--------|-------------|
| `prev()` | Navigate to the previous document |
| `next()` | Navigate to the next document |
| `goToPage(n)` | Jump to page `n` in the current PDF |
