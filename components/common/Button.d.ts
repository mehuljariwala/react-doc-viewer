import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from '../../../node_modules/react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
};
export declare const Button: FC<ButtonProps>;
export declare const ButtonPrimary: FC<ButtonProps>;
export declare const ButtonSecondary: FC<ButtonProps>;
type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
};
export declare const LinkButton: FC<LinkButtonProps>;
export {};
