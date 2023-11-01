import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setSuggestions} from 'Redux/actions';
import {RootState} from 'Redux/configureStore';

const Autocomplete: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const suggestions = useSelector((state: RootState) => state.autocomplete.suggestions);
  const fetchedSuggestions = useSelector(
    (state: RootState) => state.articles?.items?.map((res) => res.title),
  );
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const filteredSuggestions = fetchedSuggestions.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (searchTerm.length >= 2) {
      dispatch(setSuggestions(filteredSuggestions.slice(0, 10)));
    } else {
      dispatch(setSuggestions([]));
    }
  }, [searchTerm, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
