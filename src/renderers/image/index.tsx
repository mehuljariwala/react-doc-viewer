import React from "react";
import { DocRenderer } from "../..";

const ImageProxyRenderer: DocRenderer = ({
  mainState: { currentDocument },
  children,
}) => {
  if (!currentDocument) return null;

  return (
    <div id="image-renderer" className="rdv-image-container">
      {children || (
        <img id="image-img" className="rdv-image-img" src={currentDocument.fileData as string} />
      )}
    </div>
  );
};

export default ImageProxyRenderer;

ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
