import { useCallback, useContext, useEffect } from "react";
import { ThumbnailContext } from "../state";
import { IThumbnail, setThumbnails, updateSingleThumbnail } from "../state/actions";

interface UseThumbnailGeneratorProps {
  numPages: number;
  documentUri?: string;
  scale?: number;
}

export const useThumbnailGenerator = ({
  numPages,
  documentUri,
  scale = 0.15,
}: UseThumbnailGeneratorProps) => {
  const { state, dispatch } = useContext(ThumbnailContext);

  const initializeThumbnails = useCallback(() => {
    if (numPages > 0) {
      const thumbnails: IThumbnail[] = Array.from(
        { length: numPages },
        (_, i) => ({
          pageNumber: i + 1,
          isLoading: true,
        })
      );
      dispatch(setThumbnails(thumbnails));
    }
  }, [numPages, dispatch]);

  const generateThumbnailFromCanvas = useCallback(
    (canvas: HTMLCanvasElement, pageNumber: number) => {
      try {
        const dataUrl = canvas.toDataURL("image/png", 0.8);
        dispatch(updateSingleThumbnail(pageNumber, dataUrl));
      } catch {
        dispatch(updateSingleThumbnail(pageNumber, ""));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    initializeThumbnails();
  }, [numPages, documentUri, initializeThumbnails]);

  return {
    thumbnails: state.thumbnails,
    generateThumbnailFromCanvas,
    scale,
  };
};
