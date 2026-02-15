"use client";

import React, { FC, useCallback, useState, useRef, useEffect } from "react";
import { setRendererRect } from "../store/actions";
import { DocRenderer, IConfig, IDocument } from "../models";
import { getFileName } from "../utils/getFileName";
import { useDocumentLoader } from "../hooks/useDocumentLoader";
import { useWindowSize } from "../hooks/useWindowSize";
import { LinkButton } from "./common";
import { LoadingIcon } from "./icons";
import { LoadingTimeout } from "./LoadingTimout";
import { useTranslation } from "../hooks/useTranslation";
import { IMainState } from "../store/mainStateReducer";
import { CommonToolbar, DEFAULT_ZOOM } from "./CommonToolbar";

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 3;

const PAGE_SELECTORS = [
  "section.rdv-docx",
  ".react-pdf__Page",
].join(", ");

function detectPages(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(PAGE_SELECTORS));
}

type ContentsProps = {
  documents: IDocument[];
  documentLoading: boolean | undefined;
  config: IConfig | undefined;
  currentDocument: IDocument | undefined;
  fileName: string;
  CurrentRenderer: DocRenderer | null | undefined;
  state: IMainState;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  numPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  contentRef: React.RefObject<HTMLDivElement>;
  t: (
    key:
      | "noRendererMessage"
      | "documentNavInfo"
      | "downloadButtonLabel"
      | "brokenFile"
      | "msgPluginRecipients"
      | "msgPluginSender"
      | "pdfPluginLoading"
      | "pdfPluginPageNumber",
    variables?: Record<string, string | number>,
  ) => string;
};

const Contents: React.FC<ContentsProps> = ({
  documents,
  documentLoading,
  config,
  currentDocument,
  fileName,
  CurrentRenderer,
  state,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  numPages,
  currentPage,
  onPageChange,
  contentRef,
  t,
}) => {
  if (!documents.length) {
    return <div id="no-documents"></div>;
  } else if (documentLoading) {
    if (config && config?.loadingRenderer?.overrideComponent) {
      const OverrideComponent = config.loadingRenderer.overrideComponent;
      return (
        <LoadingTimeout>
          <OverrideComponent document={currentDocument} fileName={fileName} />
        </LoadingTimeout>
      );
    }

    return (
      <LoadingTimeout>
        <div id="loading-renderer" data-testid="loading-renderer" className="rdv-loading-container">
          <div className="rdv-loading-icon">
            <LoadingIcon color="#444" size={40} />
          </div>
        </div>
      </LoadingTimeout>
    );
  } else {
    if (CurrentRenderer) {
      const isPDF = CurrentRenderer.fileTypes?.some(
        (ft) => ft === "pdf" || ft === "application/pdf",
      );

      if (isPDF) {
        return <CurrentRenderer mainState={state} />;
      }

      return (
        <>
          <CommonToolbar
            zoomLevel={zoomLevel}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onZoomReset={onZoomReset}
            numPages={numPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
          <div
            ref={contentRef}
            className="rdv-common-content-wrapper"
            style={{
              transformOrigin: "top center",
              transform: zoomLevel === DEFAULT_ZOOM ? undefined : `scale(${zoomLevel})`,
            }}
          >
            <CurrentRenderer mainState={state} />
          </div>
        </>
      );
    } else if (CurrentRenderer === undefined) {
      return null;
    } else {
      if (config && config?.noRenderer?.overrideComponent) {
        const OverrideComponent = config.noRenderer.overrideComponent;
        return (
          <OverrideComponent document={currentDocument} fileName={fileName} />
        );
      }

      return (
        <div id="no-renderer" data-testid="no-renderer">
          {t("noRendererMessage", {
            fileType: currentDocument?.fileType ?? "",
          })}
          <LinkButton
            id="no-renderer-download"
            className="rdv-download-btn"
            href={currentDocument?.uri}
            download={currentDocument?.uri}
          >
            {t("downloadButtonLabel")}
          </LinkButton>
        </div>
      );
    }
  }
};

export const ProxyRenderer: FC = () => {
  const { state, dispatch, CurrentRenderer } = useDocumentLoader();
  const { documents, documentLoading, currentDocument, config } = state;
  const size = useWindowSize();
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLElement[]>([]);

  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      node && dispatch(setRendererRect(node?.getBoundingClientRect()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, dispatch],
  );

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const updatePages = () => {
      const pages = detectPages(container);
      pagesRef.current = pages;
      if (pages.length > 1) {
        setNumPages(pages.length);
      } else {
        setNumPages(0);
      }
    };

    updatePages();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updatePages);
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [currentDocument]);

  useEffect(() => {
    const wrapper = contentRef.current;
    if (!wrapper || numPages <= 1) return;

    const handleScroll = () => {
      const pages = pagesRef.current;
      if (!pages.length) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const viewportMid = wrapperRect.top + wrapperRect.height * 0.3;

      let closest = 1;
      let closestDist = Infinity;
      for (let i = 0; i < pages.length; i++) {
        const rect = pages[i].getBoundingClientRect();
        const dist = Math.abs(rect.top - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i + 1;
        }
      }
      setCurrentPage(closest);
    };

    wrapper.addEventListener("scroll", handleScroll, { passive: true });
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [numPages]);

  const handlePageChange = useCallback((page: number) => {
    const pages = pagesRef.current;
    if (page < 1 || page > pages.length) return;
    const target = pages[page - 1];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentPage(page);
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(DEFAULT_ZOOM);
  }, []);

  const fileName = getFileName(
    currentDocument,
    config?.header?.retainURLParams || false,
  );

  return (
    <div id="proxy-renderer" data-testid="proxy-renderer" ref={containerRef}>
      <Contents
        {...{
          state,
          documents,
          documentLoading,
          config,
          currentDocument,
          fileName,
          CurrentRenderer,
          zoomLevel,
          onZoomIn: handleZoomIn,
          onZoomOut: handleZoomOut,
          onZoomReset: handleZoomReset,
          numPages,
          currentPage,
          onPageChange: handlePageChange,
          contentRef,
          t,
        }}
      />
    </div>
  );
};
