export const FETCH_ALL_ITEMS_BEGIN = 'FETCH_ALL_ITEMS_BEGIN';
export const FETCH_ALL_ITEMS_SUCCESS = 'FETCH_ALL_ITEMS_SUCCESS';
export const FETCH_ALL_ITEMS_FAILURE = 'FETCH_ALL_ITEMS_FAILURE';

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';
export const CLEAR_SUGGESTION = 'CLEAR_SUGGESTION';
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';

export const SET_RECENT_ITEM_TITLE = 'SET_RECENT_ITEM_TITLE';
export const CLEAR_RECENT_ITEM_TITLE = 'CLEAR_RECENT_ITEM_TITLE';

export const setSuggestions = (suggestions: string[]) => ({
  type: SET_SUGGESTIONS,
  suggestions,
});

export const clearSuggestion = (title: string) => ({
  type: CLEAR_SUGGESTION,
  title,
});

export const setRecentHistoryTitle = (title: string) => ({
  type: SET_RECENT_ITEM_TITLE,
  title,
});

export const clearRecentHistoryTitle = (title: string) => ({
  type: CLEAR_RECENT_ITEM_TITLE,
  title,
});

export const setSearchList = (results: object[], startTime?: number) => ({
  type: SET_SEARCH_LIST,
  payload: results,
  meta: {startTime},
});

export const fetchAllItemsBegin = () => ({
  type: FETCH_ALL_ITEMS_BEGIN,
});

export const fetchAllItemsSuccess = (data: any) => ({
  type: FETCH_ALL_ITEMS_SUCCESS,
  payload: data.articles,
});

export const fetchAllItemsFailure = (error: any) => ({
  type: FETCH_ALL_ITEMS_FAILURE,
  payload: {error},
});

export const fetchAllItems = (filters = {}) => {
  return (dispatch: any) => {
    dispatch(fetchAllItemsBegin());

    const data = {...filters};

    return fetch('/api/get-data')
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchAllItemsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchAllItemsFailure(err));
        if (process.env.NODE_ENV !== 'test') {
          console.error('Error fetching data:', err);
        }
        return Promise.reject(err);
      });
  };
};
