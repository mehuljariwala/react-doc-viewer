import "core-js/proposals/promise-with-resolvers";
import React, { CSSProperties, forwardRef, memo, useRef, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import { defaultTheme } from "./defaultTheme";
import { AvailableLanguages } from "./i18n";
import {
  DocRenderer,
  DocViewerRef,
  IConfig,
  IDocument,
  ITheme,
} from "./models";
import { DocViewerRenderers } from "./renderers";
import { DocViewerProvider, DocViewerProviderRef } from "./store/DocViewerProvider";
import { DropZoneOverlay, useDragDrop } from "./features/drag-drop";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  prefetchMethod?: string;
  requestHeaders?: Record<string, string>;
  initialActiveDocument?: IDocument;
  language?: AvailableLanguages;
  activeDocument?: IDocument;
  onDocumentChange?: (document: IDocument) => void;
  jumpToPage?: number;
}

const DocViewer = forwardRef<DocViewerRef, DocViewerProps>((props, ref) => {
  const { documents, theme, config } = props;
  const dragDropConfig = config?.dragDrop;
  const enableDragDrop = dragDropConfig?.enableDragDrop ?? false;
  const providerRef = useRef<DocViewerProviderRef>(null);

  const {
    dragState,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useDragDrop();

  const onFilesDropped = useCallback(
    (files: File[]) => {
      providerRef.current?.handleFilesDropped(files);
    },
    []
  );

  if (!documents) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }

  return (
    <DocViewerProvider
      ref={ref}
      providerRef={providerRef}
      pluginRenderers={DocViewerRenderers}
      {...props}
      dragDropConfig={enableDragDrop ? dragDropConfig : undefined}
    >
      <ThemeProvider
        theme={theme ? { ...defaultTheme, ...theme } : defaultTheme}
      >
        <Container
          id="react-doc-viewer"
          data-testid="react-doc-viewer"
          className={props.className}
          style={props.style}
          onDragEnter={enableDragDrop ? handleDragEnter : undefined}
          onDragLeave={enableDragDrop ? handleDragLeave : undefined}
          onDragOver={enableDragDrop ? handleDragOver : undefined}
          onDrop={
            enableDragDrop
              ? (e) => handleDrop(e, onFilesDropped)
              : undefined
          }
        >
          <HeaderBar />
          <ProxyRenderer />
          {enableDragDrop && <DropZoneOverlay dragState={dragState} />}
        </Container>
      </ThemeProvider>
    </DocViewerProvider>
  );
});

export default memo(DocViewer);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  height: 100%;
  position: relative;
`;
