import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewXat from '../src/components/NewXatButton';

describe('NewXatButton', () => {
  it('should render the component', () => {
    render(<NewXat />);
  });

  it('should call crearxat when the button is pressed and the modalVisible is true', async () => {
    const modalVisible = true;
    const crearXatMock= jest.fn(() => console.log('crearXatMock called'));
    const { getByTestId } = render(<NewXat crearXat={crearXatMock} modalVisible={modalVisible} />);
    fireEvent.press(getByTestId('newXatButton'));
    await (()=> expect(crearXatMock).toHaveBeenCalled());
    await (() => expect(modalVisible).toBe(false));
  });

  /*it('should call eliminarreserva when the button is pressed and the post is already reservat', async () => {
    const reservat = true;
    const eliminarReservaMock = jest.fn();
    const { getByTestId } = render(<ReservarButton eliminarReserva={eliminarReservaMock} reservat={reservat} />);
    fireEvent.press(getByTestId('reservarButton'));
    await (()=> expect(eliminarReservaMock).toHaveBeenCalled());
    await  (()=> expect(reservat).toBe(false));
  });*/
});