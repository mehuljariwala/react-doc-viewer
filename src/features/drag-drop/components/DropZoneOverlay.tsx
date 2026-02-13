import React, { FC } from "react";
import { IDragState } from "../types";

interface DropZoneOverlayProps {
  dragState: IDragState;
  dropMessage?: string;
}

export const DropZoneOverlay: FC<DropZoneOverlayProps> = ({
  dragState,
  dropMessage = "Drop files here",
}) => {
  if (!dragState.isOverDropZone) return null;

  return (
    <div className="rdv-dropzone-overlay">
      <div className="rdv-dropzone-content">
        <DropIcon />
        <span className="rdv-dropzone-message">{dropMessage}</span>
      </div>
    </div>
  );
};

const DropIcon: FC = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
