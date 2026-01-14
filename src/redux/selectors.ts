import {createSelector} from 'reselect';
import {RootState} from './configureStore';

// SearchList selectors - these need memoization because they transform data
export const selectSearchListItems = createSelector(
  [(state: RootState) => state.searchList?.items],
  (items) => items || [],
);

export const selectSearchListDuration = createSelector(
  [(state: RootState) => state.searchList?.duration],
  (duration) => duration || 0,
);

// Autocomplete selectors - only memoize the ones that transform data
export const selectFetchedSuggestions = createSelector(
  [(state: RootState) => state.articles?.items],
  (items) => items?.map((res: any) => res.title) || [],
);

// Simple selectors - no need for memoization since they just return values directly
export const selectFetchedItems = (state: RootState) => state.articles?.items || [];

export const selectRecentHistoryTitles = (state: RootState) => state.recentHistory?.titles || [];

export const selectAutocompleteSuggestions = (state: RootState) => state.autocomplete.suggestions;
