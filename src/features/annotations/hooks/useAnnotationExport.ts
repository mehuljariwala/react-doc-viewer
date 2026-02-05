import { useCallback, useContext } from "react";
import { AnnotationContext } from "../state";
import { IAnnotation } from "../types";

export const useAnnotationExport = () => {
  const { state } = useContext(AnnotationContext);

  const exportAnnotations = useCallback((): IAnnotation[] => {
    return state.annotations;
  }, [state.annotations]);

  const exportAsJSON = useCallback((): string => {
    return JSON.stringify(state.annotations, null, 2);
  }, [state.annotations]);

  const downloadAnnotations = useCallback(
    (filename = "annotations.json") => {
      const json = exportAsJSON();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [exportAsJSON]
  );

  const getAnnotationsForPage = useCallback(
    (pageNumber: number, documentUri: string): IAnnotation[] => {
      return state.annotations.filter(
        (ann) =>
          ann.pageNumber === pageNumber && ann.documentUri === documentUri
      );
    },
    [state.annotations]
  );

  return {
    exportAnnotations,
    exportAsJSON,
    downloadAnnotations,
    getAnnotationsForPage,
    annotationCount: state.annotations.length,
  };
};
