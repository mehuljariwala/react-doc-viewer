import { useCallback, useContext } from "react";
import { AnnotationContext } from "../state";
import { addAnnotation } from "../state/actions";
import { IAnnotation, IHighlightData } from "../types";

interface UseTextSelectionProps {
  pageNumber: number;
  documentUri: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useTextSelection = ({
  pageNumber,
  documentUri,
  containerRef,
}: UseTextSelectionProps) => {
  const { state, dispatch } = useContext(AnnotationContext);

  const handleTextSelection = useCallback(() => {
    if (state.activeTool !== "highlight") return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const rects = Array.from(range.getClientRects());

    if (rects.length === 0) return;

    const normalizedRects = rects.map((rect) => ({
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top,
      width: rect.width,
      height: rect.height,
    }));

    const highlightData: IHighlightData = {
      rects: normalizedRects,
      text: selection.toString(),
    };

    const annotation: IAnnotation = {
      id: crypto.randomUUID(),
      type: "highlight",
      documentUri,
      pageNumber,
      color: state.currentColor,
      data: highlightData,
    };

    dispatch(addAnnotation(annotation));
    selection.removeAllRanges();
  }, [
    state.activeTool,
    state.currentColor,
    documentUri,
    pageNumber,
    containerRef,
    dispatch,
  ]);

  return {
    handleTextSelection,
  };
};
