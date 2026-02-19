import React, { FC, useCallback } from "react";
import { ISelectionAction, ISelectionToolbarConfig } from "../../../models";

const SELECTION_TOOLBAR_COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

interface SelectionToolbarProps {
  position: { x: number; y: number; arrowDirection: "down" | "up" };
  selectedText: string;
  pageNumber: number;
  config: ISelectionToolbarConfig;
  onHighlight: (color: string) => void;
  onCopy: () => void;
  onDismiss: () => void;
}

export const SelectionToolbar: FC<SelectionToolbarProps> = ({
  position,
  selectedText,
  pageNumber,
  config,
  onHighlight,
  onCopy,
  onDismiss,
}) => {
  const showColors = config.showHighlightColors !== false;
  const showCopy = config.showCopyButton !== false;
  const showComment = config.showCommentButton !== false;
  const colors = config.colors || SELECTION_TOOLBAR_COLORS;
  const actions = config.actions || [];
  const hasActions = actions.length > 0;
  const hasTools = showColors || showCopy || showComment;

  const handleActionClick = useCallback(
    (action: ISelectionAction) => {
      action.onClick(selectedText, pageNumber);
    },
    [selectedText, pageNumber],
  );

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onCopy();
    },
    [onCopy],
  );

  const style: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    transform:
      position.arrowDirection === "down"
        ? "translate(-50%, -100%)"
        : "translate(-50%, 0)",
    zIndex: 1000,
  };

  return (
    <div
      className={`rdv-selection-toolbar rdv-selection-toolbar--arrow-${position.arrowDirection}`}
      style={style}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {hasActions && (
        <div className="rdv-selection-toolbar-actions">
          {actions.map((action, i) => (
            <React.Fragment key={action.label}>
              {i > 0 && <span className="rdv-selection-toolbar-action-divider" />}
              <button
                className="rdv-selection-toolbar-action-btn"
                onClick={() => handleActionClick(action)}
              >
                {action.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {hasActions && hasTools && (
        <div className="rdv-selection-toolbar-separator" />
      )}

      {hasTools && (
        <div className="rdv-selection-toolbar-tools">
          {showColors &&
            colors.map((color) => (
              <button
                key={color}
                className="rdv-selection-toolbar-color"
                style={{ backgroundColor: color }}
                onClick={() => onHighlight(color)}
                aria-label={`Highlight ${color}`}
              />
            ))}

          {showColors && (showCopy || showComment) && (
            <span className="rdv-selection-toolbar-tool-divider" />
          )}

          {showComment && (
            <button
              className="rdv-selection-toolbar-tool-btn"
              onClick={onDismiss}
              aria-label="Add comment"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}

          {showCopy && (
            <button
              className="rdv-selection-toolbar-tool-btn"
              onClick={handleCopy}
              aria-label="Copy text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
