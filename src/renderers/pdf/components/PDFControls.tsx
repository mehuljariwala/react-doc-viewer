import { FC, useContext, useCallback, useRef } from "react";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
  PrintPDFIcon,
  FullscreenPDFIcon,
  ExitFullscreenPDFIcon,
  SearchPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";
import { ThumbnailToggle } from "../../../features/thumbnail-sidebar";
import { BookmarksToggle } from "../../../features/bookmarks";
import { setSearchOpen, SearchContext } from "../../../features/text-search";
import { useFullscreen } from "../../../hooks/useFullscreen";

interface Props {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const PDFControls: FC<Props> = ({ containerRef }) => {
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

  const fallbackRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = containerRef || fallbackRef;
  const { isFullscreen, toggleFullscreen } = useFullscreen(fullscreenRef);

  const searchCtx = useContext(SearchContext);

  const currentDocument = mainState?.currentDocument || null;
  const thumbnailConfig = mainState?.config?.thumbnail;
  const enableThumbnails = thumbnailConfig?.enableThumbnails ?? false;
  const enablePrint = mainState?.config?.print?.enablePrint ?? false;
  const enableFullscreen = mainState?.config?.fullscreen?.enableFullscreen ?? false;
  const enableSearch = mainState?.config?.search?.enableSearch ?? false;
  const enableBookmarks = mainState?.config?.bookmarks?.enableBookmarks ?? false;
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

  const handlePrint = useCallback(async () => {
    const fileData = currentDocument?.fileData as string | undefined;
    if (!fileData) return;

    let blobUrl: string | undefined;
    try {
      let blob: Blob;

      if (fileData.startsWith("data:")) {
        const res = await fetch(fileData);
        blob = await res.blob();
      } else {
        const res = await fetch(fileData);
        blob = await res.blob();
      }

      blobUrl = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" }),
      );

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = blobUrl;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
          if (blobUrl) URL.revokeObjectURL(blobUrl);
        }, 1000);
      };
    } catch {
      window.print();
    }
  }, [currentDocument]);

  const handleSearchToggle = useCallback(() => {
    searchCtx.dispatch(setSearchOpen(!searchCtx.state.isOpen));
  }, [searchCtx]);

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

              {enablePrint && (
                <button
                  id="pdf-print"
                  className="rdv-toolbar-btn"
                  title={t("printButtonLabel")}
                  onMouseDown={handlePrint}
                >
                  <PrintPDFIcon size="16" />
                </button>
              )}
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

        <div className="rdv-toolbar-divider" />

        <div className="rdv-toolbar-group">
          {enableSearch && (
            <button
              id="pdf-search"
              className="rdv-toolbar-btn"
              onMouseDown={handleSearchToggle}
              title="Search"
            >
              <SearchPDFIcon size="16" />
            </button>
          )}

          {enableFullscreen && (
            <button
              id="pdf-fullscreen"
              className="rdv-toolbar-btn"
              onMouseDown={toggleFullscreen}
              title={
                isFullscreen
                  ? t("exitFullscreenButtonLabel")
                  : t("fullscreenButtonLabel")
              }
            >
              {isFullscreen ? (
                <ExitFullscreenPDFIcon size="16" />
              ) : (
                <FullscreenPDFIcon size="16" />
              )}
            </button>
          )}

          {enableBookmarks && <BookmarksToggle />}

          {enableThumbnails && (
            <ThumbnailToggle title="Toggle thumbnails" />
          )}

          {numPages > 1 && (
            <button
              id="pdf-toggle-pagination"
              className="rdv-toolbar-btn"
              onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
              title={paginated ? "Scroll mode" : "Page mode"}
            >
              <TogglePaginationPDFIcon size="16" reverse={paginated} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFControls;
