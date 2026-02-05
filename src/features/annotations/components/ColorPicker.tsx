import React, { FC, useContext } from "react";
import styled from "styled-components";
import { AnnotationContext } from "../state";
import { setCurrentColor } from "../state/actions";

export const ColorPicker: FC = () => {
  const { state, dispatch } = useContext(AnnotationContext);

  return (
    <Container>
      {state.availableColors.map((color) => (
        <ColorButton
          key={color}
          $color={color}
          $isSelected={state.currentColor === color}
          onClick={() => dispatch(setCurrentColor(color))}
          title={color}
          aria-label={`Select color ${color}`}
          aria-pressed={state.currentColor === color}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface ColorButtonProps {
  $color: string;
  $isSelected: boolean;
}

const ColorButton = styled.button<ColorButtonProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$isSelected ? "#333" : "transparent")};
  background-color: ${(props) => props.$color};
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;
  padding: 0;

  &:hover {
    transform: scale(1.15);
  }

  &:focus {
    outline: 2px solid #0064c8;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
