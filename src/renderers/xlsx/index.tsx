import { useEffect, useRef, useState } from "react";
import type { Sheet, CellValue } from "read-excel-file/browser";
import type { DocRenderer } from "../../models";
import { MAX_COLUMNS, MAX_ROWS, parseWorkbook } from "./workbook";
import { xlsxFileLoader } from "./loader";
import "./xlsx.css";

type Preview = {
  source: unknown;
  uri: string;
  sheets?: Sheet[];
  error?: string;
};
function formatCell(cell: CellValue | null | undefined) {
  if (cell instanceof Date && !Number.isFinite(cell.getTime()))
    return "Invalid date";
  if (cell instanceof Date)
    return cell.toISOString().replace(/T00:00:00.000Z$/, "");
  return cell == null ? "" : String(cell);
}
function columnName(index: number): string {
  let name = "";
  for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26))
    name = String.fromCharCode(65 + ((n - 1) % 26)) + name;
  return name;
}

const XLSXRenderer: DocRenderer = ({
  mainState: { currentDocument, documentLoading, requestHeaders },
}) => {
  const data = currentDocument?.fileData;
  const uri = currentDocument?.uri ?? "";
  const [preview, setPreview] = useState<Preview>();
  const [selected, setSelected] = useState(0);
  const [downloadError, setDownloadError] = useState(false);
  const downloadController = useRef<AbortController>();
  useEffect(() => {
    let active = true;
    setSelected(0);
    setDownloadError(false);
    if (data instanceof ArrayBuffer) {
      void parseWorkbook(data).then(
        (sheets) => {
          if (active) setPreview({ source: data, uri, sheets });
        },
        (error) => {
          if (active)
            setPreview({
              source: data,
              uri,
              error:
                error instanceof Error ? error.message : "Invalid workbook.",
            });
        },
      );
    }
    return () => {
      active = false;
      downloadController.current?.abort();
    };
  }, [data, uri]);

  if (!currentDocument) return null;
  const current =
    preview && preview.source === data && preview.uri === uri
      ? preview
      : undefined;
  const sheets = current?.sheets;
  const sheet = sheets?.[selected];
  const rows = sheet?.data.slice(0, MAX_ROWS) ?? [];
  const columnCount = Math.min(
    MAX_COLUMNS,
    Math.max(0, ...rows.map((row) => row.length)),
  );
  const truncated =
    !!sheet &&
    (sheet.data.length > MAX_ROWS ||
      sheet.data.some((row) => row.length > MAX_COLUMNS));
  const error = typeof data === "string" ? data : current?.error;
  const failedLoad = !data && !documentLoading;
  const download = async () => {
    downloadController.current?.abort();
    const controller = new AbortController();
    downloadController.current = controller;
    setDownloadError(false);
    try {
      let blob: Blob;
      if (data instanceof ArrayBuffer)
        blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      else {
        const response = await fetch(uri, {
          headers: requestHeaders,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Download failed");
        blob = await response.blob();
      }
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = currentDocument.fileName || "workbook.xlsx";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      if (!controller.signal.aborted) setDownloadError(true);
    }
  };
  return (
    <div className="rdv-xlsx" id="xlsx-renderer">
      <div className="rdv-xlsx-toolbar">
        {sheets && sheets.length > 0 && (
          <label>
            Worksheet{" "}
            <select
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
            >
              {sheets.map((item, index) => (
                <option key={index} value={index}>
                  {item.sheet}
                </option>
              ))}
            </select>
          </label>
        )}
        <button type="button" onClick={() => void download()}>
          Download workbook
        </button>
      </div>
      {downloadError && (
        <p role="alert">Unable to download workbook. Please try again.</p>
      )}
      {failedLoad ? (
        <p role="alert">Unable to load workbook.</p>
      ) : error ? (
        <p role="alert">Unable to preview workbook. {error}</p>
      ) : !sheets ? (
        <p role="status">Loading workbook…</p>
      ) : (
        <>
          <p className="rdv-xlsx-note">
            Read-only values preview. Formatting, charts and images are omitted.
            Formulas show saved values only and are not calculated.
          </p>
          {truncated && (
            <p role="status">
              Preview limited to the first {MAX_ROWS} rows and {MAX_COLUMNS}{" "}
              columns. Download the workbook to see all data.
            </p>
          )}
          {!sheets.length ? (
            <p>This workbook has no worksheets.</p>
          ) : !rows.length || !columnCount ? (
            <p>This worksheet is empty.</p>
          ) : (
            <div
              className="rdv-xlsx-scroll"
              role="region"
              aria-label={`${sheet?.sheet} worksheet`}
              tabIndex={0}
            >
              <table>
                <caption>{sheet?.sheet}</caption>
                <thead>
                  <tr>
                    <th scope="col">Row</th>
                    {Array.from({ length: columnCount }, (_, index) => (
                      <th scope="col" key={index}>
                        {columnName(index)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <th scope="row">{rowIndex + 1}</th>
                      {Array.from({ length: columnCount }, (_, columnIndex) => (
                        <td key={columnIndex}>
                          {formatCell(row[columnIndex])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
XLSXRenderer.fileTypes = [
  "xlsx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
XLSXRenderer.weight = 1;
XLSXRenderer.fileLoader = xlsxFileLoader;
export default XLSXRenderer;
