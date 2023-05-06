import React from 'react';
import SearchFilter from '../src/components/SearchFilter';
import {render, cleanup, fireEvent} from 'react-native-testing-library';

afterEach(cleanup);

describe('<SearchFilter />', () => {

    

    //every it is a test
    it('should match snapshot', () => {
        const onVarChange = jest.fn();
        const comp = render(<SearchFilter onVariableChange={onVarChange} isList={false} />);
        let component = comp.toJSON();
        expect(component).toMatchSnapshot();
    });

    /*
    it('should fire onSubmit events', () => {
        const onVarChange = jest.fn();
        const comp = render(<SearchFilter onVariableChange={onVarChange} isList={false} />);
        const onSubmit = jest.fn();
        const buttonComponent = comp.getByTestId('btnModal');
        
        fireEvent(buttonComponent, 'press');
        
        expect(onSubmit).toHaveBeenCalled();
    });
    */

    /*
    it('should fire onChange events', () => {
        const onChange = jest.fn();
        const { getByTestId } = comp;
      
        const inputComponent = getByTestId('input');
        fireEvent.changeText(inputComponent, 'new text');
      
        expect(onChange).toHaveBeenCalledWith('new text');
      });
    */    

});