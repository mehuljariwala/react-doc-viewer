import { IServerConversionConfig } from '../models';

export declare const DEFAULT_CONVERTIBLE_TYPES: string[];
export declare function isConversionEnabled(config: IServerConversionConfig | undefined): boolean;
export declare function convertDocumentToPdf(uri: string, fileName: string, signal: AbortSignal, config: IServerConversionConfig, requestHeaders?: Record<string, string>): Promise<ArrayBuffer>;
