import { IAnnotation } from '../types';

interface UseDrawingCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    pageNumber: number;
    documentUri: string;
}
export declare const useDrawingCanvas: ({ canvasRef, pageNumber, documentUri, }: UseDrawingCanvasProps) => {
    startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    stopDrawing: () => void;
    redrawAnnotations: (annotations: IAnnotation[]) => void;
    isDrawing: boolean;
};
export {};
