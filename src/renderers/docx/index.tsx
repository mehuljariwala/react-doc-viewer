import { useRef, useEffect, useState } from "react";
import { renderAsync } from "docx-preview";
import { DocRenderer } from "../..";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";

const DocxRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!currentDocument?.fileData || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";
    setError(false);

    renderAsync(currentDocument.fileData as ArrayBuffer, container, undefined, {
      className: "rdv-docx",
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreLastRenderedPageBreak: false,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
    }).catch(() => {
      setError(true);
    });
  }, [currentDocument?.fileData]);

  if (!currentDocument) return null;

  const fileName =
    currentDocument.fileName ||
    currentDocument.uri.split("/").pop() ||
    "document";

  if (error) {
    return (
      <div id="docx-renderer" className="rdv-msdoc-container">
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
          <div className="rdv-msdoc-file-type">
            Unable to preview this document
          </div>
          <a
            className="rdv-msdoc-download-link"
            href={currentDocument.uri}
            download={fileName}
            onClick={(e) => {
              e.preventDefault();
              fetch(currentDocument.uri)
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
                  a.href = currentDocument.uri;
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
  }

  return (
    <div id="docx-renderer" className="rdv-docx-viewer">
      <div ref={containerRef} />
    </div>
  );
};

export default DocxRenderer;

DocxRenderer.fileTypes = [
  "docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
];
DocxRenderer.weight = 1;
DocxRenderer.fileLoader = arrayBufferFileLoader;
