import { BookmarksAction, OutlineItem } from "../types";

export const setOutline = (value: OutlineItem[]): BookmarksAction => ({
  type: "SET_OUTLINE",
  value,
});

export const setBookmarksOpen = (value: boolean): BookmarksAction => ({
  type: "SET_IS_OPEN",
  value,
});

export const setBookmarksLoading = (value: boolean): BookmarksAction => ({
  type: "SET_IS_LOADING",
  value,
});

export const toggleBookmarksOpen = (): BookmarksAction => ({
  type: "TOGGLE_OPEN",
});
