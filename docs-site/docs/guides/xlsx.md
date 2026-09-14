---
title: Preview an Excel XLSX workbook
---

# Preview an Excel XLSX workbook

**Next release:** XLSXRenderer is unreleased until the next npm publication. Test the branch's packed package using the repository smoke scripts.

```tsx
import DocViewer, { XLSXRenderer } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function SpreadsheetPreview() {
  return (
    <DocViewer
      documents={[{ uri: "/budget.xlsx", fileType: "xlsx" }]}
      pluginRenderers={[XLSXRenderer]}
      style={{ height: 600 }}
    />
  );
}
```

Choose a worksheet using the sheet selector. The viewer displays read-only cell values. Empty sheets and invalid files have explicit feedback; the original workbook remains downloadable.

The preview is for bounded workbooks: input size is capped at 5 MiB, expanded ZIP content at 20 MiB, and sheet count at 100. Only the first 500 rows and 50 columns are displayed, with a notice for truncated data. Archives are also limited to 1,000 entries and an aggregate 250,000 worksheet grid cells; sparse coordinates count toward that limit. These checks are not a guarantee against every resource-exhaustion input.

- Formulas are not evaluated; stored/cached results may be displayed.
- Charts, macros, cell styling and Excel layout fidelity are not supported.
- Legacy `.xls`, encrypted workbooks and unsupported archives are not XLSX table previews.
- When `DocViewerRenderers` is used, XLSXRenderer takes precedence over the Office fallback. Explicitly choosing `MSDocRenderer` retains its existing external-service behavior.
- Server conversion, if enabled for XLSX, takes precedence over the local renderer. Keep it disabled for local-only parsing.

Try **DocViewer / File Types / Data / XLSX** in Storybook for a bundled workbook with multiple sheets.

![XLSX table preview with worksheet selection](/img/xlsx-preview.png)
