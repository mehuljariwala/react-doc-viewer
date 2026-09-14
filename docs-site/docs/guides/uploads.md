---
title: Preview local uploads
---

# Preview local uploads

Create object URLs when file selection changes and revoke them when the selection is replaced or the component unmounts. Do not create URLs on every render.

```tsx
import { useEffect, useState } from "react";
import DocViewer, {
  PDFRenderer,
  DocxRenderer,
  XLSXRenderer,
  type IDocument,
} from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";

export default function UploadPreview() {
  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  useEffect(() => {
    const next = files.map((file) => ({
      uri: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.name.split(".").pop()?.toLowerCase(),
    }));
    setDocuments(next);
    return () => next.forEach((doc) => URL.revokeObjectURL(doc.uri));
  }, [files]);
  return (
    <>
      <label>
        Choose documents{" "}
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.xlsx"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
        />
      </label>
      <DocViewer
        documents={documents}
        pluginRenderers={[PDFRenderer, DocxRenderer, XLSXRenderer]}
      />
    </>
  );
}
```

This selects local renderers and does not configure a conversion service. File type labels and the `accept` attribute are not security validation. Apply appropriate input restrictions in your application. XLSXRenderer is part of the next release.
