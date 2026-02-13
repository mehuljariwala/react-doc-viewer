import React, { ReactNode } from "react";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

const TXTRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  return (
    <div id="txt-renderer" className="rdv-txt-container">
      {currentDocument?.fileData as ReactNode}
    </div>
  );
};

export default TXTRenderer;

TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
