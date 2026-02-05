import React, { FC, useContext } from "react";
import styled from "styled-components";
import { IStyledProps } from "../../../models";
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
    <Container>
      <ToolGroup>
        {state.availableTools.map((tool) => {
          const Icon = TOOL_ICONS[tool];
          const isActive = state.activeTool === tool;

          return (
            <ToolButton
              key={tool}
              $isActive={isActive}
              onClick={() => dispatch(setActiveTool(tool))}
              title={TOOL_LABELS[tool]}
              aria-label={TOOL_LABELS[tool]}
              aria-pressed={isActive}
            >
              <Icon color={isActive ? "#0064c8" : "#333"} size="60%" />
            </ToolButton>
          );
        })}
      </ToolGroup>

      {(state.activeTool === "highlight" ||
        state.activeTool === "pen" ||
        state.activeTool === "comment") && (
        <Separator />
      )}

      {(state.activeTool === "highlight" ||
        state.activeTool === "pen" ||
        state.activeTool === "comment") && <ColorPicker />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: ${(props: IStyledProps) => props.theme.tertiary};
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    padding: 6px;
    gap: 4px;
  }
`;

const ToolGroup = styled.div`
  display: flex;
  gap: 4px;
`;

interface ToolButtonProps {
  $isActive: boolean;
}

const ToolButton = styled.button<ToolButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isActive ? "rgba(0, 100, 200, 0.15)" : "white"};
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.15s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? "rgba(0, 100, 200, 0.2)" : "#f0f0f0"};
  }

  &:focus {
    outline: 2px solid #0064c8;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color: #ccc;
`;
