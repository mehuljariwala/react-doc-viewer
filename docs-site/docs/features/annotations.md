---
id: annotations
title: PDF Annotations — Highlight, Draw, Comment
sidebar_label: Annotations
description: Add text highlighting, freehand drawing, comments, and eraser to PDFs in React with @iamjariwala/react-doc-viewer annotations feature.
keywords: [react pdf annotations, highlight pdf react, draw on pdf react, comment pdf react, pdf markup react]
---

# Annotations

Add highlights, freehand drawings, and comments to your documents. Export annotations as JSON for persistence.

## Enable Annotations

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

## Annotation Tools

| Tool | Description |
|------|-------------|
| `select` | Select and move existing annotations |
| `highlight` | Highlight text regions |
| `pen` | Freehand drawing |
| `comment` | Add comment markers with text |
| `eraser` | Remove annotations |

## Export Annotations

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

## Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableAnnotations` | `boolean` | `false` | Enable annotation toolbar |
| `defaultColor` | `string` | — | Default color for new annotations |
| `colors` | `string[]` | — | Color palette for the picker |
| `tools` | `AnnotationTool[]` | all | Which tools to show |
| `onAnnotationChange` | `(annotations: IAnnotation[]) => void` | — | Callback when annotations change |
| `initialAnnotations` | `IAnnotation[]` | `[]` | Pre-loaded annotations |
