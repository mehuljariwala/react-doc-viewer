import { SearchAction, SearchMatch } from '../types';

export declare const setSearchQuery: (value: string) => SearchAction;
export declare const setSearchMatches: (value: SearchMatch[]) => SearchAction;
export declare const setCurrentMatchIndex: (value: number) => SearchAction;
export declare const setSearchOpen: (value: boolean) => SearchAction;
export declare const setIsSearching: (value: boolean) => SearchAction;
export declare const nextMatch: () => SearchAction;
export declare const prevMatch: () => SearchAction;
export declare const resetSearch: () => SearchAction;
