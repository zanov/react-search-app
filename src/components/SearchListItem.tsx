import React, {memo} from 'react';

const SearchListItem = memo(function SearchListItem({item}: any) {
  return (
    <div className='mb-4'>
      <h5>
        <a href={item.url} target='_blank'>
          {item.title}
        </a>
      </h5>
      <div>{item.description}</div>
    </div>
  );
});

export default SearchListItem;
