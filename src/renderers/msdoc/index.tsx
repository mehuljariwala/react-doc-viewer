import React from "react";
import { DocRenderer } from "../..";

const FILE_TYPE_LABELS: Record<string, string> = {
  doc: "Word Document (.doc)",
  docx: "Word Document (.docx)",
  odt: "OpenDocument Text (.odt)",
  xls: "Excel Spreadsheet (.xls)",
  xlsx: "Excel Spreadsheet (.xlsx)",
  ppt: "PowerPoint Presentation (.ppt)",
  pptx: "PowerPoint Presentation (.pptx)",
};

const MSDocRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  const fileName =
    currentDocument.fileName ||
    currentDocument.uri.split("/").pop() ||
    "document";

  const fileType = currentDocument.fileType || "";
  const label =
    FILE_TYPE_LABELS[fileType] || `Office Document (.${fileType || "unknown"})`;

  return (
    <div id="msdoc-renderer" className="rdv-msdoc-container">
      <div className="rdv-msdoc-content">
        <div className="rdv-msdoc-file-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div className="rdv-msdoc-file-name">{fileName}</div>
        <div className="rdv-msdoc-file-type">{label}</div>
        <a
          className="rdv-msdoc-download-link"
          href={currentDocument.uri}
          download={fileName}
          onClick={(e) => {
            e.preventDefault();
            const url = currentDocument.uri;
            fetch(url)
              .then((res) => res.blob())
              .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = fileName;
                a.click();
                URL.revokeObjectURL(blobUrl);
              })
              .catch(() => {
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
              });
          }}
        >
          Download File
        </a>
      </div>
    </div>
  );
};

export default MSDocRenderer;

const MSDocFTMaps = {
  odt: ["odt", "application/vnd.oasis.opendocument.text"],
  doc: ["doc", "application/msword"],
  docx: [
    "docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
  ],
  xls: ["xls", "application/vnd.ms-excel"],
  xlsx: [
    "xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ppt: ["ppt", "application/vnd.ms-powerpoint"],
  pptx: [
    "pptx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};

MSDocRenderer.fileTypes = [
  ...MSDocFTMaps.odt,
  ...MSDocFTMaps.doc,
  ...MSDocFTMaps.docx,
  ...MSDocFTMaps.xls,
  ...MSDocFTMaps.xlsx,
  ...MSDocFTMaps.ppt,
  ...MSDocFTMaps.pptx,
];
MSDocRenderer.weight = 0;
MSDocRenderer.fileLoader = ({ fileLoaderComplete }) => fileLoaderComplete();
