import { FC } from '../../../../node_modules/react';
import { pdfjs } from 'react-pdf';

interface Props {
    pdfDocument: pdfjs.PDFDocumentProxy | null;
}
export declare const SearchBar: FC<Props>;
export {};
