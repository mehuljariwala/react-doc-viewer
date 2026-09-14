import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWorkbook, xlsxFileLoader } from "./loader";
import { MAX_FILE_BYTES } from "./workbook";

afterEach(() => {
  vi.restoreAllMocks();
});
describe("XLSX loader", () => {
  it("preserves authentication and cancellation while loading bytes", async () => {
    const buffer = new ArrayBuffer(4);
    const fetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      headers: new Headers(),
      arrayBuffer: async () => buffer,
    } as Response);
    const signal = new AbortController().signal;
    expect(
      await fetchWorkbook("private.xlsx", signal, {
        Authorization: "Bearer example",
      }),
    ).toBe(buffer);
    expect(fetch).toHaveBeenCalledWith("private.xlsx", {
      signal,
      headers: { Authorization: "Bearer example" },
    });
  });
  it("rejects HTTP errors and excessive declared sizes", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({ ok: false, status: 403 } as Response)
      .mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ "content-length": String(MAX_FILE_BYTES + 1) }),
      } as Response);
    const signal = new AbortController().signal;
    await expect(fetchWorkbook("private.xlsx", signal)).rejects.toThrow("403");
    await expect(fetchWorkbook("large.xlsx", signal)).rejects.toThrow("5 MiB");
  });
  it("cancels streams exceeding the limit even with an inaccurate Content-Length", async () => {
    const cancel = vi.fn();
    const releaseLock = vi.fn();
    const read = vi.fn().mockResolvedValue({
      done: false,
      value: new Uint8Array(MAX_FILE_BYTES + 1),
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-length": "1" }),
      body: { getReader: () => ({ read, cancel, releaseLock }) },
    } as unknown as Response);
    await expect(
      fetchWorkbook("large.xlsx", new AbortController().signal),
    ).rejects.toThrow("5 MiB");
    expect(cancel).toHaveBeenCalledOnce();
    expect(releaseLock).toHaveBeenCalledOnce();
  });
  it("does not complete a loader for an aborted document", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new DOMException("Aborted", "AbortError"),
    );
    const controller = new AbortController();
    controller.abort();
    const complete = vi.fn();
    xlsxFileLoader({
      documentURI: "old.xlsx",
      signal: controller.signal,
      fileLoaderComplete: complete,
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(complete).not.toHaveBeenCalled();
  });
});
