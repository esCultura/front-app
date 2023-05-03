import React, {useEffect, useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TranslateSelector( ) {
  
    const { i18n } = useTranslation();
    const [selectedValue, setSelectedValue] = useState( i18n.language );

    async function _storeData() {
      try {
        await AsyncStorage.setItem(
          'LAN',
          selectedValue,
        );
      } catch (error) {
        console.log("error to save in local store, error: ", error);
      }
    };
    
    function onChange(code) {
      setSelectedValue(code);
      i18n.changeLanguage(code);
      _storeData();
    };

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


