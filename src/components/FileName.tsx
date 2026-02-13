"use client";

import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { getFileName } from "../utils/getFileName";

export const FileName: FC = () => {
  const {
    state: { config, currentDocument },
  } = useContext(DocViewerContext);

  if (!currentDocument || config?.header?.disableFileName) return null;

  const fileName = getFileName(
    currentDocument,
    config?.header?.retainURLParams || false,
  );

  return (
    <div id="file-name" data-testid="file-name" className="rdv-file-name">
      {fileName}
    </div>
  );
};
