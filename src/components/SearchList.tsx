import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/reducers';

const SearchList = () => {
  const searchListItems = useSelector((state: RootState) => state.searchList?.items);
  return (
    <ul>
      {searchListItems.map((item, index) => (
        <li key={index}>
          <h4>
            <a href={item.url} target='_blank'>
              {item.title}
            </a>
          </h4>
          <div>{item.description}</div>
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
