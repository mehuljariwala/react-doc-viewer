"use client";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
export default function Viewer() {
  return (
    <DocViewer
      documents={[{ uri: "/sample.txt", fileType: "txt", fileName: "Sample" }]}
      pluginRenderers={DocViewerRenderers}
    />
  );
}
