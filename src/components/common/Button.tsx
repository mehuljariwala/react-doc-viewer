import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button: FC<ButtonProps> = ({ className = "", ...props }) => (
  <button className={`rdv-btn ${className}`} {...props} />
);

export const ButtonPrimary: FC<ButtonProps> = ({ className = "", ...props }) => (
  <button className={`rdv-btn ${className}`} {...props} />
);

export const ButtonSecondary: FC<ButtonProps> = ({
  className = "",
  ...props
}) => <button className={`rdv-btn rdv-btn-secondary ${className}`} {...props} />;

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};

export const LinkButton: FC<LinkButtonProps> = ({
  className = "",
  ...props
}) => <a className={`rdv-link-btn ${className}`} {...props} />;
