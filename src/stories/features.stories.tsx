import { useRef, useState } from "react";
import DocViewer from "../DocViewer";
import { SplitDocViewer } from "../features/split-view";

import pdfFile from "../exampleFiles/pdf-file.pdf";
import pdfMultiplePagesFile from "../exampleFiles/pdf-multiple-pages-file.pdf";
import pngFile from "../exampleFiles/png-image.png?url";
import csvFile from "../exampleFiles/csv-file.csv?url";
import webpFile from "../exampleFiles/webp-file.webp?url";

import { DocViewerRef, IDocument } from "..";

export default {
  title: "DocViewer/Features",
};

const docs: IDocument[] = [
  { uri: pdfFile },
  { uri: pngFile },
  { uri: csvFile },
  { uri: pdfMultiplePagesFile },
  { uri: webpFile },
];

export const DragAndDrop = () => {
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>Drag & Drop Demo</strong> - Drag PDF or image files onto the viewer below
        {droppedFiles.length > 0 && (
          <div style={{ marginTop: "5px", fontSize: "12px" }}>
            Dropped: {droppedFiles.join(", ")}
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={docs}
          config={{
            dragDrop: {
              enableDragDrop: true,
              acceptedFileTypes: ["application/pdf", "image/*"],
              maxFileSize: 50 * 1024 * 1024,
              dropBehavior: "append",
              onDrop: (files) => {
                setDroppedFiles(files.map((f) => f.name));
              },
              onDropRejected: (_files, reason) => {
                alert(`Files rejected: ${reason}`);
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export const ThumbnailSidebar = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile }]}
      config={{
        thumbnail: {
          enableThumbnails: true,
          thumbnailWidth: 120,
          sidebarDefaultOpen: true,
        },
        pdfVerticalScrollByDefault: false,
      }}
    />
  </div>
);

export const Annotations = () => {
  const [annotations, setAnnotations] = useState<unknown[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>Annotations Demo</strong> - Use the toolbar to highlight, draw, or add comments
        <div style={{ marginTop: "5px", fontSize: "12px" }}>
          Annotations count: {annotations.length}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={[{ uri: pdfMultiplePagesFile }]}
          config={{
            annotations: {
              enableAnnotations: true,
              defaultColor: "#FFFF00",
              colors: ["#FFFF00", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
              tools: ["select", "highlight", "pen", "comment", "eraser"],
              onAnnotationChange: (newAnnotations) => {
                setAnnotations(newAnnotations);
              },
            },
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const PageJump = () => {
  const docViewerRef = useRef<DocViewerRef>(null);
  const [pageInput, setPageInput] = useState("1");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0", display: "flex", gap: "10px", alignItems: "center" }}>
        <strong>Page Jump Demo</strong>
        <input
          type="number"
          min="1"
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          style={{ width: "60px", padding: "5px" }}
        />
        <button
          onClick={() => {
            const page = parseInt(pageInput, 10);
            if (page > 0) {
              docViewerRef.current?.goToPage(page);
            }
          }}
          style={{ padding: "5px 15px" }}
        >
          Go to Page
        </button>
        <button onClick={() => docViewerRef.current?.prev()} style={{ padding: "5px 15px" }}>
          Prev Doc
        </button>
        <button onClick={() => docViewerRef.current?.next()} style={{ padding: "5px 15px" }}>
          Next Doc
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          ref={docViewerRef}
          documents={[{ uri: pdfMultiplePagesFile }]}
          config={{
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const JumpToPageProp = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0", display: "flex", gap: "10px", alignItems: "center" }}>
        <strong>Jump To Page Prop Demo</strong>
        <span>Current Page: {currentPage}</span>
        <button onClick={() => setCurrentPage(1)} style={{ padding: "5px 15px" }}>
          Page 1
        </button>
        <button onClick={() => setCurrentPage(3)} style={{ padding: "5px 15px" }}>
          Page 3
        </button>
        <button onClick={() => setCurrentPage(5)} style={{ padding: "5px 15px" }}>
          Page 5
        </button>
        <button onClick={() => setCurrentPage(10)} style={{ padding: "5px 15px" }}>
          Page 10
        </button>
        <input
          type="number"
          min="1"
          max="10"
          value={currentPage}
          onChange={(e) => setCurrentPage(parseInt(e.target.value, 10) || 1)}
          style={{ width: "60px", padding: "5px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={[{ uri: pdfMultiplePagesFile }]}
          jumpToPage={currentPage}
          config={{
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const DarkMode = () => {
  const [mode, setMode] = useState<"light" | "dark" | "auto">("dark");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0", display: "flex", gap: "10px", alignItems: "center" }}>
        <strong>Dark Mode Demo</strong>
        <button
          onClick={() => setMode("light")}
          style={{ padding: "4px 12px", fontWeight: mode === "light" ? "bold" : "normal" }}
        >
          Light
        </button>
        <button
          onClick={() => setMode("dark")}
          style={{ padding: "4px 12px", fontWeight: mode === "dark" ? "bold" : "normal" }}
        >
          Dark
        </button>
        <button
          onClick={() => setMode("auto")}
          style={{ padding: "4px 12px", fontWeight: mode === "auto" ? "bold" : "normal" }}
        >
          Auto (System)
        </button>
        <span style={{ fontSize: "12px", color: "#666" }}>Current: {mode}</span>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={[{ uri: pdfMultiplePagesFile }]}
          config={{
            themeMode: mode,
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const PrintButton = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile }]}
      config={{
        print: { enablePrint: true },
        pdfVerticalScrollByDefault: false,
      }}
    />
  </div>
);

export const Fullscreen = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile }]}
      config={{
        fullscreen: { enableFullscreen: true },
        pdfVerticalScrollByDefault: false,
      }}
    />
  </div>
);

export const LoadingProgress = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile }]}
      config={{
        loadingProgress: { enableProgressBar: true },
        pdfVerticalScrollByDefault: false,
      }}
    />
  </div>
);

export const Watermark = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile }]}
      config={{
        watermark: {
          text: "CONFIDENTIAL",
          opacity: 0.08,
          fontSize: 52,
          color: "#ff0000",
          rotation: -35,
        },
        pdfVerticalScrollByDefault: false,
      }}
    />
  </div>
);

export const TextSelection = () => (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <strong>Text Selection Demo</strong>
      <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>
        Select text on the PDF and copy with Ctrl+C
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <DocViewer
        documents={[{ uri: pdfMultiplePagesFile }]}
        config={{
          textSelection: { enableTextSelection: true },
          pdfVerticalScrollByDefault: false,
        }}
      />
    </div>
  </div>
);

export const KeyboardShortcuts = () => (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <strong>Keyboard Shortcuts Demo</strong>
      <div style={{ fontSize: "12px", color: "#666", marginTop: "4px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <span>Arrow Left/Right: prev/next page</span>
        <span>Home/End: first/last page</span>
        <span>+/-: zoom in/out</span>
        <span>0: reset zoom</span>
        <span>Esc: exit fullscreen/search</span>
      </div>
    </div>
    <div style={{ flex: 1 }}>
      <DocViewer
        documents={[{ uri: pdfMultiplePagesFile }]}
        config={{
          keyboard: { enableKeyboardShortcuts: true },
          fullscreen: { enableFullscreen: true },
          search: { enableSearch: true },
          print: { enablePrint: true },
          pdfVerticalScrollByDefault: false,
        }}
      />
    </div>
  </div>
);

export const PasswordProtection = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>Password-Protected PDF Demo</strong>
        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
          Upload a password-protected PDF to test the password prompt
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={(el) =>
            el.target.files?.length &&
            setSelectedDocs(Array.from(el.target.files))
          }
          style={{ marginTop: "8px" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={
            selectedDocs.length > 0
              ? selectedDocs.map((file) => ({
                  uri: window.URL.createObjectURL(file),
                  fileName: file.name,
                }))
              : [{ uri: pdfMultiplePagesFile }]
          }
          config={{
            password: { enablePasswordPrompt: true },
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const TextSearch = () => (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <strong>Text Search Demo</strong>
      <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>
        Click the search icon in the toolbar or press Ctrl+F
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <DocViewer
        documents={[{ uri: pdfMultiplePagesFile }]}
        config={{
          search: { enableSearch: true },
          keyboard: { enableKeyboardShortcuts: true },
          textSelection: { enableTextSelection: true },
          pdfVerticalScrollByDefault: false,
        }}
      />
    </div>
  </div>
);

export const Bookmarks = () => (
  <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "10px", background: "#f0f0f0" }}>
      <strong>Bookmarks / TOC Demo</strong>
      <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>
        Click the bookmark icon in the toolbar to show the table of contents sidebar
      </span>
    </div>
    <div style={{ flex: 1 }}>
      <DocViewer
        documents={[{ uri: pdfMultiplePagesFile }]}
        config={{
          bookmarks: { enableBookmarks: true },
          pdfVerticalScrollByDefault: false,
        }}
      />
    </div>
  </div>
);

export const SplitView = () => (
  <div style={{ height: "100vh" }}>
    <SplitDocViewer
      left={{
        documents: [{ uri: pdfMultiplePagesFile }],
        config: { pdfVerticalScrollByDefault: false },
      }}
      right={{
        documents: [{ uri: pdfFile }],
        config: { pdfVerticalScrollByDefault: false },
      }}
      syncScroll={false}
    />
  </div>
);

export const SplitViewSyncScroll = () => (
  <div style={{ height: "100vh" }}>
    <SplitDocViewer
      left={{
        documents: [{ uri: pdfMultiplePagesFile }],
        config: { pdfVerticalScrollByDefault: true },
      }}
      right={{
        documents: [{ uri: pdfMultiplePagesFile }],
        config: { pdfVerticalScrollByDefault: true },
      }}
      syncScroll={true}
    />
  </div>
);
