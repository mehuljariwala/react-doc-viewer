import { useCallback, useContext, useRef, useState } from "react";
import { AnnotationContext } from "../state";
import { addAnnotation, setIsDrawing } from "../state/actions";
import { IAnnotation, IDrawingData, IPoint } from "../types";

interface UseDrawingCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  pageNumber: number;
  documentUri: string;
}

export const useDrawingCanvas = ({
  canvasRef,
  pageNumber,
  documentUri,
}: UseDrawingCanvasProps) => {
  const { state, dispatch } = useContext(AnnotationContext);
  const [currentPath, setCurrentPath] = useState<IPoint[]>([]);
  const isDrawingRef = useRef(false);

  const getCanvasPoint = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): IPoint | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [canvasRef]
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (state.activeTool !== "pen") return;

      const point = getCanvasPoint(e);
      if (!point) return;

      isDrawingRef.current = true;
      dispatch(setIsDrawing(true));
      setCurrentPath([point]);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.strokeStyle = state.currentColor;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    },
    [state.activeTool, state.currentColor, getCanvasPoint, dispatch, canvasRef]
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current || state.activeTool !== "pen") return;

      const point = getCanvasPoint(e);
      if (!point) return;

      setCurrentPath((prev) => [...prev, point]);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }
    },
    [state.activeTool, getCanvasPoint, canvasRef]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawingRef.current) return;

    isDrawingRef.current = false;
    dispatch(setIsDrawing(false));

    if (currentPath.length > 1) {
      const drawingData: IDrawingData = {
        paths: [currentPath],
        strokeWidth: 3,
      };

      const annotation: IAnnotation = {
        id: crypto.randomUUID(),
        type: "drawing",
        documentUri,
        pageNumber,
        color: state.currentColor,
        data: drawingData,
      };

      dispatch(addAnnotation(annotation));
    }

    setCurrentPath([]);
  }, [currentPath, documentUri, pageNumber, state.currentColor, dispatch]);

  const redrawAnnotations = useCallback(
    (annotations: IAnnotation[]) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      annotations
        .filter(
          (ann) =>
            ann.type === "drawing" &&
            ann.pageNumber === pageNumber &&
            ann.documentUri === documentUri
        )
        .forEach((ann) => {
          const data = ann.data as IDrawingData;
          if (!data?.paths) return;

          ctx.strokeStyle = ann.color;
          ctx.lineWidth = data.strokeWidth || 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          data.paths.forEach((path) => {
            if (path.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            path.slice(1).forEach((point) => {
              ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
          });
        });
    },
    [canvasRef, pageNumber, documentUri]
  );

  return {
    startDrawing,
    draw,
    stopDrawing,
    redrawAnnotations,
    isDrawing: state.isDrawing,
  };
};
