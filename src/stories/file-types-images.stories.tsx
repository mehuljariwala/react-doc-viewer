import { DocViewerRenderers } from "../renderers";
import DocViewer from "../DocViewer";

import jpgFile from "../exampleFiles/jpg-image.jpg?url";
import pngFile from "../exampleFiles/png-image.png?url";
import gifFile from "../exampleFiles/gif-image.gif?url";
import bmpFile from "../exampleFiles/bmp-image.bmp?url";
import webpFile from "../exampleFiles/webp-file.webp?url";

export default {
  title: "DocViewer/File Types/Images",
};

export const JPG = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: jpgFile, fileName: "photo.jpg" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const PNG = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: pngFile, fileName: "image.png" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const GIF = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: gifFile, fileName: "animation.gif" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const BMP = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: bmpFile, fileName: "image.bmp" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);

export const WebP = () => (
  <div style={{ height: "100vh" }}>
    <DocViewer
      documents={[{ uri: webpFile, fileName: "image.webp" }]}
      pluginRenderers={DocViewerRenderers}
    />
  </div>
);
