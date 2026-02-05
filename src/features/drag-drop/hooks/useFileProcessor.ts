import { useCallback } from "react";
import { IDocument } from "../../../models";
import { IDragDropConfig, IProcessedFile } from "../types";

const DEFAULT_ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/tiff",
  "text/plain",
  "text/html",
  "text/csv",
  "video/mp4",
  "video/webm",
];

const DEFAULT_MAX_SIZE = 50 * 1024 * 1024; // 50MB

export const useFileProcessor = (config?: IDragDropConfig) => {
  const acceptedTypes = config?.acceptedFileTypes || DEFAULT_ACCEPTED_TYPES;
  const maxFileSize = config?.maxFileSize || DEFAULT_MAX_SIZE;

  const isFileTypeAccepted = useCallback(
    (file: File): boolean => {
      const fileType = file.type.toLowerCase();
      const extension = file.name.split(".").pop()?.toLowerCase() || "";

      return acceptedTypes.some((accepted) => {
        if (accepted.includes("*")) {
          const [type] = accepted.split("/");
          return fileType.startsWith(type);
        }
        if (accepted.startsWith(".")) {
          return `.${extension}` === accepted.toLowerCase();
        }
        return (
          fileType === accepted.toLowerCase() ||
          extension === accepted.toLowerCase()
        );
      });
    },
    [acceptedTypes]
  );

  const isFileSizeValid = useCallback(
    (file: File): boolean => {
      return file.size <= maxFileSize;
    },
    [maxFileSize]
  );

  const processFile = useCallback((file: File): Promise<IProcessedFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve({
          uri: URL.createObjectURL(file),
          fileType: file.type || getFileTypeFromName(file.name),
          fileName: file.name,
          fileData: result,
        });
      };

      reader.onerror = () => {
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const processFiles = useCallback(
    async (files: File[]): Promise<IDocument[]> => {
      const validFiles = files.filter(
        (file) => isFileTypeAccepted(file) && isFileSizeValid(file)
      );

      const processed = await Promise.all(validFiles.map(processFile));

      return processed.map((file) => ({
        uri: file.uri,
        fileType: file.fileType,
        fileName: file.fileName,
        fileData: file.fileData,
      }));
    },
    [isFileTypeAccepted, isFileSizeValid, processFile]
  );

  const validateFiles = useCallback(
    (
      files: File[]
    ): {
      valid: File[];
      invalidType: File[];
      invalidSize: File[];
    } => {
      const valid: File[] = [];
      const invalidType: File[] = [];
      const invalidSize: File[] = [];

      files.forEach((file) => {
        if (!isFileTypeAccepted(file)) {
          invalidType.push(file);
        } else if (!isFileSizeValid(file)) {
          invalidSize.push(file);
        } else {
          valid.push(file);
        }
      });

      return { valid, invalidType, invalidSize };
    },
    [isFileTypeAccepted, isFileSizeValid]
  );

  return {
    processFiles,
    validateFiles,
    isFileTypeAccepted,
    isFileSizeValid,
  };
};

function getFileTypeFromName(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    bmp: "image/bmp",
    webp: "image/webp",
    tiff: "image/tiff",
    tif: "image/tiff",
    txt: "text/plain",
    html: "text/html",
    htm: "text/html",
    csv: "text/csv",
    mp4: "video/mp4",
    webm: "video/webm",
  };
  return mimeTypes[extension] || "application/octet-stream";
}
