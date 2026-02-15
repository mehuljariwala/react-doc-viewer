export type AnnotationTool = "select" | "highlight" | "pen" | "comment" | "eraser";
export interface IAnnotation {
    id: string;
    type: "highlight" | "drawing" | "comment";
    documentUri: string;
    pageNumber: number;
    color: string;
    data?: IHighlightData | IDrawingData | ICommentData;
}
export interface IHighlightData {
    rects: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    text?: string;
}
export interface IDrawingData {
    paths: Array<{
        x: number;
        y: number;
    }[]>;
    strokeWidth: number;
}
export interface ICommentData {
    x: number;
    y: number;
    text: string;
    author?: string;
    timestamp?: number;
}
export interface IAnnotationConfig {
    enableAnnotations?: boolean;
    defaultColor?: string;
    colors?: string[];
    tools?: AnnotationTool[];
    onAnnotationChange?: (annotations: IAnnotation[]) => void;
    initialAnnotations?: IAnnotation[];
}
export interface IPoint {
    x: number;
    y: number;
}
