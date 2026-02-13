import React, { FC, PropsWithChildren, useReducer } from "react";
import { SearchContext } from "./context";
import { initialSearchState, searchReducer } from "./reducer";

export const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
