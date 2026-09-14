import { FC } from '../../../../node_modules/react';
import { ISelectionToolbarConfig } from '../../../models';

interface AnnotationLayerProps {
    pageNumber: number;
    documentUri: string;
    width: number;
    height: number;
    selectionToolbarConfig?: ISelectionToolbarConfig;
}
export declare const AnnotationLayer: FC<AnnotationLayerProps>;
export {};
