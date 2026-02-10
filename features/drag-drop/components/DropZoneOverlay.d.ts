import { FC } from '../../../../node_modules/react';
import { IDragState } from '../types';

interface DropZoneOverlayProps {
    dragState: IDragState;
    dropMessage?: string;
}
export declare const DropZoneOverlay: FC<DropZoneOverlayProps>;
export {};
