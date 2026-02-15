import React, { useContext, useRef, useMemo, useEffect } from "react";
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
import { setCurrentPage, setPDFPaginated, setZoomLevel } from "./state/actions";
import {
  useKeyboardShortcuts,
  KeyboardShortcut,
} from "../../features/keyboard-shortcuts";
import { SearchProvider, SearchBar, SearchContext, setSearchOpen } from "../../features/text-search";
import {
  BookmarksProvider,
  BookmarksSidebar,
  useBookmarks,
} from "../../features/bookmarks";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDFRendererContent: React.FC = () => {
  const { state: pdfState, dispatch: pdfDispatch } = useContext(PDFContext);
  const searchCtx = useContext(SearchContext);
  const thumbnailConfig = pdfState.mainState?.config?.thumbnail;
  const annotationConfig = pdfState.mainState?.config?.annotations;
  const enableThumbnails = thumbnailConfig?.enableThumbnails ?? false;
  const enableAnnotations = annotationConfig?.enableAnnotations ?? false;
  const enableKeyboard = pdfState.mainState?.config?.keyboard?.enableKeyboardShortcuts ?? false;
  const enableSearch = pdfState.mainState?.config?.search?.enableSearch ?? false;
  const enableBookmarks = pdfState.mainState?.config?.bookmarks?.enableBookmarks ?? false;
  const enableFullscreen = pdfState.mainState?.config?.fullscreen?.enableFullscreen ?? false;
  const enablePrint = pdfState.mainState?.config?.print?.enablePrint ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfDocument = pdfState.pdfDocument as pdfjs.PDFDocumentProxy | null;

  useBookmarks(pdfDocument);

  useEffect(() => {
    const { matches, currentMatchIndex } = searchCtx.state;
    if (!matches.length) return;
    const match = matches[currentMatchIndex];
    if (!match) return;
    if (match.pageIndex !== pdfState.currentPage) {
      pdfDispatch(setCurrentPage(match.pageIndex));
    }
  }, [searchCtx.state.currentMatchIndex, searchCtx.state.matches]);

  const handlePageSelect = (pageNumber: number) => {
    pdfDispatch(setCurrentPage(pageNumber));
    if (!pdfState.paginated) {
      pdfDispatch(setPDFPaginated(true));
    }
  };

  const shortcuts: KeyboardShortcut[] = useMemo(() => {
    const s: KeyboardShortcut[] = [
      {
        key: "ArrowLeft",
        action: () => {
          if (pdfState.currentPage > 1) {
            pdfDispatch(setCurrentPage(pdfState.currentPage - 1));
          }
        },
        description: "Previous page",
      },
      {
        key: "ArrowRight",
        action: () => {
          if (pdfState.currentPage < pdfState.numPages) {
            pdfDispatch(setCurrentPage(pdfState.currentPage + 1));
          }
        },
        description: "Next page",
      },
      {
        key: "Home",
        action: () => pdfDispatch(setCurrentPage(1)),
        description: "First page",
      },
      {
        key: "End",
        action: () => pdfDispatch(setCurrentPage(pdfState.numPages)),
        description: "Last page",
      },
      {
        key: "+",
        action: () =>
          pdfDispatch(setZoomLevel(pdfState.zoomLevel + pdfState.zoomJump)),
        description: "Zoom in",
      },
      {
        key: "=",
        action: () =>
          pdfDispatch(setZoomLevel(pdfState.zoomLevel + pdfState.zoomJump)),
        description: "Zoom in",
      },
      {
        key: "-",
        action: () =>
          pdfDispatch(setZoomLevel(pdfState.zoomLevel - pdfState.zoomJump)),
        description: "Zoom out",
      },
      {
        key: "0",
        action: () => pdfDispatch(setZoomLevel(pdfState.defaultZoomLevel)),
        description: "Reset zoom",
      },
      {
        key: "Escape",
        action: () => {
          if (searchCtx.state.isOpen) {
            searchCtx.dispatch(setSearchOpen(false));
          }
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
        },
        description: "Exit",
      },
    ];

    if (enableSearch) {
      s.push({
        key: "f",
        ctrlKey: true,
        action: () => searchCtx.dispatch(setSearchOpen(true)),
        description: "Open search",
      });
    }

    if (enablePrint) {
      s.push({
        key: "p",
        ctrlKey: true,
        action: () => {
          const url = pdfState.mainState?.currentDocument?.fileData as string;
          if (!url) return;
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = url;
          document.body.appendChild(iframe);
          iframe.onload = () => {
            iframe.contentWindow?.print();
            setTimeout(() => document.body.removeChild(iframe), 1000);
          };
        },
        description: "Print",
      });
    }

    if (enableFullscreen) {
      s.push({
        key: "f",
        action: () => {
          if (!containerRef.current) return;
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else {
            containerRef.current.requestFullscreen().catch(() => {});
          }
        },
        description: "Toggle fullscreen",
      });
    }

    return s;
  }, [
    pdfState.currentPage,
    pdfState.numPages,
    pdfState.zoomLevel,
    pdfState.zoomJump,
    pdfState.defaultZoomLevel,
    pdfState.mainState?.currentDocument?.fileData,
    pdfDispatch,
    searchCtx,
    enableSearch,
    enablePrint,
    enableFullscreen,
  ]);

  useKeyboardShortcuts(shortcuts, enableKeyboard);

  return (
    <div className="rdv-pdf-content-wrapper" ref={containerRef}>
      {enableThumbnails && (
        <ThumbnailSidebar
          onPageSelect={handlePageSelect}
          currentPage={pdfState.currentPage}
        />
      )}
      {enableBookmarks && (
        <BookmarksSidebar onNavigate={handlePageSelect} />
      )}
      <div className="rdv-pdf-main-content">
        {enableAnnotations && <AnnotationToolbar />}
        <PDFControls containerRef={containerRef} />
        {enableSearch && <SearchBar pdfDocument={pdfDocument} />}
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
          <SearchProvider>
            <BookmarksProvider>
              <div
                id="pdf-renderer"
                data-testid="pdf-renderer"
                className="rdv-pdf-container"
                {...(disableScrollbar ? { "data-disable-scrollbar": "" } : {})}
              >
                <PDFRendererContent />
              </div>
            </BookmarksProvider>
          </SearchProvider>
        </AnnotationProvider>
      </ThumbnailProvider>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
