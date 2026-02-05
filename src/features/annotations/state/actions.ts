import { AnnotationTool, IAnnotation } from "../types";

export const SET_ACTIVE_TOOL = "SET_ACTIVE_TOOL";
export const SET_CURRENT_COLOR = "SET_CURRENT_COLOR";
export const ADD_ANNOTATION = "ADD_ANNOTATION";
export const UPDATE_ANNOTATION = "UPDATE_ANNOTATION";
export const DELETE_ANNOTATION = "DELETE_ANNOTATION";
export const SET_ANNOTATIONS = "SET_ANNOTATIONS";
export const SET_SELECTED_ANNOTATION = "SET_SELECTED_ANNOTATION";
export const SET_IS_DRAWING = "SET_IS_DRAWING";

export interface SetActiveTool {
  type: typeof SET_ACTIVE_TOOL;
  tool: AnnotationTool;
}

export const setActiveTool = (tool: AnnotationTool): SetActiveTool => ({
  type: SET_ACTIVE_TOOL,
  tool,
});

export interface SetCurrentColor {
  type: typeof SET_CURRENT_COLOR;
  color: string;
}

export const setCurrentColor = (color: string): SetCurrentColor => ({
  type: SET_CURRENT_COLOR,
  color,
});

export interface AddAnnotation {
  type: typeof ADD_ANNOTATION;
  annotation: IAnnotation;
}

export const addAnnotation = (annotation: IAnnotation): AddAnnotation => ({
  type: ADD_ANNOTATION,
  annotation,
});

export interface UpdateAnnotation {
  type: typeof UPDATE_ANNOTATION;
  id: string;
  updates: Partial<IAnnotation>;
}

export const updateAnnotation = (
  id: string,
  updates: Partial<IAnnotation>
): UpdateAnnotation => ({
  type: UPDATE_ANNOTATION,
  id,
  updates,
});

export interface DeleteAnnotation {
  type: typeof DELETE_ANNOTATION;
  id: string;
}

export const deleteAnnotation = (id: string): DeleteAnnotation => ({
  type: DELETE_ANNOTATION,
  id,
});

export interface SetAnnotations {
  type: typeof SET_ANNOTATIONS;
  annotations: IAnnotation[];
}

export const setAnnotations = (annotations: IAnnotation[]): SetAnnotations => ({
  type: SET_ANNOTATIONS,
  annotations,
});

export interface SetSelectedAnnotation {
  type: typeof SET_SELECTED_ANNOTATION;
  id: string | null;
}

export const setSelectedAnnotation = (
  id: string | null
): SetSelectedAnnotation => ({
  type: SET_SELECTED_ANNOTATION,
  id,
});

export interface SetIsDrawing {
  type: typeof SET_IS_DRAWING;
  isDrawing: boolean;
}

export const setIsDrawing = (isDrawing: boolean): SetIsDrawing => ({
  type: SET_IS_DRAWING,
  isDrawing,
});

export type AnnotationActions =
  | SetActiveTool
  | SetCurrentColor
  | AddAnnotation
  | UpdateAnnotation
  | DeleteAnnotation
  | SetAnnotations
  | SetSelectedAnnotation
  | SetIsDrawing;
