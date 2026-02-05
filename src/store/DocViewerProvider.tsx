import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  PropsWithChildren,
  useImperativeHandle,
  forwardRef,
  useCallback,
  RefObject,
} from "react";
import { DocViewerRef, IDragDropConfig, IDocument } from "..";
import { DocViewerProps } from "../DocViewer";
import { defaultLanguage, locales } from "../i18n";
import {
  MainStateActions,
  nextDocument,
  previousDocument,
  setAllDocuments,
  setMainConfig,
  updateCurrentDocument,
  addDocumentsFromDrop,
  goToPage,
} from "./actions";
import {
  IMainState,
  initialState,
  mainStateReducer,
  MainStateReducer,
} from "./mainStateReducer";
import { useFileProcessor } from "../features/drag-drop";

export interface DocViewerProviderRef {
  handleFilesDropped: (files: File[]) => Promise<void>;
}

interface ExtendedDocViewerProps extends DocViewerProps {
  dragDropConfig?: IDragDropConfig;
  providerRef?: RefObject<DocViewerProviderRef>;
}

const DocViewerContext = createContext<{
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  addDroppedDocuments?: (documents: IDocument[]) => void;
}>({ state: initialState, dispatch: () => null });

const DocViewerProvider = forwardRef<
  DocViewerRef,
  PropsWithChildren<ExtendedDocViewerProps>
>((props, ref) => {
  const {
    children,
    documents,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    initialActiveDocument,
    language,
    activeDocument,
    onDocumentChange,
    dragDropConfig,
    providerRef,
    jumpToPage,
  } = props;

  const { processFiles, validateFiles } = useFileProcessor(dragDropConfig);

  const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument:
      documents && documents.length
        ? initialActiveDocument
          ? initialActiveDocument
          : documents[0]
        : undefined,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    currentFileNo: initialActiveDocument
      ? documents.findIndex((doc) => doc === initialActiveDocument) ?? 0
      : 0,
    language: language && locales[language] ? language : defaultLanguage,
    activeDocument,
    onDocumentChange,
  });

  useEffect(() => {
    dispatch(setAllDocuments(documents, initialActiveDocument));
    config && dispatch(setMainConfig(config));
  }, [documents, config, initialActiveDocument]);

  useEffect(() => {
    if (activeDocument) {
      dispatch(updateCurrentDocument(activeDocument));
    }
  }, [activeDocument]);

  useEffect(() => {
    if (jumpToPage !== undefined && jumpToPage > 0) {
      dispatch(goToPage(jumpToPage));
    }
  }, [jumpToPage]);

  const addDroppedDocuments = useCallback(
    (newDocuments: IDocument[]) => {
      const behavior = dragDropConfig?.dropBehavior || "append";
      dispatch(addDocumentsFromDrop(newDocuments, behavior));
    },
    [dispatch, dragDropConfig]
  );

  const handleFilesDropped = useCallback(
    async (files: File[]) => {
      const { valid, invalidType, invalidSize } = validateFiles(files);

      if (invalidType.length > 0 && dragDropConfig?.onDropRejected) {
        dragDropConfig.onDropRejected(invalidType, "file-type");
      }
      if (invalidSize.length > 0 && dragDropConfig?.onDropRejected) {
        dragDropConfig.onDropRejected(invalidSize, "file-size");
      }

      if (valid.length > 0) {
        if (dragDropConfig?.onDrop) {
          dragDropConfig.onDrop(valid);
        }
        const processedDocs = await processFiles(valid);
        if (processedDocs.length > 0) {
          addDroppedDocuments(processedDocs);
        }
      }
    },
    [validateFiles, processFiles, addDroppedDocuments, dragDropConfig]
  );

  useImperativeHandle(
    ref,
    () => ({
      prev() {
        dispatch(previousDocument());
      },
      next() {
        dispatch(nextDocument());
      },
      goToPage(pageNumber: number) {
        dispatch(goToPage(pageNumber));
      },
    }),
    [dispatch],
  );

  useEffect(() => {
    if (providerRef) {
      (providerRef as React.MutableRefObject<DocViewerProviderRef>).current = {
        handleFilesDropped,
      };
    }
  }, [providerRef, handleFilesDropped]);

  return (
    <DocViewerContext.Provider
      value={{ state, dispatch, addDroppedDocuments }}
    >
      {children}
    </DocViewerContext.Provider>
  );
});

export { DocViewerContext, DocViewerProvider };
