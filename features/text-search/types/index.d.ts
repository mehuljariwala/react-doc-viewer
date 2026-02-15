export interface SearchMatch {
    pageIndex: number;
    matchIndex: number;
    text: string;
}
export interface ISearchState {
    query: string;
    matches: SearchMatch[];
    currentMatchIndex: number;
    isOpen: boolean;
    isSearching: boolean;
}
export type SearchAction = {
    type: "SET_QUERY";
    value: string;
} | {
    type: "SET_MATCHES";
    value: SearchMatch[];
} | {
    type: "SET_CURRENT_MATCH_INDEX";
    value: number;
} | {
    type: "SET_IS_OPEN";
    value: boolean;
} | {
    type: "SET_IS_SEARCHING";
    value: boolean;
} | {
    type: "NEXT_MATCH";
} | {
    type: "PREV_MATCH";
} | {
    type: "RESET";
};
