import React, {useState} from 'react';
import {Calendar, LocaleConfig, markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';


const CustomCalendar = () => {
  const [selected, setSelected] = useState('');
  const reserva = {key: 'reserva', color: 'purple', selectedDotColor: 'blue'};

  return (
    
    <Calendar
    showArrows={true}
    renderArrow={direction => (
      <Icon name={direction == 'left' ? 'chevron-left' : 'chevron-right'} size={17} color='#567545' />
    )}

        style = {styles.calendari}
        theme= {{ backgroundColor: '#33c031',
            calendarBackground: '#0000',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#1d7d1c',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#33c031',
            dayTextColor: '#44444',
            textDisabledColor: '#8d8d8d',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textMonthFontFamily: 'Open Sans',
            textDayHeaderFontSize: '30',
        }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markingType={'multi-dot'}
      markedDates={{

            "2023-03-05": { selected: true, marked: true, selectedColor: "blue" },
            '2023-03-26': {dots: [reserva], marked:false, selected:false, activeOpacity: 0},
            
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
       
      }}
      firstDay= {1} 
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
      'Diumenge', 'Dilluns','Dimarts','Dimecres','Dijous','Divendres','Dissabte', 
    ],
    dayNamesShort:[
      'Dg.', 'Dl.','Dt.','Dc.','Dj.','Dv.','Ds.', 
    ],
    today: 'Avui',
       
};
LocaleConfig.defaultLocale = 'cat';

const styles = StyleSheet.create({
    calendari: {
      flex: 1,
      backgroundColor: '#0000',
      //alignItems: 'center',
      justifyContent: 'center',
    }
  });
export default CustomCalendar;