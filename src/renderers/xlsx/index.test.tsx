// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { zipSync, unzipSync, strToU8 } from "fflate";
import * as workbook from "./workbook";
import XLSXRenderer from "./index";
import { parseWorkbook, MAX_FILE_BYTES } from "./workbook";
import type { IMainState } from "../../store/mainStateReducer";

const fixture = () => {
  const bytes = readFileSync("src/exampleFiles/sample-workbook.xlsx");
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
};
const state = (data?: ArrayBuffer, uri = "sample.xlsx"): IMainState => ({
  currentFileNo: 0,
  documents: [],
  language: "en",
  documentLoading: false,
  currentDocument: { uri, fileData: data },
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("XLSX preview", () => {
  it("parses a real workbook with multiple sheets and literal cell text", async () => {
    const sheets = await parseWorkbook(fixture());
    expect(sheets.map((s) => s.sheet)).toEqual(["Sales", "Notes", "Empty"]);
    expect(sheets[0].data[2]).toEqual(["<img src=x onerror=alert(1)>", true]);
  });
  it("shows cached formula values without evaluating expressions", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1"><c r="A1"><f>1+1</f><v>2</v></c></row></sheetData></worksheet>',
    );
    const parsed = await parseWorkbook(zipSync(files).buffer as ArrayBuffer);
    expect(parsed[0].data[0][0]).toBe(2);
  });
  it("renders invalid workbook dates without crashing the host", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/styles.xml"] = strToU8(
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cellXfs count="2"><xf numFmtId="0"/><xf numFmtId="14"/></cellXfs></styleSheet>',
    );
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1"><c r="A1" s="1"><v>1e308</v></c></row></sheetData></worksheet>',
    );
    const bytes = zipSync(files);
    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);
    render(<XLSXRenderer mainState={state(buffer)} />);
    expect(await screen.findByText("Invalid date")).toBeInTheDocument();
  });
  it("rejects sparse cell coordinates before dense array allocation", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row r="1"><c r="A999999999"><v>2</v></c></row></sheetData></worksheet>',
    );
    await expect(
      parseWorkbook(zipSync(files).buffer as ArrayBuffer),
    ).rejects.toThrow("250,000-cell");
  });
  it("rejects sparse cells in worksheets with hyphenated namespace prefixes", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<x-1:worksheet xmlns:x-1="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><x-1:sheetData><x-1:row r="1"><x-1:c r="A250001"><x-1:v>2</x-1:v></x-1:c></x-1:row></x-1:sheetData></x-1:worksheet>',
    );
    await expect(
      parseWorkbook(zipSync(files).buffer as ArrayBuffer),
    ).rejects.toThrow("250,000-cell");
  });
  it("rejects namespaced row and cell coordinates that shadow validated addresses", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:x="urn:x"><sheetData><row r="1" x:r="250001"><c r="A1" x:r="A250001"><v>2</v></c></row></sheetData></worksheet>',
    );
    await expect(
      parseWorkbook(zipSync(files).buffer as ArrayBuffer),
    ).rejects.toThrow("Unsupported namespaced workbook attribute");
  });
  it("validates worksheet coordinates under unsupported wrapper roots", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      '<wrapper><sheetData><row r="250001"><c r="A250001"><v>2</v></c></row></sheetData></wrapper>',
    );
    const result = await parseWorkbook(
      zipSync(files).buffer as ArrayBuffer,
    ).then(
      () => "parsed",
      (error) => error.message,
    );
    expect(result).toContain("250,000-cell");
  });
  it("limits sheet declarations independently of the workbook root", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/workbook.xml"] = strToU8(
      '<wrapper xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' +
        Array.from(
          { length: 101 },
          (_, index) =>
            '<sheet name="Sheet' +
            index +
            '" sheetId="' +
            (index + 1) +
            '" r:id="rId1"/>',
        ).join("") +
        "</sheets></wrapper>",
    );
    const result = await parseWorkbook(
      zipSync(files).buffer as ArrayBuffer,
    ).then(
      () => "parsed",
      (error) => error.message,
    );
    expect(result).toContain("100-worksheet");
  });
  it("rejects malformed XML before parsing worksheet values", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/worksheets/sheet1.xml"] = strToU8(
      "<worksheet><sheetData></worksheet>",
    );
    await expect(
      parseWorkbook(zipSync(files).buffer as ArrayBuffer),
    ).rejects.toThrow("Invalid workbook XML");
  });
  it("rejects oversized expansion before worksheet parsing", async () => {
    const bytes = zipSync({ "large.xml": new Uint8Array(21 * 1024 * 1024) });
    await expect(parseWorkbook(bytes.buffer as ArrayBuffer)).rejects.toThrow(
      "20 MiB",
    );
  });
  it("checks actual expanded bytes when ZIP metadata understates the size", async () => {
    const bytes = zipSync({ "large.xml": new Uint8Array(21 * 1024 * 1024) });
    // Lie in the local header; streaming output must still enforce the limit.
    new DataView(bytes.buffer).setUint32(22, 1, true);
    await expect(parseWorkbook(bytes.buffer as ArrayBuffer)).rejects.toThrow(
      "20 MiB",
    );
  });
  it("handles a real workbook with no sheets", async () => {
    const files = unzipSync(new Uint8Array(fixture()));
    files["xl/workbook.xml"] = strToU8(
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheets/></workbook>',
    );
    const data = zipSync(files).buffer as ArrayBuffer;
    expect(await parseWorkbook(data)).toEqual([]);
    render(<XLSXRenderer mainState={state(data)} />);
    expect(
      await screen.findByText("This workbook has no worksheets."),
    ).toBeInTheDocument();
  });
  it("ignores a stale parse after switching documents", async () => {
    let resolveOld!: (
      sheets: Awaited<ReturnType<typeof parseWorkbook>>,
    ) => void;
    vi.spyOn(workbook, "parseWorkbook")
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveOld = resolve;
          }),
      )
      .mockResolvedValueOnce([{ sheet: "New", data: [["Newest document"]] }]);
    const { rerender } = render(
      <XLSXRenderer mainState={state(new ArrayBuffer(1), "old.xlsx")} />,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading workbook");
    rerender(
      <XLSXRenderer mainState={state(new ArrayBuffer(2), "new.xlsx")} />,
    );
    await screen.findByText("Newest document");
    resolveOld([{ sheet: "Old", data: [["Stale document"]] }]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByText("Stale document")).toBeNull();
    expect(screen.getByText("Newest document")).toBeInTheDocument();
  });
  it("discloses display truncation", async () => {
    vi.spyOn(workbook, "parseWorkbook").mockResolvedValueOnce([
      { sheet: "Large", data: Array.from({ length: 501 }, () => ["value"]) },
    ]);
    render(<XLSXRenderer mainState={state(new ArrayBuffer(1))} />);
    expect(
      await screen.findByText(
        /Preview limited to the first 500 rows and 50 columns/,
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("value")).toHaveLength(500);
  });
  it("rejects malformed and oversized input", async () => {
    await expect(parseWorkbook(new ArrayBuffer(8))).rejects.toThrow();
    await expect(
      parseWorkbook(new ArrayBuffer(MAX_FILE_BYTES + 1)),
    ).rejects.toThrow(/5 MiB/);
  });
  it("switches sheets, renders literal text safely and handles empty sheets", async () => {
    const { container } = render(<XLSXRenderer mainState={state(fixture())} />);
    expect(await screen.findByText("Tea")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
    fireEvent.change(screen.getByRole("combobox", { name: "Worksheet" }), {
      target: { value: "1" },
    });
    expect(screen.getByText("=SUM(A1:A2)")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
    expect(screen.getByText("This worksheet is empty.")).toBeInTheDocument();
  });
  it("clears old content when documents change and reports parse failures", async () => {
    const { rerender } = render(<XLSXRenderer mainState={state(fixture())} />);
    await screen.findByText("Tea");
    rerender(
      <XLSXRenderer mainState={state(new ArrayBuffer(8), "invalid.xlsx")} />,
    );
    expect(screen.queryByText("Tea")).toBeNull();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to preview",
    );
  });
  it("reports failed loads with a download fallback", () => {
    render(<XLSXRenderer mainState={state()} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Unable to load");
    expect(
      screen.getByRole("button", { name: "Download workbook" }),
    ).toBeInTheDocument();
  });
});
