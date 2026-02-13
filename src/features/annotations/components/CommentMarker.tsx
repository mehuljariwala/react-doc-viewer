import React, { FC, useContext, useState } from "react";
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
    <div className="rdv-comment-container" style={{ left: data.x, top: data.y }}>
      <button
        className="rdv-comment-marker"
        style={{ backgroundColor: annotation.color }}
        {...(isSelected ? { "data-selected": "" } : {})}
        onClick={handleClick}
        aria-label="Comment"
      >
        <CommentIcon />
      </button>
      {showPopover && (
        <CommentPopover
          annotation={annotation}
          onClose={() => setShowPopover(false)}
        />
      )}
    </div>
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
