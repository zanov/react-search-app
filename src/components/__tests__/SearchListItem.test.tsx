import React from 'react';
import {render, screen} from '@testing-library/react';
import SearchListItem from '../SearchListItem';

const mockItem = {
  id: 1,
  title: 'Test Article Title',
  description: 'This is a test description for the article.',
  url: 'https://example.com',
};

describe('SearchListItem', () => {
  it('renders the item correctly', () => {
    render(<SearchListItem item={mockItem} />);

    expect(screen.getByRole('heading', {level: 5})).toHaveTextContent(mockItem.title);
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockItem.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent(mockItem.title);
  });

  it('renders with different item data', () => {
    const differentItem = {
      id: 2,
      title: 'Another Test Title',
      description: 'Another description here.',
      url: 'https://different-example.com',
    };

    render(<SearchListItem item={differentItem} />);

    expect(screen.getByRole('heading', {level: 5})).toHaveTextContent(differentItem.title);
    expect(screen.getByText(differentItem.description)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', differentItem.url);
  });
});
