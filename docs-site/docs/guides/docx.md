---
title: Preview a Word DOCX file
---

# Preview a Word DOCX file

```tsx
import DocViewer, { DocxRenderer } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function WordPreview() {
  return (
    <DocViewer
      documents={[{ uri: "/sample.docx", fileType: "docx" }]}
      pluginRenderers={[DocxRenderer]}
      config={{ docx: { useOfficeOnlineViewer: false } }}
      style={{ height: 600 }}
    />
  );
}
```

DOCX previews locally by default. This is an approximation of Word layout; test headers, footnotes, page breaks and fonts with your own files. Legacy `.doc` is a different format and uses `MSDocRenderer`.

Office Online is an explicit DOCX option, requires a public HTTP(S) URL and sends that URL to Microsoft. It is unsuitable for URLs requiring your application's request headers. See [document privacy](../security.md).
