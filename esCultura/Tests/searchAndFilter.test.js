import React from 'react';
import SearchFilter from '../src/components/SearchFilter';
import {render, cleanup, fireEvent} from 'react-native-testing-library';

afterEach(cleanup);

describe('<SearchFilter />', () => {

    const onVarChange = jest.fn();
    const comp = render(<SearchFilter onVariableChange={onVarChange} isList={false} />);

    //every it is a test
    it('should match snapshot', () => {
        let component = comp.toJSON();
        expect(component).toMatchSnapshot();
    });
    

});