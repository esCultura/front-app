import React, {useEffect, useState } from 'react';
import { View, Text, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

export default function TranslateSelector( ) {
    //const [selectedValue, setSelectedValue] = useState('');
    

    function onChange(value) {
        //setSelectedValue(itemValue)
    }

    return (
      <View>
        <Text>
            Selector
        </Text>
        <RNPickerSelect
            onValueChange={(value) => console.log("value selected: ",value)}
            items={[
                { label: 'Català', value: 'cat' },
                { label: 'Español', value: 'es' },
                { label: 'English', value: 'en' },
            ]}
        />
      </View>
    );
};


