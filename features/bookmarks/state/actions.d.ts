import { BookmarksAction, OutlineItem } from '../types';

export declare const setOutline: (value: OutlineItem[]) => BookmarksAction;
export declare const setBookmarksOpen: (value: boolean) => BookmarksAction;
export declare const setBookmarksLoading: (value: boolean) => BookmarksAction;
export declare const toggleBookmarksOpen: () => BookmarksAction;
