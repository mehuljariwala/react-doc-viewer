import type { Sheet } from "read-excel-file/browser";

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_EXPANDED_BYTES = 20 * 1024 * 1024;
export const MAX_ROWS = 500;
export const MAX_COLUMNS = 50;
export const MAX_SHEETS = 100;
const MAX_GRID_CELLS = 250_000;

/** Limit archive expansion and sparse grids before the parser builds dense arrays. */
export async function parseWorkbook(input: ArrayBuffer): Promise<Sheet[]> {
  if (input.byteLength > MAX_FILE_BYTES) {
    throw new Error("Workbook exceeds the 5 MiB preview limit.");
  }
  const { Unzip, UnzipInflate, strFromU8, zipSync } = await import("fflate");
  let expandedBytes = 0;
  let entries = 0;
  let unfinishedEntries = 0;
  const files: Record<string, Uint8Array> = Object.create(null);
  const unzip = new Unzip((entry) => {
    if (++entries > 1000 || (entry.originalSize ?? 0) > MAX_EXPANDED_BYTES) {
      throw new Error(
        "Workbook exceeds the expanded archive preview limit (20 MiB or 1,000 entries).",
      );
    }
    unfinishedEntries++;
    const chunks: Uint8Array[] = [];
    let size = 0;
    entry.ondata = (error, chunk, final) => {
      if (error) throw error;
      expandedBytes += chunk.byteLength;
      size += chunk.byteLength;
      if (expandedBytes > MAX_EXPANDED_BYTES) {
        entry.terminate();
        throw new Error(
          "Workbook exceeds the 20 MiB expanded archive preview limit.",
        );
      }
      if (/\.(xml|rels)$/i.test(entry.name)) chunks.push(chunk);
      if (final) {
        unfinishedEntries--;
        if (/\.(xml|rels)$/i.test(entry.name)) {
          if (files[entry.name])
            throw new Error("Duplicate workbook archive entry.");
          const bytes = new Uint8Array(size);
          let offset = 0;
          for (const part of chunks) {
            bytes.set(part, offset);
            offset += part.byteLength;
          }
          files[entry.name] = bytes;
        }
      }
    };
    entry.start();
  });
  unzip.register(UnzipInflate);
  const compressed = new Uint8Array(input);
  // Small compressed chunks bound each inflation step, including dishonest ZIP size metadata.
  for (let offset = 0; offset < compressed.length; offset += 1024) {
    unzip.push(
      compressed.subarray(offset, offset + 1024),
      offset + 1024 >= compressed.length,
    );
  }
  if (!entries || unfinishedEntries)
    throw new Error("Invalid workbook archive.");
  let gridCells = 0;
  let emptyWorkbook = false;
  for (const [name, bytes] of Object.entries(files)) {
    const xml = strFromU8(bytes);
    if (/<!DOCTYPE/i.test(xml)) throw new Error("Unsupported workbook XML.");
    const document = new DOMParser().parseFromString(xml, "application/xml");
    const elements = Array.from(document.getElementsByTagName("*"));
    if (
      !document.documentElement ||
      elements.some((element) => element.localName === "parsererror")
    ) {
      throw new Error("Invalid workbook XML.");
    }
    const sheetCount = elements.filter(
      (element) => element.localName === "sheet",
    ).length;
    if (sheetCount > MAX_SHEETS)
      throw new Error("Workbook exceeds the 100-worksheet preview limit.");
    if (
      name === "xl/workbook.xml" &&
      document.documentElement.localName === "workbook" &&
      sheetCount === 0
    )
      emptyWorkbook = true;
    // The downstream SAX parser accepts row/c elements under arbitrary roots.
    // Validate coordinates in every retained XML entry, including relationships.
    if (
      elements
        .filter(
          (element) => element.localName === "row" || element.localName === "c",
        )
        .some((element) =>
          Array.from(element.attributes).some(
            (attribute) =>
              attribute.localName === "r" &&
              attribute.prefix !== null &&
              attribute.namespaceURI !== "http://www.w3.org/2000/xmlns/",
          ),
        )
    )
      throw new Error("Unsupported namespaced workbook attribute.");
    let rows = 0;
    let columns = 0;
    for (const cell of elements.filter(
      (element) => element.localName === "c",
    )) {
      const address = /^([A-Z]+)([1-9]\d*)$/.exec(cell.getAttribute("r") ?? "");
      if (!address) throw new Error("Unsupported worksheet cell address.");
      let column = 0;
      for (const letter of address[1])
        column = column * 26 + letter.charCodeAt(0) - 64;
      rows = Math.max(rows, Number(address[2]));
      columns = Math.max(columns, column);
      if (rows * columns > MAX_GRID_CELLS) {
        throw new Error(
          "Workbook exceeds the 250,000-cell grid preview limit.",
        );
      }
    }
    // Row numbers also cause allocation in sparse worksheets.
    for (const row of elements.filter(
      (element) => element.localName === "row",
    )) {
      rows = Math.max(rows, Number(row.getAttribute("r")) || 0);
    }
    gridCells += rows * Math.max(columns, 1);
    if (gridCells > MAX_GRID_CELLS)
      throw new Error("Workbook exceeds the 250,000-cell grid preview limit.");
  }
  if (emptyWorkbook) return [];
  const { default: readXlsxFile } = await import("read-excel-file/browser");
  // Repack validated entries: the parser must not re-read unvalidated central-directory targets.
  const normalized = zipSync(files, { level: 0 });
  const sheets = await readXlsxFile(normalized.buffer as ArrayBuffer, {
    trim: false,
  });
  if (sheets.length > MAX_SHEETS)
    throw new Error("Workbook exceeds the 100-worksheet preview limit.");
  return sheets;
}
