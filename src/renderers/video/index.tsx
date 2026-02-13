import React from "react";
import { DocRenderer } from "../..";

const VideoRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  if (!currentDocument) return null;

  return (
    <div id="video-renderer" className="rdv-video-container">
      <video className="rdv-video-player" controls src={currentDocument.uri} />
    </div>
  );
};

export default VideoRenderer;

VideoRenderer.fileTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
VideoRenderer.weight = 0;
