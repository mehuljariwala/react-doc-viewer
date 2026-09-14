/// <reference types="react" />
interface UseSelectionToolbarProps {
    containerRef: React.RefObject<HTMLDivElement>;
    pageNumber: number;
    documentUri: string;
}
interface ToolbarPosition {
    x: number;
    y: number;
    arrowDirection: "down" | "up";
}
interface SelectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface UseSelectionToolbarReturn {
    isVisible: boolean;
    position: ToolbarPosition;
    selectedText: string;
    selectionRects: SelectionRect[];
    dismiss: () => void;
    highlightSelection: (color: string) => void;
    copySelection: () => void;
}
export declare const useSelectionToolbar: ({ containerRef, pageNumber, documentUri, }: UseSelectionToolbarProps) => UseSelectionToolbarReturn;
export {};
