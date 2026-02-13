import { FC, useContext, useCallback } from "react";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";
import { ThumbnailToggle } from "../../../features/thumbnail-sidebar";

const PDFControls: FC = () => {
  const { t } = useTranslation();
  const {
    state: {
      mainState,
      paginated,
      zoomLevel,
      numPages,
      zoomJump,
      defaultZoomLevel,
    },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;
  const thumbnailConfig = mainState?.config?.thumbnail;
  const enableThumbnails = thumbnailConfig?.enableThumbnails ?? false;
  const zoomPercent = Math.round(zoomLevel * 100);

  const handleDownload = useCallback(() => {
    const url = currentDocument?.fileData as string;
    const name = currentDocument?.fileName || currentDocument?.uri || "download";
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

  return (
    <div id="pdf-controls" className="rdv-pdf-controls">
      <div className="rdv-toolbar-inner">
        {numPages > 1 && (
          <>
            <div className="rdv-toolbar-group">
              <PDFPagination />
            </div>
            <div className="rdv-toolbar-divider" />
          </>
        )}

        {currentDocument?.fileData && (
          <>
            <div className="rdv-toolbar-group">
              <button
                id="pdf-download"
                className="rdv-toolbar-btn"
                title={t("downloadButtonLabel")}
                onMouseDown={handleDownload}
              >
                <DownloadPDFIcon size="16" />
              </button>
            </div>
            <div className="rdv-toolbar-divider" />
          </>
        )}

        <div className="rdv-toolbar-group">
          <button
            id="pdf-zoom-out"
            className="rdv-toolbar-btn"
            onMouseDown={() => dispatch(setZoomLevel(zoomLevel - zoomJump))}
            title="Zoom out"
          >
            <ZoomOutPDFIcon size="16" />
          </button>

          <span className="rdv-toolbar-zoom-label">{zoomPercent}%</span>

          <button
            id="pdf-zoom-in"
            className="rdv-toolbar-btn"
            onMouseDown={() => dispatch(setZoomLevel(zoomLevel + zoomJump))}
            title="Zoom in"
          >
            <ZoomInPDFIcon size="16" />
          </button>

          <button
            id="pdf-zoom-reset"
            className="rdv-toolbar-btn"
            onMouseDown={() => dispatch(setZoomLevel(defaultZoomLevel))}
            disabled={zoomLevel === defaultZoomLevel}
            title="Fit to width"
          >
            <ResetZoomPDFIcon size="16" />
          </button>
        </div>

        {numPages > 1 && (
          <>
            <div className="rdv-toolbar-divider" />
            <div className="rdv-toolbar-group">
              {enableThumbnails && (
                <ThumbnailToggle title="Toggle thumbnails" />
              )}
              <button
                id="pdf-toggle-pagination"
                className="rdv-toolbar-btn"
                onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
                title={paginated ? "Scroll mode" : "Page mode"}
              >
                <TogglePaginationPDFIcon size="16" reverse={paginated} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFControls;
