import { AnnotationTool, IAnnotation } from '../types';

export declare const SET_ACTIVE_TOOL = "SET_ACTIVE_TOOL";
export declare const SET_CURRENT_COLOR = "SET_CURRENT_COLOR";
export declare const ADD_ANNOTATION = "ADD_ANNOTATION";
export declare const UPDATE_ANNOTATION = "UPDATE_ANNOTATION";
export declare const DELETE_ANNOTATION = "DELETE_ANNOTATION";
export declare const SET_ANNOTATIONS = "SET_ANNOTATIONS";
export declare const SET_SELECTED_ANNOTATION = "SET_SELECTED_ANNOTATION";
export declare const SET_IS_DRAWING = "SET_IS_DRAWING";
export interface SetActiveTool {
    type: typeof SET_ACTIVE_TOOL;
    tool: AnnotationTool;
}
export declare const setActiveTool: (tool: AnnotationTool) => SetActiveTool;
export interface SetCurrentColor {
    type: typeof SET_CURRENT_COLOR;
    color: string;
}
export declare const setCurrentColor: (color: string) => SetCurrentColor;
export interface AddAnnotation {
    type: typeof ADD_ANNOTATION;
    annotation: IAnnotation;
}
export declare const addAnnotation: (annotation: IAnnotation) => AddAnnotation;
export interface UpdateAnnotation {
    type: typeof UPDATE_ANNOTATION;
    id: string;
    updates: Partial<IAnnotation>;
}
export declare const updateAnnotation: (id: string, updates: Partial<IAnnotation>) => UpdateAnnotation;
export interface DeleteAnnotation {
    type: typeof DELETE_ANNOTATION;
    id: string;
}
export declare const deleteAnnotation: (id: string) => DeleteAnnotation;
export interface SetAnnotations {
    type: typeof SET_ANNOTATIONS;
    annotations: IAnnotation[];
}
export declare const setAnnotations: (annotations: IAnnotation[]) => SetAnnotations;
export interface SetSelectedAnnotation {
    type: typeof SET_SELECTED_ANNOTATION;
    id: string | null;
}
export declare const setSelectedAnnotation: (id: string | null) => SetSelectedAnnotation;
export interface SetIsDrawing {
    type: typeof SET_IS_DRAWING;
    isDrawing: boolean;
}
export declare const setIsDrawing: (isDrawing: boolean) => SetIsDrawing;
export type AnnotationActions = SetActiveTool | SetCurrentColor | AddAnnotation | UpdateAnnotation | DeleteAnnotation | SetAnnotations | SetSelectedAnnotation | SetIsDrawing;
