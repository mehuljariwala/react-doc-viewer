import { Dispatch, useContext, useEffect, useRef, useState } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import {
  MainStateActions,
  setDocumentLoading,
  updateCurrentDocument,
} from "../store/actions";
import { IMainState } from "../store/mainStateReducer";
import { DocRenderer } from "..";
import {
  defaultFileLoader,
  FileLoaderComplete,
  FileLoaderFuncProps,
} from "../utils/fileLoaders";
import { useRendererSelector } from "./useRendererSelector";
import {
  DEFAULT_CONVERTIBLE_TYPES,
  isConversionEnabled,
  convertDocumentToPdf,
} from "../utils/server-conversion";

/**
 * Custom Hook for loading the current document into context
 */
export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument, prefetchMethod } = state;

  const { CurrentRenderer } = useRendererSelector();

  const documentURI = currentDocument?.uri || "";

  const conversionConfig = state.config?.serverConversion;
  const conversionEnabled = isConversionEnabled(conversionConfig);

  const conversionAttemptedRef = useRef<Record<string, boolean>>({});
  const [skipConversion, setSkipConversion] = useState(false);

  useEffect(() => {
    conversionAttemptedRef.current = {};
    setSkipConversion(false);
  }, [currentFileNo, documentURI]);

  useEffect(
    () => {
      if (!currentDocument || currentDocument.fileType !== undefined) return;

      const controller = new AbortController();
      const { signal } = controller;

      fetch(documentURI, {
        method:
          prefetchMethod || documentURI.startsWith("blob:") ? "GET" : "HEAD",
        signal,
        headers: state?.requestHeaders,
      })
        .then((response) => {
          const contentTypeRaw = response.headers.get("content-type");
          const contentTypes = contentTypeRaw?.split(";") || [];
          const contentType = contentTypes.length ? contentTypes[0] : undefined;

          dispatch(
            updateCurrentDocument({
              ...currentDocument,
              fileType: contentType || undefined,
            }),
          );
        })
        .catch((error) => {
          if (error?.name !== "AbortError") {
            throw error;
          }
        });

      return () => {
        controller.abort();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI, currentDocument],
  );

  useEffect(() => {
    if (!currentDocument?.fileType || !conversionEnabled || !conversionConfig)
      return;
    if (skipConversion) return;
    if (conversionAttemptedRef.current[currentDocument.uri]) return;

    const eligibleTypes =
      conversionConfig.eligibleFileTypes ?? DEFAULT_CONVERTIBLE_TYPES;
    const fileType = currentDocument.fileType;

    if (fileType === "application/pdf") return;
    if (!eligibleTypes.includes(fileType)) return;

    conversionAttemptedRef.current[currentDocument.uri] = true;

    const controller = new AbortController();
    const { signal } = controller;

    conversionConfig.onConversionStart?.(currentDocument);

    convertDocumentToPdf(
      currentDocument.uri,
      currentDocument.fileName || "document",
      signal,
      conversionConfig,
      state.requestHeaders,
    )
      .then((pdfBuffer) => {
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(
            updateCurrentDocument({
              ...currentDocument,
              fileType: "application/pdf",
              fileData: reader.result as string,
            }),
          );
          dispatch(setDocumentLoading(false));
          conversionConfig.onConversionComplete?.(currentDocument);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error: Error) => {
        if (error.name === "AbortError") return;

        conversionConfig.onConversionError?.(currentDocument, error);

        if (conversionConfig.fallbackToClientRenderer !== false) {
          setSkipConversion(true);
        } else {
          dispatch(setDocumentLoading(false));
        }
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDocument?.fileType, conversionEnabled, skipConversion]);

  useEffect(() => {
    if (!currentDocument || CurrentRenderer === undefined) return;

    if (
      conversionEnabled &&
      !skipConversion &&
      currentDocument.fileType &&
      currentDocument.fileType !== "application/pdf"
    ) {
      const eligibleTypes =
        conversionConfig?.eligibleFileTypes ?? DEFAULT_CONVERTIBLE_TYPES;
      if (eligibleTypes.includes(currentDocument.fileType)) return;
    }

    if (currentDocument.fileData) {
      dispatch(setDocumentLoading(false));
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fileLoaderComplete: FileLoaderComplete = (fileReader) => {
      if (!currentDocument || !fileReader) {
        dispatch(setDocumentLoading(false));
        return;
      }

      const updatedDocument = { ...currentDocument };
      if (fileReader.result !== null) {
        updatedDocument.fileData = fileReader.result;
      }

      dispatch(updateCurrentDocument(updatedDocument));
      dispatch(setDocumentLoading(false));
    };

    const loaderFunctionProps: FileLoaderFuncProps = {
      documentURI,
      signal,
      fileLoaderComplete,
      headers: state?.requestHeaders,
    };

    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.(loaderFunctionProps);
    } else {
      defaultFileLoader(loaderFunctionProps);
    }

    return () => {
      controller.abort();
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [CurrentRenderer, currentFileNo, skipConversion]);

  return { state, dispatch, CurrentRenderer };
};
