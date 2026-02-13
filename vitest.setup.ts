/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// Polyfill Promise.withResolvers for pdfjs-dist in test environment (Node <22)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const P = Promise as any;
if (typeof P.withResolvers !== "function") {
  P.withResolvers = function <T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
