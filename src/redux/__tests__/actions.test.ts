import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchAllItems,
  fetchAllItemsBegin,
  fetchAllItemsSuccess,
  fetchAllItemsFailure,
  setSuggestions,
  clearSuggestion,
  setSearchList,
  setRecentHistoryTitle,
  clearRecentHistoryTitle,
  FETCH_ALL_ITEMS_BEGIN,
  FETCH_ALL_ITEMS_SUCCESS,
  FETCH_ALL_ITEMS_FAILURE,
  SET_SUGGESTIONS,
  CLEAR_SUGGESTION,
  SET_SEARCH_LIST,
  SET_RECENT_ITEM_TITLE,
  CLEAR_RECENT_ITEM_TITLE,
} from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux Actions', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Synchronous Actions', () => {
    it('should create an action to set suggestions', () => {
      const suggestions = ['test1', 'test2'];
      const expectedAction = {
        type: SET_SUGGESTIONS,
        suggestions,
      };
      expect(setSuggestions(suggestions)).toEqual(expectedAction);
    });

    it('should create an action to clear suggestion', () => {
      const title = 'test title';
      const expectedAction = {
        type: CLEAR_SUGGESTION,
        title,
      };
      expect(clearSuggestion(title)).toEqual(expectedAction);
    });

    it('should create an action to set search list', () => {
      const results = [{id: 1, title: 'Test'}];
      const startTime = 1234567890;
      const expectedAction = {
        type: SET_SEARCH_LIST,
        payload: results,
        meta: {startTime},
      };
      expect(setSearchList(results, startTime)).toEqual(expectedAction);
    });

    it('should create an action to set recent history title', () => {
      const title = 'recent title';
      const expectedAction = {
        type: SET_RECENT_ITEM_TITLE,
        title,
      };
      expect(setRecentHistoryTitle(title)).toEqual(expectedAction);
    });

    it('should create an action to clear recent history title', () => {
      const title = 'recent title';
      const expectedAction = {
        type: CLEAR_RECENT_ITEM_TITLE,
        title,
      };
      expect(clearRecentHistoryTitle(title)).toEqual(expectedAction);
    });

    it('should create an action to begin fetching items', () => {
      const expectedAction = {
        type: FETCH_ALL_ITEMS_BEGIN,
      };
      expect(fetchAllItemsBegin()).toEqual(expectedAction);
    });

    it('should create an action for successful fetch', () => {
      const data = {articles: [{id: 1, title: 'Test Article'}]};
      const expectedAction = {
        type: FETCH_ALL_ITEMS_SUCCESS,
        payload: data.articles,
      };
      expect(fetchAllItemsSuccess(data)).toEqual(expectedAction);
    });

    it('should create an action for failed fetch', () => {
      const error = new Error('Network error');
      const expectedAction = {
        type: FETCH_ALL_ITEMS_FAILURE,
        payload: {error},
      };
      expect(fetchAllItemsFailure(error)).toEqual(expectedAction);
    });
  });

  describe('Asynchronous Actions', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    it('should dispatch success actions when fetchAllItems succeeds', async () => {
      const mockData = {articles: [{id: 1, title: 'Test Article'}]};
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const expectedActions = [
        {type: FETCH_ALL_ITEMS_BEGIN},
        {type: FETCH_ALL_ITEMS_SUCCESS, payload: mockData.articles},
      ];

      const store = mockStore({});
      await store.dispatch(fetchAllItems() as any);

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch failure actions when fetchAllItems fails', async () => {
      const mockError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      const expectedActions = [
        {type: FETCH_ALL_ITEMS_BEGIN},
        {type: FETCH_ALL_ITEMS_FAILURE, payload: {error: mockError}},
      ];

      const store = mockStore({});
      await expect(store.dispatch(fetchAllItems() as any)).rejects.toThrow('Network error');

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
