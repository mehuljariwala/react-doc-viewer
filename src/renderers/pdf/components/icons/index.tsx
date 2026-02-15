import { IIconProps } from "../../../../components/icons";

const STROKE_WIDTH = 1.8;
const DEFAULT_COLOR = "#4b5563";

export const PrevPDFNavIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const NextPDFNavIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const DownloadPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const ZoomInPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const ZoomOutPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const ResetZoomPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

export const PrintPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

export const FullscreenPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export const ExitFullscreenPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export const SearchPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const BookmarksPDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20l-6.5-4L7 22V4.5A2.5 2.5 0 0 1 9.5 2z" />
  </svg>
);

export const ClosePDFIcon = ({ color, size }: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const TogglePaginationPDFIcon = ({
  color,
  size,
  reverse,
}: IIconProps) => (
  <svg
    width={size || "16"}
    height={size || "16"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || DEFAULT_COLOR}
    strokeWidth={STROKE_WIDTH}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {reverse ? (
      <>
        <rect x="4" y="1" width="16" height="10" rx="1.5" />
        <rect x="4" y="13" width="16" height="10" rx="1.5" />
        <path d="M12 11v2" />
        <polyline points="9 12.5 12 14 15 12.5" />
      </>
    ) : (
      <>
        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    )}
  </svg>
);
