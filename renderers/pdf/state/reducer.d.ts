import { IMainState } from '../../../store/mainStateReducer';
import { PDFActions as PDFStateActions } from './actions';

export type IPDFState = {
    defaultZoomLevel: number;
    zoomLevel: number;
    zoomJump: number;
    paginated: boolean;
    numPages: number;
    currentPage: number;
    mainState?: IMainState;
    loadingProgress: number;
    passwordRequired: boolean;
    passwordCallback: ((password: string) => void) | null;
    pdfDocument: unknown;
};
export declare const initialPDFState: IPDFState;
export type PDFStateReducer = (state: IPDFState, action: PDFStateActions) => IPDFState;
export declare const reducer: PDFStateReducer;
