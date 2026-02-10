import { FC } from '../../../../node_modules/react';

interface ThumbnailSidebarProps {
    onPageSelect: (pageNumber: number) => void;
    currentPage: number;
}
export declare const ThumbnailSidebar: FC<ThumbnailSidebarProps>;
export {};
