import { RefObject } from '../../node_modules/react';

export declare function useFullscreen(elementRef: RefObject<HTMLElement | null>): {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
};
