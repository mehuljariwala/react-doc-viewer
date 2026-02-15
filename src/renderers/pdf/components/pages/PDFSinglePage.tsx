import React, { FC, useContext, useRef, useState, useEffect, useCallback } from "react";
import { Page } from "react-pdf";
import { useTranslation } from "../../../../hooks/useTranslation";
import { PDFContext } from "../../state";
import { AnnotationLayer, AnnotationContext } from "../../../../features/annotations";
import { WatermarkOverlay } from "../../../../features/watermark";
import { SearchContext } from "../../../../features/text-search";

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

  const searchCtx = useContext(SearchContext);
  const searchQuery = searchCtx.state.query;
  const enableSearch = mainState?.config?.search?.enableSearch ?? false;

  const rendererRect = mainState?.rendererRect || null;
  const annotationConfig = mainState?.config?.annotations;
  const enableAnnotations = annotationConfig?.enableAnnotations ?? false;
  const watermarkConfig = mainState?.config?.watermark;
  const enableTextSelection = mainState?.config?.textSelection?.enableTextSelection ?? false;

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

  const customTextRenderer = useCallback(
    ({ str }: { str: string }) => {
      if (!enableSearch || !searchQuery.trim()) return str;
      const query = searchQuery.toLowerCase();
      const lowerStr = str.toLowerCase();
      if (!lowerStr.includes(query)) return str;

      const parts: string[] = [];
      let lastIndex = 0;
      let idx = lowerStr.indexOf(query, 0);
      while (idx !== -1) {
        if (idx > lastIndex) {
          parts.push(str.substring(lastIndex, idx));
        }
        const matched = str.substring(idx, idx + query.length);
        parts.push(`<mark class="rdv-search-highlight">${matched}</mark>`);
        lastIndex = idx + query.length;
        idx = lowerStr.indexOf(query, lastIndex);
      }
      if (lastIndex < str.length) {
        parts.push(str.substring(lastIndex));
      }
      return parts.join("");
    },
    [enableSearch, searchQuery],
  );

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
          renderTextLayer={enableTextSelection || enableSearch}
          customTextRenderer={enableSearch && searchQuery ? customTextRenderer : undefined}
        />
        {enableAnnotations && pageSize.width > 0 && (
          <AnnotationLayer
            pageNumber={_pageNum}
            documentUri={mainState?.currentDocument?.uri || ""}
            width={pageSize.width}
            height={pageSize.height}
          />
        )}
        {watermarkConfig && <WatermarkOverlay config={watermarkConfig} />}
      </div>
    </div>
  );
};

export default PDFSinglePage;
