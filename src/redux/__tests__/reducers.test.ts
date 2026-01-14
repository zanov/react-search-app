import rootReducer, {
  autocompleteReducer,
  itemsReducer,
  searchListReducer,
  recentHistoryReducer,
} from '../reducers';
import {
  SET_SUGGESTIONS,
  CLEAR_SUGGESTION,
  FETCH_ALL_ITEMS_SUCCESS,
  SET_SEARCH_LIST,
  SET_RECENT_ITEM_TITLE,
  CLEAR_RECENT_ITEM_TITLE,
} from '../actions';

describe('Redux Reducers', () => {
  describe('autocompleteReducer', () => {
    const initialState = {
      suggestions: [],
    };

    it('should return the initial state', () => {
      expect(autocompleteReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it('should handle SET_SUGGESTIONS', () => {
      const suggestions = ['test1', 'test2'];
      const action = {
        type: SET_SUGGESTIONS,
        suggestions,
      };
      const expectedState = {
        suggestions,
      };
      expect(autocompleteReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CLEAR_SUGGESTION', () => {
      const initialStateWithSuggestions = {
        suggestions: ['test1', 'test2', 'test3'],
      };
      const action = {
        type: CLEAR_SUGGESTION,
        title: 'test2',
      };
      const expectedState = {
        suggestions: ['test1', 'test3'],
      };
      expect(autocompleteReducer(initialStateWithSuggestions, action)).toEqual(expectedState);
    });
  });

  describe('itemsReducer', () => {
    const initialState = {
      items: [],
    };

    it('should return the initial state', () => {
      expect(itemsReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it('should handle FETCH_ALL_ITEMS_SUCCESS', () => {
      const articles = [
        {id: 1, title: 'Article 1'},
        {id: 2, title: 'Article 2'},
      ];
      const action = {
        type: FETCH_ALL_ITEMS_SUCCESS,
        payload: articles,
      };
      const expectedState = {
        items: articles,
      };
      expect(itemsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('searchListReducer', () => {
    const initialState = {
      items: [],
      duration: 0,
    };

    it('should return the initial state', () => {
      expect(searchListReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it('should handle SET_SEARCH_LIST with startTime', () => {
      const results = [{id: 1, title: 'Result 1'}];
      const startTime = Date.now() - 100; // 100ms ago
      const action = {
        type: SET_SEARCH_LIST,
        payload: results,
        meta: {startTime},
      };

      const result = searchListReducer(initialState, action);
      expect(result.items).toEqual(results);
      expect(result.duration).toBeGreaterThanOrEqual(100);
    });

    it('should handle SET_SEARCH_LIST without startTime', () => {
      const results = [{id: 1, title: 'Result 1'}];
      const action = {
        type: SET_SEARCH_LIST,
        payload: results,
      };

      const result = searchListReducer(initialState, action);
      expect(result.items).toEqual(results);
      expect(result.duration).toBe(0);
    });
  });

  describe('recentHistoryReducer', () => {
    const initialState = {
      titles: [],
    };

    it('should return the initial state', () => {
      expect(recentHistoryReducer(undefined, {type: undefined})).toEqual(initialState);
    });

    it('should handle SET_RECENT_ITEM_TITLE', () => {
      const title = 'Recent Title';
      const action = {
        type: SET_RECENT_ITEM_TITLE,
        title,
      };
      const expectedState = {
        titles: [title],
      };
      expect(recentHistoryReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle CLEAR_RECENT_ITEM_TITLE', () => {
      const initialStateWithTitles = {
        titles: ['title1', 'title2', 'title3'],
      };
      const action = {
        type: CLEAR_RECENT_ITEM_TITLE,
        title: 'title2',
      };
      const expectedState = {
        titles: ['title1', 'title3'],
      };
      expect(recentHistoryReducer(initialStateWithTitles, action)).toEqual(expectedState);
    });
  });

  describe('rootReducer', () => {
    it('should combine all reducers', () => {
      const initialState = rootReducer(undefined, {type: undefined});
      expect(initialState).toHaveProperty('autocomplete');
      expect(initialState).toHaveProperty('articles');
      expect(initialState).toHaveProperty('searchList');
      expect(initialState).toHaveProperty('recentHistory');
    });
  });
});
