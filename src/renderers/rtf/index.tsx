import { useMemo, ReactNode } from "react";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

function stripRtf(rtf: string): string {
  let result = rtf;

  let prev = "";
  while (prev !== result) {
    prev = result;
    result = result.replace(/\{[^{}]*\}/g, "");
  }

  result = result.replace(/\\par\b/g, "\n");
  result = result.replace(/\\line\b/g, "\n");
  result = result.replace(/\\tab\b/g, "\t");
  result = result.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );

  result = result.replace(/\\[a-z]+[-]?\d*\s?/gi, "");
  result = result.replace(/\\/g, "");
  result = result.replace(/[{}]/g, "");

  result = result.replace(/\r\n/g, "\n");
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim();
}

const RTFRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const textContent = useMemo(() => {
    if (!currentDocument?.fileData) return "";
    return stripRtf(currentDocument.fileData as string);
  }, [currentDocument?.fileData]);

  return (
    <div id="rtf-renderer" className="rdv-txt-container">
      {textContent as ReactNode}
    </div>
  );
};

export default RTFRenderer;

RTFRenderer.fileTypes = ["rtf", "application/rtf", "text/rtf"];
RTFRenderer.weight = 0;
RTFRenderer.fileLoader = textFileLoader;
