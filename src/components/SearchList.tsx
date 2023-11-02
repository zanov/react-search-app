import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/reducers';
import SearchListItem from './SearchListItem';

const SearchList = () => {
  const searchListItems = useSelector((state: RootState) => state.searchList?.items);
  return (
    <div>
      {searchListItems.map((item: object, index: number) => (
        <SearchListItem key={index} item={item} />
      ))}
    </div>
  );
};

export default SearchList;
