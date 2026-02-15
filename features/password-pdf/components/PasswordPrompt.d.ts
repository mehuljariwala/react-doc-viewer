import { FC } from '../../../../node_modules/react';

interface Props {
    onSubmit: (password: string) => void;
    error?: boolean;
}
export declare const PasswordPrompt: FC<Props>;
export {};
