import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
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
    <Container onClick={(e) => e.stopPropagation()}>
      <Header>
        <Title>Comment</Title>
        <DeleteButton onClick={handleDelete} title="Delete comment">
          <DeleteIcon size="14" color="#666" />
        </DeleteButton>
      </Header>

      {isEditing ? (
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your comment..."
          autoFocus
        />
      ) : (
        <CommentText onClick={() => setIsEditing(true)}>{text}</CommentText>
      )}

      <Footer>
        {data?.timestamp && (
          <Timestamp>
            {new Date(data.timestamp).toLocaleString()}
          </Timestamp>
        )}
        {isEditing && (
          <SaveButton onClick={handleSave} disabled={!text.trim()}>
            Save
          </SaveButton>
        )}
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  width: 250px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f8f8;
`;

const Title = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #e0e0e0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: none;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
`;

const CommentText = styled.div`
  padding: 12px;
  font-size: 14px;
  color: #333;
  cursor: text;
  min-height: 40px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #e0e0e0;
`;

const Timestamp = styled.span`
  font-size: 11px;
  color: #999;
`;

const SaveButton = styled.button`
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: #0064c8;
  color: white;
  font-size: 12px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #0054a8;
  }
`;
