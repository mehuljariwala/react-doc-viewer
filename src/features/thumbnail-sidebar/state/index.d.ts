import { default as React, Dispatch, FC, PropsWithChildren } from '../../../../node_modules/react';
import { IThumbnailConfig } from '../../../models';
import { ThumbnailActions } from './actions';
import { IThumbnailState } from './reducer';

interface ThumbnailContextValue {
    state: IThumbnailState;
    dispatch: Dispatch<ThumbnailActions>;
}
export declare const ThumbnailContext: React.Context<ThumbnailContextValue>;
interface ThumbnailProviderProps {
    config?: IThumbnailConfig;
}
export declare const ThumbnailProvider: FC<PropsWithChildren<ThumbnailProviderProps>>;
export {};
