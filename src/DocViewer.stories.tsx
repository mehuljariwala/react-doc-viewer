import React, { useRef, useState } from "react";
import DocViewer from "./DocViewer";
import { DocViewerRenderers } from "./renderers";
import { SplitDocViewer } from "./features/split-view";

import pdfFile from "./exampleFiles/pdf-file.pdf";
import pdfMultiplePagesFile from "./exampleFiles/pdf-multiple-pages-file.pdf";
import pngFile from "./exampleFiles/png-image.png?url";
import csvFile from "./exampleFiles/csv-file.csv?url";
import epsFile from "./exampleFiles/eps-file.eps?url";
import webpFile from "./exampleFiles/webp-file.webp?url";
import jpgFile from "./exampleFiles/jpg-image.jpg?url";
import gifFile from "./exampleFiles/gif-image.gif?url";
import bmpFile from "./exampleFiles/bmp-image.bmp?url";
import txtFile from "./exampleFiles/txt-file.txt?url";
import mdFile from "./exampleFiles/md-file.md?url";
import rtfFile from "./exampleFiles/rtf-file.rtf";
import docxFile from "./exampleFiles/docx-file.docx";

import { DocViewerRef, IDocument } from ".";

export default {
  title: "DocViewer",
};

const docs: IDocument[] = [
  { uri: pdfFile },
  { uri: pngFile },
  { uri: csvFile },
  { uri: pdfMultiplePagesFile },
  { uri: webpFile },
];

export const Default = () => (
  <DocViewer
    documents={docs}
    initialActiveDocument={docs[1]}
    config={{
      noRenderer: {
        overrideComponent: ({ document, fileName }) => {
          const fileText = fileName || document?.fileType || "";
          console.log(document);
          if (fileText) {
            return <div>no renderer for {fileText}</div>;
          }
          return <div>no renderer</div>;
        },
      },
      loadingRenderer: {
        overrideComponent: ({ document, fileName }) => {
          const fileText = fileName || document?.fileType || "";
          if (fileText) {
            return <div>loading ({fileText})</div>;
          }
          return <div>loading</div>;
        },
      },
      csvDelimiter: ",",
      pdfZoom: {
        defaultZoom: 1.1,
        zoomJump: 0.2,
      },
      pdfVerticalScrollByDefault: true,
    }}
    language="pl"
  />
);

export const WithPDFInput = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </>
  );
};

export const ManualNextPrevNavigation = () => {
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  const handleDocumentChange = (document: IDocument) => {
    setActiveDocument(document);
  };

  return (
    <>
      <DocViewer
        documents={docs}
        activeDocument={activeDocument}
        onDocumentChange={handleDocumentChange}
      />
    </>
  );
};

export const WithRef = () => {
  const docViewerRef = useRef<DocViewerRef>(null);

  return (
    <>
      <div>
        <button onClick={() => docViewerRef?.current?.prev()}>
          Prev Document By Ref
        </button>
        <button onClick={() => docViewerRef?.current?.next()}>
          Next Document By Ref
        </button>
      </div>
      <DocViewer
        ref={docViewerRef}
        documents={docs}
        config={{ header: { disableHeader: true } }}
      />
    </>
  );
};

export const NoRenderType = () => {
  const docs = [{ uri: epsFile, fileType: "application/postscript" }];

  return (
    <DocViewer
      documents={docs}
      initialActiveDocument={docs[0]}
      pluginRenderers={DocViewerRenderers}
      language="en"
    />
  );
};

export const WithDragAndDrop = () => {
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
                console.log("Files dropped:", files);
              },
              onDropRejected: (files, reason) => {
                console.log("Files rejected:", files, "Reason:", reason);
                alert(`Files rejected: ${reason}`);
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export const WithThumbnailSidebar = () => {
  return (
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
};

export const WithAnnotations = () => {
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
                console.log("Annotations updated:", newAnnotations);
              },
            },
            pdfVerticalScrollByDefault: false,
          }}
        />
      </div>
    </div>
  );
};

export const WithPageJump = () => {
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

export const WithJumpToPageProp = () => {
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
        <span style={{ fontSize: "12px", color: "#666" }}>Drag files to add • Click thumbnails to navigate</span>
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

// ===================== Feature 1: Dark Mode =====================

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

// ===================== Feature 2: Print Button =====================

export const WithPrintButton = () => (
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

// ===================== Feature 3: Fullscreen Mode =====================

export const WithFullscreen = () => (
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

// ===================== Feature 4: Loading Progress Bar =====================

export const WithLoadingProgress = () => (
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

// ===================== Feature 5: Watermark Overlay =====================

export const WithWatermark = () => (
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

// ===================== Feature 6: Text Selection + Copy =====================

export const WithTextSelection = () => (
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

// ===================== Feature 7: Keyboard Shortcuts =====================

export const WithKeyboardShortcuts = () => (
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

// ===================== Feature 8: Password-Protected PDFs =====================

export const WithPasswordProtection = () => {
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

// ===================== Feature 9: Text Search =====================

export const WithTextSearch = () => (
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

// ===================== Feature 10: Bookmarks / TOC Sidebar =====================

export const WithBookmarks = () => (
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

// ===================== Feature 11: Split View / Compare =====================

export const WithSplitView = () => (
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

export const WithSplitViewSyncScroll = () => (
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

// ===================== All 11 Features Combined =====================

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

// ===================== File Type Renderers =====================

export const PDFFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfFile, fileName: "sample.pdf" }]}
      pluginRenderers={DocViewerRenderers}
      config={{ pdfVerticalScrollByDefault: true }}
    />
  </div>
);

export const DOCXFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: docxFile, fileName: "sample.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const TXTFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: txtFile, fileName: "sample.txt", fileType: "text/plain" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const MarkdownFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: mdFile, fileName: "README.md", fileType: "text/markdown" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const RTFFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: rtfFile, fileName: "sample.rtf", fileType: "application/rtf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const CSVFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: csvFile, fileName: "data.csv" }]}
      pluginRenderers={DocViewerRenderers}
      config={{ csvDelimiter: "," }}
    />
  </div>
);

export const JPGFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: jpgFile, fileName: "photo.jpg" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const PNGFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pngFile, fileName: "image.png" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const GIFFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: gifFile, fileName: "animation.gif" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const BMPFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: bmpFile, fileName: "image.bmp" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const WebPFile = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: webpFile, fileName: "image.webp" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const AllFileTypes = () => {
  const allDocs: IDocument[] = [
    { uri: pdfFile, fileName: "document.pdf" },
    { uri: docxFile, fileName: "document.docx", fileType: "docx" },
    { uri: txtFile, fileName: "readme.txt", fileType: "text/plain" },
    { uri: mdFile, fileName: "README.md", fileType: "text/markdown" },
    { uri: rtfFile, fileName: "document.rtf", fileType: "application/rtf" },
    { uri: csvFile, fileName: "data.csv" },
    { uri: jpgFile, fileName: "photo.jpg" },
    { uri: pngFile, fileName: "image.png" },
    { uri: gifFile, fileName: "animation.gif" },
    { uri: bmpFile, fileName: "image.bmp" },
    { uri: webpFile, fileName: "image.webp" },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>All File Types</strong>
        <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>
          Navigate between PDF, DOCX, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <DocViewer
          documents={allDocs}
          pluginRenderers={DocViewerRenderers}
          config={{
            pdfVerticalScrollByDefault: true,
            csvDelimiter: ",",
          }}
        />
      </div>
    </div>
  );
};

export const FileUploadAllTypes = () => {
  const [selectedDocs, setSelectedDocs] = useState<File[]>([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <strong>Upload Any File</strong>
        <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
          Supports: PDF, DOCX, DOC, TXT, MD, RTF, CSV, JPG, PNG, GIF, BMP, WebP, TIFF, HTML
        </div>
        <input
          type="file"
          accept=".pdf,.docx,.doc,.txt,.md,.rtf,.csv,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff,.tif,.html,.htm,.xlsx,.xls,.pptx,.ppt"
          multiple
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
              : [{ uri: pdfFile, fileName: "default.pdf" }]
          }
          pluginRenderers={DocViewerRenderers}
          config={{
            pdfVerticalScrollByDefault: true,
            csvDelimiter: ",",
          }}
        />
      </div>
    </div>
  );
};
