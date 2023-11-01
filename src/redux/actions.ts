export const FETCH_ALL_ITEMS_BEGIN = 'FETCH_ALL_ITEMS_BEGIN';
export const FETCH_ALL_ITEMS_SUCCESS = 'FETCH_ALL_ITEMS_SUCCESS';
export const FETCH_ALL_ITEMS_FAILURE = 'FETCH_ALL_ITEMS_FAILURE';

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

export const setSuggestions = (suggestions: string[]) => ({
  type: SET_SUGGESTIONS,
  suggestions,
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
        console.error('Error fetching data:', err);
        return Promise.reject(err);
      });
  };
};
