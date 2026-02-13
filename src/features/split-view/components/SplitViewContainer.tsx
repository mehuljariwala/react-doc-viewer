import React, { FC, useState, useCallback, useRef, useEffect } from "react";
import DocViewer, { DocViewerProps } from "../../../DocViewer";

interface SplitDocViewerProps {
  left: DocViewerProps;
  right: DocViewerProps;
  syncScroll?: boolean;
}

export const SplitDocViewer: FC<SplitDocViewerProps> = ({
  left,
  right,
  syncScroll = false,
}) => {
  const [dividerPosition, setDividerPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = ((e.clientX - rect.left) / rect.width) * 100;
      setDividerPosition(Math.min(80, Math.max(20, pos)));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (!syncScroll) return;
    const leftEl = leftRef.current?.querySelector(".rdv-pdf-main-content");
    const rightEl = rightRef.current?.querySelector(".rdv-pdf-main-content");
    if (!leftEl || !rightEl) return;

    let syncing = false;

    const syncLeft = () => {
      if (syncing) return;
      syncing = true;
      rightEl.scrollTop = leftEl.scrollTop;
      syncing = false;
    };

    const syncRight = () => {
      if (syncing) return;
      syncing = true;
      leftEl.scrollTop = rightEl.scrollTop;
      syncing = false;
    };

    leftEl.addEventListener("scroll", syncLeft);
    rightEl.addEventListener("scroll", syncRight);
    return () => {
      leftEl.removeEventListener("scroll", syncLeft);
      rightEl.removeEventListener("scroll", syncRight);
    };
  }, [syncScroll]);

  return (
    <div className="rdv-split-container" ref={containerRef}>
      <div
        className="rdv-split-panel"
        style={{ width: `${dividerPosition}%` }}
        ref={leftRef}
      >
        <DocViewer {...left} />
      </div>
      <div
        className="rdv-split-divider"
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="vertical"
      />
      <div
        className="rdv-split-panel"
        style={{ width: `${100 - dividerPosition}%` }}
        ref={rightRef}
      >
        <DocViewer {...right} />
      </div>
    </div>
  );
};
