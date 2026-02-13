import React, { FC, useContext } from "react";
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
        <div
          key={`${annotation.id}-${index}`}
          className="rdv-highlight-rect"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            backgroundColor: annotation.color,
          }}
          {...(isSelected ? { "data-selected": "" } : {})}
          onClick={handleClick}
          title={data.text}
        />
      ))}
    </>
  );
};
