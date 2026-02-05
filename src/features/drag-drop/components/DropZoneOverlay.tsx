import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { IStyledProps } from "../../../models";
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
    <Overlay>
      <DropZoneContent>
        <DropIcon />
        <DropMessage>{dropMessage}</DropMessage>
      </DropZoneContent>
    </Overlay>
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

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 100, 200, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;

const DropZoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  border: 3px dashed rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  color: white;
`;

const DropMessage = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
