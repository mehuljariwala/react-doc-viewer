import { FC, useContext, useCallback } from "react";
import { Button } from "../../../components/common";
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
      {enableThumbnails && numPages > 1 && (
        <ThumbnailToggle title="Toggle thumbnails" />
      )}

      {paginated && numPages > 1 && <PDFPagination />}

      {currentDocument?.fileData && (
        <Button
          id="pdf-download"
          className="rdv-pdf-download-btn"
          title={t("downloadButtonLabel")}
          onMouseDown={handleDownload}
        >
          <DownloadPDFIcon color="#000" size="22" />
        </Button>
      )}

      <Button
        id="pdf-zoom-out"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel - zoomJump))}
      >
        <ZoomOutPDFIcon color="#000" size="24" />
      </Button>

      <Button
        id="pdf-zoom-in"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel + zoomJump))}
      >
        <ZoomInPDFIcon color="#000" size="24" />
      </Button>

      <Button
        id="pdf-zoom-reset"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(defaultZoomLevel))}
        disabled={zoomLevel === defaultZoomLevel}
      >
        <ResetZoomPDFIcon color="#000" size="21" />
      </Button>

      {numPages > 1 && (
        <Button
          id="pdf-toggle-pagination"
          className="rdv-pdf-control-btn"
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="21"
            reverse={paginated}
          />
        </Button>
      )}
    </div>
  );
};

export default PDFControls;
