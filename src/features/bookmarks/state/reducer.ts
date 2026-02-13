import { IBookmarksState, BookmarksAction } from "../types";

export const initialBookmarksState: IBookmarksState = {
  outline: [],
  isOpen: false,
  isLoading: false,
};

export function bookmarksReducer(
  state: IBookmarksState,
  action: BookmarksAction,
): IBookmarksState {
  switch (action.type) {
    case "SET_OUTLINE":
      return { ...state, outline: action.value };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.value };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.value };
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}
