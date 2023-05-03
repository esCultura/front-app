import React, {useEffect, useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';


export default function TranslateSelector( ) {
  
    const { i18n } = useTranslation();
    console.log("i18n lenguage selected: ", i18n.language);
    const [selectedValue, setSelectedValue] = useState( i18n.language );
    
    function onChange(code) {
      setSelectedValue(code);
      console.log("value selected: ",code);
      i18n.changeLanguage(code);
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


