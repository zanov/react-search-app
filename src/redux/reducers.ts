import {combineReducers} from 'redux';
import {
  CLEAR_SUGGESTION,
  FETCH_ALL_ITEMS_SUCCESS,
  SET_SEARCH_LIST,
  SET_SUGGESTIONS,
} from 'Redux/actions';

const initialState = {
  suggestions: [] as string[],
  items: [] as object[],
  searchList: [] as object[],
};

const autocompleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
      };
    case CLEAR_SUGGESTION:
      return {
        ...state,
        suggestions: state.suggestions.filter((item) => item !== action.title),
      };
    default:
      return state;
  }
};

const itemsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

const searchListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_LIST:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  autocomplete: autocompleteReducer,
  articles: itemsReducer,
  searchList: searchListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
