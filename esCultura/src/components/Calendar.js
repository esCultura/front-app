import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig, markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';
import InfoCompleta from "./InfoCompleta";


const CustomCalendar = (props) => {
  const [selected, setSelected] = useState('');
  const [newMarkedDates, setnewMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const perfil = "primerUsuari"

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

        const prevMarkedDates = { ...newMarkedDates };
        const nextMarkedDates = {};
        console.log("hola7");
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
          const assistencies = data[i].esdeveniment;
          const responseDates = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?codi='+assistencies ,{
            headers: {
                'Content-Type': 'application/json', 
          }});
          if (!responseDates.ok) {
            throw new Error('Error al obtenir el esdeveniment');
          }
          const dates = await responseDates.json();      
          const date = dates[0].dataFi.slice(0,10);
          console.log("hola0");
          console.log(date);
          /*nextMarkedDates[date] = {
              marked: true  
          };*/

          const reserva = {key: data[i].id, color: 'purple', selectedDotColor: 'blue', selected: true, marked: true,
                    info: {
                      source: "http://agenda.cultura.gencat.cat"+dates[0].imatges_list[0],
                      desc: dates[0].descripcio.replaceAll("&nbsp;", "\n"),
                      title: dates[0].nom,
                      date: dates[0].dataFi.slice(0,10),
                      location: dates[0].espai,
                      type: dates[0].tematiques,
                      preu: dates[0].entrades,
                      codi: dates[0].codi,
                    
                    }        
          };
           if (nextMarkedDates[date]) {
             nextMarkedDates[date].dots.push(reserva);
          } else {
             nextMarkedDates[date] = {
              dots: [reserva]
            };
          }
        }

        Object.keys(prevMarkedDates).forEach(date => {
          if (!(date in nextMarkedDates)) {
            delete prevMarkedDates[date];
          }
        });
        const mergedMarkedDates = { ...prevMarkedDates, ...nextMarkedDates };

        setnewMarkedDates(mergedMarkedDates); 
        console.log("hola2")
        console.log(mergedMarkedDates);
    } catch (error) {
      console.error(error);
    }
  };
  fetchReserves();
  }, [props.screenLoaded]);

    return (
      <>
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
            const reserva = newMarkedDates[day.dateString].dots[0];
            setSelectedReserva(reserva);
            setModalVisible(true);
          } else {
            alert('No hi ha reserves per la data');
          };
        }}

        markedDates={newMarkedDates}
        markingType={'multi-dot'}
        firstDay= {1} 
      />
      {modalVisible && (
      <InfoCompleta 
                visible={modalVisible} 
                back={() => setModalVisible(false)}
                type={selectedReserva.info.type} 
                desc="hola"
                source={selectedReserva.info.source}
                title={selectedReserva.info.title}
                preu={selectedReserva.info.preu}
                date = {selectedReserva.info.date}
                location = {selectedReserva.info.location}
                codi = {selectedReserva.info.codi}
            />
    )}
    </>
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