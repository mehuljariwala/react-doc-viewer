import { createContext, Dispatch } from "react";
import { ISearchState, SearchAction } from "../types";
import { initialSearchState } from "./reducer";

export interface ISearchContext {
  state: ISearchState;
  dispatch: Dispatch<SearchAction>;
}

export const SearchContext = createContext<ISearchContext>({
  state: initialSearchState,
  dispatch: () => {},
});
