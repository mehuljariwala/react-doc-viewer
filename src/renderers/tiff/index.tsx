import React, { useEffect, useState } from "react";
import { DocRenderer } from "../..";
import { useTranslation } from "../../hooks/useTranslation";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
import ImageProxyRenderer from "../image";
import { parseTIFF } from "./tiffToCanvas";

const TIFFRenderer: DocRenderer = (props) => {
  const {
    mainState: { currentDocument },
  } = props;
  const { t } = useTranslation();

  const [loadedCanvas, setLoadedCanvas] = useState(false);
  const [corruptedFile, setCorruptedFile] = useState(false);

  useEffect(() => {
    if (!currentDocument || loadedCanvas) return;
    const canvas = document.getElementById("tiff-img");

    try {
      canvas && parseTIFF(currentDocument.fileData as ArrayBuffer, canvas);
      setLoadedCanvas(true);
    } catch (error) {
      setCorruptedFile(true);
    }
  }, [currentDocument, loadedCanvas]);

  if (corruptedFile) {
    return (
      <ImageProxyRenderer {...props}>
        <div>{t("brokenFile")}</div>
      </ImageProxyRenderer>
    );
  }

  return (
    <ImageProxyRenderer {...props}>
      <canvas id="tiff-img" className="rdv-tiff-canvas" />
    </ImageProxyRenderer>
  );
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = arrayBufferFileLoader;

export default TIFFRenderer;
