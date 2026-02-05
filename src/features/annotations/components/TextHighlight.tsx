import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AnnotationContext } from "../state";
import { deleteAnnotation, setSelectedAnnotation } from "../state/actions";
import { IAnnotation, IHighlightData } from "../types";

interface TextHighlightProps {
  annotation: IAnnotation;
}

export const TextHighlight: FC<TextHighlightProps> = ({ annotation }) => {
  const { state, dispatch } = useContext(AnnotationContext);
  const data = annotation.data as IHighlightData;
  const isSelected = state.selectedAnnotationId === annotation.id;

  if (!data?.rects) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state.activeTool === "select") {
      dispatch(setSelectedAnnotation(annotation.id));
    } else if (state.activeTool === "eraser") {
      dispatch(deleteAnnotation(annotation.id));
    }
  };

  return (
    <>
      {data.rects.map((rect, index) => (
        <HighlightRect
          key={`${annotation.id}-${index}`}
          $x={rect.x}
          $y={rect.y}
          $width={rect.width}
          $height={rect.height}
          $color={annotation.color}
          $isSelected={isSelected}
          onClick={handleClick}
          title={data.text}
        />
      ))}
    </>
  );
};

interface HighlightRectProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $color: string;
  $isSelected: boolean;
}

const HighlightRect = styled.div<HighlightRectProps>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background-color: ${(props) => props.$color};
  opacity: 0.4;
  pointer-events: auto;
  cursor: pointer;
  border: ${(props) => (props.$isSelected ? "2px solid #0064c8" : "none")};
  box-sizing: border-box;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.6;
  }
`;
