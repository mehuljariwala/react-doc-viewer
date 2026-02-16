import { useRef, useEffect, useState } from "react";
import { renderSync } from "docx-preview-sync";
import { DocRenderer } from "../..";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";

const OFFICE_VIEWER_BASE =
  "https://view.officeapps.live.com/op/embed.aspx?src=";

function isPublicUrl(uri: string): boolean {
  try {
    const url = new URL(uri);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

type RenderMode = "office-online" | "local" | "error";

const DocxRenderer: DocRenderer = ({
  mainState: { currentDocument, config },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<RenderMode>("local");
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const uri = currentDocument?.uri ?? "";
  const officeOnlineEnabled = config?.docx?.useOfficeOnlineViewer === true;
  const useOfficeViewer = officeOnlineEnabled && isPublicUrl(uri);

  useEffect(() => {
    if (useOfficeViewer) {
      setMode("office-online");
      setIframeLoaded(false);
      return;
    }

    if (!currentDocument?.fileData || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";
    setMode("local");

    const options = {
      className: "rdv-docx",
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreLastRenderedPageBreak: false,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
    };

    renderSync(
      currentDocument.fileData as ArrayBuffer,
      container,
      undefined,
      options,
    ).catch(() => {
      setMode("error");
    });
  }, [currentDocument?.fileData, useOfficeViewer]);

  if (!currentDocument) return null;

  const fileName =
    currentDocument.fileName ||
    currentDocument.uri.split("/").pop() ||
    "document";

  if (mode === "office-online") {
    const viewerUrl = `${OFFICE_VIEWER_BASE}${encodeURIComponent(uri)}`;

    return (
      <div id="docx-renderer" className="rdv-msdoc-iframe-container">
        {!iframeLoaded && (
          <div className="rdv-msdoc-iframe-loading">Loading document...</div>
        )}
        <iframe
          className="rdv-msdoc-iframe"
          src={viewerUrl}
          title={fileName}
          onLoad={() => setIframeLoaded(true)}
          onError={() => setMode("error")}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    );
  }

  if (mode === "error") {
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
