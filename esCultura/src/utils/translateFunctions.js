import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en, cat, es} from '../utils/translateLabels';

/*
function setIniLang() {
    const {i18n} = useTranslation();
    console.log("agafar info local per si ja sha fet select d'ideoma enteriorment");
    //split l'ideoma per defecta que te el mobil aixo a d'anar en el translate o a 
    //utils per possar l'ideoma per defecta 
    let ideoma = Localitzation.locale;
    ideoma = ideoma.split('-')[0];
    console.log("ideoma per default del mobil: ", ideoma);
    //si hi ha info del ideoma selecionat guardada tmb s'ha de colocar
    i18n.changeLanguage(ideoma);
}
*/

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'cat',
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
