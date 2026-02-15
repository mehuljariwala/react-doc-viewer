import { DocViewerRenderers } from "../renderers";
import DocViewer from "../DocViewer";

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
