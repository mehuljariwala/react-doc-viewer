import React, { FC, useContext } from "react";
import { AnnotationContext } from "../state";
import { setCurrentColor } from "../state/actions";

export const ColorPicker: FC = () => {
  const { state, dispatch } = useContext(AnnotationContext);

  return (
    <div className="rdv-color-picker">
      {state.availableColors.map((color) => (
        <button
          key={color}
          className="rdv-color-btn"
          style={{ backgroundColor: color }}
          {...(state.currentColor === color ? { "data-selected": "" } : {})}
          onClick={() => dispatch(setCurrentColor(color))}
          title={color}
          aria-label={`Select color ${color}`}
          aria-pressed={state.currentColor === color}
        />
      ))}
    </div>
  );
};
