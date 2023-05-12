import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TranslateSelector( ) {
  
    const { i18n } = useTranslation();
    const [selectedValue, setSelectedValue] = useState( i18n.language );
    const [label, setLabel] = useState("Select a language");

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
    
    function onChange(code, label) {
      setSelectedValue(code);
      //setLabel(label);
      i18n.changeLanguage(code);
      _storeData();
    };

    return (
      <View>
      <Text style={styles.label} >{label} </Text>
        <RNPickerSelect
            onValueChange={(value) => onChange(value, label)}
            value={selectedValue}
            //placeholder={{ label: 'Select a language', value: null }}
            items={[
                { label: 'Català', value: 'cat' },
                { label: 'Español', value: 'es' },
                { label: 'English', value: 'en' },
            ]}
            style={pickerSelectStyles}
        />
      </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // para mostrar el triángulo correctamente
    height: 50, // ajustar la altura según sea necesario
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // para mostrar el triángulo correctamente
    height: 50, // ajustar la altura según sea necesario
  },
});
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});



