import React, { FC, useContext, useRef, useState, useEffect } from "react";
import { Page } from "react-pdf";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { AnnotationLayer, AnnotationContext } from "../../../../features/annotations";

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = ({ pageNum }) => {
  const {
    state: { mainState, paginated, zoomLevel, numPages, currentPage },
  } = useContext(PDFContext);
  useContext(AnnotationContext);
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  const rendererRect = mainState?.rendererRect || null;
  const annotationConfig = mainState?.config?.annotations;
  const enableAnnotations = annotationConfig?.enableAnnotations ?? false;

  const _pageNum = pageNum ?? currentPage;

  useEffect(() => {
    if (pageRef.current) {
      const canvas = pageRef.current.querySelector("canvas");
      if (canvas) {
        setPageSize({
          width: canvas.width,
          height: canvas.height,
        });
      }
    }
  }, [zoomLevel, _pageNum]);

  const handleRenderSuccess = () => {
    if (pageRef.current) {
      const canvas = pageRef.current.querySelector("canvas");
      if (canvas) {
        setPageSize({
          width: canvas.offsetWidth,
          height: canvas.offsetHeight,
        });
      }
    }
  };

  const isLastPage = _pageNum >= numPages;

  return (
    <div
      id="pdf-page-wrapper"
      className="rdv-pdf-page-wrapper"
      {...(isLastPage ? { "data-last-page": "" } : {})}
    >
      {!paginated && (
        <div id="pdf-page-info" className="rdv-pdf-page-tag-info">
          {t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
          })}
        </div>
      )}
      <div className="rdv-pdf-page-container" ref={pageRef}>
        <Page
          pageNumber={_pageNum || currentPage}
          scale={zoomLevel}
          height={(rendererRect?.height ?? 100) - 100}
          width={(rendererRect?.width ?? 100) - 100}
          loading={t("pdfPluginLoading")}
          onRenderSuccess={handleRenderSuccess}
        />
        {enableAnnotations && pageSize.width > 0 && (
          <AnnotationLayer
            pageNumber={_pageNum}
            documentUri={mainState?.currentDocument?.uri || ""}
            width={pageSize.width}
            height={pageSize.height}
          />
        )}
      </div>
    </div>
  );
};

export default PDFSinglePage;
