import React from "react";
import { DocRenderer } from "../..";
import ImageProxyRenderer from "../image";

const PNGRenderer: DocRenderer = (props) => (
  <div className="rdv-png-checkerboard">
    <ImageProxyRenderer {...props} />
  </div>
);

PNGRenderer.fileTypes = ["png", "image/png"];
PNGRenderer.weight = 0;

export default PNGRenderer;
