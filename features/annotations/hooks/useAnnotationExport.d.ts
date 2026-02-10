import { IAnnotation } from '../types';

export declare const useAnnotationExport: () => {
    exportAnnotations: () => IAnnotation[];
    exportAsJSON: () => string;
    downloadAnnotations: (filename?: string) => void;
    getAnnotationsForPage: (pageNumber: number, documentUri: string) => IAnnotation[];
    annotationCount: number;
};
