/// <reference types="react" />
interface UseTextSelectionProps {
    pageNumber: number;
    documentUri: string;
    containerRef: React.RefObject<HTMLDivElement>;
}
export declare const useTextSelection: ({ pageNumber, documentUri, containerRef, }: UseTextSelectionProps) => {
    handleTextSelection: () => void;
};
export {};
