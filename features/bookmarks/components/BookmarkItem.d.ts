import { FC } from '../../../../node_modules/react';
import { OutlineItem } from '../types';

interface Props {
    item: OutlineItem;
    depth: number;
    onNavigate: (pageIndex: number) => void;
}
export declare const BookmarkItem: FC<Props>;
export {};
