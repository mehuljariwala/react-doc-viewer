import { IStyledProps } from '../..';

interface ButtonProps extends IStyledProps {
    disabled?: boolean;
}
export declare const ButtonPrimaryStyle: import('styled-components').RuleSet<object>;
export declare const ButtonSecondaryStyle: import('styled-components').RuleSet<object>;
export declare const Button: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components/dist/types').Substitute<import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ButtonProps>> & string;
export declare const LinkButton: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components').FastOmit<import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, never>> & string;
export declare const ButtonPrimary: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components').FastOmit<Omit<import('styled-components').FastOmit<import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, keyof ButtonProps> & ButtonProps, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | import('../../../node_modules/react').RefObject<HTMLButtonElement> | null | undefined;
}, never>> & string;
export declare const ButtonSecondary: import('styled-components/dist/types').IStyledComponentBase<"web", import('styled-components').FastOmit<Omit<import('styled-components').FastOmit<import('../../../node_modules/react').DetailedHTMLProps<import('../../../node_modules/react').ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, keyof ButtonProps> & ButtonProps, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | import('../../../node_modules/react').RefObject<HTMLButtonElement> | null | undefined;
}, never>> & string;
export {};
