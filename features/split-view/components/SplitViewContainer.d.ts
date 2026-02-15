import { FC } from '../../../../node_modules/react';
import { DocViewerProps } from '../../../DocViewer';

interface SplitDocViewerProps {
    left: DocViewerProps;
    right: DocViewerProps;
    syncScroll?: boolean;
}
export declare const SplitDocViewer: FC<SplitDocViewerProps>;
export {};
