import React, {useEffect} from 'react';
import Autocomplete from 'Components/Autocomplete';
import {useDispatch} from 'react-redux';
import {fetchAllItems} from 'Redux/actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);
  return (
    <div>
      <Autocomplete />
    </div>
  );
};

export default App;
