import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LikeButton from '../src/components/LikeButton';

describe('LikeButton', () => {
  it('should render the component', () => {
    render(<LikeButton />);
  });

  it('should call handleLike when the button is pressed and the post is not liked', () => {
    const handleLikeMock = jest.fn();
    const { getByTestId } = render(<LikeButton handleLike={handleLikeMock} reservat={false} />);
    fireEvent.press(getByTestId('resrvarButton'));
    expect(handleLikeMock).toHaveBeenCalled();
  });

  it('should call handleUnlike when the button is pressed and the post is already liked', () => {
    const handleUnlikeMock = jest.fn();
    const { getByTestId } = render(<ReservarButton handleUnlike={handleUnlikeMock} reservat={true} />);
    fireEvent.press(getByTestId('reservarButton'));
    expect(handleUnlikeMock).toHaveBeenCalled();
  });
});
