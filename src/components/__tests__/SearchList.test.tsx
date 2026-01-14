import React from 'react';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchList from '../SearchList';

const mockStore = configureStore([]);

const mockItems = [
  {
    id: 1,
    title: 'First Article',
    description: 'Description of first article',
    url: 'https://example1.com',
  },
  {
    id: 2,
    title: 'Second Article',
    description: 'Description of second article',
    url: 'https://example2.com',
  },
];

describe('SearchList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      searchList: {
        items: [],
        duration: 0,
      },
    });
  });

  it('renders nothing when there are no items', () => {
    render(
      <Provider store={store}>
        <SearchList />
      </Provider>,
    );

    expect(screen.queryByText(/results for/)).not.toBeInTheDocument();
  });

  it('renders search results with duration when items exist', () => {
    store = mockStore({
      searchList: {
        items: mockItems,
        duration: 1500, // 1.5 seconds
      },
    });

    render(
      <Provider store={store}>
        <SearchList />
      </Provider>,
    );

    expect(screen.getByText('2 results for 1.500 seconds')).toBeInTheDocument();

    // Check that both items are rendered
    expect(screen.getByText('First Article')).toBeInTheDocument();
    expect(screen.getByText('Second Article')).toBeInTheDocument();
    expect(screen.getByText('Description of first article')).toBeInTheDocument();
    expect(screen.getByText('Description of second article')).toBeInTheDocument();
  });

  it('renders with zero duration', () => {
    store = mockStore({
      searchList: {
        items: [mockItems[0]],
        duration: 0,
      },
    });

    render(
      <Provider store={store}>
        <SearchList />
      </Provider>,
    );

    expect(screen.getByText('1 results for 0.000 seconds')).toBeInTheDocument();
  });

  it('handles empty searchList state gracefully', () => {
    store = mockStore({
      searchList: null,
    });

    render(
      <Provider store={store}>
        <SearchList />
      </Provider>,
    );

    expect(screen.queryByText(/results for/)).not.toBeInTheDocument();
  });
});
