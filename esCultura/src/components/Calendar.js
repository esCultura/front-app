import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig, markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';


const CustomCalendar = (props) => {
  const [selected, setSelected] = useState('');
  const [newMarkedDates, setnewMarkedDates] = useState({});
  const [data, setData] = useState('');
  const reserva = {key: 'reserva', color: 'purple', selectedDotColor: 'blue', selected: true, marked: true};
  const perfil = "primerUsuari"
  const [screenLoaded, setScreenLoaded] = useState(false);

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=${perfil}` ,{
            headers: {
                'Content-Type': 'application/json', 
          }});
        if (!response.ok) {
          throw new Error('Error al obtenir les assistencies');
        }    
        const data = await response.json();
        console.log(data);
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
          const date = dates[0].dataFi.slice(0,10);
          newMarkedDates[date] = { marked: true };
          console.log("hola1")
          console.log(newMarkedDates);
        }
        setnewMarkedDates(newMarkedDates); 
        console.log("hola2")
        console.log(newMarkedDates);
    } catch (error) {
      console.error(error);
    }
  };
  fetchReserves();
  }, [screenLoaded]);

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
          if (newMarkedDates.hasOwnProperty(day.dateString)) {
            alert("hi ha una reserva");
          } else {
            alert('No hi ha reserves per la data');
          };
        }}

        markedDates={newMarkedDates}
        //markingType={'multi-dot'}
        
       /*markedDates={{
              '2023-03-26': {dots: [reserva], marked:true, selected:false, activeOpacity: 0},
              //'data.dataIni': { selected: true, marked: true, selectedColor: "blue"  },
          //[selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            "2023-05-17": {marked: true},
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