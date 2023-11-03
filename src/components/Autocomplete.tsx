import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSuggestions,
  setSearchList,
  clearSuggestion,
  setRecentHistoryTitle,
  clearRecentHistoryTitle,
} from 'Redux/actions';
import {RootState} from 'Redux/configureStore';

const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const suggestions = useSelector((state: RootState) => state.autocomplete.suggestions);
  const fetchedSuggestions = useSelector(
    (state: RootState) => state.articles?.items?.map((res: any) => res.title),
  );
  const fetchedItems = useSelector((state: RootState) => state.articles?.items);
  const recentHistoryTitles = useSelector((state: RootState) => state.recentHistory?.titles);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const blurTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 1) {
      const filteredSuggestions = fetchedSuggestions.filter((item: string) =>
        item.toLowerCase().startsWith(value.toLowerCase()),
      );
      dispatch(setSuggestions(filteredSuggestions.slice(0, 10)));
      setIsSuggestionsVisible(true);
    } else {
      dispatch(setSuggestions([]));
      setIsSuggestionsVisible(false);
    }
  };

  const handleSelect = (selectedTitle: string) => {
    const results = fetchedItems.filter((item: any) =>
      item.title.toLowerCase().includes(selectedTitle.toLowerCase()),
    );
    dispatch(setSearchList(results));
    dispatch(setRecentHistoryTitle(selectedTitle));
    setIsSuggestionsVisible(false);
  };

  const handleFocus = () => {
    setIsSuggestionsVisible(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setIsSuggestionsVisible(false);
    }, 200);
  };

  const handleClearSuggestion = (title: string) => {
    dispatch(clearSuggestion(title));
    dispatch(clearRecentHistoryTitle(title));
  };

  const handleSuggestionFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  };

  const renderSuggestion = useCallback(
    (suggestion: string, index: number) => {
      return (
        <li key={index}>
          <span
            style={{cursor: 'pointer'}}
            onClick={() => handleSelect(suggestion)}
            onFocus={handleSuggestionFocus}
            className={`${recentHistoryTitles.includes(suggestion) ? 'fw-bold' : ''}`}
          >
            {suggestion}
          </span>{' '}
          {suggestions.includes(suggestion) && (
            <button
              onClick={(e) => handleClearSuggestion(suggestion)}
              className='btn-close'
            ></button>
          )}
        </li>
      );
    },
    [suggestions, recentHistoryTitles],
  );

  return (
    <div className='m-2 col-md-12'>
      <label htmlFor='autocomplete' className='mb-2'>
        Autocomplete Search Input
      </label>
      <div className='input-group mb-3'>
        <input
          id='autocomplete'
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          className='form-control'
        />
      </div>
      <ul>
        {isSuggestionsVisible &&
          suggestions.map((suggestion: string, index: number) =>
            renderSuggestion(suggestion, index),
          )}
      </ul>
    </div>
  );
};

export default Autocomplete;
