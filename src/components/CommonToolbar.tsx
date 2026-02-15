"use client";

import { FC, useCallback, useContext, useState, KeyboardEvent } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { IIconProps } from "./icons";

const STROKE_WIDTH = 1.8;
const DEFAULT_COLOR = "#4b5563";

const DownloadIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PrintIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const ZoomInIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ResetZoomIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

const PrevIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const NextIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;

interface CommonToolbarProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  numPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const DEFAULT_ZOOM = 1;

export const CommonToolbar: FC<CommonToolbarProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  numPages,
  currentPage,
  onPageChange,
}) => {
  const { state } = useContext(DocViewerContext);
  const { currentDocument } = state;
  const [pageInput, setPageInput] = useState(String(currentPage));

  const handleDownload = useCallback(() => {
    if (!currentDocument) return;
    const url =
      (currentDocument.fileData as string) || currentDocument.uri;
    const name =
      currentDocument.fileName ||
      currentDocument.uri?.split("/").pop() ||
      "download";
    if (!url) return;

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = name;
        a.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
  }, [currentDocument]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handlePageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageInput(e.target.value);
    },
    [],
  );

  const handlePageInputCommit = useCallback(() => {
    const parsed = parseInt(pageInput, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= numPages) {
      onPageChange(parsed);
    } else {
      setPageInput(String(currentPage));
    }
  }, [pageInput, numPages, currentPage, onPageChange]);

  const handlePageInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handlePageInputCommit();
      }
    },
    [handlePageInputCommit],
  );

  const zoomPercent = Math.round(zoomLevel * 100);

  if (currentPage !== parseInt(pageInput, 10) && document.activeElement?.className !== "rdv-toolbar-page-input") {
    setPageInput(String(currentPage));
  }

  return (
    <div className="rdv-pdf-controls">
      <div className="rdv-toolbar-inner">
        {numPages > 1 && (
          <>
            <div className="rdv-toolbar-group">
              <button
                className="rdv-toolbar-btn"
                title="Previous page"
                onMouseDown={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <PrevIcon size="16" />
              </button>
              <div className="rdv-toolbar-page-info">
                <input
                  className="rdv-toolbar-page-input"
                  type="text"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  onBlur={handlePageInputCommit}
                  onKeyDown={handlePageInputKeyDown}
                />
                <span className="rdv-toolbar-page-total">of {numPages}</span>
              </div>
              <button
                className="rdv-toolbar-btn"
                title="Next page"
                onMouseDown={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= numPages}
              >
                <NextIcon size="16" />
              </button>
            </div>
            <div className="rdv-toolbar-divider" />
          </>
        )}

        <div className="rdv-toolbar-group">
          <button
            className="rdv-toolbar-btn"
            title="Download"
            onMouseDown={handleDownload}
          >
            <DownloadIcon size="16" />
          </button>
          <button
            className="rdv-toolbar-btn"
            title="Print"
            onMouseDown={handlePrint}
          >
            <PrintIcon size="16" />
          </button>
        </div>

        <div className="rdv-toolbar-divider" />

        <div className="rdv-toolbar-group">
          <button
            className="rdv-toolbar-btn"
            title="Zoom out"
            onMouseDown={onZoomOut}
            disabled={zoomLevel <= MIN_ZOOM}
          >
            <ZoomOutIcon size="16" />
          </button>
          <span className="rdv-toolbar-zoom-label">{zoomPercent}%</span>
          <button
            className="rdv-toolbar-btn"
            title="Zoom in"
            onMouseDown={onZoomIn}
            disabled={zoomLevel >= MAX_ZOOM}
          >
            <ZoomInIcon size="16" />
          </button>
          <button
            className="rdv-toolbar-btn"
            title="Reset zoom"
            onMouseDown={onZoomReset}
            disabled={zoomLevel === DEFAULT_ZOOM}
          >
            <ResetZoomIcon size="16" />
          </button>
        </div>
      </div>
    </div>
  );
};
