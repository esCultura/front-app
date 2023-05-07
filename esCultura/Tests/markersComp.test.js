import React from 'react';
import MarkersMap from '../src/components/MarkersComp';
import {render, cleanup, fireEvent} from 'react-native-testing-library';

afterEach(cleanup);

describe('<MarkersMap />', () => {

    //every it is a test
    it('should match snapshot', () => {
        const onVarChange = jest.fn();
        const comp = render(<MarkersMap  
            queryFilter={""}
            longitudeDivice = {41.389324}
            latitudeDivice = {2.113703}/>);
        let component = comp.toJSON();
        expect(component).toMatchSnapshot();
    });  
});