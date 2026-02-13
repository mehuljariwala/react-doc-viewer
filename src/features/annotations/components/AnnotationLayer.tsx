import React, { FC, useContext, useEffect, useRef } from "react";
import { AnnotationContext } from "../state";
import { addAnnotation, setSelectedAnnotation } from "../state/actions";
import { IAnnotation, ICommentData } from "../types";
import { useDrawingCanvas } from "../hooks/useDrawingCanvas";
import { useTextSelection } from "../hooks/useTextSelection";
import { TextHighlight } from "./TextHighlight";
import { CommentMarker } from "./CommentMarker";

interface AnnotationLayerProps {
  pageNumber: number;
  documentUri: string;
  width: number;
  height: number;
}

export const AnnotationLayer: FC<AnnotationLayerProps> = ({
  pageNumber,
  documentUri,
  width,
  height,
}) => {
  const { state, dispatch } = useContext(AnnotationContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { startDrawing, draw, stopDrawing, redrawAnnotations } =
    useDrawingCanvas({
      canvasRef,
      pageNumber,
      documentUri,
    });

  const { handleTextSelection } = useTextSelection({
    pageNumber,
    documentUri,
    containerRef,
  });

  const pageAnnotations = state.annotations.filter(
    (ann) => ann.pageNumber === pageNumber && ann.documentUri === documentUri
  );

  const highlights = pageAnnotations.filter((ann) => ann.type === "highlight");
  const comments = pageAnnotations.filter((ann) => ann.type === "comment");
  const drawings = pageAnnotations.filter((ann) => ann.type === "drawing");

  useEffect(() => {
    redrawAnnotations(drawings);
  }, [drawings, redrawAnnotations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      redrawAnnotations(drawings);
    }
  }, [width, height, redrawAnnotations, drawings]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.activeTool === "comment") {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const commentData: ICommentData = {
        x,
        y,
        text: "",
        timestamp: Date.now(),
      };

      const annotation: IAnnotation = {
        id: crypto.randomUUID(),
        type: "comment",
        documentUri,
        pageNumber,
        color: state.currentColor,
        data: commentData,
      };

      dispatch(addAnnotation(annotation));
    } else if (state.activeTool === "select") {
      dispatch(setSelectedAnnotation(null));
    }
  };

  const getCursor = () => {
    switch (state.activeTool) {
      case "highlight":
        return "text";
      case "pen":
        return "crosshair";
      case "comment":
        return "pointer";
      case "eraser":
        return "not-allowed";
      default:
        return "default";
    }
  };

  return (
    <div
      ref={containerRef}
      className="rdv-annotation-layer"
      style={{ width, height, cursor: getCursor() }}
      onClick={handleContainerClick}
      onMouseUp={handleTextSelection}
    >
      {highlights.map((annotation) => (
        <TextHighlight key={annotation.id} annotation={annotation} />
      ))}

      {comments.map((annotation) => (
        <CommentMarker key={annotation.id} annotation={annotation} />
      ))}

      <canvas
        ref={canvasRef}
        className="rdv-annotation-drawing-canvas"
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        {...(state.activeTool === "pen" ? { "data-pen-active": "" } : {})}
      />
    </div>
  );
};
