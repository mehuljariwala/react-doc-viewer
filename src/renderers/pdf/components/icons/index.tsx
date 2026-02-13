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
    style={reverse ? { opacity: 0.9 } : undefined}
  >
    {reverse ? (
      <>
        <rect x="3" y="3" width="18" height="8" rx="1" />
        <rect x="3" y="13" width="18" height="8" rx="1" />
      </>
    ) : (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </>
    )}
  </svg>
);
