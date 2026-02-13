import React, { useContext } from "react";
import { DocRenderer } from "../..";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFContext, PDFProvider } from "./state";
import { pdfjs } from "react-pdf";
import {
  ThumbnailProvider,
  ThumbnailSidebar,
} from "../../features/thumbnail-sidebar";
import {
  AnnotationProvider,
  AnnotationToolbar,
} from "../../features/annotations";
import { setCurrentPage, setPDFPaginated } from "./state/actions";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDFRendererContent: React.FC = () => {
  const { state: pdfState, dispatch: pdfDispatch } = useContext(PDFContext);
  const thumbnailConfig = pdfState.mainState?.config?.thumbnail;
  const annotationConfig = pdfState.mainState?.config?.annotations;
  const enableThumbnails = thumbnailConfig?.enableThumbnails ?? false;
  const enableAnnotations = annotationConfig?.enableAnnotations ?? false;

  const handlePageSelect = (pageNumber: number) => {
    pdfDispatch(setCurrentPage(pageNumber));
    if (!pdfState.paginated) {
      pdfDispatch(setPDFPaginated(true));
    }
  };

  return (
    <div className="rdv-pdf-content-wrapper">
      {enableThumbnails && (
        <ThumbnailSidebar
          onPageSelect={handlePageSelect}
          currentPage={pdfState.currentPage}
        />
      )}
      <div className="rdv-pdf-main-content">
        {enableAnnotations && <AnnotationToolbar />}
        <PDFControls />
        <PDFPages />
      </div>
    </div>
  );
};

const PDFRenderer: DocRenderer = ({ mainState }) => {
  const thumbnailConfig = mainState.config?.thumbnail;
  const annotationConfig = mainState.config?.annotations;
  const disableScrollbar = mainState.config?.pdfVerticalScrollByDefault;

  return (
    <PDFProvider mainState={mainState}>
      <ThumbnailProvider config={thumbnailConfig}>
        <AnnotationProvider
          config={annotationConfig}
          documentUri={mainState.currentDocument?.uri}
        >
          <div
            id="pdf-renderer"
            data-testid="pdf-renderer"
            className="rdv-pdf-container"
            {...(disableScrollbar ? { "data-disable-scrollbar": "" } : {})}
          >
            <PDFRendererContent />
          </div>
        </AnnotationProvider>
      </ThumbnailProvider>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
