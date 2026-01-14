import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Autocomplete from '../Autocomplete';

const mockStore = configureMockStore([]);

const mockArticles = [
  {
    id: 1,
    title: 'Apple Pie Recipe',
    description: 'How to make apple pie',
    url: 'https://example.com/apple-pie',
  },
  {
    id: 2,
    title: 'Banana Bread Recipe',
    description: 'How to make banana bread',
    url: 'https://example.com/banana-bread',
  },
  {
    id: 3,
    title: 'Cherry Tart Recipe',
    description: 'How to make cherry tart',
    url: 'https://example.com/cherry-tart',
  },
];

const mockTitles = mockArticles.map((article) => article.title);

describe('Autocomplete', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      autocomplete: {
        suggestions: [],
      },
      articles: {
        items: mockArticles,
      },
      recentHistory: {
        titles: [],
      },
    });
  });

  it('renders the input field', () => {
    render(
      <Provider store={store}>
        <Autocomplete />
      </Provider>,
    );

    const input = screen.getByLabelText('Autocomplete Search Input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('updates input value when typing', async () => {
    render(
      <Provider store={store}>
        <Autocomplete />
      </Provider>,
    );

    const input = screen.getByLabelText('Autocomplete Search Input');
    await userEvent.type(input, 'test search');

    expect(input).toHaveValue('test search');
  });

  it('shows suggestions when input has value and suggestions exist', () => {
    store = mockStore({
      autocomplete: {
        suggestions: ['Apple Pie Recipe', 'Banana Bread Recipe'],
      },
      articles: {
        items: mockArticles,
      },
      recentHistory: {
        titles: [],
      },
    });

    render(
      <Provider store={store}>
        <Autocomplete />
      </Provider>,
    );

    // Focus the input to show suggestions
    const input = screen.getByLabelText('Autocomplete Search Input');
    fireEvent.focus(input);

    expect(screen.getByText('Apple Pie Recipe')).toBeInTheDocument();
    expect(screen.getByText('Banana Bread Recipe')).toBeInTheDocument();
  });

  it('shows recent history items in bold', () => {
    store = mockStore({
      autocomplete: {
        suggestions: ['Apple Pie Recipe'],
      },
      articles: {
        items: mockArticles,
      },
      recentHistory: {
        titles: ['Apple Pie Recipe'],
      },
    });

    render(
      <Provider store={store}>
        <Autocomplete />
      </Provider>,
    );

    const input = screen.getByLabelText('Autocomplete Search Input');
    fireEvent.focus(input);

    const suggestion = screen.getByText('Apple Pie Recipe');
    expect(suggestion).toHaveClass('fw-bold');
  });
});
