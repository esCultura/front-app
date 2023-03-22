import React, {useState} from 'react';
import {Calendar, LocaleConfig,markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';

const App = () => {
  const [selected, setSelected] = useState('');
  const like ={key: 'like', color: 'red'};

  return (
    <Calendar
       
        style = {styles.calendari}
        theme= {{ backgroundColor: '#ffffff',
            calendarBackground: '#ffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#44444',
            textDisabledColor: '#d6e'
        }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
       
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
       
      }}
      showArrows={true}
      colorArrows='#567545'
      renderArrow={direction => <Arrow />}
     
    />
  );
};

LocaleConfig.locales['cat'] = {
    monthNames: [
        'Gener',
        'Febrer',
        'Març',
        'Abril',
        'Maig',
        'Juny',
        'Juliol',
        'Agost',
        'Setembre',
        'Octubre',
        'Novembre',
        'Desembre',
    ],
    monthNamesShort: [
        'Gen.','Febr.','Març','Abr.','Maig','Juny','Jul.', 'Ag.', 'Set.','Oct.','Nov.', 'Des.',
    ],
    dayNames:[
        'Diumenge','Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte',
    ],
    dayNamesShort:[
        'Dig.','Dill.','Dit.','Dic.','Dij.','Div.','Diss.',
    ],
    today: 'Avui',
       
};
LocaleConfig.defaultLocale = 'cat';

const styles = StyleSheet.create({
    calendari: {
      flex: 1,
      backgroundColor: '#ffff',
      //alignItems: 'center',
      justifyContent: 'center',
    }
  });
export default App;