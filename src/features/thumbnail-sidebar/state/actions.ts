export const SET_SIDEBAR_OPEN = "SET_SIDEBAR_OPEN";
export const SET_THUMBNAILS = "SET_THUMBNAILS";
export const SET_SELECTED_PAGE = "SET_SELECTED_PAGE";
export const UPDATE_SINGLE_THUMBNAIL = "UPDATE_SINGLE_THUMBNAIL";

export interface SetSidebarOpen {
  type: typeof SET_SIDEBAR_OPEN;
  isOpen: boolean;
}

export const setSidebarOpen = (isOpen: boolean): SetSidebarOpen => ({
  type: SET_SIDEBAR_OPEN,
  isOpen,
});

export interface IThumbnail {
  pageNumber: number;
  dataUrl?: string;
  isLoading: boolean;
}

export interface SetThumbnails {
  type: typeof SET_THUMBNAILS;
  thumbnails: IThumbnail[];
}

export const setThumbnails = (thumbnails: IThumbnail[]): SetThumbnails => ({
  type: SET_THUMBNAILS,
  thumbnails,
});

export interface SetSelectedPage {
  type: typeof SET_SELECTED_PAGE;
  pageNumber: number;
}

export const setSelectedPage = (pageNumber: number): SetSelectedPage => ({
  type: SET_SELECTED_PAGE,
  pageNumber,
});

export interface UpdateSingleThumbnail {
  type: typeof UPDATE_SINGLE_THUMBNAIL;
  pageNumber: number;
  dataUrl: string;
}

export const updateSingleThumbnail = (
  pageNumber: number,
  dataUrl: string
): UpdateSingleThumbnail => ({
  type: UPDATE_SINGLE_THUMBNAIL,
  pageNumber,
  dataUrl,
});

export type ThumbnailActions =
  | SetSidebarOpen
  | SetThumbnails
  | SetSelectedPage
  | UpdateSingleThumbnail;
