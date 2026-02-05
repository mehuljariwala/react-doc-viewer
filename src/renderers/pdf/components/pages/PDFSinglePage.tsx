import React, { FC, useContext, useRef, useState, useEffect } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { IStyledProps } from "../../../..";
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
  const { state: annotationState } = useContext(AnnotationContext);
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

  return (
    <PageWrapper id="pdf-page-wrapper" $lastPage={_pageNum >= numPages}>
      {!paginated && (
        <PageTag id="pdf-page-info">
          {t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
          })}
        </PageTag>
      )}
      <PageContainer ref={pageRef}>
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
      </PageContainer>
    </PageWrapper>
  );
};

export default PDFSinglePage;

interface PageWrapperProps {
  $lastPage: boolean;
}

const PageWrapper = styled.div<PageWrapperProps>`
  margin: ${(props) => (props.$lastPage ? "20px 0" : undefined)};
`;

const PageTag = styled.div`
  padding: 0 0 10px 10px;
  color: ${(props: IStyledProps) => props.theme.textTertiary};
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const PageContainer = styled.div`
  position: relative;
  display: inline-block;
`;
