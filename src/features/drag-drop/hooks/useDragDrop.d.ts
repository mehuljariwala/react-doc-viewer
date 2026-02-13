import { DragEvent } from '../../../../node_modules/react';
import { IDragState } from '../types';

export declare const useDragDrop: () => {
    dragState: IDragState;
    handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>, onFilesDropped: (files: File[]) => void) => void;
    resetDragState: () => void;
};
