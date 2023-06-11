import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HandView from '../DealHand';


describe('DealHand component', () => {
  test('renders without error', () => {
    render(<HandView />);
  });

  test('displays correct name', () => {
    const name = 'Player 1';
    render(<HandView name={name} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test('calls getHand function when button is clicked', () => {
    const getHandMock = jest.fn();
    const n = 2;
    const name = 'Board';
    render(<HandView n={n} hand={{}} name={name} getHand={getHandMock} />);
    fireEvent.click(screen.getByText(`Deal ${name}`));
    expect(getHandMock).toHaveBeenCalledWith(n, name);
  });

});
