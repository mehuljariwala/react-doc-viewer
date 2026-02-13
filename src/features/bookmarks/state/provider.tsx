import React, { FC, PropsWithChildren, useReducer } from "react";
import { BookmarksContext } from "./context";
import { initialBookmarksState, bookmarksReducer } from "./reducer";

export const BookmarksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarksReducer, initialBookmarksState);

  return (
    <BookmarksContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarksContext.Provider>
  );
};
