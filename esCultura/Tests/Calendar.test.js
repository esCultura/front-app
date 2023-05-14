import React from 'react';
import Calendar from '../src/components/Calendar';
import { render, fireEvent } from '@testing-library/react-native';



describe('<Calendar />', () => {
    it('renders correctly', () => {
      const { toJSON } = render(<Calendar />);
      expect(toJSON()).toMatchSnapshot();
    });
  });
  
