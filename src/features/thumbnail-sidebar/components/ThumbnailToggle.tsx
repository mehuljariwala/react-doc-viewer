import React, { FC, useContext } from "react";
import styled from "styled-components";
import { IStyledProps } from "../../../models";
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
    <ToggleButton
      onClick={handleToggle}
      title={title}
      aria-label={title}
      aria-pressed={state.isOpen}
    >
      <ThumbnailIcon isOpen={state.isOpen} />
    </ToggleButton>
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

const ToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 0 0 0 5px;
  border: 0;
  outline: none;
  cursor: pointer;
  border-radius: 30px;
  background-color: ${(props: IStyledProps) => props.theme.primary};
  color: ${(props: IStyledProps) => props.theme.textPrimary};
  box-shadow: 2px 2px 3px #00000033;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
