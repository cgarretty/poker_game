import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hand from '../Hand';

describe('Hand component', () => {
  test('renders hand', () => {
    const hand = {
      hand: [
        { rank: 'A', suit: '♦' },
        { rank: 'K', suit: '♥' },
      ],
    };

    render(<Hand hand={hand} />);

    const card1 = screen.getByText('A of ♦');
    const card2 = screen.getByText('K of ♥');

    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();

  });

  test('does not render hand when no hand is passed', () => {
    render(<Hand />);

    const handElement = screen.queryByText(/hand/i);

    expect(handElement).not.toBeInTheDocument();
  });
});
