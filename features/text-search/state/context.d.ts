import { Dispatch } from '../../../../node_modules/react';
import { ISearchState, SearchAction } from '../types';

export interface ISearchContext {
    state: ISearchState;
    dispatch: Dispatch<SearchAction>;
}
export declare const SearchContext: import('../../../../node_modules/react').Context<ISearchContext>;
