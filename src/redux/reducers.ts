import {combineReducers} from 'redux';
import {FETCH_ALL_ITEMS_SUCCESS, SET_SUGGESTIONS} from 'Redux/actions';

const initialState = {
  suggestions: [] as string[],
  items: [] as object[],
};

const autocompleteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
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

const rootReducer = combineReducers({
  autocomplete: autocompleteReducer,
  articles: itemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
