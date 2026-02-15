import { Dispatch } from '../../../../node_modules/react';
import { IBookmarksState, BookmarksAction } from '../types';

export interface IBookmarksContext {
    state: IBookmarksState;
    dispatch: Dispatch<BookmarksAction>;
}
export declare const BookmarksContext: import('../../../../node_modules/react').Context<IBookmarksContext>;
