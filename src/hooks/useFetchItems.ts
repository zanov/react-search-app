import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchAllItems} from 'Redux/actions';

const useFetchItems = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllItems());
  }, []);
};

export default useFetchItems;
