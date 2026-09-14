import { DocViewerRenderers } from "../renderers";
import DocViewer from "../DocViewer";

import xlsxFile from "../exampleFiles/sample-workbook.xlsx?url";
import csvFile from "../exampleFiles/csv-file.csv?url";

export default {
  title: "DocViewer/File Types/Data",
};

export const CSV = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: csvFile, fileName: "data.csv" }]}
      pluginRenderers={DocViewerRenderers}
      config={{ csvDelimiter: "," }}
    />
  </div>
);

export const XLSX = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[
        { uri: xlsxFile, fileName: "sample-workbook.xlsx", fileType: "xlsx" },
      ]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);
