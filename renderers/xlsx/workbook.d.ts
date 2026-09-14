import { Sheet } from 'read-excel-file/browser';

export declare const MAX_FILE_BYTES: number;
export declare const MAX_EXPANDED_BYTES: number;
export declare const MAX_ROWS = 500;
export declare const MAX_COLUMNS = 50;
export declare const MAX_SHEETS = 100;
/** Limit archive expansion and sparse grids before the parser builds dense arrays. */
export declare function parseWorkbook(input: ArrayBuffer): Promise<Sheet[]>;
