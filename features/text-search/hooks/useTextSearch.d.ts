import { pdfjs } from 'react-pdf';

export declare function useTextSearch(): {
    state: import('../types').ISearchState;
    dispatch: import('../../../../node_modules/react').Dispatch<import('../types').SearchAction>;
    search: (query: string, pdfDocument: pdfjs.PDFDocumentProxy | null) => Promise<void>;
};
