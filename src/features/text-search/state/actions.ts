import { SearchAction, SearchMatch } from "../types";

export const setSearchQuery = (value: string): SearchAction => ({
  type: "SET_QUERY",
  value,
});

export const setSearchMatches = (value: SearchMatch[]): SearchAction => ({
  type: "SET_MATCHES",
  value,
});

export const setCurrentMatchIndex = (value: number): SearchAction => ({
  type: "SET_CURRENT_MATCH_INDEX",
  value,
});

export const setSearchOpen = (value: boolean): SearchAction => ({
  type: "SET_IS_OPEN",
  value,
});

export const setIsSearching = (value: boolean): SearchAction => ({
  type: "SET_IS_SEARCHING",
  value,
});

export const nextMatch = (): SearchAction => ({ type: "NEXT_MATCH" });
export const prevMatch = (): SearchAction => ({ type: "PREV_MATCH" });
export const resetSearch = (): SearchAction => ({ type: "RESET" });
