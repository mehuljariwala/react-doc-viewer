import { FC, useContext } from "react";
import { ThumbnailContext } from "../state";
import { setSidebarOpen } from "../state/actions";

interface ThumbnailToggleProps {
  title?: string;
}

export const ThumbnailToggle: FC<ThumbnailToggleProps> = ({
  title = "Toggle thumbnails",
}) => {
  const { state, dispatch } = useContext(ThumbnailContext);

  return (
    <button
      className="rdv-toolbar-btn"
      onClick={() => dispatch(setSidebarOpen(!state.isOpen))}
      title={title}
      aria-label={title}
      aria-pressed={state.isOpen}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4b5563"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: state.isOpen ? 1 : 0.7 }}
      >
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="9" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </button>
  );
};
