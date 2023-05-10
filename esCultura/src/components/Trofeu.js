
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, {useState, useEffect} from 'react';


const bgcolor = '#3BDE4B';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';

  
  
export default function InfoCompleta (props) {
    const assistencies_passades = props.assistencies_passades;
    const interessos_esdeveniments= props.interessos_esdeveniments;
    const interessos_tematiques= props.interessos_tematiques;
    const missatges_enviats= props.missatges_enviats;
    const reserves_enviats= props.reserves_enviats;
    const seguidors= props.seguidors;
    const seguits= props.seguits;
    const xats_participants= props.xats_participants;

    const [premiosOtorgados, setPremiosOtorgados] = useState({
        "principiant": false,
        "amateur": false,
        "culturista": false,
        "principiant1": false,
        "amateur1": false,
        "culturista1": false,
        "tematiques1": false,
        "tematiques2": false,
        "tematiques3": false,
        "cotorra": false,
        "lloro": false,
        "xarlatan": false,
        "reserved1": false,
        "reserved2": false,
        "reserved3": false,
        "popular": false,
        "famos": false,
        "influencer": false,
        "seguit1": false,
        "seguit2": false,
        "seguit3": false,
        "xats1": false,
        "xats2": false,
        "xats3": false,

      });
      
      const premios = [
        { nombre: "principiant", imagen: require('../../assets/principiante.jpg') }, //0
        { nombre: "amateur", imagen: require('../../assets/amateur.jpg') },   //1
        { nombre: "culturista", imagen: require('../../assets/culturista(1).jpg')},  //2
        { nombre: "principiant1", imagen: require('../../assets/premio.png') },  //3
        { nombre: "amateur1", imagen: require('../../assets/premio.png')},  //4
        { nombre: "culturista1", imagen: require('../../assets/premio.png') },  //5
        { nombre: "tematiques1", imagen: require('../../assets/premio.png') }, //6
        { nombre: "tematiques2", imagen: require('../../assets/premio.png') }, //7
        { nombre: "tematiques3", imagen: require('../../assets/premio.png') }, //8
        { nombre: "cotorra", imagen: require('../../assets/cotorra.jpeg') }, //9
        { nombre: "lloro", imagen: require('../../assets/loro.jpeg') }, //10
        { nombre: "xarlatan", imagen: require('../../assets/muchoschats.png') },  //11
        { nombre: "reserved1", imagen: require('../../assets/reserved1.jpg') }, //12
        { nombre: "reserved2", imagen: require('../../assets/reserved2.1.jpg') }, //13
        { nombre: "reserved3", imagen: require('../../assets/reserved3.jpg') }, //14
        { nombre: "popular", imagen: require('../../assets/premio.png') }, //15 
        { nombre: "famos", imagen: require('../../assets/premio.png')}, //16 
        { nombre: "influencer", imagen: require('../../assets/influencer.jpeg') }, //17 
        { nombre: "seguit1", imagen: require('../../assets/premio.png') }, //18
        { nombre: "seguit2", imagen: require('../../assets/premio.png')}, //19 
        { nombre: "seguit3", imagen: require('../../assets/premio.png')},// 20
        { nombre: "xats1", imagen: require('../../assets/xatgrupal.png') }, //21 
        { nombre: "xats2", imagen: require('../../assets/grups4(1).jpg') }, //22
        { nombre: "xats", imagen: require('../../assets/grupos7.jpg') }, //23

       
      ];

      



    useEffect(() => {
        console.log("imagen", premios[21].imagen);
        console.log("entra", props);
        if (assistencies_passades < 10 && assistencies_passades > 4) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "principiant": true}));
        else if (assistencies_passades >=10 && assistencies_passades <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "amateur": true}));
        else if (assistencies_passades >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "culturista": true}));
        if (interessos_esdeveniments >= 5&& interessos_esdeveniments<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "principiant1": true}));
        else if (interessos_esdeveniments >= 10 && interessos_esdeveniments<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "amateur1": true}));
        else if (interessos_esdeveniments >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "culturista1": true}));
        if (interessos_tematiques >= 5 && interessos_tematiques<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "tematiques1": true}));
        else if (interessos_tematiques >= 10&& interessos_tematiques<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "tematiques2": true}));
        else if (interessos_tematiques >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "tematiques3": true}));
        if (missatges_enviats >= 5 && missatges_enviats<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "cotorra": true}));
        else if (missatges_enviats >= 10 && missatges_enviats <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "lloro": true}));
        else if (missatges_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "xarlatan": true}));
        if (reserves_enviats >= 5 && reserves_enviats <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "reserved1": true}));
        else if (reserves_enviats >= 10 && reserves_enviats <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "reserved2": true}));
        else if (reserves_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "reserved3": true}));
        if (seguidors >= 5 && seguidors<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "popular": true}));
        else if (seguidors >= 10 && seguidors <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "famos": true}));
        else if (seguidors == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "influencer": true}));
        if (seguits >= 5 && seguits <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "seguit1": true}));
        else if (seguits >= 10 && seguits <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "seguit2": true}));
        else if (seguits == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "seguit3": true}));
        if (xats_participants >= 5 && xats_participants <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "xats1": true}));
        else if (xats_participants >= 10 && xats_participants<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "xats2": true}));
        else if (xats_participants == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "xats3": true}));
      }, []);

      

    return(
        <>
       <ScrollView  horizontal={true} contentContainerStyle={styles.llistat}>
        {premios.map((premio, index) => {
        if (premiosOtorgados[premio.nombre]) {
          return (
            <View  >
            <Image 
              key={index}
              source={premio.imagen}
              style={ styles.imagen}
            />
            
            <Text style={styles.text}> {premio.nombre}</Text>
            </View >
          );
        } 
      })}
      </ScrollView>

        </>
    )
    

}

const styles = StyleSheet.create({
llistat: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
},
text: {
  fontSize: 15,
  textAlign: 'center',
  textAlignVertical: 'center',
},
imagen: { 
  width: 100, 
  height:  100,
   marginHorizontal: 10, 
   borderRadius: 50,
   borderWidth: 2,
   borderColor: "black",
  },
})

