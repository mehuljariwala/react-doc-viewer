import { IDocument } from '../../../models';
import { IDragDropConfig } from '../types';

export declare const useFileProcessor: (config?: IDragDropConfig) => {
    processFiles: (files: File[]) => Promise<IDocument[]>;
    validateFiles: (files: File[]) => {
        valid: File[];
        invalidType: File[];
        invalidSize: File[];
    };
    isFileTypeAccepted: (file: File) => boolean;
    isFileSizeValid: (file: File) => boolean;
};
