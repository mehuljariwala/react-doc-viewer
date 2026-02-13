import { FC, ReactElement, ComponentType, PropsWithChildren } from "react";
import { IMainState } from "./store/mainStateReducer";
import { FileLoaderFunction } from "./utils/fileLoaders";

export interface IDragDropConfig {
  enableDragDrop?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  dropBehavior?: "append" | "replace";
  onDrop?: (files: File[]) => void;
  onDropRejected?: (files: File[], reason: "file-type" | "file-size" | "unknown") => void;
}

export interface IThumbnailConfig {
  enableThumbnails?: boolean;
  thumbnailWidth?: number;
  sidebarDefaultOpen?: boolean;
}

export interface IAnnotationConfig {
  enableAnnotations?: boolean;
  defaultColor?: string;
  colors?: string[];
  tools?: ("select" | "highlight" | "pen" | "comment" | "eraser")[];
  onAnnotationChange?: (annotations: IAnnotation[]) => void;
  initialAnnotations?: IAnnotation[];
}

export interface IAnnotation {
  id: string;
  type: "highlight" | "drawing" | "comment";
  documentUri: string;
  pageNumber: number;
  color: string;
  data?: IHighlightData | IDrawingData | ICommentData;
}

export interface IHighlightData {
  rects: Array<{ x: number; y: number; width: number; height: number }>;
  text?: string;
}

export interface IDrawingData {
  paths: Array<{ x: number; y: number }[]>;
  strokeWidth: number;
}

export interface ICommentData {
  x: number;
  y: number;
  text: string;
  author?: string;
  timestamp?: number;
}

export interface IPrintConfig {
  enablePrint?: boolean;
}

export interface IFullscreenConfig {
  enableFullscreen?: boolean;
}

export interface ILoadingProgressConfig {
  enableProgressBar?: boolean;
}

export interface IWatermarkConfig {
  text: string;
  opacity?: number;
  fontSize?: number;
  color?: string;
  rotation?: number;
}

export interface ITextSelectionConfig {
  enableTextSelection?: boolean;
}

export interface IKeyboardConfig {
  enableKeyboardShortcuts?: boolean;
}

export interface IPasswordConfig {
  enablePasswordPrompt?: boolean;
}

export interface ISearchConfig {
  enableSearch?: boolean;
}

export interface IBookmarksConfig {
  enableBookmarks?: boolean;
}

export interface ISplitViewConfig {
  enableSplitView?: boolean;
  syncScroll?: boolean;
}

export interface IConfig {
  header?: IHeaderConfig;
  loadingRenderer?: ILoadingRendererConfig;
  noRenderer?: INoRendererConfig;
  csvDelimiter?: string;
  pdfZoom?: IPdfZoomConfig;
  pdfVerticalScrollByDefault?: boolean;
  dragDrop?: IDragDropConfig;
  thumbnail?: IThumbnailConfig;
  annotations?: IAnnotationConfig;
  themeMode?: "light" | "dark" | "auto";
  print?: IPrintConfig;
  fullscreen?: IFullscreenConfig;
  loadingProgress?: ILoadingProgressConfig;
  watermark?: IWatermarkConfig;
  textSelection?: ITextSelectionConfig;
  keyboard?: IKeyboardConfig;
  password?: IPasswordConfig;
  search?: ISearchConfig;
  bookmarks?: IBookmarksConfig;
  splitView?: ISplitViewConfig;
}

export interface ILoadingRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
  showLoadingTimeout?: false | number;
}

export interface INoRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
}

export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
  retainURLParams?: boolean;
  overrideComponent?: IHeaderOverride;
}

export interface IPdfZoomConfig {
  defaultZoom: number;
  zoomJump: number;
}

export type IHeaderOverride = (
  state: IMainState,
  previousDocument: () => void,
  nextDocument: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => ReactElement<any, any> | null;

export interface ITheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  disableThemeScrollbar?: boolean;
}


export interface IDocument {
  uri: string;
  fileType?: string;
  fileData?: string | ArrayBuffer;
  fileName?: string;
}

export interface DocRendererProps {
  mainState: IMainState;
}

export interface DocRenderer extends FC<PropsWithChildren<DocRendererProps>> {
  fileTypes: string[];
  weight: number;
  fileLoader?: FileLoaderFunction | null | undefined;
}

export interface DocViewerRef {
  prev: () => void;
  next: () => void;
  goToPage: (pageNumber: number) => void;
}
