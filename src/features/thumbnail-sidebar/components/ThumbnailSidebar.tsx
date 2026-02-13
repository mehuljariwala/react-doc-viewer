import React, { FC, useContext, useEffect, useRef } from "react";
import { ThumbnailContext } from "../state";
import { ThumbnailItem } from "./ThumbnailItem";
import { setSelectedPage } from "../state/actions";

interface ThumbnailSidebarProps {
  onPageSelect: (pageNumber: number) => void;
  currentPage: number;
}

export const ThumbnailSidebar: FC<ThumbnailSidebarProps> = ({
  onPageSelect,
  currentPage,
}) => {
  const { state, dispatch } = useContext(ThumbnailContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setSelectedPage(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (selectedRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selected = selectedRef.current;
      const containerRect = container.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();

      if (
        selectedRect.top < containerRect.top ||
        selectedRect.bottom > containerRect.bottom
      ) {
        selected.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [state.selectedPage]);

  if (!state.isOpen) return null;

  const handlePageClick = (pageNumber: number) => {
    dispatch(setSelectedPage(pageNumber));
    onPageSelect(pageNumber);
  };

  return (
    <div className="rdv-thumbnail-sidebar">
      <div className="rdv-thumbnail-scroll-area" ref={scrollContainerRef}>
        {state.thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.pageNumber}
            ref={thumbnail.pageNumber === state.selectedPage ? selectedRef : null}
          >
            <ThumbnailItem
              thumbnail={thumbnail}
              isSelected={thumbnail.pageNumber === state.selectedPage}
              width={state.thumbnailWidth}
              onClick={() => handlePageClick(thumbnail.pageNumber)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
