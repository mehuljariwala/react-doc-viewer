import { createContext, Dispatch } from "react";
import { IBookmarksState, BookmarksAction } from "../types";
import { initialBookmarksState } from "./reducer";

export interface IBookmarksContext {
  state: IBookmarksState;
  dispatch: Dispatch<BookmarksAction>;
}

export const BookmarksContext = createContext<IBookmarksContext>({
  state: initialBookmarksState,
  dispatch: () => {},
});
