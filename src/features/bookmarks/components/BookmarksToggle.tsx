import React, { FC, useContext } from "react";
import { BookmarksContext } from "../state/context";
import { toggleBookmarksOpen } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import { BookmarksPDFIcon } from "../../../renderers/pdf/components/icons";

export const BookmarksToggle: FC = () => {
  const { state, dispatch } = useContext(BookmarksContext);
  const { t } = useTranslation();

  return (
    <button
      className="rdv-toolbar-btn"
      onMouseDown={() => dispatch(toggleBookmarksOpen())}
      title={state.isOpen ? t("hideBookmarks") : t("showBookmarks")}
    >
      <BookmarksPDFIcon size="16" />
    </button>
  );
};
