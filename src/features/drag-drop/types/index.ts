export interface IDragDropConfig {
  enableDragDrop?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  dropBehavior?: "append" | "replace";
  onDrop?: (files: File[]) => void;
  onDropRejected?: (files: File[], reason: DropRejectionReason) => void;
}

export type DropRejectionReason = "file-type" | "file-size" | "unknown";

export interface IDragState {
  isDragging: boolean;
  isOverDropZone: boolean;
}

export interface IProcessedFile {
  uri: string;
  fileType: string;
  fileName: string;
  fileData: string;
}
