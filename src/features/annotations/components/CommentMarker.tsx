import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { AnnotationContext } from "../state";
import { deleteAnnotation, setSelectedAnnotation } from "../state/actions";
import { IAnnotation, ICommentData } from "../types";
import { CommentPopover } from "./CommentPopover";

interface CommentMarkerProps {
  annotation: IAnnotation;
}

export const CommentMarker: FC<CommentMarkerProps> = ({ annotation }) => {
  const { state, dispatch } = useContext(AnnotationContext);
  const [showPopover, setShowPopover] = useState(false);
  const data = annotation.data as ICommentData;
  const isSelected = state.selectedAnnotationId === annotation.id;

  if (!data) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.activeTool === "eraser") {
      dispatch(deleteAnnotation(annotation.id));
    } else {
      dispatch(setSelectedAnnotation(annotation.id));
      setShowPopover(!showPopover);
    }
  };

  return (
    <Container $x={data.x} $y={data.y}>
      <Marker
        $color={annotation.color}
        $isSelected={isSelected}
        onClick={handleClick}
        aria-label="Comment"
      >
        <CommentIcon />
      </Marker>
      {showPopover && (
        <CommentPopover
          annotation={annotation}
          onClose={() => setShowPopover(false)}
        />
      )}
    </Container>
  );
};

const CommentIcon: FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="white"
    stroke="white"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

interface ContainerProps {
  $x: number;
  $y: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  z-index: 10;
`;

interface MarkerProps {
  $color: string;
  $isSelected: boolean;
}

const Marker = styled.button<MarkerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$isSelected ? "#0064c8" : "white")};
  background-color: ${(props) => props.$color};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid #0064c8;
    outline-offset: 2px;
  }
`;
