import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import { DocRenderer } from "../..";
import { dataURLFileLoader } from "../../utils/fileLoaders";

const HTMLRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  useEffect(() => {
    const b64String = currentDocument?.fileData as string;

    let encoding = "";
    const bodyBase64 = b64String?.replace(
      /^data:text\/html;(?:charset=([^;]*);)?base64,/,
      (_, charset) => {
        encoding = charset || "utf-8";
        return "";
      },
    );
    let body: string = window.atob(bodyBase64);

    const buffer = Uint8Array.from(body, (c) => c.charCodeAt(0));
    body = new TextDecoder(encoding).decode(buffer);

    const iframeCont = document.getElementById(
      "html-body",
    ) as HTMLIFrameElement | null;

    const iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
    if (!iframe) return;

    const sanitizedBody = DOMPurify.sanitize(body, {
      WHOLE_DOCUMENT: true,
      ADD_TAGS: ["style", "link"],
      FORBID_TAGS: ["script", "object", "embed", "form"],
    });

    const iframeDoc = iframe.document;
    iframeDoc.open();
    iframeDoc.write(sanitizedBody);
    iframeDoc.close();
  }, [currentDocument]);

  return (
    <div id="html-renderer" className="rdv-html-container">
      <iframe id="html-body" className="rdv-html-iframe" sandbox="allow-same-origin" />
    </div>
  );
};

export default HTMLRenderer;

HTMLRenderer.fileTypes = ["htm", "html", "text/htm", "text/html"];
HTMLRenderer.weight = 0;
HTMLRenderer.fileLoader = dataURLFileLoader;
