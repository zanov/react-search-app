import {createSelector} from 'reselect';
import {RootState} from './configureStore';

// SearchList selectors - only memoize the one that transforms data
export const selectSearchListItems = createSelector(
  [(state: RootState) => state.searchList?.items],
  (items) => items || [],
);

// Simple selectors - no need for memoization since they just return primitive values or direct references
export const selectSearchListDuration = (state: RootState) => state.searchList?.duration || 0;

// Autocomplete selectors - only memoize the ones that transform data
export const selectFetchedSuggestions = createSelector(
  [(state: RootState) => state.articles?.items],
  (items) => items?.map((res: any) => res.title) || [],
);

// Simple selectors - no need for memoization since they just return values directly
export const selectFetchedItems = (state: RootState) => state.articles?.items || [];

export const selectRecentHistoryTitles = (state: RootState) => state.recentHistory?.titles || [];

export const selectAutocompleteSuggestions = (state: RootState) => state.autocomplete.suggestions;
