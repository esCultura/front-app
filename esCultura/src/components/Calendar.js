import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig, markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';


const CustomCalendar = (props) => {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState('');
  const reserva = {key: 'reserva', color: 'purple', selectedDotColor: 'blue'};
 
  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil='+props.perfil ,{
            headers: {
                'Content-Type': 'application/json', 
          }});
        if (!response.ok) {
          throw new Error('Error al obtenir les assistencies');
        }    
        const data = await response.json();
        console.log(data);
        const markedDates = {};
        for (let i = 0; i < data.length; i++) {
          const assistencies = data[i].esdeveniment;
          const responseDates = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?codi='+assistencies ,{
            headers: {
                'Content-Type': 'application/json', 
          }});
          if (!response.ok) {
            throw new Error('Error al obtenir el esdeveniment');
          }
          const dates = await responseDates.json();
          const date = dates[0].dataFi;
          markedDates[date] = { dots: [reserva] };
          console.log(markedDates);
        }
    } catch (error) {
      console.error(error);
    }
  };
  fetchReserves();
  }, []);

    return (
      <Calendar
      showArrows={true}
      renderArrow={direction => (
        <Icon name={direction == 'left' ? 'chevron-left' : 'chevron-right'} size={17} color='#567545' />
      )}

          theme= {{ backgroundColor: '#33c031',
              calendarBackground: '#0000',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#1d7d1c',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#33c031',
              textDisabledColor: '#8d8d8d',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontSize: 14,
              'stylesheet.day.basic':{
                  'base':{
                    width: 30,
                    height: 80,

                  }, 
                  'selected': {
                    backgroundColor: '#1d7d1c', 
                    borderRadius: 3,
                  },
              }
              
          }}
        onDayPress={day => {
          setSelected(day.dateString)
          if (day.dateString == selected) {
            alert(day.dateString);
          } else {
            alert('No hi ha reserves per la data');
          };
        }}
        //markingType={'multi-dot'}
        markedDates={markedDates}
      /* markedDates={{

              'data.dataIni': { selected: true, marked: true, selectedColor: "blue"  },
              '2023-03-26': {dots: [reserva], marked:false, selected:false, activeOpacity: 0},
              
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        
        }}*/

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
  container : {
      flex: 1,
      width: '100%' ,
  },
  calendari: {
      flex: 1, 
      width: '100%',
      height: "100%",
      backgroundColor: '#00456',
      paddingTop: 120,
      paddingBottom: 40,
    }
  });
export default CustomCalendar;