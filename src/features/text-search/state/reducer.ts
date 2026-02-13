import { ISearchState, SearchAction } from "../types";

export const initialSearchState: ISearchState = {
  query: "",
  matches: [],
  currentMatchIndex: 0,
  isOpen: false,
  isSearching: false,
};

export function searchReducer(
  state: ISearchState,
  action: SearchAction,
): ISearchState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.value, currentMatchIndex: 0 };
    case "SET_MATCHES":
      return { ...state, matches: action.value, currentMatchIndex: 0 };
    case "SET_CURRENT_MATCH_INDEX":
      return { ...state, currentMatchIndex: action.value };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.value };
    case "SET_IS_SEARCHING":
      return { ...state, isSearching: action.value };
    case "NEXT_MATCH":
      return {
        ...state,
        currentMatchIndex:
          state.matches.length > 0
            ? (state.currentMatchIndex + 1) % state.matches.length
            : 0,
      };
    case "PREV_MATCH":
      return {
        ...state,
        currentMatchIndex:
          state.matches.length > 0
            ? (state.currentMatchIndex - 1 + state.matches.length) %
              state.matches.length
            : 0,
      };
    case "RESET":
      return initialSearchState;
    default:
      return state;
  }
}
