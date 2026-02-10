import { FC } from '../../../../node_modules/react';
import { IAnnotation } from '../types';

interface CommentPopoverProps {
    annotation: IAnnotation;
    onClose: () => void;
}
export declare const CommentPopover: FC<CommentPopoverProps>;
export {};
