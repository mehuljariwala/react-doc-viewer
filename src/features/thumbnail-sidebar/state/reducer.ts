import {
  ThumbnailActions,
  IThumbnail,
  SET_SIDEBAR_OPEN,
  SET_THUMBNAILS,
  SET_SELECTED_PAGE,
  UPDATE_SINGLE_THUMBNAIL,
  SetSidebarOpen,
  SetThumbnails,
  SetSelectedPage,
  UpdateSingleThumbnail,
} from "./actions";

export interface IThumbnailState {
  isOpen: boolean;
  thumbnails: IThumbnail[];
  selectedPage: number;
  thumbnailWidth: number;
}

export const initialThumbnailState: IThumbnailState = {
  isOpen: false,
  thumbnails: [],
  selectedPage: 1,
  thumbnailWidth: 120,
};

export type ThumbnailStateReducer = (
  state: IThumbnailState,
  action: ThumbnailActions
) => IThumbnailState;

export const thumbnailReducer: ThumbnailStateReducer = (
  state = initialThumbnailState,
  action: ThumbnailActions
): IThumbnailState => {
  switch (action.type) {
    case SET_SIDEBAR_OPEN: {
      const { isOpen } = action as SetSidebarOpen;
      return { ...state, isOpen };
    }

    case SET_THUMBNAILS: {
      const { thumbnails } = action as SetThumbnails;
      return { ...state, thumbnails };
    }

    case SET_SELECTED_PAGE: {
      const { pageNumber } = action as SetSelectedPage;
      return { ...state, selectedPage: pageNumber };
    }

    case UPDATE_SINGLE_THUMBNAIL: {
      const { pageNumber, dataUrl } = action as UpdateSingleThumbnail;
      return {
        ...state,
        thumbnails: state.thumbnails.map((thumb) =>
          thumb.pageNumber === pageNumber
            ? { ...thumb, dataUrl, isLoading: false }
            : thumb
        ),
      };
    }

    default:
      return state;
  }
};
