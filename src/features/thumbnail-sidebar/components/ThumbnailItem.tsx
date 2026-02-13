import React, { FC } from "react";
import { IThumbnail } from "../state/actions";

interface ThumbnailItemProps {
  thumbnail: IThumbnail;
  isSelected: boolean;
  width: number;
  onClick: () => void;
}

export const ThumbnailItem: FC<ThumbnailItemProps> = ({
  thumbnail,
  isSelected,
  width,
  onClick,
}) => {
  return (
    <div
      className="rdv-thumbnail-item"
      onClick={onClick}
      {...(isSelected ? { "data-selected": "" } : {})}
      role="button"
      tabIndex={0}
      aria-label={`Page ${thumbnail.pageNumber}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="rdv-thumbnail-wrapper">
        {thumbnail.isLoading ? (
          <div
            className="rdv-thumbnail-loading"
            style={{ width, height: width * 1.4 }}
          >
            <div className="rdv-thumbnail-spinner" />
          </div>
        ) : thumbnail.dataUrl ? (
          <img
            className="rdv-thumbnail-image"
            src={thumbnail.dataUrl}
            alt={`Page ${thumbnail.pageNumber}`}
            style={{ width }}
          />
        ) : (
          <div
            className="rdv-thumbnail-placeholder"
            style={{ width, height: width * 1.4 }}
          >
            {thumbnail.pageNumber}
          </div>
        )}
      </div>
      <span className="rdv-thumbnail-page-number">{thumbnail.pageNumber}</span>
    </div>
  );
};
