import {combineReducers} from 'redux';
import {
  CLEAR_RECENT_ITEM_TITLE,
  CLEAR_SUGGESTION,
  FETCH_ALL_ITEMS_SUCCESS,
  SET_RECENT_ITEM_TITLE,
  SET_SEARCH_LIST,
  SET_SUGGESTIONS,
} from 'Redux/actions';

const autocompleteInitialState = {
  suggestions: [] as string[],
};

const itemsInitialState = {
  items: [] as object[],
};

const searchListInitialState = {
  items: [] as object[],
  duration: 0 as number,
};

const recentHistoryInitialState = {
  titles: [] as string[],
};

export const autocompleteReducer = (state = autocompleteInitialState, action: any) => {
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

export const itemsReducer = (state = itemsInitialState, action: any) => {
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

export const searchListReducer = (state = searchListInitialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_LIST: {
      const start = action.meta?.startTime;
      const duration = start ? Date.now() - start : 0;
      return {
        ...state,
        items: action.payload,
        duration,
      };
    }
    default:
      return state;
  }
};

export const recentHistoryReducer = (state = recentHistoryInitialState, action: any) => {
  switch (action.type) {
    case SET_RECENT_ITEM_TITLE:
      return {
        ...state,
        titles: [...state.titles, action.title],
      };
    case CLEAR_RECENT_ITEM_TITLE:
      return {
        ...state,
        titles: state.titles.filter((item) => item !== action.title),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  autocomplete: autocompleteReducer,
  articles: itemsReducer,
  searchList: searchListReducer,
  recentHistory: recentHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
