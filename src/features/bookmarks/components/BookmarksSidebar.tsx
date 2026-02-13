import React, { FC, useContext } from "react";
import { BookmarksContext } from "../state/context";
import { BookmarkItem } from "./BookmarkItem";
import { useTranslation } from "../../../hooks/useTranslation";

interface Props {
  onNavigate: (pageIndex: number) => void;
}

export const BookmarksSidebar: FC<Props> = ({ onNavigate }) => {
  const { state } = useContext(BookmarksContext);
  const { t } = useTranslation();

  if (!state.isOpen) return null;

  return (
    <div className="rdv-bookmarks-sidebar">
      <div className="rdv-bookmarks-header">
        <span className="rdv-bookmarks-title">{t("bookmarksSidebar")}</span>
      </div>
      <div className="rdv-bookmarks-list">
        {state.outline.length === 0 ? (
          <div className="rdv-bookmarks-empty">{t("noBookmarks")}</div>
        ) : (
          state.outline.map((item, i) => (
            <BookmarkItem
              key={i}
              item={item}
              depth={0}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
};
