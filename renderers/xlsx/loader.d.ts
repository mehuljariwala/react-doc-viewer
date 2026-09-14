import { FileLoaderFunction } from '../../utils/fileLoaders';

/** Enforce the transfer limit even when Content-Length is missing or inaccurate. */
export declare function fetchWorkbook(uri: string, signal: AbortSignal, headers?: Record<string, string>): Promise<ArrayBuffer>;
export declare const xlsxFileLoader: FileLoaderFunction;
