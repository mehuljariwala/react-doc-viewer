import { ThumbnailActions, IThumbnail } from './actions';

export interface IThumbnailState {
    isOpen: boolean;
    thumbnails: IThumbnail[];
    selectedPage: number;
    thumbnailWidth: number;
}
export declare const initialThumbnailState: IThumbnailState;
export type ThumbnailStateReducer = (state: IThumbnailState, action: ThumbnailActions) => IThumbnailState;
export declare const thumbnailReducer: ThumbnailStateReducer;
