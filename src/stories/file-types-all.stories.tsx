import DocViewer from "../DocViewer";
import { DocViewerRenderers } from "../renderers";

import pdfFile from "../exampleFiles/pdf-file.pdf";
import docxFile from "../exampleFiles/docx-file.docx";
import txtFile from "../exampleFiles/txt-file.txt?url";
import mdFile from "../exampleFiles/md-file.md?url";
import rtfFile from "../exampleFiles/rtf-file.rtf";
import csvFile from "../exampleFiles/csv-file.csv?url";
import jpgFile from "../exampleFiles/jpg-image.jpg?url";
import pngFile from "../exampleFiles/png-image.png?url";
import gifFile from "../exampleFiles/gif-image.gif?url";
import bmpFile from "../exampleFiles/bmp-image.bmp?url";
import webpFile from "../exampleFiles/webp-file.webp?url";

import { IDocument } from "..";

export default {
  title: "DocViewer/File Types/All",
};

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
