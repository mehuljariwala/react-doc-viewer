import React, { useEffect, useState } from "react";
import papaparse from "papaparse";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

const CSVRenderer: DocRenderer = ({
  mainState: { currentDocument, config },
}) => {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    if (currentDocument?.fileData) {
      const parseResult = papaparse.parse(currentDocument.fileData as string, {
        delimiter: config?.csvDelimiter ?? ",",
      });

      if (!parseResult.errors?.length && parseResult.data) {
        setRows(parseResult.data as string[][]);
      }
    }
  }, [currentDocument, config?.csvDelimiter]);

  if (!rows.length) {
    return null;
  }

  return (
    <div className="rdv-csv-container">
      <table className="rdv-csv-table">
        <thead>
          <tr>
            {rows[0].map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1, rows.length).map((row) => (
            <tr key={row.join("")}>
              {row.map((column) => (
                <td key={column}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVRenderer;

CSVRenderer.fileTypes = ["csv", "text/csv"];
CSVRenderer.weight = 0;
CSVRenderer.fileLoader = textFileLoader;
