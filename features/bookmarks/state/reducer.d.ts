import { IBookmarksState, BookmarksAction } from '../types';

export declare const initialBookmarksState: IBookmarksState;
export declare function bookmarksReducer(state: IBookmarksState, action: BookmarksAction): IBookmarksState;
