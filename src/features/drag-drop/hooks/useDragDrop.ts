import { useState, useCallback, useRef, DragEvent } from "react";
import { IDragState } from "../types";

export const useDragDrop = () => {
  const [dragState, setDragState] = useState<IDragState>({
    isDragging: false,
    isOverDropZone: false,
  });

  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragState({ isDragging: true, isOverDropZone: true });
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setDragState({ isDragging: false, isOverDropZone: false });
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, onFilesDropped: (files: File[]) => void) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setDragState({ isDragging: false, isOverDropZone: false });

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesDropped(files);
      }
    },
    []
  );

  const resetDragState = useCallback(() => {
    dragCounter.current = 0;
    setDragState({ isDragging: false, isOverDropZone: false });
  }, []);

  return {
    dragState,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    resetDragState,
  };
};
