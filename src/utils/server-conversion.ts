import { IServerConversionConfig } from "../models";

export const DEFAULT_CONVERTIBLE_TYPES: string[] = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.text",
  "application/rtf",
  "text/csv",
  "text/plain",
  "text/html",
  "application/octet-stream",
  "docx",
  "doc",
  "xlsx",
  "xls",
  "pptx",
  "ppt",
  "odt",
  "rtf",
];

export function isConversionEnabled(
  config: IServerConversionConfig | undefined,
): boolean {
  if (!config?.serviceUrl) return false;
  return config.enabled !== false;
}

export async function convertDocumentToPdf(
  uri: string,
  fileName: string,
  signal: AbortSignal,
  config: IServerConversionConfig,
  requestHeaders?: Record<string, string>,
): Promise<ArrayBuffer> {
  const fileResponse = await fetch(uri, { signal, headers: requestHeaders });
  const blob = await fileResponse.blob();

  const formData = new FormData();
  const fieldName = config.fileFieldName ?? "files";
  formData.append(fieldName, blob, fileName || "document");

  if (config.additionalFormFields) {
    for (const [key, value] of Object.entries(config.additionalFormFields)) {
      formData.append(key, value);
    }
  }

  const conversionResponse = await fetch(config.serviceUrl, {
    method: "POST",
    body: formData,
    signal,
    headers: config.headers,
  });

  if (!conversionResponse.ok) {
    throw new Error(
      `Conversion failed: ${conversionResponse.status} ${conversionResponse.statusText}`,
    );
  }

  return conversionResponse.arrayBuffer();
}
