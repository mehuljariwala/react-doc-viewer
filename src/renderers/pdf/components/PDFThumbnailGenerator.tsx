import React, { FC, useContext, useEffect, useCallback, useRef } from "react";
import { Page } from "react-pdf";
import styled from "styled-components";
import { PDFContext } from "../state";
import {
  ThumbnailContext,
  useThumbnailGenerator,
} from "../../../features/thumbnail-sidebar";

const THUMBNAIL_WIDTH = 120;

export const PDFThumbnailGenerator: FC = () => {
  const { state: pdfState } = useContext(PDFContext);
  const { state: thumbnailState } = useContext(ThumbnailContext);
  const { numPages, mainState } = pdfState;
  const thumbnailConfig = mainState?.config?.thumbnail;
  const enableThumbnails = thumbnailConfig?.enableThumbnails ?? false;
  const renderedPages = useRef<Set<number>>(new Set());

  const { generateThumbnailFromCanvas } = useThumbnailGenerator({
    numPages,
    documentUri: mainState?.currentDocument?.uri,
  });

  const capturePageCanvas = useCallback((pageNumber: number) => {
    setTimeout(() => {
      const container = document.querySelector(`[data-thumbnail-page="${pageNumber}"]`);
      if (container) {
        const canvas = container.querySelector("canvas");
        if (canvas && !renderedPages.current.has(pageNumber)) {
          generateThumbnailFromCanvas(canvas, pageNumber);
          renderedPages.current.add(pageNumber);
        }
      }
    }, 100);
  }, [generateThumbnailFromCanvas]);

  useEffect(() => {
    renderedPages.current.clear();
  }, [mainState?.currentDocument?.uri]);

  if (!enableThumbnails || !thumbnailState.isOpen || numPages === 0) {
    return null;
  }

  return (
    <HiddenContainer aria-hidden="true">
      {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => {
        const existingThumbnail = thumbnailState.thumbnails.find(
          (t) => t.pageNumber === pageNum
        );
        if (existingThumbnail?.dataUrl) {
          return null;
        }
        return (
          <ThumbnailPage
            key={pageNum}
            data-thumbnail-page={pageNum}
          >
            <Page
              pageNumber={pageNum}
              width={THUMBNAIL_WIDTH}
              onRenderSuccess={() => capturePageCanvas(pageNum)}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </ThumbnailPage>
        );
      })}
    </HiddenContainer>
  );
};

const HiddenContainer = styled.div`
  position: absolute;
  left: -9999px;
  top: -9999px;
  visibility: hidden;
  pointer-events: none;
`;

const ThumbnailPage = styled.div`
  display: inline-block;
`;
