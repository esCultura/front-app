
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
    const valoracions = props.valoracions;

    const [premiosOtorgados, setPremiosOtorgados] = useState({
        "Principiant": false,
        "Amateur": false,
        "Culturista": false,
        "Dora la Exploradora": false,
        "Tadeo Jones": false, 
        "Indiana Jones": false,  
        "El polze tímid": false,  
        "El poze content": false, 
        "El poze d'or": false, 
        "Cotorra": false,
        "Lloro": false,
        "Xarlatan": false,
        "Previngut": false, 
        "Esporuguit": false, 
        "Gurú": false, 
        "Popular": false,
        "Famos": false,
        "Influencer": false,
        "Fan": false,
        "Fan número 1": false,
        "Stalker": false,
        "Xataprenent": false,
        "XatMaster": false,
        "Xatadicte": false,
        "Visió global": false,
        "Present Conscient": false,
        "Ment crítica": false

      });
      
      const premios = [
        { nombre: "Principiant", imagen: require('../../assets/principiante.jpg'), descripcion: "Has assistit a 5 esdeveniments" }, //0
        { nombre: "Amateur", imagen: require('../../assets/amateur.jpg') , descripcion: "Has assistit a 10 esdeveniments"},   //1
        { nombre: "Culturista", imagen: require('../../assets/culturista(1).jpg'), descripcion: "Has assistit a 15 esdeveniments"},  //2
        { nombre: "Dora la Exploradora", imagen: require('../../assets/dora.png') , descripcion: "Has donat like a 5 esdeveniments"},  //3
        { nombre: "Tadeo Jones", imagen: require('../../assets/tadeo-jones.png'), descripcion: "Has donat like a 10 esdeveniments"},  //4
        { nombre: "Indiana Jones", imagen: require('../../assets/indiana-jones.png'), descripcion: "Has donat like a 15 esdeveniments" },  //5
        { nombre: "El polze tímid", imagen: require('../../assets/niño.jpg') , descripcion: "Has donat like a 5 categories"}, //6
        { nombre: "El polze content", imagen: require('../../assets/niña.jpg') , descripcion: "Has donat like a 10 categories"}, //7
        { nombre: "El polze d'or", imagen: require('../../assets/recommended.png') , descripcion: "Has donat like a 15 categories"}, //8
        { nombre: "Cotorra", imagen: require('../../assets/cotorra.jpeg') , descripcion: "Has enviat a 5 missatges"}, //9
        { nombre: "Lloro", imagen: require('../../assets/loro.jpeg'), descripcion: "Has enviat a 10 missatges" }, //10
        { nombre: "Xarlatan", imagen: require('../../assets/muchoschats.png') , descripcion: "Has enviat a 15 missatges"},  //11
        { nombre: "Previngut", imagen: require('../../assets/reserved1.jpg') , descripcion: "Has reservat a 5 events diferents"}, //12
        { nombre: "Esporuguit", imagen: require('../../assets/reserved2.1.jpg') , descripcion: "Has reservat a 10 events diferents" }, //13
        { nombre: "Gurú", imagen: require('../../assets/reserved3.jpg'), descripcion: "Has reservat a 15 events diferents" }, //14
        { nombre: "Popular", imagen: require('../../assets/popular.jpg'), descripcion: "T'han seguit 5 usuaris"}, //15 
        { nombre: "Famós", imagen: require('../../assets/famos.jpg'),  descripcion: "T'han seguit 10 usuaris"}, //16 
        { nombre: "Influencer", imagen: require('../../assets/influencer.jpeg') , descripcion: "T'han seguit 15 usuaris"}, //17 
        { nombre: "Fan", imagen: require('../../assets/fan1.jpg') , descripcion: "Has seguit a 5 usuaris"}, //18
        { nombre: "Fan número 1", imagen: require('../../assets/fan.png'), descripcion: "Has seguit a 5 usuaris"}, //19 
        { nombre: "Stalker", imagen: require('../../assets/stalker.jpg'), descripcion: "Has seguit a 5 usuaris"},// 20
        { nombre: "Xataprenent", imagen: require('../../assets/xatgrupal.png') ,  descripcion: "Participes en 5 xats diferents"}, //21 
        { nombre: "XatMaster", imagen: require('../../assets/grups4(1).jpg'),  descripcion: "Participes en 10 xats diferents" }, //22
        { nombre: "Xatadicte", imagen: require('../../assets/grupos7.jpg') ,  descripcion: "Participes en 15 xats diferents"}, //23
        { nombre: "Visió global", imagen: require('../../assets/valoracions1.jpg') ,  descripcion: "Crees 5 valoracions"}, //21 
        { nombre: "Present Conscient", imagen: require('../../assets/valoracions2.jpg'),  descripcion: "Crees en 10 valoracions" }, //22
        { nombre: "Ment crítica", imagen: require('../../assets/valoracions3.jpg') ,  descripcion: "Crees en 15 valoracions"}, //23
       
      ];

      



    useEffect(() => {
        console.log("imagen", premios[21].imagen);
        console.log("entra", props);
        if (assistencies_passades < 10 && assistencies_passades > 4) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Principiant": true}));
        else if (assistencies_passades >=10 && assistencies_passades <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Amateur": true}));
        else if (assistencies_passades >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Culturista": true}));
        if (interessos_esdeveniments >= 5&& interessos_esdeveniments<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Dora la Exploradora": true}));
        else if (interessos_esdeveniments >= 10 && interessos_esdeveniments<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Tadeo Jones": true}));
        else if (interessos_esdeveniments >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Indiana Jones": true}));
        if (interessos_tematiques >= 5 && interessos_tematiques<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze tímid": true}));
        else if (interessos_tematiques >= 10&& interessos_tematiques<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze content": true}));
        else if (interessos_tematiques >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze d'or": true}));
        if (missatges_enviats >= 5 && missatges_enviats<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Cotorra": true}));
        else if (missatges_enviats >= 10 && missatges_enviats <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Lloro": true}));
        else if (missatges_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xarlatan": true}));
        if (reserves_enviats >= 5 && reserves_enviats <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Previngut": true}));
        else if (reserves_enviats >= 10 && reserves_enviats <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Esporuguit": true}));
        else if (reserves_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Gurú": true}));
        if (seguidors >= 5 && seguidors<10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Popular": true}));
        else if (seguidors >= 10 && seguidors <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Famós": true}));
        else if (seguidors == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Influencer": true}));
        if (seguits >= 5 && seguits <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Fan": true}));
        else if (seguits >= 10 && seguits <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Fan número 1": true}));
        else if (seguits == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Stalker": true}));
        if (xats_participants >= 5 && xats_participants <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xatataprenent": true}));
        else if (xats_participants >= 10 && xats_participants<15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "XatMaster": true}));
        else if (xats_participants == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xatadicte": true}));
        if (valoracions >= 5 && valoracions <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Visió global": true}));
        else if (valoracions >= 10 && valoracions <15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Present Conscient": true}));
        else if (valoracions == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Ment crítica": true}));
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

