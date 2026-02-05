import React, { FC, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { IStyledProps } from "../../../models";
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
    <SidebarContainer>
      <ScrollArea ref={scrollContainerRef}>
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
      </ScrollArea>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  border-right: 1px solid #e0e0e0;
  flex-shrink: 0;
  width: fit-content;
  height: 100%;
  overflow: hidden;
`;

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;

    &:hover {
      background-color: #aaa;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;
