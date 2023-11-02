import React from 'react';
import Autocomplete from 'Components/Autocomplete';
import SearchList from './SearchList';
import useFetchItems from 'src/hooks/useFetchItems';

const App = () => {
  useFetchItems();
  return (
    <div className='container'>
      <div className='row'>
        <Autocomplete />
        <SearchList />
      </div>
    </div>
  );
};

export default App;
