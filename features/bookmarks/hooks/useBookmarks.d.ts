import { pdfjs } from 'react-pdf';

export declare function useBookmarks(pdfDocument: pdfjs.PDFDocumentProxy | null): {
    state: import('../types').IBookmarksState;
    dispatch: import('../../../../node_modules/react').Dispatch<import('../types').BookmarksAction>;
    navigateToBookmark: (pageIndex: number) => number;
};
