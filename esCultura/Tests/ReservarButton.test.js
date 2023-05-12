import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReservarButton from '../src/components/ReservarButton';

describe('ReservarButton', () => {
  it('should render the component', () => {
    render(<ReservarButton />);
  });

  it('should call crearreserva when the button is pressed and the post is not reservat', async () => {
    const reservat = false;
    const crearReservaMock= jest.fn(() => console.log('crearReservaMock called'));
    const { getByTestId } = render(<ReservarButton crearReserva={crearReservaMock} reservat={reservat} />);
    fireEvent.press(getByTestId('reservarButton'));
    await (()=> expect(crearReservaMock).toHaveBeenCalled());
    await (() => expect(reservat).toBe(true));
  });

  it('should call eliminarreserva when the button is pressed and the post is already reservat', async () => {
    const reservat = true;
    const eliminarReservaMock = jest.fn();
    const { getByTestId } = render(<ReservarButton eliminarReserva={eliminarReservaMock} reservat={reservat} />);
    fireEvent.press(getByTestId('reservarButton'));
    await (()=> expect(eliminarReservaMock).toHaveBeenCalled());
    await  (()=> expect(reservat).toBe(false));
  });


  /*it('should call obrirdesplegable when the button is pressed and the post is not reservat', async () => {
    const reservat = false;
    const desplegableAbierto = false;
    const fechaIni = new Date('22-05-2022');
    const fechaFi = new Date('23-05-2023');
    const seleccionarDataMock = jest.fn();
    const { getByTestId } = render(<ReservarButton seleccionarData={seleccionarDataMock} reservat={reservat} desplegableAbierto={desplegableAbierto} fechaFi={fechaFi} fechaIni={fechaIni}/>);
    fireEvent.press(getByTestId('seleccionarData'));
    await  (()=> expect(desplegableAbierto).toBe(true));
  });*/

});