import React, { FC, useContext } from "react";
import { Button, LinkButton } from "../../../components/common";
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

  return (
    <div id="pdf-controls" className="rdv-pdf-controls">
      {enableThumbnails && numPages > 1 && (
        <ThumbnailToggle title="Toggle thumbnails" />
      )}

      {paginated && numPages > 1 && <PDFPagination />}

      {currentDocument?.fileData && (
        <LinkButton
          id="pdf-download"
          className="rdv-pdf-download-btn"
          href={currentDocument?.fileData as string}
          download={currentDocument?.fileName || currentDocument?.uri}
          title={t("downloadButtonLabel")}
        >
          <DownloadPDFIcon color="#000" size="75%" />
        </LinkButton>
      )}

      <Button
        id="pdf-zoom-out"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel - zoomJump))}
      >
        <ZoomOutPDFIcon color="#000" size="80%" />
      </Button>

      <Button
        id="pdf-zoom-in"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(zoomLevel + zoomJump))}
      >
        <ZoomInPDFIcon color="#000" size="80%" />
      </Button>

      <Button
        id="pdf-zoom-reset"
        className="rdv-pdf-control-btn"
        onMouseDown={() => dispatch(setZoomLevel(defaultZoomLevel))}
        disabled={zoomLevel === defaultZoomLevel}
      >
        <ResetZoomPDFIcon color="#000" size="70%" />
      </Button>

      {numPages > 1 && (
        <Button
          id="pdf-toggle-pagination"
          className="rdv-pdf-control-btn"
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="70%"
            reverse={paginated}
          />
        </Button>
      )}
    </div>
  );
};

export default PDFControls;
