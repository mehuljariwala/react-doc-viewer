import React, { CSSProperties, forwardRef, memo, useRef, useCallback, useMemo, useEffect, useState } from "react";
import "./cssStyles";
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
  const themeMode = config?.themeMode ?? "light";
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    themeMode === "auto" ? "light" : themeMode,
  );

  useEffect(() => {
    if (themeMode !== "auto") {
      setResolvedTheme(themeMode);
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setResolvedTheme(mq.matches ? "dark" : "light");
    const handler = (e: MediaQueryListEvent) =>
      setResolvedTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

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

  const mergedTheme = useMemo(
    () => (theme ? { ...defaultTheme, ...theme } : defaultTheme),
    [theme]
  );

  const cssVarStyle = useMemo((): CSSProperties => ({
    "--rdv-primary": mergedTheme.primary,
    "--rdv-secondary": mergedTheme.secondary,
    "--rdv-tertiary": mergedTheme.tertiary,
    "--rdv-text-primary": mergedTheme.textPrimary,
    "--rdv-text-secondary": mergedTheme.textSecondary,
    "--rdv-text-tertiary": mergedTheme.textTertiary,
    ...props.style,
  } as CSSProperties), [mergedTheme, props.style]);

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
      <div
        id="react-doc-viewer"
        data-testid="react-doc-viewer"
        data-theme={resolvedTheme}
        className={`rdv-container ${props.className || ""}`}
        style={cssVarStyle}
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
      </div>
    </DocViewerProvider>
  );
});

export default memo(DocViewer);
