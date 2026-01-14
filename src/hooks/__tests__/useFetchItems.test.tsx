import React from 'react';
import {renderHook} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import useFetchItems from '../useFetchItems';
import {fetchAllItems} from '../../redux/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('useFetchItems', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      articles: {
        items: [],
      },
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve([]),
    });
  });

  it('dispatches fetchAllItems on mount', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <Provider store={store}>{children}</Provider>
    );

    renderHook(() => useFetchItems(), {
      wrapper,
    });

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual({type: 'FETCH_ALL_ITEMS_BEGIN'});
  });

  it('only dispatches once on mount', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {rerender} = renderHook(() => useFetchItems(), {
      wrapper,
    });

    // Rerender the hook
    rerender();

    // Should still only have one action
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
  });
});
