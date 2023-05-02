import React, {useEffect, useState } from 'react';
import { View, Text, Picker } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {setLanguage, getLanguage} from '../utils/utilFunctions';

export default function TranslateSelector( ) {
    const [selectedValue, setSelectedValue] = useState( getLanguage() );

    function onChange(value) {
        setSelectedValue(value);
        setLanguage(value);
        console.log("value selected: ",value);
    }

    return (
      <View>
        <RNPickerSelect
            onValueChange={(value) => onChange(value)}
            value={selectedValue}
            placeholder={{ label: 'Select a language', value: null }}
            items={[
                { label: 'Català', value: 'cat' },
                { label: 'Español', value: 'es' },
                { label: 'English', value: 'en' },
            ]}
        />
      </View>
    );
};


