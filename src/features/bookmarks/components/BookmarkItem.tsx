import React, { FC } from "react";
import { OutlineItem } from "../types";

interface Props {
  item: OutlineItem;
  depth: number;
  onNavigate: (pageIndex: number) => void;
}

export const BookmarkItem: FC<Props> = ({ item, depth, onNavigate }) => {
  return (
    <div className="rdv-bookmark-item-wrapper">
      <button
        className="rdv-bookmark-item"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => onNavigate(item.pageIndex)}
        title={`Go to page ${item.pageIndex}`}
      >
        <span className="rdv-bookmark-title">{item.title}</span>
        <span className="rdv-bookmark-page">{item.pageIndex}</span>
      </button>
      {item.items.length > 0 && (
        <div className="rdv-bookmark-children">
          {item.items.map((child, i) => (
            <BookmarkItem
              key={i}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
