import React from "react";
import { createRoot } from "react-dom/client";
import DocViewer, { DocViewerRenderers } from "@iamjariwala/react-doc-viewer";
import "@iamjariwala/react-doc-viewer/dist/index.css";
const documents = [{ uri: "/sample.txt", fileType: "txt", fileName: "Sample" }];
createRoot(document.getElementById("root")).render(
  <DocViewer documents={documents} pluginRenderers={DocViewerRenderers} />,
);
