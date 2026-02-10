import { FC } from '../../../../node_modules/react';
import { IThumbnail } from '../state/actions';

interface ThumbnailItemProps {
    thumbnail: IThumbnail;
    isSelected: boolean;
    width: number;
    onClick: () => void;
}
export declare const ThumbnailItem: FC<ThumbnailItemProps>;
export {};
