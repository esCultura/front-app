import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en, cat, es} from '../utils/translateLabels';
import * as Localitzation from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

function setIniLang() {

    let lang = "";

    async function _retrieveData () {
      try {
        const value = await AsyncStorage.getItem('LAN');
        if (value !== null) {
          lang = value;
        }
      } catch (error) {
        console.log("error en agafar dades locals, error: ", error);
      }
    };
    _retrieveData ();

    if (lang == "") {   
        let ideoma = Localitzation.locale;
        ideoma = ideoma.split('-')[0];
        lang = ideoma;
    }
    return lang;
}

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: setIniLang(),
    fallbackLng: 'cat',
    resources: {
        en: {
            translation: en
        },
        cat: {
            translation: cat
        },
        es: {
            translation: es
        }
    }
})

export default i18n;