import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/reducers';
import {selectSearchListItems, selectSearchListDuration} from '../redux/selectors';
import SearchListItem from './SearchListItem';

const SearchList = () => {
  const searchListItems = useSelector(selectSearchListItems);
  const duration = useSelector(selectSearchListDuration);

  const seconds = (duration / 1000).toFixed(3);

  return (
    <>
      {searchListItems.length > 0 && (
        <div>
          <div className='mb-2 text-muted'>
            {searchListItems.length} results for {seconds} seconds
          </div>
          {searchListItems.map((item: object, index: number) => (
            <SearchListItem key={index} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchList;
