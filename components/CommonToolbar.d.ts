import { FC } from '../../node_modules/react';

interface CommonToolbarProps {
    zoomLevel: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onZoomReset: () => void;
    numPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
export declare const DEFAULT_ZOOM = 1;
export declare const CommonToolbar: FC<CommonToolbarProps>;
export {};
