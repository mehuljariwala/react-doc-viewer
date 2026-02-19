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
import pfWithdrawalForm from "../exampleFiles/pf-withdrawal-form19.docx";
import emsAmbulanceReport from "../exampleFiles/ems-ambulance-run-report.docx";

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

export const DOCXPFWithdrawalForm = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pfWithdrawalForm, fileName: "Form 19 - PF withdrawal Application.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const DOCXEMSAmbulanceReport = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: emsAmbulanceReport, fileName: "03_EMS_Ambulance_Run_Report.docx", fileType: "docx" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const DOCXMicrosoftViewer = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[
        {
          uri: "https://filesamples.com/samples/document/docx/sample3.docx",
          fileName: "sample-document.docx",
          fileType: "docx",
        },
      ]}
      pluginRenderers={DocViewerRenderers}
      config={{ docx: { useOfficeOnlineViewer: true } }}
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

export const PDFWithSelectionToolbar = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pdfMultiplePagesFile, fileName: "multi-page.pdf" }]}
      pluginRenderers={DocViewerRenderers}
      config={{
        pdfVerticalScrollByDefault: true,
        selectionToolbar: {
          actions: [
            {
              label: "Explain",
              onClick: (text: string, page: number) =>
                console.log("Explain:", { text, page }),
            },
            {
              label: "Summarize",
              onClick: (text: string, page: number) =>
                console.log("Summarize:", { text, page }),
            },
            {
              label: "Rewrite",
              onClick: (text: string, page: number) =>
                console.log("Rewrite:", { text, page }),
            },
          ],
        },
      }}
    />
  </div>
);

const serverConversionConfig = {
  serverConversion: {
    serviceUrl: "http://localhost:3000/forms/libreoffice/convert",
    onConversionStart: (doc: { fileName?: string }) =>
      console.log("Conversion started:", doc.fileName),
    onConversionComplete: (doc: { fileName?: string }) =>
      console.log("Conversion complete:", doc.fileName),
    onConversionError: (doc: { fileName?: string }, error: Error) =>
      console.error("Conversion failed:", doc.fileName, error),
  },
};

export const DOCXServerConversion = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[
        {
          uri: pfWithdrawalForm,
          fileName: "Form 19 - PF withdrawal Application.docx",
          fileType: "docx",
        },
      ]}
      pluginRenderers={DocViewerRenderers}
      config={serverConversionConfig}
    />
  </div>
);

export const DOCXEMSAmbulanceReportServerConversion = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[
        {
          uri: emsAmbulanceReport,
          fileName: "03_EMS_Ambulance_Run_Report.docx",
          fileType: "docx",
        },
      ]}
      pluginRenderers={DocViewerRenderers}
      config={serverConversionConfig}
    />
  </div>
);
