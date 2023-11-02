import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setSuggestions, setSearchList, clearSuggestion} from 'Redux/actions';
import {RootState} from 'Redux/configureStore';

const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const suggestions = useSelector((state: RootState) => state.autocomplete.suggestions);
  const fetchedSuggestions = useSelector(
    (state: RootState) => state.articles?.items?.map((res) => res.title),
  );
  const fetchedItems = useSelector((state: RootState) => state.articles?.items);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    const results = fetchedItems.filter((item: object) =>
      item.title.toLowerCase().includes(selectedTitle.toLowerCase()),
    );
    dispatch(setSearchList(results));
    setIsSuggestionsVisible(false);
  };

  const handleFocus = () => {
    setIsSuggestionsVisible(true);
  };

  const handleClearSuggestion = (title: string, event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearSuggestion(title));
    event.stopPropagation();
  };

  return (
    <div className='m-2'>
      <label htmlFor='autocomplete'>Autocomplete Search Input</label>
      <br />
      <input
        id='autocomplete'
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
      />
      <ul>
        {isSuggestionsVisible &&
          suggestions.map((suggestion: string, index: number) => (
            <li key={index} style={{cursor: 'pointer'}} onClick={() => handleSelect(suggestion)}>
              {suggestion}{' '}
              {suggestions.includes(suggestion) && (
                <button
                  onClick={(e) => handleClearSuggestion(suggestion, e)}
                  className='remove-button'
                >
                  X
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
