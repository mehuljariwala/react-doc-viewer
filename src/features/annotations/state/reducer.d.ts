import { AnnotationTool, IAnnotation } from '../types';
import { AnnotationActions } from './actions';

export interface IAnnotationState {
    activeTool: AnnotationTool;
    currentColor: string;
    annotations: IAnnotation[];
    selectedAnnotationId: string | null;
    isDrawing: boolean;
    availableColors: string[];
    availableTools: AnnotationTool[];
}
export declare const DEFAULT_COLORS: string[];
export declare const DEFAULT_TOOLS: AnnotationTool[];
export declare const initialAnnotationState: IAnnotationState;
export type AnnotationStateReducer = (state: IAnnotationState, action: AnnotationActions) => IAnnotationState;
export declare const annotationReducer: AnnotationStateReducer;
