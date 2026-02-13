export interface OutlineItem {
  title: string;
  pageIndex: number;
  items: OutlineItem[];
}

export interface IBookmarksState {
  outline: OutlineItem[];
  isOpen: boolean;
  isLoading: boolean;
}

export type BookmarksAction =
  | { type: "SET_OUTLINE"; value: OutlineItem[] }
  | { type: "SET_IS_OPEN"; value: boolean }
  | { type: "SET_IS_LOADING"; value: boolean }
  | { type: "TOGGLE_OPEN" };
