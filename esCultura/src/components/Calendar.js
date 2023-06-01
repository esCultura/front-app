import React, {useState, useEffect} from 'react';
import {Calendar, LocaleConfig, markedDates} from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import InfoCompleta from "./InfoCompleta";
import Esdeveniment from './Esdeveniment';
import { simpleFetch } from "../utils/utilFunctions";

import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';



const CustomCalendar = (props) => {
  const [selected, setSelected] = useState('');
  const [newMarkedDates, setnewMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [llistaVisible, setLlistaVisible] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [esdeveniments, setEsdeveniments] = useState([]);
  const [screenLoaded, setScreenLoaded] = useState(props.screenLoaded);
  const user = props.perfil;
 

  useEffect(() => {

    const getColorReserva = (tematica) => {
      switch (tematica) {
        case 'Musica': 
          return 'red';
        case 'Teatre': 
          return 'blue';
        case 'Cine': 
          return 'green';
        case 'Espectacles':
          return 'yellow';
        case 'infantil':
         return 'orange';  
        case 'Arts visuals':
          return 'green';
        case 'Divulgació':
          return 'grey';
        case 'Tradicional i popular':
          return 'pink';
        default: 
          return 'purple';
      }
    }
    
    const fetchReserves = async () => {
      try {
        /*const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=${user}` ,{
            headers: {
                'Content-Type': 'application/json', 
          }});*/
          let endPoint = `assistencies/?perfil=${user}`;
        const response = await simpleFetch(endPoint, "GET", "");
        const prevMarkedDates = { ...newMarkedDates };
        const nextMarkedDates = {};
        for (let i = 0; i < response.length; i++) {
          const assistencies = response[i].esdeveniment;
          const date = response[i].data.slice(0,10);
          const responseDates = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/?codi='+assistencies ,{
            headers: {
                'Content-Type': 'application/json', 
          }});
          if (!responseDates.ok) {
            throw new Error('Error al obtenir el esdeveniment');
          }
          const dates = await responseDates.json();      
          
          const reserva = {key: response[i].uuid, color: getColorReserva(dates[0].tematiques[0]), selectedDotColor: 'blue', selected: true, marked: true,
                    info: {
                      source: "http://agenda.cultura.gencat.cat"+dates[0].imatges_list[0],
                      desc: dates[0].descripcio.replaceAll("&nbsp;", "\n"),
                      title: dates[0].nom,
                      dateIni: dates[0].dataIni.slice(0,10),
                      dateFi: dates[0].dataFi.slice(0,10),
                      location: dates[0].espai,
                      type: dates[0].tematiques.map(tema => tema.nom),
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
    } catch (error) {
      console.error(error);
    }
  };
  fetchReserves();
  }, [screenLoaded, props.screenLoaded]);

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
            if (newMarkedDates[day.dateString].dots.length > 1) {
              const reserves = [];
                for (let j = 0; j < newMarkedDates[day.dateString].dots.length; ++j) {
                  const reserva = newMarkedDates[day.dateString].dots[j];
                  reserves.push(reserva);
                }
                setEsdeveniments(reserves);
                setLlistaVisible(true);
            }
            else {
              const reserva = newMarkedDates[day.dateString].dots[0];
              setSelectedReserva(reserva);
              setModalVisible(true);
            }
          } 
        }}

        markedDates={newMarkedDates}
        markingType={'multi-dot'}
        firstDay= {1} 
      />
      {modalVisible && (
      <InfoCompleta 
                visible={modalVisible} 
                back={() =>  {
                  setModalVisible(false),
                  setScreenLoaded(!screenLoaded);
                  }
                }
                perfil={props.perfil}
                type={selectedReserva.info.type} 
                complet={selectedReserva.info.desc}
                source={selectedReserva.info.source}
                title={selectedReserva.info.title}
                preu={selectedReserva.info.preu}
                dateFi = {selectedReserva.info.dateFi}
                dateIni = {selectedReserva.info.dateIni}
                location = {selectedReserva.info.location}
                codi = {selectedReserva.info.codi}
            />
    )}
    <Modal visible={llistaVisible } animationType="slide">
        
            <TouchableOpacity onPress={() => setLlistaVisible(false)} style={styles.back}>
                  <XCircleFill color="red" width={145} height={145} />
            </TouchableOpacity>
            <View style={styles.llistat}>
            {
            esdeveniments.map((esd) => (
            <Esdeveniment 
                  key ={esd.info.codi}
                  back={() => setLlistaVisible(false)}
                  type={esd.info.type}
                  desc={esd.info.desc}
                  title={esd.info.title}
                  preu={esd.info.preu}
                  dateFi = {esd.info.dateFi}
                  dateIni = {esd.info.dateIni}
                  location = {esd.info.location}
                  codi = {esd.info.codi}
                  source = {esd.info.source}
              />
           ))}
        </View>
      </Modal>
    
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
    },
    llistat: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
      },
      back: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 6,
        width: 16,
        height: 16,
    }
  });
export default CustomCalendar;