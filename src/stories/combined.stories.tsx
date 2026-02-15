import React, { useRef, useState } from "react";
import DocViewer from "../DocViewer";

import pdfMultiplePagesFile from "../exampleFiles/pdf-multiple-pages-file.pdf";

import { DocViewerRef } from "..";

export default {
  title: "DocViewer/Combined",
};

export const AllFeaturesCombined = () => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [pageInput, setPageInput] = useState("1");
  const [annotations, setAnnotations] = useState<unknown[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <strong>All Features Demo</strong>
        <span>|</span>
        <input
          type="number"
          min="1"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          style={{ width: "50px", padding: "4px" }}
          placeholder="Page"
        />
        <button
          onClick={() => {
            const page = parseInt(pageInput, 10);
            if (page > 0) docViewerRef.current?.goToPage(page);
          }}
          style={{ padding: "4px 10px" }}
        >
          Jump
        </button>
        <span>|</span>
        <span style={{ fontSize: "12px" }}>Annotations: {annotations.length}</span>
        <span>|</span>
        <span style={{ fontSize: "12px", color: "#666" }}>Drag files to add - Click thumbnails to navigate</span>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          ref={docViewerRef}
          documents={[{ uri: pdfMultiplePagesFile }]}
          config={{
            dragDrop: {
              enableDragDrop: true,
              acceptedFileTypes: ["application/pdf", "image/*"],
              dropBehavior: "append",
            },
            thumbnail: {
              enableThumbnails: true,
              thumbnailWidth: 100,
              sidebarDefaultOpen: false,
            },
            annotations: {
              enableAnnotations: true,
              colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1"],
              tools: ["select", "highlight", "pen", "comment", "eraser"],
              onAnnotationChange: setAnnotations,
            },
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const EveryFeatureEnabled = () => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [annotations, setAnnotations] = useState<unknown[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#1f2937", color: "#f9fafb", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
        <strong>Every Feature Enabled</strong>
        <span style={{ fontSize: "11px", opacity: 0.7 }}>
          Dark Mode + Print + Fullscreen + Progress + Watermark + Text Selection + Keyboard + Search + Bookmarks + Thumbnails + Annotations
        </span>
        <span style={{ fontSize: "11px", opacity: 0.5 }}>Annotations: {annotations.length}</span>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          ref={docViewerRef}
          documents={[{ uri: pdfMultiplePagesFile }]}
          config={{
            themeMode: "dark",
            print: { enablePrint: true },
            fullscreen: { enableFullscreen: true },
            loadingProgress: { enableProgressBar: true },
            watermark: {
              text: "DRAFT",
              opacity: 0.06,
              fontSize: 56,
              color: "#ffffff",
              rotation: -30,
            },
            textSelection: { enableTextSelection: true },
            keyboard: { enableKeyboardShortcuts: true },
            password: { enablePasswordPrompt: true },
            search: { enableSearch: true },
            bookmarks: { enableBookmarks: true },
            thumbnail: {
              enableThumbnails: true,
              thumbnailWidth: 100,
              sidebarDefaultOpen: false,
            },
            annotations: {
              enableAnnotations: true,
              colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1"],
              tools: ["select", "highlight", "pen", "comment", "eraser"],
              onAnnotationChange: setAnnotations,
            },
            dragDrop: {
              enableDragDrop: true,
              dropBehavior: "append",
            },
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};
