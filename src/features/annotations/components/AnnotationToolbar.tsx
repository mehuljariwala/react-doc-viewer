import React, { FC, useContext } from "react";
import { AnnotationContext } from "../state";
import { setActiveTool } from "../state/actions";
import { AnnotationTool } from "../types";
import { ColorPicker } from "./ColorPicker";
import {
  SelectIcon,
  HighlightIcon,
  PenIcon,
  CommentIcon,
  EraserIcon,
} from "./icons";

const TOOL_ICONS: Record<AnnotationTool, FC<{ color?: string; size?: string | number }>> = {
  select: SelectIcon,
  highlight: HighlightIcon,
  pen: PenIcon,
  comment: CommentIcon,
  eraser: EraserIcon,
};

const TOOL_LABELS: Record<AnnotationTool, string> = {
  select: "Select",
  highlight: "Highlight",
  pen: "Draw",
  comment: "Comment",
  eraser: "Eraser",
};

export const AnnotationToolbar: FC = () => {
  const { state, dispatch } = useContext(AnnotationContext);

  return (
    <div className="rdv-annotation-toolbar">
      <div className="rdv-annotation-tool-group">
        {state.availableTools.map((tool) => {
          const Icon = TOOL_ICONS[tool];
          const isActive = state.activeTool === tool;

          return (
            <button
              key={tool}
              className="rdv-annotation-tool-btn"
              {...(isActive ? { "data-active": "" } : {})}
              onClick={() => dispatch(setActiveTool(tool))}
              title={TOOL_LABELS[tool]}
              aria-label={TOOL_LABELS[tool]}
              aria-pressed={isActive}
            >
              <Icon color={isActive ? "#0064c8" : "#333"} size="60%" />
            </button>
          );
        })}
      </div>

      {(state.activeTool === "highlight" ||
        state.activeTool === "pen" ||
        state.activeTool === "comment") && (
        <div className="rdv-annotation-separator" />
      )}

      {(state.activeTool === "highlight" ||
        state.activeTool === "pen" ||
        state.activeTool === "comment") && <ColorPicker />}
    </div>
  );
};
