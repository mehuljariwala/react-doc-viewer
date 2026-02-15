import { IMainState } from '../../../store/mainStateReducer';

export declare const SET_ZOOM_LEVEL: string;
export interface SetZoomLevel {
    type: typeof SET_ZOOM_LEVEL;
    value: number;
}
export declare const setZoomLevel: (value: number) => SetZoomLevel;
export declare const SET_PDF_PAGINATED: string;
export interface SetPDFPaginated {
    type: typeof SET_PDF_PAGINATED;
    value: boolean;
}
export declare const setPDFPaginated: (value: boolean) => SetPDFPaginated;
export declare const SET_NUM_PAGES: string;
export interface SetNumPages {
    type: typeof SET_NUM_PAGES;
    value: number;
}
export declare const setNumPages: (value: number) => SetNumPages;
export declare const SET_CURRENT_PAGE: string;
export interface SetCurrentPage {
    type: typeof SET_CURRENT_PAGE;
    value: number;
}
export declare const SET_CURRENT_MAIN_STATE: string;
export interface SetCurrentMainState {
    type: typeof SET_CURRENT_MAIN_STATE;
    value: IMainState;
}
export declare const setCurrentPage: (value: number) => SetCurrentPage;
export declare const SET_LOADING_PROGRESS: string;
export interface SetLoadingProgress {
    type: typeof SET_LOADING_PROGRESS;
    value: number;
}
export declare const setLoadingProgress: (value: number) => SetLoadingProgress;
export declare const SET_PASSWORD_REQUIRED: string;
export interface SetPasswordRequired {
    type: typeof SET_PASSWORD_REQUIRED;
    value: boolean;
}
export declare const setPasswordRequired: (value: boolean) => SetPasswordRequired;
export declare const SET_PASSWORD_CALLBACK: string;
export interface SetPasswordCallback {
    type: typeof SET_PASSWORD_CALLBACK;
    value: ((password: string) => void) | null;
}
export declare const setPasswordCallback: (value: ((password: string) => void) | null) => SetPasswordCallback;
export declare const SET_PDF_DOCUMENT: string;
export interface SetPDFDocument {
    type: typeof SET_PDF_DOCUMENT;
    value: unknown;
}
export declare const setPDFDocument: (value: unknown) => SetPDFDocument;
export type PDFActions = SetZoomLevel | SetPDFPaginated | SetNumPages | SetCurrentPage | SetCurrentMainState | SetLoadingProgress | SetPasswordRequired | SetPasswordCallback | SetPDFDocument;
