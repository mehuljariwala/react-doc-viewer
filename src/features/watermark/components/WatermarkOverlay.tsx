import React, { FC, useMemo } from "react";
import { IWatermarkConfig } from "../../../models";

interface Props {
  config: IWatermarkConfig;
}

export const WatermarkOverlay: FC<Props> = ({ config }) => {
  const {
    text,
    opacity = 0.1,
    fontSize = 48,
    color = "#000",
    rotation = -30,
  } = config;

  const items = useMemo(() => {
    const count = 20;
    return Array.from({ length: count }, (_, i) => i);
  }, []);

  return (
    <div
      className="rdv-watermark-overlay"
      style={{ opacity }}
    >
      {items.map((i) => (
        <span
          key={i}
          className="rdv-watermark-text"
          style={{
            fontSize: `${fontSize}px`,
            color,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
};
