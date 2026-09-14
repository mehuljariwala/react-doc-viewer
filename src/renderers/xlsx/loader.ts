import type { FileLoaderFunction } from "../../utils/fileLoaders";
import { MAX_FILE_BYTES } from "./workbook";

/** Enforce the transfer limit even when Content-Length is missing or inaccurate. */
export async function fetchWorkbook(
  uri: string,
  signal: AbortSignal,
  headers?: Record<string, string>,
): Promise<ArrayBuffer> {
  const response = await fetch(uri, { signal, headers });
  if (!response.ok)
    throw new Error(`Workbook request failed (${response.status}).`);
  if (Number(response.headers.get("content-length")) > MAX_FILE_BYTES) {
    await response.body?.cancel();
    throw new Error("Workbook exceeds the 5 MiB preview limit.");
  }
  const reader = response.body?.getReader();
  if (!reader) {
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > MAX_FILE_BYTES)
      throw new Error("Workbook exceeds the 5 MiB preview limit.");
    return bytes;
  }
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_FILE_BYTES) {
        await reader.cancel();
        throw new Error("Workbook exceeds the 5 MiB preview limit.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const data = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    data.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return data.buffer;
}

// Loader API accepts FileReader.result; error text is passed as a string to the renderer.
export const xlsxFileLoader: FileLoaderFunction = ({
  documentURI,
  signal,
  headers,
  fileLoaderComplete,
}) => {
  void fetchWorkbook(documentURI, signal, headers).then(
    (data) => {
      if (signal.aborted) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!signal.aborted) fileLoaderComplete(reader);
      };
      reader.readAsArrayBuffer(new Blob([data]));
    },
    (error) => {
      if (signal.aborted) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!signal.aborted) fileLoaderComplete(reader);
      };
      reader.readAsText(
        new Blob([
          error instanceof Error ? error.message : "Unable to load workbook.",
        ]),
      );
    },
  );
};
