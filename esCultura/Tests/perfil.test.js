/*import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PerfilSimple from '../src/components/PerfilSimple';

describe('PerfilSimple', () => {
  it('should render the component', () => {
    render(<PrefilSimple />);
  });

  it('should call obrirdesplegable when the button is pressed and the post is not reservat', async () => {
    const desplegableAbierto = false;
    const veureSeguitsMock = jest.fn();
    const { getByTestId } = render(<PerfilSimple veureSiguits={veureSeguitsMock} desplegableAbierto={desplegableAbierto} />);
    fireEvent.press(getByTestId('PerfilSimple'));
    await  (()=> expect(desplegableAbierto).toBe(true));
  });

});*/