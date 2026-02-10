import { IThumbnail } from '../state/actions';

interface UseThumbnailGeneratorProps {
    numPages: number;
    documentUri?: string;
    scale?: number;
}
export declare const useThumbnailGenerator: ({ numPages, documentUri, scale, }: UseThumbnailGeneratorProps) => {
    thumbnails: IThumbnail[];
    generateThumbnailFromCanvas: (canvas: HTMLCanvasElement, pageNumber: number) => void;
    scale: number;
};
export {};
