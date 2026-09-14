import { FC } from '../../../../node_modules/react';
import { ISelectionToolbarConfig } from '../../../models';

interface SelectionToolbarProps {
    position: {
        x: number;
        y: number;
        arrowDirection: "down" | "up";
    };
    selectedText: string;
    pageNumber: number;
    config: ISelectionToolbarConfig;
    onHighlight: (color: string) => void;
    onCopy: () => void;
    onDismiss: () => void;
}
export declare const SelectionToolbar: FC<SelectionToolbarProps>;
export {};
