import React, { useState } from "react";
import DocViewer from "../DocViewer";
import { DocViewerRenderers } from "../renderers";

import pdfFile from "../exampleFiles/pdf-file.pdf";

export default {
  title: "DocViewer/Upload",
};

export const PDFInput = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};

export const FileUploadAllTypes = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>Upload Any File</strong>
        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
          Supports: PDF, DOCX, DOC, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP, TIFF, HTML
        </div>
        <input
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md,.rtf,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff,.tif,.html,.htm,.xlsx,.xls,.pptx,.ppt"
          multiple
          onChange={(el) =>
            el.target.files?.length &&
            setSelectedDocs(Array.from(el.target.files))
          }
          style={{ marginTop: "8px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={
            selectedDocs.length > 0
              ? selectedDocs.map((file) => ({
                  uri: window.URL.createObjectURL(file),
                  fileName: file.name,
                }))
              : [{ uri: pdfFile, fileName: "default.pdf" }]
          }
          pluginRenderers={DocViewerRenderers}
          config={{
            pdfVerticalScrollByDefault: true,
            csvDelimiter: ",",
          }}
        />
      </div>
    </div>
  );
};
