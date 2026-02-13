---
id: theming
title: Theming & CSS Variables
sidebar_label: Theming
description: Customize the appearance of @iamjariwala/react-doc-viewer using CSS variables, theme prop, or CSS class overrides.
keywords: [react viewer theming, css variables viewer, customize document viewer, dark mode pdf viewer, theme react viewer]
---

# Theming & CSS Variables

## Theme Prop

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

| Property | CSS Variable | Default |
|----------|-------------|---------|
| `primary` | `--rdv-primary` | `#fff` |
| `secondary` | `--rdv-secondary` | `#000` |
| `tertiary` | `--rdv-tertiary` | `#ffffff99` |
| `textPrimary` | `--rdv-text-primary` | `#000` |
| `textSecondary` | `--rdv-text-secondary` | `#fff` |
| `textTertiary` | `--rdv-text-tertiary` | `#00000044` |

## CSS Variable Override

```css
#react-doc-viewer {
  --rdv-primary: #1a1a2e;
  --rdv-secondary: #16213e;
  --rdv-text-primary: #e94560;
}
```

## CSS Class Overrides

All internal elements use `.rdv-*` class names:

| Class | Element |
|-------|---------|
| `.rdv-container` | Root container |
| `.rdv-header-bar` | Top header bar |
| `.rdv-file-name` | File name display |
| `.rdv-doc-nav-prev` / `.rdv-doc-nav-next` | Navigation buttons |
| `.rdv-pdf-controls` | PDF control bar |
| `.rdv-pdf-page-wrapper` | PDF page wrapper |
| `.rdv-thumbnail-sidebar` | Thumbnail sidebar |
| `.rdv-annotation-toolbar` | Annotation toolbar |
| `.rdv-image-container` | Image renderer |
| `.rdv-csv-container` | CSV table |
| `.rdv-txt-container` | Text renderer |
| `.rdv-video-container` | Video player |
| `.rdv-msdoc-container` | Office download card |
| `.rdv-loading-container` | Loading spinner |
