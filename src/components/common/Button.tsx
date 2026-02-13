import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, CSSProperties } from "react";

const btnBaseStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 35,
  height: 35,
  padding: 0,
  margin: 0,
  border: 0,
  outline: "none",
  cursor: "pointer",
  textDecoration: "none",
  borderRadius: 35,
  boxSizing: "border-box",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button: FC<ButtonProps> = ({ className = "", style, ...props }) => (
  <button className={`rdv-btn ${className}`} style={{ ...btnBaseStyle, ...style }} {...props} />
);

export const ButtonPrimary: FC<ButtonProps> = ({ className = "", style, ...props }) => (
  <button className={`rdv-btn ${className}`} style={{ ...btnBaseStyle, ...style }} {...props} />
);

export const ButtonSecondary: FC<ButtonProps> = ({
  className = "",
  style,
  ...props
}) => <button className={`rdv-btn rdv-btn-secondary ${className}`} style={{ ...btnBaseStyle, ...style }} {...props} />;

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};

export const LinkButton: FC<LinkButtonProps> = ({
  className = "",
  style,
  ...props
}) => <a className={`rdv-link-btn ${className}`} style={{ ...btnBaseStyle, ...style }} {...props} />;
