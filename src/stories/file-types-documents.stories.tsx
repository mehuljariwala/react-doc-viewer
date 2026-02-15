import { DocViewerRenderers } from "../renderers";
import DocViewer from "../DocViewer";

import pdfFile from "../exampleFiles/pdf-file.pdf";
import pdfMultiplePagesFile from "../exampleFiles/pdf-multiple-pages-file.pdf";
import docxFile from "../exampleFiles/docx-file.docx";
import docxSinglePage from "../exampleFiles/docx-single-page.docx";
import docxMultiplePages from "../exampleFiles/docx-multiple-pages.docx";
import txtFile from "../exampleFiles/txt-file.txt?url";
import mdFile from "../exampleFiles/md-file.md?url";
import rtfFile from "../exampleFiles/rtf-file.rtf";
import lostWageDocx from "../exampleFiles/lost-wage-verification.docx";

export default {
  title: "DocViewer/File Types/Documents",
};

export const PDFSinglePage = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfFile, fileName: "single-page.pdf" }]}
      pluginRenderers={DocViewerRenderers}
      config={{ pdfVerticalScrollByDefault: true }}
    />
  </div>
);

export const PDFMultiPage = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile, fileName: "multi-page.pdf" }]}
      pluginRenderers={DocViewerRenderers}
      config={{ pdfVerticalScrollByDefault: true }}
    />
  </div>
);

export const DOCX = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: docxFile, fileName: "sample.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const DOCXSinglePage = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: docxSinglePage, fileName: "single-page.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const DOCXMultiPage = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: docxMultiplePages, fileName: "multi-page.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const DOCXLostWageVerification = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: lostWageDocx, fileName: "17_Lost_Wage_Verification.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const TXT = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: txtFile, fileName: "sample.txt", fileType: "text/plain" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const Markdown = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: mdFile, fileName: "README.md", fileType: "text/markdown" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const RTF = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: rtfFile, fileName: "sample.rtf", fileType: "application/rtf" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);
