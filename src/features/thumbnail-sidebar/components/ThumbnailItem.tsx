import React, { FC } from "react";
import styled from "styled-components";
import { IStyledProps } from "../../../models";
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
    <Container
      onClick={onClick}
      $isSelected={isSelected}
      $width={width}
      role="button"
      tabIndex={0}
      aria-label={`Page ${thumbnail.pageNumber}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <ThumbnailWrapper>
        {thumbnail.isLoading ? (
          <LoadingPlaceholder $width={width}>
            <LoadingSpinner />
          </LoadingPlaceholder>
        ) : thumbnail.dataUrl ? (
          <ThumbnailImage
            src={thumbnail.dataUrl}
            alt={`Page ${thumbnail.pageNumber}`}
            $width={width}
          />
        ) : (
          <PlaceholderBox $width={width}>
            {thumbnail.pageNumber}
          </PlaceholderBox>
        )}
      </ThumbnailWrapper>
      <PageNumber>{thumbnail.pageNumber}</PageNumber>
    </Container>
  );
};

interface ContainerProps extends IStyledProps {
  $isSelected: boolean;
  $width: number;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.$isSelected ? "rgba(0, 100, 200, 0.15)" : "transparent"};
  border: 2px solid
    ${(props) => (props.$isSelected ? "#0064c8" : "transparent")};

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "rgba(0, 100, 200, 0.2)" : "rgba(0, 0, 0, 0.05)"};
  }

  &:focus {
    outline: 2px solid #0064c8;
    outline-offset: 2px;
  }
`;

const ThumbnailWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  overflow: hidden;
`;

interface SizeProps {
  $width: number;
}

const ThumbnailImage = styled.img<SizeProps>`
  width: ${(props) => props.$width}px;
  height: auto;
  display: block;
`;

const LoadingPlaceholder = styled.div<SizeProps>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width * 1.4}px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderBox = styled.div<SizeProps>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width * 1.4}px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #888;
`;

const PageNumber = styled.span`
  margin-top: 4px;
  font-size: 12px;
  color: #666;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
