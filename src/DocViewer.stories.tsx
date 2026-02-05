import React, { useRef, useState } from "react";
import DocViewer from "./DocViewer";
import { DocViewerRenderers } from "./renderers";

import pdfFile from "./exampleFiles/pdf-file.pdf";
import pdfMultiplePagesFile from "./exampleFiles/pdf-multiple-pages-file.pdf";
import pngFile from "./exampleFiles/png-image.png?url";
import csvFile from "./exampleFiles/csv-file.csv?url";
import epsFile from "./exampleFiles/eps-file.eps?url";
import webpFile from "./exampleFiles/webp-file.webp?url";

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
