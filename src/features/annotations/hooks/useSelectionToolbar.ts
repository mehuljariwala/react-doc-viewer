import { useCallback, useContext, useEffect, useState } from "react";
import { AnnotationContext } from "../state";
import { addAnnotation } from "../state/actions";
import { IAnnotation, IHighlightData } from "../types";

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

const TOOLBAR_HEIGHT = 80;
const TOOLBAR_OFFSET = 8;

export const useSelectionToolbar = ({
  containerRef,
  pageNumber,
  documentUri,
}: UseSelectionToolbarProps): UseSelectionToolbarReturn => {
  const { dispatch } = useContext(AnnotationContext);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<ToolbarPosition>({
    x: 0,
    y: 0,
    arrowDirection: "down",
  });
  const [selectedText, setSelectedText] = useState("");
  const [selectionRects, setSelectionRects] = useState<SelectionRect[]>([]);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    setSelectedText("");
    setSelectionRects([]);
  }, []);

  const highlightSelection = useCallback(
    (color: string) => {
      if (selectionRects.length === 0) return;

      const highlightData: IHighlightData = {
        rects: selectionRects,
        text: selectedText,
      };

      const annotation: IAnnotation = {
        id: crypto.randomUUID(),
        type: "highlight",
        documentUri,
        pageNumber,
        color,
        data: highlightData,
      };

      dispatch(addAnnotation(annotation));
      window.getSelection()?.removeAllRanges();
      dismiss();
    },
    [selectionRects, selectedText, documentUri, pageNumber, dispatch, dismiss],
  );

  const copySelection = useCallback(() => {
    if (!selectedText) return;
    navigator.clipboard.writeText(selectedText);
    window.getSelection()?.removeAllRanges();
    dismiss();
  }, [selectedText, dismiss]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pageContainer = container.closest(".rdv-pdf-page-container") || container.parentElement;
    if (!pageContainer) return;

    const handleMouseUp = () => {
      requestAnimationFrame(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.toString().trim()) {
          return;
        }

        const range = selection.getRangeAt(0);
        const containerRect = container.getBoundingClientRect();
        const pageRect = pageContainer.getBoundingClientRect();
        const rects = Array.from(range.getClientRects());

        if (rects.length === 0) return;

        const firstRect = rects[0];
        const selectionInPage =
          firstRect.left >= pageRect.left &&
          firstRect.right <= pageRect.right + 1 &&
          firstRect.top >= pageRect.top &&
          firstRect.bottom <= pageRect.bottom + 1;
        if (!selectionInPage) return;

        const normalizedRects = rects.map((rect) => ({
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
        }));

        const selectionBounds = rects.reduce(
          (acc, rect) => ({
            left: Math.min(acc.left, rect.left),
            top: Math.min(acc.top, rect.top),
            right: Math.max(acc.right, rect.right),
            bottom: Math.max(acc.bottom, rect.bottom),
          }),
          {
            left: Infinity,
            top: Infinity,
            right: -Infinity,
            bottom: -Infinity,
          },
        );

        const centerX =
          (selectionBounds.left + selectionBounds.right) / 2 - containerRect.left;
        const topY = selectionBounds.top - containerRect.top;
        const bottomY = selectionBounds.bottom - containerRect.top;

        const hasRoomAbove = topY > TOOLBAR_HEIGHT + TOOLBAR_OFFSET;
        const arrowDirection: "down" | "up" = hasRoomAbove ? "down" : "up";
        const y = hasRoomAbove
          ? topY - TOOLBAR_OFFSET
          : bottomY + TOOLBAR_OFFSET;

        setSelectedText(selection.toString());
        setSelectionRects(normalizedRects);
        setPosition({ x: centerX, y, arrowDirection });
        setIsVisible(true);
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".rdv-selection-toolbar")) return;
      setIsVisible(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };

    pageContainer.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      pageContainer.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [containerRef, dismiss]);

  return {
    isVisible,
    position,
    selectedText,
    selectionRects,
    dismiss,
    highlightSelection,
    copySelection,
  };
};
