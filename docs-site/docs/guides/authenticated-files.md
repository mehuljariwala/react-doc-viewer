---
title: Preview authenticated documents
---

# Preview authenticated documents

Pass headers from your application's current session. Do not embed real tokens in source code, examples or public document URLs.

```tsx
import DocViewer, {
  PDFRenderer,
  DocxRenderer,
  XLSXRenderer,
} from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function PrivatePreview({
  token,
  uri,
  fileType,
}: {
  token: string;
  uri: string;
  fileType: "pdf" | "docx" | "xlsx";
}) {
  return (
    <DocViewer
      documents={[{ uri, fileType }]}
      pluginRenderers={[PDFRenderer, DocxRenderer, XLSXRenderer]}
      requestHeaders={{ Authorization: `Bearer ${token}` }}
      style={{ height: 600 }}
    />
  );
}
```

Set `fileType` to the real format (`pdf`, `docx`, `xlsx`) when your endpoint returns a generic Content-Type. For signed URLs requiring GET, set `prefetchMethod="GET"` if you leave file type detection enabled. Your server must allow the origin and Authorization header through CORS.

Headers apply to library fetches. They are not forwarded to Microsoft Office Online or ordinary download links. For authenticated downloads, implement a download button that fetches with authorization and creates/revokes a blob URL. For token changes on an already loaded document, remount the viewer with a session/document key when you need a fresh fetch.

XLSXRenderer is part of the next release.
