import { AnnotationTool, IAnnotation } from "../types";
import {
  AnnotationActions,
  SET_ACTIVE_TOOL,
  SET_CURRENT_COLOR,
  ADD_ANNOTATION,
  UPDATE_ANNOTATION,
  DELETE_ANNOTATION,
  SET_ANNOTATIONS,
  SET_SELECTED_ANNOTATION,
  SET_IS_DRAWING,
  SetActiveTool,
  SetCurrentColor,
  AddAnnotation,
  UpdateAnnotation,
  DeleteAnnotation,
  SetAnnotations,
  SetSelectedAnnotation,
  SetIsDrawing,
} from "./actions";

export interface IAnnotationState {
  activeTool: AnnotationTool;
  currentColor: string;
  annotations: IAnnotation[];
  selectedAnnotationId: string | null;
  isDrawing: boolean;
  availableColors: string[];
  availableTools: AnnotationTool[];
}

export const DEFAULT_COLORS = [
  "#FFFF00",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
];

export const DEFAULT_TOOLS: AnnotationTool[] = [
  "select",
  "highlight",
  "pen",
  "comment",
  "eraser",
];

export const initialAnnotationState: IAnnotationState = {
  activeTool: "select",
  currentColor: "#FFFF00",
  annotations: [],
  selectedAnnotationId: null,
  isDrawing: false,
  availableColors: DEFAULT_COLORS,
  availableTools: DEFAULT_TOOLS,
};

export type AnnotationStateReducer = (
  state: IAnnotationState,
  action: AnnotationActions
) => IAnnotationState;

export const annotationReducer: AnnotationStateReducer = (
  state = initialAnnotationState,
  action: AnnotationActions
): IAnnotationState => {
  switch (action.type) {
    case SET_ACTIVE_TOOL: {
      const { tool } = action as SetActiveTool;
      return { ...state, activeTool: tool };
    }

    case SET_CURRENT_COLOR: {
      const { color } = action as SetCurrentColor;
      return { ...state, currentColor: color };
    }

    case ADD_ANNOTATION: {
      const { annotation } = action as AddAnnotation;
      return {
        ...state,
        annotations: [...state.annotations, annotation],
      };
    }

    case UPDATE_ANNOTATION: {
      const { id, updates } = action as UpdateAnnotation;
      return {
        ...state,
        annotations: state.annotations.map((ann) =>
          ann.id === id ? { ...ann, ...updates } : ann
        ),
      };
    }

    case DELETE_ANNOTATION: {
      const { id } = action as DeleteAnnotation;
      return {
        ...state,
        annotations: state.annotations.filter((ann) => ann.id !== id),
        selectedAnnotationId:
          state.selectedAnnotationId === id ? null : state.selectedAnnotationId,
      };
    }

    case SET_ANNOTATIONS: {
      const { annotations } = action as SetAnnotations;
      return { ...state, annotations };
    }

    case SET_SELECTED_ANNOTATION: {
      const { id } = action as SetSelectedAnnotation;
      return { ...state, selectedAnnotationId: id };
    }

    case SET_IS_DRAWING: {
      const { isDrawing } = action as SetIsDrawing;
      return { ...state, isDrawing };
    }

    default:
      return state;
  }
};
