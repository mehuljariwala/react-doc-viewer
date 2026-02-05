import React, { useContext } from "react";
import styled from "styled-components";
import { DocRenderer, IStyledProps } from "../..";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFContext, PDFProvider } from "./state";
import { pdfjs } from "react-pdf";
import {
  ThumbnailProvider,
  ThumbnailSidebar,
  ThumbnailContext,
} from "../../features/thumbnail-sidebar";
import {
  AnnotationProvider,
  AnnotationToolbar,
} from "../../features/annotations";
import { setCurrentPage, setPDFPaginated } from "./state/actions";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`,
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
    <ContentWrapper>
      {enableThumbnails && (
        <ThumbnailSidebar
          onPageSelect={handlePageSelect}
          currentPage={pdfState.currentPage}
        />
      )}
      <MainContent>
        {enableAnnotations && <AnnotationToolbar />}
        <PDFControls />
        <PDFPages />
      </MainContent>
    </ContentWrapper>
  );
};

const PDFRenderer: DocRenderer = ({ mainState }) => {
  const thumbnailConfig = mainState.config?.thumbnail;
  const annotationConfig = mainState.config?.annotations;

  return (
    <PDFProvider mainState={mainState}>
      <ThumbnailProvider config={thumbnailConfig}>
        <AnnotationProvider
          config={annotationConfig}
          documentUri={mainState.currentDocument?.uri}
        >
          <Container id="pdf-renderer" data-testid="pdf-renderer">
            <PDFRendererContent />
          </Container>
        </AnnotationProvider>
      </ThumbnailProvider>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  /* width */
  &::-webkit-scrollbar {
    ${(props: IStyledProps) => {
      return props.theme.disableThemeScrollbar ? "" : "width: 10px";
    }};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    /* background: ${(props: IStyledProps) => props.theme.secondary}; */
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props: IStyledProps) => props.theme.tertiary};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props: IStyledProps) => props.theme.primary};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;
