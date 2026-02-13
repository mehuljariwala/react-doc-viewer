import React, { FC, useContext } from "react";
import { ThumbnailContext } from "../state";
import { setSidebarOpen } from "../state/actions";

interface ThumbnailToggleProps {
  title?: string;
}

export const ThumbnailToggle: FC<ThumbnailToggleProps> = ({
  title = "Toggle thumbnails",
}) => {
  const { state, dispatch } = useContext(ThumbnailContext);

  const handleToggle = () => {
    dispatch(setSidebarOpen(!state.isOpen));
  };

  return (
    <button
      className="rdv-thumbnail-toggle"
      onClick={handleToggle}
      title={title}
      aria-label={title}
      aria-pressed={state.isOpen}
    >
      <ThumbnailIcon isOpen={state.isOpen} />
    </button>
  );
};

const ThumbnailIcon: FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="70%"
    height="70%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ opacity: isOpen ? 1 : 0.7 }}
  >
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="9" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
