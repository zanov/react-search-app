import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/reducers';
import SearchListItem from './SearchListItem';

const SearchList = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = performance.now();
  const searchListItems = useSelector((state: RootState) => state.searchList?.items);
  const endTime = performance.now();

  //Fake time results calculation
  useEffect(() => {
    setElapsedTime(endTime - startTime);
  }, [searchListItems]);

  return (
    <>
      {searchListItems.length > 0 && (
        <div>
          <div className='mb-2 text-muted'>
            {searchListItems.length} results for {elapsedTime} seconds
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
