export declare const SET_SIDEBAR_OPEN = "SET_SIDEBAR_OPEN";
export declare const SET_THUMBNAILS = "SET_THUMBNAILS";
export declare const SET_SELECTED_PAGE = "SET_SELECTED_PAGE";
export declare const UPDATE_SINGLE_THUMBNAIL = "UPDATE_SINGLE_THUMBNAIL";
export interface SetSidebarOpen {
    type: typeof SET_SIDEBAR_OPEN;
    isOpen: boolean;
}
export declare const setSidebarOpen: (isOpen: boolean) => SetSidebarOpen;
export interface IThumbnail {
    pageNumber: number;
    dataUrl?: string;
    isLoading: boolean;
}
export interface SetThumbnails {
    type: typeof SET_THUMBNAILS;
    thumbnails: IThumbnail[];
}
export declare const setThumbnails: (thumbnails: IThumbnail[]) => SetThumbnails;
export interface SetSelectedPage {
    type: typeof SET_SELECTED_PAGE;
    pageNumber: number;
}
export declare const setSelectedPage: (pageNumber: number) => SetSelectedPage;
export interface UpdateSingleThumbnail {
    type: typeof UPDATE_SINGLE_THUMBNAIL;
    pageNumber: number;
    dataUrl: string;
}
export declare const updateSingleThumbnail: (pageNumber: number, dataUrl: string) => UpdateSingleThumbnail;
export type ThumbnailActions = SetSidebarOpen | SetThumbnails | SetSelectedPage | UpdateSingleThumbnail;
