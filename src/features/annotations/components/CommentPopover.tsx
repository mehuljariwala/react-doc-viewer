import React, { FC, useContext, useState } from "react";
import { AnnotationContext } from "../state";
import { deleteAnnotation, updateAnnotation } from "../state/actions";
import { IAnnotation, ICommentData } from "../types";
import { DeleteIcon } from "./icons";

interface CommentPopoverProps {
  annotation: IAnnotation;
  onClose: () => void;
}

export const CommentPopover: FC<CommentPopoverProps> = ({
  annotation,
  onClose,
}) => {
  const { dispatch } = useContext(AnnotationContext);
  const data = annotation.data as ICommentData;
  const [text, setText] = useState(data?.text || "");
  const [isEditing, setIsEditing] = useState(!data?.text);

  const handleSave = () => {
    if (text.trim()) {
      const updatedData: ICommentData = {
        ...data,
        text: text.trim(),
        timestamp: Date.now(),
      };
      dispatch(
        updateAnnotation(annotation.id, {
          data: updatedData,
        })
      );
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteAnnotation(annotation.id));
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="rdv-comment-popover" onClick={(e) => e.stopPropagation()}>
      <div className="rdv-comment-popover-header">
        <span className="rdv-comment-popover-title">Comment</span>
        <button className="rdv-comment-popover-delete" onClick={handleDelete} title="Delete comment">
          <DeleteIcon size="14" color="#666" />
        </button>
      </div>

      {isEditing ? (
        <textarea
          className="rdv-comment-popover-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your comment..."
          autoFocus
        />
      ) : (
        <div className="rdv-comment-popover-text" onClick={() => setIsEditing(true)}>{text}</div>
      )}

      <div className="rdv-comment-popover-footer">
        {data?.timestamp && (
          <span className="rdv-comment-popover-timestamp">
            {new Date(data.timestamp).toLocaleString()}
          </span>
        )}
        {isEditing && (
          <button className="rdv-comment-popover-save" onClick={handleSave} disabled={!text.trim()}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};
